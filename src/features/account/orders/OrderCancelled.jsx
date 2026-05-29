import OrderCard, { useOrderActions } from './OrderCard'

// Cancelled: View Â· Reorder
export default function OrderCancelled({ order, onTrack }) {
  const a = useOrderActions(order, { onTrack })
  return <OrderCard aria-label="OrderCancelled" order={order} actions={[a.viewDetail, a.reorder]} />
}
