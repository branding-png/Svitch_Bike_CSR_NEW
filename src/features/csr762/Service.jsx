// CSR 762 — "We've Got You Covered." service & warranty section. Mirrors
// svitch.bike `#service`. Two warranty cards (bike + battery).
const SERVICE_CARDS = [
  {
    icon:  'bi-shield-fill-check',
    title: 'Bike Warranty',
    value: '3 Yr / 30,000 km',
    desc:  'Comprehensive coverage on frame, motor, and all electrical components. Zero hidden charges.',
  },
  {
    icon:  'bi-battery-charging',
    title: 'Battery Warranty',
    value: '3 Yr / 30,000 km',
    desc:  'Industry-leading battery warranty. Capacity guarantee of 70%+ through the warranty period.',
  },
]

export default function Service({
  label      = 'Service & Support',
  titleStart = "We've Got",
  titleEnd   = 'You Covered.',
  cards      = SERVICE_CARDS,
}) {
  return (
    <section id="service">
      <div className="container">
        <div className="sv-heading reveal">
          <span className="section-label">{label}</span>
          <h2 className="section-title large">
            {titleStart}<br />{titleEnd}
          </h2>
        </div>

        <div className="sv-grid">
          {cards.map((c, i) => (
            <div key={c.title} className={`service-card reveal delay-${i * 2 + 1}`}>
              <i className={`bi ${c.icon} service-icon`} aria-hidden="true" />
              <h3 className="service-title">{c.title}</h3>
              <span className="service-val">{c.value}</span>
              <div className="service-desc">{c.desc}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
