import { Link } from 'react-router-dom'

// Prev / Next post navigation — mirrors CSR_New_web `.post-nav`.
// Each side is optional — if `prev` or `next` is omitted, that slot just
// doesn't render so the surviving link can take the full row width.
export default function PostNav({
  prev = {
    slug:  'ahmedabad-to-vadodara-lite-xe',
    title: 'Riding Ahmedabad to Vadodara on the Svitch Lite XE',
  },
  next = {
    slug:  '10-tips-maximize-battery-life',
    title: '10 Tips to Maximize Your E-Bike Battery Life',
  },
}) {
  return (
    <div aria-label="PostNav" role="region" className="post-nav">
      {prev && (
        <Link to={`/blog/${prev.slug}`} className="rajdhani-lbl-text-sm card-base prev">
          <span className="nav-label rajdhani-lbl-text-sm">
            <i className="bi bi-arrow-left"></i> Previous Post
          </span>
          <h5>{prev.title}</h5>
        </Link>
      )}
      {next && (
        <Link to={`/blog/${next.slug}`} className="rajdhani-lbl-text-sm card-base next">
          <span className="nav-label rajdhani-lbl-text-sm">
            Next Post <i className="bi bi-arrow-right"></i>
          </span>
          <h5>{next.title}</h5>
        </Link>
      )}
    </div>
  )
}
