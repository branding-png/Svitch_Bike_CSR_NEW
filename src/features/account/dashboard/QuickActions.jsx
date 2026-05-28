import { Link } from 'react-router-dom'
import { PATHS } from '@/utils/routes'

const ACTIONS = [
  { to: PATHS.shop,      icon: 'bag',         title: 'Shop Bikes',    desc: 'Explore the full range' },
  { to: PATHS.orders,    icon: 'truck',       title: 'Track Order',   desc: 'See your delivery status' },
  { to: PATHS.wishlist,  icon: 'heart',       title: 'My Wishlist',   desc: 'Saved for later' },
  { to: PATHS.addresses, icon: 'geo-alt',     title: 'Addresses',     desc: 'Manage shipping' },
  { to: PATHS.profile,   icon: 'person-gear', title: 'Edit Profile',  desc: 'Update personal info' },
  { to: PATHS.contact,   icon: 'headset',     title: 'Get Support',   desc: 'We\'re here to help' },
]

export default function QuickActions() {
  return (
    <div className="account-section">
      <div className="account-section-head"><h3>Quick Actions</h3></div>
      <div className="quick-actions-grid">
        {ACTIONS.map((a) => (
          <Link key={a.title} to={a.to} className="rajdhani-lbl-text-sm card-base quick-action">
            <i className={`bi bi-${a.icon}`}></i>
            <div>
              <strong>{a.title}</strong>
              <span>{a.desc}</span>
            </div>
          </Link>
        ))}
      </div>
    </div>
  )
}
