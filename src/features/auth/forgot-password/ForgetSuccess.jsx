import { Link } from 'react-router-dom'
import { PATHS } from '@/utils/routes'

export default function ForgetSuccess() {
  return (
    <div className="auth-centered" id="fpStep4">
      <div className="auth-success-icon"><i className="bi bi-check2"></i></div>
      <h2>Password Reset!</h2>
      <p>Your password has been successfully reset. You can now sign in with your new credentials.</p>
      <Link to={PATHS.login} className="btn-csr primary full-w">
        <i className="bi bi-box-arrow-in-right"></i> Sign In Now
      </Link>
    </div>
  )
}
