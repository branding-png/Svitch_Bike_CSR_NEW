import { Link } from 'react-router-dom'
import { PATHS } from '@/utils/routes'

// Map a return's action.kind → real destination so card buttons go somewhere.
function actionHref(item) {
  const k = item.action?.kind
  if (k === 'detail')  return `${PATHS.returnRequest}?id=${item.id}`
  if (k === 'track')   return `${PATHS.trackOrder}?id=${item.order}`
  if (k === 'invoice') return PATHS.invoices
  if (k === 'appeal')  return PATHS.ticket
  return PATHS.returnRequest
}

// Single return card. Mirrors legacy `.return-card` markup so existing CSS
// (returns.css) styles apply directly.
export default function ReturnCard({ item }) {
  const showReasonPrefix = item.status !== 'refunded' && item.status !== 'rejected'
  return (
    <div className="card-base return-card" data-status={item.status}>
      <img src={item.image} alt={item.alt || item.item} loading="lazy" decoding="async" />

      <div>
        <h4>{item.item}</h4>
        <div className="return-meta">
          <span>RMA #{item.id}</span>
          <span>Order #{item.order}</span>
          <span>{item.requestedAt}</span>
        </div>
        <p style={{ marginTop: 8, color: 'var(--gray-300)', fontSize: 'var(--fs-sm)' }}>
          {showReasonPrefix ? 'Reason: ' : ''}{item.reason}
        </p>
      </div>

      <div className="return-actions">
        <span className={`return-status ${item.status}`}>{item.statusLabel}</span>
        <Link to={actionHref(item)} className="btn-csr secondary sm">
          {item.action?.icon && <i className={`bi bi-${item.action.icon}`}></i>}{' '}
          {item.action?.label || 'View Details'}
        </Link>
      </div>
    </div>
  )
}
