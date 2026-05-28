import { Link } from 'react-router-dom'
import SectionHeader from '@/ui/SectionHeader'

// Reviews list — mirrors CSR_New_web `#reviews-list`.
const REVIEWS = [
  { rating: 5, name: 'Rahul Mehta',   city: 'Mumbai',     when: '8 months ago',  text: 'Switched from a 125cc petrol bike. The instant torque feels incredible off the line. Saving over ₹5,000 a month on fuel. Worth every rupee.' },
  { rating: 5, name: 'Priya Nair',    city: 'Bengaluru',  when: '5 months ago',  text: '6 driving modes are a game-changer. Eco assist in Bengaluru traffic, Sport on weekends. The smart dashboard keeps everything at my fingertips.'   },
  { rating: 5, name: 'Arjun Singh',   city: 'Delhi NCR',  when: '11 months ago', text: '125 km on a single charge handles my 40 km daily commute easily. Charge twice a week at home. Smooth, silent, and zero tailpipe emissions.'         },
  { rating: 5, name: 'Karthik Reddy', city: 'Hyderabad',  when: '6 months ago',  text: 'Six months in. Minimal maintenance, 3-year battery warranty gives real peace of mind. The 6.5 kW motor has plenty of power for highway stretches.'   },
  { rating: 5, name: 'Sneha Joshi',   city: 'Pune',       when: '4 months ago',  text: 'Reverse mode is genius for parking. GPS tracking gives peace of mind. Night LED is brilliant. My commute went from stressful to genuinely enjoyable.' },
  { rating: 4, name: 'Neha Kapoor',   city: 'Chandigarh', when: '3 months ago',  text: 'Range drops about 15% in winter, otherwise everything as advertised. Service appointment was smooth, free pickup-and-drop. Would buy again.'         },
]

function Stars({ rating }) {
  return (
    <div className="review-stars" aria-label={`${rating} out of 5 stars`}>
      {'★'.repeat(rating)}
      {'☆'.repeat(5 - rating)}
    </div>
  )
}

export default function ReviewList({ items = REVIEWS }) {
  return (
    <section id="reviews-list">
      <div className="container">
        <SectionHeader
          label="Owner Stories"
          titleStart="Honest"
          titleAccent="Owner Reviews"
          description="Verified CSR 762 reviews from riders across India."
        />

        <div className="reviews-grid">
          {items.map((r) => (
            <div key={r.name} className="card-base review-card">
              <Stars rating={r.rating} />
              <p className="review-text">&ldquo;{r.text}&rdquo;</p>
              <div className="review-author">
                <div className="review-avatar">{r.name.charAt(0)}</div>
                <div className="review-meta">
                  <h6 className="review-name">{r.name}</h6>
                  <span className="review-loc">{r.city} · {r.when}</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="reviews-cta">
          <Link to="/offers/book-test-ride" className="btn-csr primary">
            <i className="bi bi-bicycle"></i> Book a Test Ride
          </Link>
          <Link to="/shop" className="btn-csr secondary">
            Shop CSR 762 <i className="bi bi-arrow-right"></i>
          </Link>
        </div>
      </div>
    </section>
  )
}
