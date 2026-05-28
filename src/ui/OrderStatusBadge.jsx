// Wrapper around .order-status. Accepts any of the four canonical statuses
// (the colours live in sections/account.css).
const ICONS = {
  delivered:  'bi-check-circle-fill',
  shipped:    'bi-truck',
  processing: 'bi-clock-history',
  cancelled:  'bi-x-circle-fill',
}

const LABELS = {
  delivered:  'Delivered',
  shipped:    'Shipped',
  processing: 'Processing',
  cancelled:  'Cancelled',
}

export default function OrderStatusBadge({ status = 'processing', label, className = '' }) {
  const icon = ICONS[status] || ICONS.processing
  return (
    <span className={`order-status ${status} rajdhani-lbl-text-sm ${className}`}>
      <i className={`bi ${icon}`}></i> {label || LABELS[status] || status}
    </span>
  )
}
