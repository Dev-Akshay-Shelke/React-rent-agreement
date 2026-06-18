// ─── Inline markdown renderer (no external dependency) ───────────────────────
// Handles: ## headings, **bold**, *italic*, - lists, 1. lists, --- hr, paragraphs

function inlineFmt(text) {
  return text
    .replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>')
    .replace(/\*(.+?)\*/g, '<em>$1</em>')
    .replace(/`(.+?)`/g, '<code>$1</code>')
}

function renderMarkdown(md) {
  const lines = md.split('\n')
  const out = []
  let i = 0

  while (i < lines.length) {
    const line = lines[i]

    // H2 heading
    if (line.startsWith('## ')) {
      out.push(`<h2>${inlineFmt(line.slice(3).trim())}</h2>`)
      i++; continue
    }

    // HR
    if (/^---+$/.test(line.trim())) {
      out.push('<hr>')
      i++; continue
    }

    // Unordered list
    if (/^[-*] /.test(line)) {
      out.push('<ul>')
      while (i < lines.length && /^[-*] /.test(lines[i])) {
        out.push(`<li>${inlineFmt(lines[i].replace(/^[-*] /, '').trim())}</li>`)
        i++
      }
      out.push('</ul>')
      continue
    }

    // Ordered list
    if (/^\d+\. /.test(line)) {
      out.push('<ol>')
      while (i < lines.length && /^\d+\. /.test(lines[i])) {
        out.push(`<li>${inlineFmt(lines[i].replace(/^\d+\. /, '').trim())}</li>`)
        i++
      }
      out.push('</ol>')
      continue
    }

    // Non-empty line → paragraph
    if (line.trim()) {
      out.push(`<p>${inlineFmt(line.trim())}</p>`)
    }

    i++
  }

  return out.join('\n')
}

// Extract H2 headings for sidebar table of contents
export function extractTOC(markdown) {
  return (markdown.match(/^## (.+)$/gm) || []).map(h => h.replace(/^## /, '').trim())
}

// Load all .md files from src/content/blog/ at build time via Vite glob
const rawFiles = import.meta.glob(
  '../content/blog/*.md',
  { query: '?raw', import: 'default', eager: true }
)

// Minimal frontmatter parser
function parseFrontmatter(raw) {
  const match = raw.match(/^---\r?\n([\s\S]*?)\r?\n---\r?\n([\s\S]*)$/)
  if (!match) return { meta: {}, body: raw }
  const meta = {}
  match[1].split('\n').forEach(line => {
    const idx = line.indexOf(':')
    if (idx === -1) return
    const key = line.slice(0, idx).trim()
    const val = line.slice(idx + 1).trim().replace(/^['"]|['"]$/g, '')
    if (key && val) meta[key] = val
  })
  return { meta, body: match[2].trim() }
}

export const blogPosts = Object.entries(rawFiles)
  .map(([path, raw]) => {
    const { meta, body } = parseFrontmatter(raw)
    return {
      slug:     meta.slug     || path.split('/').pop().replace('.md', ''),
      title:    meta.title    || '',
      excerpt:  meta.excerpt  || '',
      category: meta.category || '',
      readTime: meta.readTime || '',
      date:     meta.date     || '',
      keywords: meta.keywords ? meta.keywords.split(',').map(k => k.trim()) : [],
      body,
      html: renderMarkdown(body),
    }
  })
  .sort((a, b) => new Date(b.date) - new Date(a.date))