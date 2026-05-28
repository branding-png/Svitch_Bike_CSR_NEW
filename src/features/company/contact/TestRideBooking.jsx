import { useRef, useState } from 'react'
import InputControl from '@/ui/InputControl'
import { useToast } from '@/contexts/ToastContext'

// Test ride booking — mirrors CSR_New_web `#test-ride`.
// Same validation flow as ContactMain: invalid fields get .form-group.is-invalid,
// error toast on submit failure, 1.2s spinner + success toast on submit pass.
const PERKS = [
  'Free 15-minute test ride',
  'Expert walkthrough of all features',
  'Zero commitment, zero pressure',
  'Exclusive pre-booking offers on the spot',
]

const TIME_SLOTS = [
  { value: '10-11', label: '10:00 AM – 11:00 AM' },
  { value: '11-12', label: '11:00 AM – 12:00 PM' },
  { value: '14-15', label: '2:00 PM – 3:00 PM'   },
  { value: '15-16', label: '3:00 PM – 4:00 PM'   },
  { value: '16-17', label: '4:00 PM – 5:00 PM'   },
  { value: '17-18', label: '5:00 PM – 6:00 PM'   },
]

const MODELS = [
  { value: 'csr762-black', label: 'CSR 762 — Stealth Black' },
  { value: 'csr762-gray',  label: 'CSR 762 — Grit Gray'     },
  { value: 'csr762-red',   label: 'CSR 762 — Inferno Red'   },
]

const DEALERS = [
  { value: 'ahmedabad', label: 'Ahmedabad — Flagship Store'         },
  { value: 'bengaluru', label: 'Bengaluru — Experience Centre'      },
  { value: 'pune',      label: 'Pune — DAK Automotives'             },
  { value: 'mumbai',    label: 'Mumbai — Bandra'                    },
  { value: 'chennai',   label: 'Chennai — Anna Nagar'               },
  { value: 'delhi',     label: 'Delhi NCR — Gurugram (Opening Soon)' },
]

const EMPTY = { name: '', phone: '', date: '', time: '', model: '', city: '' }

const today = () => new Date().toISOString().slice(0, 10)

export default function TestRideBooking() {
  const { show } = useToast()
  const formRef = useRef(null)
  const [form, setForm] = useState(EMPTY)
  const [errors, setErrors] = useState({})
  const [busy, setBusy] = useState(false)

  // Live per-field validation → green/red InputControl border as the user types.
  const set = (key) => (v) => {
    setForm((f) => {
      const next  = { ...f, [key]: v }
      const fresh = validate(next)
      setErrors((errs) => ({ ...errs, [key]: fresh[key] }))
      return next
    })
  }

  function validate(f) {
    const e = {}
    if (f.name.trim().length < 3)          e.name  = 'Please enter your full name (min 3 characters).'
    if (!/^[0-9+\s-]{10,15}$/.test(f.phone)) e.phone = 'Please enter a valid 10–15 digit phone number.'
    if (!f.date)                            e.date  = 'Please pick a preferred date.'
    else if (f.date < today())              e.date  = 'Date must be today or later.'
    if (!f.time)                            e.time  = 'Please select a time slot.'
    if (!f.model)                           e.model = 'Please choose a model.'
    if (!f.city)                            e.city  = 'Please pick a dealer.'
    return e
  }

  function submit(ev) {
    ev.preventDefault()
    const errs = validate(form)
    setErrors(errs)
    if (Object.keys(errs).length) {
      show('Please check the form — some fields need your attention.', 'error', 5000)
      requestAnimationFrame(() => {
        const first = formRef.current?.querySelector('.form-group.is-invalid input, .form-group.is-invalid select')
        first?.focus()
      })
      return
    }
    setBusy(true)
    setTimeout(() => {
      const firstName = form.name.trim().split(' ')[0] || 'there'
      setForm(EMPTY)
      setErrors({})
      setBusy(false)
      show(`Slot reserved! Thanks ${firstName} — we'll call within 2 hours to confirm.`, 'success', 4000)
    }, 1200)
  }

  return (
    <section id="test-ride">
      <div className="container">
        <div className="test-ride-wrap">
          <div className="test-ride-content">
            <span className="section-label">Experience It Live</span>
            <h2 className="section-title">
              Book A <span className="accent">Test Ride</span>
            </h2>
            <p className="section-desc">
              Feel the instant torque. Hear the silent power. Take the CSR 762 for a
              spin at your nearest dealer — it's completely free and takes just 15
              minutes.
            </p>
            <ul className="test-ride-perks">
              {PERKS.map((p) => (
                <li key={p}><i className="bi bi-check2-circle"></i> {p}</li>
              ))}
            </ul>
          </div>

          <div className="card-base form-card test-ride-form-card">
            <h3 className="form-card-title test-ride-form-title">
              Reserve Your <span className="accent">Slot</span>
            </h3>

            <form
              ref={formRef}
              className="test-ride-form"
              noValidate
              onSubmit={submit}
            >
              <InputControl
                label="Full Name"
                placeholder="Enter your name"
                value={form.name}
                onChange={set('name')}
                required
                error={errors.name}
              />
              <InputControl
                label="Phone Number"
                type="tel"
                placeholder="+91 98765 43210"
                value={form.phone}
                onChange={set('phone')}
                required
                error={errors.phone}
              />

              <div className="form-row">
                <InputControl
                  label="Preferred Date"
                  type="date"
                  min={today()}
                  value={form.date}
                  onChange={set('date')}
                  required
                  error={errors.date}
                />
                <InputControl
                  as="select"
                  label="Preferred Time"
                  placeholder="Select slot"
                  options={TIME_SLOTS}
                  value={form.time}
                  onChange={set('time')}
                  required
                  error={errors.time}
                />
              </div>

              <InputControl
                as="select"
                label="Model"
                placeholder="Choose a model"
                options={MODELS}
                value={form.model}
                onChange={set('model')}
                required
                error={errors.model}
              />
              <InputControl
                as="select"
                label="Pick Your Dealer"
                placeholder="Select a city"
                options={DEALERS}
                value={form.city}
                onChange={set('city')}
                required
                error={errors.city}
              />

              <button
                type="submit"
                className="btn-csr primary full-w"
                disabled={busy}
                style={busy ? { opacity: 0.7 } : undefined}
              >
                {busy ? (
                  <><i className="bi bi-arrow-repeat spin-icon"></i> Booking...</>
                ) : (
                  <><i className="bi bi-calendar-check"></i> Book My Test Ride</>
                )}
              </button>

              <p className="test-ride-note">
                <i className="bi bi-shield-check"></i>
                We'll call you within 2 hours to confirm your slot.
              </p>
            </form>
          </div>
        </div>
      </div>
    </section>
  )
}
