import OrderCard, { useOrderActions } from './OrderCard'

// Cancelled: View · Reorder
export default function OrderCancelled({ order, onTrack }) {
  const a = useOrderActions(order, { onTrack })
  return <OrderCard aria-label="OrderCancelled" role="region" order={order} actions={[a.viewDetail, a.reorder]} />
}
