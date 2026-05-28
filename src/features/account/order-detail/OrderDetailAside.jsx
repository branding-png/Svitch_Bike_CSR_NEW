// Right column on the order-detail page: Price Summary + Shipping Address
// + Payment. Each block is a small standalone card-base block.

function PriceSummary({ summary }) {
  return (
    <div className="card-base order-card">
      <div className="order-card-head">
        <div className="order-id">Price Summary</div>
      </div>
      <div className="od-sum-row"><span>Subtotal</span><span>{summary.subtotal}</span></div>
      <div className="od-sum-row"><span>Shipping</span>{summary.shippingFree ? <span className="od-free">FREE</span> : <span>{summary.shipping}</span>}</div>
      <div className="od-sum-row"><span>GST &middot; included</span><span>{summary.gst}</span></div>
      <div className="od-sum-row od-sum-total"><span>Total Paid</span><span>{summary.total}</span></div>
    </div>
  )
}

function ShippingAddress({ address }) {
  return (
    <div className="card-base order-card">
      <div className="order-card-head">
        <div className="order-id"><i className="bi bi-geo-alt-fill"></i> Shipping Address</div>
      </div>
      <strong style={{ color: 'var(--white)', fontFamily: 'var(--font-display)', display: 'block', marginBottom: 6 }}>
        {address.name}
      </strong>
      <p style={{ margin: '0 0 8px', color: 'var(--gray-300)', lineHeight: 1.6 }}>
        {address.line1}<br />
        {address.city}, {address.state} {address.pincode}<br />
        {address.country}
      </p>
      {address.phone && (
        <p style={{ margin: 0, color: 'var(--gray-500)' }}>
          <i className="bi bi-telephone"></i> {address.phone}
        </p>
      )}
    </div>
  )
}

function Payment({ payment }) {
  return (
    <div className="card-base order-card">
      <div className="order-card-head">
        <div className="order-id"><i className="bi bi-credit-card-2-front-fill"></i> Payment</div>
        <span className="order-status delivered rajdhani-lbl-text-sm">
          <i className="bi bi-check-circle-fill"></i> Paid
        </span>
      </div>
      <strong style={{ color: 'var(--white)', fontFamily: 'var(--font-display)', display: 'block', marginBottom: 6 }}>
        {payment.method}
      </strong>
      <p style={{ margin: 0, color: 'var(--gray-500)' }}>
        Transaction ID: <strong style={{ color: 'var(--white)' }}>{payment.txn}</strong>
      </p>
    </div>
  )
}

export default function OrderDetailAside({ order }) {
  return (
    <aside className="rajdhani-lbl-text-sm od-col-side">
      <PriceSummary  summary={order.summary} />
      <ShippingAddress address={order.address} />
      <Payment payment={order.payment} />
    </aside>
  )
}
