import { useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import InputControl from '@/ui/InputControl'
import { useToast } from '@/contexts/ToastContext'
import { PATHS } from '@/utils/routes'

// Warranty Registration CTA + activate-warranty form.
// Mirrors CSR_New_web `#warranty-register`. Uses the shared InputControl
// primitive for live red/green validation across every field.
const PERKS = [
  'Unlock digital warranty card',
  'Priority claim processing',
  'Free OTA updates & app integration',
  'Service history auto-saved in the app',
]

const MODELS = [
  { value: '',              label: 'Choose a model' },
  { value: 'csr762-black',  label: 'CSR 762 — Stealth Black' },
  { value: 'csr762-gray',   label: 'CSR 762 — Grit Gray' },
  { value: 'csr762-red',    label: 'CSR 762 — Inferno Red' },
]

const DEALER_CITIES = [
  { value: '',           label: 'Select dealer city' },
  { value: 'ahmedabad',  label: 'Ahmedabad' },
  { value: 'bengaluru',  label: 'Bengaluru' },
  { value: 'chennai',    label: 'Chennai' },
  { value: 'delhi',      label: 'Delhi NCR' },
  { value: 'hyderabad',  label: 'Hyderabad' },
  { value: 'jaipur',     label: 'Jaipur' },
  { value: 'kochi',      label: 'Kochi' },
  { value: 'kolkata',    label: 'Kolkata' },
  { value: 'mumbai',     label: 'Mumbai' },
  { value: 'pune',       label: 'Pune' },
  { value: 'other',      label: 'Other' },
]

const EMPTY = {
  name: '', phone: '', email: '', vin: '',
  model: '', purchase: '', dealer: '', consent: false,
}

const today = () => new Date().toISOString().slice(0, 10)

function validate(f) {
  const e = {}
  if (!f.name || f.name.trim().length < 3)              e.name     = 'Please enter your full name (min 3 characters).'
  if (!/^[0-9+\s-]{10,15}$/.test(f.phone))              e.phone    = 'Please enter a valid 10–15 digit phone number.'
  if (!/^\S+@\S+\.\S+$/.test(f.email))                   e.email    = 'Please enter a valid email address.'
  if (!f.vin || f.vin.trim().length < 10)               e.vin      = 'VIN must be at least 10 characters.'
  else if (f.vin.trim().length > 17)                     e.vin      = 'VIN cannot exceed 17 characters.'
  if (!f.model)                                          e.model    = 'Please choose your model.'
  if (!f.purchase)                                       e.purchase = 'Please select your purchase date.'
  else if (f.purchase > today())                         e.purchase = 'Purchase date cannot be in the future.'
  if (!f.dealer)                                         e.dealer   = 'Please select your dealer city.'
  if (!f.consent)                                        e.consent  = 'Please confirm the details to continue.'
  return e
}

export default function WarrantyRegister() {
  const { show } = useToast()
  const formRef = useRef(null)
  const [form, setForm]     = useState(EMPTY)
  const [errors, setErrors] = useState({})
  const [busy, setBusy]     = useState(false)

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
      setForm(EMPTY)
      setErrors({})
      setBusy(false)
      show(
        `Warranty activated! Thanks ${firstName} — a confirmation SMS + email is on the way.`,
        'success',
        5000,
      )
    }, 1200)
  }

  return (
    <section id="warranty-register">
      <div className="container">
        <div className="register-wrap">
          <div className="register-content">
            <span className="section-label">Warranty Registration</span>
            <h2 className="section-title">
              Register Your <span className="accent">CSR 762</span>
            </h2>
            <p className="section-desc">
              Activate your warranty in under 2 minutes. Link your VIN to your
              phone &amp; email to unlock claim tracking, app support, and OTA
              firmware updates.
            </p>
            <ul className="register-perks">
              {PERKS.map((p) => (
                <li key={p}><i className="bi bi-check2-circle"></i> {p}</li>
              ))}
            </ul>
          </div>

          <div className="card-base form-card register-card">
            <h3 className="form-card-title register-title">
              Activate <span className="accent">Warranty</span>
            </h3>

            <form
              ref={formRef}
              id="warrantyForm"
              noValidate
              onSubmit={submit}
            >
              <div className="form-row">
                <InputControl
                  label="Full Name" placeholder="Enter your name"
                  value={form.name} onChange={set('name')}
                  required error={errors.name}
                />
                <InputControl
                  label="Mobile Number" type="tel" placeholder="+91 98765 43210"
                  value={form.phone} onChange={set('phone')}
                  required error={errors.phone}
                />
              </div>

              <div className="form-row">
                <InputControl
                  label="Email" type="email" placeholder="your@email.com"
                  value={form.email} onChange={set('email')}
                  required error={errors.email}
                />
                <InputControl
                  label="VIN / Chassis No." placeholder="17-digit VIN"
                  value={form.vin}
                  onChange={(v) => set('vin')(v.toUpperCase())}
                  required error={errors.vin}
                  maxLength={17}
                />
              </div>

              <div className="form-row">
                <InputControl
                  as="select" label="Model"
                  value={form.model} onChange={set('model')}
                  options={MODELS}
                  required error={errors.model}
                />
                <InputControl
                  label="Purchase Date" type="date" max={today()}
                  value={form.purchase} onChange={set('purchase')}
                  required error={errors.purchase}
                />
              </div>

              <InputControl
                as="select" label="Purchased From (City)"
                value={form.dealer} onChange={set('dealer')}
                options={DEALER_CITIES}
                required error={errors.dealer}
              />

              <div className={'form-group form-check-group rajdhani-lbl-text-sm' + (errors.consent ? ' is-invalid' : '')}>
                <input
                  type="checkbox"
                  id="wrConsent"
                  checked={form.consent}
                  onChange={(e) => set('consent')(e.target.checked)}
                />
                <label className="rajdhani-lbl-text-sm" htmlFor="wrConsent">
                  I confirm the VIN and purchase details are accurate and agree
                  to the <Link to={PATHS.termCondition}>Warranty Terms</Link>.
                </label>
                {errors.consent && (
                  <div className="invalid-feedback">{errors.consent}</div>
                )}
              </div>

              <button
                type="submit"
                className="btn-csr primary full-w"
                disabled={busy}
              >
                {busy ? (
                  <span className="btn-spinner">
                    <i className="bi bi-arrow-repeat spin-icon"></i> Activating...
                  </span>
                ) : (
                  <span className="btn-text">
                    <i className="bi bi-shield-fill-check"></i> Activate Warranty
                  </span>
                )}
              </button>

              <p className="register-note">
                <i className="bi bi-shield-check"></i>
                Confirmation sent via SMS + email within 2 minutes.
              </p>
            </form>
          </div>
        </div>
      </div>
    </section>
  )
}
