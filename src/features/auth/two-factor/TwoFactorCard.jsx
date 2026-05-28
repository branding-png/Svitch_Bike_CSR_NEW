import { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { OtpInput } from '@/ui'
import { PATHS } from '@/utils/routes'
import { useToast } from '@/contexts/ToastContext'
import { useUser } from '@/contexts/UserContext'
import { maskPhone } from '@/utils/mask'
import { verifyTwoFactor } from '@/services/auth'

function fmt(s) {
  const m = String(Math.floor(s / 60)).padStart(2, '0')
  const r = String(s % 60).padStart(2, '0')
  return `${m}:${r}`
}

function readPending() {
  try {
    const raw = sessionStorage.getItem('svitchPendingLogin')
    return raw ? JSON.parse(raw) : null
  } catch { return null }
}

const EMPTY = ['', '', '', '', '', '']

export default function TwoFactorCard({ phone }) {
  const pending = (typeof window !== 'undefined') ? readPending() : null
  const display = phone || maskPhone(pending?.mobile)
  const navigate = useNavigate()
  const { show } = useToast()
  const { login } = useUser()
  const [digits, setDigits] = useState(EMPTY)
  const [secs, setSecs]     = useState(150)
  const [busy, setBusy]     = useState(false)

  useEffect(() => {
    // No pending login? Bounce back to sign-in so the 2FA page can't be
    // reached out-of-order.
    if (!readPending()) navigate(PATHS.login, { replace: true })
  }, [navigate])

  useEffect(() => {
    if (secs <= 0) return
    const t = setTimeout(() => setSecs((s) => s - 1), 1000)
    return () => clearTimeout(t)
  }, [secs])

  async function submit(ev) {
    ev.preventDefault()
    const code = digits.join('')
    if (code.length !== 6) {
      show('Please enter all 6 digits.', 'error', 3500)
      return
    }
    setBusy(true)
    const twoFactorToken = (() => {
      try { return sessionStorage.getItem('svitchTwoFactorToken') || '' } catch { return '' }
    })()
    const res = await verifyTwoFactor({ twoFactorToken, code })
    setBusy(false)
    if (!res.ok) {
      show(res.error || 'Verification failed.', 'error', 4000)
      return
    }
    const p = res.data.profile || readPending()
    if (p) login(p)
    let next = PATHS.dashboard
    try {
      next = sessionStorage.getItem('svitchPostLoginNext') || PATHS.dashboard
      sessionStorage.removeItem('svitchPendingLogin')
      sessionStorage.removeItem('svitchTwoFactorToken')
      sessionStorage.removeItem('svitchPostLoginNext')
      if (res.data.authToken) localStorage.setItem('svitchAuthToken', res.data.authToken)
    } catch {}
    const first = p?.firstName || (p?.name || '').split(' ')[0] || 'Rider'
    show(`Welcome back, ${first}!`, 'success', 3000)
    navigate(next, { replace: true })
  }

  function resend() {
    if (secs > 0) return
    setSecs(150)
    setDigits(EMPTY)
    show('A new code has been sent.', 'info', 3000)
  }

  return (
    <section aria-label="TwoFactorCard" id="tfa-main">
      <div className="card-base tfa-card">
        <div className="tfa-icon"><i className="bi bi-shield-lock-fill"></i></div>
        <h2 style={{ marginBottom: 8 }}>Two-Factor Authentication</h2>
        <p>
          We sent a 6-digit code to <strong style={{ color: 'var(--white)' }}>{display}</strong>.
          Enter it below to continue.
        </p>

        <form id="tfaForm" onSubmit={submit}>
          <OtpInput
            value={digits}
            onChange={setDigits}
            className="otp-row"
            ariaLabel="Enter the 6-digit code"
          />

          <p className="tfa-timer">
            {secs > 0 ? (
              <>Resend code in <strong style={{ color: 'var(--white)' }}>{fmt(secs)}</strong></>
            ) : (
              <a href="#" onClick={(e) => { e.preventDefault(); resend() }}>Resend code now</a>
            )}
          </p>

          <button type="submit" className="btn-csr primary full-w" disabled={busy}>
            {busy ? (
              <span className="btn-spinner"><i className="bi bi-arrow-repeat spin-icon"></i> Verifying…</span>
            ) : (
              <><i className="bi bi-check2-circle"></i> Verify &amp; Continue</>
            )}
          </button>
        </form>

        <p style={{ marginTop: 20, fontSize: 'var(--fs-sm)' }}>
          <a
            className="accent"
            href="#"
            style={secs > 0 ? { pointerEvents: 'none', opacity: 0.5 } : undefined}
            onClick={(e) => { e.preventDefault(); resend() }}
          >
            Resend Code
          </a>
          {' · '}
          <Link className="accent" to={PATHS.login}>Use different account</Link>
        </p>
        <p style={{ marginTop: 14, fontSize: 'var(--fs-xs)', color: 'var(--gray-500)' }}>
          <i className="bi bi-info-circle"></i> Lost your phone?{' '}
          <Link className="accent" to={PATHS.ticket}>Contact support</Link>
        </p>
      </div>
    </section>
  )
}
