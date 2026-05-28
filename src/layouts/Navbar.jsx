import { useEffect, useState } from 'react'
import { Link, NavLink } from 'react-router-dom'
import { PATHS } from '@/utils/routes'
import UserDropdown from './UserDropdown'
import NavSearchDrawer from './NavSearchDrawer'
import MobileMenu from './MobileMenu'
import BookNowButton from '@/features/book-now/BookNowButton'

// Top navigation. Mirrors the canonical .navbar-csr structure from the static
// site, but uses <Link>/<NavLink> for SPA-routed navigation. The brand logo
// and category sub-menu items are kept here as plain anchors that point at
// route paths; styling comes from components.css.
export default function Navbar() {
  const [searchOpen, setSearchOpen] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  // Add `.scrolled` to the navbar after the user scrolls > 60px.
  // Mirrors CSR_New_web/main.js — uses `.wrapper-body` as the scroll target
  // (html/body have overflow:hidden in this layout, so window doesn't scroll).
  useEffect(() => {
    const wrap = document.querySelector('.wrapper-body') || window
    function onScroll() {
      const top = wrap === window ? window.scrollY : wrap.scrollTop
      setScrolled(top > 60)
    }
    onScroll()
    wrap.addEventListener('scroll', onScroll, { passive: true })
    return () => wrap.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <>
      <nav id="navbar" className={'navbar-csr' + (scrolled ? ' scrolled' : '')}>
        <div className="nav-inner">
          <Link to={PATHS.home} className="nav-logo">
            {/* Use a public path so the asset lives in /public/images/logos/ */}
            <img src="/images/logos/CSR-762-f-logo.png" alt="Svitch Bike" height="30" />
          </Link>

          <ul className="nav-links" id="navLinks">
            <li><NavLink end to={PATHS.home} className="rajdhani-lbl-text-sm">Home</NavLink></li>
            <li><NavLink to={PATHS.csr762} className="rajdhani-lbl-text-sm">CSR 762</NavLink></li>
            <li><NavLink to={PATHS.shop} className="rajdhani-lbl-text-sm">Products</NavLink></li>
            <li><NavLink to={PATHS.dealers} className="rajdhani-lbl-text-sm">Dealership</NavLink></li>
            <li><NavLink to={PATHS.saversScale} className="rajdhani-lbl-text-sm">Saver&apos;s Scale</NavLink></li>
            <li><NavLink to={PATHS.blog} className="rajdhani-lbl-text-sm">Blog</NavLink></li>
            <li><NavLink to={PATHS.about} className="rajdhani-lbl-text-sm">About</NavLink></li>
            <li><NavLink to={PATHS.career} className="rajdhani-lbl-text-sm">Career</NavLink></li>
            <li><NavLink to={PATHS.contact} className="rajdhani-lbl-text-sm">Contact</NavLink></li>
          </ul>

          <div className="nav-actions">
            <div className="nav-shop-icons">
              <button
                className="nav-icon-btn btnSearch"
                aria-label="Search"
                onClick={() => setSearchOpen(true)}
              >
                <i className="bi bi-search"></i>
              </button>
              <UserDropdown />
            </div>
            <BookNowButton />
            <a href="https://svitchbike.com/" className="rajdhani-lbl-text-sm btn-csr primary sm">
              E Bicycle
            </a>
            <button
              id="hamburger"
              className={'hamburger' + (mobileOpen ? ' open' : '')}
              aria-label="Menu"
              aria-expanded={mobileOpen}
              onClick={() => setMobileOpen((v) => !v)}
            >
              <span></span><span></span><span></span>
            </button>
          </div>
        </div>
      </nav>

      <NavSearchDrawer open={searchOpen} onClose={() => setSearchOpen(false)} />
      <MobileMenu open={mobileOpen} onClose={() => setMobileOpen(false)} />
    </>
  )
}
