'use client'

import { useState, type FormEvent } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { ArrowLeft, CreditCard } from 'lucide-react'
import { Button } from '@/components/Button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/Card'
import { formatCurrencyFromCents } from '@/lib/format'
import { cn } from '@/lib/utils'
import type { Contestant, VotePackage } from '@/types/voting'

type VoteCheckoutFormProps = {
  contestant: Contestant
  packages: VotePackage[]
}

export function VoteCheckoutForm({
  contestant,
  packages,
}: VoteCheckoutFormProps) {
  const router = useRouter()
  const [packageId, setPackageId] = useState(packages[0]?.id ?? '')
  const [email, setEmail] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const selectedPackage =
    packages.find((pkg) => pkg.id === packageId) ?? packages[0]

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    if (!selectedPackage) return

    setIsSubmitting(true)
    setError(null)

    try {
      const response = await fetch('/api/votes', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          contestantId: contestant.id,
          packageId: selectedPackage.id,
          email,
        }),
      })

      const data = await response.json()

      if (!response.ok) {
        setError(data.error ?? 'Não foi possível confirmar o voto.')
        return
      }

      router.replace(
        `/vote/${contestant.id}/feedback?voteId=${data.vote.id}`,
      )
    } catch {
      setError('Erro de conexão. Tente novamente.')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="mx-auto max-w-lg space-y-6">
      <Link
        href="/"
        className="inline-flex w-fit items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-foreground"
      >
        <ArrowLeft className="h-4 w-4" aria-hidden />
        Voltar
      </Link>

      <div className="flex flex-col gap-3 rounded-xl border border-border bg-card p-4 sm:flex-row sm:items-center sm:gap-4">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={contestant.photoUrl}
          alt={contestant.name}
          className="mx-auto h-28 w-24 shrink-0 rounded-lg object-cover sm:mx-0 sm:h-20 sm:w-16"
        />
        <div className="text-center sm:text-left">
          <p className="text-sm text-muted-foreground">Você está votando em</p>
          <h1 className="text-xl font-semibold sm:text-2xl">{contestant.name}</h1>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <Card>
          <CardHeader>
            <CardTitle className="text-base">Quantidade de votos</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            {packages.map((pkg) => (
              <label
                key={pkg.id}
                className={cn(
                  'flex cursor-pointer flex-col gap-2 rounded-lg border p-3 transition sm:flex-row sm:items-center sm:justify-between',
                  packageId === pkg.id
                    ? 'border-primary bg-primary/10'
                    : 'border-border hover:border-primary/40',
                )}
              >
                <span className="flex items-center gap-3">
                  <input
                    type="radio"
                    name="package"
                    value={pkg.id}
                    checked={packageId === pkg.id}
                    onChange={() => setPackageId(pkg.id)}
                    className="h-4 w-4 shrink-0 accent-primary"
                  />
                  <span className="font-medium">{pkg.label}</span>
                </span>
                <span className="pl-7 text-primary sm:pl-0">
                  {formatCurrencyFromCents(pkg.priceCents)}
                </span>
              </label>
            ))}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-base">
              <CreditCard className="h-4 w-4 text-primary" aria-hidden />
              Pagamento
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-1.5">
              <label htmlFor="email" className="text-sm font-medium">
                E-mail
              </label>
              <input
                id="email"
                type="email"
                required
                autoComplete="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="seu@email.com"
                className="w-full rounded-md border border-input bg-background px-3 py-2.5 text-base outline-none focus-visible:ring-1 focus-visible:ring-ring sm:text-sm"
              />
            </div>
            <p className="text-xs text-muted-foreground">
              Demonstração: nenhum cartão real é cobrado nesta versão.
            </p>
          </CardContent>
        </Card>

        <div className="rounded-xl border border-primary/30 bg-primary/5 p-4">
          <div className="flex items-center justify-between text-sm">
            <span className="text-muted-foreground">Total</span>
            <span className="text-lg font-semibold text-primary">
              {selectedPackage
                ? formatCurrencyFromCents(selectedPackage.priceCents)
                : '—'}
            </span>
          </div>
        </div>

        {error ? (
          <p className="text-sm text-destructive" role="alert">
            {error}
          </p>
        ) : null}

        <Button type="submit" disabled={isSubmitting} className="w-full">
          {isSubmitting ? 'Processando…' : 'Confirmar voto e pagamento'}
        </Button>
      </form>
    </div>
  )
}
