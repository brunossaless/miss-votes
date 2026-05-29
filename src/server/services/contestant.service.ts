import { prisma } from '@/server/db/prisma'
import type { Contestant } from '@/types/voting'

function toContestant(row: {
  id: string
  name: string
  photoUrl: string
}): Contestant {
  return {
    id: row.id,
    name: row.name,
    photoUrl: row.photoUrl,
  }
}

export async function listContestants(): Promise<Contestant[]> {
  const rows = await prisma.contestant.findMany({
    orderBy: { name: 'asc' },
  })
  return rows.map(toContestant)
}

export async function getContestantById(
  id: string,
): Promise<Contestant | null> {
  const row = await prisma.contestant.findUnique({ where: { id } })
  return row ? toContestant(row) : null
}
