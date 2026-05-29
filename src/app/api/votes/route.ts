import { ZodError } from 'zod'
import { jsonError, jsonOk } from '@/lib/api/http'
import {
  VoteServiceError,
  createVote,
} from '@/server/services/vote.service'
import { createVoteSchema } from '@/server/validators/create-vote.schema'

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const input = createVoteSchema.parse(body)
    const vote = await createVote(input)
    return jsonOk({ vote }, { status: 201 })
  } catch (error) {
    if (error instanceof ZodError) {
      return jsonError('Invalid request body', 400)
    }
    if (error instanceof VoteServiceError) {
      return jsonError(error.message, error.status)
    }
    return jsonError('Failed to create vote', 500)
  }
}
