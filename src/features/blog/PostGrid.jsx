import { useEffect, useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import { BLOGS } from '@/data/blog'

// Blog post grid + pagination — mirrors CSR_New_web `.post-grid` + `.pagination`.
// Filters by `cat` ('all' shows everything) and `query`. Pulls from @/data/blog
// so the same posts power the detail page when clicked.
const PAGE_SIZE = 8

export default function PostGrid({
  posts    = BLOGS,
  cat      = 'all',
  query    = '',
  pageSize = PAGE_SIZE,
  page: pageProp,
  onPageChange,
}) {
  const [pageLocal, setPageLocal] = useState(1)
  const page = pageProp ?? pageLocal
  const setPage = onPageChange ?? setPageLocal

  // Search matches title, excerpt, and category label so typing "battery"
  // finds posts by topic or section name.
  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase()
    return posts
      .filter((p) => cat === 'all' || p.cat === cat)
      .filter((p) => {
        if (!q) return true
        return (
          p.title.toLowerCase().includes(q) ||
          p.excerpt.toLowerCase().includes(q) ||
          p.catLabel.toLowerCase().includes(q)
        )
      })
  }, [posts, cat, query])

  // Reset to page 1 whenever the filter/query changes.
  useEffect(() => { setPage(1) }, [cat, query]) // eslint-disable-line react-hooks/exhaustive-deps

  const pageCount = Math.max(1, Math.ceil(filtered.length / pageSize))
  const start     = (page - 1) * pageSize
  const visible   = filtered.slice(start, start + pageSize)

  function goto(n) {
    if (n < 1 || n > pageCount) return
    setPage(n)
    const target = document.getElementById('blog-main')
    if (target) {
      const top = target.getBoundingClientRect().top + window.scrollY - 80
      window.scrollTo({ top, behavior: 'smooth' })
    }
  }

  return (
    <>
      <div className="post-grid"  aria-label="PostGrid">
        {visible.length === 0 ? (
          <p className="rajdhani-lbl-text-sm" style={{ opacity: 0.7 }}>
            {query
              ? `No posts match "${query}". Try a different keyword or category.`
              : 'No posts in this category yet — check back soon.'}
          </p>
        ) : (
          visible.map((p) => (
            <Link
              key={p.slug}
              to={`/blog/${p.slug}`}
              className="p-0 card-base post-card"
              data-cat={p.cat}
            >
              <div className="post-card-media">
                <span className="post-cat">{p.catLabel}</span>
                <img src={p.image} alt={p.alt} loading="lazy" decoding="async" />
              </div>
              <div className="post-card-body">
                <h3>{p.title}</h3>
                <div className="post-meta rajdhani-lbl-text-sm">
                  <span><i className="bi bi-calendar-event"></i> {p.date}</span>
                  <span><i className="bi bi-clock"></i> {p.readTime}</span>
                </div>
                <p>{p.excerpt}</p>
                <span className="read-more">Read More <i className="bi bi-arrow-right"></i></span>
              </div>
            </Link>
          ))
        )}
      </div>

      {pageCount > 1 && (
        <div className="pagination">
          {Array.from({ length: pageCount }).map((_, i) => {
            const n = i + 1
            return n === page ? (
              <span key={n} className="is-active">{n}</span>
            ) : (
              <a key={n} href="#" onClick={(e) => { e.preventDefault(); goto(n) }}>{n}</a>
            )
          })}
          {page < pageCount && (
            <a href="#" onClick={(e) => { e.preventDefault(); goto(page + 1) }}>
              <i className="bi bi-arrow-right"></i>
            </a>
          )}
        </div>
      )}
    </>
  )
}
