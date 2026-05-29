import { Link, useNavigate } from 'react-router-dom'
import { PATHS } from '@/utils/routes'
import { useToast } from '@/contexts/ToastContext'

const UPCOMING = [
  {
    id:      'TR-580412',
    bookedAt:'Booked Apr 22, 2026',
    bike:    'CSR 762 NXE Pro â€” Crimson Red',
    colour:  'red',
    date:    '2026-05-04',                // ISO date used for prefill
    time:    '11:00 AM',                  // matches BookTestRideForm TIMES
    when:    'Sat, May 4 Â· 11:00 AM â€” 12:00 PM',
    where:   'Svitch Centre, Bandra West, Mumbai',
    city:    'Mumbai',
    slot:    '30 minutes',
    img:     '/images/product/csr-762-red.webp',
    alt:     'CSR 762',
  },
]

export default function TestRideUpcoming() {
  const navigate = useNavigate()
  const { show } = useToast()

  function reschedule(r) {
    const qs = new URLSearchParams({
      booking: r.id,
      date:    r.date,
      time:    r.time,
      colour:  r.colour,
      city:    r.city,
    })
    navigate(`${PATHS.bookTestRide}?${qs.toString()}`)
  }

  function cancel(id) { show(`Booking ${id} cancelled.`, 'success', 3000) }

  return (
    <div aria-label="TestRideUpcoming" className="account-section">
      <div className="account-section-head">
        <h3>Upcoming</h3>
        <Link className="rajdhani-lbl-text-sm" to={PATHS.bookTestRide}>Book another</Link>
      </div>

      {UPCOMING.map((r) => (
        <div key={r.id} className="card-base order-card" data-status="upcoming">
          <div className="order-card-head">
            <div>
              <div className="order-id">Booking #{r.id}</div>
              <span className="order-date rajdhani-lbl-text-sm">{r.bookedAt}</span>
            </div>
            <span className="order-status processing rajdhani-lbl-text-sm">
              <i className="bi bi-clock-history"></i> Confirmed
            </span>
          </div>
          <div className="order-item-row">
            <div className="order-item-img">
              <img src={r.img} alt={r.alt} loading="lazy" decoding="async" />
            </div>
            <div className="order-item-info">
              <h5>{r.bike}</h5>
              <span><i className="bi bi-calendar-event"></i> {r.when}</span><br />
              <span><i className="bi bi-geo-alt"></i> {r.where}</span>
            </div>
          </div>
          <div className="order-card-foot">
            <span className="order-total">Slot: <strong style={{ color: 'var(--white)' }}>{r.slot}</strong></span>
            <div className="order-actions">
              <button type="button" className="rajdhani-lbl-text-sm btn-csr secondary order-action" onClick={() => reschedule(r)}>
                <i className="bi bi-calendar-event"></i> Reschedule
              </button>
              <button type="button" className="rajdhani-lbl-text-sm btn-csr secondary order-action tr-btn-cancel" onClick={() => cancel(r.id)}>
                <i className="bi bi-x-circle"></i> Cancel
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}
