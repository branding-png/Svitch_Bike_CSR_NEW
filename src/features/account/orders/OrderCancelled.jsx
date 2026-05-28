import OrderCard, { useOrderActions } from './OrderCard'

// Cancelled: View · Reorder
export default function OrderCancelled({ order, onTrack }) {
  const a = useOrderActions(order, { onTrack })
  return <OrderCard order={order} actions={[a.viewDetail, a.reorder]} />
}
