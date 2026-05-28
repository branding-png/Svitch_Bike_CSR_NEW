import { Link } from 'react-router-dom'
import { PATHS } from '@/utils/routes'

// Sitemap grid — mirrors CSR_New_web `#sitemap-main`. 10 groups of links
// driven by data; each item is `[label, to, isNew?]`. `to` accepts a React
// Router path (rendered as <Link>) or an absolute URL (rendered as <a>).
const GROUPS = [
  {
    icon: 'bi-house-fill',
    title: 'Home & Marketing',
    links: [
      ['Home',              PATHS.home],
      ['About Svitch',      PATHS.about],
      ['Contact',           PATHS.contact],
      ['FAQ',               PATHS.faq],
      ['Customer Reviews',  PATHS.reviews, true],
    ],
  },
  {
    icon: 'bi-bag-fill',
    title: 'Shop',
    links: [
      ['All Products',         PATHS.shop],
      ['Product Detail',       '/shop/product/csr-762-black'],
      ['Compare Bikes',        PATHS.compare],
      ['Cart',                 PATHS.cart],
      ['Checkout',             PATHS.checkout],
      ['Payment Failed',       PATHS.paymentFailed, true],
      ['Order Confirmation',   PATHS.orderConfirmation],
      ['Track Order',          PATHS.trackOrder],
    ],
  },
  {
    icon: 'bi-person-fill',
    title: 'Account',
    links: [
      ['Dashboard',         PATHS.dashboard],
      ['Profile',           PATHS.profile],
      ['Notifications',     PATHS.notifications, true],
      ['My Orders',         PATHS.orders],
      ['Order Detail',      '/account/orders/SVT-847291'],
      ['Invoices & GST',    PATHS.invoices, true],
      ['Returns',           PATHS.returns, true],
      ['Request a Return',  PATHS.returnRequest, true],
      ['Service History',   PATHS.serviceHistory, true],
      ['My Test Rides',     PATHS.testRides],
      ['Wishlist',          PATHS.wishlist],
      ['Addresses',         PATHS.addresses],
      ['Saved Jobs',        PATHS.savedJobs],
    ],
  },
  {
    icon: 'bi-shield-lock-fill',
    title: 'Authentication',
    links: [
      ['Sign In',           PATHS.login],
      ['Create Account',    PATHS.register],
      ['Forgot Password',   PATHS.forgotPassword],
      ['Reset Password',    PATHS.resetPassword],
      ['Verify Email',      PATHS.verifyEmail],
      ['Two-Factor Auth',   PATHS.twoFactor, true],
    ],
  },
  {
    icon: 'bi-tools',
    title: 'Support',
    links: [
      ['Find a Dealer',         PATHS.dealers],
      ['Support Tickets',       PATHS.ticket, true],
      ['Book Service',          PATHS.bookService],
      ['Warranty',              PATHS.warranty],
      ['Roadside Assistance',   PATHS.roadsideAssistance],
      ['Charging Network',      PATHS.chargingNetwork],
      ["Saver's Scale",         PATHS.saversScale],
      ['Specifications',        PATHS.specifications],
      ["Owner's Manual",        PATHS.ownersManual],
      ['Press & Newsroom',      PATHS.press],
      ['Press Release',         '/press/series-b-raise'],
    ],
  },
  {
    icon: 'bi-building-fill',
    title: 'Company',
    links: [
      ['About Svitch',     PATHS.about],
      ['Sustainability',   PATHS.sustainability],
      ['Careers',          PATHS.career],
      ['Career Detail',    '/careers/senior-electrical-engineer'],
      ['Blog',             PATHS.blog],
      ['Blog Article',     '/blog/csr-762-launch'],
      ['Media Kit',        PATHS.mediaKit, true],
      ['Events',           PATHS.events, true],
      ['Gallery',          PATHS.gallery, true],
    ],
  },
  {
    icon: 'bi-gift-fill',
    title: 'Offers & Finance',
    links: [
      ['Book Test Ride',           PATHS.bookTestRide],
      ['Refer & Earn',             PATHS.referral],
      ['EMI & Finance Calculator', PATHS.finance],
      ['Trade-In Old Bike',        PATHS.tradeIn],
      ['Insurance Plans',          PATHS.insurance],
      ['Booking Confirmed',        PATHS.thankYou],
    ],
  },
  {
    icon: 'bi-grid-3x3-gap-fill',
    title: 'Utility',
    links: [
      ['Sitemap',           PATHS.sitemap],
      ['Email Unsubscribe', PATHS.unsubscribe],
      ['Extra Sections',    '/extra-section'],
      ['Coming Soon',       PATHS.comingSoon, true],
      ['Maintenance',       PATHS.maintenance, true],
      ['Offline (PWA)',     PATHS.offline, true],
    ],
  },
  {
    icon: 'bi-file-text-fill',
    title: 'Legal',
    links: [
      ['Terms & Conditions',      PATHS.termCondition],
      ['Privacy Policy',          PATHS.privacyPolicy],
      ['Cookie Policy',           PATHS.cookiePolicy],
      ['Shipping Policy',         PATHS.shippingPolicy],
      ['Refund Policy',           PATHS.refundPolicy],
      ['Accessibility Statement', PATHS.accessibility, true],
    ],
  },
  {
    icon: 'bi-exclamation-triangle-fill',
    title: 'Error Pages',
    links: [
      // PATHS.notFound is the '*' catch-all selector; link to a real bad
      // URL so the 404 page actually renders.
      ['404 — Not Found', '/this-page-does-not-exist'],
    ],
  },
]

function SitemapLink({ label, to }) {
  const isExternal = !to || /^https?:\/\//.test(to)
  const inner = (
    <>
      <i className="bi bi-chevron-right"></i>
      {label}
    </>
  )
  return isExternal
    ? <a href={to} className="rajdhani-lbl-text-sm">{inner}</a>
    : <Link to={to} className="rajdhani-lbl-text-sm">{inner}</Link>
}

// Sum across all groups — exported so the Sitemap route can render the
// running page count in its hero description.
export const TOTAL_PAGES = GROUPS.reduce((n, g) => n + g.links.length, 0)
export const TOTAL_GROUPS = GROUPS.length

export default function SitemapGrid({ groups = GROUPS }) {
  return (
    <section id="sitemap-main"  style={{ background: 'var(--gray-900)' }}>
      <div className="container">
        <div className="sitemap-grid">
          {groups.map((g) => (
            <div key={g.title} className="sitemap-group">
              <div className="sitemap-head">
                <span className="sitemap-icon">
                  <i className={`bi ${g.icon}`}></i>
                </span>
                <h4>{g.title}</h4>
                <span className="sitemap-count rajdhani-lbl-text-sm">{g.links.length}</span>
              </div>
              <div className="sitemap-links">
                {g.links.map(([label, to]) => (
                  <SitemapLink key={label} label={label} to={to} />
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
