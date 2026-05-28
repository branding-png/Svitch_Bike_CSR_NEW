import { useState } from 'react'
import { PasswordField } from '@/ui'
import { useToast } from '@/contexts/ToastContext'

function validate(f) {
  const e = {}
  if (!f.current) e.current = 'Please enter your current password.'
  const okLen = f.next.length >= 8
  const okMix = /[A-Za-z]/.test(f.next) && /\d/.test(f.next)
  if (!okLen || !okMix) e.next = 'New password must be at least 8 characters and mix letters & numbers.'
  if (!f.confirm || f.confirm !== f.next) e.confirm = 'Passwords do not match.'
  return e
}

export default function ProfilePassword() {
  const { show } = useToast()
  const [form, setForm]     = useState({ current: '', next: '', confirm: '' })
  const [errors, setErrors] = useState({})

  const set = (key) => (v) => {
    setForm((f) => {
      const next  = { ...f, [key]: v }
      const fresh = validate(next)
      setErrors((errs) => ({ ...errs, [key]: fresh[key] }))
      return next
    })
  }

  function submit(ev) {
    ev.preventDefault()
    const e = validate(form)
    setErrors(e)
    if (Object.keys(e).length) {
      show('Please fix the highlighted fields.', 'error', 3500)
      return
    }
    setForm({ current: '', next: '', confirm: '' })
    show('Password updated.', 'success', 3000)
  }

  return (
    <div className="card-base checkout-section">
      <h3><i className="bi bi-shield-lock"></i> Change Password</h3>
      <form onSubmit={submit} noValidate>
        <PasswordField
          label="Current Password"
          placeholder="Enter your current password"
          value={form.current} onChange={set('current')}
          required error={errors.current}
          autoComplete="current-password"
        />
        <div className="form-row">
          <PasswordField
            label="New Password"
            placeholder="At least 8 characters"
            value={form.next} onChange={set('next')}
            required minLength={8} error={errors.next}
            autoComplete="new-password"
          />
          <PasswordField
            label="Confirm New Password"
            placeholder="Re-enter new password"
            value={form.confirm} onChange={set('confirm')}
            required error={errors.confirm}
            autoComplete="new-password"
          />
        </div>
        <div style={{ marginTop: 8 }}>
          <button type="submit" className="btn-csr primary"><i className="bi bi-key"></i> Update Password</button>
        </div>
      </form>
    </div>
  )
}
