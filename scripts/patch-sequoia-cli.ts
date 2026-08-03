/**
 * Patch sequoia-cli's updateFrontmatterWithAtUri so it does not treat "---"
 * inside URL values (common in Spotify episode slugs) as the frontmatter closer.
 * Applied on postinstall until upstream fixes this.
 */
import { readFileSync, writeFileSync, existsSync } from 'node:fs'
import { resolve, dirname } from 'node:path'
import { fileURLToPath } from 'node:url'

const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), '..')
const TARGET = resolve(ROOT, 'node_modules/sequoia-cli/dist/index.js')

const MARKER = 'Closing delimiter must start a line'

if (!existsSync(TARGET)) {
  console.warn('sequoia-cli not installed; skip patch')
  process.exit(0)
}

let text = readFileSync(TARGET, 'utf-8')
if (text.includes(MARKER)) {
  console.log('sequoia-cli frontmatter patch already applied')
  process.exit(0)
}

const start = text.indexOf('function updateFrontmatterWithAtUri(rawContent, atUri) {')
if (start === -1) {
  console.warn('sequoia-cli updateFrontmatterWithAtUri not found; patch skipped')
  process.exit(0)
}

const endMarker = '\nfunction stripMarkdownForText('
const end = text.indexOf(endMarker, start)
if (end === -1) {
  console.warn('Could not locate end of updateFrontmatterWithAtUri; patch skipped')
  process.exit(0)
}

const original = text.slice(start, end)
if (!original.includes('rawContent.indexOf(delimiter, 4)')) {
  console.warn(
    'sequoia-cli frontmatter writer already differs; patch skipped',
  )
  process.exit(0)
}

const patched = `function updateFrontmatterWithAtUri(rawContent, atUri) {
  const delimiterMatch = rawContent.match(/^(---|\\+\\+\\+|\\*\\*\\*)/);
  const delimiter = delimiterMatch?.[1] ?? "---";
  const isToml = delimiter === "+++";
  const atUriEntry = isToml ? \`atUri = "\${atUri}"\` : \`atUri: "\${atUri}"\`;
  const existingRe = isToml
    ? /^atUri\\s*=\\s*["']?[^"'\\n]+["']?\\n?/m
    : /^atUri\\s*:\\s*["']?[^"'\\n]+["']?\\n?/m;
  if (existingRe.test(rawContent)) {
    return rawContent.replace(existingRe, \`\${atUriEntry}\\n\`);
  }
  // ${MARKER} — URLs often contain "---" (e.g. Spotify).
  const frontmatterEndIndex = rawContent.indexOf(\`\\n\${delimiter}\`, 3);
  if (frontmatterEndIndex === -1) {
    throw new Error("Could not find frontmatter end");
  }
  const insertAt = frontmatterEndIndex + 1;
  const beforeEnd = rawContent.slice(0, insertAt);
  const afterEnd = rawContent.slice(insertAt);
  return \`\${beforeEnd}\${atUriEntry}\\n\${afterEnd}\`;
}
`

text = text.slice(0, start) + patched + text.slice(end)
writeFileSync(TARGET, text)
console.log('Applied sequoia-cli frontmatter delimiter patch')
