import { Link } from 'react-router-dom'
import InputControl from '@/ui/InputControl'
import { PATHS } from '@/utils/routes'

const SOURCE_OPTIONS = [
  'Social Media', 'Friend/Family', 'Google Search',
  'Dealership', 'News & Press', 'Event',
]

const linkStyle = { color: 'var(--accent)', textDecoration: 'underline' }
const checkStyle = { textTransform: 'none' }

export default function RegisterStepPreferences({ form, errors, set, busy, onBack }) {
  return (
    <div aria-label="RegisterStepPreferences" className="step-panel is-active" data-panel="3">
      <div className="auth-form-fields">
        <InputControl
          label="City"
          placeholder="e.g. Ahmedabad"
          value={form.city} onChange={set('city')}
          autoComplete="address-level2"
        />
        <InputControl
          as="select"
          label="How did you hear about us?"
          value={form.source} onChange={set('source')}
          options={SOURCE_OPTIONS}
        />

        <div>
          <label className="form-check rajdhani-lbl-text-sm" style={checkStyle}>
            <input
              type="checkbox"
              checked={form.terms}
              onChange={(e) => set('terms')(e.target.checked)}
            />{' '}
            I agree to the{' '}
            <Link to={PATHS.termCondition} style={linkStyle}>Terms &amp; Conditions</Link>
            {' '}and{' '}
            <Link to={PATHS.privacyPolicy} style={linkStyle}>Privacy Policy</Link>.
          </label>
          {errors.terms && (
            <div
              className="field-error"
              style={{ color: '#ef4444', fontFamily: 'var(--font-label)', marginTop: 6, display: 'block' }}
            >
              {errors.terms}
            </div>
          )}
        </div>

        <label className="form-check rajdhani-lbl-text-sm" style={checkStyle}>
          <input
            type="checkbox"
            checked={form.marketing}
            onChange={(e) => set('marketing')(e.target.checked)}
          />{' '}
          Send me occasional launch updates &amp; offers.
        </label>
      </div>
      <div className="step-nav">
        <button type="button" className="btn-csr secondary back back-step" onClick={onBack} disabled={busy}>
          <i className="bi bi-arrow-left"></i> Back
        </button>
        <button type="submit" className="btn-csr primary" disabled={busy}>
          {busy ? (
            <span className="btn-spinner">
              <i className="bi bi-arrow-repeat spin-icon"></i> Creatingâ€¦
            </span>
          ) : (
            <span className="btn-text">
              <i className="bi bi-check2-circle"></i> Create Account
            </span>
          )}
        </button>
      </div>
    </div>
  )
}
