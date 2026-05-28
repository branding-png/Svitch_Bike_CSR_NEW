import { Link } from 'react-router-dom'
import { PATHS } from '@/utils/routes'
import { useToast } from '@/contexts/ToastContext'

// Bottom action row on the Order Confirmation page.
// `repeat(auto-fit, minmax(...))` makes the 4 buttons sit in a row on desktop,
// two-up on tablet, and stack full-width on mobile — no media queries needed.
export default function OrderActions({ orderId = 'SVT-847291' }) {
  const { show } = useToast()

  const handleInvoice = (e) => {
    e.preventDefault()
    show('Invoice download will be available once your order ships.', 'info')
  }

  return (
    <div className="order-actions-row">
      <Link
        to={`${PATHS.trackOrder}?id=${orderId}`}
        className="btn-csr primary"
      >
        <i className="bi bi-geo-alt" aria-hidden="true"></i> Track Order
      </Link>
      <Link
        to={`/account/orders/${orderId}`}
        className="btn-csr secondary"
      >
        <i className="bi bi-receipt" aria-hidden="true"></i> View Order Detail
      </Link>
      <a
        href="#"
        className="btn-csr secondary"
        onClick={handleInvoice}
      >
        <i className="bi bi-download" aria-hidden="true"></i> Download Invoice
      </a>
      <Link
        to={PATHS.shop}
        className="btn-csr secondary"
      >
        Continue Shopping <i className="bi bi-arrow-right" aria-hidden="true"></i>
      </Link>
    </div>
  )
}
