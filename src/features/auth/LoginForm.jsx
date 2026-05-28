import { useRef, useState } from 'react'
import { Link, useNavigate, useLocation } from 'react-router-dom'
import InputControl from '@/ui/InputControl'
import PasswordField from '@/ui/PasswordField'
import { PATHS } from '@/utils/routes'
import { useToast } from '@/contexts/ToastContext'
import { useAuthRedirect } from '@/hooks/useAuthRedirect'
import { signIn } from '@/services/auth'

// Login form panel — mirrors CSR_New_web `.auth-form` for `auth/login.html`.
// Live red/green validation through InputControl; social login is a stub;
// password visibility toggle; demo-creds hint at the bottom.
const DEMO = { email: 'arjun@svitch.bike', password: 'svitch2026' }

function validate(f) {
  const e = {}
  if (!/^\S+@\S+\.\S+$/.test(f.email))     e.email    = 'Please enter a valid email address.'
  if (!f.password || f.password.length < 6) e.password = 'Password must be at least 6 characters.'
  return e
}

const REMEMBER_KEY = 'svitchRememberEmail'

export default function LoginForm() {
  useAuthRedirect()
  const navigate    = useNavigate()
  const location    = useLocation()
  const { show }    = useToast()
  const formRef     = useRef(null)
  const [form, setForm]     = useState(() => {
    // Prefill from the saved "Remember me" email if present.
    let savedEmail = ''
    try { savedEmail = localStorage.getItem(REMEMBER_KEY) || '' } catch {}
    return savedEmail
      ? { email: savedEmail, password: '', remember: true }
      : { ...DEMO, remember: true }
  })
  const [errors, setErrors] = useState({})
  const [busy, setBusy]     = useState(false)

  const set = (key) => (v) => {
    setForm((f) => {
      const next  = { ...f, [key]: v }
      const fresh = validate(next)
      setErrors((errs) => ({ ...errs, [key]: fresh[key] }))
      return next
    })
  }

  async function submit(ev) {
    ev.preventDefault()
    const errs = validate(form)
    setErrors(errs)
    if (Object.keys(errs).length) {
      show('Please check the form — some fields need your attention.', 'error', 4000)
      requestAnimationFrame(() => {
        formRef.current?.querySelector(
          '.form-group.is-invalid input, .form-group.is-invalid select',
        )?.focus()
      })
      return
    }
    setBusy(true)
    const res = await signIn({ email: form.email, password: form.password })
    setBusy(false)
    if (!res.ok) {
      setErrors({ ...errors, ...(res.fieldErrors || {}) })
      show(res.error || 'Sign in failed.', 'error', 4000)
      return
    }
    // Stash profile + 2FA token for the next screen to consume.
    const intendedNext = location.state?.from || ''
    try {
      sessionStorage.setItem('svitchPendingLogin', JSON.stringify(res.data.profile))
      sessionStorage.setItem('svitchTwoFactorToken', res.data.twoFactorToken || '')
      if (intendedNext) sessionStorage.setItem('svitchPostLoginNext', intendedNext)
    } catch {}
    // Persist email for next visit when "Remember me" is ticked.
    try {
      if (form.remember) localStorage.setItem(REMEMBER_KEY, form.email)
      else                localStorage.removeItem(REMEMBER_KEY)
    } catch {}
    show('Code sent — enter it to finish signing in.', 'info', 3500)
    navigate(PATHS.twoFactor)
  }

  return (
    <div className="auth-form">
      <img
        src="/images/logos/Svitch-LOGO-white.png"
        alt="Svitch"
        className="auth-logo"
        loading="lazy"
        decoding="async"
      />
      <h2>Sign In</h2>
      <p className="auth-subtitle">
        Don&apos;t have an account?{' '}
        <Link to={PATHS.register}>Create one</Link>
      </p>

      <div className="social-login">
        <button
          type="button"
          className="btn-social"
          onClick={() => show('Google sign-in coming soon.', 'info')}
        >
          <i className="bi bi-google"></i> Continue with Google
        </button>
      </div>
      <div className="auth-divider rajdhani-lbl-text-sm">
        <span>Or sign in with email</span>
      </div>

      <form
        ref={formRef}
        id="loginForm"
        className="auth-form-fields"
        noValidate
        onSubmit={submit}
      >
        <InputControl
          label="Email Address" type="email"
          placeholder="rider@svitch.bike"
          value={form.email} onChange={set('email')}
          required error={errors.email}
          autoComplete="email"
        />

        <PasswordField
          label="Password"
          placeholder="Enter your password"
          value={form.password} onChange={set('password')}
          required error={errors.password}
          minLength={6}
          autoComplete="current-password"
        />

        <div className="form-row-inline">
          <label className="form-check rajdhani-lbl-text-sm">
            <input
              type="checkbox"
              checked={form.remember}
              onChange={(e) => set('remember')(e.target.checked)}
            />{' '}
            Remember me
          </label>
          <Link to={PATHS.forgotPassword} className="form-link">
            Forgot password?
          </Link>
        </div>

        <button
          type="submit"
          className="btn-csr primary"
          disabled={busy || Object.keys(validate(form)).length > 0}
        >
          {busy ? (
            <span className="btn-spinner">
              <i className="bi bi-arrow-repeat spin-icon"></i> Signing in...
            </span>
          ) : (
            <span className="btn-text">
              <i className="bi bi-box-arrow-in-right"></i> Sign In
            </span>
          )}
        </button>
      </form>

      <div className="demo-creds">
        <strong>Demo:</strong> {DEMO.email} &nbsp;/&nbsp; {DEMO.password}
      </div>

      <p className="auth-footer-link rajdhani-lbl-text-sm">
        New to Svitch? <Link to={PATHS.register}>Create an account</Link>
      </p>
    </div>
  )
}
