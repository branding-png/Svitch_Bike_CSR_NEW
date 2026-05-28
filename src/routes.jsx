import { lazy, Suspense } from 'react'
import { createBrowserRouter } from 'react-router-dom'
import AppLayout from '@/layouts/AppLayout'
import AuthLayout from '@/layouts/AuthLayout'
import { PATHS } from '@/utils/routes'

/* ────────────────────────────────────────────────────────────────────────
   Single source of truth for all 71 routes. Each route is code-split via
   React.lazy so the initial JS bundle stays small. The route paths mirror
   the original CSR_New_web folder structure (minus .html and /pages/).
   ──────────────────────────────────────────────────────────────────────── */

// root
const Home          = lazy(() => import('@/routes/Home'))
const CSR762        = lazy(() => import('@/routes/CSR762'))
const Sitemap       = lazy(() => import('@/routes/Sitemap'))
const ThankYou      = lazy(() => import('@/routes/ThankYou'))
const ExtraSection  = lazy(() => import('@/routes/ExtraSection'))

// shop
const Shop              = lazy(() => import('@/routes/shop/Shop'))
const ProductDetail     = lazy(() => import('@/routes/shop/ProductDetail'))
const Cart              = lazy(() => import('@/routes/shop/Cart'))
const Checkout          = lazy(() => import('@/routes/shop/Checkout'))
const Payment           = lazy(() => import('@/routes/shop/Payment'))
const OrderConfirmation = lazy(() => import('@/routes/shop/OrderConfirmation'))
const PaymentFailed     = lazy(() => import('@/routes/shop/PaymentFailed'))
const TrackOrder        = lazy(() => import('@/routes/shop/TrackOrder'))
const Compare           = lazy(() => import('@/routes/shop/Compare'))

// account
const Dashboard      = lazy(() => import('@/routes/account/Dashboard'))
const Profile        = lazy(() => import('@/routes/account/Profile'))
const Orders         = lazy(() => import('@/routes/account/Orders'))
const OrderDetail    = lazy(() => import('@/routes/account/OrderDetail'))
const Invoices       = lazy(() => import('@/routes/account/Invoices'))
const Returns        = lazy(() => import('@/routes/account/Returns'))
const ReturnRequest  = lazy(() => import('@/routes/account/ReturnRequest'))
const ServiceHistory = lazy(() => import('@/routes/account/ServiceHistory'))
const TestRides      = lazy(() => import('@/routes/account/TestRides'))
const Wishlist       = lazy(() => import('@/routes/account/Wishlist'))
const Addresses      = lazy(() => import('@/routes/account/Addresses'))
const Notifications  = lazy(() => import('@/routes/account/Notifications'))
const SavedJobs      = lazy(() => import('@/routes/account/SavedJobs'))

// auth
const Login          = lazy(() => import('@/routes/auth/Login'))
const Register       = lazy(() => import('@/routes/auth/Register'))
const ForgotPassword = lazy(() => import('@/routes/auth/ForgotPassword'))
const ResetPassword  = lazy(() => import('@/routes/auth/ResetPassword'))
const TwoFactor      = lazy(() => import('@/routes/auth/TwoFactor'))
const VerifyEmail    = lazy(() => import('@/routes/auth/VerifyEmail'))

// company
const About          = lazy(() => import('@/routes/company/About'))
const Contact        = lazy(() => import('@/routes/company/Contact'))
const Faq            = lazy(() => import('@/routes/company/Faq'))
const Events         = lazy(() => import('@/routes/company/Events'))
const Gallery        = lazy(() => import('@/routes/company/Gallery'))
const Reviews        = lazy(() => import('@/routes/company/Reviews'))
const Sustainability = lazy(() => import('@/routes/company/Sustainability'))

// support
const Ticket             = lazy(() => import('@/routes/support/Ticket'))
const Dealers            = lazy(() => import('@/routes/support/Dealers'))
const ChargingNetwork    = lazy(() => import('@/routes/support/ChargingNetwork'))
const Warranty           = lazy(() => import('@/routes/support/Warranty'))
const RoadsideAssistance = lazy(() => import('@/routes/support/RoadsideAssistance'))
const OwnersManual       = lazy(() => import('@/routes/support/OwnersManual'))
const BookService        = lazy(() => import('@/routes/support/BookService'))
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
const Finance      = lazy(() => import('@/routes/offers/Finance'))
const Insurance    = lazy(() => import('@/routes/offers/Insurance'))
const Referral     = lazy(() => import('@/routes/offers/Referral'))
const TradeIn      = lazy(() => import('@/routes/offers/TradeIn'))

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

import { AuthGuard } from '@/layouts/guards'

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

// Protected lazy route — wraps in AuthGuard, no Suspense splash.
const lazyProtected = (Component) => (
  <AuthGuard>
    <Suspense fallback={null}>
      <Component />
    </Suspense>
  </AuthGuard>
)

export const router = createBrowserRouter([
  // Standalone — no chrome (no navbar, no footer, no auth header)
  { path: PATHS.twoFactor,   element: lazyRoute(TwoFactor) },
  { path: PATHS.unsubscribe, element: lazyRoute(Unsubscribe) },
  { path: PATHS.comingSoon,  element: lazyRoute(ComingSoon) },
  { path: PATHS.maintenance, element: lazyRoute(Maintenance) },
  { path: PATHS.offline,     element: lazyRoute(Offline) },
  { path: PATHS.login,       element: lazyRoute(Login) },
  { path: PATHS.register,    element: lazyRoute(Register) },
  { path: PATHS.verifyEmail,    element: lazyRoute(VerifyEmail) },
  { path: PATHS.forgotPassword, element: lazyRoute(ForgotPassword) },
  { path: PATHS.resetPassword,  element: lazyRoute(ResetPassword) },

  // Everything else uses the full chrome (Navbar + Footer + CookieConsent)
  {
    element: <AppLayout />,
    children: [
      { path: PATHS.home,         element: lazyRouteWithSplash(Home) },
      { path: PATHS.csr762,       element: lazyRoute(CSR762) },
      { path: PATHS.sitemap,      element: lazyRoute(Sitemap) },
      { path: '/thank-you',       element: lazyRoute(ThankYou) },
      { path: '/extra-section',   element: lazyRoute(ExtraSection) },

      // shop
      { path: PATHS.shop,              element: lazyRoute(Shop) },
      { path: PATHS.productDetail,     element: lazyRoute(ProductDetail) },
      { path: PATHS.cart,              element: lazyRoute(Cart) },
      { path: PATHS.checkout,          element: lazyRoute(Checkout) },
      { path: PATHS.payment,           element: lazyRoute(Payment) },
      { path: PATHS.orderConfirmation, element: lazyRoute(OrderConfirmation) },
      { path: PATHS.paymentFailed,     element: lazyRoute(PaymentFailed) },
      { path: PATHS.trackOrder,        element: lazyRoute(TrackOrder) },
      { path: PATHS.compare,           element: lazyRoute(Compare) },

      // account
      { path: PATHS.dashboard,      element: lazyProtected(Dashboard) },
      { path: PATHS.profile,        element: lazyProtected(Profile) },
      { path: PATHS.orders,         element: lazyProtected(Orders) },
      { path: PATHS.orderDetail,    element: lazyProtected(OrderDetail) },
      { path: PATHS.invoices,       element: lazyProtected(Invoices) },
      { path: PATHS.returns,        element: lazyProtected(Returns) },
      { path: PATHS.returnRequest,  element: lazyProtected(ReturnRequest) },
      { path: PATHS.serviceHistory, element: lazyProtected(ServiceHistory) },
      { path: PATHS.testRides,      element: lazyProtected(TestRides) },
      { path: PATHS.wishlist,       element: lazyProtected(Wishlist) },
      { path: PATHS.addresses,      element: lazyProtected(Addresses) },
      { path: PATHS.notifications,  element: lazyProtected(Notifications) },
      { path: PATHS.savedJobs,      element: lazyProtected(SavedJobs) },

      // company
      { path: PATHS.about,          element: lazyRoute(About) },
      { path: PATHS.contact,        element: lazyRoute(Contact) },
      { path: PATHS.faq,            element: lazyRoute(Faq) },
      { path: PATHS.events,         element: lazyRoute(Events) },
      { path: PATHS.gallery,        element: lazyRoute(Gallery) },
      { path: PATHS.reviews,        element: lazyRoute(Reviews) },
      { path: PATHS.sustainability, element: lazyRoute(Sustainability) },

      // support
      { path: PATHS.ticket,             element: lazyRoute(Ticket) },
      { path: PATHS.dealers,            element: lazyRoute(Dealers) },
      { path: PATHS.chargingNetwork,    element: lazyRoute(ChargingNetwork) },
      { path: PATHS.warranty,           element: lazyRoute(Warranty) },
      { path: PATHS.roadsideAssistance, element: lazyRoute(RoadsideAssistance) },
      { path: PATHS.ownersManual,       element: lazyRoute(OwnersManual) },
      { path: PATHS.bookService,        element: lazyRoute(BookService) },
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
      { path: PATHS.finance,      element: lazyRoute(Finance) },
      { path: PATHS.insurance,    element: lazyRoute(Insurance) },
      { path: PATHS.referral,     element: lazyRoute(Referral) },
      { path: PATHS.tradeIn,      element: lazyRoute(TradeIn) },

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
