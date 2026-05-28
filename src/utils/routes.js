// Route path constants — avoids magic strings across the app.
// URLs intentionally mirror the original CSR_New_web folder layout
// (just without the .html extension and the /pages/ prefix).

export const PATHS = {
  home: '/',

  // Flagship product landing
  csr762: '/csr-762',

  // Shop / commerce
  shop: '/shop',
  productDetail: '/shop/product/:id',
  cart: '/shop/cart',
  checkout: '/shop/checkout',
  payment: '/shop/payment',
  orderConfirmation: '/shop/order-confirmation',
  paymentFailed: '/shop/payment-failed',
  trackOrder: '/shop/track-order',
  compare: '/shop/compare',

  // Account
  dashboard: '/account/dashboard',
  profile: '/account/profile',
  orders: '/account/orders',
  orderDetail: '/account/orders/:id',
  invoices: '/account/invoices',
  returns: '/account/returns',
  returnRequest: '/account/return-request',
  serviceHistory: '/account/service-history',
  testRides: '/account/test-rides',
  wishlist: '/account/wishlist',
  addresses: '/account/addresses',
  notifications: '/account/notifications',
  savedJobs: '/account/saved-jobs',

  // Auth
  login: '/auth/login',
  register: '/auth/register',
  forgotPassword: '/auth/forgot-password',
  resetPassword: '/auth/reset-password',
  twoFactor: '/auth/two-factor',
  verifyEmail: '/auth/verify-email',

  // Company
  about: '/company/about',
  contact: '/company/contact',
  faq: '/company/faq',
  events: '/company/events',
  gallery: '/company/gallery',
  reviews: '/company/reviews',
  sustainability: '/company/sustainability',
  sitemap: '/sitemap',

  // Support
  ticket: '/support/ticket',
  dealers: '/support/dealers',
  chargingNetwork: '/support/charging-network',
  warranty: '/support/warranty',
  roadsideAssistance: '/support/roadside-assistance',
  ownersManual: '/support/owners-manual',
  bookService: '/support/book-service',
  saversScale: '/support/savers-scale',
  specifications: '/support/specifications',

  // Blog / Press / Careers
  blog: '/blog',
  blogDetail: '/blog/:slug',
  press: '/press',
  pressDetail: '/press/:slug',
  mediaKit: '/press/media-kit',
  career: '/careers',
  careerDetail: '/careers/:slug',

  // Offers
  bookTestRide: '/offers/book-test-ride',
  finance: '/offers/finance',
  insurance: '/offers/insurance',
  referral: '/offers/referral',
  tradeIn: '/offers/trade-in',

  // Legal
  termCondition: '/legal/term-condition',
  privacyPolicy: '/legal/privacy-policy',
  cookiePolicy: '/legal/cookie-policy',
  refundPolicy: '/legal/refund-policy',
  shippingPolicy: '/legal/shipping-policy',
  accessibility: '/legal/accessibility',

  // System
  notFound: '*',
  offline: '/offline',
  maintenance: '/maintenance',
  comingSoon: '/coming-soon',
  unsubscribe: '/unsubscribe',
  thankYou: '/thank-you',
}
