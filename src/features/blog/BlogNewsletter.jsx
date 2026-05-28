import { useState } from 'react'
import { useToast } from '@/contexts/ToastContext'

// Blog newsletter signup — mirrors CSR_New_web `#blog-newsletter`.
// The `.newsletter-input-group.is-invalid` / `.is-valid` classes are styled in
// blog.css and turn the bordered input red/green respectively.
export default function BlogNewsletter() {
  const { show } = useToast()
  const [email, setEmail] = useState('')
  const [state, setState] = useState('idle') // idle | invalid | busy | done
  const [feedback, setFeedback] = useState('')

  function submit(ev) {
    ev.preventDefault()
    const value = email.trim()
    if (!/^\S+@\S+\.\S+$/.test(value)) {
      setState('invalid')
      setFeedback('Please enter a valid email address.')
      show('Please enter a valid email address.', 'error', 3000)
      return
    }
    setState('busy')
    setFeedback('')
    setTimeout(() => {
      setState('done')
      setFeedback("You're subscribed — watch your inbox.")
      setEmail('')
      show("Subscribed! We'll keep you posted.", 'success', 3000)
    }, 1200)
  }

  const groupCls =
    'newsletter-input-group' +
    (state === 'invalid' ? ' is-invalid' : '') +
    (state === 'done'    ? ' is-valid'   : '')

  return (
    <section id="blog-newsletter">
      <div className="container">
        <div className="newsletter-wrap">
          <div className="newsletter-content">
            <span className="section-label">Subscribe</span>
            <h2 className="newsletter-heading">
              Subscribe to the <span className="accent">Svitch Journal</span>
            </h2>
            <p className="newsletter-desc">
              Get the latest e-bike tips, news, and ride stories straight to your
              inbox. No spam — ever.
            </p>
          </div>

          <form className="newsletter-form" noValidate onSubmit={submit}>
            <div className={groupCls}>
              <label htmlFor="nlEmail" className="visually-hidden">Email Address</label>
              <input
                type="email"
                id="nlEmail"
                name="email"
                placeholder="Enter your email address"
                value={email}
                onChange={(e) => { setEmail(e.target.value); if (state !== 'idle') setState('idle') }}
              />
              <button
                type="submit"
                className="btn-csr primary"
                disabled={state === 'busy'}
                style={state === 'busy' ? { opacity: 0.7 } : undefined}
              >
                {state === 'busy' ? (
                  <span className="btn-spinner">
                    <i className="bi bi-arrow-repeat spin-icon"></i>
                  </span>
                ) : (
                  <span className="btn-text">
                    <i className="bi bi-send-fill"></i> Subscribe
                  </span>
                )}
              </button>
            </div>

            {feedback && (
              <div
                className="newsletter-feedback show"
                style={{ color: state === 'invalid' ? '#ef4444' : 'var(--accent)' }}
              >
                {feedback}
              </div>
            )}

            <small className="newsletter-note">No spam. Unsubscribe anytime.</small>
          </form>
        </div>
      </div>
    </section>
  )
}
