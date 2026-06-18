import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import toast from 'react-hot-toast'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import { sendWhatsAppNotification } from '../services/notificationService'

const PHONE_RE = /^(?:\+91[\-\s]?)?[6-9]\d{9}$/

const infoCards = [
  {
    iconPath: 'M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0zM15 11a3 3 0 11-6 0 3 3 0 016 0z',
    iconBg: 'bg-blue-50', iconColor: '#2563EB',
    title: 'Our Office',
    lines: ['Walhekar Properties, Flat No. 405, 4th Floor,', 'Nanded City, Pune — 411041'],
    color: 'bg-white border-brand-border',
  },
  {
    iconPath: 'M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z',
    iconBg: 'bg-green-50', iconColor: '#16A34A',
    title: 'Call Us',
    lines: ['+91 93564 80165'],
    color: 'bg-white border-brand-border',
  },
  {
    iconPath: 'M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z',
    iconBg: 'bg-sky-50', iconColor: '#0284C7',
    title: 'Email Us',
    lines: ['info@primedocs.com', 'sales@primedocs.com'],
    color: 'bg-white border-brand-border',
  },
  {
    iconPath: 'M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z',
    iconBg: 'bg-purple-50', iconColor: '#7C3AED',
    title: 'Business Hours',
    lines: ['Monday – Sunday', '10:00 AM – 7:00 PM'],
    color: 'bg-white border-brand-border',
  },
]

const initForm = { name: '', mobile: '', email: '', subject: '', message: '' }

const fadeUp = (delay = 0) => ({
  initial:     { opacity: 0, y: 28 },
  whileInView: { opacity: 1, y: 0  },
  viewport:    { once: true, amount: 0.1 },
  transition:  { duration: 0.55, delay, ease: 'easeOut' },
})

export default function Contact() {
  const [form,    setForm]    = useState(initForm)
  const [errors,  setErrors]  = useState({})
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    document.title = 'Contact Us | Rent Agreement Pune | Prime Document Solutions'
    return () => { document.title = 'Rent Agreement Registration Pune | Prime Document Solutions' }
  }, [])

  function validate() {
    const e = {}
    if (!form.name.trim())           e.name    = 'Full name is required.'
    if (!PHONE_RE.test(form.mobile)) e.mobile  = 'Enter a valid 10-digit mobile number.'
    if (form.email && !/\S+@\S+\.\S+/.test(form.email))
                                     e.email   = 'Enter a valid email address.'
    if (!form.subject.trim())        e.subject = 'Subject is required.'
    if (!form.message.trim())        e.message = 'Message cannot be empty.'
    return e
  }

  function handleChange(e) {
    setForm(f => ({ ...f, [e.target.name]: e.target.value }))
    if (errors[e.target.name]) setErrors(er => ({ ...er, [e.target.name]: '' }))
  }

  async function handleSubmit(e) {
    e.preventDefault()
    const errs = validate()
    if (Object.keys(errs).length) { setErrors(errs); return }

    setLoading(true)
    try {
      const results = await Promise.allSettled([
        sendWhatsAppNotification(form),
      ])

      const firstError = results.find(r => {
        if (r.status === 'rejected') return true
        return r.value?.success === false
      })

      if (firstError) {
        const reason = firstError.status === 'rejected'
          ? firstError.reason?.message
          : firstError.value?.note
        toast.error(`Failed to send${reason ? `: ${reason}` : '.'}`)
        return
      }

      toast.success('Message sent! We\'ll get back to you shortly.')
      setForm(initForm)
      setErrors({})
    } catch {
      toast.error('Failed to send. Please try calling us directly.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <>
      <Navbar />

      {/* ── Header ── */}
      <section className="bg-gradient-to-br from-brand-deep to-brand-steel py-16 sm:py-24 px-4 text-center text-white relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute -top-20 left-1/4 w-72 h-72 bg-brand-teal rounded-full blur-3xl" />
          <div className="absolute -bottom-20 right-1/4 w-64 h-64 bg-brand-mint rounded-full blur-3xl" />
        </div>
        <motion.div {...fadeUp()} className="relative z-10">
          <span className="inline-block text-brand-mint text-xs font-bold uppercase tracking-widest mb-3">Reach Out</span>
          <h1 className="font-display text-3xl sm:text-4xl md:text-5xl font-black mb-5 tracking-tight">Get In Touch</h1>
          <p className="text-white/78 text-base sm:text-lg max-w-xl mx-auto leading-relaxed">
            Have questions about your rent agreement? Our experts are here to help — every day of the week.
          </p>
        </motion.div>
      </section>

      {/* ── Info Cards ── */}
      <section className="py-14 px-4 bg-white border-b border-brand-border">
        <div className="max-w-6xl mx-auto grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {infoCards.map((card, i) => (
            <motion.div
              key={card.title}
              {...fadeUp(i * 0.08)}
              className={`${card.color} rounded-2xl p-6 flex gap-4 items-start hover:shadow-card-hover transition-all duration-300`}
            >
              <div className={`${card.iconBg} w-12 h-12 rounded-xl border border-brand-border flex items-center justify-center flex-shrink-0`}>
                <svg className="w-5 h-5" fill="none" stroke={card.iconColor} viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d={card.iconPath} />
                </svg>
              </div>
              <div>
                <h3 className="font-bold text-brand-deep text-sm mb-1.5">{card.title}</h3>
                {card.lines.map(l => <p key={l} className="text-xs text-brand-muted leading-relaxed">{l}</p>)}
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ── Form + Map ── */}
      <section className="py-14 sm:py-20 px-4 bg-brand-light">
        <div className="max-w-6xl mx-auto grid lg:grid-cols-2 gap-10">

          {/* Contact form */}
          <motion.div
            {...fadeUp(0.1)}
            className="document-panel rounded-3xl p-6 sm:p-8 lg:p-10"
          >
            <h2 className="text-2xl font-extrabold text-brand-deep mb-2">Send Us a Message</h2>
            <p className="text-brand-muted text-sm mb-8">We'll respond within a few hours during business days.</p>

            <form onSubmit={handleSubmit} noValidate className="space-y-5">
              <ContactField
                label="Full Name *"
                name="name"
                type="text"
                placeholder="Your full name"
                value={form.name}
                error={errors.name}
                onChange={handleChange}
              />
              <ContactField
                label="Mobile Number *"
                name="mobile"
                type="tel"
                placeholder="+91 98765 43210"
                value={form.mobile}
                error={errors.mobile}
                onChange={handleChange}
              />
              <ContactField
                label="Email Address (optional)"
                name="email"
                type="email"
                placeholder="abc@example.com"
                value={form.email}
                error={errors.email}
                onChange={handleChange}
              />
              <ContactField
                label="Subject *"
                name="subject"
                type="text"
                placeholder="How can we help you?"
                value={form.subject}
                error={errors.subject}
                onChange={handleChange}
              />

              <div>
                <label htmlFor="message" className="block text-xs font-bold text-brand-muted uppercase tracking-wider mb-1.5">
                  Your Message *
                </label>
                <textarea
                  id="message"
                  name="message"
                  rows={5}
                  placeholder="Write your message details here…"
                  value={form.message}
                  onChange={handleChange}
                  className={`input-field resize-none ${errors.message ? 'input-field-error' : ''}`}
                />
                {errors.message && <p className="text-red-500 text-xs mt-1">{errors.message}</p>}
              </div>

              <button
                type="submit"
                disabled={loading}
                className="btn-primary w-full py-3.5 text-sm disabled:opacity-60 disabled:cursor-not-allowed disabled:hover:translate-y-0 disabled:hover:shadow-md"
              >
                {loading ? 'Sending…' : 'Send Message'}
              </button>
            </form>
          </motion.div>

          {/* Map */}
          <motion.div {...fadeUp(0.2)} className="document-panel rounded-3xl overflow-hidden min-h-[420px]">
            <iframe
              title="Prime Document Solutions Office"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3784.4447478051783!2d73.7844000!3d18.4635000!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bc29560f8555555%3A0x0!2sDestination%20Centre%2C%20Nanded%20City%2C%20Pune%2C%20Maharashtra%20411068!5e0!3m2!1sen!2sin!4v1718361600000!5m2!1sen!2sin"
              width="100%"
              height="100%"
              style={{ border: 0, minHeight: 420 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </motion.div>
        </div>
      </section>

      <Footer />
    </>
  )
}

function ContactField({ label, name, type, placeholder, value, error, onChange }) {
  return (
    <div>
      <label htmlFor={name} className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-1.5">{label}</label>
      <input
        id={name}
        name={name}
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        className={`input-field ${error ? 'input-field-error' : ''}`}
      />
      {error && (
        <p className="flex items-center gap-1 text-red-500 text-xs mt-1">
          <svg className="w-3 h-3 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
          </svg>
          {error}
        </p>
      )}
    </div>
  )
}
