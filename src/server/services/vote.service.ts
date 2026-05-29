import { getVotePackageById } from '@/server/config/vote-packages'
import { prisma } from '@/server/db/prisma'
import { getContestantById } from '@/server/services/contestant.service'
import type { CreateVotePayload } from '@/server/validators/create-vote.schema'
import type { VoteRecord } from '@/types/voting'

function toVoteRecord(row: {
  id: string
  contestantId: string
  packageId: string
  votes: number
  amountCents: number
  email: string
  createdAt: Date
  contestant: { name: string }
}): VoteRecord {
  return {
    id: row.id,
    contestantId: row.contestantId,
    contestantName: row.contestant.name,
    packageId: row.packageId,
    votes: row.votes,
    amountCents: row.amountCents,
    email: row.email,
    createdAt: row.createdAt.toISOString(),
  }
}

export async function createVote(
  input: CreateVotePayload,
): Promise<VoteRecord> {
  const contestant = await getContestantById(input.contestantId)
  if (!contestant) {
    throw new VoteServiceError('Contestant not found', 404)
  }

  const votePackage = getVotePackageById(input.packageId)
  if (!votePackage) {
    throw new VoteServiceError('Vote package not found', 400)
  }

  const row = await prisma.vote.create({
    data: {
      contestantId: input.contestantId,
      packageId: votePackage.id,
      votes: votePackage.votes,
      amountCents: votePackage.priceCents,
      email: input.email.toLowerCase().trim(),
    },
    include: { contestant: true },
  })

  return toVoteRecord(row)
}

export async function getVoteById(id: string): Promise<VoteRecord | null> {
  const row = await prisma.vote.findUnique({
    where: { id },
    include: { contestant: true },
  })
  return row ? toVoteRecord(row) : null
}

export class VoteServiceError extends Error {
  constructor(
    message: string,
    readonly status: number,
  ) {
    super(message)
    this.name = 'VoteServiceError'
  }
}
