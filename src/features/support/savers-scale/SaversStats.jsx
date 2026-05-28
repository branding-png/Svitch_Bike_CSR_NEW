// Stats strip on Saver's Scale — mirrors CSR_New_web `#savers-stats`.
const STATS = [
  { num: '₹0.25', unit: '/km', label: 'CSR 762 running cost' },
  { num: '92',    unit: '%',   label: 'Cheaper than petrol' },
  { num: '₹80K',  unit: '+',   label: 'Yearly savings (avg.)' },
  { num: '₹4L',   unit: '+',   label: '5-year savings' },
]

export default function SaversStats({ items = STATS }) {
  return (
    <section id="savers-stats">
      <div className="container">
        <div className="savers-stats-row">
          {items.map((s) => (
            <div key={s.label} className="card-base savers-stat">
              <strong>
                {s.num}
                {s.unit && <small>{s.unit}</small>}
              </strong>
              <span>{s.label}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
