import { memo } from 'react'
import { Link } from 'react-router-dom'
import { useWishlist } from '@/contexts/WishlistContext'
import { useToast } from '@/contexts/ToastContext'
import { useBookNow } from '@/contexts/BookNowContext'
import { formatCurrency } from '@/utils/formatCurrency'

const BADGES = {
  new:           { label: 'New',         className: ''     },
  sale:          { label: 'Sale',        className: 'sale' },
  'pre-order':   { label: 'Pre-Order',   className: ''     },
  'coming-soon': { label: 'Coming Soon', className: ''     },
  oem:           { label: 'OEM',         className: ''     },
  spicy:         { label: 'Spicy',       className: 'sale' },
}

// 0–5 rating renderer using Bootstrap-Icon stars.
function Stars({ value = 0 }) {
  const full = Math.floor(value)
  const half = value - full >= 0.5
  const empty = 5 - full - (half ? 1 : 0)
  return (
    <>
      {Array.from({ length: full  }).map((_, i) => <i key={`f${i}`} className="bi bi-star-fill"></i>)}
      {half  && <i className="bi bi-star-half"></i>}
      {Array.from({ length: empty }).map((_, i) => <i key={`e${i}`} className="bi bi-star"></i>)}
    </>
  )
}

function ProductCard({ product, onQuickView }) {
  const { has, toggle } = useWishlist()
  const { show }        = useToast()
  const { open: openBookNow } = useBookNow()

  const wished = has(product.id)
  const badge  = product.badge ? BADGES[product.badge] : null
  const isIcon = typeof product.image === 'string' && product.image.startsWith('ICON:')
  const iconName = isIcon ? product.image.slice(5) : null
  const detailPath = `/shop/product/${product.id}`

  const handleWishlist = (e) => {
    e.preventDefault()
    e.stopPropagation()
    toggle(product)
    show(
      wished ? 'Removed from wishlist.' : 'Added to wishlist.',
      wished ? 'info' : 'success',
      2500,
    )
  }

  const handleBookNow = (e) => {
    e.preventDefault()
    openBookNow()
  }

  const ctaLabel = product.stock === 'coming-soon' ? <>Notify Me</> : <>Book Now</>
  const ctaIcon  = product.stock === 'coming-soon' ? 'bi-bell' : 'bi-calendar-check'
  const ctaCls   = product.stock === 'coming-soon' ? 'secondary' : 'primary'
  const ctaDisabled = product.stock === 'coming-soon'

  return (
    <div className="card-base product-card" data-id={product.id}>
      <div
        className="product-card-media"
        style={isIcon ? { background: product.bg, display: 'flex', alignItems: 'center', justifyContent: 'center' } : undefined}
      >
        {badge && <span className={`product-badge ${badge.className}`.trim()}>{badge.label}</span>}

        <button
          type="button"
          className={`product-wishlist${wished ? ' is-active' : ''}`}
          aria-label="Wishlist"
          aria-pressed={wished}
          onClick={handleWishlist}
        >
          <i className={`bi ${wished ? 'bi-heart-fill' : 'bi-heart'}`}></i>
        </button>

        <Link to={detailPath} className="product-card-link">
          {isIcon ? (
            <i className={`bi ${iconName}`} style={{ fontSize: 72, color: product.iconColor || 'var(--accent)' }}></i>
          ) : (
            <img src={product.image} alt={product.name} loading="lazy" decoding="async" />
          )}
        </Link>

      </div>

      <div className="product-card-body">
        {product.tagline && <span className="product-tagline">{product.tagline}</span>}
        <h3>
          <Link to={detailPath} className="product-card-link">{product.name}</Link>
        </h3>

        {product.rating != null && (
          <div className="product-rating">
            <Stars value={product.rating} /> {product.rating.toFixed(1)} ({product.reviews ?? 0})
          </div>
        )}

        <div className="product-price">
          <span className="price">{formatCurrency(product.price)}</span>
          {product.oldPrice != null && (
            <span className="price-old">{formatCurrency(product.oldPrice)}</span>
          )}
        </div>

        <button
          type="button"
          className={`btn-csr ${ctaCls} sm product-addcart`}
          disabled={ctaDisabled}
          onClick={handleBookNow}
        >
          <i className={`bi ${ctaIcon}`}></i> {ctaLabel}
        </button>
      </div>
    </div>
  )
}

// Memoised — Shop re-renders on every filter/sort tick, but each card only
// cares about its own product + handlers.
export default memo(ProductCard)
