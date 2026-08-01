import { readFileSync, writeFileSync } from 'node:fs'

/** Parse simple scalar YAML frontmatter (enough for our blog posts). */
export function parseFrontmatter(raw: string): Record<string, string | boolean> {
  const match = raw.match(/^---\r?\n([\s\S]*?)\r?\n---/)
  if (!match) return {}
  const out: Record<string, string | boolean> = {}
  for (const line of match[1].split('\n')) {
    const m = line.match(/^(\w+):\s*(.*)$/)
    if (!m) continue
    const key = m[1]
    let value = m[2].trim()
    if (value === 'true') {
      out[key] = true
      continue
    }
    if (value === 'false') {
      out[key] = false
      continue
    }
    if (
      (value.startsWith('"') && value.endsWith('"')) ||
      (value.startsWith("'") && value.endsWith("'"))
    ) {
      value = value.slice(1, -1)
    }
    out[key] = value
  }
  return out
}

function formatValue(value: string): string {
  // Always quote: Mastodon snowflake IDs must not be parsed as numbers.
  return JSON.stringify(value)
}

/**
 * Set or replace scalar frontmatter fields. Does not remove other fields.
 * Returns whether the file content changed.
 */
export function upsertFrontmatter(
  filePath: string,
  fields: Record<string, string | undefined | null>,
): boolean {
  const raw = readFileSync(filePath, 'utf-8')
  const match = raw.match(/^---\r?\n([\s\S]*?)\r?\n---(\r?\n)/)
  if (!match) {
    throw new Error(`No frontmatter in ${filePath}`)
  }

  let fm = match[1]
  let changed = false

  for (const [key, value] of Object.entries(fields)) {
    if (value == null || value === '') continue
    const line = `${key}: ${formatValue(value)}`
    const re = new RegExp(`^${key}:\\s*.*$`, 'm')
    if (re.test(fm)) {
      const next = fm.replace(re, line)
      if (next !== fm) {
        fm = next
        changed = true
      }
    } else {
      fm = `${fm.trimEnd()}\n${line}`
      changed = true
    }
  }

  if (!changed) return false

  const updated = `---\n${fm.trim()}\n---${match[2]}${raw.slice(match[0].length)}`
  writeFileSync(filePath, updated)
  return true
}
