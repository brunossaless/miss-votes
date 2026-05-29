import Link from 'next/link'
import { Crown } from 'lucide-react'

export function SiteHeader() {
  return (
    <header className="border-b border-border/60 bg-card/40 backdrop-blur">
      <div className="mx-auto flex max-w-5xl items-center justify-center px-4 py-4">
        <Link
          href="/"
          className="flex items-center gap-2 transition-opacity hover:opacity-90"
        >
          <Crown className="h-6 w-6 text-primary" aria-hidden />
          <span className="font-semibold tracking-tight text-primary">
            Miss Votes
          </span>
        </Link>
      </div>
    </header>
  )
}
