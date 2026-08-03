/**
 * Send outbound webmentions for the latest post in the live RSS feed.
 *
 * Uses @remy/webmention (no webmention.app token required). Discovers links on
 * the latest entry, finds endpoints, and POSTs source/target pairs.
 *
 * Flags:
 *   --dry-run     discovery only (default for safety when flag present)
 *   --skip-wait   don't wait for RSS (site already live)
 *
 * Env:
 *   WEBMENTION_FEED_URL  (default https://lindsaykwardell.com/rss.xml)
 *   WEBMENTION_LIMIT     (default 1)
 */
import { spawn } from 'node:child_process'
import { resolve, dirname } from 'node:path'
import { fileURLToPath } from 'node:url'

const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), '..')
const feedUrl =
  process.env.WEBMENTION_FEED_URL || 'https://lindsaykwardell.com/rss.xml'
const limit = process.env.WEBMENTION_LIMIT || '1'
const dryRun = process.argv.includes('--dry-run')
const skipWait = process.argv.includes('--skip-wait')

function sleep(ms: number) {
  return new Promise((r) => setTimeout(r, ms))
}

async function waitForFeed(timeoutMs = 3 * 60 * 1000) {
  const started = Date.now()
  while (Date.now() - started < timeoutMs) {
    try {
      const res = await fetch(feedUrl, {
        headers: { 'Cache-Control': 'no-cache' },
      })
      if (res.ok) return
      console.log(`Feed ${res.status}; waiting…`)
    } catch {
      console.log('Feed unreachable; waiting…')
    }
    await sleep(15_000)
  }
  throw new Error(`Timed out waiting for ${feedUrl}`)
}

function runWebmention(): Promise<number> {
  const args = [feedUrl, `--limit`, String(limit)]
  if (!dryRun) args.push('--send')

  console.log(
    `${dryRun ? 'Dry-run' : 'Sending'} webmentions from ${feedUrl} (limit ${limit})`,
  )

  return new Promise((resolveCode) => {
    const child = spawn(
      resolve(ROOT, 'node_modules/.bin/webmention'),
      args,
      {
        cwd: ROOT,
        stdio: 'inherit',
        env: process.env,
        shell: process.platform === 'win32',
      },
    )
    child.on('exit', (code) => resolveCode(code ?? 1))
  })
}

if (!skipWait) {
  await waitForFeed()
}

const code = await runWebmention()
process.exit(code)
