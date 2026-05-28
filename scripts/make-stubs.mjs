// One-shot generator for stub route components. Run once with:
//   node scripts/make-stubs.mjs
// After Step 6 you can delete this file.

import { writeFileSync, mkdirSync, existsSync } from 'node:fs'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'

const ROOT = dirname(dirname(fileURLToPath(import.meta.url)))
const ROUTES_DIR = join(ROOT, 'src', 'routes')

// [folder, ComponentName, original-source-html, displayTitle]
const stubs = [
  // root
  ['',         'Home',              'index.html',                              'Home'],
  ['',         'Sitemap',           'pages/sitemap.html',                       'Sitemap'],
  ['',         'ThankYou',          'pages/thank-you.html',                     'Thank You'],
  ['',         'ExtraSection',      'pages/extra-section.html',                 'Extra Section'],

  // shop
  ['shop',     'Shop',              'pages/shop/shop.html',                     'Shop'],
  ['shop',     'ProductDetail',     'pages/shop/product-detail.html',           'Product Detail'],
  ['shop',     'Cart',              'pages/shop/cart.html',                     'Cart'],
  ['shop',     'Checkout',          'pages/shop/checkout.html',                 'Checkout'],
  ['shop',     'Payment',           'pages/shop/payment.html',                  'Payment'],
  ['shop',     'OrderConfirmation', 'pages/shop/order-confirmation.html',       'Order Confirmation'],
  ['shop',     'PaymentFailed',     'pages/shop/payment-failed.html',           'Payment Failed'],
  ['shop',     'TrackOrder',        'pages/shop/track-order.html',              'Track Order'],
  ['shop',     'Compare',           'pages/shop/compare.html',                  'Compare'],

  // account
  ['account',  'Dashboard',         'pages/account/dashboard.html',             'Dashboard'],
  ['account',  'Profile',           'pages/account/profile.html',               'My Profile'],
  ['account',  'Orders',            'pages/account/orders.html',                'My Orders'],
  ['account',  'OrderDetail',       'pages/account/order-detail.html',          'Order Detail'],
  ['account',  'Invoices',          'pages/account/invoices.html',              'Invoices & GST'],
  ['account',  'Returns',           'pages/account/returns.html',               'Returns & Refunds'],
  ['account',  'ReturnRequest',     'pages/account/return-request.html',        'Return Request'],
  ['account',  'ServiceHistory',    'pages/account/service-history.html',       'Service History'],
  ['account',  'TestRides',         'pages/account/test-rides.html',            'My Test Rides'],
  ['account',  'Wishlist',          'pages/account/wishlist.html',              'Wishlist'],
  ['account',  'Addresses',         'pages/account/addresses.html',             'Addresses'],
  ['account',  'Notifications',     'pages/account/notifications.html',         'Notifications'],
  ['account',  'SavedJobs',         'pages/account/saved-jobs.html',            'Saved Jobs'],

  // auth
  ['auth',     'Login',             'pages/auth/login.html',                    'Sign In'],
  ['auth',     'Register',          'pages/auth/register.html',                 'Create Account'],
  ['auth',     'ForgotPassword',    'pages/auth/forgot-password.html',          'Forgot Password'],
  ['auth',     'ResetPassword',     'pages/auth/reset-password.html',           'Reset Password'],
  ['auth',     'TwoFactor',         'pages/auth/two-factor.html',               'Two-Factor Auth'],
  ['auth',     'VerifyEmail',       'pages/auth/verify-email.html',             'Verify Email'],

  // company
  ['company',  'About',             'pages/company/about.html',                 'About Svitch'],
  ['company',  'Contact',           'pages/company/contact.html',               'Contact'],
  ['company',  'Faq',               'pages/company/faq.html',                   'FAQs'],
  ['company',  'Events',            'pages/company/events.html',                'Events'],
  ['company',  'Gallery',           'pages/company/gallery.html',               'Gallery'],
  ['company',  'Reviews',           'pages/company/reviews.html',               'Customer Reviews'],
  ['company',  'Sustainability',    'pages/company/sustainability.html',        'Sustainability'],

  // support
  ['support',  'Ticket',            'pages/support/ticket.html',                'Support Tickets'],
  ['support',  'Dealers',           'pages/support/dealers.html',               'Dealers'],
  ['support',  'ChargingNetwork',   'pages/support/charging-network.html',      'Charging Network'],
  ['support',  'Warranty',          'pages/support/warranty.html',              'Register & Warranty'],
  ['support',  'RoadsideAssistance','pages/support/roadside-assistance.html',   'Roadside Assistance'],
  ['support',  'OwnersManual',      'pages/support/owners-manual.html',         'Owner’s Manual'],
  ['support',  'BookService',       'pages/support/book-service.html',          'Book Service'],
  ['support',  'SaversScale',       'pages/support/savers-scale.html',          'Saver’s Scale'],
  ['support',  'Specifications',    'pages/support/specifications.html',        'Specifications'],

  // blog
  ['blog',     'Blog',              'pages/blog/blog.html',                     'Blog'],
  ['blog',     'BlogDetail',        'pages/blog/blog-detail.html',              'Blog Detail'],

  // careers
  ['careers',  'Career',            'pages/careers/career.html',                'Careers'],
  ['careers',  'CareerDetail',      'pages/careers/career-detail.html',         'Career Detail'],

  // press
  ['press',    'Press',             'pages/press/press.html',                   'Press'],
  ['press',    'PressDetail',       'pages/press/press-detail.html',            'Press Detail'],
  ['press',    'MediaKit',          'pages/press/media-kit.html',               'Media Kit'],

  // offers
  ['offers',   'BookTestRide',      'pages/offers/book-test-ride.html',         'Book Test Ride'],
  ['offers',   'Finance',           'pages/offers/finance.html',                'Finance'],
  ['offers',   'Insurance',         'pages/offers/insurance.html',              'Insurance'],
  ['offers',   'Referral',          'pages/offers/referral.html',               'Refer & Earn'],
  ['offers',   'TradeIn',           'pages/offers/trade-in.html',               'Trade-In'],

  // legal
  ['legal',    'TermCondition',     'pages/legal/term-condition.html',          'Terms & Conditions'],
  ['legal',    'PrivacyPolicy',     'pages/legal/privacy-policy.html',          'Privacy Policy'],
  ['legal',    'CookiePolicy',      'pages/legal/cookie-policy.html',           'Cookie Policy'],
  ['legal',    'RefundPolicy',      'pages/legal/refund-policy.html',           'Refund Policy'],
  ['legal',    'ShippingPolicy',    'pages/legal/shipping-policy.html',         'Shipping Policy'],
  ['legal',    'Accessibility',     'pages/legal/accessibility.html',           'Accessibility'],

  // system
  ['system',   'NotFound',          '404.html',                                  'Page Not Found'],
  ['system',   'Offline',           'offline.html',                              'You’re Offline'],
  ['system',   'Maintenance',       'pages/maintenance.html',                    'Maintenance'],
  ['system',   'ComingSoon',        'pages/coming-soon.html',                    'Coming Soon'],
  ['system',   'Unsubscribe',       'pages/unsubscribe.html',                    'Unsubscribed'],
]

function tpl(name, source, title) {
  return `// AUTO-GENERATED STUB — will be replaced in Step 9 by the real port of
// CSR_New_web/${source}. Until then this renders a placeholder so every URL in
// the original site resolves to *something* in the React app.

export default function ${name}() {
  return (
    <section className="section-pad">
      <div className="container">
        <span className="section-label">Stub</span>
        <h1 className="section-title">${title}</h1>
        <p className="section-desc" style={{ marginTop: 12 }}>
          TODO: port from <code>CSR_New_web/${source}</code>
        </p>
      </div>
    </section>
  )
}
`
}

let made = 0
let skipped = 0
for (const [folder, name, source, title] of stubs) {
  const dir = folder ? join(ROUTES_DIR, folder) : ROUTES_DIR
  if (!existsSync(dir)) mkdirSync(dir, { recursive: true })
  const file = join(dir, `${name}.jsx`)
  if (existsSync(file)) { skipped++; continue }
  writeFileSync(file, tpl(name, source, title), 'utf8')
  made++
}

console.log(`Stub generation done: ${made} created, ${skipped} already existed.`)
console.log(`Total expected: ${stubs.length}`)
