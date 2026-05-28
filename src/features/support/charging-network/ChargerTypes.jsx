// 3 charger types — mirrors CSR_New_web `#cn-types`. The middle "RapidCharge"
// card is highlighted via `featured: true` → `.is-featured` modifier.
const CHARGERS = [
  {
    icon:    'bi-house-fill',
    tag:     'Home · Included',
    name:    'Standard Home Charger',
    spec:    '5 hrs',
    unit:    '0—100% full charge',
    desc:    'Included with every CSR 762. Plugs into any 15A domestic socket. Perfect for overnight charging at home.',
  },
  {
    icon:    'bi-lightning-charge-fill',
    tag:     'Public Fast · 500+ Points',
    name:    'Svitch RapidCharge',
    spec:    '30 min',
    unit:    '0—80% fast charge',
    desc:    'Svitch-branded public fast chargers at key highway and city locations. Compatible with Bharat AC-001 standard.',
    featured: true,
  },
  {
    icon:    'bi-building-fill',
    tag:     'Workplace · Partner Network',
    name:    'Office Charging',
    spec:    '4—6 hrs',
    unit:    'While you work',
    desc:    '50+ corporate campuses across India. Available to Svitch owners via the Svitch Connect app.',
  },
]

export default function ChargerTypes({ items = CHARGERS }) {
  return (
    <section aria-label="ChargerTypes" id="cn-types">
      <div className="container">
        <div className="section-header">
          <span className="section-label">Charger Types</span>
          <h2 className="section-title">
            Three Ways To <span className="accent">Charge</span>
          </h2>
          <p className="section-desc rajdhani-lbl-text-sm">
            Every CSR 762 ships with a home charger. Access 500+ public
            fast-chargers and 50+ workplace locations via the Svitch Connect app.
          </p>
        </div>

        <div className="charger-grid">
          {items.map((c) => (
            <div
              key={c.name}
              className={`card-base charger-card${c.featured ? ' is-featured' : ''}`}
            >
              <span className="card-base-icon">
                <i className={`bi ${c.icon}`}></i>
              </span>
              <span className="charger-tag">{c.tag}</span>
              <h3 className="charger-name">{c.name}</h3>
              <div className="charger-spec">{c.spec}</div>
              <span className="charger-spec-unit rajdhani-lbl-text-sm">{c.unit}</span>
              <p className="charger-desc rajdhani-lbl-text-sm">{c.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
