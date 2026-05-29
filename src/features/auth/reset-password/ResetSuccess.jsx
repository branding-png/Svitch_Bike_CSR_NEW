import { Link } from 'react-router-dom'
import { PATHS } from '@/utils/routes'

export default function ResetSuccess() {
  return (
    <div aria-label="ResetSuccess" className="auth-centered" id="rpSuccessStep">
      <div className="auth-success-icon"><i className="bi bi-check2"></i></div>
      <h2>Password Reset!</h2>
      <p>Your password has been updated. Sign in with your new credentials to continue.</p>
      <Link to={PATHS.login} className="btn-csr primary full-w">
        <i className="bi bi-box-arrow-in-right"></i> Sign In Now
      </Link>
    </div>
  )
}
