import { Link } from 'react-router-dom'
import { PATHS } from '@/utils/routes'

// Checkout — Terms & Privacy agreement checkbox.
export default function TermsSection({ form, errors = {}, onChange }) {
  return (
    <div aria-label="TermsSection" role="region" className="card-base checkout-section" data-field="terms">
      <label
        className="form-check rajdhani-lbl-text-sm"
        style={{ textTransform: 'none', display: 'flex', gap: 10, alignItems: 'flex-start' }}
      >
        <input
          type="checkbox" name="terms"
          checked={!!form.terms}
          onChange={(e) => onChange('terms', e.target.checked)}
          style={{ marginTop: 4 }}
        />
        <span>
          I agree to the{' '}
          <Link to={PATHS.termCondition} style={{ color: 'var(--accent)', textDecoration: 'underline' }}>
            Terms &amp; Conditions
          </Link>{' '}
          and{' '}
          <Link to={PATHS.privacyPolicy} style={{ color: 'var(--accent)', textDecoration: 'underline' }}>
            Privacy Policy
          </Link>
          , and authorise Svitch to process this order.
        </span>
      </label>

      {errors.terms && (
        <div className="invalid-feedback" style={{ display: 'block', marginTop: 8 }}>
          {errors.terms}
        </div>
      )}
    </div>
  )
}
