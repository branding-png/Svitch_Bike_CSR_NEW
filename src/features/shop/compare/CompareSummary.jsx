// At-a-glance summary cards — top of the Compare page.
// Mirrors CSR_New_web `.cmp-summary-grid`.
const SUMMARY = [
  {
    icon:  'bi-speedometer2',
    num:   '160',
    unit:  'KM',
    label: 'IDC Range — Best in Class',
  },
  {
    icon:  'bi-piggy-bank-fill',
    num:   '₹48k',
    unit:  '/YR',
    label: 'Saved vs Petrol Bike',
  },
  {
    icon:  'bi-leaf-fill',
    num:   '1.0',
    unit:  <>T CO<sub>2</sub></>,
    label: 'Annual Emissions Avoided',
  },
]

export default function CompareSummary({ items = SUMMARY }) {
  return (
    <div className="cmp-summary-grid">
      {items.map((s) => (
        <div key={s.label} className="card-base cmp-summary-card">
          <div className="cmp-summary-icon">
            <i className={`bi ${s.icon}`}></i>
          </div>
          <span className="cmp-summary-num">
            {s.num}
            {s.unit && <small>{s.unit}</small>}
          </span>
          <span className="cmp-summary-label">{s.label}</span>
        </div>
      ))}
    </div>
  )
}
