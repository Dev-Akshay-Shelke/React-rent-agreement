// ─── Inline markdown renderer (no external dependency) ───────────────────────
// Handles: ## headings, **bold**, *italic*, - lists, 1. lists, --- hr, paragraphs, blockquotes

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

    // Blockquote
    if (line.startsWith('> ')) {
      out.push('<blockquote>')
      while (i < lines.length && lines[i].startsWith('> ')) {
        out.push(`<p>${inlineFmt(lines[i].slice(2).trim())}</p>`)
        i++
      }
      out.push('</blockquote>')
      continue
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

// Minimal frontmatter parser — strips --- block and returns body only
function parseBody(raw) {
  const match = raw.match(/^---\r?\n[\s\S]*?\r?\n---\r?\n([\s\S]*)$/)
  return match ? match[1].trim() : raw.trim()
}

// Lazy loaders — Vite creates one dynamic import per file, only fetched on demand
const contentLoaders = import.meta.glob(
  '../content/blog/*.md',
  { query: '?raw', import: 'default' }
)

// Load full content for a single post by slug — called only on BlogPost page
export async function loadBlogContent(slug) {
  const key = Object.keys(contentLoaders).find(k => k.includes(slug))
  if (!key) return null
  const raw = await contentLoaders[key]()
  const body = parseBody(raw)
  return { body, html: renderMarkdown(body) }
}