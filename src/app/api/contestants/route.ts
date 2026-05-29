import { jsonError, jsonOk } from '@/lib/api/http'
import { listContestants } from '@/server/services/contestant.service'

export async function GET() {
  try {
    const contestants = await listContestants()
    return jsonOk({ contestants })
  } catch {
    return jsonError('Failed to load contestants', 500)
  }
}
