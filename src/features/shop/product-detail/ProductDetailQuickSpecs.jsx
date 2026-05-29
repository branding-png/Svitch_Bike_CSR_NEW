// Quick-specs strip beneath the CTAs — defaults to CSR 762 numbers.
const DEFAULT_SPECS = [
  { icon: 'bi-lightning-charge-fill', value: '6.5 kW',   label: 'Peak Power' },
  { icon: 'bi-speedometer2',          value: '110 km/h', label: 'Top Speed' },
  { icon: 'bi-battery-charging',      value: '125 km',   label: 'Range' },
  { icon: 'bi-clock-history',         value: '5 hr',     label: 'Charge Time' },
]

export default function ProductDetailQuickSpecs({ specs = DEFAULT_SPECS }) {
  return (
    <div aria-label="ProductDetailQuickSpecs" className="pd-specs-quick">
      {specs.map((s) => (
        <div key={s.label} className="pd-spec-quick">
          <i className={`bi ${s.icon}`} aria-hidden="true" />
          <h3>{s.value}</h3>
          <span className="rajdhani-lbl-text-sm">{s.label}</span>
        </div>
      ))}
    </div>
  )
}
