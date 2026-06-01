import { useGLightbox } from '@/hooks/useGLightbox'

// CSR 762 — "Unique Features" grid. Mirrors svitch.bike `#unique-features`.
// Each card is a GLightbox-bound anchor — click opens the full image in a
// themed lightbox. Styles live in src/styles/pages/csr762.css (.uf-* classes).
//
// IMG = '/images/features' so all the source assets live under
// public/images/features/<file>.webp.
const IMG = '/images/features'

const UF_CARDS = [
  {
    img:   `${IMG}/dual-swappable-battery-2.webp`,
    icon:  'bi-battery-charging',
    title: 'Dual Swappable Battery',
    desc:  '3.6 kWh Li-NMC dual swappable battery pack. Hot-swap in seconds for unlimited range — no charging downtime.',
  },
  {
    img:   `${IMG}/home-charging-mount.webp`,
    icon:  'bi-plug-fill',
    title: 'Home Charging Mount',
    desc:  'Wall-mounted charging dock for any standard 16A socket. Plug in overnight and roll out fully charged — no garage, no station, no hassle.',
  },
  {
    img:   `${IMG}/boot-space-open.webp`,
    icon:  'bi-bag-fill',
    title: 'Bootspace',
    desc:  'Generous 40-litre under-seat storage. Fit a full-size helmet, groceries, or your daily essentials with room to spare.',
  },
  {
    img:   `${IMG}/phone-holder.webp`,
    icon:  'bi-phone-fill',
    title: 'Phone Holder',
    desc:  'Integrated water-resistant phone mount with USB charging port. Stay navigated, stay connected, stay powered.',
  },
]

export default function UniqueFeatures({
  label       = 'Built Different',
  titleStart  = 'Unique',
  titleEnd    = 'Features',
  description = 'Smart by design. Practical by intent. The CSR 762 packs next-generation conveniences that make every ride effortless — tap any image to take a closer look.',
  cards       = UF_CARDS,
  gallery     = 'csr762-uf-gallery',
}) {
  // Same wiring as features/company/gallery/GalleryGrid.jsx — uses the
  // standard `.glightbox` selector so the lightbox initialises and binds
  // identically (skin, touch nav, loop, scroll preservation).
  useGLightbox('.uf-card.glightbox', [cards])

  return (
    <section aria-label="UniqueFeatures" id="unique-features">
      <div className="container">
        <div className="uf-intro reveal">
          <div className="uf-intro-heading">
            <span className="section-label">{label}</span>
            <h2 className="section-title display">
              {titleStart}<br />{titleEnd}
            </h2>
          </div>
          <div className="uf-intro-copy">
            <p className="section-title-p">{description}</p>
          </div>
        </div>

        <div className="uf-grid">
          {cards.map((c, i) => (
            <a
              key={c.title}
              href={c.img}
              className={`uf-card glightbox reveal delay-${(i + 1) * 2}`}
              data-gallery={gallery}
              data-glightbox={`title: ${c.title}; description: ${c.desc}`}
              aria-label={`${c.title} — open full image`}
            >
              <div
                className="uf-img"
                style={{ backgroundImage: `url('${c.img}')` }}
              />
              <span className="uf-zoom-badge" aria-hidden="true">
                <i className="bi bi-zoom-in" />
              </span>
              <div className="uf-body">
                <i className={`bi ${c.icon} uf-icon`} aria-hidden="true" />
                <h3 className="uf-title">{c.title}</h3>
                <p className="uf-desc">{c.desc}</p>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  )
}
