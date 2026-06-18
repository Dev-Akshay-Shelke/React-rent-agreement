import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import toast from 'react-hot-toast'
import { sendContactEmail, sendWhatsAppNotification } from '../services/notificationService'

const PHONE_RE = /^(?:\+91[\-\s]?)?[6-9]\d{9}$/
const initialForm = { name: '', mobile: '', email: '', city: '' }

export default function RequestCallbackModal({ isOpen, onClose }) {
  const [form,    setForm]    = useState(initialForm)
  const [errors,  setErrors]  = useState({})
  const [loading, setLoading] = useState(false)

  function validate() {
    const e = {}
    if (!form.name.trim())           e.name   = 'Full name is required.'
    if (!PHONE_RE.test(form.mobile)) e.mobile = 'Enter a valid 10-digit Indian mobile number.'
    if (form.email && !/\S+@\S+\.\S+/.test(form.email))
                                     e.email  = 'Enter a valid email address.'
    if (!form.city.trim())           e.city   = 'City / location is required.'
    return e
  }

  async function handleSubmit(e) {
    e.preventDefault()
    const errs = validate()
    if (Object.keys(errs).length) { setErrors(errs); return }

    setLoading(true)
    try {
      await Promise.allSettled([
        sendContactEmail({ ...form, subject: 'Callback Request — Prime Document Solutions', message: `Callback request from ${form.name}. City: ${form.city}.` }),
        sendWhatsAppNotification({ ...form, subject: 'Callback Request', message: `Callback from ${form.name}. City: ${form.city}.` }),
      ])
      toast.success(`Thank you, ${form.name}! We'll call you back shortly.`)
      setForm(initialForm)
      setErrors({})
      onClose()
    } catch {
      toast.error('Something went wrong. Please try calling us directly.')
    } finally {
      setLoading(false)
    }
  }

  function handleChange(e) {
    setForm(f => ({ ...f, [e.target.name]: e.target.value }))
    if (errors[e.target.name]) setErrors(er => ({ ...er, [e.target.name]: '' }))
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          {/* Backdrop */}
          <motion.div
            className="absolute inset-0 bg-brand-deep/70 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          />

          {/* Modal sheet */}
          <motion.div
            className="relative bg-white w-full sm:max-w-md sm:rounded-3xl rounded-t-3xl shadow-2xl overflow-hidden"
            initial={{ opacity: 0, y: 60, scale: 0.97 }}
            animate={{ opacity: 1, y: 0,  scale: 1    }}
            exit={{   opacity: 0, y: 60, scale: 0.97  }}
            transition={{ type: 'spring', damping: 24, stiffness: 320 }}
            onClick={e => e.stopPropagation()}
          >
            {/* Gradient header strip */}
            <div className="bg-gradient-to-r from-brand-deep to-brand-steel px-6 sm:px-8 pt-6 sm:pt-7 pb-6">
              {/* Drag handle (mobile) */}
              <div className="w-10 h-1 bg-white/30 rounded-full mx-auto mb-5 sm:hidden" />
              <div className="flex items-start justify-between">
                <div>
                  <h2 className="font-display text-xl sm:text-2xl font-bold text-white tracking-tight">
                    Request a Callback
                  </h2>
                  <p className="text-white/60 text-sm mt-1">
                    We'll reach out within business hours.
                  </p>
                </div>
                <button
                  onClick={onClose}
                  aria-label="Close"
                  className="p-1.5 rounded-xl bg-white/10 hover:bg-white/20 text-white transition-colors ml-4 flex-shrink-0"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
            </div>

            {/* Form body */}
            <div className="px-6 sm:px-8 py-6 sm:py-7">
              <form onSubmit={handleSubmit} noValidate className="space-y-4">
                <ModalField label="Full Name *"           name="name"   type="text"  placeholder="Your full name"      value={form.name}   error={errors.name}   onChange={handleChange} />
                <ModalField label="Mobile Number *"       name="mobile" type="tel"   placeholder="+91 98765 43210"    value={form.mobile} error={errors.mobile} onChange={handleChange} />
                <ModalField label="Email Address (opt.)" name="email"  type="email" placeholder="abc@example.com"    value={form.email}  error={errors.email}  onChange={handleChange} />
                <ModalField label="City / Location *"    name="city"   type="text"  placeholder="e.g., Pune"         value={form.city}   error={errors.city}   onChange={handleChange} />

                <button
                  type="submit"
                  disabled={loading}
                  className="btn-primary w-full py-3.5 text-sm mt-2 disabled:opacity-60 disabled:cursor-not-allowed disabled:hover:translate-y-0 disabled:hover:shadow-md"
                >
                  {loading ? (
                    <>
                      <svg className="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                      </svg>
                      Sending…
                    </>
                  ) : (
                    'Request Callback'
                  )}
                </button>
              </form>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
/* -- Labeled input helper -- */
function ModalField({ label, name, type, placeholder, value, error, onChange }) {
  return (
    <div>
      <label htmlFor={name} className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-1.5">{label}</label>
      <input
        id={name} name={name} type={type} placeholder={placeholder}
        value={value} onChange={onChange}
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
