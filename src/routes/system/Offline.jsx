import { Link } from 'react-router-dom'
import { PATHS } from '@/utils/routes'
import '@/styles/pages/offline.css'

// Offline / no-network screen. Mirrors CSR_New_web `offline.html`.
// Renders inside a standalone route — no Navbar, no AuthLayout chrome.
export default function Offline() {
  return (
    <div id="off-main">
      <div className="off-wrap">
        <Link to={PATHS.home} className="off-logo">
          <img src="/images/logos/Svitch-LOGO-white.png" alt="Svitch" height="36" />
        </Link>

        <div className="off-icon">
          <i className="bi bi-wifi-off"></i>
        </div>

        <span className="section-label">No Connection</span>
        <h1 className="section-title">
          You&apos;re <span className="highlight">offline</span>
        </h1>
        <p className="off-lead">
          Looks like the network dropped. Check your Wi-Fi or mobile data,
          then retry.
        </p>

        <button
          type="button"
          className="btn-csr primary off-retry"
          onClick={() => window.location.reload()}
        >
          <i className="bi bi-arrow-clockwise"></i> Try Again
        </button>

        <p className="off-back">
          <Link to={PATHS.home} className="accent">
            Or return to home
          </Link>
        </p>
      </div>
    </div>
  )
}
