// Single big-number stat tile. Used in stat strips on Home, About,
// ChargingNetwork, Sustainability, Saver's Scale.
//
//   <StatTile value="3" unit="yr" label="Battery Warranty" />
//   <StatTile value={formatCurrency(savings)} label="You save" accent />
export default function StatTile({ value, unit, label, accent, dim, bordered = true, className = '' }) {
  const valueColor = accent ? 'var(--accent)' : dim ? 'var(--gray-300)' : 'var(--white)'
  return (
    <div
      className={`stat-tile ${className}`}
      style={{
        padding: 18,
        border: bordered ? '1px solid var(--border)' : 'none',
        textAlign: 'center',
      }}
    >
      <strong style={{ fontSize: 28, color: valueColor, display: 'block' }}>
        {value}
        {unit && <small style={{ fontSize: 14, marginLeft: 2, color: 'var(--gray-400)' }}>{unit}</small>}
      </strong>
      {label && <span className="rajdhani-lbl-text-sm" style={{ color: 'var(--gray-400)' }}>{label}</span>}
    </div>
  )
}

// Convenience wrapper for a row of tiles.
export function StatStrip({ items = [], className = '' }) {
  return (
    <div
      className={`stat-strip ${className}`}
      style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))',
        gap: 14,
      }}
    >
      {items.map((it, i) => <StatTile key={it.label || i} {...it} />)}
    </div>
  )
}
