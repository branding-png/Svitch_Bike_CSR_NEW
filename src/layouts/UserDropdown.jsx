import { useRef, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { PATHS } from '@/utils/routes'
import { useUser } from '@/contexts/UserContext'
import { useOutsideClick } from '@/hooks/useOutsideClick'

// The 15-link account dropdown shown when a user is signed in.
// Mirrors the canonical .nav-user / .nav-user-menu pattern from the static site.
const LINKS = [
  { to: PATHS.dashboard,      icon: 'bi-speedometer2',          label: 'Dashboard' },
  { to: PATHS.profile,        icon: 'bi-person-gear',           label: 'My Profile' },
  { to: PATHS.orders,         icon: 'bi-bag-check',             label: 'My Orders' },
  { to: PATHS.invoices,       icon: 'bi-receipt',               label: 'Invoices & GST' },
  { to: PATHS.returns,        icon: 'bi-arrow-counterclockwise', label: 'Returns & Refunds' },
  { to: PATHS.serviceHistory, icon: 'bi-tools',                 label: 'Service History' },
  { to: PATHS.ticket,         icon: 'bi-headset',               label: 'Support Tickets' },
  { to: PATHS.testRides,      icon: 'bi-bicycle',               label: 'My Test Rides' },
  { to: PATHS.wishlist,       icon: 'bi-heart',                 label: 'Wishlist' },
  { to: PATHS.addresses,      icon: 'bi-geo-alt',               label: 'Addresses' },
  { to: PATHS.notifications,  icon: 'bi-bell',                  label: 'Notifications' },
  { to: PATHS.savedJobs,      icon: 'bi-bookmark-star',         label: 'Saved Jobs' },
]
const QUICK = [
  { to: PATHS.bookTestRide, icon: 'bi-calendar-event', label: 'Book Test Ride' },
  { to: PATHS.trackOrder,   icon: 'bi-truck',          label: 'Track Order' },
]

export default function UserDropdown() {
  const { user, logout } = useUser()
  const [open, setOpen] = useState(false)
  const wrapRef = useRef(null)
  const navigate = useNavigate()

  useOutsideClick(wrapRef, () => setOpen(false), open)

  function handleSignOut(e) {
    e.preventDefault()
    logout()
    setOpen(false)
    navigate(PATHS.home)
  }

  // Don't render when there's no user — the navbar shows the Sign In icon instead.
  if (!user) return null

  return (
    <div
      ref={wrapRef}
      className={'nav-user' + (open ? ' is-open' : '')}
      id="navUser"
    >
      <button
        className="nav-user-toggle"
        id="navUserToggle"
        type="button"
        onClick={() => setOpen((v) => !v)}
      >
        <i className="bi bi-person-circle"></i>
        <span id="navUserName">{user.name || 'Rider'}</span>
        <i className="bi bi-chevron-down" style={{ fontSize: 12 }}></i>
      </button>
      <div className="nav-user-menu" onClick={() => setOpen(false)}>
        {LINKS.map((l) => (
          <Link key={l.to} className="rajdhani-lbl-text-sm" to={l.to}>
            <i className={`bi ${l.icon}`}></i> {l.label}
          </Link>
        ))}
        <hr />
        {QUICK.map((l) => (
          <Link key={l.to} className="rajdhani-lbl-text-sm" to={l.to}>
            <i className={`bi ${l.icon}`}></i> {l.label}
          </Link>
        ))}
        <hr />
        <a
          className="rajdhani-lbl-text-sm"
          href="#"
          id="signOutBtn"
          onClick={handleSignOut}
        >
          <i className="bi bi-box-arrow-right"></i> Sign Out
        </a>
      </div>
    </div>
  )
}
