import OrderCard, { useOrderActions } from './OrderCard'

// Processing: View · Track · Cancel
export default function OrderProcessing({ order, onTrack }) {
  const a = useOrderActions(order, { onTrack })
  return <OrderCard order={order} actions={[a.viewDetail, a.track, a.cancel]} />
}
