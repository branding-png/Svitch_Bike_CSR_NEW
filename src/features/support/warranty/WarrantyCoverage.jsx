// Coverage-duration cards — mirrors CSR_New_web `#coverage`.
// 4 cards driven by data; middle card uses `featured: true` for the accent
// `.coverage-card-featured` class + optional `badge` label.
const CARDS = [
  {
    icon:  'bi-bicycle',
    num:   '3', unit: 'Year', sub: 'or 30,000 km',
    title: 'Vehicle Warranty',
    text:  'Comprehensive coverage on the chassis, bodywork, suspension, brakes, lighting, and all factory-fit components.',
  },
  {
    icon:    'bi-battery-charging',
    num:     '3', unit: 'Year', sub: 'or 30,000 km',
    title:   'Battery Warranty',
    text:    'Full protection on the dual swappable Li-NMC pack, BMS, cells, wiring harness, and charging accessories.',
    badge:   'Li-NMC',
    featured: true,
  },
  {
    icon:  'bi-cpu',
    num:   '3', unit: 'Year', sub: 'or 30,000 km',
    title: 'Motor Warranty',
    text:  'The PMSM motor, controller, inverter, and drivetrain components are fully covered against manufacturing defects.',
  },
  {
    icon:  'bi-headset',
    num:   '24/7', sub: 'Roadside Assist',
    title: 'Service Coverage',
    text:  '500+ authorised service centres, free periodic checks, doorstep pickup, and OTA software updates for the entire warranty period.',
  },
]

export default function WarrantyCoverage({ items = CARDS }) {
  return (
    <section id="coverage">
      <div className="container">
        <div className="section-header">
          <span className="section-label">Coverage Duration</span>
          <h2 className="section-title">
            What&apos;s <span className="accent">Covered &amp; For How Long</span>
          </h2>
          <p className="section-desc">
            Every CSR 762 is covered by a comprehensive factory warranty.
            Here&apos;s what we protect, and for how long — whichever comes
            first, kilometres or years.
          </p>
        </div>

        <div className="coverage-grid">
          {items.map((c) => (
            <div
              key={c.title}
              className={`card-base coverage-card${c.featured ? ' coverage-card-featured' : ''}`}
            >
              {c.badge && <span className="coverage-badge">{c.badge}</span>}
              <div className="card-base-icon">
                <i className={`bi ${c.icon}`}></i>
              </div>
              <div className="coverage-head">
                <strong>
                  {c.num}
                  {c.unit && <> <small>{c.unit}</small></>}
                </strong>
                <span className="coverage-sub rajdhani-lbl-text-sm">{c.sub}</span>
              </div>
              <h3>{c.title}</h3>
              <p>{c.text}</p>
            </div>
          ))}
        </div>

        <p className="coverage-note">
          <i className="bi bi-info-circle"></i>
          Extended warranty plans up to 5 years / 50,000 km are available at
          the time of purchase. Talk to your nearest dealer for pricing.
        </p>
      </div>
    </section>
  )
}
