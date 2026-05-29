// Job detail header card â€” mirrors CSR_New_web `.job-header-card`.
// Pass `meta` as an array of { icon, text } so the pill list stays data-driven.
const DEFAULT_META = [
  { icon: 'bi-geo-alt-fill',  text: 'Ahmedabad, Gujarat'    },
  { icon: 'bi-clock-fill',    text: 'Full Time'             },
  { icon: 'bi-award-fill',    text: '3â€“6 Years Experience' },
  { icon: 'bi-calendar-event', text: 'Posted March 25, 2026' },
  { icon: 'bi-people-fill',   text: '2 Openings'            },
]

export default function JobHeader({
  dept = 'Engineering',
  title = 'Senior Electrical Engineer â€” E-Bike Systems',
  meta = DEFAULT_META,
}) {
  return (
    <div aria-label="JobHeader" className="card-base job-header-card">
      <span className="job-dept-tag">{dept}</span>
      <h1>{title}</h1>
      <div className="job-header-meta">
        {meta.map((m) => (
          <span key={m.text} className="job-meta-pill rajdhani-lbl-text-sm">
            <i className={`bi ${m.icon}`}></i> {m.text}
          </span>
        ))}
      </div>
    </div>
  )
}
