import { useEffect, useRef, useState } from 'react'
import { createPortal } from 'react-dom'
import { Link } from 'react-router-dom'
import InputControl from '@/ui/InputControl'
import { useToast } from '@/contexts/ToastContext'
import { PATHS } from '@/utils/routes'

// Dealership-application modal — mirrors CSR_New_web `#dealerApplyModal`.
// Uses the shared `.csr-modal-*` chrome so it matches BookNow / QuickView.
const STATES = [
  '', 'Andhra Pradesh', 'Assam', 'Bihar', 'Chhattisgarh', 'Delhi', 'Goa',
  'Gujarat', 'Haryana', 'Himachal Pradesh', 'Jharkhand', 'Karnataka',
  'Kerala', 'Madhya Pradesh', 'Maharashtra', 'Odisha', 'Punjab',
  'Rajasthan', 'Tamil Nadu', 'Telangana', 'Uttar Pradesh', 'Uttarakhand',
  'West Bengal', 'Other',
]

const PROPERTY = [
  { value: '',         label: 'Select an option' },
  { value: 'own',      label: 'Yes — I own property' },
  { value: 'rent',     label: 'I plan to rent / lease' },
  { value: 'looking',  label: 'Still exploring options' },
]

const BUSINESS = [
  { value: '',             label: 'Select business type' },
  { value: 'auto-dealer',  label: 'Existing Automobile Dealership' },
  { value: 'service',      label: 'Service / Repair Station' },
  { value: 'showroom',     label: 'Multi-brand Showroom' },
  { value: 'retail',       label: 'Retail / Distribution' },
  { value: 'fresh',        label: 'New to Automotive' },
  { value: 'other',        label: 'Other' },
]

const EXPERIENCE = [
  '', 'Less than 1 year', '1 – 3 years', '3 – 5 years', '5 – 10 years', '10+ years',
]

const INVESTMENT = [
  { value: '',       label: 'Choose your range' },
  { value: '10-25',  label: '₹10 – 25 Lakh' },
  { value: '25-50',  label: '₹25 – 50 Lakh' },
  { value: '50-100', label: '₹50 Lakh – 1 Crore' },
  { value: '100+',   label: '₹1 Crore +' },
]

const EMPTY = {
  name: '', email: '', phone: '', company: '',
  city: '', state: '', pincode: '', property: '',
  business: '', experience: '', investment: '',
  message: '', consent: false,
}

function validate(f) {
  const e = {}
  if (!f.name || f.name.trim().length < 3)          e.name       = 'Please enter your full name (min 3 characters).'
  if (!/^\S+@\S+\.\S+$/.test(f.email))              e.email      = 'Please enter a valid email address.'
  if (!/^[0-9+\s-]{10,15}$/.test(f.phone))          e.phone      = 'Please enter a valid 10–15 digit phone number.'
  if (!f.city || f.city.trim().length < 2)          e.city       = 'Please enter your preferred dealership city.'
  if (!f.state)                                      e.state      = 'Please select your state.'
  if (f.pincode && !/^[0-9]{6}$/.test(f.pincode))   e.pincode    = 'Pincode must be 6 digits.'
  if (!f.property)                                   e.property   = 'Please choose a property option.'
  if (!f.business)                                   e.business   = 'Please select your business type.'
  if (!f.experience)                                 e.experience = 'Please select your experience.'
  if (!f.investment)                                 e.investment = 'Please choose an investment range.'
  if (!f.consent)                                    e.consent    = 'You must agree to the Privacy Policy.'
  return e
}

export default function DealerApplyModal({ open, onClose }) {
  const { show } = useToast()
  const formRef = useRef(null)
  const [form, setForm]     = useState(EMPTY)
  const [errors, setErrors] = useState({})
  const [busy, setBusy]     = useState(false)

  // Reset on open + body-scroll lock + Esc close
  useEffect(() => {
    if (!open) return
    setForm(EMPTY); setErrors({}); setBusy(false)
    const onKey = (e) => { if (e.key === 'Escape') onClose?.() }
    document.addEventListener('keydown', onKey)
    const prev = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => {
      document.removeEventListener('keydown', onKey)
      document.body.style.overflow = prev
    }
  }, [open, onClose])

  if (!open) return null

  const set = (key) => (v) => {
    setForm((f) => {
      const next  = { ...f, [key]: v }
      const fresh = validate(next)
      setErrors((errs) => ({ ...errs, [key]: fresh[key] }))
      return next
    })
  }

  function submit(ev) {
    ev.preventDefault()
    const errs = validate(form)
    setErrors(errs)
    if (Object.keys(errs).length) {
      show('Please check the form — some fields need your attention.', 'error', 5000)
      requestAnimationFrame(() => {
        formRef.current?.querySelector(
          '.form-group.is-invalid input, .form-group.is-invalid select, .form-group.is-invalid textarea',
        )?.focus()
      })
      return
    }
    setBusy(true)
    setTimeout(() => {
      const firstName = form.name.trim().split(' ')[0] || 'there'
      setBusy(false)
      onClose?.()
      show(
        `Thanks ${firstName}! Our partnerships team will reach out within 48 hours.`,
        'success',
        5500,
      )
    }, 1200)
  }

  return createPortal(
    <div
      className="csr-modal-backdrop"
      onClick={(e) => { if (e.target === e.currentTarget) onClose?.() }}
      role="dialog"
      aria-modal="true"
      aria-labelledby="dealerApplyModalLabel"
    >
      <div className="csr-modal" style={{ maxWidth: 760 }}>
        <div className="csr-modal-header">
          <div>
            <h5 id="dealerApplyModalLabel" className="modal-title">
              Apply For Dealership
            </h5>
            <p className="csr-modal-subtitle">
              Partner with India&apos;s next-gen EV motorcycle brand.
              Our team will reach out within 48 hours.
            </p>
          </div>
          <button
            type="button"
            className="csr-modal-close"
            aria-label="Close"
            onClick={onClose}
          >
            <i className="bi bi-x-lg"></i>
          </button>
        </div>

        <div className="csr-modal-body">
          <form ref={formRef} id="dealerApplyForm" noValidate onSubmit={submit}>
            {/* Personal */}
            <div className="form-row">
              <InputControl
                label="Full Name" placeholder="Your full name"
                value={form.name} onChange={set('name')}
                required error={errors.name}
              />
              <InputControl
                label="Email" type="email" placeholder="your@email.com"
                value={form.email} onChange={set('email')}
                required error={errors.email}
              />
            </div>
            <div className="form-row">
              <InputControl
                label="Mobile Number" type="tel"
                placeholder="+91 98765 43210" maxLength={15}
                value={form.phone} onChange={set('phone')}
                required error={errors.phone}
              />
              <InputControl
                label="Company / Firm Name"
                placeholder="Your firm (optional)"
                value={form.company} onChange={set('company')}
              />
            </div>

            {/* Location */}
            <div className="form-row">
              <InputControl
                label="Preferred Dealership City" placeholder="E.g. Surat"
                value={form.city} onChange={set('city')}
                required error={errors.city}
              />
              <InputControl
                as="select" label="State" placeholder="Select state"
                value={form.state} onChange={set('state')}
                options={STATES.filter(Boolean)}
                required error={errors.state}
              />
            </div>
            <div className="form-row">
              <InputControl
                label="Pincode" placeholder="6-digit pincode"
                inputMode="numeric" maxLength={6}
                value={form.pincode}
                onChange={(v) => set('pincode')(v.replace(/\D/g, '').slice(0, 6))}
                error={errors.pincode}
              />
              <InputControl
                as="select" label="Do you own a commercial property?"
                value={form.property} onChange={set('property')}
                options={PROPERTY}
                required error={errors.property}
              />
            </div>

            {/* Business */}
            <div className="form-row">
              <InputControl
                as="select" label="Current Business Type"
                value={form.business} onChange={set('business')}
                options={BUSINESS}
                required error={errors.business}
              />
              <InputControl
                as="select" label="Years of Experience"
                placeholder="Select"
                value={form.experience} onChange={set('experience')}
                options={EXPERIENCE.filter(Boolean)}
                required error={errors.experience}
              />
            </div>
            <InputControl
              as="select" label="Investment Capacity"
              value={form.investment} onChange={set('investment')}
              options={INVESTMENT}
              required error={errors.investment}
            />

            {/* Message */}
            <InputControl
              as="textarea" label="Message / Why Svitch?" rows={3}
              placeholder="Tell us about your goals, existing dealership, or any specific questions..."
              value={form.message} onChange={set('message')}
            />

            <div className={'form-group form-check-group rajdhani-lbl-text-sm' + (errors.consent ? ' is-invalid' : '')}>
              <input
                type="checkbox"
                id="daConsent"
                checked={form.consent}
                onChange={(e) => set('consent')(e.target.checked)}
              />
              <label className="rajdhani-lbl-text-sm" htmlFor="daConsent">
                I agree to Svitch&apos;s{' '}
                <Link to={PATHS.privacyPolicy}>Privacy Policy</Link>{' '}
                and consent to being contacted regarding this dealership enquiry.
              </label>
              {errors.consent && (
                <div className="invalid-feedback">{errors.consent}</div>
              )}
            </div>
          </form>
        </div>

        <div className="csr-modal-footer">
          <button type="button" className="btn-csr secondary" onClick={onClose}>
            <i className="bi bi-x-lg"></i> Cancel
          </button>
          <button
            type="submit"
            form="dealerApplyForm"
            className="btn-csr primary"
            disabled={busy}
          >
            {busy ? (
              <span className="btn-spinner">
                <i className="bi bi-arrow-repeat spin-icon"></i> Submitting...
              </span>
            ) : (
              <span className="btn-text">
                <i className="bi bi-send-fill"></i> Submit Application
              </span>
            )}
          </button>
        </div>
      </div>
    </div>,
    document.body,
  )
}
