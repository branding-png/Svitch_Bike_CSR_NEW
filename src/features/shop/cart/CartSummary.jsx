import { useState } from 'react'
import { Link } from 'react-router-dom'
import { PATHS } from '@/utils/routes'
import { useCart } from '@/contexts/CartContext'
import { useToast } from '@/contexts/ToastContext'
import { formatCurrency } from '@/utils/formatCurrency'

// Order summary card on the cart page — subtotal/GST/total + coupon + checkout CTA.
const TRUST = [
  { icon: 'bi-truck',                  label: 'Free Delivery' },
  { icon: 'bi-shield-check',           label: 'Secure Pay'    },
  { icon: 'bi-arrow-counterclockwise', label: '7-Day Return'  },
  { icon: 'bi-headset',                label: '24/7 Support'  },
]

export default function CartSummary() {
  const { items, subtotal, count } = useCart()
  const toast                      = useToast()
  const [coupon, setCoupon]        = useState('')

  const gst   = Math.round(subtotal * 0.18)
  const total = subtotal + gst

  const onApply = () => {
    if (!coupon.trim()) {
      toast.show('Please enter a coupon code.', 'error')
      return
    }
    toast.show('This coupon is not valid.', 'error')
  }

  return (
    <aside className="rajdhani-lbl-text-sm card-base cart-summary">
      <h3>Order Summary</h3>

      <div className="summary-row">
        <span>Subtotal ({count} {count === 1 ? 'item' : 'items'})</span>
        <span>{formatCurrency(subtotal)}</span>
      </div>
      <div className="summary-row">
        <span>Shipping</span>
        <span>Free</span>
      </div>
      <div className="summary-row">
        <span>GST (18%)</span>
        <span>{formatCurrency(gst)}</span>
      </div>
      <div className="summary-row total">
        <span>Total</span>
        <span>{formatCurrency(total)}</span>
      </div>

      <div className="coupon-row">
        <input
          type="text"
          placeholder="Coupon code"
          aria-label="Coupon code"
          value={coupon}
          onChange={(e) => setCoupon(e.target.value)}
        />
        <button type="button" className="btn-csr secondary sm" onClick={onApply}>
          Apply
        </button>
      </div>

      <Link
        to={PATHS.checkout}
        className={`rajdhani-lbl-text-sm btn-csr primary full-w${items.length === 0 ? ' is-disabled' : ''}`}
       
      >
        <i className="bi bi-lock-fill"></i> Proceed to Checkout
      </Link>

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
