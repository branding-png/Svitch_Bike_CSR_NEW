// Shipping + Payment two-column card pair on the Order Confirmation page.
// Mirrors CSR_New_web `.oc-info-grid`. Both cards are driven by props so the
// route can swap in real order data later.
const DEFAULTS = {
  shipping: {
    name:    'Arjun Rider',
    address: ['14 Sahyadri Heights, Bandra West', 'Mumbai 400050, Maharashtra'],
    phone:   '+91 98765 43210',
    eta:     'Mar 26 – 29, 2026',
  },
  payment: {
    method:  'UPI',
    icon:    'bi-qr-code',
    upiId:   'arjun@okhdfcbank',
    txn:     'TXN-9847123456',
    amount:  '₹1,47,500',
    status:  'Paid',
  },
}

export default function OrderShippingPayment({
  shipping = DEFAULTS.shipping,
  payment  = DEFAULTS.payment,
}) {
  return (
    <div className="oc-info-grid">
      {/* Shipping */}
      <div className="card-base oc-info-card">
        <div className="oc-info-head">
          <span className="oc-info-icon"><i className="bi bi-geo-alt-fill"></i></span>
          <h3>Shipping Address</h3>
        </div>

        <div className="oc-info-body">
          <p className="oc-info-name">{shipping.name}</p>
          {shipping.address.map((line) => (
            <p key={line} className="oc-info-line">{line}</p>
          ))}
          {shipping.phone && (
            <p className="oc-info-line">
              <i className="bi bi-telephone"></i> {shipping.phone}
            </p>
          )}
        </div>

        <div className="oc-info-highlight">
          <i className="bi bi-calendar-check"></i>
          <div>
            <span className="oc-info-highlight-label rajdhani-lbl-text-sm">
              Expected Delivery
            </span>
            <strong>{shipping.eta}</strong>
          </div>
        </div>
      </div>

      {/* Payment */}
      <div className="card-base oc-info-card">
        <div className="oc-info-head">
          <span className="oc-info-icon"><i className="bi bi-credit-card-fill"></i></span>
          <h3>Payment</h3>
          <span className="order-status delivered oc-info-badge rajdhani-lbl-text-sm">
            <i className="bi bi-check-circle-fill"></i> {payment.status}
          </span>
        </div>

        <div className="oc-info-body">
          <div className="oc-info-row">
            <span className="oc-info-label rajdhani-lbl-text-sm">Method</span>
            <span className="oc-info-value">
              {payment.icon && <i className={`bi ${payment.icon}`}></i>} {payment.method}
            </span>
          </div>
          {payment.upiId && (
            <div className="oc-info-row">
              <span className="oc-info-label rajdhani-lbl-text-sm">UPI ID</span>
              <span className="oc-info-value">{payment.upiId}</span>
            </div>
          )}
          {payment.txn && (
            <div className="oc-info-row">
              <span className="oc-info-label rajdhani-lbl-text-sm">Transaction ID</span>
              <span className="oc-info-value mono">{payment.txn}</span>
            </div>
          )}
        </div>

        <div className="oc-info-highlight oc-info-highlight-success">
          <i className="bi bi-check-circle-fill"></i>
          <div>
            <span className="oc-info-highlight-label rajdhani-lbl-text-sm">
              Amount Paid
            </span>
            <strong>{payment.amount}</strong>
          </div>
        </div>
      </div>
    </div>
  )
}
