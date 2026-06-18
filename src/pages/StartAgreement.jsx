import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import toast from 'react-hot-toast'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'

const PHONE_RE = /^(?:\+91[\-\s]?)?[6-9]\d{9}$/

const initForm = {
  propertyAddress: '',
  propertyType:    '',
  indexNumber:     '',
  ownerName:       '',
  ownerContact:    '',
  ownerAadhaar:    null,
  ownerPan:        null,
  tenantName:      '',
  tenantContact:   '',
  tenantAadhaar:   null,
  tenantPan:       null,
  rentType:        'fixed',
  baseRent:        '',
  incrementType:   'rupees',
  incrementRupees: '',
  incrementPct:    '',
  draftFile:       null,
  consent:         false,
}

export default function StartAgreement() {
  const [form,    setForm]    = useState(initForm)
  const [errors,  setErrors]  = useState({})
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()

  function set(field, value) {
    setForm(f => ({ ...f, [field]: value }))
    if (errors[field]) setErrors(e => ({ ...e, [field]: '' }))
  }

  function validate() {
    const e = {}
    if (!form.propertyAddress.trim()) e.propertyAddress = 'Property address is required.'
    if (!form.propertyType)           e.propertyType    = 'Please select a property type.'
    if (!form.ownerName.trim())       e.ownerName       = 'Owner full name is required.'
    if (!PHONE_RE.test(form.ownerContact)) e.ownerContact = 'Enter a valid 10-digit mobile number.'
    if (!form.ownerAadhaar)           e.ownerAadhaar    = 'Owner Aadhaar card is required.'
    if (!form.ownerPan)               e.ownerPan        = 'Owner PAN card is required.'
    if (!form.tenantName.trim())      e.tenantName      = 'Tenant full name is required.'
    if (!PHONE_RE.test(form.tenantContact)) e.tenantContact = 'Enter a valid 10-digit mobile number.'
    if (!form.tenantAadhaar)          e.tenantAadhaar   = 'Tenant Aadhaar card is required.'
    if (!form.tenantPan)              e.tenantPan       = 'Tenant PAN card is required.'
    if (!form.baseRent || isNaN(form.baseRent) || Number(form.baseRent) <= 0)
                                      e.baseRent        = 'Enter a valid monthly rent amount.'
    if (form.rentType === 'variable') {
      if (form.incrementType === 'rupees' && (!form.incrementRupees || Number(form.incrementRupees) <= 0))
        e.incrementRupees = 'Enter a valid increment amount.'
      if (form.incrementType === 'percentage' && !form.incrementPct)
        e.incrementPct = 'Select an increment percentage rate.'
    }
    if (!form.consent)                e.consent         = 'You must confirm the details before proceeding.'
    return e
  }

  async function handleSubmit(e) {
    e.preventDefault()
    const errs = validate()
    if (Object.keys(errs).length) {
      setErrors(errs)
      // Scroll to first error
      const firstKey = Object.keys(errs)[0]
      document.getElementById(firstKey)?.scrollIntoView({ behavior: 'smooth', block: 'center' })
      return
    }

    setLoading(true)
    // In production: send FormData to your backend API
    // For now we simulate a successful submission
    await new Promise(r => setTimeout(r, 1200))
    toast.success('Agreement submitted! Our team will contact you shortly.')
    setLoading(false)
    navigate('/services')
  }

  const inputCls = (field) =>
    `w-full px-4 py-2.5 border rounded-lg text-sm outline-none transition-colors focus:ring-2 focus:ring-brand-teal ${
      errors[field] ? 'border-red-400 bg-red-50' : 'border-gray-300 focus:border-brand-teal'
    }`

  return (
    <>
      <Navbar />

      <section className="bg-brand-deep py-12 px-4 text-center text-white">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
          <h1 className="text-3xl md:text-4xl font-extrabold mb-2">Start New Rent Agreement</h1>
          <p className="text-brand-mint">Fill out the details below to initiate your online registration.</p>
        </motion.div>
      </section>

      <main className="py-16 px-4 bg-brand-light">
        <div className="max-w-3xl mx-auto">
          <form onSubmit={handleSubmit} noValidate className="space-y-8">

            {/* ── Section 1: Property ── */}
            <Fieldset legend="📍 Property Information">
              <div className="col-span-2">
                <Label htmlFor="propertyAddress">Complete Property Address *</Label>
                <textarea
                  id="propertyAddress"
                  rows={3}
                  placeholder="Flat No., Building, Society, Street, Locality, City, PIN Code"
                  value={form.propertyAddress}
                  onChange={e => set('propertyAddress', e.target.value)}
                  className={inputCls('propertyAddress') + ' resize-none'}
                />
                <Err msg={errors.propertyAddress} />
              </div>

              <div>
                <Label htmlFor="propertyType">Property Type *</Label>
                <select
                  id="propertyType"
                  value={form.propertyType}
                  onChange={e => set('propertyType', e.target.value)}
                  className={inputCls('propertyType')}
                >
                  <option value="" disabled>Select Type</option>
                  <option value="residential">Residential</option>
                  <option value="commercial">Commercial</option>
                </select>
                <Err msg={errors.propertyType} />
              </div>

              <div>
                <Label htmlFor="indexNumber">Index II / Electricity Consumer No.</Label>
                <input
                  id="indexNumber"
                  type="text"
                  placeholder="For property ownership verification"
                  value={form.indexNumber}
                  onChange={e => set('indexNumber', e.target.value)}
                  className={inputCls('indexNumber')}
                />
              </div>
            </Fieldset>

            {/* ── Section 2A: Owner ── */}
            <Fieldset legend="👤 Owner (Licensor) Details">
              <div>
                <Label htmlFor="ownerName">Full Name *</Label>
                <input id="ownerName" type="text" placeholder="As per Aadhaar Card"
                  value={form.ownerName} onChange={e => set('ownerName', e.target.value)}
                  className={inputCls('ownerName')} />
                <Err msg={errors.ownerName} />
              </div>

              <div>
                <Label htmlFor="ownerContact">Contact Number *</Label>
                <input id="ownerContact" type="tel" placeholder="+91 XXXXX XXXXX"
                  value={form.ownerContact} onChange={e => set('ownerContact', e.target.value)}
                  className={inputCls('ownerContact')} />
                <Err msg={errors.ownerContact} />
              </div>

              <div>
                <Label htmlFor="ownerAadhaar">Upload Aadhaar Card * <small className="text-gray-400">(PDF/JPG/PNG, max 5 MB)</small></Label>
                <input id="ownerAadhaar" type="file" accept=".pdf,.jpg,.jpeg,.png"
                  onChange={e => set('ownerAadhaar', e.target.files[0] || null)}
                  className={inputCls('ownerAadhaar')} />
                <Err msg={errors.ownerAadhaar} />
              </div>

              <div>
                <Label htmlFor="ownerPan">Upload PAN Card * <small className="text-gray-400">(PDF/JPG/PNG, max 5 MB)</small></Label>
                <input id="ownerPan" type="file" accept=".pdf,.jpg,.jpeg,.png"
                  onChange={e => set('ownerPan', e.target.files[0] || null)}
                  className={inputCls('ownerPan')} />
                <Err msg={errors.ownerPan} />
              </div>
            </Fieldset>

            {/* ── Section 2B: Tenant ── */}
            <Fieldset legend="🔑 Tenant (Licensee) Details">
              <div>
                <Label htmlFor="tenantName">Full Name *</Label>
                <input id="tenantName" type="text" placeholder="As per Aadhaar Card"
                  value={form.tenantName} onChange={e => set('tenantName', e.target.value)}
                  className={inputCls('tenantName')} />
                <Err msg={errors.tenantName} />
              </div>

              <div>
                <Label htmlFor="tenantContact">Contact Number *</Label>
                <input id="tenantContact" type="tel" placeholder="+91 XXXXX XXXXX"
                  value={form.tenantContact} onChange={e => set('tenantContact', e.target.value)}
                  className={inputCls('tenantContact')} />
                <Err msg={errors.tenantContact} />
              </div>

              <div>
                <Label htmlFor="tenantAadhaar">Upload Aadhaar Card * <small className="text-gray-400">(PDF/JPG/PNG, max 5 MB)</small></Label>
                <input id="tenantAadhaar" type="file" accept=".pdf,.jpg,.jpeg,.png"
                  onChange={e => set('tenantAadhaar', e.target.files[0] || null)}
                  className={inputCls('tenantAadhaar')} />
                <Err msg={errors.tenantAadhaar} />
              </div>

              <div>
                <Label htmlFor="tenantPan">Upload PAN Card * <small className="text-gray-400">(PDF/JPG/PNG, max 5 MB)</small></Label>
                <input id="tenantPan" type="file" accept=".pdf,.jpg,.jpeg,.png"
                  onChange={e => set('tenantPan', e.target.files[0] || null)}
                  className={inputCls('tenantPan')} />
                <Err msg={errors.tenantPan} />
              </div>
            </Fieldset>

            {/* ── Section 3: Rent ── */}
            <Fieldset legend="💰 Rent Details & Structure">
              {/* Rent type radio */}
              <div className="col-span-2">
                <Label>Rent Type Option *</Label>
                <div className="flex flex-col sm:flex-row gap-4 mt-2">
                  {[
                    { value: 'fixed',    label: 'Fixed Rent',    sub: 'Rent amount remains constant throughout the agreement.' },
                    { value: 'variable', label: 'Variable Rent', sub: 'Rent increases over time based on an agreed increment.' },
                  ].map(opt => (
                    <label
                      key={opt.value}
                      className={`flex-1 flex items-start gap-3 border-2 rounded-xl p-4 cursor-pointer transition-all ${
                        form.rentType === opt.value ? 'border-brand-deep bg-brand-deep/5' : 'border-gray-200 hover:border-brand-teal'
                      }`}
                    >
                      <input
                        type="radio"
                        name="rentType"
                        value={opt.value}
                        checked={form.rentType === opt.value}
                        onChange={() => set('rentType', opt.value)}
                        className="mt-1 accent-brand-deep"
                      />
                      <div>
                        <p className="font-semibold text-brand-deep">{opt.label}</p>
                        <p className="text-xs text-gray-500 mt-0.5">{opt.sub}</p>
                      </div>
                    </label>
                  ))}
                </div>
              </div>

              {/* Base rent */}
              <div>
                <Label htmlFor="baseRent">Initial Base Rent (Monthly) *</Label>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 font-medium">₹</span>
                  <input id="baseRent" type="number" min="0" placeholder="e.g., 15000"
                    value={form.baseRent} onChange={e => set('baseRent', e.target.value)}
                    className={inputCls('baseRent') + ' pl-8'} />
                </div>
                <Err msg={errors.baseRent} />
              </div>

              {/* Variable rent fields */}
              {form.rentType === 'variable' && (
                <div className="col-span-2 bg-brand-light rounded-xl p-5 grid sm:grid-cols-2 gap-5">
                  <div>
                    <Label htmlFor="incrementType">Increment Calculation Model</Label>
                    <select id="incrementType" value={form.incrementType}
                      onChange={e => set('incrementType', e.target.value)}
                      className={inputCls('incrementType')}>
                      <option value="rupees">Fixed Amount (₹)</option>
                      <option value="percentage">Fixed Percentage (%)</option>
                    </select>
                  </div>

                  {form.incrementType === 'rupees' ? (
                    <div>
                      <Label htmlFor="incrementRupees">Annual Increment Amount *</Label>
                      <div className="relative">
                        <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">₹</span>
                        <input id="incrementRupees" type="number" min="0" placeholder="e.g., 1000"
                          value={form.incrementRupees} onChange={e => set('incrementRupees', e.target.value)}
                          className={inputCls('incrementRupees') + ' pl-8'} />
                      </div>
                      <Err msg={errors.incrementRupees} />
                    </div>
                  ) : (
                    <div>
                      <Label htmlFor="incrementPct">Annual Increment Scale *</Label>
                      <select id="incrementPct" value={form.incrementPct}
                        onChange={e => set('incrementPct', e.target.value)}
                        className={inputCls('incrementPct')}>
                        <option value="" disabled>Select an approved rate</option>
                        <option value="5">5% Yearly Escalation Rate</option>
                        <option value="7">7% Yearly Escalation Rate</option>
                        <option value="10">10% Yearly Escalation Rate</option>
                      </select>
                      <Err msg={errors.incrementPct} />
                    </div>
                  )}
                </div>
              )}
            </Fieldset>

            {/* ── Section 4: Documents ── */}
            <Fieldset legend="📂 Document Verification">
              <p className="col-span-2 text-sm text-gray-500 -mt-2 mb-2">
                Upload clear scanned copies or photos (PDF, JPG, PNG — max 5 MB).
              </p>
              <div className="col-span-2 sm:col-span-1">
                <Label htmlFor="draftFile">Old Agreement Draft (if available)</Label>
                <input id="draftFile" type="file" accept=".pdf,.jpg,.jpeg,.png"
                  onChange={e => set('draftFile', e.target.files[0] || null)}
                  className={inputCls('draftFile')} />
              </div>
            </Fieldset>

            {/* ── Consent ── */}
            <div className="bg-white rounded-2xl shadow p-6">
              <label className="flex items-start gap-3 cursor-pointer">
                <input
                  id="consent"
                  type="checkbox"
                  checked={form.consent}
                  onChange={e => set('consent', e.target.checked)}
                  className="mt-1 w-4 h-4 accent-brand-deep flex-shrink-0"
                />
                <span className="text-sm text-gray-700">
                  I confirm that the details provided above are true to the best of my knowledge and
                  match my official verification identity documents.
                </span>
              </label>
              <Err msg={errors.consent} />
            </div>

            {/* ── Submit ── */}
            <div className="flex flex-col sm:flex-row gap-4">
              <button
                type="submit"
                disabled={loading}
                className="flex-1 py-4 bg-brand-deep text-white font-bold text-lg rounded-xl transition-all hover:bg-brand-steel disabled:opacity-60 disabled:cursor-not-allowed"
              >
                {loading ? 'Submitting…' : 'Proceed to Verification Step'}
              </button>
              <Link
                to="/services"
                className="px-8 py-4 border-2 border-gray-300 text-gray-600 font-semibold rounded-xl text-center transition-all hover:border-gray-400"
              >
                Cancel
              </Link>
            </div>

          </form>
        </div>
      </main>

      <Footer />
    </>
  )
}

/* ── Helper components ── */
function Fieldset({ legend, children }) {
  return (
    <fieldset className="bg-white rounded-2xl shadow p-6 sm:p-8">
      <legend className="text-lg font-bold text-brand-deep px-2 mb-5 -ml-2">{legend}</legend>
      <div className="grid sm:grid-cols-2 gap-5">{children}</div>
    </fieldset>
  )
}

function Label({ htmlFor, children }) {
  return (
    <label htmlFor={htmlFor} className="block text-sm font-medium text-gray-700 mb-1">
      {children}
    </label>
  )
}

function Err({ msg }) {
  return msg ? <p className="text-red-500 text-xs mt-1">{msg}</p> : null
}
