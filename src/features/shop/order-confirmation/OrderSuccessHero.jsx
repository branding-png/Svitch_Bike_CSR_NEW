import { BreadCrumb } from '@/ui'
import { PATHS } from '@/utils/routes'

// Order-confirmation success hero — mirrors CSR_New_web `.page-hero.grad-tc`
// success state. Self-contained so the route stays tiny.
export default function OrderSuccessHero({
  customer = 'Arjun',
  orderNo  = '#SVT-847291',
}) {
  return (
    <section aria-label="OrderSuccessHero" className="page-hero grad-tc" style={{ paddingBottom: 40 }}>
      <div className="container">
        <div className="page-hero-inner" style={{ textAlign: 'center', margin: 'auto' }}>
          <div
            className="oc-success-badge"
            aria-hidden="true"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              justifyContent: 'center',
              width: 84,
              height: 84,
              borderRadius: '50%',
              background: 'rgba(34,197,94,0.15)',
              color: '#22c55e',
              fontSize: 46,
              marginBottom: 20,
            }}
          >
            <i className="bi bi-check2"></i>
          </div>
<div className='text-center'>
          <BreadCrumb
            className="oc-breadcrumb section-label justify-content-center"
            items={[
              { label: 'Home',         to: PATHS.home },
              { label: 'Shop',         to: PATHS.shop },
              { label: 'Cart',         to: PATHS.cart },
              { label: 'Checkout',     to: PATHS.checkout },
              { label: 'Payment',      to: PATHS.payment },
              { label: 'Confirmation' },
            ]}
          /></div>
          <h1 className="page-hero-title">
            Thank You, <span className="highlight" id="ocCustomer">{customer}</span>!
          </h1>
          <p className="page-hero-desc">
            Your order <strong id="ocNumber">{orderNo}</strong> has been confirmed.
            A receipt is on its way to your email.
          </p>
        </div>
      </div>
    </section>
  )
}
