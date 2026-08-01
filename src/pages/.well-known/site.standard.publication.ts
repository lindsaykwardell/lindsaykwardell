import type { APIRoute } from 'astro'
import { getPublicationUri } from '@/lib/standard-site'

export const GET: APIRoute = () => {
  const uri = getPublicationUri()
  if (!uri) {
    return new Response('Publication not configured. Run npm run sequoia:setup.', {
      status: 404,
      headers: { 'Content-Type': 'text/plain; charset=utf-8' },
    })
  }

  return new Response(uri, {
    headers: {
      'Content-Type': 'text/plain; charset=utf-8',
      'Cache-Control': 'public, max-age=3600',
    },
  })
}
