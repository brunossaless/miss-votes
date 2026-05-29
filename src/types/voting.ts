export type Contestant = {
  id: string
  name: string
  photoUrl: string
}

export type VotePackage = {
  id: string
  votes: number
  priceCents: number
  label: string
}

export type VoteRecord = {
  id: string
  contestantId: string
  contestantName: string
  packageId: string
  votes: number
  amountCents: number
  email: string
  createdAt: string
}

export type CreateVoteInput = {
  contestantId: string
  packageId: string
  email: string
}
