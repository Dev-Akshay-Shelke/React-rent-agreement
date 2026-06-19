import { useState, useEffect } from 'react'
import { NavLink, Link } from 'react-router-dom'
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
      <nav className={`sticky top-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-white shadow-[0_2px_12px_rgba(26,43,73,0.10)] border-b border-brand-border'
          : 'bg-white border-b border-brand-border'
      }`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-18">

            {/* ── Brand ── */}
            <Link to="/" className="flex items-center group shrink-0">
              <img
                src="/images/3Dlogo.png"
                alt="Prime Document Solutions"
                className="h-[88px] w-auto object-contain transition-transform duration-300 group-hover:scale-105 [filter:drop-shadow(0_2px_10px_rgba(26,43,73,0.18))]"
              />
            </Link>

            {/* ── Desktop nav links ── */}
            <div className="hidden md:flex items-center gap-0.5">
              {navItems.map(({ to, label }) => (
                <NavLink
                  key={to}
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

        {/* ── Mobile drawer ── */}
        <div className={`md:hidden overflow-hidden transition-all duration-300 ${menuOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'}`}>
          <div className="border-t border-brand-border bg-white px-4 pt-2 pb-5 space-y-1">
            {navItems.map(({ to, label }) => (
              <NavLink
                key={to}
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
            ))}
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
          </div>
        </div>
      </nav>

      <RequestCallbackModal isOpen={modalOpen} onClose={() => setModalOpen(false)} />
    </>
  )
}

