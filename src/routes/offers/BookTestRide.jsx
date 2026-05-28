import { Link } from 'react-router-dom'
import PageHero from '@/layouts/PageHero'
import BookTestRideForm from '@/features/offers/book-test-ride/BookTestRideForm'
import BookTestRideInfo from '@/features/offers/book-test-ride/BookTestRideInfo'
import '@/styles/pages/book-test-ride.css'

const BENEFITS = [
  'Free & no obligation',
  '30-minute guided ride',
  'Expert on-ground support',
  'All colours available',
]

export default function BookTestRide() {
  return (
    <>
      <PageHero
        id="book-test-ride-hero"
        label="Experience First"
        titleStart={<>Ride Before<br />You</>}
        titleHighlight="Decide"
        titleEnd="."
        description="Book a free 30-minute test ride of the CSR 762 at your nearest Svitch dealer. No commitment — just experience."
      >
        <div className="tr-hero-ctas">
          <a href="#tr-book" className="rajdhani-lbl-text-sm btn-csr primary">
            <i className="bi bi-calendar-check"></i> Book My Slot
          </a>
          <Link to="/support/dealers" className="rajdhani-lbl-text-sm btn-csr secondary">
            <i className="bi bi-geo-alt"></i> Find a Dealer
          </Link>
        </div>

        <div className="tr-benefits">
          {BENEFITS.map((b) => (
            <span key={b} className="tr-benefit">
              <i className="bi bi-check-circle-fill"></i>{b}
            </span>
          ))}
        </div>
      </PageHero>

      {/* BOOKING FORM + INFO */}
      <section id="tr-main">
        <div className="container">
          <div className="tr-layout">
            <BookTestRideForm />
            <BookTestRideInfo />
          </div>
        </div>
      </section>
    </>
  )
}
