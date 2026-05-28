const PILLS = [
  { id: 'all',        icon: 'grid-fill',         label: 'All Orders' },
  { id: 'delivered',  icon: 'check-circle',      label: 'Delivered' },
  { id: 'shipped',    icon: 'truck',             label: 'Shipped' },
  { id: 'processing', icon: 'clock-history',     label: 'Processing' },
  { id: 'cancelled',  icon: 'x-circle',          label: 'Cancelled' },
]

export default function OrderPill({ active, onChange }) {
  return (
    <div aria-label="OrderPill" className="filter-pills" role="tablist">
      {PILLS.map((p) => (
        <button
          key={p.id}
          type="button"
          className={`filter-pill${active === p.id ? ' is-active' : ''}`}
          onClick={() => onChange(p.id)}
        >
          <i className={`bi bi-${p.icon}`}></i> {p.label}
        </button>
      ))}
    </div>
  )
}
