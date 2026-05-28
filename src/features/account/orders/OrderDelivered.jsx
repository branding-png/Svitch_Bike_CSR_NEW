import OrderCard, { useOrderActions } from './OrderCard'

// Delivered: View · Track (history) · Reorder · Invoice
export default function OrderDelivered({ order, onTrack }) {
  const a = useOrderActions(order, { onTrack })
  return <OrderCard order={order} actions={[a.viewDetail, a.track, a.reorder, a.invoice]} />
}
