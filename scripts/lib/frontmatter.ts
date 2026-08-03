import { readFileSync, writeFileSync } from 'node:fs'

function unquote(value: string): string {
  const v = value.trim()
  if (
    (v.startsWith('"') && v.endsWith('"')) ||
    (v.startsWith("'") && v.endsWith("'"))
  ) {
    return v.slice(1, -1)
  }
  return v
}

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
    out[key] = unquote(value)
  }
  return out
}

/** Read `tags` from a frontmatter block (list, inline, or empty). */
export function parseTagsFromFrontmatter(fmBlock: string): string[] {
  const tags: string[] = []
  const lines = fmBlock.split('\n')
  let inTags = false
  for (const line of lines) {
    if (/^tags:\s*$/.test(line)) {
      inTags = true
      continue
    }
    if (inTags) {
      const item = line.match(/^\s+-\s+(.+)$/)
      if (item) {
        const v = unquote(item[1])
        if (v) tags.push(v)
        continue
      }
      if (/^\w+:/.test(line)) break
      if (line.trim() === '') continue
      break
    }
    const inline = line.match(/^tags:\s*\[(.*)\]\s*$/)
    if (inline) {
      for (const part of inline[1].split(',')) {
        const v = unquote(part)
        if (v) tags.push(v)
      }
    }
  }
  return tags
}

export function formatTagsYaml(tags: string[]): string {
  if (tags.length === 0) return 'tags: []'
  return `tags:\n${tags.map((t) => `  - ${t}`).join('\n')}`
}

/**
 * Find the tags field span inside a frontmatter block.
 * Returns [start, end) indexes into `fm`, or null if absent.
 */
function findTagsSpan(fm: string): { start: number; end: number } | null {
  const start = fm.search(/^tags:/m)
  if (start === -1) return null

  const afterKey = fm.slice(start)
  const firstLineEnd = afterKey.indexOf('\n')
  const firstLine =
    firstLineEnd === -1 ? afterKey : afterKey.slice(0, firstLineEnd)

  // Inline: tags: [...] or tags: []
  if (/^tags:\s*\[/.test(firstLine)) {
    const end = firstLineEnd === -1 ? fm.length : start + firstLineEnd
    return { start, end }
  }

  // Bare: tags:
  // List: tags:\n  - a\n  - b
  let end = firstLineEnd === -1 ? fm.length : start + firstLineEnd
  if (firstLineEnd !== -1) {
    let offset = start + firstLineEnd + 1
    while (offset < fm.length) {
      const nextBreak = fm.indexOf('\n', offset)
      const line = nextBreak === -1 ? fm.slice(offset) : fm.slice(offset, nextBreak)
      if (/^[ \t]+-[ \t]+/.test(line)) {
        end = nextBreak === -1 ? fm.length : nextBreak
        offset = nextBreak === -1 ? fm.length : nextBreak + 1
        continue
      }
      break
    }
  }
  return { start, end }
}

/**
 * Replace, insert, or remove the tags field in a markdown file's frontmatter.
 * Pass `null` to remove the field entirely.
 * Returns whether the file changed.
 */
export function replaceTagsInFile(
  filePath: string,
  tags: string[] | null,
): boolean {
  const raw = readFileSync(filePath, 'utf-8')
  const match = raw.match(/^---\r?\n([\s\S]*?)\r?\n---(\r?\n)/)
  if (!match) throw new Error(`No frontmatter in ${filePath}`)

  const fm = match[1]
  const span = findTagsSpan(fm)

  let nextFm: string
  if (tags === null) {
    if (!span) return false
    const before = fm.slice(0, span.start).replace(/\s+$/, '')
    const after = fm.slice(span.end).replace(/^\s+/, '\n')
    nextFm = `${before}${after}`.replace(/\n{3,}/g, '\n\n').trim()
  } else {
    const block = formatTagsYaml(tags)
    if (!span) {
      nextFm = `${fm.trimEnd()}\n${block}`
    } else {
      const before = fm.slice(0, span.start)
      let after = fm.slice(span.end)
      // Keep exactly one newline between tags block and the next key
      after = after.replace(/^\r?\n?/, '\n')
      nextFm = `${before}${block}${after}`.replace(/\n{3,}/g, '\n\n')
      nextFm = nextFm.replace(/\s+$/, '')
    }
  }

  if (nextFm === fm.trimEnd() || nextFm === fm) return false

  const updated = `---\n${nextFm}\n---${match[2]}${raw.slice(match[0].length)}`
  writeFileSync(filePath, updated)
  return true
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
