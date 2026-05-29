import { Link } from 'react-router-dom'
import { getRecentPosts } from '@/data/blog'

// Blog sidebar "Recent Posts" — mirrors CSR_New_web `.widget-recent`.
// Pulls the top N posts from the shared blog data (default 3).
export default function RecentPostsWidget({
  title       = 'Recent Posts',
  limit       = 3,
  excludeSlug,
  posts       = null,
}) {
  const list = posts || getRecentPosts(limit, excludeSlug)
  return (
    <div aria-label="RecentPostsWidget" className="card-base widget">
      <h3 className="widget-title">{title}</h3>
      <div className="widget-recent">
        {list.map((p) => (
          <Link key={p.slug} to={`/blog/${p.slug}`} className="recent-item">
            <img src={p.image} alt={p.alt || p.title} loading="lazy" decoding="async" />
            <div className="recent-item-body">
              <h6 style={{textTransform:'normal'}}>{p.title}</h6>
              <span className="rajdhani-lbl-text-sm">{p.date}</span>
            </div>
          </Link>
        ))}
      </div>
    </div>
  )
}
