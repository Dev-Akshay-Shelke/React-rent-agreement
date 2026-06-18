import { useState } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import CounterCard from '../components/CounterCard'
import RequestCallbackModal from '../components/RequestCallbackModal'

const FOUNDING_YEAR = 2021
const yearsActive   = new Date().getFullYear() - FOUNDING_YEAR

const features = [
  {
    icon: '🛡️',
    title: 'Legally Compliant',
    desc: 'Government-approved registration with certified digital copies. Fully compliant with Maharashtra Rent Control Act.',
    accent: 'from-sky-500/10 to-blue-500/10',
    ring:   'ring-sky-200',
  },
  {
    icon: '⚡',
    title: 'Fast 24–48 Hr Process',
    desc: 'From document submission to certified agreement — everything processed within 24 to 48 hours.',
    accent: 'from-teal-500/10 to-cyan-500/10',
    ring:   'ring-teal-200',
  },
  {
    icon: '🏠',
    title: 'Doorstep Biometric',
    desc: 'Our agent visits your location for biometric verification. Zero office visits required from your side.',
    accent: 'from-orange-500/10 to-amber-500/10',
    ring:   'ring-orange-200',
  },
  {
    icon: '💰',
    title: 'Transparent Pricing',
    desc: 'Clear stamp duty computations with no hidden fees. Competitive flat-rate service charges.',
    accent: 'from-emerald-500/10 to-green-500/10',
    ring:   'ring-emerald-200',
  },
  {
    icon: '📱',
    title: '100% Online',
    desc: 'Submit documents, track your progress, and receive your registered certificate — all digitally.',
    accent: 'from-violet-500/10 to-purple-500/10',
    ring:   'ring-violet-200',
  },
  {
    icon: '🤝',
    title: 'Expert Support',
    desc: 'Dedicated document specialists available 7 days a week — 10 AM to 7 PM — to handle all your queries.',
    accent: 'from-pink-500/10 to-rose-500/10',
    ring:   'ring-pink-200',
  },
]

const steps = [
  { n: '01', title: 'Share Details',     desc: 'Fill our quick form with landlord, tenant & property information.' },
  { n: '02', title: 'Draft Preparation', desc: 'Our legal team prepares a vetted agreement draft for your review.' },
  { n: '03', title: 'e-KYC & Biometric', desc: 'Aadhaar-based verification done at your doorstep by our agent.' },
  { n: '04', title: 'Registration',      desc: 'Agreement is officially registered on the government portal.' },
  { n: '05', title: 'Get Certificate',   desc: 'Receive your stamped digital copy via WhatsApp & email instantly.' },
]

const stagger = {
  hidden:  {},
  visible: { transition: { staggerChildren: 0.09 } },
}
const fadeCard = {
  hidden:  { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.45, ease: 'easeOut' } },
}

export default function Home() {
  const [callbackOpen, setCallbackOpen] = useState(false)

  return (
    <>
      <Navbar />

      {/* ━━━━━━━━━━ HERO ━━━━━━━━━━ */}
      <header className="hero-bg relative overflow-hidden min-h-[82vh] sm:min-h-[88vh] flex items-center">
        {/* Overlay */}
        <div className="absolute inset-0 bg-gradient-to-br from-brand-deep/96 via-brand-deep/90 to-brand-steel/80" />
        {/* Ambient blobs */}
        <div className="absolute -top-40 -right-40 w-[700px] h-[700px] bg-brand-cta/8 rounded-full blur-[120px] pointer-events-none" />
        <div className="absolute -bottom-40 -left-40 w-[500px] h-[500px] bg-brand-mint/6 rounded-full blur-[100px] pointer-events-none" />

        <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24 md:py-32">
          <motion.div
            className="max-w-3xl"
            initial={{ opacity: 0, y: 32 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: 'easeOut' }}
          >
            {/* Animated trust badge */}
            <motion.div
              className="inline-flex items-center gap-2.5 mb-8"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.15, duration: 0.5 }}
            >
              <span className="relative flex h-2.5 w-2.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-brand-mint opacity-70" />
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-brand-mint" />
              </span>
              <span className="bg-white/10 border border-white/20 text-brand-mint text-xs font-semibold px-4 py-1.5 rounded-full tracking-wide backdrop-blur-sm">
                Trusted by 11,500+ Clients Across Pune
              </span>
            </motion.div>

            {/* Headline with gradient text */}
            <h1 className="font-display text-4xl sm:text-5xl md:text-[3.8rem] font-black text-white leading-[1.08] mb-6 tracking-tight">
              Rent Agreement
              <span className="block gradient-text pb-1">Registered Online</span>
              <span className="block text-xl sm:text-2xl md:text-3xl font-semibold text-white/60 mt-2 tracking-normal">
                Fast, Legal &amp; Hassle-Free
              </span>
            </h1>

            <p className="text-base sm:text-lg text-white/70 mb-10 leading-relaxed max-w-2xl">
              Maharashtra's most trusted platform for Leave &amp; License registration.
              Government-approved, doorstep biometric, certified digital delivery — all in 24–48 hours.
            </p>

            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
              <Link to="/services" className="btn-primary px-8 py-4 text-base">
                Explore Our Services
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </Link>
              <button
                onClick={() => setCallbackOpen(true)}
                className="btn-ghost-white px-8 py-4 text-base"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                    d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
                Request a Callback
              </button>
            </div>
          </motion.div>
        </div>
      </header>

      {/* ━━━━━━━━━━ STATS STRIP ━━━━━━━━━━ */}
      <section className="bg-brand-deep">
        <div className="max-w-5xl mx-auto px-4 py-10 sm:py-12">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
            <CounterCard icon="📂" target={11500} suffix="+"      label="Registered Agreements" />
            <CounterCard icon="📈" target={250}   suffix="+"      label="Agreements Last Month" />
            <CounterCard icon="🌟" target={yearsActive} suffix="+ Yrs" label="Years of Excellence" />
          </div>
        </div>
      </section>

      {/* ━━━━━━━━━━ FEATURES ━━━━━━━━━━ */}
      <section className="py-16 sm:py-24 px-4 bg-white">
        <div className="max-w-7xl mx-auto">
          <motion.div
            className="text-center mb-14"
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.55 }}
          >
            <span className="section-label">Why Choose Us</span>
            <h2 className="font-display text-3xl md:text-4xl font-black text-brand-deep mt-1 mb-4 tracking-tight">
              Everything for Hassle-Free Registration
            </h2>
            <p className="text-brand-muted text-base sm:text-lg max-w-2xl mx-auto leading-relaxed">
              Legal expertise meets modern technology for a seamless, secure experience every time.
            </p>
          </motion.div>

          <motion.div
            className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6"
            variants={stagger}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.05 }}
          >
            {features.map((f) => (
              <motion.div
                key={f.title}
                variants={fadeCard}
                className="feature-card card-top-stripe relative rounded-2xl p-7 border border-gray-100 bg-white shadow-card"
              >
                {/* Icon ring */}
                <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${f.accent} ring-1 ${f.ring} flex items-center justify-center text-2xl mb-5`}>
                  {f.icon}
                </div>
                <h3 className="font-display text-[17px] font-bold text-brand-deep mb-2 tracking-tight">{f.title}</h3>
                <p className="text-brand-muted text-sm leading-relaxed">{f.desc}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ━━━━━━━━━━ PROCESS STEPS ━━━━━━━━━━ */}
      <section className="py-16 sm:py-24 px-4 bg-brand-light">
        <div className="max-w-7xl mx-auto">
          <motion.div
            className="text-center mb-14"
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.55 }}
          >
            <span className="section-label">Simple Process</span>
            <h2 className="font-display text-3xl md:text-4xl font-black text-brand-deep mt-1 mb-4 tracking-tight">
              Registered in 5 Easy Steps
            </h2>
            <p className="text-brand-muted text-base sm:text-lg max-w-2xl mx-auto">
              From form submission to certified document — entirely online, entirely hassle-free.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 sm:gap-5">
            {steps.map((step, i) => (
              <motion.div
                key={step.n}
                className="relative bg-white rounded-2xl p-6 shadow-card border border-white text-center hover:shadow-card-hover hover:-translate-y-1.5 transition-all duration-300"
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.45, delay: i * 0.07 }}
              >
                {/* Number badge */}
                <div className="w-11 h-11 bg-gradient-to-br from-brand-cta to-brand-teal text-white font-display font-black text-sm rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-glow-sm">
                  {step.n}
                </div>
                <h3 className="font-display font-bold text-brand-deep text-sm mb-2 tracking-tight">{step.title}</h3>
                <p className="text-brand-muted text-xs leading-relaxed">{step.desc}</p>
                {/* Connector arrow on desktop */}
                {i < steps.length - 1 && (
                  <div className="hidden lg:flex absolute top-[1.75rem] -right-3.5 items-center">
                    <svg className="w-7 h-7 text-brand-cta/50" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 5l7 7-7 7" />
                    </svg>
                  </div>
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ━━━━━━━━━━ CTA BANNER ━━━━━━━━━━ */}
      <section className="py-16 sm:py-24 px-4 bg-gradient-to-br from-brand-deep via-brand-steel to-brand-deep relative overflow-hidden">
        {/* Ambient orbs */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <div className="absolute top-0 left-1/3 w-72 h-72 bg-brand-cta/10 rounded-full blur-3xl" />
          <div className="absolute bottom-0 right-1/3 w-72 h-72 bg-brand-mint/8 rounded-full blur-3xl" />
        </div>

        <motion.div
          className="relative z-10 max-w-3xl mx-auto text-center"
          initial={{ opacity: 0, y: 22 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          {/* Glass card */}
          <div className="glass rounded-3xl px-8 sm:px-12 py-10 sm:py-14 mx-auto">
            <span className="inline-block text-brand-mint text-[11px] font-bold uppercase tracking-[0.2em] mb-4">
              Get Started Today
            </span>
            <h2 className="font-display text-3xl sm:text-4xl font-black text-white mb-5 tracking-tight leading-tight">
              Ready to Register Your<br className="hidden sm:block" /> Rent Agreement?
            </h2>
            <p className="text-white/60 text-base sm:text-lg mb-10 max-w-xl mx-auto leading-relaxed">
              Government-approved. Fully online. Doorstep biometric service.
              Let our experts handle everything for you.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center">
              <Link to="/contact" className="btn-primary px-8 py-4 text-base">
                Contact Us Today
              </Link>
              <button
                onClick={() => setCallbackOpen(true)}
                className="btn-ghost-white px-8 py-4 text-base"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                    d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
                Request Callback
              </button>
            </div>
          </div>
        </motion.div>
      </section>

      <Footer />
      <RequestCallbackModal isOpen={callbackOpen} onClose={() => setCallbackOpen(false)} />
    </>
  )
}

