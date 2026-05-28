// CSR 762 vs Petrol head-to-head — mirrors CSR_New_web `#comparison`.
const EV = {
  icon:    'bi-lightning-charge-fill',
  name:    'CSR 762',
  tagline: 'Electric',
  cls:     'is-ev',
  bullet:  'bi-check-circle-fill',
  points: [
    '₹0.25 per km (home-charged)',
    'Zero tailpipe emissions',
    'Silent operation — no engine noise',
    'No oil changes, no clutch, no timing belt',
    'Instant torque from 0 RPM',
    'Home charging — no petrol pump queues',
    'FAME-II subsidy + GST benefit',
    '3-year / 35,000 km battery warranty',
  ],
}

const PETROL = {
  icon:    'bi-fuel-pump-fill',
  name:    'Petrol 150cc',
  tagline: 'Combustion',
  cls:     'is-petrol',
  bullet:  'bi-exclamation-circle-fill',
  points: [
    '₹2.80–₹3.30 per km',
    '~100 g CO₂ per km emitted',
    'Engine noise and vibration',
    'Oil, filter, chain, plug every 3–6 months',
    'Torque depends on RPM & gear',
    'Regular petrol-pump stops',
    'No subsidy — full GST applicable',
    'Typical 2-year engine warranty',
  ],
}

export default function EvVsPetrol() {
  return (
    <section id="comparison">
      <div className="container">
        <div className="section-header">
          <span className="section-label rajdhani-lbl-text-sm">Head to Head</span>
          <h2 className="section-title">
            CSR 762 vs <span className="accent">Petrol Bike</span>
          </h2>
          <p className="section-desc">
            Running cost is only the beginning. Here is how a petrol motorcycle
            compares across the things that matter.
          </p>
        </div>

        <div className="vs-grid">
          <VsCard column={EV} />
          <div className="vs-divider">VS</div>
          <VsCard column={PETROL} />
        </div>
      </div>
    </section>
  )
}

function VsCard({ column }) {
  return (
    <div className={`card-base vs-card ${column.cls}`}>
      <div className="vs-head">
        <div className="vs-head-icon"><i className={`bi ${column.icon}`}></i></div>
        <div>
          <h3>{column.name}</h3>
          <span className="rajdhani-lbl-text-sm">{column.tagline}</span>
        </div>
      </div>
      <ul className="vs-list">
        {column.points.map((p) => (
          <li key={p}>
            <i className={`bi ${column.bullet}`}></i> {p}
          </li>
        ))}
      </ul>
    </div>
  )
}
