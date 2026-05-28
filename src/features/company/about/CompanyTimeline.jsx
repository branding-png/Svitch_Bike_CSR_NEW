import SectionHeader from '@/ui/SectionHeader'

// Company timeline — mirrors CSR_New_web `#timeline`.
// Each milestone pairs a story image with its copy. Layout is a grid (image
// right, copy left) on desktop; stacks on mobile via .timeline-item rules.
const TIMELINE = [
  {
    year:  '2018',
    title: 'The Beginning',
    desc:  "Svitch Motocorp is founded in Ahmedabad with a vision to build India's first truly lion-inspired electric motorcycle. A small team of 5 engineers begins prototyping the platform.",
    image: '/images/product/side-profile.webp',
    alt:   'Early Svitch prototype side profile',
  },
  {
    year:  '2020',
    title: 'First Prototype Unveiled',
    desc:  'Successful completion of the first working prototype with a 3 kW PMSM motor and NMC battery pack. On-road testing across Gujarat begins.',
    image: '/images/product/csr-762-gray-1.webp',
    alt:   'CSR prototype in stealth gray',
  },
  {
    year:  '2021',
    title: 'Lite XE Launched',
    desc:  'Launched the flagship foldable e-bicycle, the Svitch Lite XE, at ₹74,999 — covered by CNBC TV18, Times of India, and Financial Express.',
    image: '/images/product/product-3-blue.png',
    alt:   'Svitch Lite XE e-bicycle',
  },
  {
    year:  '2022',
    title: '₹100 Crore Investment',
    desc:  'Announced a ₹100 crore investment in the CSR 762 project — our most ambitious electric motorcycle. Opened our experience centre in Bengaluru.',
    image: '/images/product/csr-762-black.webp',
    alt:   'CSR 762 flagship in matte black',
  },
  {
    year:  '2023',
    title: 'Retail Expansion',
    desc:  'Partnered with DAK Automotives to expand retail presence in Pune. Service network crosses 250+ centers nationwide.',
    image: '/images/product/csr-762-red.webp',
    alt:   'CSR 762 in crimson red at retail',
  },
  {
    year:  '2024',
    title: 'CSR 762 Pre-Booking Opens',
    desc:  'CSR 762 unveiled to the world. Over 40,000+ EOI registered within months of announcing pre-bookings at ₹999.',
    image: '/images/product/speed_csr_762-1.webp',
    alt:   'CSR 762 at speed on open road',
  },
  {
    year:  '2026',
    title: 'The Road Continues',
    desc:  'CSR 762 shipped to its first customers. The service network expanded to 500+ centres, and Svitch entered new markets across Southeast Asia.',
    image: '/images/product/CSR-762-black-rider.webp',
    alt:   'Rider on the CSR 762 Matte Black',
  },
]

export default function CompanyTimeline({ items = TIMELINE }) {
  return (
    <section aria-label="CompanyTimeline" id="timeline">
      <div className="container">
        <SectionHeader
          label="Our Journey"
          titleStart="Company"
          titleAccent="Timeline"
          description="From a small Ahmedabad workshop to India's emerging EV powerhouse."
        />
        <div className="timeline-wrap">
          {items.map((t) => (
            <article key={t.year} className="timeline-item">
              <div className="timeline-dot" aria-hidden="true"></div>

              <div className="timeline-body">
                <span className="timeline-year">{t.year}</span>
                <h3 className="timeline-title">{t.title}</h3>
                <p className="timeline-desc">{t.desc}</p>
              </div>

              {t.image && (
                <figure className="timeline-media">
                  <img src={t.image} alt={t.alt || t.title} loading="lazy" decoding="async" />
                </figure>
              )}
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
