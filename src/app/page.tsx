import { ContestantCard } from '@/features/voting/components/ContestantCard'
import { listContestants } from '@/server/services/contestant.service'

export const dynamic = 'force-dynamic'

export default async function HomePage() {
  const contestants = await listContestants()

  return (
    <div className="space-y-8">
      <section className="space-y-2 text-center">
        <p className="text-sm uppercase tracking-[0.2em] text-primary">
          Miss Votes
        </p>
        <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">
          Escolha sua favorita
        </h1>
        <p className="mx-auto max-w-lg text-muted-foreground">
          Toque na foto para votar e concluir o pagamento.
        </p>
      </section>

      <ul className="grid grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-4 lg:gap-6">
        {contestants.map((contestant) => (
          <li key={contestant.id}>
            <ContestantCard contestant={contestant} />
          </li>
        ))}
      </ul>
    </div>
  )
}
