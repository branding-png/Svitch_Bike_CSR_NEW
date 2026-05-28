import OrderCard, { useOrderActions } from './OrderCard'

// Shipped: View · Track · Invoice · Cancel
export default function OrderShipped({ order, onTrack }) {
  const a = useOrderActions(order, { onTrack })
  return <OrderCard order={order} actions={[a.viewDetail, a.track, a.invoice, a.cancel]} />
}
