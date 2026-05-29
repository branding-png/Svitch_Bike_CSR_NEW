import { Link } from 'react-router-dom'
import { PATHS } from '@/utils/routes'

// Empty-cart state â€” shown when the cart has zero items.
export default function CartEmpty() {
  return (
    <div aria-label="CartEmpty" className="card-base cart-empty">
      <i className="bi bi-cart-x"></i>
      <h3 style={{ color: 'var(--white)', marginBottom: 10 }}>Your cart is empty</h3>
      <p style={{ marginBottom: 24 }}>
        Looks like you haven&apos;t added any bikes yet. Let&apos;s change that.
      </p>
      <Link to={PATHS.shop} className="btn-csr primary">
        <i className="bi bi-bag"></i> Shop Now
      </Link>
    </div>
  )
}
