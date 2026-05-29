import { Link } from 'react-router-dom'
import { PATHS } from '@/utils/routes'

// "You're unsubscribed" confirmation card â€” mirrors CSR_New_web `#unsubDone`.
export default function UnsubscribeDone({ email }) {
  return (
    <div aria-label="UnsubscribeDone" className="card-base unsub-card">
      <div className="unsub-icon is-success">
        <i className="bi bi-check2"></i>
      </div>
      <h2>You&apos;re unsubscribed</h2>
      <p>
        We&apos;ve removed <strong>{email}</strong> from our marketing list.
        You&apos;ll still get essential transactional emails.
      </p>
      <p className="unsub-rejoin">
        Changed your mind? You can re-subscribe anytime from your{' '}
        <Link to={PATHS.dashboard}>account dashboard</Link>.
      </p>
      <Link to={PATHS.home} className="btn-csr secondary unsub-home">
        <i className="bi bi-arrow-left"></i> Back to Home
      </Link>
    </div>
    
  )
}
