import { jsonError, jsonOk } from '@/lib/api/http'
import { getVoteById } from '@/server/services/vote.service'

type RouteContext = {
  params: Promise<{ id: string }>
}

export async function GET(_request: Request, context: RouteContext) {
  const { id } = await context.params

  try {
    const vote = await getVoteById(id)
    if (!vote) {
      return jsonError('Vote not found', 404)
    }
    return jsonOk({ vote })
  } catch {
    return jsonError('Failed to load vote', 500)
  }
}
