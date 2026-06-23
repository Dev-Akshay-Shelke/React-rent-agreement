import { useState, useEffect } from 'react'
import { NavLink, Link } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import RequestCallbackModal from './RequestCallbackModal'

const navItems = [
  { to: '/',         label: 'Home'     },
  { to: '/about',    label: 'About Us' },
  { to: '/services', label: 'Services' },
  { to: '/blog',     label: 'Blog'     },
  { to: '/contact',  label: 'Contact'  },
]

export default function Navbar() {
  const [menuOpen,  setMenuOpen]  = useState(false)
  const [modalOpen, setModalOpen] = useState(false)
  const [scrolled,  setScrolled]  = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <>
      {/* motion.nav — box-shadow animates smoothly on scroll rather than a hard class swap */}
      <motion.nav
        className="sticky top-0 z-50 bg-white border-b border-brand-border"
        animate={{
          boxShadow: scrolled
            ? '0 2px 18px rgba(26,43,73,0.11)'
            : '0 0 0 rgba(26,43,73,0)',
        }}
        transition={{ duration: 0.35, ease: 'easeOut' }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-18">

            {/* ── Brand ── */}
            <Link to="/" className="flex items-center group shrink-0">
              <picture>
                <source srcSet="/images/3Dlogo.webp" type="image/webp" />
                <img
                  src="/images/3Dlogo.png"
                  alt="Prime Document Solutions"
                  width="176"
                  height="88"
                  className="h-[88px] w-auto object-contain transition-transform duration-300 group-hover:scale-105 [filter:drop-shadow(0_2px_10px_rgba(26,43,73,0.18))]"
                  fetchpriority="high"
                />
              </picture>
            </Link>

            {/* ── Desktop nav links — stagger in on mount ── */}
            <div className="hidden md:flex items-center gap-0.5">
              {navItems.map(({ to, label }, i) => (
                <motion.div
                  key={to}
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.35, delay: i * 0.06 }}
                >
                  <NavLink
                    to={to}
                    end={to === '/'}
                    className={({ isActive }) =>
                      'relative px-4 py-2 rounded-lg text-sm transition-all duration-200 ' +
                      (isActive
                        ? 'text-white bg-brand-deep font-bold shadow-sm'
                        : 'text-brand-muted font-medium hover:text-brand-deep hover:bg-brand-light')
                    }
                  >
                    {label}
                  </NavLink>
                </motion.div>
              ))}
            </div>

            {/* ── Desktop CTA ── */}
            <div className="hidden md:block shrink-0">
              <button
                onClick={() => setModalOpen(true)}
                className="btn-primary px-5 py-2.5 text-sm"
              >
                <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                    d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
                Request Callback
              </button>
            </div>

            {/* ── Mobile hamburger ── */}
            <button
              className="md:hidden p-2 rounded-lg hover:bg-brand-light transition-colors focus:outline-none"
              aria-label="Toggle menu"
              onClick={() => setMenuOpen(!menuOpen)}
            >
              <div className="w-5 h-4 flex flex-col justify-between">
                <span className={`block h-0.5 bg-brand-deep rounded-full transition-all duration-300 origin-center ${menuOpen ? 'rotate-45 translate-y-[7px]' : ''}`} />
                <span className={`block h-0.5 bg-brand-deep rounded-full transition-all duration-300 ${menuOpen ? 'opacity-0 scale-x-0' : ''}`} />
                <span className={`block h-0.5 bg-brand-deep rounded-full transition-all duration-300 origin-center ${menuOpen ? '-rotate-45 -translate-y-[7px]' : ''}`} />
              </div>
            </button>
          </div>
        </div>

        {/* ── Mobile drawer — AnimatePresence for smooth slide-down ── */}
        <AnimatePresence initial={false}>
          {menuOpen && (
            <motion.div
              key="mobile-drawer"
              className="md:hidden overflow-hidden border-t border-brand-border bg-white"
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{   height: 0, opacity: 0 }}
              transition={{ duration: 0.3, ease: [0.25, 0.46, 0.45, 0.94] }}
            >
              <div className="px-4 pt-2 pb-5 space-y-1">
                {navItems.map(({ to, label }, i) => (
                  <motion.div
                    key={to}
                    initial={{ opacity: 0, x: -12 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.22, delay: i * 0.055 }}
                  >
                    <NavLink
                      to={to}
                      end={to === '/'}
                      onClick={() => setMenuOpen(false)}
                      className={({ isActive }) =>
                        'flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-semibold transition-all duration-200 ' +
                        (isActive
                          ? 'bg-brand-deep text-white shadow-sm'
                          : 'text-brand-muted hover:bg-brand-light hover:text-brand-deep')
                      }
                    >
                      {label}
                    </NavLink>
                  </motion.div>
                ))}
                <motion.div
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.22, delay: navItems.length * 0.055 }}
                >
                  <button
                    onClick={() => { setMenuOpen(false); setModalOpen(true) }}
                    className="btn-primary w-full mt-3 py-3 text-sm"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                        d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                    </svg>
                    Request Callback
                  </button>
                </motion.div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.nav>

      <RequestCallbackModal isOpen={modalOpen} onClose={() => setModalOpen(false)} />
    </>
  )
}

