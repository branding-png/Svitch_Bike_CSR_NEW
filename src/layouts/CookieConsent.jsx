import { useEffect, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { PATHS } from '@/utils/routes'

const STORAGE_KEY = 'svitchCookieConsent'

// DPDP Act 2023 / GDPR-compliant banner. Stores choice in localStorage so
// it does not re-appear after the user picks one. Hidden on the cookie-policy
// route itself (where the user is already managing preferences).
export default function CookieConsent() {
  const { pathname } = useLocation()
  const [visible, setVisible] = useState(false)
  const [entered, setEntered] = useState(false)

  useEffect(() => {
    if (pathname === PATHS.cookiePolicy) return
    try {
      if (localStorage.getItem(STORAGE_KEY)) return
    } catch {
      // localStorage blocked — still show the banner; choice just won't persist
    }
    setVisible(true)
    // Trigger slide-up animation on next frame
    const id = requestAnimationFrame(() => setEntered(true))
    return () => cancelAnimationFrame(id)
  }, [pathname])

  function dismiss(choice) {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify({ choice, ts: Date.now() }))
    } catch { /* noop */ }
    setEntered(false)
    setTimeout(() => setVisible(false), 320)
  }

  if (!visible) return null

  return (
    <div
      id="cookieConsent"
      className={'cookie-consent' + (entered ? ' is-open' : '')}
      role="dialog"
      aria-label="Cookie consent"
    >
      <div className="cookie-consent-inner">
        <div className="cookie-consent-text">
          <strong className="cookie-consent-title">We value your privacy</strong>
          <p className="cookie-consent-desc">
            We use cookies to enhance your browsing experience, serve personalised content, and analyse
            traffic. Under the DPDP Act 2023 and GDPR, you can choose which categories to allow.{' '}
            <Link to={PATHS.cookiePolicy} className="cookie-consent-link">
              Read our Cookie Policy
            </Link>.
          </p>
        </div>
        <div className="cookie-consent-actions">
          <button type="button" className="btn-csr secondary sm" onClick={() => dismiss('reject-non-essential')}>
            Reject Non-Essential
          </button>
          <Link to={PATHS.cookiePolicy} className="btn-csr secondary sm">Customise</Link>
          <button type="button" className="btn-csr primary sm" onClick={() => dismiss('accept-all')}>
            Accept All
          </button>
        </div>
      </div>
    </div>
  )
}
