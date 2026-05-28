// Home charging cost comparison — mirrors CSR_New_web `#cn-home`.
const FACTS = [
  '15A portable charger included with every CSR 762.',
  'Works with any standard 15A Indian socket.',
  'Smart charging via app — schedule off-peak hours.',
  'Built-in surge protection on the charger.',
  'Optional wall-mount installation via authorised dealer.',
]

const COST_ROWS = [
  {
    label: 'Cost per full charge',
    value: '₹19',
    valueCls: 'accent',
    note: 'at ₹6/unit · 3.2 kWh battery',
  },
  {
    label: 'Equivalent petrol cost',
    value: '₹467',
    valueCls: 'dim',
    note: 'at ₹105/litre · 45 kmpl · 200 km',
  },
]

export default function HomeCharging() {
  return (
    <section id="cn-home">
      <div className="container">
        <div className="section-header">
          <span className="section-label">Home Charging</span>
          <h2 className="section-title">
            Your Home Is Your <span className="accent">Fuel Station</span>
          </h2>
        </div>

        <div className="home-layout">
          <div>
            <p className="rajdhani-lbl-text-sm cn-home-lead">
              90% of Svitch owners charge at home overnight. At ₹6 per unit,
              a full charge of the CSR 762 costs roughly <strong>₹19</strong> —
              enough for 200 km of riding.
            </p>
            <div className="home-facts">
              {FACTS.map((f) => (
                <div key={f} className="home-fact">
                  <i className="bi bi-check-circle-fill"></i>
                  {f}
                </div>
              ))}
            </div>
          </div>

          <div className="card-base cost-card">
            {COST_ROWS.map((r) => (
              <div key={r.label} className="cost-row">
                <span className="cost-label rajdhani-lbl-text-sm">{r.label}</span>
                <div className={`cost-value ${r.valueCls}`}>{r.value}</div>
                <p className="cost-note">{r.note}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
