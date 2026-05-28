import PasswordField, { PASSWORD_RULES } from '@/ui/PasswordField'
import PasswordStrength from './PasswordStrength'

export default function RegisterStepSecurity({ form, errors, set, onBack, onNext }) {
  return (
    <div aria-label="RegisterStepSecurity" role="region" className="step-panel is-active" data-panel="2">
      <div className="auth-form-fields">
        <div>
          <PasswordField
            label="Password"
            placeholder="Minimum 8 characters"
            value={form.password} onChange={set('password')}
            required minLength={8}
            error={errors.password}
            rules={PASSWORD_RULES}
            autoComplete="new-password"
          />
          <PasswordStrength value={form.password} />
        </div>

        <PasswordField
          label="Confirm Password"
          value={form.password2} onChange={set('password2')}
          required error={errors.password2}
          autoComplete="new-password"
        />
      </div>
      <div className="step-nav">
        <button type="button" className="btn-csr secondary back back-step" onClick={onBack}>
          <i className="bi bi-arrow-left"></i> Back
        </button>
        <button type="button" className="btn-csr primary next-step" onClick={onNext}>
          Continue <i className="bi bi-arrow-right"></i>
        </button>
      </div>
    </div>
  )
}
