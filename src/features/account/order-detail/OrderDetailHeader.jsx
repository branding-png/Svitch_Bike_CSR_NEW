import { Link } from 'react-router-dom'
import { PATHS } from '@/utils/routes'

export default function OrderDetailHeader({ order }) {
  const itemCount = order.items.length
  return (
    <div className="account-header">
      <Link to={PATHS.orders} className="account-back-link rajdhani-lbl-text-sm">
        <i className="bi bi-arrow-left"></i> Back to Orders
      </Link>
      <h1>Order <span>#{order.id}</span></h1>
      <p>
        Placed on <strong>{order.placedAt.replace(/^Placed\s+/i, '')}</strong> &middot;{' '}
        {itemCount} item{itemCount === 1 ? '' : 's'} &middot;{' '}
        Total <strong>{order.total}</strong>
      </p>
    </div>
  )
}
