import { useEffect, useRef, useState } from 'react'
import { Link, useSearchParams } from 'react-router-dom'
import InputControl from '@/ui/InputControl'
import { useToast } from '@/contexts/ToastContext'

// "Book Your Slot" form — mirrors CSR_New_web `.tr-form-card`.
// Uses the shared InputControl primitive so invalid fields get the standard
// `.form-group.is-invalid` red-border treatment. On submit success the form is
// replaced inline by a full booking-summary panel (`.tr-success-rich`).
const COLOURS = [
  { value: 'black', label: 'CSR 762 — Matte Black'   },
  { value: 'red',   label: 'CSR 762 — Racing Red'    },
  { value: 'grey',  label: 'CSR 762 — Graphite Grey' },
  { value: 'blue',  label: 'CSR 762 — Ocean Blue'    },
]

const TIMES = [
  '10:00 AM', '11:00 AM', '12:00 PM',
  '02:00 PM', '03:00 PM', '04:00 PM', '05:00 PM',
]

const CITIES = [
  'Mumbai', 'Delhi NCR', 'Bengaluru', 'Pune', 'Ahmedabad',
  'Chennai', 'Hyderabad', 'Kolkata', 'Jaipur', 'Other',
]

const EMPTY = {
  first: '', last: '', mobile: '', email: '',
  colour: '', date: '', time: '', city: '',
  consent: false,
}

const today = () => new Date().toISOString().slice(0, 10)

export default function BookTestRideForm() {
  const { show } = useToast()
  const formRef = useRef(null)
  const [params] = useSearchParams()
  // Prefill from query params (Reschedule: ?booking=&date=&time=&colour=&city=)
  // and from the logged-in user's profile (first/last/email/mobile). URL
  // params win over context where both are present.
  const [form, setForm]     = useState(() => {
    // Only prefill personal + slot fields when the user actually arrived from
    // a Reschedule link (identified by ?booking=…). Direct visits to this
    // page start with an empty form so new visitors aren't shown someone
    // else's session data.
    if (!params.get('booking')) return EMPTY

    return {
      ...EMPTY,
      first:  params.get('first')  || '',
      last:   params.get('last')   || '',
      email:  params.get('email')  || '',
      mobile: params.get('mobile') || '',
      date:   params.get('date')   || '',
      time:   params.get('time')   || '',
      colour: params.get('colour') || '',
      city:   params.get('city')   || '',
    }
  })
  const [errors, setErrors] = useState({})
  const [busy, setBusy]     = useState(false)
  const [success, setSuccess] = useState(null) // null | summary object
  const bookingRef = params.get('booking')

  // Friendly heads-up when arriving from a Reschedule link.
  // React StrictMode runs effects twice in dev — guard with a ref so the
  // toast only fires once per booking reference.
  const lastBookingRef = useRef(null)
  useEffect(() => {
    if (bookingRef && lastBookingRef.current !== bookingRef) {
      lastBookingRef.current = bookingRef
      show(`Rescheduling booking #${bookingRef} — pick a new date or time.`, 'info', 4500)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [bookingRef])

  // Live per-field validation on every keystroke → green/red InputControl border.
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
    if (f.first.trim().length < 2)          e.first  = 'Please enter your first name (min 2 characters).'
    if (f.last.trim().length < 2)           e.last   = 'Please enter your last name (min 2 characters).'
    if (!/^[6-9][0-9]{9}$/.test(f.mobile))  e.mobile = 'Please enter a valid 10-digit mobile number.'
    if (!/^\S+@\S+\.\S+$/.test(f.email))    e.email  = 'Please enter a valid email address.'
    if (!f.colour)                           e.colour = 'Please pick a colour for your test ride.'
    if (!f.date)                             e.date   = 'Please select a date.'
    else if (f.date < today())               e.date   = 'Date must be today or later.'
    if (!f.time)                             e.time   = 'Please select a time.'
    if (!f.city)                             e.city   = 'Please select your city.'
    if (!f.consent)                          e.consent = 'Please agree to the Terms of Service to continue.'
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
      const bookingId = 'TR' + String(Math.floor(100000 + Math.random() * 900000))
      const colourLabel = COLOURS.find((c) => c.value === form.colour)?.label || 'CSR 762'
      const niceDate = new Date(form.date).toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' })
      setSuccess({
        bookingId,
        customer:  `${form.first.trim()} ${form.last.trim()}`,
        model:     colourLabel,
        rideDate:  `${niceDate} · ${form.time}`,
        location:  `${form.city} — nearest authorised dealer`,
      })
      setBusy(false)
      show(`Test ride booked! Your booking ID is ${bookingId}.`, 'success', 4000)
    }, 1200)
  }

  if (success) {
    return <SuccessPanel summary={success} />
  }

  return (
    <div className="card-base tr-form-card" id="tr-book">
      <div className="tr-form-head">
        <h2 className="section-title">Book Your Slot</h2>
        <p>Takes less than 2 minutes. We'll confirm within 2 hours.</p>
      </div>

      <form ref={formRef} className="tr-form-body" noValidate onSubmit={submit}>
        <div className="form-row">
          <InputControl label="First Name" placeholder="Enter your first name"
            value={form.first}  onChange={set('first')}  required error={errors.first} />
          <InputControl label="Last Name"  placeholder="Enter your last name"
            value={form.last}   onChange={set('last')}   required error={errors.last} />
        </div>

        <InputControl label="Mobile Number" type="tel" maxLength={10}
          placeholder="Enter 10-digit mobile number"
          value={form.mobile} onChange={set('mobile')} required error={errors.mobile} />

        <InputControl label="Email Address" type="email"
          placeholder="rider@example.com"
          value={form.email} onChange={set('email')} required error={errors.email} />

        <InputControl as="select" label="Preferred Colour" placeholder="Select a colour"
          options={COLOURS}
          value={form.colour} onChange={set('colour')} required error={errors.colour} />

        <div className="form-row">
          <InputControl label="Preferred Date" type="date" min={today()}
            value={form.date} onChange={set('date')} required error={errors.date} />
          <InputControl as="select" label="Preferred Time" placeholder="Select a time"
            options={TIMES}
            value={form.time} onChange={set('time')} required error={errors.time} />
        </div>

        <InputControl as="select" label="Nearest City" placeholder="Select your city"
          options={CITIES}
          value={form.city} onChange={set('city')} required error={errors.city} />

        {/* Consent — custom styled box per book-test-ride.css */}
        <div className={'form-group tr-consent' + (errors.consent ? ' is-invalid' : '')}>
          <label className="tr-consent-label rajdhani-lbl-text-sm" htmlFor="trConsent">
            <input
              type="checkbox"
              id="trConsent"
              checked={form.consent}
              onChange={(e) => set('consent')(e.target.checked)}
            />
            <span className="tr-consent-box" aria-hidden="true">
              <i className="bi bi-check-lg"></i>
            </span>
            <span className="tr-consent-text">
              By booking, you agree to our{' '}
              <Link to="/legal/terms-conditions">Terms of Service</Link>.
              We'll call to confirm your slot — no deposit required.
            </span>
          </label>
          {errors.consent && (
            <div className="invalid-feedback">{errors.consent}</div>
          )}
        </div>

        <button
          type="submit"
          className="btn-csr primary tr-submit"
          disabled={busy}
          style={busy ? { opacity: 0.7 } : undefined}
        >
          {busy ? (
            <span className="btn-spinner">
              <i className="bi bi-arrow-repeat spin-icon"></i> Booking…
            </span>
          ) : (
            <span className="btn-text">
              <i className="bi bi-calendar-check"></i> Confirm Test Ride Booking
            </span>
          )}
        </button>
      </form>
    </div>
  )
}

// ─── Success panel ────────────────────────────────────────────────────────
const NEXT_STEPS = [
  { icon: 'bi-phone',         title: 'Check your SMS',     desc: 'Dealer address and contact details within 10 minutes.' },
  { icon: 'bi-person-check',  title: 'Bring your licence', desc: 'Valid 2-wheeler driving licence. Helmet provided by dealer.' },
  { icon: 'bi-bicycle',       title: 'Enjoy your ride',    desc: '30-minute guided test ride on the CSR 762. Ask us anything.' },
]

function SuccessPanel({ summary }) {
  const { show } = useToast()

  function share(channel) {
    return (e) => {
      e.preventDefault()
      const url  = typeof window !== 'undefined' ? window.location.href : ''
      const text = encodeURIComponent("I just booked a Svitch CSR 762 test ride!")
      const u    = encodeURIComponent(url)
      const target = {
        whatsapp: `https://wa.me/?text=${text}%20${u}`,
        facebook: `https://www.facebook.com/sharer/sharer.php?u=${u}`,
        twitter:  `https://twitter.com/intent/tweet?text=${text}&url=${u}`,
      }[channel]
      if (target) window.open(target, '_blank', 'noopener')
      else show("Copied to clipboard", 'info', 2000)
    }
  }

  return (
    <div className="card-base tr-form-card">
      <div className="tr-success tr-success-rich" style={{ display: 'block' }}>
        <div className="tr-success-icon"><i className="bi bi-check-lg"></i></div>
        <span className="tr-success-eyebrow">Booking Confirmed</span>
        <h2 className="section-title">You're All Set to Ride.</h2>
        <p>
          Your test ride has been booked successfully. A confirmation SMS and email
          are on their way — our team will call within 2 hours to lock your slot.
        </p>

        {/* Booking summary */}
        <div className="tr-summary">
          <div className="tr-summary-title">Booking Summary</div>
          <SummaryRow label="Booking ID" value={summary.bookingId} valueClass="accent" />
          <SummaryRow label="Customer"   value={summary.customer}   />
          <SummaryRow label="Model"      value={summary.model}      />
          <SummaryRow label="Date & Time" value={summary.rideDate}  />
          <SummaryRow label="Location"   value={summary.location}   />
          <div className="tr-summary-row">
            <span className="tr-summary-label">Status</span>
            <span className="tr-summary-val ok">
              <i className="bi bi-circle-fill"></i> Confirmed
            </span>
          </div>
        </div>

        {/* Next steps */}
        <div className="tr-steps">
          {NEXT_STEPS.map((s, i) => (
            <div key={s.title} className="tr-step">
              <span className="tr-step-num rajdhani-lbl-text-sm">Step {i + 1}</span>
              <i className={`bi ${s.icon}`}></i>
              <h3>{s.title}</h3>
              <p>{s.desc}</p>
            </div>
          ))}
        </div>

        {/* Action CTAs */}
        <div className="tr-success-actions">
          <Link to="/support/dealers" className="btn-csr primary">
            <i className="bi bi-map"></i> Find Dealer
          </Link>
          <Link to="/" className="btn-csr secondary">
            <i className="bi bi-house-fill"></i> Back to Home
          </Link>
        </div>

        {/* Share */}
        <div className="tr-share">
          <span className="tr-share-label rajdhani-lbl-text-sm">Share</span>
          <div className="tr-share-icons">
            <a href="#" onClick={share('whatsapp')} aria-label="Share on WhatsApp"><i className="bi bi-whatsapp"></i></a>
            <a href="#" onClick={share('facebook')} aria-label="Share on Facebook"><i className="bi bi-facebook"></i></a>
            <a href="#" onClick={share('twitter')}  aria-label="Share on Twitter"><i className="bi bi-twitter-x"></i></a>
          </div>
        </div>
      </div>
    </div>
  )
}

function SummaryRow({ label, value, valueClass = '' }) {
  return (
    <div aria-label="BookTestRideForm" className="tr-summary-row">
      <span className="tr-summary-label">{label}</span>
      <span className={`tr-summary-val ${valueClass}`.trim()}>{value}</span>
    </div>
  )
}
