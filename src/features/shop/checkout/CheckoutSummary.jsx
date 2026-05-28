import { Link } from 'react-router-dom'
import { PATHS } from '@/utils/routes'
import { useCart } from '@/contexts/CartContext'
import { useToast } from '@/contexts/ToastContext'
import { formatCurrency } from '@/utils/formatCurrency'

const TRUST = [
  { icon: 'bi-truck',                  label: 'Free Delivery' },
  { icon: 'bi-shield-check',           label: 'Secure Pay'    },
  { icon: 'bi-arrow-counterclockwise', label: '7-Day Return'  },
  { icon: 'bi-headset',                label: '24/7 Support'  },
]

// Right-side aside on the checkout page — line items + totals + place-order button.
// `delivery` switches shipping cost; `submitting` flips the button into spinner mode.
// `showActions` hides the Continue/Back buttons so Payment can reuse this card
// purely as a read-only summary — Payment owns its own Pay CTA.
export default function CheckoutSummary({
  delivery = 'standard',
  submitting = false,
  title = 'Order Summary',
  showActions = true,
}) {
  const { items, subtotal, removeItem } = useCart()
  const toast = useToast()

  const shipping = delivery === 'express' ? 499 : 0
  const gst      = Math.round((subtotal + shipping) * 0.18)
  const total    = subtotal + shipping + gst

  const handleRemove = (it) => {
    removeItem(it.id, it.variant, it.color)
    toast.show(`${it.name} removed from order`, 'info')
  }

  return (
    <aside aria-label="CheckoutSummary" className="card-base cart-summary">
      <h3>{title}</h3>

      {items.map((it) => (
        <div
          key={`${it.id}-${it.variant || ''}-${it.color || ''}`}
          className="cart-item"
          style={{ gridTemplateColumns: '60px 1fr auto auto', padding: '10px 0', gap: 12 }}
        >
          <div className="cart-item-img" style={{ width: 60, height: 60 }}>
            <img src={it.image} alt={it.name} loading="lazy" decoding="async" />
          </div>
          <div className="cart-item-info">
            <h4 style={{ fontSize: 'var(--fs-md)' }}>{it.name}</h4>
            <span className="rajdhani-lbl-text-sm">Qty: {it.qty}</span>
          </div>
          <span className="cart-item-price" style={{ fontSize: 'var(--fs-md)' }}>
            {formatCurrency(it.price * it.qty)}
          </span>
          <button
            type="button"
            className="cart-item-remove"
            aria-label={`Remove ${it.name} from order`}
            title="Remove item"
            onClick={() => handleRemove(it)}
            style={{ width: 32, height: 32 }}
          >
            <i className="bi bi-trash" aria-hidden="true" />
          </button>
        </div>
      ))}

      <div style={{ paddingTop: 14, marginTop: 6, borderTop: '1px solid var(--border)' }}>
        <div className="summary-row">
          <span>Subtotal</span>
          <span>{formatCurrency(subtotal)}</span>
        </div>
        <div className="summary-row">
          <span>Shipping</span>
          <span>{shipping === 0 ? 'Free' : formatCurrency(shipping)}</span>
        </div>
        <div className="summary-row">
          <span>GST (18%)</span>
          <span>{formatCurrency(gst)}</span>
        </div>
        <div className="summary-row total">
          <span>Total</span>
          <span>{formatCurrency(total)}</span>
        </div>
      </div>

      {showActions && (
        <>
          <button
            type="submit"
            id="placeOrderBtn"
            className="btn-csr primary full-w"
            disabled={submitting}
            style={{ justifyContent: 'center', marginTop: 16 }}
          >
            {submitting ? (
              <span className="btn-spinner">
                <i className="bi bi-arrow-repeat spin-icon"></i> Processing…
              </span>
            ) : (
              <span className="btn-text">
                <i className="bi bi-arrow-right-circle-fill"></i> Continue to Payment
              </span>
            )}
          </button>

          <Link
            to={PATHS.cart}
            className="btn-csr secondary full-w sm"
            style={{ justifyContent: 'center', marginTop: 8 }}
          >
            <i className="bi bi-arrow-left"></i> Back to Cart
          </Link>
        </>
      )}

      <div
        style={{
          marginTop: 18, padding: '12px 14px',
          background: 'var(--gray-900)', border: '1px solid var(--border)',
          fontFamily: 'var(--font-label)', display: 'flex', gap: 10, alignItems: 'center',
        }}
      >
        <i className="bi bi-shield-lock-fill" style={{ color: 'var(--accent)', fontSize: 18 }}></i>
        <span>
          Secured by <strong style={{ color: 'var(--white)' }}>Razorpay</strong> · 256-bit SSL
        </span>
      </div>

      <div className="summary-trust">
        {TRUST.map((t) => (
          <div key={t.label} className="summary-trust-item rajdhani-lbl-text-sm">
            <i className={`bi ${t.icon}`}></i> {t.label}
          </div>
        ))}
      </div>
    </aside>
  )
}
