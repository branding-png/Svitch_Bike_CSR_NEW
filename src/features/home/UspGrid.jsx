import SectionHeader from '@/ui/SectionHeader'

// USP / Unique Features grid — mirrors CSR_New_web `#usp`.
// Each tile is a GLightbox-bound anchor with a hover zoom badge.
// The host page should run `useGLightbox('.glightbox', deps)` so the
// anchors open in the themed lightbox on click.
//
// Usage:
//   <UspGrid />                          // 6 default tiles
//   <UspGrid items={CUSTOM} title="..." titleAccent="..." />
const USP_FEATURES = [
  {
    img:   '/images/features/dual-swappable-battery-2.webp',
    badge: '3.6kWh',
    title: 'Dual Swappable Battery',
    desc:  '3.6 kWh Li-NMC dual swappable battery pack. 160+ km IDC range. Full charge in 5.5 hours at home',
    lb:    'title: Dual Swappable Battery; description: 3.6 kWh Li-NMC dual swappable battery pack. 160+ km IDC range. Full charge in 5.5 hours at home.',
  },
  {
    img:   '/images/features/boot_open.webp',
    badge: '40L',
    title: 'Bootspace',
    desc:  'Generous 40-litre under-seat storage. Fit a full-size helmet, groceries, or your daily essentials with room to spare.',
    lb:    'title: Bootspace; description: 40 ltr boot storage capacity.',
  },
  {
    img:   '/images/features/PHONE-HOLDER.webp',
    badge: 'IPX',
    title: 'Phone Holder',
    desc:  'Phone holder with water resistance & charging port accessibility',
    lb:    'title: Phone Holder; description: Phone holder with water resistance & charging port accessibility.',
  },
  {
    img:   '/images/features/abs.webp',
    badge: '270mm',
    title: 'Braking System',
    desc:  'Combi brake Front- Disc brake 270mm',
    lb:    'title: Braking System; description: Combi brake Front- Disc brake 270mm.',
  },
  {
    img:   '/images/features/seat.webp',
    badge: '780mm',
    title: 'Ergonomic Seat',
    desc:  'Low 780mm seat height, high-density foam, dual seating',
    lb:    'title: Ergonomic Seat; description: Low 780mm seat height, high-density foam, dual seating.',
  },
  {
    img:   '/images/features/racing.webp',
    badge: '55/45',
    title: 'Handling',
    desc:  '55/45 front-rear balance for optimal cornering stability',
    lb:    'title: Handling; description: 55/45 front-rear balance for optimal cornering stability.',
  },
]

export default function UspGrid({
  id = 'usp',
  label = 'What Sets Us Apart',
  titleStart = 'Unique',
  titleAccent = 'Features',
  items = USP_FEATURES,
  gallery = 'usp-gallery',
}) {
  return (
    <section id={id} aria-label="UspGrid">
      <div className="container">
        <SectionHeader label={label} titleStart={titleStart} titleAccent={titleAccent} />

        <div className="perf-grid reveal">
          {items.map((f) => (
            <a
              key={f.title}
              href={f.img}
              className="card-base perf-item tile-eq glightbox lb-item"
              data-gallery={gallery}
              data-glightbox={f.lb}
            >
              <div
                className="perf-img"
                style={{ backgroundImage: `url('${f.img}')` }}
              />
              {f.badge && <span className="perf-stat-badge">{f.badge}</span>}
              <div className="perf-item-body">
                <h3 className="perf-item-name">{f.title}</h3>
                <p className="perf-item-desc">{f.desc}</p>
              </div>
              <i className="bi bi-zoom-in perf-zoom-icon"></i>
            </a>
          ))}
        </div>
      </div>
    </section>
  )
}
