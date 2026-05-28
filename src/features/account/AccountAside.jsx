import { NavLink, useNavigate } from 'react-router-dom'
import { PATHS } from '@/utils/routes'
import { useUser } from '@/contexts/UserContext'
import { useToast } from '@/contexts/ToastContext'

// Grouped sidebar nav — mirrors CSR_New_web `account-nav-group` markup.
const NAV_GROUPS = [
  {
    title: 'Account',
    links: [
      { to: PATHS.dashboard,  icon: 'speedometer2', label: 'Dashboard' },
      { to: PATHS.profile,    icon: 'person-gear',  label: 'My Profile' },
      { to: PATHS.testRides,  icon: 'bicycle',      label: 'My Test Rides' },
    ],
  },
  {
    title: 'Shopping',
    links: [
      { to: PATHS.orders,    icon: 'bag-check', label: 'My Orders', count: 3 },
      { to: PATHS.wishlist,  icon: 'heart',     label: 'Wishlist',  count: 4 },
      { to: PATHS.addresses, icon: 'geo-alt',   label: 'Addresses' },
      { to: PATHS.cart,      icon: 'cart3',     label: 'Cart' },
    ],
  },
  {
    title: 'Rewards',
    links: [{ to: PATHS.referral, icon: 'gift-fill', label: 'Refer & Earn' }],
  },
  {
    title: 'Billing & Returns',
    links: [
      { to: PATHS.invoices, icon: 'receipt',                label: 'Invoices & GST' },
      { to: PATHS.returns,  icon: 'arrow-counterclockwise', label: 'Returns & Refunds' },
    ],
  },
  {
    title: 'Service',
    links: [
      { to: PATHS.serviceHistory, icon: 'tools',   label: 'Service History' },
      { to: PATHS.ticket,         icon: 'headset', label: 'Support Tickets' },
    ],
  },
  {
    title: 'Preferences',
    links: [
      { to: PATHS.notifications, icon: 'bell', label: 'Notifications' },
      { to: PATHS.profile + '#security', icon: 'gear', label: 'Account Settings' },
    ],
  },
  {
    title: 'Career',
    links: [{ to: PATHS.savedJobs, icon: 'bookmark-star', label: 'Saved Jobs' }],
  },
  {
    title: 'Support',
    links: [
      { to: PATHS.warranty, icon: 'shield-check', label: 'Warranty' },
      { to: PATHS.contact,  icon: 'headset',      label: 'Contact Us' },
    ],
  },
]

export default function AccountAside() {
  const { user, logout } = useUser()
  const { show } = useToast()
  const navigate = useNavigate()
  const name    = user?.name  || 'Arjun Rider'
  const email   = user?.email || 'rider@svitch.bike'
  const initial = (name.trim()[0] || 'A').toUpperCase()

  function handleSignOut(e) {
    e.preventDefault()
    logout?.()
    show('Signed out. See you soon!', 'success', 3000)
    navigate(PATHS.home)
  }

  return (
    <aside className="rajdhani-lbl-text-sm account-sidebar">
      <div className="card-base account-sidebar-profile">
        <div className="account-avatar">{initial}</div>
        <h4>{name}</h4>
        <span className="email">{email}</span>
        <span className="account-member-badge">
          <i className="bi bi-star-fill" style={{ fontSize: 10 }}></i> Svitch Member
        </span>
      </div>

      <nav className="card-base account-nav">
        {NAV_GROUPS.map((group) => (
          <div className="account-nav-group" key={group.title}>
            <span className="account-nav-title rajdhani-lbl-text-sm">{group.title}</span>
            {group.links.map((link) => (
              <NavLink
                key={`${group.title}-${link.label}`}
                to={link.to}
                end={link.to === PATHS.dashboard}
                className={({ isActive }) =>
                  'rajdhani-lbl-text-sm account-nav-link' + (isActive ? ' is-active' : '')
                }
              >
                <i className={`bi bi-${link.icon}`}></i> {link.label}
                {link.count != null && <span className="badge-count">{link.count}</span>}
              </NavLink>
            ))}
          </div>
        ))}
      </nav>

      <div className="card-base account-sidebar-signout">
        <a
          href="#"
          className="rajdhani-lbl-text-sm btn-csr secondary sm"
          onClick={handleSignOut}
        >
          <i className="bi bi-box-arrow-right"></i> Sign Out
        </a>
      </div>
    </aside>
  )
}
