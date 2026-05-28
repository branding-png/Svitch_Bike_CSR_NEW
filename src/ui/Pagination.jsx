// Wrapper around .pagination. Numeric pages + prev/next arrows.
// Calls onChange(newPage) when the user clicks any page link.
export default function Pagination({ page, pageCount, onChange, className = '' }) {
  if (!pageCount || pageCount < 2) return null

  function go(e, p) {
    e.preventDefault()
    if (p < 1 || p > pageCount || p === page) return
    onChange?.(p)
  }

  // Compress: 1 … (p-1) p (p+1) … last
  const pages = []
  for (let i = 1; i <= pageCount; i++) {
    if (i === 1 || i === pageCount || (i >= page - 1 && i <= page + 1)) pages.push(i)
    else if (pages[pages.length - 1] !== '…') pages.push('…')
  }

  return (
    <div className={`pagination ${className}`}>
      {page > 1 && (
        <a href="#" onClick={(e) => go(e, page - 1)} aria-label="Previous">
          <i className="bi bi-arrow-left"></i>
        </a>
      )}
      {pages.map((p, i) =>
        p === '…' ? (
          <span key={`gap-${i}`} className="pagination-gap">…</span>
        ) : p === page ? (
          <span key={p} className="is-active">{p}</span>
        ) : (
          <a key={p} href="#" onClick={(e) => go(e, p)}>{p}</a>
        )
      )}
      {page < pageCount && (
        <a href="#" onClick={(e) => go(e, page + 1)} aria-label="Next">
          <i className="bi bi-arrow-right"></i>
        </a>
      )}
    </div>
  )
}
