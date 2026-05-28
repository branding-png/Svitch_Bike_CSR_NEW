import { useGLightbox } from '@/hooks/useGLightbox'

// CSR 762 — "Design & Style" mosaic gallery. Mirrors svitch.bike `#design-style`.
// 5 cells in a 3-col / 2-row grid (first cell spans 2 rows): 4 images + 1 video.
// Each cell is a GLightbox-bound anchor. Styles live in src/styles/pages/csr762.css
// (.gallery-* / .ds-* classes).
const IMG = '/images/features'
const PRODUCT = '/images/product'
const VIDEO = '/images/video'

const CELLS = [
  {
    src: `${PRODUCT}/side-profile.webp`,
    alt: 'CSR 762 — side profile',
    title: 'Hero Shot',
  },
  {
    src: `${IMG}/led-.webp`,
    alt: 'LED Headlight',
    title: 'Side Elevation',
  },
  {
    src: `${PRODUCT}/csr-762-black.webp`,
    alt: 'CSR 762 — Black Edition',
    title: 'Black Edition',
  },
  {
    src: `${IMG}/csr-762-gray-Swappable-Battery.webp`,
    alt: 'CSR 762 — swappable battery',
    title: 'Swappable Battery',
  },
  {
    type: 'video',
    src:    `${VIDEO}/product-ride-video-mp4.mp4`,
    poster: `${VIDEO}/hero-product-ride-media-1.webp`,
    alt: 'Watch: Born Electric',
    title: 'Watch: Born Electric',
  },
]

export default function DesignStyle({
  label       = 'Visual Desire',
  titleStart  = 'Design &',
  titleEnd    = 'Style',
  description = 'Every line, every curve, every light cluster — designed with intention. The CSR 762 commands attention wherever it goes.',
  cells       = CELLS,
  gallery     = 'csr762-design-gallery',
}) {
  // Same hook + selector pattern as UniqueFeatures / Performance / Safety / Gallery.
  useGLightbox('#design-style .gallery-cell.glightbox', [cells])

  return (
    <section id="design-style">
      <div className="container">
        <div className="ds-intro reveal">
          <div className="ds-intro-heading">
            <span className="section-label">{label}</span>
            <h2 className="section-title display">
              {titleStart}<br />{titleEnd}
            </h2>
          </div>
          <div className="ds-intro-copy">
            <p className="section-title-p">{description}</p>
          </div>
        </div>

        <div className="gallery-grid reveal">
          {cells.map((c) => {
            const isVideo = c.type === 'video'
            return (
              <a
                key={c.src}
                href={c.src}
                className={`gallery-cell glightbox${isVideo ? ' is-video' : ''}`}
                data-gallery={gallery}
                data-glightbox={`title: ${c.title}; type: ${isVideo ? 'video' : 'image'}`}
                aria-label={`${c.title} — open full ${isVideo ? 'video' : 'image'}`}
              >
                {isVideo ? (
                  <>
                    <video autoPlay muted loop playsInline preload="metadata" poster={c.poster}>
                      <source src={c.src} type="video/mp4" />
                    </video>
                    <div className="gallery-play-btn" aria-hidden="true">
                      <i className="bi bi-play-fill" />
                    </div>
                  </>
                ) : (
                  <img src={c.src} alt={c.alt} loading="lazy" decoding="async" />
                )}
                <div className="gallery-caption">
                  <span className="gallery-caption-title">{c.title}</span>
                  <span className="gallery-caption-icon" aria-hidden="true">
                    <i className={`bi ${isVideo ? 'bi-play-circle' : 'bi-zoom-in'}`} />
                  </span>
                </div>
              </a>
            )
          })}
        </div>
      </div>
    </section>
  )
}
