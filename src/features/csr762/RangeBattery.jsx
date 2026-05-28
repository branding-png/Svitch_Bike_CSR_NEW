// CSR 762 — "Range & Battery" trust-builder section.
// Mirrors svitch.bike `#range-battery`. Left = giant range number + cost-per-km
// callout. Right = battery spec table. Styles live in src/styles/pages/csr762.css
// (.rb-* / .battery-stat* / .range-* / .cost-km-* classes).
const BATTERY_STATS = [
  { label: 'IDC Range',         value: '160+ km' },
  { label: 'Battery Type',      value: 'Li-NMC' },
  { label: 'Battery Capacity',  value: '3.6 kWh' },
  { label: 'Charging Options',  value: '10Ah Standard Home Charger' },
  { label: 'Full Charge Time',  value: '5 hrs' },
  { label: 'Battery Warranty',  value: '3 Years / 30,000 km' },
  { label: 'BMS',               value: 'Smart BMS — Built In' },
]

export default function RangeBattery({
  label        = 'Trust Builder',
  titleStart   = 'Range &',
  titleEnd     = 'Battery',
  rangeValue   = '160+',
  rangeUnit    = 'km',
  rangeCaption = 'Certified IDC Range',
  costValue    = '₹0.25',
  costLabel    = 'Per Kilometre Cost',
  costDesc     = 'Charge from home at standard electricity rates. 93% cheaper than petrol per kilometre.',
  stats        = BATTERY_STATS,
}) {
  return (
    <section id="range-battery">
      <div className="container">
        <div className="rb-heading reveal">
          <span className="section-label">{label}</span>
          <h2 className="section-title display">
            {titleStart}<br />{titleEnd}
          </h2>
        </div>

        <div className="rb-grid">
          {/* LEFT — giant range number + cost-per-km callout */}
          <div className="rb-left reveal-left">
            <div className="rb-range-block">
              <span className="range-hero-number">
                {rangeValue}
                <span className="range-unit">{rangeUnit}</span>
              </span>
            </div>
            <p className="rb-range-caption">{rangeCaption}</p>

            <div className="cost-km-box">
              <div className="cost-km-val">{costValue}</div>
              <div className="cost-km-desc">
                <div className="cost-km-label">{costLabel}</div>
                {costDesc}
              </div>
            </div>
          </div>

          {/* RIGHT — battery spec table */}
          <div className="rb-right reveal-right">
            <div className="battery-stat-row">
              {stats.map((s) => (
                <div key={s.label} className="battery-stat">
                  <span className="battery-stat-label">{s.label}</span>
                  <span className="battery-stat-val">{s.value}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
