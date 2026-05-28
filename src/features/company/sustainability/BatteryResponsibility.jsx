// Battery responsibility — mirrors CSR_New_web `#sus-battery`.
const FACTS = [
  'Free battery take-back at all 500+ Svitch dealers — no charge, ever.',
  "Partnership with Attero Recycling — India's largest certified battery recycler.",
  '95% material recovery rate — lithium, cobalt, nickel, manganese all reclaimed.',
  'Chain-of-custody certificates for every battery returned — full traceability.',
  'Batteries with residual capacity repurposed as stationary storage before final recycling.',
]

export default function BatteryResponsibility({ facts = FACTS }) {
  return (
    <section id="sus-battery">
      <div className="container">
        <div className="battery-layout">
          <div>
            <span className="section-label">Battery Responsibility</span>
            <h2 className="section-title">
              We Own What <span className="accent">We Sell</span>
            </h2>
            <p style={{ marginTop: 18, fontSize: 'var(--fs-lg)' }}>
              Lithium-ion batteries contain valuable, finite materials. We believe
              manufacturers — not consumers or landfills — should be responsible for
              what happens to a battery at end-of-life.
            </p>
            <div className="battery-facts">
              {facts.map((f) => (
                <div key={f} className="battery-fact">
                  <i className="bi bi-check-circle-fill"></i>{f}
                </div>
              ))}
            </div>
          </div>
          <div className="card-base battery-visual">
            <i className="bi bi-battery-charging battery-icon-big"></i>
            <div className="battery-caption rajdhani-lbl-text-sm">
              NMC cell · 3.2 kWh · 1,500+ cycles
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
