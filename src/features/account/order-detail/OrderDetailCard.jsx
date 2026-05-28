import { Link } from 'react-router-dom'
import { PATHS } from '@/utils/routes'
import { useToast } from '@/contexts/ToastContext'
import { useUser } from '@/contexts/UserContext'

const STATUS_META = {
  delivered:  { icon: 'check-circle-fill', label: 'Delivered' },
  shipped:    { icon: 'truck',             label: 'Shipped' },
  processing: { icon: 'clock-history',     label: 'Processing' },
  cancelled:  { icon: 'x-circle-fill',     label: 'Cancelled' },
}

export default function OrderDetailCard({ order }) {
  const { show } = useToast()
  const { user } = useUser()
  const status = STATUS_META[order.status] || STATUS_META.processing

  function sendInvoice() {
    const target = user?.email || 'your inbox'
    show(`Invoice for ${order.id} emailed to ${target}.`, 'success', 4000)
  }

  return (
    <div aria-label="OrderDetailCard" role="region" className="card-base order-card" data-status={order.status}>
      <div className="order-card-head">
        <div>
          <div className="order-id">Order #{order.id}</div>
          <span className="order-date rajdhani-lbl-text-sm">
            {order.placedAt} &middot; {order.delivery || 'Express Delivery'}
          </span>
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
        <div className="order-actions">
          <button type="button" className="rajdhani-lbl-text-sm btn-csr primary order-action" onClick={sendInvoice}>
            <i className="bi bi-download"></i> Invoice
          </button>
          <Link
            to={`${PATHS.trackOrder}?${new URLSearchParams({ id: order.id, ...(user?.email ? { email: user.email } : {}) }).toString()}`}
            className="rajdhani-lbl-text-sm btn-csr secondary order-action"
          >
            <i className="bi bi-geo-alt"></i> Track
          </Link>
          <Link to={`${PATHS.returnRequest}?order=${order.id}`} className="rajdhani-lbl-text-sm btn-csr secondary order-action">
            <i className="bi bi-arrow-counterclockwise"></i> Return / Replace
          </Link>
          <Link to={`${PATHS.ticket}?order=${order.id}`} className="rajdhani-lbl-text-sm btn-csr secondary order-action">
            <i className="bi bi-headset"></i> Get Help
          </Link>
        </div>
      </div>
    </div>
  )
}
