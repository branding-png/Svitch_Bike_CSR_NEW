import { useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import AccountLayout    from '@/features/account/AccountLayout'
import AccountContent   from '@/features/account/AccountContent'
import OrderPill        from '@/features/account/orders/OrderPill'
import OrderDelivered   from '@/features/account/orders/OrderDelivered'
import OrderShipped     from '@/features/account/orders/OrderShipped'
import OrderProcessing  from '@/features/account/orders/OrderProcessing'
import OrderCancelled   from '@/features/account/orders/OrderCancelled'
import OrderTrackModal  from '@/features/account/orders/OrderTrackModal'
import { ORDERS }       from '@/data/orders-data'
import { PATHS }        from '@/utils/routes'
import '@/styles/sections/account.css'

const STATUS_TO_COMPONENT = {
  delivered:  OrderDelivered,
  shipped:    OrderShipped,
  processing: OrderProcessing,
  cancelled:  OrderCancelled,
}

export default function Orders() {
  const [activeTab, setActiveTab] = useState('all')
  const [trackingOrder, setTrackingOrder] = useState(null)

  const filtered = useMemo(
    () => (activeTab === 'all' ? ORDERS : ORDERS.filter((o) => o.status === activeTab)),
    [activeTab],
  )

  return (
    <AccountLayout>
      <AccountContent
        crumbLabel="My Orders"
        title="My Orders"
        description="Track your recent orders, reorder favourites, or raise a return."
      >
        <OrderPill active={activeTab} onChange={setActiveTab} />

        {filtered.length === 0 ? (
          <div className="card-base account-empty">
            <i className="bi bi-bag-x"></i>
            <h3>No orders found</h3>
            <p>You haven&apos;t placed any orders matching this filter yet.</p>
            <Link to={PATHS.shop} className="btn-csr primary">
              <i className="bi bi-bag"></i> Shop Now
            </Link>
          </div>
        ) : (
          filtered.map((order) => {
            const Component = STATUS_TO_COMPONENT[order.status] || OrderProcessing
            return (
              <Component
                key={order.id}
                order={order}
                onTrack={setTrackingOrder}
              />
            )
          })
        )}

        <OrderTrackModal
          isOpen={trackingOrder != null}
          order={trackingOrder}
          onClose={() => setTrackingOrder(null)}
        />
      </AccountContent>
    </AccountLayout>
  )
}
