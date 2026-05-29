import { useState } from 'react'
import InputControl from '@/ui/InputControl'
import { useToast } from '@/contexts/ToastContext'

// Blog detail sidebar newsletter card — mirrors CSR_New_web `.widget` newsletter
// variant. Compact vertical form using the shared <InputControl> primitive so
// the same .form-group.is-invalid red-border treatment applies on bad input.
export default function NewsletterWidget({
  title       = 'Newsletter',
  description = 'Get the latest Svitch articles, launch news & riding tips — no spam, ever.',
}) {
  const { show } = useToast()
  const [email, setEmail] = useState('')
  const [error, setError] = useState('')
  const [busy, setBusy]   = useState(false)

  function submit(e) {
    e.preventDefault()
    const value = email.trim()

    if (!value) {
      setError('Please enter your email address.')
      show('Please enter your email address.', 'error', 3000)
      return
    }
    if (!/^\S+@\S+\.\S+$/.test(value)) {
      setError('Please enter a valid email address.')
      show('That email doesn’t look right — please double-check it.', 'error', 3000)
      return
    }

    setError('')
    setBusy(true)
    setTimeout(() => {
      setBusy(false)
      setEmail('')
      show("You're subscribed! Watch your inbox for the next dispatch.", 'success', 3500)
    }, 1000)
  }

  return (
    <div aria-label="NewsletterWidget" className="card-base widget">
      <h3 className="widget-title">{title}</h3>
      <p style={{ marginBottom: 14 }}>{description}</p>

      <form
        className="newsletter-form"
        style={{ flexDirection: 'column', minWidth: 0 }}
        onSubmit={submit}
        noValidate
      >
        <InputControl
          type="email"
          placeholder="Your email"
          value={email}
          onChange={(v) => { setEmail(v); if (error) setError('') }}
          error={error}
          aria-label="Email address"
        />

        <button
          type="submit"
          className="btn-csr primary sm"
          disabled={busy}
          style={busy ? { opacity: 0.7 } : undefined}
        >
          {busy ? (
            <><i className="bi bi-arrow-repeat spin-icon"></i> Subscribing...</>
          ) : (
            <><i className="bi bi-send-fill"></i> Subscribe</>
          )}
        </button>
      </form>
    </div>
  )
}
