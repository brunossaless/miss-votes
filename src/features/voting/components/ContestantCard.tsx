import Image from 'next/image'
import Link from 'next/link'
import type { Contestant } from '@/types/voting'
import { cn } from '@/lib/utils'

type ContestantCardProps = {
  contestant: Contestant
  className?: string
}

export function ContestantCard({ contestant, className }: ContestantCardProps) {
  return (
    <Link
      href={`/vote/${contestant.id}`}
      className={cn(
        'group block overflow-hidden rounded-xl border border-border bg-card shadow transition hover:border-primary/50 hover:shadow-lg hover:shadow-primary/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring',
        className,
      )}
    >
      <div className="relative aspect-[4/5] overflow-hidden bg-secondary">
        <Image
          src={contestant.photoUrl}
          alt={contestant.name}
          fill
          sizes="(max-width: 640px) 50vw, 33vw"
          className="object-cover transition duration-300 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-background/20 to-transparent" />
      </div>
      <div className="p-3 sm:p-4">
        <h2 className="text-base font-semibold tracking-tight group-hover:text-primary sm:text-lg">
          {contestant.name}
        </h2>
        <p className="mt-1 text-xs text-muted-foreground sm:text-sm">
          Toque para votar
        </p>
      </div>
    </Link>
  )
}
