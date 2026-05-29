import { Link } from 'react-router-dom'
import { PATHS } from '@/utils/routes'

export default function EmailSuccess({ name = 'Rider' }) {
  return (
    <div aria-label="EmailSuccess" className="auth-centered" id="veSuccess">
      <div className="auth-success-icon"><i className="bi bi-check2"></i></div>
      <h2>Email Verified!</h2>
      <p>
        Welcome aboard, <strong style={{ color: 'var(--white)' }}>{name}</strong>. Your Svitch
        account is now active. Sign in to track orders, save bikes, and earn rewards.
      </p>
      <Link to={PATHS.login} className="btn-csr primary full-w">
        <i className="bi bi-box-arrow-in-right"></i> Sign In
      </Link>
      <p className="auth-footer-link rajdhani-lbl-text-sm">
        <Link to={PATHS.home}><i className="bi bi-arrow-left"></i> Back to Home</Link>
      </p>
    </div>
  )
}
