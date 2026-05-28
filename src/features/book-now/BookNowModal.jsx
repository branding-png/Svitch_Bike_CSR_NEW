import { useEffect, useRef, useState } from 'react'
import { createPortal } from 'react-dom'
import InputControl from '@/ui/InputControl'
import { useBookNow } from '@/contexts/BookNowContext'
import { useToast } from '@/contexts/ToastContext'

// Global "Book Now" modal — same fields and validation as the reference site's
// `#bookNowModal`. Mounted once at the root via portal so any button calling
// `useBookNow().open()` can surface it. All chrome styling (backdrop, modal
// panel, close button, animations) lives in components.css under the shared
// `.csr-modal-*` selectors so every modal in the app looks identical.
const CITIES = [
  'Mumbai', 'Delhi NCR', 'Bengaluru', 'Pune', 'Ahmedabad',
  'Chennai', 'Hyderabad', 'Kolkata', 'Jaipur', 'Other',
]

const EMPTY = { name: '', email: '', mobile: '', city: '', date: '' }

const today = () => new Date().toISOString().slice(0, 10)

export default function BookNowModal() {
  const { isOpen, close } = useBookNow()
  const { show } = useToast()
  const formRef = useRef(null)
  const [form, setForm]     = useState(EMPTY)
  const [errors, setErrors] = useState({})
  const [busy, setBusy]     = useState(false)

  // Esc key closes the modal + lock background scroll while open
  useEffect(() => {
    if (!isOpen) return
    function onKey(e) { if (e.key === 'Escape') close() }
    document.addEventListener('keydown', onKey)
    const prev = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => {
      document.removeEventListener('keydown', onKey)
      document.body.style.overflow = prev
    }
  }, [isOpen, close])

  // Reset form whenever the modal opens
  useEffect(() => {
    if (isOpen) {
      setForm(EMPTY)
      setErrors({})
      setBusy(false)
    }
  }, [isOpen])

  if (!isOpen) return null

  // Live per-field validation — drives the green `.is-valid` + red `.is-invalid`
  // states on InputControl as the user types.
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
    if (f.name.trim().length < 3)            e.name   = 'Please enter your full name (min 3 characters).'
    if (!/^\S+@\S+\.\S+$/.test(f.email))     e.email  = 'Please enter a valid email address.'
    if (!/^[6-9][0-9]{9}$/.test(f.mobile))   e.mobile = 'Please enter a valid 10-digit mobile number.'
    if (!f.city)                              e.city   = 'Please select a city.'
    if (!f.date)                              e.date   = 'Please select a date.'
    else if (f.date < today())                e.date   = 'Date must be today or later.'
    return e
  }

  function submit(ev) {
    ev.preventDefault()
    const errs = validate(form)
    setErrors(errs)
    if (Object.keys(errs).length) {
      show('Please check the form — some fields need your attention.', 'error', 5000)
      requestAnimationFrame(() => {
        formRef.current?.querySelector('.form-group.is-invalid input, .form-group.is-invalid select')?.focus()
      })
      return
    }
    setBusy(true)
    setTimeout(() => {
      const firstName = form.name.trim().split(' ')[0]
      setBusy(false)
      close()
      show(`Thanks ${firstName}! Our team will call within 2 hours to confirm your test ride.`, 'success', 5000)
    }, 1200)
  }

  return createPortal(
    <div
      className="csr-modal-backdrop"
      onClick={(e) => { if (e.target === e.currentTarget) close() }}
      role="dialog"
      aria-modal="true"
      aria-labelledby="bookNowModalLabel"
      aria-label="BookNowModal"
    >
      <div className="csr-modal">
        <div className="csr-modal-header">
          <div>
            <h5 id="bookNowModalLabel" className="modal-title">Book Your Bike</h5>
            <p className="csr-modal-subtitle">Experience the CSR 762 at your nearest dealership</p>
          </div>
          <button
            type="button"
            className="csr-modal-close"
            aria-label="Close"
            onClick={close}
          >
            <i className="bi bi-x-lg"></i>
          </button>
        </div>

        <div className="csr-modal-body">
          <form ref={formRef} noValidate onSubmit={submit}>
            <InputControl
              label="Full Name"
              placeholder="Enter your full name"
              value={form.name} onChange={set('name')} required error={errors.name}
            />
            <InputControl
              label="Email Address" type="email"
              placeholder="Enter your email address"
              value={form.email} onChange={set('email')} required error={errors.email}
            />
            <InputControl
              label="Mobile Number" type="tel" maxLength={10}
              placeholder="Enter 10-digit mobile number"
              value={form.mobile} onChange={set('mobile')} required error={errors.mobile}
            />

            <div className="form-row">
              <InputControl as="select" label="City" placeholder="Select your city"
                options={CITIES}
                value={form.city} onChange={set('city')} required error={errors.city} />
              <InputControl label="Preferred Date" type="date" min={today()}
                value={form.date} onChange={set('date')} required error={errors.date} />
            </div>

            <button
              type="submit"
              className="btn-csr primary full-w"
              disabled={busy}
            >
              {busy ? (
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
    </div>,
    document.body,
  )
}
