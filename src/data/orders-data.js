// Single source of truth for the demo orders. Both the Orders list page and
// the Order Detail page read from here, so the two stay in sync.
//
// Each order carries:
//   • Summary fields (id, status, placedAt, items, total)        ← used by
//     OrderCard / OrderPill on the My Orders list
//   • Tracking + detailedTimeline                                 ← used by
//     OrderTrackModal and OrderDetailStatusTimeline
//   • summary (subtotal/shipping/gst/total) + address + payment   ← used by
//     OrderDetailAside on the order-detail page

const PRODUCT_IMAGES = {
  red:   '/images/product/csr-762-red.webp',
  black: '/images/product/csr-762-black.webp',
  grey:  '/images/product/csr-762-gray-1.webp',
  swap:  '/images/product/csr-762-gray-Swappable-Battery.webp',
  helmet:'/images/product/blue.jpg',
}

export const ORDERS = [
  {
    id:        'SVT-847291',
    status:    'delivered',
    placedAt:  'Placed Mar 22, 2026',
    delivery:  'Express Delivery',
    total:     '₹1,31,250',
    items: [
      { title: 'NXE Pro — Crimson Red', meta: 'Color: Crimson Red · Qty: 1 · SKU CSR-NXE-PRO-RED', price: '₹1,25,000', img: PRODUCT_IMAGES.red,    alt: 'CSR 762 electric motorcycle in Racing Red' },
      { title: 'Svitch Smart Helmet',   meta: 'Color: Blue · Size: M · Qty: 1 · SKU SVT-ACC-HEL01', price: '₹6,250',   img: PRODUCT_IMAGES.helmet, alt: 'Svitch Smart Helmet' },
    ],
    tracking: { id: 'BD-9847123456', carrier: 'Bluedart Express', awb: 'SE-AWB-9981245', eta: 'Delivered Mar 26, 2026' },
    detailedTimeline: [
      { state: 'done',  title: 'Order placed',              when: 'Mar 22, 2026 · 11:42 AM' },
      { state: 'done',  title: 'Payment confirmed',         when: 'Mar 22, 2026 · 11:43 AM · UPI — arjun@okhdfcbank' },
      { state: 'done',  title: 'Dispatched from warehouse', when: 'Mar 23, 2026 · 4:18 PM · Bluedart Express' },
      { state: 'done',  title: 'Out for delivery',          when: 'Mar 26, 2026 · 8:02 AM' },
      { state: 'done',  title: 'Delivered',                 when: 'Mar 26, 2026 · 2:14 PM · Signed by Arjun', final: true },
    ],
    summary: { subtotal: '₹1,31,250', shippingFree: true, gst: '₹19,296', total: '₹1,31,250' },
    address: { name: 'Arjun Rider', line1: '14 Sahyadri Heights, Bandra West', city: 'Mumbai', state: 'Maharashtra', pincode: '400050', country: 'India', phone: '+91 98765 43210' },
    payment: { method: 'UPI · arjun@okhdfcbank', txn: 'TXN-9847123456' },
  },
  {
    id:        'SVT-731048',
    status:    'shipped',
    placedAt:  'Placed Mar 10, 2026',
    delivery:  'Standard Delivery',
    total:     '₹96,950',
    items: [
      { title: 'Lite XE — Sunburst Yellow', meta: 'Color: Yellow · Qty: 1 · SKU CSR-LITE-XE-YEL', price: '₹96,950', img: PRODUCT_IMAGES.swap, alt: 'CSR 762 Lite XE Sunburst Yellow' },
    ],
    tracking: { id: 'BD-7783201001', carrier: 'Bluedart Express', awb: 'SE-AWB-7783201', eta: 'Expected Mar 14, 2026' },
    detailedTimeline: [
      { state: 'done',    title: 'Order placed',              when: 'Mar 10, 2026 · 9:08 AM' },
      { state: 'done',    title: 'Payment confirmed',         when: 'Mar 10, 2026 · 9:09 AM · Card — HDFC ••••1234' },
      { state: 'done',    title: 'Dispatched from warehouse', when: 'Mar 11, 2026 · 6:20 PM · Bluedart Express' },
      { state: 'current', title: 'Out for delivery',          when: 'Mar 14, 2026 · 7:30 AM (expected)' },
      { state: 'pending', title: 'Delivered',                 when: 'Awaiting hand-off' },
    ],
    summary: { subtotal: '₹96,950', shippingFree: true, gst: '₹14,789', total: '₹96,950' },
    address: { name: 'Arjun Rider', line1: '14 Sahyadri Heights, Bandra West', city: 'Mumbai', state: 'Maharashtra', pincode: '400050', country: 'India', phone: '+91 98765 43210' },
    payment: { method: 'Card · HDFC ••••1234', txn: 'TXN-7783201001' },
  },
  {
    id:        'SVT-505100',
    status:    'cancelled',
    placedAt:  'Placed Feb 14, 2026',
    delivery:  'Standard Delivery',
    total:     '₹64,500',
    items: [
      { title: 'Lite XE — Stealth Black', meta: 'Color: Black · Qty: 1 · SKU CSR-LITE-XE-BLK', price: '₹64,500', img: PRODUCT_IMAGES.black, alt: 'CSR 762 Lite XE Stealth Black' },
    ],
    tracking: { id: 'Cancelled', carrier: '—', awb: '—', eta: '—' },
    detailedTimeline: [
      { state: 'done',      title: 'Order placed',      when: 'Feb 14, 2026 · 6:21 PM' },
      { state: 'cancelled', title: 'Cancelled by user', when: 'Feb 15, 2026 · 10:02 AM · Refund initiated to ICICI ••••5566' },
      { state: 'pending',   title: 'Refund processed',  when: 'Expected within 5–7 business days' },
    ],
    summary: { subtotal: '₹64,500', shippingFree: true, gst: '₹9,838', total: '₹0' },
    address: { name: 'Arjun Rider', line1: '14 Sahyadri Heights, Bandra West', city: 'Mumbai', state: 'Maharashtra', pincode: '400050', country: 'India', phone: '+91 98765 43210' },
    payment: { method: 'Card · ICICI ••••5566', txn: 'TXN-5051000001 (refund pending)' },
    // Refund flow (only present on cancelled orders). `progress` is the
    // 1-based index of the current step.
    refund: {
      id:       'REF-5051000001',
      amount:   '₹64,500',
      method:   'Card · ICICI ••••5566',
      eta:      'Feb 22, 2026',
      progress: 3,
      steps: [
        { title: 'Cancellation requested',      when: 'Feb 15, 2026 · 09:55 AM' },
        { title: 'Cancellation approved',       when: 'Feb 15, 2026 · 10:01 AM' },
        { title: 'Refund initiated',            when: 'Feb 15, 2026 · 10:02 AM' },
        { title: 'Refund processed by bank',    when: 'Expected by Feb 19, 2026' },
        { title: 'Amount credited to your account', when: 'Expected by Feb 22, 2026' },
      ],
    },
  },
  {
    id:        'SVT-619204',
    status:    'processing',
    placedAt:  'Placed Feb 28, 2026',
    delivery:  'Standard Delivery',
    total:     '₹74,999',
    items: [
      { title: 'XE Foldable — Stealth Gray', meta: 'Color: Stealth · Qty: 1 · SKU CSR-XE-FOLD-STL', price: '₹74,999', img: PRODUCT_IMAGES.grey, alt: 'CSR 762 XE Foldable Stealth Gray' },
    ],
    tracking: { id: 'Pending', carrier: 'Svitch Express', awb: 'Pending', eta: 'Expected Mar 6, 2026' },
    detailedTimeline: [
      { state: 'done',    title: 'Order placed',              when: 'Feb 28, 2026 · 7:45 PM' },
      { state: 'done',    title: 'Payment confirmed',         when: 'Feb 28, 2026 · 7:46 PM · Net banking — ICICI' },
      { state: 'current', title: 'Preparing for dispatch',    when: 'In our Pune fulfilment centre' },
      { state: 'pending', title: 'Out for delivery',          when: 'Not yet handed to courier' },
      { state: 'pending', title: 'Delivered',                 when: 'Awaiting hand-off' },
    ],
    summary: { subtotal: '₹74,999', shippingFree: true, gst: '₹11,440', total: '₹74,999' },
    address: { name: 'Arjun Rider', line1: '14 Sahyadri Heights, Bandra West', city: 'Mumbai', state: 'Maharashtra', pincode: '400050', country: 'India', phone: '+91 98765 43210' },
    payment: { method: 'Net banking · ICICI', txn: 'TXN-6192040001' },
  },
]

// Lookups —————————————————————————————————————————————————————————————

export function getOrder(id) {
  return ORDERS.find((o) => o.id === id) || null
}

// Track-modal timeline (data-driven, derived from each order) — keeps the
// existing OrderTrackModal happy without changing its API. It reads steps
// for the order's current status; we just expose the canonical five-step
// progression based on `status`.
const FULL_TIMELINE = [
  { key: 'placed',    title: 'Order Placed',      date: 'Mar 22, 2026', desc: 'Your order has been received.' },
  { key: 'paid',      title: 'Payment Confirmed', date: 'Mar 22, 2026', desc: 'Payment received and verified.' },
  { key: 'shipped',   title: 'Packed & Shipped',  date: 'May 16, 2026', desc: 'Parcel left our warehouse.' },
  { key: 'out',       title: 'Out for Delivery',  date: 'May 19, 2026', desc: 'Courier is on the way.' },
  { key: 'delivered', title: 'Delivered',         date: 'May 20, 2026', desc: 'Signed by customer. Hope you love it!' },
]

const PROGRESS_BY_STATUS = {
  delivered:  4,
  shipped:    3,
  processing: 2,
  cancelled:  1,
}

function buildTimeline(status) {
  const progress = PROGRESS_BY_STATUS[status] ?? 0
  return FULL_TIMELINE.map((step, i) => {
    let state
    if (status === 'cancelled' && i > progress) state = 'pending'
    else if (status === 'cancelled' && i === progress) state = 'cancelled'
    else if (i < progress) state = 'done'
    else if (i === progress) state = status === 'delivered' ? 'final' : 'current'
    else state = 'pending'

    const showDate = state === 'done' || state === 'final' || state === 'current' || state === 'cancelled'
    return { state, title: step.title, date: showDate ? step.date : '', desc: step.desc }
  })
}

export const TRACK_TIMELINE = {
  delivered:  buildTimeline('delivered'),
  shipped:    buildTimeline('shipped'),
  processing: buildTimeline('processing'),
  cancelled:  buildTimeline('cancelled'),
}
