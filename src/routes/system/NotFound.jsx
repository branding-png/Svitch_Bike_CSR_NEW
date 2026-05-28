import { Link } from 'react-router-dom'
import { PATHS } from '@/utils/routes'
import '@/styles/pages/notfound.css'

const QUICK_LINKS = [
  { to: PATHS.shop,           icon: 'bag',             label: 'Shop' },
  { to: PATHS.specifications, icon: 'file-text',       label: 'Specs' },
  { to: PATHS.dealers,        icon: 'shop',            label: 'Dealers' },
  { to: PATHS.faq,            icon: 'question-circle', label: 'FAQ' },
  { to: PATHS.blog,           icon: 'newspaper',       label: 'Blog' },
  { to: PATHS.sitemap,        icon: 'grid-3x3-gap',    label: 'Sitemap' },
]

export default function NotFound() {
  return (
    <section id="not-found" className="section-pad">
      <div className="container">
        <div className="err-wrap">
          <div className="err-code">404</div>
          <div className="err-icon"><i className="bi bi-compass"></i></div>
          <span className="err-label">Error 404 &middot; Road not found</span>
          <h1 className="section-title">
            Wrong Turn.<br /><span className='highlight'> Let&apos;s Get You Back.</span>
          </h1>
          <p className="err-sub">
            The page you&apos;re looking for doesn&apos;t exist or may have moved.
            Don&apos;t worry &mdash; we&apos;ll help you get back on the road.
          </p>

          <div className="err-btns">
            <Link to={PATHS.home} className="btn-csr primary">
              <i className="bi bi-house-fill"></i> Back to Home
            </Link>
            <Link to={PATHS.contact} className="btn-csr secondary">
              <i className="bi bi-headset"></i> Contact Support
            </Link>
          </div>

          <div className="err-quick">
            {QUICK_LINKS.map((q) => (
              <Link key={q.label} to={q.to}>
                <i className={`bi bi-${q.icon}`}></i> {q.label}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
