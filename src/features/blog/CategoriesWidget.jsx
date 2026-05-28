import { BLOG_CATEGORIES } from './BlogFilters'

// Blog sidebar "Categories" widget — mirrors CSR_New_web `.widget-cats`.
// Controlled component: shares the same `active` category state as
// `<BlogFilters />` so the pills at the top and the sidebar links stay in sync.
//
// `counts` lets the parent pass per-category post counts; missing entries
// fall back to "—".
export default function CategoriesWidget({
  active   = 'all',
  onChange,
  counts   = {},
  categories = BLOG_CATEGORIES,
  title    = 'Categories',
}) {
  function pad(n) {
    return n == null ? '—' : String(n).padStart(2, '0')
  }

  return (
    <div className="card-base widget">
      <h3 className="widget-title">{title}</h3>
      <div className="widget-cats">
        {categories.map((c) => (
          <a
            key={c.id}
            href="#"
            className={active === c.id ? 'is-active' : ''}
            onClick={(e) => { e.preventDefault(); onChange?.(c.id) }}
          >
            {c.label}
            <span>{pad(counts[c.id])}</span>
          </a>
        ))}
      </div>
    </div>
  )
}
