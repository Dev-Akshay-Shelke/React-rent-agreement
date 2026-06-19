import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import RequestCallbackModal from '../components/RequestCallbackModal'

const perks = [
  {
    icon:  '⚡',
    title: '100% Online & Mobile',
    desc:  'No office queues. Documents submitted digitally, biometric verification done at your doorstep.',
  },
  {
    icon:  '🛡️',
    title: 'Government Approved',
    desc:  'Direct integration with official registration servers. Every document legally certified.',
  },
  {
    icon:  '💰',
    title: 'Transparent Pricing',
    desc:  'Clear stamp duty computations with competitive flat-rate service charges. Zero hidden fees.',
  },
  {
    icon:  '📋',
    title: 'Legal Draft Included',
    desc:  'Our document specialists prepare a compliant, verified agreement draft tailored to your terms.'
  },
  {
    icon:  '🚀',
    title: '24–48 Hour Delivery',
    desc:  'From submission to certified digital copy — the entire process completes in 24–48 hours.',
  },
  {
    icon:  '🎯',
    title: 'End-to-End Support',
    desc:  'Dedicated team manages every step: drafting, KYC, registration, and certified delivery.',
  },
]

const steps = [
  { n: '01', title: 'Share Your Details',   desc: 'Submit landlord, tenant, and property details through our quick intake form or WhatsApp.' },
  { n: '02', title: 'Draft Preparation',    desc: 'Our document team prepares a government-compliant draft and shares it for your review.' },
  { n: '03', title: 'Pay Stamp Duty',       desc: 'Calculate and pay the official Maharashtra government stamp duty online.' },
  { n: '04', title: 'Doorstep e-KYC',       desc: 'Our agent visits your location for Aadhaar biometric verification. No office visit needed.' },
  { n: '05', title: 'Download Certificate', desc: 'Your certified, registered agreement is delivered to you digitally via WhatsApp & email.' },
]

const faqs = [
  {
    q: 'Is rent agreement registration mandatory in Maharashtra?',
    a: 'Yes. Under the Maharashtra Rent Control Act, registration of Leave & License agreements is legally mandatory for terms exceeding 11 months. An unregistered agreement cannot be used as evidence in court.',
  },
  {
    q: 'How long does the entire process take?',
    a: 'The complete process — from document submission to certified copy — typically takes 24 to 48 hours.',
  },
  {
    q: 'Do I need to visit any government office?',
    a: 'No. The entire process is 100% online. Our agent visits your home for Aadhaar biometric e-KYC verification — no office visit required.',
  },
  {
    q: 'What documents are required for rent agreement registration?',
    a: 'Landlord: Aadhaar card, PAN card, property ownership document, recent passport photo. Tenant: Aadhaar card, PAN card, recent passport photo.',
  },
  {
    q: 'How much does rent agreement registration cost in Pune?',
    a: 'The cost includes Maharashtra government stamp duty (calculated on monthly rent and tenure) plus our flat-rate service fee. We share a complete transparent breakdown before you proceed — no hidden charges.',
  },
  {
    q: 'Do you provide rent agreement registration in Nanded City, Wakad, Hinjwadi, and Warje?',
    a: 'Yes. We cover all Pune localities including Nanded City, Wakad, Hinjwadi, Warje, Kothrud, Bavdhan, Baner, Aundh, Pimple Saudagar, Hadapsar, Viman Nagar, Koregaon Park, and all Mumbai and Thane areas.',
  },
  {
    q: 'What is the difference between a rent agreement and a Leave & License agreement?',
    a: 'In Maharashtra, what is commonly called a "rent agreement" is legally a Leave & License agreement. It gives the tenant (Licensee) permission to occupy the property for a fixed period without transferring ownership rights. Registration is mandatory under the Maharashtra Rent Control Act.',
  },
  {
    q: 'Can I get an 11-month rent agreement registered online?',
    a: 'Yes. We specialize in 11-month Leave & License agreements registered online with doorstep biometric service anywhere in Pune and Mumbai.',
  },
]

const fadeUp = (delay = 0) => ({
  initial:     { opacity: 0, y: 28 },
  whileInView: { opacity: 1, y: 0  },
  viewport:    { once: true, amount: 0.15 },
  transition:  { duration: 0.55, delay, ease: 'easeOut' },
})

export default function Services() {
  const [callbackOpen, setCallbackOpen] = useState(false)
  const [openFaq,      setOpenFaq]      = useState(null)

  useEffect(() => {
    document.title = 'Rent Agreement Registration Services Pune | Prime Document Solutions'
    return () => { document.title = 'Rent Agreement Registration Pune | Prime Document Solutions' }
  }, [])

  return (
    <>
      <Navbar />

      {/* ── Page Header ── */}
      <section className="bg-gradient-to-br from-brand-deep to-brand-steel py-16 sm:py-20 px-4 text-center text-white relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute -top-20 -left-20 w-72 h-72 bg-brand-teal rounded-full blur-3xl" />
          <div className="absolute -bottom-20 -right-20 w-72 h-72 bg-brand-mint rounded-full blur-3xl" />
        </div>
        <motion.div {...fadeUp()} className="relative z-10">
          <span className="section-label text-brand-mint">What We Offer</span>
          <h1 className="font-display text-3xl sm:text-4xl md:text-5xl font-black mb-4 tracking-tight">Our Professional Services</h1>
          <p className="text-white/75 text-base sm:text-lg max-w-xl mx-auto">
            Fast, secure, and legally compliant Leave &amp; License registration — at your doorstep.
          </p>
        </motion.div>
      </section>

      {/* ── Core Service ── */}
      <section className="py-14 sm:py-24 px-4 bg-white">
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-12 items-start">

          {/* Info */}
          <motion.div {...fadeUp(0.1)}>
            <span className="inline-block px-3 py-1 bg-brand-teal/15 text-brand-steel text-xs font-bold rounded-full mb-5 uppercase tracking-widest">
              Core Service
            </span>
            <h2 className="font-display text-2xl sm:text-3xl md:text-4xl font-black text-brand-deep mb-5 leading-tight tracking-tight">
              Leave &amp; License<br />Rent Agreement
            </h2>
            <p className="text-brand-muted leading-relaxed mb-4 text-[15px]">
              A <strong>Rent Agreement</strong> (legally recognized as a Leave and License Agreement
              in Maharashtra) is a vital legal document binding a property owner (Licensor) and a
              tenant (Licensee). It defines the terms, monthly rent, security deposit, and duration
              for a specific property.
            </p>
            <p className="text-brand-muted leading-relaxed mb-8 text-[15px]">
              Under the <strong>Maharashtra Rent Control Act</strong>, registering these documents is
              strictly mandatory. Prime Document Solutions manages the entire lifecycle — legal
              drafting, government portal coordination, and biometric verification.
            </p>
            <div className="flex flex-wrap gap-4">
              <button
                onClick={() => setCallbackOpen(true)}
                className="btn-primary px-6 py-3 text-sm"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
                Request Callback
              </button>
              <a
                href="https://wa.me/918767393079?text=Hello!%20I%20want%20to%20register%20a%20rent%20agreement."
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-6 py-3 bg-green-500 text-white font-semibold rounded-xl transition-all hover:bg-green-600 hover:shadow-lg hover:-translate-y-0.5"
              >
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                </svg>
                Chat on WhatsApp
              </a>
            </div>
          </motion.div>

          {/* Perks grid */}
          <motion.div
            {...fadeUp(0.2)}
            className="grid grid-cols-1 sm:grid-cols-2 gap-4"
          >
            {perks.map(p => (
              <div key={p.title} className="bg-white rounded-2xl p-5 border border-brand-border hover:border-brand-teal/30 hover:shadow-card transition-all duration-200">
                <div className={`w-10 h-10 rounded-xl ${p.iconBg} flex items-center justify-center mb-3`}>
                  <svg className="w-5 h-5" fill="none" stroke={p.iconColor} viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d={p.iconPath} />
                  </svg>
                </div>
                <h4 className="font-bold text-brand-deep text-sm mb-1">{p.title}</h4>
                <p className="text-xs text-brand-muted leading-relaxed">{p.desc}</p>
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ── How It Works ── */}
      <section className="py-14 sm:py-24 px-4 bg-brand-light">
        <div className="max-w-6xl mx-auto">
          <motion.div {...fadeUp()} className="text-center mb-16">
            <span className="text-brand-cta text-xs font-bold uppercase tracking-widest">Step-by-Step</span>
            <h2 className="font-display text-2xl sm:text-3xl md:text-4xl font-black text-brand-deep mt-3 mb-4 tracking-tight">
              Easy Online Registration Process
            </h2>
            <p className="text-brand-muted text-lg max-w-2xl mx-auto">
              Get your rent agreement fully registered from the comfort of your home in 5 simple steps.
            </p>
          </motion.div>

          <div className="space-y-5">
            {steps.map((step, i) => (
              <motion.div
                key={step.n}
                {...fadeUp(i * 0.08)}
                className="flex gap-5 items-start bg-white rounded-2xl p-6 shadow-card border border-brand-border hover:shadow-card-hover hover:border-brand-teal/30 transition-all duration-300"
              >
                <div className="flex-shrink-0 w-14 h-14 rounded-2xl bg-gradient-to-br from-brand-deep to-brand-steel text-white font-extrabold text-lg flex items-center justify-center shadow-md">
                  {step.n}
                </div>
                <div className="pt-1">
                  <h3 className="font-bold text-brand-deep text-base mb-1">{step.title}</h3>
                  <p className="text-brand-muted text-sm leading-relaxed">{step.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── FAQs ── */}
      <section className="py-14 sm:py-24 px-4 bg-white">
        <div className="max-w-3xl mx-auto">
          <motion.div {...fadeUp()} className="text-center mb-14">
            <span className="text-brand-cta text-xs font-bold uppercase tracking-widest">FAQ</span>
            <h2 className="text-3xl md:text-4xl font-extrabold text-brand-deep mt-3 mb-4">
              Frequently Asked Questions
            </h2>
          </motion.div>

          <div className="space-y-3">
            {faqs.map((faq, i) => (
              <motion.div
                key={i}
                {...fadeUp(i * 0.08)}
                className="border border-brand-border rounded-2xl overflow-hidden"
              >
                <button
                  className="w-full flex items-center justify-between px-6 py-4 text-left bg-white hover:bg-brand-light transition-colors"
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                >
                  <span className="font-semibold text-brand-deep text-sm pr-4">{faq.q}</span>
                  <svg
                    className={`w-5 h-5 text-brand-steel flex-shrink-0 transition-transform duration-300 ${openFaq === i ? 'rotate-180' : ''}`}
                    fill="none" stroke="currentColor" viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>
                {openFaq === i && (
                  <div className="px-6 pb-5 bg-brand-light border-t border-brand-border">
                    <p className="text-brand-muted text-sm leading-relaxed pt-3">{faq.a}</p>
                  </div>
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Bottom CTA ── */}
      <section className="py-16 sm:py-20 bg-gradient-to-r from-brand-deep to-brand-steel text-center text-white px-4">
        <motion.div {...fadeUp()}>
          <h2 className="text-3xl font-extrabold mb-4">Ready to Get Started?</h2>
          <p className="text-white/70 text-lg mb-10 max-w-xl mx-auto">
            Contact us today and our expert team will guide you through the entire process.
          </p>
          <button
            onClick={() => setCallbackOpen(true)}
            className="btn-primary px-8 py-4 text-base"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
            </svg>
            Request a Callback Now
          </button>
        </motion.div>
      </section>

      <Footer />
      <RequestCallbackModal isOpen={callbackOpen} onClose={() => setCallbackOpen(false)} />
    </>
  )
}
