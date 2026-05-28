import { useRef, useState } from 'react'
import InputControl from '@/ui/InputControl'
import { useToast } from '@/contexts/ToastContext'

// Contact form + info cards — mirrors CSR_New_web `#contact-main`.
// Validation pattern matches reference contact.html: invalid fields receive
// `.form-group.is-invalid` (red border via components.css), an error toast
// fires on failed submit, and the submit button shows a 1.2s spinner on success.
const SUBJECTS = [
  { value: 'general',    label: 'General Enquiry'        },
  { value: 'booking',    label: 'Book Now / Pre-Booking' },
  { value: 'test-ride',  label: 'Test Ride Request'      },
  { value: 'dealership', label: 'Dealership Partnership' },
  { value: 'service',    label: 'Service & Support'      },
  { value: 'media',      label: 'Press & Media'          },
  { value: 'careers',    label: 'Careers'                },
]

const INFO_CARDS = [
  {
    icon:  'bi-geo-alt-fill',
    label: 'Visit Us',
    title: 'Head Office',
    body: (
      <>
        Svitch Motocorp Pvt. Ltd.<br />
        201, Silver Square, Near Gurukul Cross Road,<br />
        Ahmedabad, Gujarat — 380052, India
      </>
    ),
    link: { href: '#', text: 'Get Directions' },
  },
  {
    icon:  'bi-telephone-fill',
    label: 'Call Us',
    title: 'Sales & Support',
    body: (
      <>
        <a href="tel:+911800123456">+91 1800-123-456</a> (Toll Free)<br />
        <a href="tel:+917940123456">+91 79 4012 3456</a> (Head Office)<br />
        <span className="contact-info-meta">Mon–Sat · 10:00 AM – 7:00 PM IST</span>
      </>
    ),
  },
  {
    icon:  'bi-envelope-fill',
    label: 'Email Us',
    title: 'Drop A Line',
    body: (
      <>
        <a href="mailto:hello@svitch.bike">hello@svitch.bike</a> (General)<br />
        <a href="mailto:support@svitch.bike">support@svitch.bike</a> (Support)<br />
        <a href="mailto:dealers@svitch.bike">dealers@svitch.bike</a> (Dealerships)
      </>
    ),
  },
]

const EMPTY = { fullName: '', email: '', mobile: '', subject: '', message: '', consent: false }

export default function ContactMain() {
  const { show } = useToast()
  const formRef = useRef(null)
  const [form, setForm] = useState(EMPTY)
  const [errors, setErrors] = useState({})
  const [busy, setBusy] = useState(false)

  // Live per-field validation on every keystroke — drives green `.is-valid`
  // when the field passes + red `.is-invalid` when it doesn't.
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
    if (f.fullName.trim().length < 3)         e.fullName = 'Please enter your full name (min 3 characters).'
    if (!/^\S+@\S+\.\S+$/.test(f.email))      e.email    = 'Please enter a valid email address.'
    if (!/^[0-9+\s-]{10,15}$/.test(f.mobile)) e.mobile   = 'Please enter a valid 10–15 digit phone number.'
    if (!f.subject)                            e.subject  = 'Please choose a subject.'
    if (f.message.trim().length < 10)          e.message  = 'Tell us a bit more (at least 10 characters).'
    if (!f.consent)                            e.consent  = 'Please accept the Privacy Policy.'
    return e
  }

  function submit(ev) {
    ev.preventDefault()
    const errs = validate(form)
    setErrors(errs)
    if (Object.keys(errs).length) {
      show('Please check the form — some fields need your attention.', 'error', 5000)
      // Focus the first .is-invalid input
      requestAnimationFrame(() => {
        const first = formRef.current?.querySelector('.form-group.is-invalid input, .form-group.is-invalid select, .form-group.is-invalid textarea')
        first?.focus()
      })
      return
    }
    // Simulate send with 1.2s spinner — matches reference UX
    setBusy(true)
    setTimeout(() => {
      const firstName = form.fullName.trim().split(' ')[0] || 'there'
      setForm(EMPTY)
      setErrors({})
      setBusy(false)
      show(`Message sent! Thanks ${firstName} — we'll reply within 24 hours.`, 'success', 4000)
    }, 1200)
  }

  return (
    <section id="contact-main">
      <div className="container">
        <div className="contact-grid">
          {/* Left: Form */}
          <div className="card-base contact-form-card">
            <span className="section-label">Send Us A Message</span>
            <h2 className="contact-form-title">
              Write <span className="accent">To Us</span>
            </h2>
            <p className="contact-form-sub">
              Fill out the form below and our team will get back to you within 24 hours.
            </p>

            <form
              ref={formRef}
              className="contact-form-main"
              noValidate
              onSubmit={submit}
            >
              <div className="form-row">
                <InputControl
                  label="Full Name"
                  placeholder="Enter your full name"
                  value={form.fullName}
                  onChange={set('fullName')}
                  required
                  error={errors.fullName}
                />
                <InputControl
                  label="Email"
                  type="email"
                  placeholder="your@email.com"
                  value={form.email}
                  onChange={set('email')}
                  required
                  error={errors.email}
                />
              </div>

              <div className="form-row">
                <InputControl
                  label="Phone"
                  type="tel"
                  placeholder="+91 98765 43210"
                  value={form.mobile}
                  onChange={set('mobile')}
                  required
                  error={errors.mobile}
                />
                <InputControl
                  as="select"
                  label="Subject"
                  placeholder="Choose a subject"
                  options={SUBJECTS}
                  value={form.subject}
                  onChange={set('subject')}
                  required
                  error={errors.subject}
                />
              </div>

              <InputControl
                as="textarea"
                label="Message"
                placeholder="Tell us how we can help..."
                rows={5}
                value={form.message}
                onChange={set('message')}
                required
                error={errors.message}
              />

              <div className={'form-group form-check-group rajdhani-lbl-text-sm' + (errors.consent ? ' is-invalid' : '')}>
                <input
                  type="checkbox"
                  id="cfConsent"
                  checked={form.consent}
                  onChange={(e) => set('consent')(e.target.checked)}
                />
                <label className="rajdhani-lbl-text-sm" htmlFor="cfConsent">
                  I agree to the{' '}
                  <a className="rajdhani-lbl-text-sm" href="/legal/privacy-policy">Privacy Policy</a>{' '}
                  and consent to being contacted by Svitch.
                </label>
                {errors.consent && (
                  <div className="invalid-feedback">{errors.consent}</div>
                )}
              </div>

              <button
                type="submit"
                className="btn-csr primary full-w"
                disabled={busy}
                style={busy ? { opacity: 0.7 } : undefined}
              >
                <span className="btn-text">
                  {busy ? (
                    <><i className="bi bi-arrow-repeat spin-icon"></i> Sending...</>
                  ) : (
                    <><i className="bi bi-send-fill"></i> Send Message</>
                  )}
                </span>
              </button>
            </form>
          </div>

          {/* Right: Info cards */}
          <div className="contact-info-wrap">
            {INFO_CARDS.map((c) => (
              <div key={c.title} className="card-base contact-info-card">
                <div className="contact-info-icon">
                  <i className={`bi ${c.icon}`}></i>
                </div>
                <div className="contact-info-body">
                  <span className="contact-info-label">{c.label}</span>
                  <h5 className="contact-info-title">{c.title}</h5>
                  <p>{c.body}</p>
                  {c.link && (
                    <a href={c.link.href} className="rajdhani-lbl-text-sm contact-info-link">
                      {c.link.text} <i className="bi bi-arrow-right"></i>
                    </a>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
