import { useEffect, useState } from 'react'
import { createPortal } from 'react-dom'
import { Link } from 'react-router-dom'
import InputControl from '@/ui/InputControl'
import { useCart } from '@/contexts/CartContext'
import { useWishlist } from '@/contexts/WishlistContext'
import { useToast } from '@/contexts/ToastContext'
import { formatCurrency } from '@/utils/formatCurrency'

// Quick-view modal — same chrome / animation / backdrop as BookNowModal so
// every modal in the app feels identical. All styling lives in shop.css under
// the `.qv-*` and shared `.csr-modal-*` selectors.
const STOCK_LABEL = {
  'in-stock':    'In Stock',
  'pre-order':   'Pre-Order',
  'coming-soon': 'Coming Soon',
}

function Stars({ value = 0 }) {
  const full  = Math.floor(value)
  const half  = value - full >= 0.5
  const empty = 5 - full - (half ? 1 : 0)
  return (
    <>
      {Array.from({ length: full  }).map((_, i) => <i key={`f${i}`} className="bi bi-star-fill"></i>)}
      {half  && <i className="bi bi-star-half"></i>}
      {Array.from({ length: empty }).map((_, i) => <i key={`e${i}`} className="bi bi-star"></i>)}
    </>
  )
}

export default function QuickViewModal({ product, onClose }) {
  const open = Boolean(product)
  const [qty, setQty] = useState(1)
  const { addItem }     = useCart()
  const { has, toggle } = useWishlist()
  const { show }        = useToast()

  useEffect(() => { if (open) setQty(1) }, [open, product?.id])

  useEffect(() => {
    if (!open) return
    const onKey = (e) => { if (e.key === 'Escape') onClose?.() }
    document.addEventListener('keydown', onKey)
    const prev = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => {
      document.removeEventListener('keydown', onKey)
      document.body.style.overflow = prev
    }
  }, [open, onClose])

  if (!open) return null

  const wished     = has(product.id)
  const isIcon     = typeof product.image === 'string' && product.image.startsWith('ICON:')
  const stockKey   = product.stock || (product.inStock === false ? 'coming-soon' : 'in-stock')
  const stockLabel = STOCK_LABEL[stockKey] || 'In Stock'

  const handleAddCart = () => {
    if (stockKey === 'coming-soon') return
    addItem(product, qty)
    show(`${product.name} added to cart.`, 'success')
    onClose?.()
  }

  const handleWishlist = () => {
    toggle(product)
    show(wished ? 'Removed from wishlist.' : 'Added to wishlist.', wished ? 'info' : 'success')
  }

  return createPortal(
    <div
      className="csr-modal-backdrop qv-backdrop"
      onClick={(e) => { if (e.target === e.currentTarget) onClose?.() }}
      role="dialog"
      aria-modal="true"
    >
      <div className="csr-modal qv-modal">
        <button
          type="button"
          className="csr-modal-close qv-close-float"
          aria-label="Close"
          onClick={onClose}
        >
          <i className="bi bi-x-lg"></i>
        </button>

        <div className="csr-modal-body qv-body">
          <div className="qv-grid">
            <div
              className={'qv-media' + (isIcon ? ' qv-media-icon' : '')}
              style={isIcon && product.bg ? { background: product.bg } : undefined}
            >
              {isIcon ? (
                <i
                  className={`bi ${product.image.slice(5)} qv-media-icon-glyph`}
                  style={product.iconColor ? { color: product.iconColor } : undefined}
                ></i>
              ) : (
                <img src={product.image} alt={product.name} loading="lazy" decoding="async" />
              )}
            </div>

            <div className="qv-details">
              {product.tagline && (
                <span className="product-tagline qv-tagline">{product.tagline}</span>
              )}

              <h2 className="qv-title">{product.name}</h2>

              {product.rating != null && (
                <div className="product-rating qv-rating">
                  <Stars value={product.rating} />
                  <span>{product.rating.toFixed(1)}</span>
                  <span className="qv-reviews">({product.reviews ?? 0} reviews)</span>
                </div>
              )}

              <div className="product-price qv-price">
                <span className="price">{formatCurrency(product.price)}</span>
                {product.oldPrice != null && (
                  <span className="price-old">{formatCurrency(product.oldPrice)}</span>
                )}
              </div>

              <div className="qv-stock-row">
                <span className={`qv-stock-pill ${stockKey}`}>
                  <i className={`bi ${stockKey === 'in-stock' ? 'bi-check-circle-fill' : 'bi-clock-fill'}`}></i>
                  {stockLabel}
                </span>
              </div>

              {product.description && <p className="qv-desc">{product.description}</p>}

              <div className="qv-qty-row">
                <label className="rajdhani-lbl-text-sm qv-qty-label">Quantity</label>
                <div className="qv-qty-controls">
                  <button
                    type="button"
                    className="qv-qty-btn"
                    onClick={() => setQty((q) => Math.max(1, q - 1))}
                    aria-label="Decrease quantity"
                  >−</button>
                  <div className="qv-qty-input">
                    <InputControl
                      type="number"
                      value={qty}
                      onChange={(v) => {
                        const n = parseInt(v, 10)
                        if (!Number.isNaN(n) && n > 0) setQty(n)
                      }}
                      min={1}
                    />
                  </div>
                  <button
                    type="button"
                    className="qv-qty-btn"
                    onClick={() => setQty((q) => q + 1)}
                    aria-label="Increase quantity"
                  >+</button>
                </div>
              </div>

              <div className="qv-actions">
                <button
                  type="button"
                  className="btn-csr primary qv-cta-primary"
                  onClick={handleAddCart}
                  disabled={stockKey === 'coming-soon'}
                >
                  <i className="bi bi-cart-plus"></i> Add to Cart
                </button>
                <Link
                  to={`/shop/product/${product.id}`}
                  className="btn-csr secondary qv-cta-secondary"
                  onClick={onClose}
                >
                  <i className="bi bi-arrow-right"></i> View Full Detail
                </Link>
                <button
                  type="button"
                  className="btn-csr secondary qv-cta-wishlist"
                  onClick={handleWishlist}
                  aria-label="Wishlist"
                >
                  <i className={`bi ${wished ? 'bi-heart-fill' : 'bi-heart'}`}></i>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>,
    document.body,
  )
}
