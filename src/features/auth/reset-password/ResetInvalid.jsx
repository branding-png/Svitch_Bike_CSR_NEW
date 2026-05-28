import { useState } from 'react'
import { Link } from 'react-router-dom'
import InputControl from '@/ui/InputControl'
import { PATHS } from '@/utils/routes'
import { useToast } from '@/contexts/ToastContext'
import { requestPasswordOtp } from '@/services/auth'

// Reset link expired — show a brief explainer plus an inline email field so
// the user can request a new link without leaving the page.
export default function ResetInvalid() {
  const { show } = useToast()
  const [email, setEmail] = useState('')
  const [error, setError] = useState('')
  const [sent, setSent]   = useState(false)

  async function send(ev) {
    ev.preventDefault()
    if (!/^\S+@\S+\.\S+$/.test(email)) {
      setError('Please enter a valid email address.')
      return
    }
    setError('')
    const res = await requestPasswordOtp(email)
    if (!res.ok) {
      setError(res.error || 'Could not send a new link.')
      return
    }
    setSent(true)
    show(`A new reset link will land in ${email} shortly.`, 'success', 4000)
  }

  return (
    <div aria-label="ResetInvalid" role="region" className="auth-centered" id="rpInvalidStep">
      <div className="auth-icon">
        <i className="bi bi-exclamation-triangle-fill" style={{ color: '#ef4444' }}></i>
      </div>
      <h2>Link Expired</h2>
      <p>
        This reset link has expired or has already been used. Enter your email below
        and we&apos;ll send a fresh one.
      </p>

      {!sent ? (
        <form className="auth-form-fields" style={{ textAlign: 'left' }} noValidate onSubmit={send}>
          <InputControl
            label="Email Address" type="email"
            placeholder="rider@svitch.bike"
            value={email} onChange={(v) => { setEmail(v); if (error) setError('') }}
            required error={error}
            autoComplete="email"
          />
          <button type="submit" className="btn-csr primary full-w">
            <i className="bi bi-arrow-repeat"></i> Send New Link
          </button>
        </form>
      ) : (
        <div
          className="rajdhani-lbl-text-sm"
          style={{
            padding: '12px 14px',
            background: 'rgba(34, 197, 94, 0.1)',
            border: '1px solid #22c55e',
            color: '#22c55e',
          }}
        >
          <i className="bi bi-check2-circle"></i> Check {email} — the link expires in 30 minutes.
        </div>
      )}

      <p className="auth-footer-link rajdhani-lbl-text-sm" style={{ marginTop: 16 }}>
        Prefer the full flow? <Link to={PATHS.forgotPassword}>Go to Forgot Password</Link>
        {' · '}
        <Link to={PATHS.login}>Back to Sign In</Link>
      </p>
    </div>
  )
}
