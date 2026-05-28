// Reviews tab — aggregate score card, per-star bars, and a list of review cards.
// All data is passed in; the component renders no business logic.
const DEFAULT_RATING = 4.8
const DEFAULT_COUNT = 124
const DEFAULT_BREAKDOWN = [
  { stars: 5, pct: 82 },
  { stars: 4, pct: 12 },
  { stars: 3, pct: 4 },
  { stars: 2, pct: 1 },
  { stars: 1, pct: 1 },
]
const DEFAULT_REVIEWS = [
  {
    id: 'r1',
    name: 'Rajesh K.',
    location: 'Mumbai',
    rating: 5,
    body: "120 km daily commute and I charge once every two days. Build quality is top-notch, and the app is intuitive. Best decision I made this year.",
  },
  {
    id: 'r2',
    name: 'Priya S.',
    location: 'Bengaluru',
    rating: 5,
    body: "The torque is instant and smooth. I was nervous about switching to electric, but the CSR 762 feels more confident than any petrol bike I've ridden.",
  },
]

function Stars({ value, size }) {
  return (
    <div className={`pd-rating-stars${size === 'lg' ? ' pd-rating-stars-lg' : ''}`}>
      {Array.from({ length: 5 }).map((_, i) => (
        <i key={i} className={`bi ${i < Math.round(value) ? 'bi-star-fill' : 'bi-star'}`} aria-hidden="true" />
      ))}
    </div>
  )
}

export default function ProductDetailReviews({
  rating = DEFAULT_RATING,
  reviewCount = DEFAULT_COUNT,
  breakdown = DEFAULT_BREAKDOWN,
  reviews = DEFAULT_REVIEWS,
  onLoadMore,
}) {
  return (
    <>
      <div className="pd-reviews-summary">
        <div className="card-base pd-rating-score-card">
          <h3 className="pd-rating-score">{rating.toFixed(1)}</h3>
          <Stars value={rating} size="lg" />
          <span className="pd-rating-caption">Based on {reviewCount} reviews</span>
        </div>
        <div className="pd-rating-bars">
          {breakdown.map((b) => (
            <div key={b.stars} className="pd-rating-bar-row">
              <span>{b.stars}&#9733;</span>
              <div className="pd-rating-bar">
                <div className="pd-rating-bar-fill" style={{ width: `${b.pct}%` }} />
              </div>
              <span>{b.pct}%</span>
            </div>
          ))}
        </div>
      </div>

      {reviews.map((r) => (
        <div key={r.id} className="card-base pd-review-card">
          <div className="pd-review-head">
            <h5 className="pd-review-name">
              {r.name} <span className="pd-review-loc">{r.location}</span>
            </h5>
            <Stars value={r.rating} />
          </div>
          <p>{r.body}</p>
        </div>
      ))}

      <div className="pd-reviews-loadmore">
        <button type="button" className="btn-csr secondary sm" onClick={onLoadMore}>
          Load More Reviews
        </button>
      </div>
    </>
  )
}
