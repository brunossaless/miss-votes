import { jsonOk } from '@/lib/api/http'
import { votePackages } from '@/server/config/vote-packages'

export async function GET() {
  return jsonOk({ packages: votePackages })
}
