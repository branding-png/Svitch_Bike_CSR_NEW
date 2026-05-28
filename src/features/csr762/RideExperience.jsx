import { useGLightbox } from '@/hooks/useGLightbox'

// CSR 762 — "The Ride Experience" emotion section. Mirrors svitch.bike
// `#ride-experience`. 4 large image cards with icon + title + description.
// Reuses the .safety-card markup so styling is already in csr762.css.
const IMG = '/images/features'

const RIDE_CARDS = [
  {
    img:   `${IMG}/ergonomic-seat.webp`,
    icon:  'bi-person-fill',
    title: 'Ergonomic Seat',
    desc:  '780 mm low seat height. Wide, contoured dual seat. Rider and pillion comfort optimised for rides of any length.',
  },
  {
    img:   `${IMG}/speed_csr_762-1.webp`,
    icon:  'bi-speedometer2',
    title: 'Comfort Ride',
    desc:  'Smooth, silent acceleration with no gear shifts. Instant torque delivery means effortless overtakes and a relaxed, refined commute.',
  },
  {
    img:   `${IMG}/handling.webp`,
    icon:  'bi-arrow-left-right',
    title: 'Handling',
    desc:  'Balanced 55/45 weight distribution and a low centre of gravity make the CSR 762 nimble in traffic and stable at highway speeds.',
  },
  {
    img:   `${IMG}/racing.webp`,
    icon:  'bi-lightning-charge-fill',
    title: 'Racing',
    desc:  'Sport mode unleashes peak torque and a 110 km/h top speed. Adrenaline-grade acceleration with race-tuned throttle response — track-ready, street-legal.',
  },
]

export default function RideExperience({
  label       = 'Emotion Section',
  titleStart  = 'The Ride',
  titleEnd    = 'Experience',
  cards       = RIDE_CARDS,
  gallery     = 'csr762-ride-gallery',
}) {
  // Same hook + selector pattern as UniqueFeatures / Performance / Safety / Gallery.
  // Scoped to #ride-experience so it doesn't conflict with other lightboxes.
  useGLightbox('#ride-experience .safety-card--zoom.glightbox', [cards])

  return (
    <section aria-label="RideExperience" id="ride-experience">
      <div className="container">
        <div className="re-heading reveal">
          <span className="section-label">{label}</span>
          <h2 className="section-title large">
            {titleStart}<br />{titleEnd}
          </h2>
        </div>

        <div className="re-grid">
          {cards.map((c, i) => (
            <a
              key={c.title}
              href={c.img}
              className={`safety-card safety-card--zoom glightbox reveal delay-${i * 2 + 1}`}
              data-gallery={gallery}
              data-glightbox={`title: ${c.title}; description: ${c.desc}`}
              aria-label={`${c.title} — open full image`}
            >
              <div className="safety-card-img">
                <div
                  className="safety-card-img-inner"
                  style={{ backgroundImage: `url('${c.img}')` }}
                />
                <span className="safety-card-zoom-badge" aria-hidden="true">
                  <i className="bi bi-zoom-in" />
                </span>
              </div>
              <div className="safety-card-body">
                <div className="safety-icon-wrap">
                  <i className={`bi ${c.icon}`} aria-hidden="true" />
                </div>
                <h3 className="safety-title">{c.title}</h3>
                <p className="safety-desc">{c.desc}</p>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  )
}
