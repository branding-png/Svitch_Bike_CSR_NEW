import { Link } from 'react-router-dom'
import { PATHS } from '@/utils/routes'

// Single completed test ride card used by TestRidePastRides.
// Parent owns the feedback modal â€” we just bubble the click up.
export default function TestRideCompleted({ ride, onFeedback }) {
  return (
    <div aria-label="TestRideCompleted" className="card-base order-card" data-status="completed">
      <div className="order-card-head">
        <div>
          <div className="order-id">Booking #{ride.id}</div>
          <span className="order-date rajdhani-lbl-text-sm">{ride.date}</span>
        </div>
        <span className="order-status delivered rajdhani-lbl-text-sm">
          <i className="bi bi-check-circle-fill"></i> Completed
        </span>
      </div>
      <div className="order-item-row">
        <div className="order-item-img">
          <img src={ride.img} alt={ride.alt} loading="lazy" decoding="async" />
        </div>
        <div className="order-item-info">
          <h5>{ride.bike}</h5>
          <span><i className="bi bi-calendar-event"></i> {ride.when}</span><br />
          <span><i className="bi bi-geo-alt"></i> {ride.where}</span>
        </div>
      </div>
      <div className="order-card-foot">
        <span className="order-total">Status: <strong style={{ color: 'var(--white)' }}>Test ride done</strong></span>
        <div className="order-actions">
          <Link to={PATHS.shop} className="rajdhani-lbl-text-sm btn-csr primary order-action">
            <i className="bi bi-bag-check"></i> Buy Now
          </Link>
          <button type="button" className="rajdhani-lbl-text-sm btn-csr secondary order-action" onClick={() => onFeedback?.(ride.id)}>
            <i className="bi bi-chat-square-text"></i> Leave Feedback
          </button>
        </div>
      </div>
    </div>
  )
}
