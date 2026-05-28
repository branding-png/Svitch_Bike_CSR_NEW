import { Link } from 'react-router-dom'

// Breadcrumb trail. Pass an array of { label, to? } — last item is rendered
// as plain text (the current page). If `to` is omitted, item is non-clickable.
export default function BreadCrumb({ items = [], className = '' }) {
  if (!items.length) return null
  return (
    <nav className={`breadcrumb-csr rajdhani-lbl-text-sm ${className}`} aria-label="Breadcrumb">
      {items.map((it, i) => {
        const isLast = i === items.length - 1
        return (
          <span key={i} className={'crumb' + (isLast ? ' is-current' : '')}>
            {!isLast && it.to ? <Link to={it.to}>{it.label}</Link> : <span>{it.label}</span>}
            {!isLast && <i className="bi bi-chevron-right crumb-sep"></i>}
          </span>
        )
      })}
    </nav>
  )
}
