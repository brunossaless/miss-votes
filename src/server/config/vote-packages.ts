import type { VotePackage } from '@/types/voting'

export const votePackages: VotePackage[] = [
  { id: 'single', votes: 1, priceCents: 499, label: '1 voto' },
  { id: 'pack-5', votes: 5, priceCents: 1999, label: '5 votos' },
  { id: 'pack-10', votes: 10, priceCents: 3499, label: '10 votos' },
]

export function getVotePackageById(id: string): VotePackage | undefined {
  return votePackages.find((pkg) => pkg.id === id)
}
