import { Link } from 'react-router-dom'
import { PATHS } from '@/utils/routes'

export default function TestRideCTA() {
  return (
    <div aria-label="TestRideCTA" role="region" className="account-section" style={{ textAlign: 'center', paddingTop: 20 }}>
      <h4 style={{ marginBottom: 10 }}>Want to ride a different model?</h4>
      <p style={{ marginBottom: 18 }}>
        Book a free test ride from any of 50+ Svitch service centres.
      </p>
      <Link to={PATHS.bookTestRide} className="btn-csr primary">
        <i className="bi bi-bicycle"></i> Book Another Test Ride
      </Link>
    </div>
  )
}
