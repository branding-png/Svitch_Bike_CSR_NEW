import { Link } from 'react-router-dom'

// Blog sidebar promo card — mirrors CSR_New_web `.widget-promo`.
export default function PromoWidget({
  title       = 'Ready to Ride?',
  description = 'Explore our full range of premium electric motorcycles and e-bicycles.',
  ctaLabel    = 'Shop Now',
  ctaIcon     = 'bi-cart-fill',
  to          = '/shop',
}) {
  return (
    <div aria-label="PromoWidget" className="card-base widget widget-promo">
      <h3>{title}</h3>
      <p>{description}</p>
      <Link to={to} className="rajdhani-lbl-text-sm btn-csr primary sm full-w">
        <i className={`bi ${ctaIcon}`}></i> {ctaLabel}
      </Link>
    </div>
  )
}
