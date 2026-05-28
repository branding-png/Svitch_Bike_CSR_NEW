import { Swiper, SwiperSlide } from 'swiper/react'
import { Autoplay, Pagination } from 'swiper/modules'
import 'swiper/css'
import 'swiper/css/pagination'

// Business Opportunities — mirrors CSR_New_web `#business-opportunities`.
// 50/50 split: static dealer-store photo on the left, auto-playing Swiper
// of pitch slides on the right. Slides are data-driven.
const SLIDES = [
  {
    title: 'Tap into the Fastest Growing Automotive Segment',
    points: [
      ['Explosive EV Sector Growth:',     "India's electric two-wheeler market is poised for 30%+ CAGR over the next 5 years."],
      ['Strategic Product Positioning:',  'CSR 762 targets urban commuters and eco-conscious millennials.'],
      ['First-Mover Advantage:',          'Limited dealerships ensure territorial monopoly and early brand loyalty.'],
      ['Generational Business Potential:','Svitch dealership model is built for legacy growth.'],
    ],
  },
  {
    title: 'High-Growth Business Model with Structured ROI',
    points: [
      ['Proven Franchise Framework:', '125+ dealerships with rapid scalability.'],
      ['End-to-End Support:',         'Svitch provides site setup and training.'],
      ['Risk Mitigation:',            'Assured returns with cost-sharing models.'],
      ['Robust Sales Funnel:',        'National campaigns fuel lead generation.'],
    ],
  },
  {
    title: 'Brand Equity and Recognition',
    points: [
      ['Strong Brand Recall:',  'Extensive media coverage across major outlets.'],
      ['Premium Perception:',   'Celebrity endorsements position Svitch as a lifestyle brand.'],
      ['Patented Design:',      "CSR 762's unique features reduce competition."],
    ],
  },
  {
    title: 'Strong Financial Projections and Business Metrics',
    points: [
      ['Investment Bracket:',  '₹50 lakh to ₹1 crore.'],
      ['Attractive Margins:',  'Potential monthly revenue over ₹60 lakhs.'],
      ['Payback Period:',      'Break-even within 18–24 months.'],
      ['High LTV:',            'After-sales and accessories add revenue streams.'],
    ],
  },
]

export default function BusinessOpportunities({ slides = SLIDES }) {
  return (
    <section aria-label="BusinessOpportunities" id="business-opportunities">
      <div className="container">
        <div className="section-header business-opp-header">
          <span className="section-label">Business Opportunities</span>
          <h2 className="section-title">
            Drive The <span className="accent">EV Revolution</span>
          </h2>
        </div>
      </div>

      <div className="container-fluid business-opp-fluid">
        <div className="business-opp-split">
          <div className="business-opp-media">
            <img
              src="/images/Become_a_dealer_Store_photo.webp"
              alt="Become a Svitch dealer — store photo"
              loading="lazy"
              decoding="async"
            />
          </div>

          <div className="business-opp-slider-wrap">
            <Swiper
              className="business-opp-swiper"
              modules={[Autoplay, Pagination]}
              autoplay={{ delay: 6000, disableOnInteraction: false }}
              loop
              pagination={{
                el: '.business-opp-pagination',
                clickable: true,
              }}
              spaceBetween={24}
            >
              {slides.map((s) => (
                <SwiperSlide key={s.title}>
                  <div className="business-opp-slide">
                    <h3>{s.title}</h3>
                    <ul>
                      {s.points.map(([bold, rest]) => (
                        <li key={bold}>
                          <strong>{bold}</strong> {rest}
                        </li>
                      ))}
                    </ul>
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>

            <div
              className="swiper-pagination business-opp-pagination"
              style={{ position: 'inherit', top:'20px' }}
            ></div>
          </div>
        </div>
      </div>
    </section>
  )
}
