import { readFileSync, readdirSync } from 'node:fs'
import { resolve, dirname } from 'node:path'
import { fileURLToPath } from 'node:url'
import { spawn } from 'node:child_process'
import {
  parseFrontmatter,
  parseTagsFromFrontmatter,
  replaceTagsInFile,
} from './lib/frontmatter.ts'
import { documentTags, normalizeTopicTags } from '../src/lib/tags.ts'

const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), '..')
const CONTENT_DIR = resolve(ROOT, 'src/content/blog')

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

/**
 * Sequoia only reads frontmatter.tags. Temporarily merge normalized type into
 * tags so site.standard.document gets type + topics, then restore topic-only.
 */
function withDocumentTags<T>(fn: () => Promise<T>): Promise<T> {
  const files = readdirSync(CONTENT_DIR).filter((f) => f.endsWith('.md'))
  const restores: Array<{
    filePath: string
    tags: string[] | null
  }> = []

  for (const file of files) {
    const filePath = resolve(CONTENT_DIR, file)
    const raw = readFileSync(filePath, 'utf-8')
    const fmMatch = raw.match(/^---\r?\n([\s\S]*?)\r?\n---/)
    if (!fmMatch) continue

    const fm = parseFrontmatter(raw)
    if (fm.draft === true) continue

    const type = fm.type ? String(fm.type) : null
    const hadTags = /^tags:/m.test(fmMatch[1])
    const topics = normalizeTopicTags(
      parseTagsFromFrontmatter(fmMatch[1]),
      type,
    )
    const merged = documentTags(type, topics)
    if (merged.length === 0) continue
    if (
      topics.length === merged.length &&
      topics.every((t, i) => t === merged[i])
    ) {
      continue
    }

    restores.push({
      filePath,
      // Restore to topic tags, or remove the field if it wasn't there
      tags: hadTags || topics.length > 0 ? topics : null,
    })
    replaceTagsInFile(filePath, merged)
  }

  const restore = () => {
    for (const { filePath, tags } of restores) {
      replaceTagsInFile(filePath, tags)
    }
  }

  return fn().finally(restore)
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
  console.error('or run: npm run sequoia:login')
  process.exit(1)
}

const args = process.argv.slice(2)
const isPublish = args[0] === 'publish'

async function runSequoia(): Promise<number> {
  return new Promise((resolvePromise) => {
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
      resolvePromise(code ?? 1)
    })
  })
}

const code = isPublish
  ? await withDocumentTags(runSequoia)
  : await runSequoia()

process.exit(code)
