import { Link } from 'react-router-dom'
import { Card, SectionHeader } from '@/ui'
import { PATHS } from '@/utils/routes'

// Internal "kitchen sink" page — links to every section folder for quick QA.
const GROUPS = [
  { label: 'Shop',    items: [['Shop', PATHS.shop], ['PDP', '/shop/product/csr-762'], ['Cart', PATHS.cart], ['Checkout', PATHS.checkout], ['Payment', PATHS.payment], ['Confirmation', PATHS.orderConfirmation + '?id=SV234581']] },
  { label: 'Account', items: [['Dashboard', PATHS.dashboard], ['Orders', PATHS.orders], ['Order Detail', '/account/orders/SV234581'], ['Wishlist', PATHS.wishlist]] },
  { label: 'Auth',    items: [['Login', PATHS.login], ['Register', PATHS.register], ['2FA', PATHS.twoFactor], ['Verify Email', PATHS.verifyEmail]] },
  { label: 'Support', items: [['Ticket', PATHS.ticket], ['Dealers', PATHS.dealers], ['Charging', PATHS.chargingNetwork], ['Saver\'s Scale', PATHS.saversScale]] },
  { label: 'Company', items: [['About', PATHS.about], ['Contact', PATHS.contact], ['FAQ', PATHS.faq], ['Reviews', PATHS.reviews]] },
  { label: 'System',  items: [['404', '/zz-not-a-page'], ['Offline', PATHS.offline], ['Maintenance', PATHS.maintenance], ['Coming Soon', PATHS.comingSoon], ['Unsubscribe', PATHS.unsubscribe]] },
]

export default function ExtraSection() {
  return (
    <section className="section-pad">
      <div className="container">
        <SectionHeader label="QA" title="Extra / Kitchen Sink" description="Quick links to every major section — useful during dev." />
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(240px, 1fr))', gap: 14, marginTop: 28 }}>
          {GROUPS.map(g => (
            <Card key={g.label} style={{ padding: 20 }}>
              <h4 style={{ marginBottom: 10 }}>{g.label}</h4>
              <ul style={{ listStyle: 'none', padding: 0, display: 'grid', gap: 6 }}>
                {g.items.map(([label, to]) => (
                  <li key={to + label}><Link to={to} className="rajdhani-lbl-text-sm">{label}</Link></li>
                ))}
              </ul>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
