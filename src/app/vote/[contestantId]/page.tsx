import { notFound } from 'next/navigation'
import { VoteCheckoutForm } from '@/features/voting/components/VoteCheckoutForm'
import { votePackages } from '@/server/config/vote-packages'
import { getContestantById } from '@/server/services/contestant.service'

export const dynamic = 'force-dynamic'

type VotePageProps = {
  params: Promise<{ contestantId: string }>
}

export default async function VotePage({ params }: VotePageProps) {
  const { contestantId } = await params
  const contestant = await getContestantById(contestantId)

  if (!contestant) {
    notFound()
  }

  return (
    <VoteCheckoutForm contestant={contestant} packages={votePackages} />
  )
}
