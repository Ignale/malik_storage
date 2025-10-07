import type { NextApiRequest, NextApiResponse } from 'next'

// This route was intentionally disabled in favor of Next Server Actions
// Use the server action exported from `/app/actions.ts` (createSku) instead.
export default function handler(_req: NextApiRequest, res: NextApiResponse) {
  res.status(410).json({ error: 'This endpoint is disabled. Use Server Actions (app/actions.createSku).' })
}
