import { Link } from 'react-router-dom'
import { PATHS } from '@/utils/routes'

export default function EmailInvalid() {
  return (
    <div aria-label="EmailInvalid" className="auth-centered" id="veInvalid">
      <div className="auth-icon">
        <i className="bi bi-exclamation-triangle-fill" style={{ color: '#ef4444' }}></i>
      </div>
      <h2>Link Expired</h2>
      <p>
        This verification link has expired or has already been used. Sign in and request a new
        one from your profile, or register again.
      </p>
      <Link to={PATHS.login} className="btn-csr primary full-w">
        <i className="bi bi-box-arrow-in-right"></i> Sign In
      </Link>
      <p className="auth-footer-link rajdhani-lbl-text-sm">
        <Link to={PATHS.register}>Create new account</Link>
      </p>
    </div>
  )
}
