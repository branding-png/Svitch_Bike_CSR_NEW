import { Link } from 'react-router-dom'
import { PATHS } from '@/utils/routes'

export default function WishlistEmpty() {
  return (
    <div aria-label="WishlistEmpty" className="card-base account-empty">
      <i className="bi bi-heart"></i>
      <h3>Your wishlist is empty</h3>
      <p>Start exploring bikes and save your favorites for later.</p>
      <Link to={PATHS.shop} className="btn-csr primary">
        <i className="bi bi-bag"></i> Shop Now
      </Link>
    </div>
  )
}
