import { NavLink } from 'react-router-dom'
import { PATHS } from '@/utils/routes'

const PILLS = [
  { to: PATHS.dashboard,      label: 'Dashboard' },
  { to: PATHS.profile,        label: 'Profile' },
  { to: PATHS.orders,         label: 'Orders' },
  { to: PATHS.invoices,       label: 'Invoices' },
  { to: PATHS.returns,        label: 'Returns' },
  { to: PATHS.serviceHistory, label: 'Service History' },
  { to: PATHS.ticket,         label: 'Support Tickets' },
  { to: PATHS.testRides,      label: 'Test Rides' },
  { to: PATHS.wishlist,       label: 'Wishlist' },
  { to: PATHS.addresses,      label: 'Addresses' },
  { to: PATHS.notifications,  label: 'Notifications' },
  { to: PATHS.savedJobs,      label: 'Saved Jobs' },
]

export default function AccountMobilePills() {
  return (
    <div className="account-mobile-pills">
      {PILLS.map((p) => (
        <NavLink
          key={p.to}
          to={p.to}
          end={p.to === PATHS.dashboard}
          className={({ isActive }) =>
            'rajdhani-lbl-text-sm' + (isActive ? ' is-active' : '')
          }
        >
          {p.label}
        </NavLink>
      ))}
    </div>
  )
}
