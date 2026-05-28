import { Link } from 'react-router-dom'
import SectionHeader from '@/ui/SectionHeader'

// Press coverage grid — mirrors CSR_New_web `#press-coverage`.
// Each card is a clickable Link to /press/{slug} (the press-detail route).
const ARTICLES = [
  {
    slug:    'svitch-50k-units',
    outlet:  'Economic Times',
    logo:    '/images/news/ET_auto.webp',
    image:   '/images/blog/csr-762-red-1.webp',
    alt:     'Rider on the CSR 762 in Matte Black',
    title:   'Svitch clocks 50,000 units — a milestone for Indian EV startups',
    date:    'March 2025',
    excerpt: "The Ahmedabad-based maker has quietly become one of India's most-loved EV two-wheeler brands, beating several better-funded rivals on customer satisfaction.",
  },
  {
    slug:    'range-real-world',
    outlet:  'Financial Express',
    logo:    '/images/news/Financial_express_logo.webp',
    image:   '/images/blog/csr-762-gray-Swappable-Battery.webp',
    alt:     'CSR 762 swappable battery on the road',
    title:   "Why CSR 762's 125 km range claim actually holds up in real-world testing",
    date:    'February 2025',
    excerpt: "Unlike competitors who test in controlled conditions, CSR 762's range figures come from extensive on-road validation across Indian city and highway conditions.",
  },
  {
    slug:    'autocar-long-term',
    outlet:  'Drivespark',
    logo:    '/images/news/Drivespark.png',
    image:   '/images/blog/csr-762-red.webp',
    alt:     'CSR 762 in Crimson Red — long-term review',
    title:   "CSR 762 long-term review: 10,000 km later, here's the verdict",
    date:    'January 2025',
    excerpt: "After a year of daily use across Bengaluru's notorious traffic, the CSR 762 remains one of the most compelling EV propositions in the country.",
  },
  {
    slug:    'series-b-raise',
    outlet:  'CNBC',
    logo:    '/images/news/CNBC_logo.webp',
    image:   '/images/blog/Svitch_OS_540x.webp',
    alt:     'Svitch OS connected dashboard',
    title:   'Svitch Motocorp raises Series B from marquee investors',
    date:    'November 2024',
    excerpt: 'The round values Svitch at ₹1,200 crore and will fund expansion to 1,000 dealers and launch of the next-generation CSR platform.',
  },
  {
    slug:    'made-in-india',
    outlet:  'Hindustan Times',
    logo:    '/images/news/Hindustan_Times_logo.webp',
    image:   '/images/blog/hero-factory-media.webp',
    alt:     'Inside the Svitch Ahmedabad factory floor',
    title:   'Made in India: How Svitch is redefining EV manufacturing',
    date:    'October 2024',
    excerpt: "A deep-dive into Svitch's Ahmedabad facility, where every bike is assembled, quality-checked, and software-configured before delivery.",
  },
  {
    slug:    'forbes-founders',
    outlet:  'Times of India',
    logo:    '/images/news/TOI_logo.webp',
    image:   '/images/blog/csr-762-red-1.webp',
    alt:     'CSR 762 on the open road — founder spotlight',
    title:   "The founders electrifying India's urban commute",
    date:    'September 2024',
    excerpt: "Svitch's founding team went from a workshop in Ahmedabad to 50,000 riders across India in under five years — and they're just getting started.",
  },
]

export default function PressCoverage({ articles = ARTICLES }) {
  return (
    <section aria-label="PressCoverage" id="press-coverage">
      <div className="container">
        <SectionHeader
          label="Latest Coverage"
          titleStart="As"
          titleAccent="Featured In"
          description="Recent stories on the CSR 762, Svitch Motocorp, and the evolution of Indian electric mobility."
        />

        <div className="coverage-grid">
          {articles.map((a) => (
            <Link
              key={a.slug}
              to={`/press/${a.slug}`}
              className="card-base coverage-card"
            >
              {a.image && (
                <div className="coverage-media">
                  <img src={a.image} alt={a.alt || a.title} loading="lazy" decoding="async" />
                </div>
              )}
              <div className="coverage-body">
                <span
                  className={`coverage-outlet-tag${a.logo ? ' has-logo' : ''}`}
                  aria-label={a.outlet}
                >
                  {a.logo ? (
                    <img src={a.logo} alt={a.outlet} loading="lazy" decoding="async" />
                  ) : (
                    a.outlet
                  )}
                </span>
                <h3 className="coverage-headline">{a.title}</h3>
                <span className="coverage-date rajdhani-lbl-text-sm">{a.date}</span>
                <p className="coverage-excerpt">{a.excerpt}</p>
                <span className="rajdhani-lbl-text-sm coverage-read">
                  Read article <i className="bi bi-arrow-up-right"></i>
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}
