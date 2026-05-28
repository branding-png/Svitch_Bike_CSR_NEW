import { useState } from 'react'
import { useToast } from '@/contexts/ToastContext'

// Newsletter signup — mirrors CSR_New_web `#newsletter`. Validates email,
// shows a spinner during submit, then displays success/error feedback.
//
// Usage:
//   <Newsletter />
//   <Newsletter
//     label="Stay Updated"
//     titleStart="Get the Latest on"
//     titleAccent="CSR 762"
//     desc="Subscribe for launch updates..."
//     onSubmit={(email) => Promise.resolve()}    // optional async hook
//   />
export default function Newsletter({
  id = 'newsletter',
  label = 'Stay Updated',
  titleStart = 'Get the Latest on',
  titleAccent = 'CSR 762',
  desc = 'Subscribe for launch updates, exclusive offers, and EV insights — delivered straight to your inbox.',
  note = 'No spam. Unsubscribe anytime.',
  buttonLabel = 'Subscribe',
  placeholder = 'Enter your email address',
  onSubmit,
}) {
  const { show } = useToast()
  const [email, setEmail] = useState('')
  const [busy, setBusy] = useState(false)
  const [feedback, setFeedback] = useState({ type: '', message: '' })

  function fail(message) {
    setFeedback({ type: 'error', message })
    show(message, 'error')
  }
  function succeed(message) {
    setFeedback({ type: 'success', message })
    show(message, 'success')
  }

  async function submit(e) {
    e.preventDefault()
    if (!email.trim()) return fail('Please enter your email address.')
    if (!/^\S+@\S+\.\S+$/.test(email)) return fail('Please enter a valid email address.')

    setBusy(true)
    setFeedback({ type: '', message: '' })
    try {
      if (onSubmit) await onSubmit(email)
      else await new Promise((r) => setTimeout(r, 900)) // demo delay
      succeed("You're in. Look for our welcome email soon.")
      setEmail('')
    } catch (err) {
      fail(err?.message || 'Something went wrong. Please try again.')
    } finally {
      setBusy(false)
    }
  }

  return (
    <section id={id}>
      <div className="container">
        <div className="newsletter-wrap reveal">
          <div className="newsletter-content">
            <span className="section-label">{label}</span>
            <h2 className="newsletter-heading">
              {titleStart} <span className="accent">{titleAccent}</span>
            </h2>
            <p className="newsletter-desc">{desc}</p>
          </div>

          <form className="newsletter-form" onSubmit={submit} noValidate>
            <div className="newsletter-input-group">
              <label htmlFor="nlEmail" className="visually-hidden">
                Email Address
              </label>
              <input
                id="nlEmail"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder={placeholder}
                disabled={busy}
                aria-required="true"
              />
              <button type="submit" className="btn-csr primary" disabled={busy}>
                {busy ? (
                  <span className="btn-spinner">
                    <i className="bi bi-arrow-repeat spin-icon"></i>
                  </span>
                ) : (
                  <span className="btn-text">
                    <i className="bi bi-send-fill"></i> {buttonLabel}
                  </span>
                )}
              </button>
            </div>

            {feedback.message && (
              <div
                className={`newsletter-feedback show ${feedback.type}`}
                role={feedback.type === 'error' ? 'alert' : 'status'}
              >
                <i className={`bi ${feedback.type === 'success' ? 'bi-check-circle-fill' : 'bi-exclamation-circle-fill'}`}></i>{' '}
                {feedback.message}
              </div>
            )}

            <small className="newsletter-note">{note}</small>
          </form>
        </div>
      </div>
    </section>
  )
}
