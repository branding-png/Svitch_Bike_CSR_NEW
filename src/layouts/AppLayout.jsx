import { useEffect } from 'react'
import { Outlet, useLocation } from 'react-router-dom'
import Navbar from './Navbar'
import Footer from './Footer'
import CookieConsent from './CookieConsent'
import SkipToMain from './SkipToMain'
import Preloader from './Preloader'
import { useReveal } from '@/hooks/useReveal'

// Standard chrome wrapper for every public-facing route. Auth/system pages
// can opt out by using <AuthLayout> instead.
export default function AppLayout() {
  const { pathname } = useLocation()

  // Reset scroll on route change. The site's scroll container is
  // .wrapper-body (html/body have overflow: hidden), so window.scrollTo
  // would do nothing here.
  useEffect(() => {
    const wrap = document.querySelector('.wrapper-body')
    if (wrap) wrap.scrollTop = 0
    else window.scrollTo({ top: 0, left: 0, behavior: 'instant' })
  }, [pathname])

  // Animate `.reveal` elements as they scroll into view. Re-run whenever the
  // route changes so newly-mounted page content gets observed too.
  useReveal([pathname])

  return (
    <div className="wrapper-body">
      <Preloader />
      <SkipToMain />
      <Navbar />
      <main id="main-content">
        <Outlet />
      </main>
      <Footer />
      <CookieConsent />
    </div>
  )
}
