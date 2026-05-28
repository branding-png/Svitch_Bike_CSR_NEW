// Blog category filter pills — mirrors CSR_New_web `.blog-filters`.
// Controlled component: parent owns the active category so the same value
// can drive the post list rendered below.
export const BLOG_CATEGORIES = [
  { id: 'all',     label: 'All Posts',          icon: 'bi-grid-fill'       },
  { id: 'tips',    label: 'Riding Tips',        icon: 'bi-lightbulb-fill'  },
  { id: 'news',    label: 'News & Launches',    icon: 'bi-megaphone-fill'  },
  { id: 'rides',   label: 'Rides & Adventures', icon: 'bi-geo-alt-fill'    },
  { id: 'sustain', label: 'Sustainability',     icon: 'bi-tree-fill'       },
  { id: 'tech',    label: 'Technology',         icon: 'bi-cpu-fill'        },
]

export default function BlogFilters({
  active = 'all',
  onChange,
  categories = BLOG_CATEGORIES,
}) {
  return (
    <div aria-label="BlogFilters" className="blog-filters" role="tablist">
      {categories.map((c) => (
        <button
          key={c.id}
          type="button"
          role="tab"
          aria-selected={active === c.id}
          className={'filter-pill' + (active === c.id ? ' is-active' : '')}
          onClick={() => onChange?.(c.id)}
        >
          <i className={`bi ${c.icon}`}></i> {c.label}
        </button>
      ))}
    </div>
  )
}
