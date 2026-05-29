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
  dealers: '/support/dealers',
  chargingNetwork: '/support/charging-network',
  warranty: '/support/warranty',
  ownersManual: '/support/owners-manual',
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

  // Legal
  termCondition: '/legal/term-condition',
  privacyPolicy: '/legal/privacy-policy',
  cookiePolicy: '/legal/cookie-policy',
  refundPolicy: '/legal/refund-policy',
  shippingPolicy: '/legal/shipping-policy',
  accessibility: '/legal/accessibility',

  // System
  offline: '/offline',
  maintenance: '/maintenance',
  comingSoon: '/coming-soon',
  unsubscribe: '/unsubscribe',
  thankYou: '/thank-you',
}
