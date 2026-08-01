import { readFileSync } from 'node:fs'
import { resolve, dirname } from 'node:path'
import { fileURLToPath } from 'node:url'
import { spawn } from 'node:child_process'

const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), '..')

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
    // .env is optional; CI uses real env vars / secrets
  }
}

loadDotEnv()

const config = JSON.parse(
  readFileSync(resolve(ROOT, 'sequoia.json'), 'utf-8'),
) as { publicationUri?: string }

if (!config.publicationUri) {
  console.error('Publication not configured. Run: npm run sequoia:setup')
  process.exit(1)
}

if (!process.env.ATP_APP_PASSWORD && !process.env.SEQUOIA_PROFILE) {
  console.error(
    'No AT Proto credentials found. Add ATP_IDENTIFIER and ATP_APP_PASSWORD to .env,',
  )
  console.error("or run: npm run sequoia:login")
  process.exit(1)
}

const args = process.argv.slice(2)
const child = spawn('sequoia', args, {
  cwd: ROOT,
  stdio: 'inherit',
  env: process.env,
  shell: process.platform === 'win32',
})

child.on('exit', (code, signal) => {
  if (signal) {
    process.kill(process.pid, signal)
    return
  }
  process.exit(code ?? 1)
})
