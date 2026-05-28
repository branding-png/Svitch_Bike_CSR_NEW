import { Link } from 'react-router-dom'
import { PATHS } from '@/utils/routes'

// Card 3 — Help / actions strip at the bottom of the tracking result.
export default function TrackHelpStrip({ orderNum }) {
  return (
    <div className="card-base track-help-strip">
      <div className="track-help-strip-text">
        <h3>Need help with this order?</h3>
        <span>Delivery questions, returns, warranty — our team is here.</span>
      </div>

      <div className="track-help-strip-cta">
        <Link to={PATHS.contact} className="btn-csr secondary sm">
          <i className="bi bi-headset"></i> Contact Support
        </Link>
        <Link to={`/account/orders/${orderNum}`} className="btn-csr primary sm">
          <i className="bi bi-receipt"></i> View Full Order
        </Link>
      </div>
    </div>
  )
}
