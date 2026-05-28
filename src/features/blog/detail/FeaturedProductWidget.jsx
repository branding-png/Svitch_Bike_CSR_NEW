import { Link } from 'react-router-dom'

// Blog detail sidebar product callout — mirrors CSR_New_web `.widget-product`.
// "Buy Now" deep-links to /shop by default; pass `onBuyClick` to override
// (e.g. to open a booking modal) — the click handler short-circuits the link.
export default function FeaturedProductWidget({
  label       = 'Featured in This Article',
  image       = '/images/logos/CSR762-Logo-w.png',
  alt         = 'CSR 762',
  name        = 'NXE Pro',
  price       = '₹1,25,000',
  buyTo       = '/shop',
  detailsTo   = '/support/specifications',
  onBuyClick,
}) {
  return (
    <div aria-label="FeaturedProductWidget" role="region" className="card-base widget widget-product">
      <span className="widget-product-label">{label}</span>
      <img src={image} alt={alt} loading="lazy" decoding="async" />
      <h4>{name}</h4>
      <span className="price">{price}</span>
      <Link
        to={buyTo}
        className="btn-csr primary sm"
        onClick={onBuyClick ? (e) => { e.preventDefault(); onBuyClick(e) } : undefined}
      >
        <i className="bi bi-cart-fill"></i> Buy Now
      </Link>
      <Link to={detailsTo} className="btn-csr secondary sm">
        View Full Details
      </Link>
    </div>
  )
}
