import { Link } from 'react-router-dom'
import { PATHS } from '@/utils/routes'
import { useCart } from '@/contexts/CartContext'
import { formatCurrency } from '@/utils/formatCurrency'

// Line-items table for the cart page — mirrors CSR_New_web `.cart-table`.
export default function CartTable() {
  const { items, updateQty, removeItem, clear } = useCart()

  return (
    <div className="card-base cart-table">
      <div className="cart-table-head rajdhani-lbl-text-sm">
        <span>Product</span>
        <span>Quantity</span>
        <span>Price</span>
        <span></span>
      </div>

      {items.map((it) => (
        <div key={`${it.id}-${it.variant || ''}-${it.color || ''}`} className="cart-item">
          <div className="cart-item-media">
            <div className="cart-item-img">
              <img src={it.image} alt={it.name} loading="lazy" decoding="async" />
            </div>
            <div className="cart-item-info">
              <h4>{it.name}</h4>
              <span className="rajdhani-lbl-text-sm">
                {[it.color && `Color: ${it.color}`, it.sku && `SKU: ${it.sku}`].filter(Boolean).join(' · ')}
              </span>
            </div>
          </div>

          <div className="cart-qty">
            <button
              type="button"
              className="qty-down"
              onClick={() => updateQty(it.id, it.qty - 1, it.variant, it.color)}
            >
              −
            </button>
            <input
              type="text"
              inputMode="numeric"
              aria-label={`Quantity for ${it.name}`}
              value={it.qty}
              onChange={(e) => {
                const n = parseInt(e.target.value, 10)
                if (!Number.isNaN(n)) updateQty(it.id, n, it.variant, it.color)
              }}
            />
            <button
              type="button"
              className="qty-up"
              onClick={() => updateQty(it.id, it.qty + 1, it.variant, it.color)}
            >
              +
            </button>
          </div>

          <span className="cart-item-price">{formatCurrency(it.price)}</span>

          <button
            type="button"
            className="cart-item-remove"
            aria-label="Remove"
            onClick={() => removeItem(it.id, it.variant, it.color)}
          >
            <i className="bi bi-trash3"></i>
          </button>
        </div>
      ))}

      <div className="cart-actions">
        <Link to={PATHS.shop} className="rajdhani-lbl-text-sm btn-csr secondary sm">
          <i className="bi bi-arrow-left"></i> Continue Shopping
        </Link>
        <button type="button" className="btn-csr primary sm" onClick={clear}>
          <i className="bi bi-trash3"></i> Clear Cart
        </button>
      </div>
    </div>
  )
}
