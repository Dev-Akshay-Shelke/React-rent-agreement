import { useEffect } from 'react'
import { motion } from 'framer-motion'
import { Link, useParams, Navigate } from 'react-router-dom'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import { blogPosts, extractTOC } from '../data/blogPosts'

const categoryColors = {
  'Legal Guide':    'bg-blue-50 text-blue-700 border-blue-200',
  'How-To Guide':   'bg-green-50 text-green-700 border-green-200',
  'Legal Concepts': 'bg-amber-50 text-amber-700 border-amber-200',
}

export default function BlogPost() {
  const { slug } = useParams()
  const post = blogPosts.find(p => p.slug === slug)

  // Update page title and meta for SEO
  useEffect(() => {
    if (!post) return
    document.title = `${post.title} | Prime Document Solutions`
    const metaDesc = document.querySelector('meta[name="description"]')
    if (metaDesc) metaDesc.setAttribute('content', post.excerpt)

    // Inject JSON-LD Article schema
    const existing = document.getElementById('blog-post-ld')
    if (existing) existing.remove()
    const script = document.createElement('script')
    script.id = 'blog-post-ld'
    script.type = 'application/ld+json'
    script.textContent = JSON.stringify({
      '@context': 'https://schema.org',
      '@type': 'Article',
      headline: post.title,
      description: post.excerpt,
      datePublished: post.date,
      dateModified: post.date,
      author: {
        '@type': 'Organization',
        name: 'Prime Document Solutions',
        url: 'https://www.primedocumentsolutions.in/',
      },
      publisher: {
        '@type': 'Organization',
        name: 'Prime Document Solutions',
        logo: {
          '@type': 'ImageObject',
          url: 'https://www.primedocumentsolutions.in/images/3Dlogo.png',
        },
      },
      mainEntityOfPage: {
        '@type': 'WebPage',
        '@id': `https://www.primedocumentsolutions.in/blog/${post.slug}`,
      },
      keywords: post.keywords.join(', '),
      about: { '@type': 'Thing', name: 'Rent Agreement Registration Maharashtra' },
    })
    document.head.appendChild(script)

    return () => {
      document.title = 'Rent Agreement Registration Pune | Prime Document Solutions'
      const s = document.getElementById('blog-post-ld')
      if (s) s.remove()
    }
  }, [post])

  if (!post) return <Navigate to="/blog" replace />

  const related = blogPosts.filter(p => p.slug !== slug).slice(0, 2)
  const toc = extractTOC(post.body)

  return (
    <>
      <Navbar />

      {/* Breadcrumb */}
      <nav className="bg-white border-b border-brand-border px-4 py-3" aria-label="Breadcrumb">
        <div className="max-w-4xl mx-auto flex items-center gap-2 text-xs text-brand-muted">
          <Link to="/" className="hover:text-brand-deep transition-colors">Home</Link>
          <span>/</span>
          <Link to="/blog" className="hover:text-brand-deep transition-colors">Blog</Link>
          <span>/</span>
          <span className="text-brand-deep font-medium truncate max-w-[240px]">{post.title}</span>
        </div>
      </nav>

      <main className="py-12 sm:py-16 px-4 bg-brand-light min-h-screen">
        <div className="max-w-4xl mx-auto">

          {/* Article header */}
          <motion.header
            className="mb-10"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="flex items-center gap-3 mb-5">
              <span className={`inline-block text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full border ${categoryColors[post.category] ?? 'bg-gray-50 text-gray-600 border-gray-200'}`}>
                {post.category}
              </span>
              <span className="text-xs text-brand-muted">{post.readTime}</span>
              <span className="text-xs text-brand-muted">
                {new Date(post.date).toLocaleDateString('en-IN', { year: 'numeric', month: 'long', day: 'numeric' })}
              </span>
            </div>

            <h1 className="font-display text-2xl sm:text-3xl md:text-4xl font-black text-brand-deep leading-tight tracking-tight mb-4">
              {post.title}
            </h1>
            <p className="text-brand-muted text-base sm:text-lg leading-relaxed border-l-4 border-brand-teal pl-4">
              {post.excerpt}
            </p>
          </motion.header>

          <div className="grid lg:grid-cols-[1fr_280px] gap-8 items-start">

            {/* Article body */}
            <motion.article
              className="document-panel rounded-2xl p-6 sm:p-8 lg:p-10"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
            >
              {/* Markdown-rendered article body */}
              <div
                className="blog-prose"
                dangerouslySetInnerHTML={{ __html: post.html }}
              />

              {/* Bottom CTA */}
              <div className="mt-10 pt-8 border-t border-brand-border">
                <div className="bg-brand-deep rounded-2xl p-6 text-center">
                  <p className="text-brand-mint text-[11px] font-bold uppercase tracking-[0.18em] mb-2">Ready to register?</p>
                  <h3 className="font-display text-white text-xl font-bold mb-3">
                    Get Your Rent Agreement Done in 24–48 Hours
                  </h3>
                  <p className="text-white/70 text-sm mb-5 leading-relaxed">
                    Serving Pune (Nanded City, Wakad, Hinjwadi, Warje, Kothrud &amp; all areas) and Mumbai. Doorstep biometric. Government approved.
                  </p>
                  <div className="flex flex-col sm:flex-row gap-3 justify-center">
                    <Link to="/contact" className="btn-primary px-6 py-3 text-sm">
                      Start Registration
                    </Link>
                    <a
                      href="https://wa.me/918767393079?text=Hello!%20I%20read%20your%20blog%20and%20want%20to%20register%20a%20rent%20agreement."
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-green-600 hover:bg-green-700 text-white font-semibold text-sm rounded-xl transition-colors"
                    >
                      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                      </svg>
                      WhatsApp Us
                    </a>
                  </div>
                </div>
              </div>
            </motion.article>

            {/* Sidebar */}
            <aside className="space-y-5">

              {/* Quick links */}
              <motion.div
                className="document-panel rounded-2xl p-5"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.15 }}
              >
                <h3 className="font-display font-bold text-brand-deep text-sm mb-4 uppercase tracking-wider">In This Article</h3>
                <ol className="space-y-2.5">
                  {toc.map((heading, i) => (
                    <li key={i} className="flex items-start gap-2 text-xs text-brand-muted leading-relaxed">
                      <span className="mt-0.5 flex-shrink-0 w-4 h-4 rounded bg-brand-light text-brand-deep text-[9px] font-bold flex items-center justify-center">
                        {i + 1}
                      </span>
                      {heading}
                    </li>
                  ))}
                </ol>
              </motion.div>

              {/* Contact card */}
              <motion.div
                className="bg-brand-deep rounded-2xl p-5 text-white"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
              >
                <p className="text-brand-mint text-[10px] font-bold uppercase tracking-widest mb-2">Need Help?</p>
                <p className="font-display font-bold text-base mb-2">Talk to an Expert</p>
                <p className="text-white/65 text-xs leading-relaxed mb-4">
                  Get your rent agreement done in 24–48 hrs. Doorstep service across Pune &amp; Mumbai.
                </p>
                <Link to="/contact" className="btn-primary w-full py-2.5 text-xs justify-center">
                  Get Started
                </Link>
                <a
                  href="tel:+919356480165"
                  className="flex items-center gap-2 mt-2.5 text-white/75 hover:text-white text-xs transition-colors"
                >
                  <svg className="w-3.5 h-3.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                  +91 93564 80165
                </a>
              </motion.div>

              {/* Related articles */}
              {related.length > 0 && (
                <motion.div
                  className="document-panel rounded-2xl p-5"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6, delay: 0.25 }}
                >
                  <h3 className="font-display font-bold text-brand-deep text-sm mb-4 uppercase tracking-wider">Related Articles</h3>
                  <div className="space-y-4">
                    {related.map(p => (
                      <Link
                        key={p.slug}
                        to={`/blog/${p.slug}`}
                        className="group block"
                      >
                        <span className={`inline-block text-[9px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full border mb-1.5 ${categoryColors[p.category] ?? 'bg-gray-50 text-gray-600 border-gray-200'}`}>
                          {p.category}
                        </span>
                        <p className="text-xs font-semibold text-brand-deep group-hover:text-brand-teal leading-snug transition-colors">
                          {p.title}
                        </p>
                      </Link>
                    ))}
                  </div>
                </motion.div>
              )}
            </aside>
          </div>

          {/* Back to blog */}
          <div className="mt-10">
            <Link
              to="/blog"
              className="inline-flex items-center gap-2 text-sm font-semibold text-brand-muted hover:text-brand-deep transition-colors"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
              Back to all articles
            </Link>
          </div>

        </div>
      </main>

      <Footer />
    </>
  )
}
