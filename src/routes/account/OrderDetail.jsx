import { Link, useParams } from 'react-router-dom'
import AccountLayout      from '@/features/account/AccountLayout'
import AccountContent     from '@/features/account/AccountContent'
import OrderDetailHeader  from '@/features/account/order-detail/OrderDetailHeader'
import OrderDetailCard    from '@/features/account/order-detail/OrderDetailCard'
import OrderDetailStatusTimeline from '@/features/account/order-detail/OrderDetailStatusTimeline'
import OrderRefundCard    from '@/features/account/order-detail/OrderRefundCard'
import OrderDetailAside   from '@/features/account/order-detail/OrderDetailAside'
import { getOrder } from '@/data/orders-data'
import { PATHS } from '@/utils/routes'
import '@/styles/sections/account.css'

export default function OrderDetail() {
  const { id } = useParams()
  const order  = getOrder(id)

  // Graceful fallback when the order id in the URL doesn't exist.
  if (!order) {
    return (
      <AccountLayout>
        <AccountContent crumbLabel="Order not found" title="Order not found"
          description={`We couldn't find an order with the id "${id}".`}
        >
          <div className="card-base account-empty">
            <i className="bi bi-receipt"></i>
            <h3>This order doesn&apos;t exist</h3>
            <p>The link may be broken or the order was removed.</p>
            <Link to={PATHS.orders} className="btn-csr primary">
              <i className="bi bi-arrow-left"></i> Back to My Orders
            </Link>
          </div>
        </AccountContent>
      </AccountLayout>
    )
  }

  return (
    <AccountLayout>
      <AccountContent crumbLabel={`Order #${order.id}`}>
        <OrderDetailHeader order={order} />

        <div className="od-grid">
          <div>
            <OrderDetailCard order={order} />
            {order.refund && <OrderRefundCard refund={order.refund} />}
            <OrderDetailStatusTimeline order={order} />
          </div>
          <OrderDetailAside order={order} />
        </div>
      </AccountContent>
    </AccountLayout>
  )
}
