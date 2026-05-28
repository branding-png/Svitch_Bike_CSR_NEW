import { Link } from 'react-router-dom'
import { PATHS } from '@/utils/routes'

const PREVIEW = [
  { img: '/images/product/csr-762-black.webp',   alt: 'CSR 762 electric motorcycle in Matte Black' },
  { img: '/images/product/csr-762-red-1.webp',   alt: 'CSR 762 in Racing Red — side profile' },
  { img: '/images/product/csr-762-gray-1.webp',  alt: 'CSR 762 in Graphite Grey — side profile' },
  { img: '/images/product/speed_csr_762-1.webp', alt: 'CSR 762 at speed on open road' },
]

export default function WishlistPreview({ extraCount = 1 }) {
  const productPath = PATHS.productDetail.replace(':id', 'csr-762')

  return (
    <div aria-label="WishlistPreview" role="region" className="account-section">
      <div className="account-section-head">
        <h3>Wishlist Preview</h3>
        <Link to={PATHS.wishlist}>View All</Link>
      </div>
      <div className="wishlist-preview">
        {PREVIEW.map((p) => (
          <Link key={p.img} to={productPath} className="wishlist-preview-item">
            <img src={p.img} alt={p.alt} loading="lazy" decoding="async" />
          </Link>
        ))}
        <Link to={PATHS.wishlist} className="wishlist-preview-item wishlist-preview-more">
          +{extraCount} more
        </Link>
      </div>
    </div>
  )
}
