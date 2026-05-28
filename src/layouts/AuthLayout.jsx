import { Outlet } from 'react-router-dom'
import { Link } from 'react-router-dom'
import { PATHS } from '@/utils/routes'
import SkipToMain from './SkipToMain'

// Stripped-down layout for /auth/* and system pages. Logo-only header,
// no main navbar, no footer link sets, no user dropdown.
export default function AuthLayout() {
  return (
    <div className="wrapper-body">
      <SkipToMain />
      <header className="auth-header">
        <div className="container">
          <Link to={PATHS.home} className="nav-logo">
            <img src="/images/logos/Svitch-LOGO-white.png" alt="Svitch Bike" height="30" />
          </Link>
          <Link to={PATHS.home} className="rajdhani-lbl-text-sm">
            <i className="bi bi-arrow-left"></i> Back to Home
          </Link>
        </div>
      </header>
      <main id="main-content">
        <Outlet />
      </main>
    </div>
  )
}
