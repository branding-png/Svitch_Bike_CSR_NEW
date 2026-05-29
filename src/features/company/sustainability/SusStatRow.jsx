// Sustainability hero stat row â€” mirrors CSR_New_web `.sus-stat-row`.
// Optional `suffix` renders as a small accent-coloured "%" next to the value.
const STATS = [
  { value: '52K',  suffix: null, unit: 'Tonnes',    label: 'COâ‚‚ avoided by Svitch riders in 2024'         },
  { value: '100',  suffix: '%',  unit: 'Renewable', label: 'Ahmedabad facility powered by solar & wind'   },
  { value: '2030', suffix: null, unit: 'Target',    label: 'Carbon-neutral operations across all facilities' },
  { value: '0',    suffix: '%',  unit: 'Landfill',  label: 'Zero manufacturing waste sent to landfill since 2023' },
]

const SUFFIX_STYLE = {
  fontSize:    '0.55em',
  color:       'var(--accent)',
  fontWeight:  'var(--fw-bold)',
  marginLeft:  2,
}

export default function SusStatRow({ items = STATS }) {
  return (
    <div aria-label="SusStatRow" className="sus-stat-row">
      {items.map((s) => (
        <div key={s.label} className="card-base sus-stat">
          <span className="sus-stat-num">
            {s.value}
            {s.suffix && <small style={SUFFIX_STYLE}>{s.suffix}</small>}
          </span>
          <span className="sus-stat-unit">{s.unit}</span>
          <span className="sus-stat-label rajdhani-lbl-text-sm">{s.label}</span>
        </div>
      ))}
    </div>
  )
}
