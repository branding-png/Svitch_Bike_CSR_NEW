import { useState } from 'react'
import { Link } from 'react-router-dom'
import PasswordField, { PASSWORD_RULES } from '@/ui/PasswordField'
import { resetPassword } from '@/services/auth'
import { useToast } from '@/contexts/ToastContext'
import PasswordStrength from '@/features/auth/PasswordStrength'
import { PATHS } from '@/utils/routes'

function validate(pw, pw2) {
  const e = {}
  if (pw.length < 8) e.password = 'Password must be at least 8 characters.'
  if (!pw2 || pw2 !== pw) e.password2 = 'Passwords do not match.'
  return e
}

export default function ResetForm({ name = 'rider', resetToken, onReset }) {
  const { show } = useToast()
  const [pw, setPw]   = useState('')
  const [pw2, setPw2] = useState('')
  const [errors, setErrors] = useState({})
  const [busy, setBusy] = useState(false)

  function liveSet(key, v) {
    if (key === 'pw')  setPw(v)
    if (key === 'pw2') setPw2(v)
    const e = validate(key === 'pw' ? v : pw, key === 'pw2' ? v : pw2)
    setErrors((errs) => ({
      ...errs,
      ...(key === 'pw'  ? { password:  e.password  } : {}),
      ...(key === 'pw2' ? { password2: e.password2 } : {}),
    }))
  }

  async function submit(ev) {
    ev.preventDefault()
    const e = validate(pw, pw2)
    setErrors(e)
    if (Object.keys(e).length) return
    setBusy(true)
    const res = await resetPassword({ resetToken, password: pw })
    setBusy(false)
    if (!res.ok) {
      setErrors((prev) => ({ ...prev, ...(res.fieldErrors || {}) }))
      show(res.error || 'Could not reset password.', 'error', 4000)
      return
    }
    onReset()
  }

  return (
    <div className="auth-centered" id="rpFormStep">
      <div className="auth-icon"><i className="bi bi-lock-fill"></i></div>
      <h2>Reset Your Password</h2>
      <p>
        Hi <strong style={{ color: 'var(--white)' }}>{name}</strong> &mdash; create a new password
        for your Svitch account. Use 12+ characters with letters, numbers and symbols.
      </p>

      <form className="auth-form-fields" style={{ textAlign: 'left' }} noValidate onSubmit={submit}>
        <div>
          <PasswordField
            label="New Password"
            value={pw} onChange={(v) => liveSet('pw', v)}
            required minLength={8}
            error={errors.password}
            rules={PASSWORD_RULES}
            autoComplete="new-password"
          />
          <PasswordStrength value={pw} />
        </div>

        <PasswordField
          label="Confirm Password"
          value={pw2} onChange={(v) => liveSet('pw2', v)}
          required error={errors.password2}
          autoComplete="new-password"
        />

        <button type="submit" className="btn-csr primary full-w" disabled={busy}>
          {busy ? (
            <span className="btn-spinner"><i className="bi bi-arrow-repeat spin-icon"></i> Resetting…</span>
          ) : (
            <><i className="bi bi-arrow-clockwise"></i> Reset Password</>
          )}
        </button>
      </form>

      <p className="auth-footer-link rajdhani-lbl-text-sm">
        <Link to={PATHS.login}><i className="bi bi-arrow-left"></i> Back to Sign In</Link>
      </p>
    </div>
  )
}
