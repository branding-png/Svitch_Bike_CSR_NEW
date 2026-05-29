import OrderCard, { useOrderActions } from './OrderCard'

// Shipped: View Â· Track Â· Invoice Â· Cancel
export default function OrderShipped({ order, onTrack }) {
  const a = useOrderActions(order, { onTrack })
  return <OrderCard aria-label="OrderShipped" order={order} actions={[a.viewDetail, a.track, a.invoice, a.cancel]} />
}
