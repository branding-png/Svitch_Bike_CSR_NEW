import { Link } from 'react-router-dom'

// Sidebar "Similar Openings" widget — mirrors CSR_New_web `.snapshot-widget`
// reused for the related-jobs panel. Slugs link into /careers/{slug}.
const DEFAULT_ITEMS = [
  { slug: 'software-engineer-iot',     icon: 'bi-cpu-fill',       title: 'Software Engineer — IoT & Firmware', meta: 'Engineering · Ahmedabad · Full Time' },
  { slug: 'product-designer-industrial', icon: 'bi-palette-fill', title: 'Product Designer — Industrial Design', meta: 'Design · Ahmedabad · Full Time'     },
  { slug: 'ui-ux-designer',            icon: 'bi-display',        title: 'UI/UX Designer — App & Web',         meta: 'Design · Remote · Full Time'         },
  { slug: 'digital-marketing-manager', icon: 'bi-megaphone-fill', title: 'Digital Marketing Manager',          meta: 'Marketing · Ahmedabad / Remote'      },
]

export default function SimilarOpenings({ title = 'Similar Openings', items = DEFAULT_ITEMS }) {
  return (
    <div aria-label="SimilarOpenings" role="region" className="card-base snapshot-widget">
      <h4>{title}</h4>
      <div className="similar-list">
        {items.map((j) => (
          <Link key={j.slug} to={`/careers/${j.slug}`} className="similar-item">
            <i className={`bi ${j.icon}`}></i>
            <div className="similar-body">
              <h5>{j.title}</h5>
              <span>{j.meta}</span>
            </div>
          </Link>
        ))}
      </div>
    </div>
  )
}
