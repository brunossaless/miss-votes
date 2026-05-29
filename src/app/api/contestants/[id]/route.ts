import { jsonError, jsonOk } from '@/lib/api/http'
import { getContestantById } from '@/server/services/contestant.service'

type RouteContext = {
  params: Promise<{ id: string }>
}

export async function GET(_request: Request, context: RouteContext) {
  const { id } = await context.params

  try {
    const contestant = await getContestantById(id)
    if (!contestant) {
      return jsonError('Contestant not found', 404)
    }
    return jsonOk({ contestant })
  } catch {
    return jsonError('Failed to load contestant', 500)
  }
}
