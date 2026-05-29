import Link from 'next/link'
import { notFound, redirect } from 'next/navigation'
import { CheckCircle2, Heart } from 'lucide-react'
import { buttonClassName } from '@/components/Button'
import { Card, CardContent } from '@/components/Card'
import { formatCurrencyFromCents } from '@/lib/format'
import { getContestantById } from '@/server/services/contestant.service'
import { getVoteById } from '@/server/services/vote.service'

export const dynamic = 'force-dynamic'

type FeedbackPageProps = {
  params: Promise<{ contestantId: string }>
  searchParams: Promise<{ voteId?: string }>
}

export default async function VoteFeedbackPage({
  params,
  searchParams,
}: FeedbackPageProps) {
  const { contestantId } = await params
  const { voteId } = await searchParams

  if (!voteId) {
    redirect('/')
  }

  const [contestant, vote] = await Promise.all([
    getContestantById(contestantId),
    getVoteById(voteId),
  ])

  if (!contestant || !vote || vote.contestantId !== contestant.id) {
    notFound()
  }

  return (
    <div className="mx-auto w-full max-w-md space-y-6 py-4 text-center sm:space-y-8">
      <div className="flex justify-center">
        <div className="relative">
          <CheckCircle2
            className="h-16 w-16 text-primary"
            strokeWidth={1.5}
            aria-hidden
          />
          <Heart
            className="absolute -right-1 -top-1 h-6 w-6 fill-accent text-accent"
            aria-hidden
          />
        </div>
      </div>

      <section className="space-y-2">
        <h1 className="text-xl font-bold sm:text-2xl">Voto confirmado!</h1>
        <p className="text-muted-foreground">
          Obrigada por apoiar{' '}
          <span className="font-medium text-foreground">
            {vote.contestantName}
          </span>
          .
        </p>
      </section>

      <Card>
        <CardContent className="space-y-4 pt-6">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={contestant.photoUrl}
            alt={contestant.name}
            className="mx-auto h-32 w-24 rounded-lg object-cover"
          />
          <dl className="space-y-2 text-sm">
            <div className="flex justify-between gap-4">
              <dt className="shrink-0 text-muted-foreground">Candidata</dt>
              <dd className="text-right font-medium">{vote.contestantName}</dd>
            </div>
            <div className="flex justify-between gap-4">
              <dt className="text-muted-foreground">Votos</dt>
              <dd className="font-medium">{vote.votes}</dd>
            </div>
            <div className="flex justify-between gap-4">
              <dt className="text-muted-foreground">Valor pago</dt>
              <dd className="font-medium text-primary">
                {formatCurrencyFromCents(vote.amountCents)}
              </dd>
            </div>
          </dl>
        </CardContent>
      </Card>

      <p className="break-all text-sm text-muted-foreground">
        Confirmação registrada para {vote.email}.
      </p>

      <Link href="/" className={buttonClassName('default', 'w-full')}>
        Voltar para as candidatas
      </Link>
    </div>
  )
}
