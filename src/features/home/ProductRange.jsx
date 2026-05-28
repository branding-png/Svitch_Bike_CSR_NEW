import { Link } from 'react-router-dom'
import { PATHS } from '@/utils/routes'
import SectionHeader from '@/ui/SectionHeader'

// Product range section — 3 colour variants of CSR 762.
// Mirrors CSR_New_web/index.html `#products` section exactly.
//
// Usage:
//   <ProductRange />                         // default 3 variants
//   <ProductRange variants={CUSTOM_LIST} />  // override
//   <ProductRange showViewMore={false} />    // hide the bottom CTA
const PRODUCT_VARIANTS = [
  {
    id: 'steel-gray',
    color: 'Steel Gray',
    badge: 'Best Seller',
    badgeClass: '',
    imgPrimary: '/images/product/csr-762-gray-Swappable-Battery.webp',
    imgHover:   '/images/product/csr-762-gray-1.webp',
    swatchStyle: { background: '#6b7280' },
    price: 189999,
    oldPrice: 210000,
    rating: 4.5,
    reviews: 248,
  },
  {
    id: 'crimson-red',
    color: 'Crimson Red',
    badge: 'Hot',
    badgeClass: 'hot',
    imgPrimary: '/images/product/csr-762-red.webp',
    imgHover:   '/images/product/csr-762-red-1.webp',
    swatchStyle: { background: '#8b0000' },
    price: 194999,
    oldPrice: 215000,
    rating: 5,
    reviews: 312,
  },
  {
    id: 'midnight-black',
    color: 'Midnight Black',
    badge: 'New',
    badgeClass: 'new',
    imgPrimary: '/images/product/csr-762-black.webp',
    imgHover:   '/images/product/CSR-762-black-rider.webp',
    swatchStyle: {
      background: '#0a0a0a',
      borderColor: 'rgba(255,255,255,0.3)',
    },
    price: 189999,
    oldPrice: 210000,
    rating: 4,
    reviews: 186,
  },
]

function Stars({ rating, reviews }) {
  return (
    <div className="product-rating">
      {Array.from({ length: 5 }).map((_, k) => {
        const cls = k < Math.floor(rating)
          ? 'bi-star-fill'
          : (k < rating ? 'bi-star-half' : 'bi-star')
        return <i key={k} className={`bi ${cls}`}></i>
      })}
      <span className="product-rating-count">({reviews})</span>
    </div>
  )
}

function ProductCard({ variant, delayClass }) {
  const v = variant
  return (
    <div className={`card-base product-card reveal ${delayClass}`.trim()}>
      <div className={`product-badge${v.badgeClass ? ' ' + v.badgeClass : ''}`}>
        {v.badge}
      </div>
      <button className="product-wishlist" aria-label="Add to wishlist">
        <i className="bi bi-heart"></i>
      </button>

      <div className="product-img-wrap">
        <img
          className="product-img product-img-primary"
          src={v.imgPrimary}
          alt={`CSR 762 ${v.color}`}
          loading="lazy"
          decoding="async"
        />
        <img
          className="product-img product-img-hover"
          src={v.imgHover}
          alt={`CSR 762 ${v.color} alternate view`}
          loading="lazy"
          decoding="async"
        />
      </div>

      <div className="product-body">
        <div className="product-swatch-row">
          <span className="product-swatch" style={v.swatchStyle}></span>
          <span className="product-variant rajdhani-lbl-text-sm">{v.color}</span>
        </div>

        <h3 className="product-title">CSR 762 — {v.color}</h3>

        <Stars rating={v.rating} reviews={v.reviews} />

        <div className="product-meta">
          <span><i className="bi bi-battery-charging"></i> 160+ km</span>
          <span><i className="bi bi-speedometer2"></i> 110 km/h</span>
          <span><i className="bi bi-shield-check"></i> 3 yr</span>
        </div>

        <div className="product-price-row">
          <h4 className="product-price">₹{v.price.toLocaleString('en-IN')}</h4>
          <span className="product-price-old">₹{v.oldPrice.toLocaleString('en-IN')}</span>
          <span className="product-discount">
            -{Math.round((1 - v.price / v.oldPrice) * 100)}%
          </span>
        </div>

        <div className="product-btns">
          <Link to={PATHS.shop} className="btn-csr primary">
            <i className="bi bi-cart-check"></i> Book Now
          </Link>
          <Link to={PATHS.bookTestRide} className="btn-csr ghost">
            <i className="bi bi-geo-alt"></i> Test Ride
          </Link>
        </div>
      </div>
    </div>
  )
}

export default function ProductRange({
  id = 'products',
  label = 'Shop the Range',
  titleStart = 'Pick Your',
  titleAccent = 'CSR 762',
  desc = 'Three bold finishes. One legendary ride. Available for booking now with a fully-refundable reservation.',
  variants = PRODUCT_VARIANTS,
  showViewMore = true,
  viewMoreTo,
}) {
  return (
    <section id={id}>
      <div className="container">
        <SectionHeader
          label={label}
          titleStart={titleStart}
          titleAccent={titleAccent}
          description={desc}
        />

        <div className="product-grid">
          {variants.map((v, i) => (
            <ProductCard
              key={v.id}
              variant={v}
              delayClass={i ? `delay-${i * 2}` : ''}
            />
          ))}
        </div>

        {showViewMore && (
          <div className="products-more-cta reveal">
            <Link to={viewMoreTo || PATHS.shop} className="btn-csr primary">
              <i className="bi bi-arrow-right-circle"></i> View More Products
            </Link>
            <span className="products-more-hint rajdhani-lbl-text-sm">
              Explore the full Svitch range — motorcycles, e-bicycles and
              accessories.
            </span>
          </div>
        )}
      </div>
    </section>
  )
}
