import { Swiper, SwiperSlide } from 'swiper/react'
import { Autoplay, Pagination } from 'swiper/modules'
import 'swiper/css'
import 'swiper/css/pagination'

// Testimonials carousel — mirrors CSR_New_web `.testimonials-swiper`.
// Half-star support: rating 4.5 renders 4 full + 1 half.
//
// Usage:
//   <Testimonials />                          // default 6 reviews baked in
//   <Testimonials items={CUSTOM} delay={4000} />
const TESTIMONIALS = [
  { name: 'Rajesh K.',  city: 'Mumbai',     rating: 5,   quote: "The CSR 762 is a game changer. 120 km daily commute and I charge once every two days. The savings are real." },
  { name: 'Priya S.',   city: 'Bengaluru',  rating: 5,   quote: "Coming from a petrol bike, the instant torque blew my mind. 0-60 in 6 seconds is no joke. Pure adrenaline." },
  { name: 'Amit P.',    city: 'Delhi NCR',  rating: 5,   quote: "The 7-inch smart dashboard is incredible. Navigation, ride stats, Bluetooth — it's like riding a smartphone." },
  { name: 'Vikram D.',  city: 'Ahmedabad',  rating: 4.5, quote: "37L boot space fits my helmet and laptop bag. Saved over 75,000 this year on fuel. Best investment I've made." },
  { name: 'Sneha M.',   city: 'Pune',       rating: 5,   quote: "Removable battery is a game changer. I charge at my office desk. IP68 rated — rode through monsoon without worry." },
  { name: 'Karthik R.', city: 'Chennai',    rating: 5,   quote: "OTA updates keep making it better. Last month I got a new ride mode and improved range — just like that." },
]

function Stars({ rating }) {
  return (
    <div className="tc-stars">
      {Array.from({ length: 5 }).map((_, k) => {
        const cls = k < Math.floor(rating)
          ? 'bi-star-fill'
          : (k < rating ? 'bi-star-half' : 'bi-star')
        return <i key={k} className={`bi ${cls}`}></i>
      })}
    </div>
  )
}

export default function Testimonials({
  items = TESTIMONIALS,
  delay = 5000,
}) {
  return (
    <Swiper
      className="testimonials-swiper reveal"
      modules={[Autoplay, Pagination]}
      spaceBetween={20}
      slidesPerView={1}
      breakpoints={{
        768:  { slidesPerView: 2 },
        1024: { slidesPerView: 3 },
      }}
      autoplay={{ delay, disableOnInteraction: false }}
      pagination={{ clickable: true, el: '.testimonials-pagination' }}
      loop
    >
      {items.map((t) => (
        <SwiperSlide key={t.name}>
          <div className="card-base testimonial-card">
            <Stars rating={t.rating} />
            <p className="tc-quote">&ldquo;{t.quote}&rdquo;</p>
            <div className="tc-author">
              <h6>{t.name}</h6>
              <span className="rajdhani-lbl-text-sm">{t.city}</span>
            </div>
          </div>
        </SwiperSlide>
      ))}
    </Swiper>
  )
}

// Export the pagination element separately — the testimonials section's
// header and the news strip live in the same wrapper, so the page renders:
//
//   <Testimonials />
//   <TestimonialsPagination />
//   <NewsMarquee />
export function TestimonialsPagination() {
  return <div className="swiper-pagination testimonials-pagination" />
}
