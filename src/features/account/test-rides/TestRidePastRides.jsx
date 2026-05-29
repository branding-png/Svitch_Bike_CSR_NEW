import { useState } from 'react'
import TestRideCompleted    from './TestRideCompleted'
import TestRideFeedbackModal from './TestRideFeedbackModal'

const PAST = [
  {
    id:    'TR-491823',
    date:  'Mar 30, 2026',
    bike:  'CSR 762 NXE Pro â€” Matte Black',
    when:  'Mar 30, 2026 Â· 4:00 PM â€” 5:00 PM',
    where: 'Svitch Centre, Andheri East, Mumbai',
    img:   '/images/product/csr-762-black.webp',
    alt:   'CSR 762 Black',
  },
  {
    id:    'TR-302148',
    date:  'Feb 12, 2026',
    bike:  'CSR 762 Lite XE â€” Graphite Grey',
    when:  'Feb 12, 2026 Â· 10:30 AM â€” 11:30 AM',
    where: 'Svitch Centre, Koramangala, Bengaluru',
    img:   '/images/product/csr-762-gray-1.webp',
    alt:   'CSR 762 Gray',
  },
]

export default function TestRidePastRides() {
  const [activeBookingId, setActiveBookingId] = useState(null)

  return (
    <div aria-label="TestRidePastRides" className="account-section">
      <div className="account-section-head"><h3>Past Rides</h3></div>
      {PAST.map((r) => (
        <TestRideCompleted key={r.id} ride={r} onFeedback={setActiveBookingId} />
      ))}

      <TestRideFeedbackModal
        isOpen={activeBookingId != null}
        bookingId={activeBookingId}
        onClose={() => setActiveBookingId(null)}
      />
    </div>
  )
}
