// One-shot generator for Step 9 Batch 3 (6 auth pages).
import { writeFileSync, mkdirSync } from 'node:fs'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'

const ROOT = dirname(dirname(fileURLToPath(import.meta.url)))
const w = (rel, body) => {
  const file = join(ROOT, 'src', 'routes', rel)
  mkdirSync(dirname(file), { recursive: true })
  writeFileSync(file, body, 'utf8')
}

/* Shared auth-card shell used by every form */
mkdirSync(join(ROOT, 'src', 'features', 'auth'), { recursive: true })
writeFileSync(join(ROOT, 'src', 'features', 'auth', 'AuthCard.jsx'),
`import { Card } from '@/ui'

// Centered card used by every /auth/* page. Title + optional kicker + body.
export default function AuthCard({ label, title, subtitle, children, footer }) {
  return (
    <section className="section-pad" style={{ display: 'grid', placeItems: 'center' }}>
      <div style={{ width: '100%', maxWidth: 460 }}>
        <Card style={{ padding: 32 }}>
          {label && <span className="section-label">{label}</span>}
          <h1 className="section-title" style={{ fontSize: 'var(--fs-h2)', marginTop: 6 }}>{title}</h1>
          {subtitle && <p className="section-desc" style={{ marginTop: 8, marginBottom: 20 }}>{subtitle}</p>}
          {children}
        </Card>
        {footer && <div style={{ textAlign: 'center', marginTop: 16 }}>{footer}</div>}
      </div>
    </section>
  )
}
`, 'utf8')

/* Login */
w('auth/Login.jsx', `import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Button, FormGroup } from '@/ui'
import { PATHS } from '@/utils/routes'
import { useUser } from '@/contexts/UserContext'
import { useToast } from '@/contexts/ToastContext'
import AuthCard from '@/features/auth/AuthCard'

export default function Login() {
  const navigate = useNavigate()
  const { login } = useUser()
  const { show } = useToast()
  const [form, setForm] = useState({ email: '', password: '', remember: true })
  const [errors, setErrors] = useState({})

  function submit(e) {
    e.preventDefault()
    const errs = {}
    if (!/^\\S+@\\S+\\.\\S+$/.test(form.email)) errs.email = 'Enter a valid email'
    if (!form.password) errs.password = 'Required'
    setErrors(errs)
    if (Object.keys(errs).length) return
    // Demo auth — accept anything, name from email local-part
    login({ email: form.email, name: form.email.split('@')[0] })
    show('Welcome back!', 'success')
    navigate(PATHS.dashboard)
  }

  return (
    <AuthCard
      label="Sign In"
      title="Welcome back"
      subtitle="Sign in to track orders, manage your bike, and more."
      footer={<span className="rajdhani-lbl-text-sm">New here? <Link to={PATHS.register} style={{ color: 'var(--white)' }}>Create an account</Link></span>}
    >
      <form onSubmit={submit} noValidate>
        <FormGroup label="Email" htmlFor="email" required error={errors.email}>
          <input id="email" type="email" autoComplete="email" value={form.email} onChange={(e) => setForm(f => ({ ...f, email: e.target.value }))} />
        </FormGroup>
        <FormGroup label="Password" htmlFor="password" required error={errors.password}>
          <input id="password" type="password" autoComplete="current-password" value={form.password} onChange={(e) => setForm(f => ({ ...f, password: e.target.value }))} />
        </FormGroup>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
          <label className="rajdhani-lbl-text-sm" style={{ display: 'inline-flex', alignItems: 'center', gap: 8 }}>
            <input type="checkbox" checked={form.remember} onChange={(e) => setForm(f => ({ ...f, remember: e.target.checked }))} />
            Remember me
          </label>
          <Link to={PATHS.forgotPassword} className="rajdhani-lbl-text-sm" style={{ color: 'var(--white)' }}>Forgot password?</Link>
        </div>
        <Button variant="primary" type="submit" icon="box-arrow-in-right" className="w-100">Sign In</Button>
      </form>
    </AuthCard>
  )
}
`)

/* Register */
w('auth/Register.jsx', `import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Button, FormGroup } from '@/ui'
import { PATHS } from '@/utils/routes'
import { useUser } from '@/contexts/UserContext'
import { useToast } from '@/contexts/ToastContext'
import AuthCard from '@/features/auth/AuthCard'

export default function Register() {
  const navigate = useNavigate()
  const { login } = useUser()
  const { show } = useToast()
  const [form, setForm] = useState({ name: '', email: '', phone: '', password: '', confirm: '', agree: false })
  const [errors, setErrors] = useState({})

  function submit(e) {
    e.preventDefault()
    const errs = {}
    if (!form.name.trim()) errs.name = 'Required'
    if (!/^\\S+@\\S+\\.\\S+$/.test(form.email)) errs.email = 'Enter a valid email'
    if (!/^\\d{10}$/.test(form.phone)) errs.phone = '10-digit mobile'
    if (form.password.length < 8) errs.password = 'At least 8 characters'
    if (form.confirm !== form.password) errs.confirm = 'Passwords do not match'
    if (!form.agree) errs.agree = 'You must accept the terms'
    setErrors(errs)
    if (Object.keys(errs).length) return
    login({ email: form.email, name: form.name, phone: form.phone })
    show('Account created — please verify your email', 'success')
    navigate(PATHS.verifyEmail)
  }

  return (
    <AuthCard
      label="Get Started"
      title="Create your account"
      subtitle="It only takes 30 seconds."
      footer={<span className="rajdhani-lbl-text-sm">Already a member? <Link to={PATHS.login} style={{ color: 'var(--white)' }}>Sign in</Link></span>}
    >
      <form onSubmit={submit} noValidate>
        <FormGroup label="Full Name" htmlFor="name" required error={errors.name}>
          <input id="name" value={form.name} onChange={(e) => setForm(f => ({ ...f, name: e.target.value }))} />
        </FormGroup>
        <FormGroup label="Email" htmlFor="email" required error={errors.email}>
          <input id="email" type="email" autoComplete="email" value={form.email} onChange={(e) => setForm(f => ({ ...f, email: e.target.value }))} />
        </FormGroup>
        <FormGroup label="Phone" htmlFor="phone" required error={errors.phone}>
          <input id="phone" type="tel" maxLength={10} value={form.phone} onChange={(e) => setForm(f => ({ ...f, phone: e.target.value }))} />
        </FormGroup>
        <FormGroup label="Password" htmlFor="password" required error={errors.password} hint="At least 8 characters">
          <input id="password" type="password" autoComplete="new-password" value={form.password} onChange={(e) => setForm(f => ({ ...f, password: e.target.value }))} />
        </FormGroup>
        <FormGroup label="Confirm Password" htmlFor="confirm" required error={errors.confirm}>
          <input id="confirm" type="password" autoComplete="new-password" value={form.confirm} onChange={(e) => setForm(f => ({ ...f, confirm: e.target.value }))} />
        </FormGroup>
        <label className="rajdhani-lbl-text-sm" style={{ display: 'flex', gap: 8, alignItems: 'flex-start', marginBottom: 8 }}>
          <input type="checkbox" checked={form.agree} onChange={(e) => setForm(f => ({ ...f, agree: e.target.checked }))} style={{ marginTop: 3 }} />
          <span>I agree to the <Link to={PATHS.termCondition} style={{ color: 'var(--white)' }}>Terms</Link> and <Link to={PATHS.privacyPolicy} style={{ color: 'var(--white)' }}>Privacy Policy</Link>.</span>
        </label>
        {errors.agree && <div className="invalid-feedback" style={{ display: 'block', marginBottom: 10 }}>{errors.agree}</div>}
        <Button variant="primary" type="submit" icon="person-plus-fill" className="w-100">Create Account</Button>
      </form>
    </AuthCard>
  )
}
`)

/* ForgotPassword */
w('auth/ForgotPassword.jsx', `import { useState } from 'react'
import { Link } from 'react-router-dom'
import { Button, FormGroup } from '@/ui'
import { PATHS } from '@/utils/routes'
import AuthCard from '@/features/auth/AuthCard'

export default function ForgotPassword() {
  const [email, setEmail] = useState('')
  const [sent, setSent] = useState(false)
  const [error, setError] = useState('')

  function submit(e) {
    e.preventDefault()
    if (!/^\\S+@\\S+\\.\\S+$/.test(email)) { setError('Enter a valid email'); return }
    setError('')
    setSent(true)
  }

  if (sent) {
    return (
      <AuthCard
        label="Check Your Inbox"
        title="Reset link sent"
        subtitle={\`We've sent password-reset instructions to \${email}. The link expires in 30 minutes.\`}
        footer={<Link to={PATHS.login} className="rajdhani-lbl-text-sm" style={{ color: 'var(--white)' }}>Back to sign in</Link>}
      >
        <Button to={PATHS.resetPassword} variant="primary" icon="key" className="w-100">Open Reset Link</Button>
      </AuthCard>
    )
  }

  return (
    <AuthCard
      label="Reset Password"
      title="Forgot your password?"
      subtitle="Enter your email and we'll send a reset link."
      footer={<span className="rajdhani-lbl-text-sm">Remembered it? <Link to={PATHS.login} style={{ color: 'var(--white)' }}>Sign in</Link></span>}
    >
      <form onSubmit={submit} noValidate>
        <FormGroup label="Email" htmlFor="email" required error={error}>
          <input id="email" type="email" autoComplete="email" value={email} onChange={(e) => setEmail(e.target.value)} />
        </FormGroup>
        <Button variant="primary" type="submit" icon="send" className="w-100">Send Reset Link</Button>
      </form>
    </AuthCard>
  )
}
`)

/* ResetPassword */
w('auth/ResetPassword.jsx', `import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Button, FormGroup } from '@/ui'
import { PATHS } from '@/utils/routes'
import { useToast } from '@/contexts/ToastContext'
import AuthCard from '@/features/auth/AuthCard'

export default function ResetPassword() {
  const navigate = useNavigate()
  const { show } = useToast()
  const [form, setForm] = useState({ password: '', confirm: '' })
  const [errors, setErrors] = useState({})

  function submit(e) {
    e.preventDefault()
    const errs = {}
    if (form.password.length < 8) errs.password = 'At least 8 characters'
    if (form.confirm !== form.password) errs.confirm = 'Passwords do not match'
    setErrors(errs)
    if (Object.keys(errs).length) return
    show('Password reset — please sign in', 'success')
    navigate(PATHS.login)
  }

  return (
    <AuthCard label="New Password" title="Pick a new password" subtitle="Use at least 8 characters.">
      <form onSubmit={submit} noValidate>
        <FormGroup label="New Password" htmlFor="password" required error={errors.password}>
          <input id="password" type="password" autoComplete="new-password" value={form.password} onChange={(e) => setForm(f => ({ ...f, password: e.target.value }))} />
        </FormGroup>
        <FormGroup label="Confirm Password" htmlFor="confirm" required error={errors.confirm}>
          <input id="confirm" type="password" autoComplete="new-password" value={form.confirm} onChange={(e) => setForm(f => ({ ...f, confirm: e.target.value }))} />
        </FormGroup>
        <Button variant="primary" type="submit" icon="shield-lock-fill" className="w-100">Reset Password</Button>
      </form>
    </AuthCard>
  )
}
`)

/* TwoFactor */
w('auth/TwoFactor.jsx', `import { useEffect, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Button } from '@/ui'
import { PATHS } from '@/utils/routes'
import { useToast } from '@/contexts/ToastContext'
import AuthCard from '@/features/auth/AuthCard'

const LEN = 6

export default function TwoFactor() {
  const navigate = useNavigate()
  const { show } = useToast()
  const [code, setCode] = useState(Array(LEN).fill(''))
  const [error, setError] = useState('')
  const [secondsLeft, setSecondsLeft] = useState(60)
  const refs = useRef([])

  useEffect(() => {
    if (secondsLeft <= 0) return
    const id = setTimeout(() => setSecondsLeft((s) => s - 1), 1000)
    return () => clearTimeout(id)
  }, [secondsLeft])

  function setDigit(i, v) {
    const digit = v.replace(/\\D/g, '').slice(0, 1)
    setCode((c) => { const next = c.slice(); next[i] = digit; return next })
    if (digit && i < LEN - 1) refs.current[i + 1]?.focus()
    if (error) setError('')
  }
  function handleKey(i, e) {
    if (e.key === 'Backspace' && !code[i] && i > 0) refs.current[i - 1]?.focus()
  }
  function submit(e) {
    e.preventDefault()
    const full = code.join('')
    if (full.length !== LEN) { setError('Enter all 6 digits'); return }
    // Demo: any 6 digits accepted
    show('Verified — you are signed in', 'success')
    navigate(PATHS.dashboard)
  }
  function resend() {
    setSecondsLeft(60)
    show('New code sent to your phone', 'info')
  }

  return (
    <AuthCard label="Two-Factor Auth" title="Enter the 6-digit code" subtitle="We sent it to the phone number on your account.">
      <form onSubmit={submit}>
        <div style={{ display: 'flex', gap: 8, justifyContent: 'space-between', marginBottom: 12 }}>
          {code.map((d, i) => (
            <input
              key={i}
              ref={(el) => (refs.current[i] = el)}
              value={d}
              onChange={(e) => setDigit(i, e.target.value)}
              onKeyDown={(e) => handleKey(i, e)}
              inputMode="numeric"
              maxLength={1}
              style={{ width: 48, height: 56, textAlign: 'center', fontSize: 22, background: 'var(--gray-950)', border: '1px solid var(--border)', color: 'var(--white)' }}
            />
          ))}
        </div>
        {error && <div className="invalid-feedback" style={{ display: 'block', marginBottom: 10 }}>{error}</div>}
        <Button variant="primary" type="submit" icon="shield-check" className="w-100">Verify</Button>
        <div className="rajdhani-lbl-text-sm" style={{ textAlign: 'center', marginTop: 14, color: 'var(--gray-400)' }}>
          {secondsLeft > 0
            ? \`Resend code in \${secondsLeft}s\`
            : <button type="button" onClick={resend} style={{ background: 'none', border: 'none', color: 'var(--white)', cursor: 'pointer', textDecoration: 'underline' }}>Resend code</button>}
        </div>
      </form>
    </AuthCard>
  )
}
`)

/* VerifyEmail */
w('auth/VerifyEmail.jsx', `import { useState } from 'react'
import { Link } from 'react-router-dom'
import { Button } from '@/ui'
import { PATHS } from '@/utils/routes'
import { useUser } from '@/contexts/UserContext'
import { useToast } from '@/contexts/ToastContext'
import AuthCard from '@/features/auth/AuthCard'

export default function VerifyEmail() {
  const { user } = useUser()
  const { show } = useToast()
  const [resent, setResent] = useState(false)

  function resend() {
    setResent(true)
    show('Verification email resent', 'success')
  }

  return (
    <AuthCard
      label="One Last Step"
      title="Verify your email"
      subtitle={user?.email
        ? \`We've sent a verification link to \${user.email}. Click the link to activate your account.\`
        : "We've sent a verification link to your email. Click the link to activate your account."}
      footer={<Link to={PATHS.login} className="rajdhani-lbl-text-sm" style={{ color: 'var(--white)' }}>Back to sign in</Link>}
    >
      <p className="rajdhani-lbl-text-sm" style={{ color: 'var(--gray-400)', marginBottom: 18 }}>
        Didn't get the email? Check your spam folder, or resend below.
      </p>
      <Button variant="primary" icon="envelope-arrow-up-fill" onClick={resend} disabled={resent} className="w-100">
        {resent ? 'Resent — check your inbox' : 'Resend Verification Email'}
      </Button>
      <Button to={PATHS.dashboard} variant="secondary" icon="house" className="w-100" style={{ marginTop: 10 }}>
        Continue to Dashboard
      </Button>
    </AuthCard>
  )
}
`)

console.log('Batch 3 generation complete — 6 auth pages + AuthCard written.')
