import { useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { PATHS } from '@/utils/routes'

// Slide-in mobile drawer. Auto-closes whenever the route changes.
export default function MobileMenu({ open, onClose }) {
  const { pathname, search } = useLocation()

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
        <li><Link className="rajdhani-lbl-text-sm" to={PATHS.shop}>Products</Link></li>
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
