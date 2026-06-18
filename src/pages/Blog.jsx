import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import { blogPosts } from '../data/blogPosts'

const categoryColors = {
  'Legal Guide':    'bg-blue-50 text-blue-700 border-blue-200',
  'How-To Guide':   'bg-green-50 text-green-700 border-green-200',
  'Legal Concepts': 'bg-amber-50 text-amber-700 border-amber-200',
}

export default function Blog() {
  return (
    <>
      <Navbar />

      {/* ── Header ── */}
      <section className="bg-gradient-to-br from-brand-deep to-brand-steel py-16 sm:py-20 px-4 text-center text-white relative overflow-hidden">
        <div className="absolute inset-0 opacity-10 pointer-events-none">
          <div className="absolute -top-20 left-1/4 w-72 h-72 bg-brand-teal rounded-full blur-3xl" />
          <div className="absolute -bottom-20 right-1/4 w-64 h-64 bg-brand-mint rounded-full blur-3xl" />
        </div>
        <motion.div
          className="relative z-10 max-w-2xl mx-auto"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <span className="inline-block text-brand-mint text-xs font-bold uppercase tracking-widest mb-3">Knowledge Hub</span>
          <h1 className="font-display text-3xl sm:text-4xl md:text-5xl font-black mb-4 tracking-tight">
            Rent Agreement Guide
          </h1>
          <p className="text-white/75 text-base sm:text-lg leading-relaxed">
            Expert articles on Maharashtra rent agreement laws, stamp duty, registration process,
            and everything landlords and tenants need to know.
          </p>
        </motion.div>
      </section>

      {/* ── Article Grid ── */}
      <section className="py-14 sm:py-20 px-4 bg-brand-light min-h-screen">
        <div className="max-w-6xl mx-auto">
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {blogPosts.map((post, i) => (
              <motion.article
                key={post.slug}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.45, delay: i * 0.07 }}
              >
                <Link
                  to={`/blog/${post.slug}`}
                  className="group block document-panel rounded-2xl overflow-hidden hover:shadow-card-hover hover:-translate-y-1 transition-all duration-300 h-full"
                >
                  {/* Top accent bar */}
                  <div className="h-1 w-full bg-gradient-to-r from-brand-deep to-brand-teal" />

                  <div className="p-6 flex flex-col h-full">
                    <div className="flex items-center justify-between mb-4">
                      <span className={`inline-block text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full border ${categoryColors[post.category] ?? 'bg-gray-50 text-gray-600 border-gray-200'}`}>
                        {post.category}
                      </span>
                      <span className="text-[11px] text-brand-muted">{post.readTime}</span>
                    </div>

                    <h2 className="font-display font-bold text-brand-deep text-base sm:text-[17px] leading-snug mb-3 group-hover:text-brand-cta transition-colors tracking-tight">
                      {post.title}
                    </h2>

                    <p className="text-brand-muted text-sm leading-relaxed flex-1 mb-5">
                      {post.excerpt}
                    </p>

                    <div className="flex items-center justify-between pt-4 border-t border-brand-border">
                      <time className="text-[11px] text-brand-muted">
                        {new Date(post.date).toLocaleDateString('en-IN', { year: 'numeric', month: 'long', day: 'numeric' })}
                      </time>
                      <span className="inline-flex items-center gap-1 text-xs font-bold text-brand-deep group-hover:text-brand-teal transition-colors">
                        Read Article
                        <svg className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                      </span>
                    </div>
                  </div>
                </Link>
              </motion.article>
            ))}
          </div>

          {/* Trust note */}
          <motion.div
            className="mt-12 document-panel rounded-2xl p-6 sm:p-8 text-center"
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <p className="text-brand-muted text-sm leading-relaxed max-w-2xl mx-auto">
              All articles are written by our legal documentation experts and reflect the current
              Maharashtra Rent Control Act and Registration Act provisions.
              For personalized advice, <Link to="/contact" className="font-semibold text-brand-deep underline underline-offset-2 hover:text-brand-teal">contact our team directly</Link>.
            </p>
          </motion.div>
        </div>
      </section>

      <Footer />
    </>
  )
}
