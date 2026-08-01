/**
 * One-time setup: create a site.standard.publication on your PDS and
 * wire sequoia.json + /.well-known verification.
 *
 * Usage:
 *   ATP_IDENTIFIER=lindsaykwardell.com ATP_APP_PASSWORD=xxxx npm run sequoia:setup
 *
 * Create an app password at https://bsky.app/settings/app-passwords
 */
import { readFileSync, writeFileSync, mkdirSync } from 'node:fs'
import { dirname, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'

const __dirname = dirname(fileURLToPath(import.meta.url))
const ROOT = resolve(__dirname, '..')
const CONFIG_PATH = resolve(ROOT, 'sequoia.json')
const WELL_KNOWN_PATH = resolve(
  ROOT,
  'public/.well-known/site.standard.publication',
)

function loadDotEnv() {
  try {
    const content = readFileSync(resolve(ROOT, '.env'), 'utf-8')
    for (const line of content.split('\n')) {
      const trimmed = line.trim()
      if (!trimmed || trimmed.startsWith('#')) continue
      const eq = trimmed.indexOf('=')
      if (eq === -1) continue
      const key = trimmed.slice(0, eq).trim()
      let value = trimmed.slice(eq + 1).trim()
      if (
        (value.startsWith('"') && value.endsWith('"')) ||
        (value.startsWith("'") && value.endsWith("'"))
      ) {
        value = value.slice(1, -1)
      }
      if (!(key in process.env)) {
        process.env[key] = value
      }
    }
  } catch {
    // optional
  }
}

loadDotEnv()

const identifier = process.env.ATP_IDENTIFIER || 'lindsaykwardell.com'
const password = process.env.ATP_APP_PASSWORD

if (!password) {
  console.error(
    'Missing ATP_APP_PASSWORD. Add it to .env, or create one at https://bsky.app/settings/app-passwords',
  )
  console.error('Then run: npm run sequoia:setup')
  process.exit(1)
}

type DidDoc = {
  service?: Array<{ id: string; serviceEndpoint: string }>
}

async function resolvePds(handleOrDid: string): Promise<{ did: string; pds: string }> {
  let did = handleOrDid
  if (!handleOrDid.startsWith('did:')) {
    const res = await fetch(
      `https://public.api.bsky.app/xrpc/com.atproto.identity.resolveHandle?handle=${encodeURIComponent(handleOrDid)}`,
    )
    if (!res.ok) {
      throw new Error(`Failed to resolve handle ${handleOrDid}: ${res.status}`)
    }
    ;({ did } = (await res.json()) as { did: string })
  }

  const didDoc = (await fetch(`https://plc.directory/${did}`).then((r) =>
    r.json(),
  )) as DidDoc
  const pds = didDoc.service?.find((s) => s.id === '#atproto_pds')?.serviceEndpoint
  if (!pds) throw new Error(`No PDS found for ${did}`)
  return { did, pds }
}

async function main() {
  const config = JSON.parse(readFileSync(CONFIG_PATH, 'utf-8')) as {
    siteUrl: string
    publicationUri?: string
    [key: string]: unknown
  }

  if (config.publicationUri?.startsWith('at://')) {
    console.log(`Publication already configured: ${config.publicationUri}`)
    console.log('Writing .well-known verification file…')
    mkdirSync(dirname(WELL_KNOWN_PATH), { recursive: true })
    writeFileSync(WELL_KNOWN_PATH, config.publicationUri)
    console.log(`Wrote ${WELL_KNOWN_PATH}`)
    return
  }

  const { did, pds } = await resolvePds(identifier)
  console.log(`Identity: ${identifier} → ${did}`)
  console.log(`PDS: ${pds}`)

  const sessionRes = await fetch(`${pds}/xrpc/com.atproto.server.createSession`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ identifier, password }),
  })
  if (!sessionRes.ok) {
    throw new Error(
      `Login failed: ${sessionRes.status} ${await sessionRes.text()}`,
    )
  }
  const session = (await sessionRes.json()) as {
    accessJwt: string
    did: string
  }

  const record = {
    $type: 'site.standard.publication',
    url: config.siteUrl,
    name: 'Lindsay Wardell',
    description: 'Programmer and writer.',
    createdAt: new Date().toISOString(),
    preferences: { showInDiscover: true },
  }

  const createRes = await fetch(`${pds}/xrpc/com.atproto.repo.createRecord`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${session.accessJwt}`,
    },
    body: JSON.stringify({
      repo: session.did,
      collection: 'site.standard.publication',
      record,
    }),
  })
  if (!createRes.ok) {
    throw new Error(
      `Failed to create publication: ${createRes.status} ${await createRes.text()}`,
    )
  }

  const created = (await createRes.json()) as { uri: string; cid: string }
  console.log(`Created publication: ${created.uri}`)

  config.publicationUri = created.uri
  writeFileSync(CONFIG_PATH, `${JSON.stringify(config, null, 2)}\n`)
  console.log(`Updated ${CONFIG_PATH}`)

  mkdirSync(dirname(WELL_KNOWN_PATH), { recursive: true })
  writeFileSync(WELL_KNOWN_PATH, created.uri)
  console.log(`Wrote ${WELL_KNOWN_PATH}`)

  console.log('\nNext: npm run sequoia:publish')
}

main().catch((err) => {
  console.error(err)
  process.exit(1)
})
