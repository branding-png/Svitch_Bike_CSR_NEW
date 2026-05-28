import { useState } from 'react'
import ProfileToggleRow from './ProfileToggleRow'

const ITEMS = [
  { key: 'orderUpdates',  title: 'Order Updates',      desc: 'Delivery, dispatch and status notifications', initial: true },
  { key: 'promos',        title: 'Promotional Offers', desc: 'Discounts, launches, and flash sales',        initial: true },
  { key: 'newsletter',    title: 'Newsletter',         desc: 'Monthly Svitch Journal highlights',           initial: false },
  { key: 'service',       title: 'Service Reminders',  desc: 'Warranty & scheduled service alerts',         initial: true },
]

export default function ProfileNotifications() {
  const [prefs, setPrefs] = useState(() =>
    Object.fromEntries(ITEMS.map((i) => [i.key, i.initial])),
  )

  return (
    <div aria-label="ProfileNotifications" role="region" className="card-base checkout-section">
      <h3><i className="bi bi-bell"></i> Notification Preferences</h3>
      {ITEMS.map((i) => (
        <ProfileToggleRow
          key={i.key}
          title={i.title}
          desc={i.desc}
          checked={prefs[i.key]}
          onChange={(v) => setPrefs((p) => ({ ...p, [i.key]: v }))}
        />
      ))}
    </div>
  )
}
