import { Link } from 'react-router-dom'
import { useBookNow } from '@/contexts/BookNowContext'
import { PATHS } from '@/utils/routes'

// Bottom CTA card on Saver's Scale — mirrors CSR_New_web `#savers-cta`.
// "Book Now" surfaces the global BookNow modal via the shared context.
export default function SaversCta() {
  const { open: openBookNow } = useBookNow()

  return (
    <section id="savers-cta">
      <div className="container">
        <div className="savers-cta-card">
          <div>
            <span className="section-label rajdhani-lbl-text-sm">Ready To Save?</span>
            <h2 className="section-title">
              Book Your <span className="accent">CSR 762</span>
            </h2>
            <p>
              Reserve your bike, or schedule a test ride at your nearest
              dealer. Every day you wait is another day of petrol bills you
              did not need to pay.
            </p>
          </div>

          <div className="savers-cta-actions">
            <button type="button" className="btn-csr primary" onClick={openBookNow}>
              <i className="bi bi-lightning-charge-fill"></i> Book Now
            </button>
            <Link to={PATHS.bookTestRide} className="btn-csr secondary">
              <i className="bi bi-calendar-check"></i> Test Ride
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}
