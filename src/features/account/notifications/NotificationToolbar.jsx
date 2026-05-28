import { NOTIFICATION_FILTERS } from '@/data/notifications-data'

export default function NotificationToolbar({ active, onChange, onMarkAllRead }) {
  return (
    <div aria-label="NotificationToolbar" role="region" className="nf-toolbar">
      {NOTIFICATION_FILTERS.map((f) => (
        <button
          key={f.id}
          type="button"
          className={`nf-filter${active === f.id ? ' active' : ''}`}
          data-f={f.id}
          onClick={() => onChange(f.id)}
        >
          {f.label}
        </button>
      ))}
      <button
        type="button"
        className="btn-csr secondary sm"
        style={{ marginLeft: 'auto' }}
        onClick={onMarkAllRead}
      >
        <i className="bi bi-check2-all"></i> Mark All Read
      </button>
    </div>
  )
}
