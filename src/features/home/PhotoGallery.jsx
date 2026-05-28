import SectionHeader from '@/ui/SectionHeader'

// Full-bleed photo gallery section — mirrors CSR_New_web `#gallery`.
// Renders a `.section-header` + a `.gallery-grid` of GLightbox-bound anchors,
// each with a hover `.gi-caption`. The page calling this component should
// also run `useGLightbox()` so the anchors open in the themed lightbox.
//
// Usage:
//   <PhotoGallery />                       // 12 default tiles baked in
//   <PhotoGallery tiles={CUSTOM_LIST} />   // override
const GALLERY_TILES = [
  { src: '/images/product/side-profile.webp',                       kicker: 'Design',       title: 'Hero Shot',                lb: 'Hero Shot' },
  { src: '/images/features/led-.webp',                              kicker: 'Profile',      title: 'Side Elevation',           lb: 'Side Elevation' },
  { src: '/images/product/csr-762-gray-Swappable-Battery.webp',     kicker: 'Battery',      title: 'Swappable Battery',        lb: 'Swappable Battery' },
  { src: '/images/product/csr-762-black.webp',                      kicker: 'Color',        title: 'Black Edition',            lb: 'Black Edition' },
  { src: '/images/product/csr-762-red-1.webp',                      kicker: 'Convenience',  title: 'Phone Holder',             lb: 'Phone Holder' },
  { src: '/images/features/handling.webp',                          kicker: 'Performance',  title: 'Handling',                 lb: 'Handling' },
  { src: '/images/features/smart-dashboard.webp',                   kicker: 'Display',      title: 'Smart Dashboard',          lb: 'Smart Dashboard' },
  { src: '/images/features/saree-guard.webp',                       kicker: 'Saree Guard',  title: 'Uniq Design Saree Guard',  lb: 'Saree Guard' },
  { src: '/images/features/grab-rail.webp',                         kicker: 'Aluminium',    title: 'Grab Rail',                lb: 'Grab Rail' },
  { src: '/images/features/suspension-.webp',                       kicker: 'Comfort',      title: 'Suspension',               lb: 'Suspension' },
  { src: '/images/features/wheel.webp',                             kicker: 'Wheels',       title: 'Alloy Wheels',             lb: 'Alloy Wheels' },
  { src: '/images/features/LED-rear-light.webp',                    kicker: 'Lighting',     title: 'LED Tail Light',           lb: 'LED Tail Light' },
]

export default function PhotoGallery({
  id = 'gallery',
  label = 'Visual Stories',
  titleStart = 'Photo',
  titleAccent = 'Gallery',
  gallery = 'csr-gallery',
  tiles = GALLERY_TILES,
  delayCycle = 4,   // .delay-0 ... .delay-3 (matches index.css stagger)
}) {
  return (
    <section id={id}>
      <div className="container">
        <SectionHeader label={label} titleStart={titleStart} titleAccent={titleAccent} />
      </div>

      <div className="gallery-grid">
        {tiles.map((g, i) => (
          <a
            key={g.src}
            href={g.src}
            className={`gallery-item reveal delay-${i % delayCycle} glightbox`}
            data-gallery={gallery}
            data-glightbox={`title: ${g.lb || g.title}`}
          >
            <img src={g.src} alt={g.title} loading="lazy" decoding="async" />
            <div className="gi-caption">
              <div className="gi-text">
                {g.kicker && <p className="gi-title">{g.kicker}</p>}
                <h3 className="gi-name">{g.title}</h3>
              </div>
              <i className="bi bi-zoom-in"></i>
            </div>
          </a>
        ))}
      </div>
    </section>
  )
}
