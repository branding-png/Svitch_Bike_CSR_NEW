import { useState } from 'react'
import PageHero from '@/layouts/PageHero'
import TrackOrderForm   from '@/features/shop/track-order/TrackOrderForm'
import TrackOrderHeader from '@/features/shop/track-order/TrackOrderHeader'
import TrackTimeline    from '@/features/shop/track-order/TrackTimeline'
import TrackHelpStrip   from '@/features/shop/track-order/TrackHelpStrip'
import { useToast }     from '@/contexts/ToastContext'
import { getOrder }     from '@/data/orders-data'
import '@/styles/pages/shop.css'
import '@/styles/sections/account.css'

// Map our canonical status → the badge config used by TrackOrderHeader.
const STATUS_BADGE = {
  delivered:  { label: 'Delivered',       cls: 'delivered',  icon: 'bi-check-circle-fill' },
  shipped:    { label: 'Out for Delivery',cls: 'shipped',    icon: 'bi-truck' },
  processing: { label: 'Processing',      cls: 'processing', icon: 'bi-clock-history' },
  cancelled:  { label: 'Cancelled',       cls: 'cancelled',  icon: 'bi-x-circle-fill' },
}

// The shared `.track-timeline` styles in account.css use `is-pending` for
// not-yet-started steps; the older legacy data file used `upcoming`. Map
// the order's detailedTimeline to the canonical state.
function mapTimelineState(s) {
  if (s === 'pending') return 'upcoming'
  return s
}

function adaptOrder(order) {
  const badge = STATUS_BADGE[order.status] || STATUS_BADGE.processing
  const firstItem = order.items[0]
  return {
    orderNum:    order.id,
    placedDate:  order.placedAt.replace(/^Placed\s+/i, ''),
    statusBadge: badge,
    model:       firstItem.title,
    itemMeta:    firstItem.meta,
    total:       order.total,
    image:       firstItem.img,
    carrier:     order.tracking?.carrier || 'Svitch Express',
    awb:         order.tracking?.awb     || 'Pending',
    statusLabel: badge.label,
    eta:         order.tracking?.eta     || '—',
    timeline: (order.detailedTimeline || []).map((s) => ({
      title: s.title,
      when:  s.when,
      desc:  s.desc || '',
      state: s.final ? 'done' : mapTimelineState(s.state),
    })),
  }
}

export default function TrackOrder() {
  const { show } = useToast()
  const [order, setOrder] = useState(null)
  const [notFound, setNotFound] = useState(false)

  function handleLookup(orderNum, _email) {
    const found = getOrder(orderNum)
    if (!found) {
      setNotFound(true)
      setOrder(null)
      show(`No order found for "${orderNum}". Check the number and try again.`, 'error', 4500)
      return
    }
    setNotFound(false)
    setOrder(adaptOrder(found))
  }

  return (
    <>
      <PageHero
        id="track-order-hero"
        label="Order Tracking"
        titleStart={<>Track Your </>}
        titleHighlight="Order"
        description="Enter your order number and the email used at checkout to see real-time status. No sign-in required."
      />

      <section className="track-section">
        <div className="container track-container">
          <TrackOrderForm onLookup={handleLookup} />

          {notFound && (
            <div className="card-base account-empty" style={{ marginTop: 24 }}>
              <i className="bi bi-search"></i>
              <h3>No matching order</h3>
              <p>Double-check the order number — it should look like SVT-847291.</p>
            </div>
          )}

          {order && (
            <div id="trackResult" className="track-result">
              <TrackOrderHeader order={order} />
              <TrackTimeline    stages={order.timeline} />
              <TrackHelpStrip   orderNum={order.orderNum} />
            </div>
          )}
        </div>
      </section>
    </>
  )
}
