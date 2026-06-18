import { useEffect } from 'react'
import { motion } from 'framer-motion'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'

const values = [
  { iconPath: 'M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z', iconBg: 'bg-blue-50', iconColor: '#2563EB', title: 'Security First',    desc: '100% secure data encryption and strict access controls for all client documents.' },
  { iconPath: 'M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z', iconBg: 'bg-green-50', iconColor: '#16A34A', title: 'Legal Accuracy',    desc: 'Every agreement draft is reviewed and verified against the latest Maharashtra regulations.' },
  { iconPath: 'M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z', iconBg: 'bg-amber-50', iconColor: '#D97706', title: 'Prompt Turnaround', desc: 'We commit to processing and delivering certified agreements within 24-48 hours.' },
  { iconPath: 'M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6', iconBg: 'bg-rose-50', iconColor: '#E11D48', title: 'Doorstep Service',  desc: 'Biometric coordination managed by our trained agents at your preferred location.' },
]

const metrics = [
  { count: '11,500+', label: 'Agreements Processed' },
  { count: '99%',     label: 'Positive Reviews' },
  { count: '48 Hrs',  label: 'Average Delivery' },
  { count: '7 Days',  label: 'Mon-Sun Support' },
]

const fadeUp = (delay = 0) => ({
  initial:     { opacity: 0, y: 28 },
  whileInView: { opacity: 1, y: 0  },
  viewport:    { once: true, amount: 0.15 },
  transition:  { duration: 0.6, delay, ease: 'easeOut' },
})

export default function About() {
  useEffect(() => {
    document.title = 'About Us | Prime Document Solutions — Rent Agreement Experts Pune'
    return () => { document.title = 'Rent Agreement Registration Pune | Prime Document Solutions' }
  }, [])
  return (
    <>
      <Navbar />

      {/* Hero */}
      <section className="bg-gradient-to-br from-brand-deep to-brand-steel py-20 sm:py-24 px-4 text-center text-white relative overflow-hidden">
        <div className="absolute inset-0 opacity-10 pointer-events-none">
          <div className="absolute -top-24 left-1/3 w-80 h-80 bg-brand-teal rounded-full blur-3xl" />
          <div className="absolute -bottom-24 right-1/4 w-64 h-64 bg-brand-mint rounded-full blur-3xl" />
        </div>
        <motion.div {...fadeUp()} className="relative z-10 max-w-3xl mx-auto">
          <span className="inline-block text-brand-mint text-xs font-bold uppercase tracking-widest mb-3">Our Story</span>
          <h1 className="font-display text-3xl sm:text-4xl md:text-5xl font-black mb-5 leading-tight tracking-tight">
            Simplifying Property Documentation
          </h1>
          <p className="text-white/75 text-base sm:text-lg max-w-2xl mx-auto leading-relaxed">
            Your trusted partner for legal, secure, and hassle-free Leave &amp; License
            registration across Maharashtra since 2021.
          </p>
        </motion.div>
      </section>

      {/* Metrics strip */}
      <section className="bg-brand-light py-10 sm:py-12 px-4 border-b border-brand-border">
        <div className="max-w-5xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-6">
          {metrics.map((t, i) => (
            <motion.div key={t.label} {...fadeUp(i * 0.1)} className="text-center">
              <p className="font-display text-2xl sm:text-3xl font-black text-brand-deep">{t.count}</p>
              <span className="mt-1.5 block h-px w-6 bg-brand-teal/40 mx-auto" />
              <p className="text-xs text-brand-muted font-semibold mt-1.5 uppercase tracking-wide">{t.label}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Who We Are */}
      <section className="py-16 sm:py-24 px-4 bg-white">
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-10 md:gap-14 items-start">
          <motion.div {...fadeUp(0.1)}>
            <span className="text-brand-cta text-xs font-bold uppercase tracking-widest">About Us</span>
            <h2 className="font-display text-2xl sm:text-3xl md:text-4xl font-black text-brand-deep mt-3 mb-6 leading-tight tracking-tight">
              Who We Are
            </h2>
            <p className="text-brand-muted leading-relaxed mb-5 text-sm sm:text-[15px]">
              At <strong>Prime Document Solutions</strong>, we specialize in offering streamlined,
              transparent, and regulatory-compliant <strong>Leave and License Registration
              services</strong>. Operating from our central office in Pune, we have simplified
              the documentation workflows for thousands of landlords, tenants, and corporate entities.
            </p>
            <p className="text-brand-muted leading-relaxed text-sm sm:text-[15px]">
              We understand that navigating property agreements can be overwhelming. Our modern
              processing infrastructure eliminates complicated paperwork, ensuring your
              government-approved biometric verification, document submission, and draft generation
              are executed flawlessly &mdash; from the comfort of your home.
            </p>
          </motion.div>

          <motion.div
            {...fadeUp(0.2)}
            className="bg-gradient-to-br from-brand-deep to-brand-steel rounded-3xl p-7 sm:p-8 text-white"
          >
            <h3 className="text-lg sm:text-xl font-bold text-brand-mint mb-6">Our Commitment to You</h3>
            <ul className="space-y-3 sm:space-y-4">
              {[
                'Government-Approved Legal Registration',
                'End-to-End Process Management',
                'Doorstep Biometric Coordination',
                'Certified Digital Document Delivery',
                'Transparent, No-Hidden-Fee Pricing',
                'Expert Support 7 Days a Week',
              ].map(item => (
                <li key={item} className="flex items-center gap-3">
                  <span className="w-5 h-5 sm:w-6 sm:h-6 rounded-full bg-brand-cta flex items-center justify-center flex-shrink-0">
                    <svg className="w-2.5 h-2.5 sm:w-3 sm:h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                    </svg>
                  </span>
                  <span className="text-sm text-white/80">{item}</span>
                </li>
              ))}
            </ul>
          </motion.div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="py-16 sm:py-20 px-4 bg-brand-light">
        <div className="max-w-5xl mx-auto">
          <motion.div {...fadeUp()} className="text-center mb-12">
            <span className="text-brand-cta text-xs font-bold uppercase tracking-widest">Purpose</span>
            <h2 className="font-display text-2xl sm:text-3xl md:text-4xl font-black text-brand-deep mt-3 tracking-tight">
              Our Mission &amp; Vision
            </h2>
          </motion.div>
          <div className="grid sm:grid-cols-2 gap-6 sm:gap-8">
            {[
              {
                iconPath: 'M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4',
                title: 'Our Mission',
                text: 'To digitize and ease the property document execution space by providing transparent, fast, and completely stress-free Leave and License management support across Maharashtra.',
                gradient: 'from-brand-deep to-brand-steel',
              },
              {
                iconPath: 'M15 12a3 3 0 11-6 0 3 3 0 016 0zM2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z',
                title: 'Our Vision',
                text: 'To establish Prime Document Solutions as the benchmark provider for administrative estate document management, recognized for legal processing compliance and client satisfaction.',
                gradient: 'from-brand-cta to-brand-teal',
              },
            ].map((card, i) => (
              <motion.div
                key={card.title}
                {...fadeUp(i * 0.15)}
                className="bg-white rounded-3xl shadow-card border border-brand-border p-8 sm:p-10 text-center hover:shadow-card-hover transition-shadow duration-300"
              >
                <div className={`w-14 h-14 sm:w-16 sm:h-16 rounded-2xl bg-gradient-to-br ${card.gradient} flex items-center justify-center mx-auto mb-6 shadow-md`}>
                  <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d={card.iconPath} />
                  </svg>
                </div>
                <h3 className="text-lg sm:text-xl font-bold text-brand-deep mb-4">{card.title}</h3>
                <p className="text-brand-muted leading-relaxed text-sm">{card.text}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Core Values */}
      <section className="py-16 sm:py-20 px-4 bg-white">
        <div className="max-w-6xl mx-auto">
          <motion.div {...fadeUp()} className="text-center mb-12">
            <span className="text-brand-cta text-xs font-bold uppercase tracking-widest">Core Values</span>
            <h2 className="font-display text-2xl sm:text-3xl md:text-4xl font-black text-brand-deep mt-3">
              What Drives Us
            </h2>
          </motion.div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 sm:gap-6">
            {values.map((v, i) => (
              <motion.div
                key={v.title}
                {...fadeUp(i * 0.1)}
                className="bg-white rounded-2xl p-6 border border-brand-border hover:border-brand-teal/40 hover:shadow-card transition-all duration-300"
              >
              <div className={`w-11 h-11 rounded-xl ${v.iconBg} flex items-center justify-center mb-4`}>
                <svg className="w-5 h-5" fill="none" stroke={v.iconColor} viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d={v.iconPath} />
                </svg>
              </div>
                <h4 className="font-bold text-brand-deep mb-2 text-sm sm:text-base">{v.title}</h4>
                <p className="text-sm text-brand-muted leading-relaxed">{v.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Office Location */}
      <section className="py-16 sm:py-24 px-4 bg-brand-light">
        <div className="max-w-6xl mx-auto">
          <motion.div {...fadeUp()} className="text-center mb-10 sm:mb-12">
            <span className="text-brand-cta text-xs font-bold uppercase tracking-widest">Find Us</span>
            <h2 className="font-display text-2xl sm:text-3xl md:text-4xl font-black text-brand-deep mt-3 tracking-tight">
              Headquarters &amp; Corporate Office
            </h2>
          </motion.div>
          <motion.div
            {...fadeUp(0.1)}
            className="grid md:grid-cols-2 gap-0 rounded-3xl overflow-hidden shadow-2xl border border-brand-border"
          >
            {/* Map */}
            <div className="h-72 sm:h-80 md:h-auto md:min-h-[340px]">
              <iframe
                title="Prime Document Solutions Office Location"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3784.4447478051783!2d73.7844000!3d18.4635000!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bc29560f8555555%3A0x0!2sDestination%20Centre%2C%20Nanded%20City%2C%20Pune%2C%20Maharashtra%20411068!5e0!3m2!1sen!2sin!4v1718361600000!5m2!1sen!2sin"
                width="100%"
                height="100%"
                style={{ border: 0, minHeight: 280 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>

            {/* Info */}
            <div className="p-8 sm:p-10 bg-brand-deep text-white flex flex-col justify-center">
              <h3 className="text-xl sm:text-2xl font-bold text-brand-teal mb-2">Prime Document Solutions</h3>
              <p className="text-sm text-brand-mint/70 mb-6">Pune's Most Trusted Registration Partner</p>
              <div className="space-y-3 sm:space-y-4 text-sm text-white/70 mb-8">
                <div className="flex items-start gap-3">
                  <svg className="w-4 h-4 text-brand-teal flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                  <span className="leading-relaxed">Walhekar Property, Near Destination Center,<br />Nanded City, Pune, Maharashtra &mdash; 411068</span>
                </div>
                <div className="flex items-center gap-3">
                  <svg className="w-4 h-4 text-brand-teal flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                  <a href="tel:+919356480165" className="hover:text-brand-teal transition-colors">+91 93564 80165</a>
                </div>
                <div className="flex items-center gap-3">
                  <svg className="w-4 h-4 text-brand-teal flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                  <a href="tel:+919356480165" className="hover:text-brand-teal transition-colors">+91 93564 80165</a>
                </div>
                <div className="flex items-center gap-3">
                  <svg className="w-4 h-4 text-brand-teal flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <span>Monday &ndash; Sunday &middot; 10 AM &ndash; 7 PM</span>
                </div>
              </div>
              <a
                href="https://maps.google.com/?q=Destination+Centre+Nanded+City+Pune"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-5 py-3 bg-brand-cta text-white font-semibold rounded-xl transition-all hover:bg-brand-teal hover:shadow-lg w-fit text-sm"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                Open in Google Maps
              </a>
            </div>
          </motion.div>
        </div>
      </section>

      <Footer />
    </>
  )
}