import { Link } from 'react-router-dom'
import { PATHS } from '@/utils/routes'

// Single wishlist product card. Uses the shared `.product-card` look from
// the shop pages so the page feels consistent.
export default function WishlistCard({ product, onRemove, onMoveToCart, onNotify }) {
  const inStock = product.stock === 'in-stock'
  const detailPath = PATHS.productDetail.replace(':id', product.id)

  return (
    <div aria-label="WishlistCard" className="card-base product-card" data-stock={product.stock}>
      <div className="product-card-media">
        {product.badge && (
          <span className={`product-badge${product.badge.cls ? ` ${product.badge.cls}` : ''}`}>
            {product.badge.label}
          </span>
        )}
        <button
          type="button"
          className="product-wishlist is-active"
          aria-label="Remove from wishlist"
          onClick={() => onRemove?.(product)}
        >
          <i className="bi bi-heart-fill"></i>
        </button>
        <Link to={detailPath}>
          <img src={product.image} alt={product.alt || product.name} loading="lazy" decoding="async" />
        </Link>
      </div>

      <div className="product-card-body">
        {product.tagline && <span className="product-tagline">{product.tagline}</span>}
        <h3>{product.name}</h3>
        <div className="product-rating">
          {inStock ? (
            <><i className="bi bi-check-circle-fill" style={{ color: '#22c55e' }}></i> In Stock</>
          ) : (
            <><i className="bi bi-x-circle-fill" style={{ color: '#ef4444' }}></i> Out of Stock</>
          )}
        </div>
        <div className="product-price"><span className="price">{product.price}</span></div>

        {inStock ? (
          <button type="button" className="btn-csr primary sm" onClick={() => onMoveToCart?.(product)}>
            <i className="bi bi-cart-plus"></i> Move to Cart
          </button>
        ) : (
          <button type="button" className="btn-csr secondary sm" onClick={() => onNotify?.(product)}>
            <i className="bi bi-bell"></i> Notify Me
          </button>
        )}
      </div>
    </div>
  )
}
