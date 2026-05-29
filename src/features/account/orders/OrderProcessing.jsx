import OrderCard, { useOrderActions } from './OrderCard'

// Processing: View Â· Track Â· Cancel
export default function OrderProcessing({ order, onTrack }) {
  const a = useOrderActions(order, { onTrack })
  return <OrderCard aria-label="OrderProcessing" order={order} actions={[a.viewDetail, a.track, a.cancel]} />
}
