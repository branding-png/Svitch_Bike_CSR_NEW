// Full spec grid (Specifications tab). Defaults to CSR 762.
const DEFAULT_SPECS = [
  { label: 'Motor',       value: '250W BLDC Bafang Hub Motor' },
  { label: 'Battery',     value: '72V · 14.5Ah Li-ion' },
  { label: 'Range',       value: 'Up to 125 km (IDC)' },
  { label: 'Top Speed',   value: '110 km/h' },
  { label: 'Charge Time', value: '~5 hours (0–100%)' },
  { label: 'Brakes',      value: 'Dual-channel ABS' },
  { label: 'Suspension',  value: 'Telescopic front / mono-rear' },
  { label: 'Display',     value: '7" TFT · Android' },
]

export default function ProductDetailSpecs({ specs = DEFAULT_SPECS }) {
  return (
    <div aria-label="ProductDetailSpecs" className="pd-specs-grid">
      {specs.map((s) => (
        <div key={s.label} className="pd-spec-quick">
          <span className="rajdhani-lbl-text-sm pd-spec-label">{s.label}</span>
          <h3>{s.value}</h3>
        </div>
      ))}
    </div>
  )
}
