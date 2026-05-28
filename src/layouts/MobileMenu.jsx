import { useEffect, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { PATHS } from '@/utils/routes'

// Slide-in mobile drawer. Top-level links + a single "Products" sub-list.
// Auto-closes whenever the route changes.
export default function MobileMenu({ open, onClose }) {
  const { pathname, search } = useLocation()
  const [productsOpen, setProductsOpen] = useState(false)

  // Auto-close on route change. Intentionally NOT depending on `onClose`:
  // the parent passes a fresh arrow each render, which would re-run the
  // effect on every render and instantly close the menu the moment it opens.
  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => { onClose() }, [pathname, search])

  return (
    <div className={'mobile-menu' + (open ? ' open' : '')} id="mobileMenu">
      <ul>
        <li><Link className="rajdhani-lbl-text-sm" to={PATHS.home}>Home</Link></li>
        <li><Link className="rajdhani-lbl-text-sm" to={PATHS.shop}>CSR 762</Link></li>
        <li className={'mobile-has-sub' + (productsOpen ? ' open' : '')}>
          <button
            type="button"
            className="rajdhani-lbl-text-sm mobile-sub-toggle"
            onClick={() => setProductsOpen((v) => !v)}
          >
            Products <i className="bi bi-chevron-down"></i>
          </button>
          <ul className="mobile-sub">
            <li><Link className="rajdhani-lbl-text-sm" to={PATHS.shop}>All Products</Link></li>
            <li><Link className="rajdhani-lbl-text-sm" to={`${PATHS.shop}?category=motorcycles`}>Electric Motorcycles</Link></li>
            <li><Link className="rajdhani-lbl-text-sm" to={`${PATHS.shop}?category=ebikes`}>E-Bicycles</Link></li>
            <li><Link className="rajdhani-lbl-text-sm" to={`${PATHS.shop}?category=spare-parts`}>Spare Parts</Link></li>
            <li><Link className="rajdhani-lbl-text-sm" to={`${PATHS.shop}?category=makhana`}>Nutraceutical Makhana</Link></li>
          </ul>
        </li>
        <li><Link className="rajdhani-lbl-text-sm" to={PATHS.dealers}>Dealership</Link></li>
        <li><Link className="rajdhani-lbl-text-sm" to={PATHS.saversScale}>Saver&apos;s Scale</Link></li>
        <li><Link className="rajdhani-lbl-text-sm" to={PATHS.blog}>Blog</Link></li>
        <li><Link className="rajdhani-lbl-text-sm" to={PATHS.about}>About</Link></li>
        <li><Link className="rajdhani-lbl-text-sm" to={PATHS.career}>Career</Link></li>
        <li><Link className="rajdhani-lbl-text-sm" to={PATHS.contact}>Contact</Link></li>
      </ul>
    </div>
  )
}
