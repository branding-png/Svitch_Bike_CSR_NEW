// CSR 762 — "Why This Bike?" value proposition grid.
// Mirrors svitch.bike `#value`. 4 cards: Performance, Range, Saving, Sustainability.
// Styles live in src/styles/pages/csr762.css (.value-* classes).
const VALUE_CARDS = [
  {
    n: '01',
    icon: 'bi-lightning-fill',
    title: 'Performance',
    desc: '6.5 kW peak power with instant torque delivery. 0–60 in 6.0 seconds, 110 km/h top speed. 6 driving modes (4 riding + 2 assist) — pure electric thrill.',
  },
  {
    n: '02',
    icon: 'bi-battery-charging',
    title: 'IDC Range',
    desc: '160+ km IDC range on a single charge. 3.6 kWh Li-NMC battery. Home charging — your ride, your rules.',
  },
  {
    n: '03',
    icon: 'bi-piggy-bank-fill',
    title: 'Saving',
    desc: 'Just ₹0.25/km running cost. Save up to ₹80,000+ per year compared to petrol bikes. Earn back in 2 years, save for a lifetime.',
  },
  {
    n: '04',
    icon: 'bi-leaf-fill',
    title: 'Sustainability',
    desc: 'Zero direct emissions. Reduce your carbon footprint by 2.3 tonnes/year. Ride clean, ride green, ride proud.',
  },
]

export default function ValueProposition({
  label = 'Why CSR 762',
  titleStart = 'Why This',
  titleEnd  = 'Bike?',
  description = "The CSR 762 isn't just an electric motorcycle — it's a statement. Engineered for those who demand more, designed for those who deserve better.",
  cards = VALUE_CARDS,
}) {
  return (
    <section aria-label="ValueProposition" id="value">
      <div className="container">
        <div className="value-intro reveal">
          <div className="value-intro-heading">
            <span className="section-label">{label}</span>
            <h2 className="section-title display">
              {titleStart}<br />{titleEnd}
            </h2>
          </div>
          <div className="value-intro-copy">
            <p className="section-title-p">{description}</p>
          </div>
        </div>

        <div className="value-grid">
          {cards.map((c, i) => (
            <div
              key={c.n}
              className={`value-card reveal delay-${(i + 1) * 2}`}
            >
              <div className="value-number">{c.n}</div>
              <div className="value-icon">
                <i className={`bi ${c.icon}`} aria-hidden="true" />
              </div>
              <h3 className="value-title">{c.title}</h3>
              <p className="value-desc">{c.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
