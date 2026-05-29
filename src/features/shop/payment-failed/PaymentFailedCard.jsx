import { Link } from 'react-router-dom'
import { PATHS } from '@/utils/routes'
import { EMAILS, PHONES, emailHref, phoneHref } from '@/data/contact-info'

// Transaction-declined card on the Payment Failed page.
// Mirrors CSR_New_web `.fail-card`.
const REASONS = [
  'Insufficient balance or daily limit exceeded',
  'Bank declined the transaction',
  'Network interruption during payment',
  'Card details entered incorrectly',
]

export default function PaymentFailedCard({ orderRef = 'SVC-2026-04812' }) {
  return (
    <div aria-label="PaymentFailedCard" className="card-base fail-card">
      <div className="fail-icon">
        <i className="bi bi-x-lg"></i>
      </div>

      <h2 style={{ marginBottom: 10 }}>Transaction Declined</h2>
      <p>Order reference: <strong id="orderRef">{orderRef}</strong></p>
      <p style={{ marginTop: 8 }}>
        No amount has been debited. If anything was deducted, it will be
        auto-refunded within 5â€“7 business days.
      </p>

      <ul className="fail-reasons">
        {REASONS.map((r) => (
          <li key={r}><i className="bi bi-info-circle"></i> {r}</li>
        ))}
      </ul>

      <div className="fail-actions">
        <Link to={PATHS.checkout} className="btn-csr primary">
          <i className="bi bi-arrow-clockwise"></i> Retry Payment
        </Link>
        <Link to={PATHS.cart} className="btn-csr secondary">
          <i className="bi bi-cart3"></i> Back to Cart
        </Link>
        <Link to={PATHS.ticket} className="btn-csr secondary">
          <i className="bi bi-headset"></i> Get Help
        </Link>
      </div>

      <p style={{ marginTop: 30, fontSize: 'var(--fs-sm)' }}>
        Need urgent help? Call{' '}
        <a className="accent" href={phoneHref('headOffice')}>
          {PHONES.headOffice.phone}
        </a>{' '}
        or email{' '}
        <a className="accent" href={emailHref('support')}>
          {EMAILS.support.address}
        </a>
      </p>
    </div>
  )
}
