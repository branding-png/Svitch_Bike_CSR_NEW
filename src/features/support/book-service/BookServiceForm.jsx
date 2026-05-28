import { useRef, useState } from 'react'
import InputControl from '@/ui/InputControl'
import { useToast } from '@/contexts/ToastContext'

// Book Service — CTA + form section. Mirrors CSR_New_web `#book-service`.
// Live per-field validation drives the green `.is-valid` + red `.is-invalid`
// borders via the shared InputControl primitive.
const PLANS = [
  { value: '',          label: 'Choose a plan' },
  { value: 'basic',     label: 'Basic Care — ₹999' },
  { value: 'standard',  label: 'Standard Plus — ₹2,499' },
  { value: 'amc',       label: 'Premium AMC — ₹5,999/yr' },
]

const CITIES = [
  { value: '',           label: 'Select a city' },
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
]

const PICKUPS = [
  { value: '',          label: 'Choose an option' },
  { value: 'doorstep',  label: 'Free doorstep pickup' },
  { value: 'drop',      label: 'Drop at service centre' },
]

const PERKS = [
  'Confirmation within 2 hours',
  'Free pickup & drop on Standard Plus & AMC',
  'Live job-card tracking on the app',
  'Genuine parts, certified technicians',
]

const EMPTY = {
  name: '', phone: '', plan: '', date: '',
  city: '', pickup: '', notes: '',
}

const today = () => new Date().toISOString().slice(0, 10)

function validate(f) {
  const e = {}
  if (!f.name || f.name.trim().length < 3)         e.name   = 'Please enter your full name (min 3 characters).'
  if (!/^[0-9+\s-]{10,15}$/.test(f.phone))         e.phone  = 'Please enter a valid 10-digit phone number.'
  if (!f.plan)                                      e.plan   = 'Please choose a service plan.'
  if (!f.date)                                      e.date   = 'Please select a preferred date.'
  else if (f.date < today())                        e.date   = 'Date must be today or later.'
  if (!f.city)                                      e.city   = 'Please select your city.'
  if (!f.pickup)                                    e.pickup = 'Please choose a pickup preference.'
  return e
}

export default function BookServiceForm() {
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
        `Slot reserved! Thanks ${firstName} — a service advisor will confirm within 2 hours.`,
        'success',
        4500,
      )
    }, 1200)
  }

  return (
    <section aria-label="BookServiceForm" id="book-service">
      <div className="container">
        <div className="book-service-wrap">
          <div className="book-service-content">
            <span className="section-label rajdhani-lbl-text-sm">Ready To Book?</span>
            <h2 className="section-title">
              Book Your <span className="accent ">Service</span>
            </h2>
            <p className="section-desc">
              Fill in your details and a Svitch service advisor will confirm
              your slot within 2 hours. Doorstep pickup available in 25+ cities.
            </p>
            <ul className="book-service-perks">
              {PERKS.map((p) => (
                <li key={p}><i className="bi bi-check2-circle"></i> {p}</li>
              ))}
            </ul>
          </div>

          <div className="card-base form-card book-service-card">
            <h3 className="form-card-title book-service-title">
              Service <span className="accent">Request</span>
            </h3>

            <form
              ref={formRef}
              id="bookServiceForm"
              className="book-service-form"
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
                  label="Phone" type="tel" placeholder="+91 98765 43210"
                  value={form.phone} onChange={set('phone')}
                  required error={errors.phone}
                />
              </div>

              <div className="form-row">
                <InputControl
                  as="select" label="Service Plan"
                  value={form.plan} onChange={set('plan')}
                  options={PLANS}
                  required error={errors.plan}
                />
                <InputControl
                  label="Preferred Date" type="date" min={today()}
                  value={form.date} onChange={set('date')}
                  required error={errors.date}
                />
              </div>

              <div className="form-row">
                <InputControl
                  as="select" label="City"
                  value={form.city} onChange={set('city')}
                  options={CITIES}
                  required error={errors.city}
                />
                <InputControl
                  as="select" label="Pickup Preference"
                  value={form.pickup} onChange={set('pickup')}
                  options={PICKUPS}
                  required error={errors.pickup}
                />
              </div>

              <InputControl
                as="textarea" label="Notes (optional)" rows={3}
                placeholder="Any specific concerns, warning lights, or requests..."
                value={form.notes} onChange={set('notes')}
              />

              <button
                type="submit"
                className="btn-csr primary full-w"
                disabled={busy}
              >
                {busy ? (
                  <>
                    <i className="bi bi-arrow-repeat spin-icon"></i> Booking...
                  </>
                ) : (
                  <>
                    <i className="bi bi-calendar-check"></i> Confirm Booking
                  </>
                )}
              </button>

              <p className="book-service-note">
                <i className="bi bi-shield-check"></i>
                Your data is safe with us. We&apos;ll never share your details.
              </p>
            </form>
          </div>
        </div>
      </div>
    </section>
  )
}
