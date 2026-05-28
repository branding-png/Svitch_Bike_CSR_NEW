// Step 9 Batch 7 — 6 system pages (final batch).
import { writeFileSync, mkdirSync } from 'node:fs'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'

const ROOT = dirname(dirname(fileURLToPath(import.meta.url)))
const w = (rel, body) => {
  const file = join(ROOT, 'src', 'routes', rel)
  mkdirSync(dirname(file), { recursive: true })
  writeFileSync(file, body, 'utf8')
}

/* NotFound */
w('system/NotFound.jsx', `import { Link } from 'react-router-dom'
import { Button } from '@/ui'
import { PATHS } from '@/utils/routes'

export default function NotFound() {
  return (
    <section className="section-pad" style={{ minHeight: '60vh', display: 'grid', placeItems: 'center' }}>
      <div className="container" style={{ textAlign: 'center', maxWidth: 540 }}>
        <span className="section-label">404</span>
        <h1 className="section-title" style={{ fontSize: 72, margin: '8px 0' }}>Not Found</h1>
        <p className="section-desc">The page you were after doesn't exist — or it took a detour we didn't.</p>
        <div style={{ display: 'flex', gap: 10, justifyContent: 'center', flexWrap: 'wrap', marginTop: 20 }}>
          <Button to={PATHS.home} variant="primary" icon="house-fill">Back to Home</Button>
          <Button to={PATHS.shop} variant="secondary" icon="grid-fill">Browse Shop</Button>
          <Link to={PATHS.sitemap} className="btn-csr secondary rajdhani-lbl-text-sm"><i className="bi bi-diagram-3"></i> Sitemap</Link>
        </div>
      </div>
    </section>
  )
}
`)

/* Offline */
w('system/Offline.jsx', `import { Button } from '@/ui'
import { PATHS } from '@/utils/routes'

export default function Offline() {
  return (
    <section className="section-pad" style={{ minHeight: '60vh', display: 'grid', placeItems: 'center' }}>
      <div className="container" style={{ textAlign: 'center', maxWidth: 520 }}>
        <i className="bi bi-wifi-off" style={{ fontSize: 72, color: 'var(--gray-400)' }}></i>
        <span className="section-label" style={{ marginTop: 14 }}>No Connection</span>
        <h1 className="section-title">You're offline</h1>
        <p className="section-desc">We can't reach the network. Check your connection and try again.</p>
        <div style={{ display: 'flex', gap: 10, justifyContent: 'center', flexWrap: 'wrap', marginTop: 20 }}>
          <Button variant="primary" icon="arrow-clockwise" onClick={() => location.reload()}>Retry</Button>
          <Button to={PATHS.home} variant="secondary" icon="house">Home</Button>
        </div>
      </div>
    </section>
  )
}
`)

/* Maintenance */
w('system/Maintenance.jsx', `export default function Maintenance() {
  return (
    <section className="section-pad" style={{ minHeight: '60vh', display: 'grid', placeItems: 'center' }}>
      <div className="container" style={{ textAlign: 'center', maxWidth: 540 }}>
        <i className="bi bi-tools" style={{ fontSize: 72, color: 'var(--accent)' }}></i>
        <span className="section-label" style={{ marginTop: 14 }}>Be Right Back</span>
        <h1 className="section-title">Scheduled Maintenance</h1>
        <p className="section-desc">We're rolling out an update to make the site faster. Expected back in about 30 minutes.</p>
        <p className="rajdhani-lbl-text-sm" style={{ marginTop: 24, color: 'var(--gray-500)' }}>
          Urgent? Email us at <a href="mailto:support@svitch.bike" style={{ color: 'var(--white)' }}>support@svitch.bike</a>.
        </p>
      </div>
    </section>
  )
}
`)

/* ComingSoon */
w('system/ComingSoon.jsx', `import { useEffect, useMemo, useState } from 'react'
import { Button, FormGroup } from '@/ui'
import { useToast } from '@/contexts/ToastContext'

// Counts down to the launch date. Demo target = 30 days from page load.
function useCountdown(target) {
  const [now, setNow] = useState(Date.now())
  useEffect(() => {
    const id = setInterval(() => setNow(Date.now()), 1000)
    return () => clearInterval(id)
  }, [])
  const ms = Math.max(0, target - now)
  return {
    d: Math.floor(ms / 86400000),
    h: Math.floor((ms / 3600000) % 24),
    m: Math.floor((ms / 60000) % 60),
    s: Math.floor((ms / 1000) % 60),
  }
}

export default function ComingSoon() {
  const launchAt = useMemo(() => Date.now() + 30 * 86400000, [])
  const { d, h, m, s } = useCountdown(launchAt)
  const { show } = useToast()
  const [email, setEmail] = useState('')

  function subscribe(e) {
    e.preventDefault()
    if (!/^\\S+@\\S+\\.\\S+$/.test(email)) { show('Enter a valid email', 'error'); return }
    show('You\\'re on the list — we\\'ll email when we launch', 'success')
    setEmail('')
  }

  return (
    <section className="section-pad" style={{ minHeight: '70vh', display: 'grid', placeItems: 'center' }}>
      <div className="container" style={{ textAlign: 'center', maxWidth: 600 }}>
        <span className="section-label">Launching Soon</span>
        <h1 className="section-title" style={{ marginTop: 8 }}>Something Big Is Coming</h1>
        <p className="section-desc" style={{ marginBottom: 32 }}>We're putting the finishing touches on the next CSR. Stay in the loop.</p>

        <div style={{ display: 'flex', gap: 14, justifyContent: 'center', flexWrap: 'wrap', marginBottom: 32 }}>
          {[['Days', d], ['Hours', h], ['Minutes', m], ['Seconds', s]].map(([label, val]) => (
            <div key={label} style={{ padding: 18, border: '1px solid var(--border)', minWidth: 90 }}>
              <strong style={{ fontSize: 32, color: 'var(--white)', display: 'block' }}>{String(val).padStart(2, '0')}</strong>
              <span className="rajdhani-lbl-text-sm" style={{ color: 'var(--gray-400)' }}>{label}</span>
            </div>
          ))}
        </div>

        <form onSubmit={subscribe} style={{ maxWidth: 420, margin: '0 auto' }}>
          <FormGroup label="Get notified" htmlFor="ne">
            <input id="ne" type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="you@example.com" />
          </FormGroup>
          <Button variant="primary" type="submit" icon="bell-fill" className="w-100">Notify Me</Button>
        </form>
      </div>
    </section>
  )
}
`)

/* Unsubscribe */
w('system/Unsubscribe.jsx', `import { useState } from 'react'
import { Link } from 'react-router-dom'
import { Button, Card, ToggleSwitch } from '@/ui'
import { PATHS } from '@/utils/routes'
import { useToast } from '@/contexts/ToastContext'

const LISTS = [
  { id: 'marketing',  label: 'Marketing emails',      desc: 'Product launches, offers, campaigns.' },
  { id: 'newsletter', label: 'Monthly newsletter',    desc: 'Long-form stories, blog roundup.' },
  { id: 'service',    label: 'Service reminders',     desc: 'First-service due, periodic service alerts.' },
  { id: 'orders',     label: 'Order & shipping mail', desc: 'Required for purchases — turning off may break order tracking.' },
]

export default function Unsubscribe() {
  const { show } = useToast()
  const [prefs, setPrefs] = useState({ marketing: false, newsletter: false, service: true, orders: true })

  function save() {
    show('Email preferences saved', 'success')
  }
  function unsubAll() {
    setPrefs({ marketing: false, newsletter: false, service: false, orders: false })
    show('Unsubscribed from all lists', 'info')
  }

  return (
    <section className="section-pad" style={{ minHeight: '60vh', display: 'grid', placeItems: 'center' }}>
      <div className="container" style={{ maxWidth: 520 }}>
        <Card style={{ padding: 30 }}>
          <span className="section-label">Email Preferences</span>
          <h1 className="section-title" style={{ fontSize: 'var(--fs-h2)', marginTop: 8 }}>Manage Your Subscriptions</h1>
          <p className="section-desc">Pick which emails you'd like to receive. You can change this anytime from your account.</p>

          <div style={{ display: 'grid', gap: 12, margin: '24px 0' }}>
            {LISTS.map(l => (
              <div key={l.id} style={{ padding: 14, border: '1px solid var(--border)' }}>
                <ToggleSwitch
                  checked={prefs[l.id]}
                  onChange={(v) => setPrefs(p => ({ ...p, [l.id]: v }))}
                  label={l.label}
                />
                <p className="rajdhani-lbl-text-sm" style={{ color: 'var(--gray-400)', marginTop: 6, marginLeft: 48 }}>{l.desc}</p>
              </div>
            ))}
          </div>

          <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap' }}>
            <Button variant="primary" icon="check2" onClick={save}>Save Preferences</Button>
            <Button variant="secondary" icon="ban" onClick={unsubAll}>Unsubscribe From All</Button>
          </div>

          <Link to={PATHS.home} className="rajdhani-lbl-text-sm" style={{ display: 'inline-block', marginTop: 20, color: 'var(--gray-400)' }}>
            <i className="bi bi-arrow-left"></i> Back to home
          </Link>
        </Card>
      </div>
    </section>
  )
}
`)

/* ExtraSection */
w('ExtraSection.jsx', `import { Link } from 'react-router-dom'
import { Card, SectionHeader } from '@/ui'
import { PATHS } from '@/utils/routes'

// Internal "kitchen sink" page — links to every section folder for quick QA.
const GROUPS = [
  { label: 'Shop',    items: [['Shop', PATHS.shop], ['PDP', '/shop/product/csr-762'], ['Cart', PATHS.cart], ['Checkout', PATHS.checkout], ['Payment', PATHS.payment], ['Confirmation', PATHS.orderConfirmation + '?id=SV234581']] },
  { label: 'Account', items: [['Dashboard', PATHS.dashboard], ['Orders', PATHS.orders], ['Order Detail', '/account/orders/SV234581'], ['Wishlist', PATHS.wishlist]] },
  { label: 'Auth',    items: [['Login', PATHS.login], ['Register', PATHS.register], ['2FA', PATHS.twoFactor], ['Verify Email', PATHS.verifyEmail]] },
  { label: 'Support', items: [['Ticket', PATHS.ticket], ['Dealers', PATHS.dealers], ['Charging', PATHS.chargingNetwork], ['Saver\\'s Scale', PATHS.saversScale]] },
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
`)

console.log('Batch 7 generation complete — 6 system pages written.')
