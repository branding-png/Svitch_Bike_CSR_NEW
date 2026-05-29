import { Link } from 'react-router-dom'
import { useToast } from '@/contexts/ToastContext'
import { useUser } from '@/contexts/UserContext'

const STATUS_META = {
  delivered:  { icon: 'check-circle-fill', label: 'Delivered' },
  shipped:    { icon: 'truck',             label: 'Shipped' },
  processing: { icon: 'clock-history',     label: 'Processing' },
  cancelled:  { icon: 'x-circle-fill',     label: 'Cancelled' },
}

// Shared order card body. Status-specific wrappers (OrderDelivered, etc.)
// pass `actions` for the right-aligned button strip + use the order's
// `status` to drive the badge style.
export default function OrderCard({ order, actions }) {
  const status = STATUS_META[order.status] || STATUS_META.processing
  return (
    <div aria-label="OrderCard" className="card-base order-card" data-status={order.status}>
      <div className="order-card-head">
        <div>
          <div className="order-id">Order #{order.id}</div>
          <span className="order-date rajdhani-lbl-text-sm">{order.placedAt}</span>
        </div>
        <span className={`order-status ${order.status} rajdhani-lbl-text-sm`}>
          <i className={`bi bi-${status.icon}`}></i> {status.label}
        </span>
      </div>

      {order.items.map((item) => (
        <div key={item.title} className="order-item-row">
          <div className="order-item-img">
            <img src={item.img} alt={item.alt} loading="lazy" decoding="async" />
          </div>
          <div className="order-item-info">
            <h5>{item.title}</h5>
            <span>{item.meta}</span>
          </div>
          <span className="order-item-price">{item.price}</span>
        </div>
      ))}

      <div className="order-card-foot">
        <span className="order-total">Total: <strong style={{ color: 'var(--white)' }}>{order.total}</strong></span>
        <div className="order-actions">{actions}</div>
      </div>
    </div>
  )
}

// Shared action factories â€” used by all status-specific cards so the
// behaviour stays consistent.
export function useOrderActions(order, { onTrack } = {}) {
  const { show } = useToast()
  const { user } = useUser()

  function reorder() {
    show(`Reorder placed for ${order.id}. Check your cart.`, 'success', 3500)
  }
  function cancel() {
    show(`Cancellation request raised for ${order.id}.`, 'success', 3500)
  }
  function invoice() {
    const target = user?.email || 'your inbox'
    show(`Invoice for ${order.id} emailed to ${target}.`, 'success', 4000)
  }
  function track() { onTrack?.(order) }

  return {
    viewDetail: (
      <Link key="view" to={`/account/orders/${order.id}`} className="rajdhani-lbl-text-sm btn-csr primary order-action">
        <i className="bi bi-receipt"></i> View Detail
      </Link>
    ),
    track: (
      <button key="track" type="button" className="btn-csr secondary order-action" onClick={track}>
        <i className="bi bi-geo-alt"></i> Track
      </button>
    ),
    reorder: (
      <button key="reorder" type="button" className="btn-csr secondary order-action" onClick={reorder}>
        <i className="bi bi-arrow-clockwise"></i> Reorder
      </button>
    ),
    invoice: (
      <button key="invoice" type="button" className="btn-csr secondary order-action" onClick={invoice}>
        <i className="bi bi-file-earmark-pdf"></i> Invoice
      </button>
    ),
    cancel: (
      <button key="cancel" type="button" className="btn-csr secondary order-action tr-btn-cancel" onClick={cancel}>
        <i className="bi bi-x-circle"></i> Cancel
      </button>
    ),
  }
}
