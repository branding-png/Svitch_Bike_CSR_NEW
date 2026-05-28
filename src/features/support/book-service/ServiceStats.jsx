// Stats strip on the Book Service page — mirrors CSR_New_web `#service-stats`.
const STATS = [
  { icon: 'bi-tools',         num: '500', unit: '+',  label: 'Service Centres'   },
  { icon: 'bi-truck',         num: 'Free', unit: '',  label: 'Doorstep Pickup'   },
  { icon: 'bi-clock-history', num: '24',  unit: 'hr', label: 'Avg. Turnaround'   },
  { icon: 'bi-shield-check',  num: '3',   unit: 'yr', label: 'Warranty Coverage' },
]

export default function ServiceStats({ items = STATS, className = '' }) {
  return (
    <section id="service-stats" className={className}>
      <div className="container">
        <div className="service-stats-row">
          {items.map((s) => (
            <div key={s.label} className="card-base service-stat">
              <div className="card-base-icon mb-2 m-auto">
              <i className={`bi ${s.icon}`}></i>
              </div>
              <strong>
                {s.num}
                {s.unit && <small>{s.unit}</small>}
              </strong>
              <span className="rajdhani-lbl-text-sm">{s.label}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
