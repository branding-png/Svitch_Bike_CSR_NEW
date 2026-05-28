const STATS = [
  { icon: 'bag-check',     value: 3, label: 'Total Orders' },
  { icon: 'heart-fill',    value: 4, label: 'Wishlist' },
  { icon: 'geo-alt-fill',  value: 2, label: 'Addresses' },
  { icon: 'bicycle',       value: 1, label: 'Bikes Owned' },
  { icon: 'bookmark-star', value: 2, label: 'Saved Jobs' },
]

export default function DashboardStats() {
  return (
    <div className="account-stats-grid">
      {STATS.map((s) => (
        <div key={s.label} className="card-base account-stat-card">
          <i className={`bi bi-${s.icon}`}></i>
          <h3>{s.value}</h3>
          <span className="rajdhani-lbl-text-sm">{s.label}</span>
        </div>
      ))}
    </div>
  )
}
