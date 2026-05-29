import { Link } from 'react-router-dom'
import { PATHS } from '@/utils/routes'
import { useToast } from '@/contexts/ToastContext'

// Thank-you booking confirmation hero — mirrors CSR_New_web `.ty-hero`.
// All booking fields are prop-driven so the route can wire real data later.
const STEPS = [
  { num: 'Step 1', icon: 'bi-phone',         title: 'Check your SMS',     text: 'Dealer address and contact details within 10 minutes.' },
  { num: 'Step 2', icon: 'bi-person-check',  title: 'Bring your licence', text: 'Valid 2-wheeler driving licence. Helmet provided by dealer.' },
  { num: 'Step 3', icon: 'bi-bicycle',       title: 'Enjoy your ride',    text: '30-minute guided test ride on the CSR 762. Ask us anything.' },
]

const SUMMARY_DEFAULTS = {
  bookingId: 'SVT-2026-00000',
  customer:  '—',
  model:     'CSR 762',
  rideDate:  '—',
  location:  'Svitch Dealer, Ahmedabad',
  status:    'Confirmed',
}

export default function ThankYouHero({ summary = SUMMARY_DEFAULTS }) {
  const { show } = useToast()

  function share(channel) {
    return (e) => {
      e.preventDefault()
      const url  = typeof window !== 'undefined' ? window.location.href : ''
      const text = encodeURIComponent('I just booked a Svitch CSR 762 test ride!')
      const u    = encodeURIComponent(url)
      const target = {
        whatsapp: `https://wa.me/?text=${text}%20${u}`,
        facebook: `https://www.facebook.com/sharer/sharer.php?u=${u}`,
        twitter:  `https://twitter.com/intent/tweet?text=${text}&url=${u}`,
      }[channel]
      if (target) window.open(target, '_blank', 'noopener')
      else show('Copied to clipboard', 'info', 2000)
    }
  }

  return (
    <section className="ty-hero">
      <div className="ty-wrap">
        <div className="ty-check"><i className="bi bi-check-lg"></i></div>
        <span className="ty-eyebrow">Booking Confirmed</span>
        <h1 className="ty-title">
          You&apos;re All<br />Set to Ride.
        </h1>
        <p className="ty-sub">
          Your test ride has been booked successfully. A confirmation SMS and
          email are on their way — our team will call within 2 hours to lock
          your slot.
        </p>

        {/* Booking summary */}
        <div className="ty-summary">
          <div className="ty-summary-title">Booking Summary</div>
          <Row label="Booking ID"   value={summary.bookingId} valueClass="accent" />
          <Row label="Customer"     value={summary.customer} />
          <Row label="Model"        value={summary.model} />
          <Row label="Date & Time"  value={summary.rideDate} />
          <Row label="Location"     value={summary.location} />
          <div className="ty-summary-row">
            <span className="ty-summary-label">Status</span>
            <span className="ty-summary-val ok">
              <i className="bi bi-circle-fill"></i> {summary.status}
            </span>
          </div>
        </div>

        {/* Next steps */}
        <div className="ty-steps">
          {STEPS.map((s) => (
            <div key={s.title} className="ty-step">
              <span className="ty-step-num">{s.num}</span>
              <i className={`bi ${s.icon}`}></i>
              <h4>{s.title}</h4>
              <p>{s.text}</p>
            </div>
          ))}
        </div>

        {/* Action CTAs */}
        <div className="ty-btns">
          <Link to={PATHS.dealers} className="rajdhani-lbl-text-sm btn-csr secondary">
            <i className="bi bi-map"></i> Find Dealer
          </Link>
          <Link to={PATHS.home} className="rajdhani-lbl-text-sm btn-csr primary">
            <i className="bi bi-house-fill"></i> Back to Home
          </Link>
        </div>

        {/* Share */}
        <div className="ty-share">
          <span className="ty-share-label rajdhani-lbl-text-sm">Share</span>
          <div className="ty-share-icons">
            <a href="#" onClick={share('whatsapp')} aria-label="Share on WhatsApp">
              <i className="bi bi-whatsapp"></i>
            </a>
            <a href="#" onClick={share('facebook')} aria-label="Share on Facebook">
              <i className="bi bi-facebook"></i>
            </a>
            <a href="#" onClick={share('twitter')} aria-label="Share on Twitter">
              <i className="bi bi-twitter-x"></i>
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}

function Row({ label, value, valueClass = '' }) {
  return (
    <div aria-label="ThankYouHero" className="ty-summary-row">
      <span className="ty-summary-label">{label}</span>
      <span className={`ty-summary-val ${valueClass}`.trim()}>{value}</span>
    </div>
  )
}
