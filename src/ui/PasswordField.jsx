import { useState } from 'react'
import InputControl from './InputControl'

// Password input with:
//  • eye toggle to reveal/hide
//  • Caps Lock warning (small amber chip below the field while CapsLock is on)
//  • optional `rules={[{ test, label }]}` checklist that turns green per match
//
// Usage:
//   <PasswordField label="New Password" value={pw} onChange={setPw}
//                  required error={errors.password} rules={PASSWORD_RULES} />
export default function PasswordField({
  initialVisible = false,
  rules,                 // optional checklist
  ...rest
}) {
  const [visible, setVisible] = useState(initialVisible)
  const [capsOn, setCapsOn]   = useState(false)

  function onKey(e) {
    if (typeof e.getModifierState === 'function') {
      setCapsOn(e.getModifierState('CapsLock'))
    }
  }

  const value = rest.value || ''

  return (
    <div className="pw-field">
      <InputControl
        type={visible ? 'text' : 'password'}
        autoComplete={rest.autoComplete || 'current-password'}
        onKeyUp={onKey}
        onKeyDown={onKey}
        {...rest}
      />
      <button
        type="button"
        className="pw-toggle"
        aria-label={visible ? 'Hide password' : 'Show password'}
        onClick={() => setVisible((v) => !v)}
      >
        <i className={`bi ${visible ? 'bi-eye-slash' : 'bi-eye'}`}></i>
      </button>

      {capsOn && (
        <div className="pw-caps-warning" role="status">
          <i className="bi bi-capslock-fill"></i> Caps Lock is on
        </div>
      )}

      {rules && rules.length > 0 && value && (
        <ul className="pw-rules" aria-live="polite">
          {rules.map((r) => {
            const ok = r.test(value)
            return (
              <li key={r.label} className={ok ? 'is-ok' : ''}>
                <i className={`bi ${ok ? 'bi-check-circle-fill' : 'bi-circle'}`}></i>
                {r.label}
              </li>
            )
          })}
        </ul>
      )}
    </div>
  )
}

// Standard password rule set — exported so Register/Reset/ForgotNewPassword
// can share the same checklist.
export const PASSWORD_RULES = [
  { label: 'At least 8 characters',           test: (s) => s.length >= 8 },
  { label: 'A letter (A–Z)',                  test: (s) => /[A-Za-z]/.test(s) },
  { label: 'A number (0–9)',                  test: (s) => /\d/.test(s) },
  { label: 'A symbol (! @ # $ …)',            test: (s) => /[^A-Za-z0-9]/.test(s) },
]
