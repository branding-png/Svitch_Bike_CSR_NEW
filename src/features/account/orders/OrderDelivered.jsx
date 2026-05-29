import OrderCard, { useOrderActions } from './OrderCard'

// Delivered: View Â· Track (history) Â· Reorder Â· Invoice
export default function OrderDelivered({ order, onTrack }) {
  const a = useOrderActions(order, { onTrack })
  return <OrderCard aria-label="OrderDelivered" order={order} actions={[a.viewDetail, a.track, a.reorder, a.invoice]} />
}
