import { useGLightbox } from '@/hooks/useGLightbox'

// CSR 762 — "Stop Safe. Every Time." safety & mechanicals section.
// Mirrors svitch.bike `#safety`. 6 split cards (image + text) alternating
// image-right / image-left. Each image is GLightbox-bound. Styles live in
// src/styles/pages/csr762.css (.ride-card-* / .ride-grid classes).
const IMG = '/images/features'

const SAFETY_CARDS = [
  {
    img:   `${IMG}/disk-brakes.webp`,
    icon:  'bi-person-check',
    title: 'Disc Brakes',
    desc:  '270 mm front petal disc with floating calipers. 240 mm rear disc. Short stopping distances with excellent bite, feel and heat dissipation.',
  },
  {
    img:   `${IMG}/suspension.webp`,
    icon:  'bi-arrows-expand',
    title: 'Suspension',
    desc:  "Telescopic front fork with 145 mm travel. Rear monoshock with pre-load adjustment. Tuned specifically for India's road conditions.",
  },
  {
    img:   `${IMG}/saree-guard.webp`,
    icon:  'bi-sliders',
    title: 'Saree Guard',
    desc:  'Integrated saree guard prevents fabric from snagging into the rear wheel — practical safety for every rider, every ride.',
  },
  {
    img:   `${IMG}/grab-rail.webp`,
    icon:  'bi-person-fill',
    title: 'Grab Rail',
    desc:  'Aluminium grab rail offers a secure pillion grip and a clean rear styling line.',
  },
  {
    img:   `${IMG}/LED-headlight.webp`,
    icon:  'bi-lightbulb-fill',
    title: 'LED Head Light',
    desc:  'High-intensity LED projector with crisp DRLs — wide beam, long throw and excellent low-light visibility.',
  },
  {
    img:   `${IMG}/LED-taillight.webp`,
    icon:  'bi-lightbulb',
    title: 'LED Tail Light',
    desc:  'Sleek LED tail and brake lamp with sharp signature lighting — instantly visible to traffic behind, day or night.',
  },
]

export default function Safety({
  label       = 'Safety & Mechanicals',
  titleStart  = 'Stop Safe.',
  titleEnd    = 'Every Time.',
  cards       = SAFETY_CARDS,
  gallery     = 'csr762-safety-gallery',
}) {
  // Same hook + selector pattern as UniqueFeatures / Performance / Gallery.
  // Scope the selector to #safety so it doesn't conflict with the other
  // glightbox-bound anchors elsewhere on the page.
  useGLightbox('#safety .ride-card-img-zoom.glightbox', [cards])

  return (
    <section id="safety">
      <div className="container">
        <div className="safety-heading reveal">
          <span className="section-label">{label}</span>
          <h2 className="section-title display">
            {titleStart}<br />{titleEnd}
          </h2>
        </div>
      </div>

      <div className="container">
        <div className="ride-grid">
          {cards.map((c, i) => {
            // Even index → image on the right (body left-aligned end)
            // Odd  index → image on the left  (body default)
            const imgRight = i % 2 === 0
            return (
              <div
                key={c.title}
                className={`ride-card ride-card--split reveal delay-${i + 1}`}
              >
                <a
                  href={c.img}
                  className={`ride-card-img-wrap ride-card-img-zoom glightbox${imgRight ? ' ride-card-img--right' : ''}`}
                  data-gallery={gallery}
                  data-glightbox={`title: ${c.title}; description: ${c.desc}`}
                  aria-label={`${c.title} — open full image`}
                >
                  <img src={c.img} alt={c.title} loading="lazy" decoding="async" />
                  <span className="ride-card-zoom-badge" aria-hidden="true">
                    <i className="bi bi-zoom-in" />
                  </span>
                </a>
                <div className={`ride-card-body${imgRight ? ' ride-card-body--end' : ''}`}>
                  <i className={`bi ${c.icon} ride-card-icon`} aria-hidden="true" />
                  <h3 className="ride-card-title">{c.title}</h3>
                  <p className="ride-card-desc">{c.desc}</p>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
