import { useState } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import CounterCard from '../components/CounterCard'
import RequestCallbackModal from '../components/RequestCallbackModal'
import { blogPosts } from '../data/blogPosts'

const FOUNDING_YEAR = 2021
const yearsActive   = new Date().getFullYear() - FOUNDING_YEAR

const trustPills = [
  'Maharashtra compliant process',
  'Doorstep biometric service',
  'Secure digital delivery',
]

const serviceHighlights = [
  {
    title: 'Registration in 24-48 hours',
    desc: 'Clear timeline with proactive updates on each stage of verification and registration.',
  },
  {
    title: 'No office visits required',
    desc: 'From document intake to final delivery, the full journey is online with doorstep support.',
  },
  {
    title: 'Legal team review included',
    desc: 'Agreement drafting and compliance checks handled by specialists before submission.',
  },
]

const guarantees = [
  {
    icon: 'M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z',
    label: 'Government Approved',
    text: 'Registered through official Maharashtra government portals — 100% legally valid.',
  },
  {
    icon: 'M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z',
    label: 'Completed in 24–48 Hours',
    text: 'Fast, tracked processing from document submission to certified digital delivery.',
  },
  {
    icon: 'M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6',
    label: 'Doorstep Service',
    text: 'Our agent visits you for biometric e-KYC — no office visit ever required.',
  },
]

const valueCards = [
  {
    iconPath: 'M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z',
    iconBg: 'bg-blue-50', iconColor: '#2563EB',
    title: 'Legally Compliant',
    desc: 'Government-approved filing with verified digital copies and audit-ready documentation.',
  },
  {
    iconPath: 'M13 10V3L4 14h7v7l9-11h-7z',
    iconBg: 'bg-amber-50', iconColor: '#D97706',
    title: 'Fast 24–48 Hr Process',
    desc: 'Priority processing with a clear workflow so tenants and owners can finalize quickly.',
  },
  {
    iconPath: 'M7 11.5V14m0-2.5v-6a1.5 1.5 0 113 0m-3 6a1.5 1.5 0 00-3 0v2a7.5 7.5 0 0015 0v-5a1.5 1.5 0 00-3 0m-6-3V11m0-5.5v-1a1.5 1.5 0 013 0v1m0 0V11m0-5.5a1.5 1.5 0 013 0v3m0 0V11',
    iconBg: 'bg-green-50', iconColor: '#16A34A',
    title: 'Doorstep Biometric',
    desc: 'Our executive handles e-KYC verification at your location for maximum convenience.',
  },
  {
    iconPath: 'M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z',
    iconBg: 'bg-purple-50', iconColor: '#7C3AED',
    title: 'Transparent Pricing',
    desc: 'Stamp duty and service charges are clearly broken down before you proceed.',
  },
  {
    iconPath: 'M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9',
    iconBg: 'bg-sky-50', iconColor: '#0284C7',
    title: '100% Online',
    desc: 'Upload documents, track progress, and receive the certified file directly on WhatsApp and email.',
    tone: 'from-rose-500/20 to-pink-500/10',
  },
  {
    iconPath: 'M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z',
    iconBg: 'bg-rose-50', iconColor: '#E11D48',
    title: 'Expert Support',
    desc: 'Dedicated specialists guide landlords, tenants, and brokers from first form to final delivery.',
  },
]

const processSteps = [
  {
    n: '01',
    title: 'Share Basic Details',
    desc: 'Submit tenant, owner, and property details in our guided form in under 10 minutes.',
  },
  {
    n: '02',
    title: 'Draft + Verification',
    desc: 'Our team prepares the draft, confirms details, and schedules e-KYC and biometric support.',
  },
  {
    n: '03',
    title: 'Registered Delivery',
    desc: 'You receive the registered agreement copy digitally, ready for records and compliance.',
  },
]

const testimonials = [
  {
    name: 'Rahul Kulkarni',
    role: 'Landlord, Kothrud',
    initials: 'RK', bg: 'bg-blue-600',
    text: 'Extremely professional service. Everything was explained clearly and the final document came on time without follow-ups.',
  },
  {
    name: 'Neha Patil',
    role: 'Tenant, Baner',
    initials: 'NP', bg: 'bg-purple-600',
    text: 'Loved the convenience. No office visits, no confusion, and very responsive support throughout the process.',
  },
  {
    name: 'Amit Joshi',
    role: 'Property Consultant, Wakad',
    initials: 'AJ', bg: 'bg-emerald-600',
    text: 'I now recommend Prime Document Solutions to clients regularly because the process is consistent and reliable.',
  },
]

const faqs = [
  {
    q: 'How quickly can I get my registered agreement?',
    a: 'Most agreements are completed within 24-48 hours once all required details are submitted.',
  },
  {
    q: 'Is doorstep biometric available everywhere in Pune?',
    a: 'Yes, doorstep biometric is available across major Pune locations with scheduled time slots.',
  },
  {
    q: 'Will I receive both digital and legal documentation?',
    a: 'Yes, you receive a certified digital copy suitable for official use and record keeping.',
  },
]

const puneAreas = [
  'Nanded City', 'Warje', 'Kothrud', 'Bavdhan', 'Hingne Khurd',
  'Hinjwadi', 'Wakad', 'Pimple Saudagar', 'Pimple Nilakh', 'Aundh',
  'Baner', 'Balewadi', 'Pashan', 'Sus', 'Mahalunge',
  'Shivajinagar', 'Deccan', 'Erandwane', 'Model Colony', 'Karve Nagar',
  'Koregaon Park', 'Kalyani Nagar', 'Viman Nagar', 'Kharadi', 'Hadapsar',
  'Magarpatta', 'Kondhwa', 'Undri', 'Ambegaon', 'Katraj',
  'Pisoli', 'Dhankawadi', 'Bibwewadi', 'Sinhagad Road', 'Narhe',
]

const mumbaiAreas = [
  'Andheri', 'Bandra', 'Borivali', 'Thane', 'Navi Mumbai',
  'Powai', 'Goregaon', 'Malad', 'Kandivali', 'Mulund',
  'Ghatkopar', 'Kurla', 'Dadar', 'Worli', 'Lower Parel',
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
  const [openFaq,      setOpenFaq]      = useState(null)

  return (
    <>
      <Navbar />

      <header className="studio-hero hero-bg relative overflow-hidden">
        <div className="hero-overlay absolute inset-0" />
        <div className="absolute -top-44 left-1/3 h-[30rem] w-[30rem] rounded-full bg-brand-cta/15 blur-[100px]" />
        <div className="absolute -bottom-36 -right-20 h-[24rem] w-[24rem] rounded-full bg-brand-mint/15 blur-[95px]" />

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20 lg:py-28">
          <div className="grid lg:grid-cols-[1.1fr_0.9fr] gap-8 lg:gap-10 items-center">
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, ease: 'easeOut' }}
            >
              <span className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-1.5 text-xs font-bold uppercase tracking-[0.14em] text-brand-mint">
                Trusted by 11,500+ clients in Pune
              </span>

              <h1 className="clima-headline mt-6 font-display text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white tracking-tight leading-[1.02]">
                Rent Agreement Services
                <span className="block gradient-text mt-1">Designed For Speed And Confidence</span>
              </h1>

              <p className="mt-6 text-base sm:text-lg text-white/75 max-w-2xl leading-relaxed">
                A modern, guided process for agreement drafting, biometric verification,
                and government registration with complete transparency.
              </p>

              <div className="mt-8 flex flex-col sm:flex-row gap-3.5">
                <Link to="/services" className="btn-primary px-8 py-4 text-base">
                  Start Your Agreement
                </Link>
                <button onClick={() => setCallbackOpen(true)} className="btn-ghost-white px-8 py-4 text-base">
                  Book Expert Callback
                </button>
              </div>

              <div className="mt-7 flex flex-wrap gap-2.5">
                {trustPills.map((pill) => (
                  <span key={pill} className="trust-pill text-[11px] sm:text-xs">
                    {pill}
                  </span>
                ))}
              </div>

              <div className="scroll-cue mt-8" aria-hidden="true">
                <span>Scroll to explore</span>
              </div>
            </motion.div>

            <motion.aside
              className="hero-panel rounded-3xl p-5 sm:p-6 lg:p-7"
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.12, ease: 'easeOut' }}
            >
              <p className="text-[11px] uppercase tracking-[0.18em] font-bold text-brand-teal">Live service snapshot</p>
              <h2 className="mt-2 text-brand-deep font-display text-2xl font-bold tracking-tight">What You Get</h2>

              <div className="mt-6 space-y-3">
                {serviceHighlights.map((item) => (
                  <article key={item.title} className="rounded-xl border border-brand-border bg-white p-4 flex gap-3">
                    <div className="flex-shrink-0 mt-0.5 w-5 h-5 rounded-full bg-brand-teal/15 flex items-center justify-center">
                      <svg className="w-3 h-3 text-brand-teal" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <div>
                      <h3 className="text-sm font-bold text-brand-deep tracking-tight">{item.title}</h3>
                      <p className="mt-1 text-xs text-brand-muted leading-relaxed">{item.desc}</p>
                    </div>
                  </article>
                ))}
              </div>

              <div className="mt-6 rounded-2xl border border-brand-teal/25 bg-brand-teal/10 px-4 py-3 text-sm text-brand-deep font-semibold">
                Typical completion time: 24-48 hours after verification.
              </div>
            </motion.aside>
          </div>
        </div>
      </header>

      <section className="bg-brand-deep border-b border-white/10">
        <div className="max-w-5xl mx-auto px-4 py-10 sm:py-12">
          <div className="grid grid-cols-3 divide-x divide-white/15">
            <CounterCard target={11500} suffix="+"      label="Agreements Registered" />
            <CounterCard target={250}   suffix="+"      label="Agreements Last Month" />
            <CounterCard target={yearsActive} suffix="+ Yrs" label="Years of Excellence" />
          </div>
        </div>
      </section>

      {/* ── Guarantee Strip ── */}
      <section className="bg-brand-deep">
        <div className="max-w-6xl mx-auto px-4 grid grid-cols-1 sm:grid-cols-3 divide-y sm:divide-y-0 sm:divide-x divide-white/10">
          {guarantees.map((g, i) => (
            <motion.div
              key={g.label}
              className="px-6 sm:px-8 py-8 sm:py-10"
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.45, delay: i * 0.08 }}
            >
              <svg className="w-7 h-7 mb-4" fill="none" stroke="#28A745" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d={g.icon} />
              </svg>
              <p className="font-display font-bold text-base text-white mb-1.5">{g.label}</p>
              <p className="text-white/60 text-sm leading-relaxed">{g.text}</p>
            </motion.div>
          ))}
        </div>
      </section>

      <section className="section-shell py-16 sm:py-24 px-4">
        <div className="max-w-7xl mx-auto">
          <motion.div
            className="text-center mb-14"
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.55 }}
          >
            <span className="section-label">Why Prime Document Solutions</span>
            <h2 className="font-display text-3xl md:text-4xl font-black text-brand-deep mt-1 mb-4 tracking-tight">
              Built Like A Premium Service, Not A Generic Form
            </h2>
            <p className="text-brand-muted text-base sm:text-lg max-w-2xl mx-auto leading-relaxed">
              Every touchpoint is designed for speed, clarity, and legal confidence.
            </p>
          </motion.div>

          <motion.div
            className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6"
            variants={stagger}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.05 }}
          >
            {valueCards.map((f) => (
              <motion.div
                key={f.title}
                variants={fadeCard}
                className="group feature-panel relative rounded-2xl p-7 border border-brand-border"
              >
                <div className={`w-12 h-12 rounded-xl ${f.iconBg} flex items-center justify-center mb-5 group-hover:scale-110 transition-transform duration-300`}>
                  <svg className="w-5 h-5" fill="none" stroke={f.iconColor} viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d={f.iconPath} />
                  </svg>
                </div>
                <h3 className="font-display text-[17px] font-bold text-brand-deep mb-2 tracking-tight">{f.title}</h3>
                <p className="text-brand-muted text-sm leading-relaxed">{f.desc}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      <section className="py-16 sm:py-24 px-4 bg-brand-light">
        <div className="max-w-7xl mx-auto">
          <motion.div
            className="text-center mb-14"
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.55 }}
          >
            <span className="section-label">Simple Workflow</span>
            <h2 className="font-display text-3xl md:text-4xl font-black text-brand-deep mt-1 mb-4 tracking-tight">
              The Journey, Simplified Into 3 Stages
            </h2>
            <p className="text-brand-muted text-base sm:text-lg max-w-2xl mx-auto">
              Minimal back-and-forth, full transparency, and one dedicated support team.
            </p>
          </motion.div>

          <div className="relative grid grid-cols-1 md:grid-cols-3 gap-5">
            <div className="hidden md:block absolute top-7 left-[calc(33.33%+1rem)] right-[calc(33.33%+1rem)] h-px bg-gradient-to-r from-brand-teal/30 via-brand-teal/15 to-brand-teal/30" />
            {processSteps.map((step, i) => (
              <motion.div
                key={step.n}
                className="relative bg-white rounded-2xl p-6 sm:p-7 shadow-card border border-brand-border text-left hover:shadow-card-hover hover:-translate-y-1.5 transition-all duration-300"
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.45, delay: i * 0.07 }}
              >
                <div className="w-14 h-14 bg-brand-deep text-white font-display font-black text-base rounded-xl flex items-center justify-center mb-5 ring-4 ring-brand-light">
                  {step.n}
                </div>
                <h3 className="font-display font-bold text-brand-deep text-lg mb-2 tracking-tight">{step.title}</h3>
                <p className="text-brand-muted text-sm leading-relaxed">{step.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 sm:py-24 px-4 bg-white">
        <div className="max-w-7xl mx-auto">
          <motion.div
            className="text-center mb-12"
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.55 }}
          >
            <span className="section-label">Client Reviews</span>
            <h2 className="font-display text-3xl md:text-4xl font-black text-brand-deep mt-1 mb-4 tracking-tight">
              Trusted By Families, Landlords, And Brokers
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5 sm:gap-6">
            {testimonials.map((item, i) => (
              <motion.article
                key={item.name}
                className="review-card rounded-2xl border border-brand-border p-6 flex flex-col"
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.45, delay: i * 0.08 }}
              >
                <div className="flex items-center gap-0.5 mb-4">
                  {[...Array(5)].map((_, s) => (
                    <svg key={s} className="w-4 h-4 text-amber-400" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>
                <p className="text-sm text-brand-muted leading-relaxed flex-1">"{item.text}"</p>
                <div className="mt-5 pt-4 border-t border-brand-border/60 flex items-center gap-3">
                  <div className={`w-9 h-9 rounded-full ${item.bg} flex items-center justify-center flex-shrink-0`}>
                    <span className="text-white text-xs font-bold">{item.initials}</span>
                  </div>
                  <div>
                    <p className="font-display text-brand-deep text-sm font-bold leading-tight">{item.name}</p>
                    <p className="text-xs text-brand-muted mt-0.5">{item.role}</p>
                  </div>
                </div>
              </motion.article>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 sm:py-24 px-4 bg-brand-light/70">
        <div className="max-w-5xl mx-auto">
          <motion.div
            className="text-center mb-10"
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.55 }}
          >
            <span className="section-label">FAQ</span>
            <h2 className="font-display text-3xl md:text-4xl font-black text-brand-deep mt-1 tracking-tight">
              Questions We Handle Every Day
            </h2>
          </motion.div>

          <div className="space-y-3">
            {faqs.map((item, i) => (
              <motion.div
                key={item.q}
                className="rounded-2xl border border-brand-border overflow-hidden"
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.05 }}
              >
                <button
                  className="w-full flex items-center justify-between gap-4 px-5 sm:px-6 py-4 sm:py-5 text-left bg-white hover:bg-brand-light transition-colors duration-200"
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                  aria-expanded={openFaq === i}
                >
                  <span className="font-display text-sm sm:text-[15px] font-bold text-brand-deep">{item.q}</span>
                  <span className={`flex-shrink-0 w-7 h-7 rounded-full flex items-center justify-center transition-all duration-200 ${
                    openFaq === i ? 'bg-brand-deep text-white rotate-45' : 'bg-brand-light text-brand-deep'
                  }`}>
                    <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M12 4v16m8-8H4" />
                    </svg>
                  </span>
                </button>
                {openFaq === i && (
                  <div className="px-5 sm:px-6 pb-5 bg-brand-light border-t border-brand-border">
                    <p className="text-brand-muted text-sm leading-relaxed pt-4">{item.a}</p>
                  </div>
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Blog Preview ── */}
      <section className="py-14 sm:py-20 px-4 bg-white">
        <div className="max-w-7xl mx-auto">
          <motion.div
            className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-10"
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <div>
              <span className="section-label">Knowledge Hub</span>
              <h2 className="font-display text-3xl md:text-4xl font-black text-brand-deep mt-1 tracking-tight">
                Rent Agreement Guides
              </h2>
              <p className="text-brand-muted text-sm mt-2 max-w-xl">
                Free expert articles on Maharashtra rent agreement laws, stamp duty, and registration process.
              </p>
            </div>
            <Link
              to="/blog"
              className="shrink-0 inline-flex items-center gap-1.5 text-sm font-bold text-brand-deep hover:text-brand-teal transition-colors"
            >
              View all articles
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </Link>
          </motion.div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {blogPosts.slice(0, 3).map((post, i) => (
              <motion.article
                key={post.slug}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.45, delay: i * 0.07 }}
              >
                <Link
                  to={`/blog/${post.slug}`}
                  className="group block document-panel rounded-2xl overflow-hidden hover:shadow-card-hover hover:-translate-y-1 transition-all duration-300 h-full"
                >
                  <div className="h-1 w-full bg-gradient-to-r from-brand-deep to-brand-teal" />
                  <div className="p-5 flex flex-col h-full">
                    <div className="flex items-center justify-between mb-3">
                      <span className="text-[10px] font-bold uppercase tracking-wider text-brand-muted">
                        {post.category}
                      </span>
                      <span className="text-[10px] text-brand-muted">{post.readTime}</span>
                    </div>
                    <h3 className="font-display font-bold text-brand-deep text-sm leading-snug mb-2 group-hover:text-brand-teal transition-colors">
                      {post.title}
                    </h3>
                    <p className="text-brand-muted text-xs leading-relaxed flex-1 line-clamp-3">
                      {post.excerpt}
                    </p>
                    <span className="mt-4 inline-flex items-center gap-1 text-xs font-bold text-brand-deep group-hover:text-brand-teal transition-colors">
                      Read more
                      <svg className="w-3 h-3 group-hover:translate-x-0.5 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </span>
                  </div>
                </Link>
              </motion.article>
            ))}
          </div>
        </div>
      </section>

      {/* ── Areas We Serve — rich location SEO section ── */}
      <section className="py-14 sm:py-20 px-4 bg-brand-light" aria-label="Service areas">
        <div className="max-w-7xl mx-auto">
          <motion.div
            className="text-center mb-10"
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <span className="section-label">Service Coverage</span>
            <h2 className="font-display text-3xl md:text-4xl font-black text-brand-deep mt-1 mb-4 tracking-tight">
              Rent Agreement Registration Across Pune &amp; Mumbai
            </h2>
            <p className="text-brand-muted text-base sm:text-lg max-w-3xl mx-auto leading-relaxed">
              We provide doorstep rent agreement and Leave &amp; License registration services
              across all major localities in Pune and Mumbai — fast, online, and government-approved.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-6 sm:gap-8">
            {/* Pune Areas */}
            <motion.div
              className="document-panel rounded-2xl p-6 sm:p-7"
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <h3 className="font-display font-bold text-brand-deep text-xl mb-1 tracking-tight">
                Pune — All Areas
              </h3>
              <p className="text-brand-muted text-xs mb-5">
                Online rent agreement registration with doorstep biometric service across Pune.
              </p>
              <div className="flex flex-wrap gap-2">
                {puneAreas.map((area) => (
                  <span
                    key={area}
                    className="inline-block text-xs font-semibold text-brand-deep bg-white border border-brand-border rounded-lg px-3 py-1.5 hover:border-brand-teal hover:bg-brand-mint/10 transition-colors cursor-default"
                    title={`Rent agreement registration in ${area}, Pune`}
                  >
                    {area}
                  </span>
                ))}
              </div>
            </motion.div>

            {/* Mumbai Areas */}
            <motion.div
              className="document-panel rounded-2xl p-6 sm:p-7"
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.08 }}
            >
              <h3 className="font-display font-bold text-brand-deep text-xl mb-1 tracking-tight">
                Mumbai &amp; MMR
              </h3>
              <p className="text-brand-muted text-xs mb-5">
                Rent agreement and Leave &amp; License registration across Mumbai, Thane, and Navi Mumbai.
              </p>
              <div className="flex flex-wrap gap-2">
                {mumbaiAreas.map((area) => (
                  <span
                    key={area}
                    className="inline-block text-xs font-semibold text-brand-deep bg-white border border-brand-border rounded-lg px-3 py-1.5 hover:border-brand-teal hover:bg-brand-mint/10 transition-colors cursor-default"
                    title={`Rent agreement registration in ${area}, Mumbai`}
                  >
                    {area}
                  </span>
                ))}
              </div>
              <div className="mt-5 pt-4 border-t border-brand-border">
                <p className="text-xs text-brand-muted leading-relaxed">
                  Don't see your area? <span className="font-semibold text-brand-deep">We cover all pin codes across Maharashtra.</span> Call us or WhatsApp for instant confirmation.
                </p>
              </div>
            </motion.div>
          </div>

          {/* SEO keyword paragraph — visible to users, indexed by Google */}
          <motion.div
            className="mt-8 bg-white rounded-2xl border border-brand-border p-6 sm:p-7"
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <h3 className="font-display font-bold text-brand-deep text-lg mb-3 tracking-tight">
              Why Landlords &amp; Tenants in Pune Choose Prime Document Solutions
            </h3>
            <p className="text-brand-muted text-sm leading-relaxed">
              Whether you need a <strong className="text-brand-deep">rent agreement in Nanded City</strong>, a{' '}
              <strong className="text-brand-deep">leave and license registration in Wakad</strong>, or an{' '}
              <strong className="text-brand-deep">online rent agreement in Hinjwadi</strong>, our team handles
              the complete process — legal drafting, stamp duty calculation, Aadhaar-based e-KYC biometric
              verification, and government portal registration — all within 24-48 hours. Serving Warje,
              Kothrud, Bavdhan, Baner, Aundh, Hadapsar, Pimple Saudagar, Viman Nagar, Koregaon Park,
              Kalyani Nagar and all of Pune since 2021, with services now extended to Mumbai and Thane.
              All agreements are <strong className="text-brand-deep">Maharashtra Rent Control Act compliant</strong>{' '}
              and include certified digital delivery.
            </p>
          </motion.div>
        </div>
      </section>

      <section className="py-16 sm:py-24 px-4 bg-gradient-to-br from-brand-deep via-brand-steel to-brand-deep relative overflow-hidden">
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
          <div className="cta-shell rounded-3xl px-8 sm:px-12 py-10 sm:py-14 mx-auto">
            <span className="inline-block text-brand-mint text-[11px] font-bold uppercase tracking-[0.2em] mb-4">
              Get Started Today
            </span>
            <h2 className="font-display text-3xl sm:text-4xl font-black text-white mb-5 tracking-tight leading-tight">
              Ready To Register Your<br className="hidden sm:block" /> Rent Agreement?
            </h2>
            <p className="text-white/60 text-base sm:text-lg mb-10 max-w-xl mx-auto leading-relaxed">
              Modern process, legal confidence, and human support at every stage.
              Let our team take care of the full documentation workflow.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center">
              <Link to="/contact" className="btn-primary px-8 py-4 text-base">
                Talk To Our Team
              </Link>
              <button
                onClick={() => setCallbackOpen(true)}
                className="btn-ghost-white px-8 py-4 text-base"
              >
                Request A Callback
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

