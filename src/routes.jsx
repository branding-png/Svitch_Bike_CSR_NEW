import { lazy, Suspense } from 'react'
import { createBrowserRouter } from 'react-router-dom'
import AppLayout from '@/layouts/AppLayout'
import { PATHS } from '@/utils/routes'

/* ────────────────────────────────────────────────────────────────────────
   Single source of truth for all routes. Each route is code-split via
   React.lazy so the initial JS bundle stays small.
   ──────────────────────────────────────────────────────────────────────── */

// root
const Home          = lazy(() => import('@/routes/Home'))
const CSR762        = lazy(() => import('@/routes/CSR762'))
const Sitemap       = lazy(() => import('@/routes/Sitemap'))
const ThankYou      = lazy(() => import('@/routes/ThankYou'))

// shop
const Shop              = lazy(() => import('@/routes/shop/Shop'))
const ProductDetail     = lazy(() => import('@/routes/shop/ProductDetail'))

// company
const About          = lazy(() => import('@/routes/company/About'))
const Contact        = lazy(() => import('@/routes/company/Contact'))
const Faq            = lazy(() => import('@/routes/company/Faq'))
const Events         = lazy(() => import('@/routes/company/Events'))
const Gallery        = lazy(() => import('@/routes/company/Gallery'))
const Reviews        = lazy(() => import('@/routes/company/Reviews'))
const Sustainability = lazy(() => import('@/routes/company/Sustainability'))

// support
const Dealers            = lazy(() => import('@/routes/support/Dealers'))
const ChargingNetwork    = lazy(() => import('@/routes/support/ChargingNetwork'))
const Warranty           = lazy(() => import('@/routes/support/Warranty'))
const OwnersManual       = lazy(() => import('@/routes/support/OwnersManual'))
const SaversScale        = lazy(() => import('@/routes/support/SaversScale'))
const Specifications     = lazy(() => import('@/routes/support/Specifications'))

// blog / careers / press
const Blog          = lazy(() => import('@/routes/blog/Blog'))
const BlogDetail    = lazy(() => import('@/routes/blog/BlogDetail'))
const Career        = lazy(() => import('@/routes/careers/Career'))
const CareerDetail  = lazy(() => import('@/routes/careers/CareerDetail'))
const Press         = lazy(() => import('@/routes/press/Press'))
const PressDetail   = lazy(() => import('@/routes/press/PressDetail'))
const MediaKit      = lazy(() => import('@/routes/press/MediaKit'))

// offers
const BookTestRide = lazy(() => import('@/routes/offers/BookTestRide'))

// legal
const TermCondition  = lazy(() => import('@/routes/legal/TermCondition'))
const PrivacyPolicy  = lazy(() => import('@/routes/legal/PrivacyPolicy'))
const CookiePolicy   = lazy(() => import('@/routes/legal/CookiePolicy'))
const RefundPolicy   = lazy(() => import('@/routes/legal/RefundPolicy'))
const ShippingPolicy = lazy(() => import('@/routes/legal/ShippingPolicy'))
const Accessibility  = lazy(() => import('@/routes/legal/Accessibility'))

// system
const NotFound    = lazy(() => import('@/routes/system/NotFound'))
const Offline     = lazy(() => import('@/routes/system/Offline'))
const Maintenance = lazy(() => import('@/routes/system/Maintenance'))
const ComingSoon  = lazy(() => import('@/routes/system/ComingSoon'))
const Unsubscribe = lazy(() => import('@/routes/system/Unsubscribe'))

// Suspense fallback rendered while a lazy chunk downloads.
function PageLoading() {
  return (
    <section className="section-pad">
      <div className="container" style={{ minHeight: 240, display: 'grid', placeItems: 'center' }}>
        <span className="rajdhani-lbl-text-sm">Loading…</span>
      </div>
    </section>
  )
}

// Home is the first route the user sees, so the PageLoading splash is
// worth showing while its (larger) chunk arrives. Every other route uses
// `lazyRoute()` with NO fallback — they're smaller and rarely cold, so a
// brief blank frame is better than flashing a spinner on every nav.
const lazyRoute = (Component) => (
  <Suspense fallback={null}>
    <Component />
  </Suspense>
)

// Same shape but with the PageLoading splash. Used only by the home route.
const lazyRouteWithSplash = (Component) => (
  <Suspense fallback={<PageLoading />}>
    <Component />
  </Suspense>
)

export const router = createBrowserRouter([
  // Standalone — no chrome (no navbar, no footer)
  { path: PATHS.unsubscribe, element: lazyRoute(Unsubscribe) },
  { path: PATHS.comingSoon,  element: lazyRoute(ComingSoon) },
  { path: PATHS.maintenance, element: lazyRoute(Maintenance) },
  { path: PATHS.offline,     element: lazyRoute(Offline) },

  // Everything else uses the full chrome (Navbar + Footer + CookieConsent)
  {
    element: <AppLayout />,
    children: [
      { path: PATHS.home,         element: lazyRouteWithSplash(Home) },
      { path: PATHS.csr762,       element: lazyRoute(CSR762) },
      { path: PATHS.sitemap,      element: lazyRoute(Sitemap) },
      { path: '/thank-you',       element: lazyRoute(ThankYou) },

      // shop
      { path: PATHS.shop,              element: lazyRoute(Shop) },
      { path: PATHS.productDetail,     element: lazyRoute(ProductDetail) },

      // company
      { path: PATHS.about,          element: lazyRoute(About) },
      { path: PATHS.contact,        element: lazyRoute(Contact) },
      { path: PATHS.faq,            element: lazyRoute(Faq) },
      { path: PATHS.events,         element: lazyRoute(Events) },
      { path: PATHS.gallery,        element: lazyRoute(Gallery) },
      { path: PATHS.reviews,        element: lazyRoute(Reviews) },
      { path: PATHS.sustainability, element: lazyRoute(Sustainability) },

      // support
      { path: PATHS.dealers,            element: lazyRoute(Dealers) },
      { path: PATHS.chargingNetwork,    element: lazyRoute(ChargingNetwork) },
      { path: PATHS.warranty,           element: lazyRoute(Warranty) },
      { path: PATHS.ownersManual,       element: lazyRoute(OwnersManual) },
      { path: PATHS.saversScale,        element: lazyRoute(SaversScale) },
      { path: PATHS.specifications,     element: lazyRoute(Specifications) },

      // blog / careers / press
      { path: PATHS.blog,         element: lazyRoute(Blog) },
      { path: PATHS.blogDetail,   element: lazyRoute(BlogDetail) },
      { path: PATHS.career,       element: lazyRoute(Career) },
      { path: PATHS.careerDetail, element: lazyRoute(CareerDetail) },
      { path: PATHS.press,        element: lazyRoute(Press) },
      { path: PATHS.pressDetail,  element: lazyRoute(PressDetail) },
      { path: PATHS.mediaKit,     element: lazyRoute(MediaKit) },

      // offers
      { path: PATHS.bookTestRide, element: lazyRoute(BookTestRide) },

      // legal
      { path: PATHS.termCondition,  element: lazyRoute(TermCondition) },
      { path: PATHS.privacyPolicy,  element: lazyRoute(PrivacyPolicy) },
      { path: PATHS.cookiePolicy,   element: lazyRoute(CookiePolicy) },
      { path: PATHS.refundPolicy,   element: lazyRoute(RefundPolicy) },
      { path: PATHS.shippingPolicy, element: lazyRoute(ShippingPolicy) },
      { path: PATHS.accessibility,  element: lazyRoute(Accessibility) },

    ],
  },

  // 404 catch-all — standalone, no Navbar/Footer chrome
  { path: '*', element: lazyRoute(NotFound) },
])
