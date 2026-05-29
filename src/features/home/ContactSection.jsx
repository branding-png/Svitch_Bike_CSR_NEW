import { useState } from 'react'
import { InputControl, SectionHeader } from '@/ui'
import { useToast } from '@/contexts/ToastContext'

// Contact / "Book Your Bike" section — full validation + inline + toast.
// Drop into any page with: <ContactSection />.
const CONTACT_CITIES = [
  'Mumbai', 'Delhi NCR', 'Bengaluru', 'Pune', 'Ahmedabad',
  'Chennai', 'Hyderabad', 'Kolkata', 'Jaipur', 'Other',
]
const EMPTY = { name: '', email: '', phone: '', city: '', date: '' }

export default function ContactSection() {
  const { show } = useToast()
  const [form, setForm] = useState(EMPTY)
  const [errors, setErrors] = useState({})
  const [submitting, setSubmitting] = useState(false)

  // Pure validation — returns { fieldKey: 'error message', ... } without side effects.
  function validateFields(f) {
    const e = {}
    if (!f.name.trim()) e.name = 'Please enter your full name.'
    else if (f.name.trim().length < 3) e.name = 'Full name must be at least 3 characters.'

    if (!f.email.trim()) e.email = 'Please enter your email address.'
    else if (!/^\S+@\S+\.\S+$/.test(f.email)) e.email = 'Please enter a valid email address.'

    if (!f.phone.trim()) e.phone = 'Please enter your mobile number.'
    else if (!/^[6-9]\d{9}$/.test(f.phone)) e.phone = 'Enter a 10-digit Indian mobile (starting 6-9).'

    if (!f.city) e.city = 'Please select a city.'

    const today = new Date(new Date().toDateString())
    if (!f.date) e.date = 'Please pick a preferred date.'
    else if (new Date(f.date) < today) e.date = 'Date must be today or later.'

    return e
  }

  // Live per-field validation → green/red InputControl border as the user types.
  function update(k, v) {
    setForm((f) => {
      const next  = { ...f, [k]: v }
      const fresh = validateFields(next)
      setErrors((errs) => ({ ...errs, [k]: fresh[k] }))
      return next
    })
  }

  function submit(ev) {
    ev.preventDefault()
    const e = validateFields(form)
    setErrors(e)
    const errCount = Object.keys(e).length
    if (errCount > 0) {
      show(
        errCount === 1
          ? Object.values(e)[0]
          : `Please fix ${errCount} fields highlighted in red.`,
        'error'
      )
      return
    }
    setSubmitting(true)
    // Demo only — fake a 1.2s API call, then reset
    setTimeout(() => {
      setSubmitting(false)
      setForm(EMPTY)
      setErrors({})
      show('Booking received. Our team will contact you within 24 hours.', 'success')
    }, 1200)
  }

  return (
    <section id="contact" aria-label="ContactSection">
      <div className="container">
        <div className="row align-items-end">
          <div className="col-lg-6">
            <SectionHeader
              label="Get Started"
              titleStart="Book Your"
              titleAccent="Bike"
              description="Experience the CSR 762 at your nearest dealership."
              className="text-start"
            />
            <div className="contact-info-cards">
              <div className="card-base ci-card">
                <i className="bi bi-telephone-fill"></i>
                <div><h5>Toll-Free</h5><p>1800-762-1234</p></div>
              </div>
              <div className="card-base ci-card">
                <i className="bi bi-envelope-fill"></i>
                <div><h5>Email</h5><p>hello@svitch.bike</p></div>
              </div>
              <div className="card-base ci-card">
                <i className="bi bi-geo-alt-fill"></i>
                <div><h5>HQ</h5><p>Bavla-Changodar, Gujarat</p></div>
              </div>
            </div>
          </div>

          <div className="col-lg-6">
            <form className="contact-form reveal delay-2" onSubmit={submit} noValidate>
              <InputControl
                label="Full Name"
                value={form.name}
                onChange={(v) => update('name', v)}
                placeholder="Enter your full name"
                minLength={3}
                required
                error={errors.name}
              />
              <InputControl
                label="Email Address"
                type="email"
                value={form.email}
                onChange={(v) => update('email', v)}
                placeholder="Enter your email address"
                required
                error={errors.email}
              />
              <InputControl
                label="Mobile Number"
                type="tel"
                value={form.phone}
                onChange={(v) => update('phone', v)}
                placeholder="Enter 10-digit mobile number"
                maxLength={10}
                required
                error={errors.phone}
              />

              <div className="cf-row">
                <InputControl
                  as="select"
                  label="City"
                  value={form.city}
                  onChange={(v) => update('city', v)}
                  options={CONTACT_CITIES}
                  placeholder="Select your city"
                  required
                  error={errors.city}
                />
                <InputControl
                  label="Preferred Date"
                  type="date"
                  value={form.date}
                  onChange={(v) => update('date', v)}
                  required
                  error={errors.date}
                />
              </div>

              <button type="submit" className="btn-csr primary full-w" disabled={submitting}>
                {submitting ? (
                  <span className="btn-spinner">
                    <i className="bi bi-arrow-repeat spin-icon"></i> Processing...
                  </span>
                ) : (
                  <span className="btn-text">
                    <i className="bi bi-send-fill"></i> Book Your Bike
                  </span>
                )}
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  )
}
