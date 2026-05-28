// Trust strip — free delivery, warranty, returns. Matches legacy .pd-trust markup.
const DEFAULT_ITEMS = [
  { icon: 'bi-shield-check',           label: '3-Year Warranty' },
  { icon: 'bi-speedometer2',           label: '30,000 km Warranty' },
]

export default function ProductDetailTrust({ items = DEFAULT_ITEMS }) {
  return (
    <div aria-label="ProductDetailTrust" role="region" className="pd-trust">
      {items.map((item) => (
        <div key={item.label} className="pd-trust-item rajdhani-lbl-text-sm">
          <i className={`bi ${item.icon}`} aria-hidden="true" /> {item.label}
        </div>
      ))}
    </div>
  )
}
