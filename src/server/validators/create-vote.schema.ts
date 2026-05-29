import { z } from 'zod'

export const createVoteSchema = z.object({
  contestantId: z.string().min(1),
  packageId: z.string().min(1),
  email: z.string().email(),
})

export type CreateVotePayload = z.infer<typeof createVoteSchema>
