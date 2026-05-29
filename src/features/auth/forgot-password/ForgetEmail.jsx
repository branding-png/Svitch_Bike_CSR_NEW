import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import InputControl from '@/ui/InputControl'
import { PATHS } from '@/utils/routes'
import { requestPasswordOtp } from '@/services/auth'
import { useToast } from '@/contexts/ToastContext'

export default function ForgetEmail({ email, setEmail, onSubmit }) {
  const { show } = useToast()
  const [error, setError] = useState('')
  const [busy, setBusy]   = useState(false)
  const formRef = useRef(null)

  useEffect(() => {
    formRef.current?.querySelector('input[type="email"]')?.focus()
  }, [])

  function set(v) {
    setEmail(v)
    setError(v && !/^\S+@\S+\.\S+$/.test(v) ? 'Please enter a valid email address.' : '')
  }

  async function submit(ev) {
    ev.preventDefault()
    if (!/^\S+@\S+\.\S+$/.test(email)) {
      setError('Please enter a valid email address.')
      return
    }
    setBusy(true)
    const res = await requestPasswordOtp(email)
    setBusy(false)
    if (!res.ok) {
      setError(res.error || 'Could not send a code.')
      show(res.error || 'Could not send a code.', 'error', 3500)
      return
    }
    onSubmit(res.data.otpToken)
  }

  return (
    <div aria-label="ForgetEmail" className="auth-centered" id="fpStep1">
      <div className="auth-icon"><i className="bi bi-key-fill"></i></div>
      <h2>Forgot Password?</h2>
      <p>No worries. Enter your email and we&apos;ll send a 6-digit one-time password to reset it.</p>

      <form ref={formRef} className="auth-form-fields" style={{ textAlign: 'left' }} noValidate onSubmit={submit}>
        <InputControl
          label="Email Address" type="email"
          placeholder="rider@svitch.bike"
          value={email} onChange={set}
          required error={error}
          autoComplete="email"
        />
        <button
          type="submit"
          className="btn-csr primary full-w"
         
          disabled={busy || !/^\S+@\S+\.\S+$/.test(email)}
        >
          {busy ? (
            <span className="btn-spinner"><i className="bi bi-arrow-repeat spin-icon"></i> Sendingâ€¦</span>
          ) : (
            <span className="btn-text"><i className="bi bi-envelope"></i> Send OTP</span>
          )}
        </button>
      </form>

      <p className="auth-footer-link rajdhani-lbl-text-sm">
        <Link to={PATHS.login}><i className="bi bi-arrow-left"></i> Back to Sign In</Link>
      </p>
    </div>
  )
}
