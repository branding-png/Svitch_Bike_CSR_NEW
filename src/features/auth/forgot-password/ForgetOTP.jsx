import { useEffect, useState } from 'react'
import { OtpInput } from '@/ui'
import { maskEmail } from '@/utils/mask'
import { verifyPasswordOtp } from '@/services/auth'
import { useToast } from '@/contexts/ToastContext'

function fmt(s) {
  const m = String(Math.floor(s / 60)).padStart(2, '0')
  const r = String(s % 60).padStart(2, '0')
  return `${m}:${r}`
}

const EMPTY = ['', '', '', '', '', '']

export default function ForgetOTP({ email, otpToken, onChangeEmail, onVerified }) {
  const { show } = useToast()
  const [digits, setDigits] = useState(EMPTY)
  const [error, setError]   = useState('')
  const [busy, setBusy]     = useState(false)
  const [secs, setSecs]     = useState(59)

  useEffect(() => {
    if (secs <= 0) return
    const t = setTimeout(() => setSecs((s) => s - 1), 1000)
    return () => clearTimeout(t)
  }, [secs])

  function onDigits(next) {
    setDigits(next)
    if (error) setError('')
  }

  async function verify() {
    const code = digits.join('')
    if (code.length !== 6) {
      setError('Please enter all 6 digits.')
      return
    }
    setBusy(true)
    const res = await verifyPasswordOtp({ otpToken, code })
    setBusy(false)
    if (!res.ok) {
      setError(res.error || 'Verification failed.')
      show(res.error || 'Verification failed.', 'error', 3500)
      return
    }
    onVerified(res.data.resetToken)
  }

  function resendOtp(e) {
    e.preventDefault()
    setSecs(59)
    setDigits(EMPTY)
  }

  function changeEmail(e) {
    e.preventDefault()
    const anyTyped = digits.some(Boolean)
    if (anyTyped && !window.confirm('Discard the code you entered?')) return
    onChangeEmail()
  }

  return (
    <div aria-label="ForgetOTP" role="region" className="auth-centered" id="fpStep2">
      <div className="auth-icon"><i className="bi bi-shield-lock-fill"></i></div>
      <h2>Enter OTP</h2>
      <p>We sent a 6-digit code to <strong style={{ color: 'var(--white)' }}>{maskEmail(email)}</strong></p>

      <OtpInput
        value={digits}
        onChange={onDigits}
        className="otp-inputs"
        ariaLabel="Enter the 6-digit code"
      />

      {error && (
        <div
          className="field-error"
          style={{ display: 'block', textAlign: 'center', color: '#ef4444', fontFamily: 'var(--font-label)', fontWeight: 'var(--fw-semibold)', marginBottom: 12 }}
        >
          {error}
        </div>
      )}

      <p className="otp-countdown rajdhani-lbl-text-sm">
        Code expires in <strong>{fmt(secs)}</strong>
      </p>

      <button
        type="button"
        className="btn-csr primary full-w"
       
        onClick={verify}
        disabled={busy}
      >
        {busy ? (
          <span className="btn-spinner"><i className="bi bi-arrow-repeat spin-icon"></i> Verifying…</span>
        ) : (
          <span className="btn-text"><i className="bi bi-check2-circle"></i> Verify OTP</span>
        )}
      </button>

      <p className="auth-footer-link rajdhani-lbl-text-sm" style={{ marginTop: 16 }}>
        {secs > 0 ? (
          <span style={{ color: 'var(--gray-500)' }}>
            Resend in <strong style={{ color: 'var(--white)' }}>{fmt(secs)}</strong>
          </span>
        ) : (
          <a href="#" onClick={resendOtp}>Resend OTP</a>
        )}
        &nbsp;&middot;&nbsp;
        <a href="#" onClick={changeEmail}>Change email</a>
      </p>
    </div>
  )
}
