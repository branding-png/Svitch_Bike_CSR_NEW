// CSR 762 — Quick-specs strip. Mirrors svitch.bike `#specs-strip`.
// 7-cell white horizontal stat strip (range, power, top speed, warranty,
// charge time, 0–60, torque). Styles live in src/styles/pages/csr762.css
// (.specs-grid / .spec-* classes).
const SPECS = [
  { val: '160+', unit: 'km',   label: 'IDC Range' },
  { val: '6.5',  unit: 'kW',   label: 'Peak Power' },
  { val: '110',  unit: 'km/h', label: 'Top Speed' },
  { val: '3',    unit: 'yr',   label: 'Battery Warranty' },
  { val: '5.5',  unit: 'hr',   label: 'Charging Time' },
  { val: '6',    unit: 's',    label: '0–60 km/h' },
  { val: '55',   unit: 'Nm',   label: 'Torque' },
]

export default function SpecsStrip({ specs = SPECS }) {
  return (
    <section aria-label="SpecsStrip" id="specs-strip">
      <div className="container">
        <div className="specs-grid">
          {specs.map((s, i) => (
            <div key={s.label} className={`spec-item reveal delay-${i + 1}`}>
              <span className="spec-val">
                {s.val}
                <span className="spec-unit">{s.unit}</span>
              </span>
              <span className="spec-label">{s.label}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
