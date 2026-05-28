// Step 9 Batch 6 — 14 pages (offers + legal + press).
import { writeFileSync, mkdirSync } from 'node:fs'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'

const ROOT = dirname(dirname(fileURLToPath(import.meta.url)))
const w = (rel, body) => {
  const file = join(ROOT, 'src', 'routes', rel)
  mkdirSync(dirname(file), { recursive: true })
  writeFileSync(file, body, 'utf8')
}

/* ─── OFFERS ─────────────────────────────────────────────────────────── */

/* BookTestRide */
w('offers/BookTestRide.jsx', `import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Button, Card, FormGroup, SectionHeader } from '@/ui'
import { useToast } from '@/contexts/ToastContext'

const BIKES = ['CSR 762', 'CSR 762 Pro', 'Svitch E-Bike One']
const CENTRES = ['Svitch Ahmedabad', 'Svitch Mumbai', 'Svitch Bengaluru', 'Svitch Delhi', 'Svitch Chennai', 'Svitch Pune']

export default function BookTestRide() {
  const navigate = useNavigate()
  const { show } = useToast()
  const [form, setForm] = useState({
    name: '', email: '', phone: '',
    bike: BIKES[0], centre: CENTRES[0], date: '', time: '11:00',
  })

  function submit(e) {
    e.preventDefault()
    show('Test ride booked — confirmation sent via SMS', 'success')
    navigate('/account/test-rides')
  }

  return (
    <section className="section-pad">
      <div className="container">
        <SectionHeader label="Free 30-Minute Ride" title="Book a Test Ride" description="No commitment. No pressure. Just the bike, you, and a road." />

        <Card as="form" onSubmit={submit} style={{ padding: 28, marginTop: 28 }}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14 }}>
            <FormGroup label="Full Name" htmlFor="n" required><input id="n" required value={form.name} onChange={(e) => setForm(f => ({ ...f, name: e.target.value }))} /></FormGroup>
            <FormGroup label="Phone" htmlFor="p" required><input id="p" required maxLength={10} value={form.phone} onChange={(e) => setForm(f => ({ ...f, phone: e.target.value }))} /></FormGroup>
          </div>
          <FormGroup label="Email" htmlFor="e"><input id="e" type="email" value={form.email} onChange={(ev) => setForm(f => ({ ...f, email: ev.target.value }))} /></FormGroup>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14 }}>
            <FormGroup label="Bike" htmlFor="b">
              <select id="b" value={form.bike} onChange={(e) => setForm(f => ({ ...f, bike: e.target.value }))}>{BIKES.map(b => <option key={b}>{b}</option>)}</select>
            </FormGroup>
            <FormGroup label="Centre" htmlFor="c">
              <select id="c" value={form.centre} onChange={(e) => setForm(f => ({ ...f, centre: e.target.value }))}>{CENTRES.map(c => <option key={c}>{c}</option>)}</select>
            </FormGroup>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14 }}>
            <FormGroup label="Date" htmlFor="d" required><input id="d" type="date" required value={form.date} onChange={(e) => setForm(f => ({ ...f, date: e.target.value }))} /></FormGroup>
            <FormGroup label="Time" htmlFor="t">
              <select id="t" value={form.time} onChange={(e) => setForm(f => ({ ...f, time: e.target.value }))}>{['10:00','11:00','12:00','14:00','15:00','16:00','17:00'].map(t => <option key={t}>{t}</option>)}</select>
            </FormGroup>
          </div>
          <Button variant="primary" type="submit" icon="calendar-event">Confirm Test Ride</Button>
        </Card>
      </div>
    </section>
  )
}
`)

/* Finance */
w('offers/Finance.jsx', `import { useMemo, useState } from 'react'
import { Card, FormGroup, SectionHeader, Button } from '@/ui'
import { PATHS } from '@/utils/routes'
import { formatCurrency } from '@/utils/formatCurrency'

const PARTNERS = [
  { name: 'HDFC Bank',  rate: '9.5%',  badge: 'Lowest Rate' },
  { name: 'ICICI Bank', rate: '9.9%',  badge: null },
  { name: 'Bajaj Finserv', rate: '10.5%', badge: 'No-Cost EMI' },
  { name: 'Axis Bank',  rate: '10.2%', badge: null },
]

export default function Finance() {
  const [price, setPrice] = useState(189999)
  const [down, setDown] = useState(20000)
  const [months, setMonths] = useState(36)
  const [rate, setRate] = useState(9.5)

  const emi = useMemo(() => {
    const p = price - down
    const r = rate / 100 / 12
    const n = months
    const m = (p * r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1)
    return Math.round(m)
  }, [price, down, months, rate])
  const totalPaid = emi * months + down
  const interest  = totalPaid - price

  return (
    <section className="section-pad">
      <div className="container">
        <SectionHeader label="Finance" title="EMI & Finance" description="Own your CSR 762 from as little as ₹4,950/month." />

        <Card style={{ padding: 28, marginTop: 28 }}>
          <h3 style={{ marginBottom: 14 }}>EMI Calculator</h3>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14 }}>
            <FormGroup label={\`On-road price: \${formatCurrency(price)}\`} htmlFor="pr">
              <input id="pr" type="range" min={100000} max={300000} step={5000} value={price} onChange={(e) => setPrice(Number(e.target.value))} />
            </FormGroup>
            <FormGroup label={\`Down payment: \${formatCurrency(down)}\`} htmlFor="dp">
              <input id="dp" type="range" min={0} max={price * 0.5} step={1000} value={down} onChange={(e) => setDown(Number(e.target.value))} />
            </FormGroup>
            <FormGroup label={\`Tenure: \${months} months\`} htmlFor="m">
              <input id="m" type="range" min={12} max={60} step={6} value={months} onChange={(e) => setMonths(Number(e.target.value))} />
            </FormGroup>
            <FormGroup label={\`Interest: \${rate}%\`} htmlFor="r">
              <input id="r" type="range" min={8} max={14} step={0.1} value={rate} onChange={(e) => setRate(Number(e.target.value))} />
            </FormGroup>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))', gap: 14, marginTop: 18 }}>
            <Tile label="Monthly EMI" value={formatCurrency(emi)} accent />
            <Tile label="Total paid" value={formatCurrency(totalPaid)} />
            <Tile label="Interest" value={formatCurrency(interest)} dim />
          </div>
        </Card>

        <h3 style={{ marginTop: 36, marginBottom: 14 }}>Our Finance Partners</h3>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: 14 }}>
          {PARTNERS.map(p => (
            <Card key={p.name} style={{ padding: 18 }}>
              <strong>{p.name}</strong>
              <div className="rajdhani-lbl-text-sm" style={{ color: 'var(--gray-400)', marginTop: 4 }}>Starting at {p.rate}</div>
              {p.badge && <span className="product-badge rajdhani-lbl-text-sm" style={{ marginTop: 8, display: 'inline-block' }}>{p.badge}</span>}
            </Card>
          ))}
        </div>

        <div style={{ textAlign: 'center', marginTop: 32 }}>
          <Button to={PATHS.shop} variant="primary" iconRight="arrow-right">Configure Your Bike</Button>
        </div>
      </div>
    </section>
  )
}

function Tile({ label, value, accent, dim }) {
  return (
    <div style={{ padding: 16, border: '1px solid var(--border)', textAlign: 'center' }}>
      <div className="rajdhani-lbl-text-sm" style={{ color: 'var(--gray-400)' }}>{label}</div>
      <strong style={{ fontSize: 22, color: accent ? 'var(--accent)' : dim ? 'var(--gray-300)' : 'var(--white)' }}>{value}</strong>
    </div>
  )
}
`)

/* Insurance */
w('offers/Insurance.jsx', `import { useState } from 'react'
import { Button, Card, FilterPill, FormGroup, SectionHeader } from '@/ui'
import { useToast } from '@/contexts/ToastContext'
import { formatCurrency } from '@/utils/formatCurrency'

const PLANS = [
  { id: 'tp',          label: 'Third Party',           price: 2199,  features: ['Mandatory liability', '1-year cover'] },
  { id: 'comprehensive', label: 'Comprehensive',       price: 4499,  features: ['Own damage + third party', 'Theft + fire'], best: true },
  { id: 'comprehensive-plus', label: 'Comprehensive Plus', price: 6299, features: ['Comprehensive + zero dep', 'Roadside + engine protect'] },
]

export default function Insurance() {
  const { show } = useToast()
  const [plan, setPlan] = useState('comprehensive')
  const selected = PLANS.find(p => p.id === plan)

  function buy() {
    show(\`\${selected.label} insurance booked — policy mailed in 2 hrs\`, 'success')
  }

  return (
    <section className="section-pad">
      <div className="container">
        <SectionHeader label="Protect Your Ride" title="Insurance" description="Bundled cover from Svitch — better prices than market." />

        <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', margin: '24px 0' }}>
          {PLANS.map(p => (
            <FilterPill key={p.id} active={plan === p.id} onClick={() => setPlan(p.id)}>{p.label}</FilterPill>
          ))}
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: 14 }}>
          {PLANS.map(p => (
            <Card key={p.id} style={{ padding: 24, border: p.id === plan ? '1px solid var(--white)' : undefined }}>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <h3>{p.label}</h3>
                {p.best && <span className="product-badge rajdhani-lbl-text-sm">Most Popular</span>}
              </div>
              <strong style={{ fontSize: 26, color: 'var(--white)', display: 'block', margin: '10px 0' }}>{formatCurrency(p.price)}<small style={{ fontSize: 13, color: 'var(--gray-400)' }}>/yr</small></strong>
              <ul style={{ listStyle: 'none', padding: 0, display: 'grid', gap: 6, marginBottom: 16 }}>
                {p.features.map(f => (
                  <li key={f} className="rajdhani-lbl-text-sm" style={{ color: 'var(--gray-300)' }}>
                    <i className="bi bi-check2" style={{ color: 'var(--accent)', marginRight: 6 }}></i>{f}
                  </li>
                ))}
              </ul>
              <Button variant={p.id === plan ? 'primary' : 'secondary'} size="sm" onClick={() => setPlan(p.id)} className="w-100">
                {p.id === plan ? 'Selected' : 'Select Plan'}
              </Button>
            </Card>
          ))}
        </div>

        <Card style={{ padding: 22, marginTop: 28, textAlign: 'center' }}>
          <p className="rajdhani-lbl-text-sm" style={{ color: 'var(--gray-300)' }}>
            Selected: <strong style={{ color: 'var(--white)' }}>{selected.label}</strong> — {formatCurrency(selected.price)} / year
          </p>
          <Button variant="primary" icon="shield-check" onClick={buy} className="mt-2">Buy Now</Button>
        </Card>
      </div>
    </section>
  )
}
`)

/* Referral */
w('offers/Referral.jsx', `import { useState } from 'react'
import { Button, Card, SectionHeader } from '@/ui'
import { useToast } from '@/contexts/ToastContext'

const STEPS = [
  { icon: 'share-fill',         title: 'Share your code',     desc: 'Send your unique code to friends and family.' },
  { icon: 'cart-check-fill',     title: 'They buy a CSR 762', desc: 'Your friend gets ₹2,000 off their booking.' },
  { icon: 'gift-fill',           title: 'You earn',           desc: 'You get ₹3,000 credited to your Svitch wallet.' },
]

export default function Referral() {
  const { show } = useToast()
  const code = 'CSR-RIYA-762'
  const link = \`https://svitch.bike/r/\${code}\`
  const [copied, setCopied] = useState(false)

  function copy() {
    try {
      navigator.clipboard.writeText(link)
      setCopied(true)
      show('Link copied', 'success')
      setTimeout(() => setCopied(false), 2000)
    } catch {
      show('Copy failed — long-press to copy', 'error')
    }
  }

  return (
    <section className="section-pad">
      <div className="container">
        <SectionHeader label="Refer & Earn" title="Share The Ride" description="Help a friend switch to electric. We'll both win." />

        <Card style={{ padding: 28, marginTop: 28, textAlign: 'center', background: 'var(--gray-950)' }}>
          <div className="rajdhani-lbl-text-sm" style={{ color: 'var(--gray-400)' }}>Your referral link</div>
          <code style={{ display: 'block', fontSize: 22, color: 'var(--white)', margin: '10px 0' }}>{link}</code>
          <Button variant="primary" icon={copied ? 'check2' : 'clipboard'} onClick={copy}>{copied ? 'Copied!' : 'Copy Link'}</Button>
        </Card>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: 14, marginTop: 32 }}>
          {STEPS.map((s, i) => (
            <Card key={s.title} style={{ padding: 22 }}>
              <span className="section-label">Step {i + 1}</span>
              <i className={\`bi bi-\${s.icon}\`} style={{ fontSize: 26, color: 'var(--accent)', display: 'block', marginTop: 8 }}></i>
              <h3 style={{ marginTop: 10 }}>{s.title}</h3>
              <p className="rajdhani-lbl-text-sm" style={{ color: 'var(--gray-400)', marginTop: 6 }}>{s.desc}</p>
            </Card>
          ))}
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 14, marginTop: 32, textAlign: 'center' }}>
          <Card style={{ padding: 18 }}><strong style={{ fontSize: 24, color: 'var(--accent)' }}>12</strong><div className="rajdhani-lbl-text-sm" style={{ color: 'var(--gray-400)' }}>Friends invited</div></Card>
          <Card style={{ padding: 18 }}><strong style={{ fontSize: 24, color: 'var(--accent)' }}>3</strong><div className="rajdhani-lbl-text-sm" style={{ color: 'var(--gray-400)' }}>Bought a bike</div></Card>
          <Card style={{ padding: 18 }}><strong style={{ fontSize: 24, color: 'var(--accent)' }}>₹9,000</strong><div className="rajdhani-lbl-text-sm" style={{ color: 'var(--gray-400)' }}>Earned so far</div></Card>
        </div>
      </div>
    </section>
  )
}
`)

/* TradeIn */
w('offers/TradeIn.jsx', `import { useMemo, useState } from 'react'
import { Button, Card, FormGroup, SectionHeader } from '@/ui'
import { useToast } from '@/contexts/ToastContext'
import { formatCurrency } from '@/utils/formatCurrency'

// Very rough offer estimator. Replace with a real model later.
function estimateOffer({ year, km, condition }) {
  const ageYears = Math.max(0, 2026 - Number(year || 2020))
  const base = 90000
  const ageDrop = ageYears * 8000
  const kmDrop = (Number(km || 0) / 1000) * 250
  const condMul = condition === 'Excellent' ? 1 : condition === 'Good' ? 0.85 : condition === 'Fair' ? 0.7 : 0.55
  return Math.max(20000, Math.round((base - ageDrop - kmDrop) * condMul))
}

export default function TradeIn() {
  const { show } = useToast()
  const [form, setForm] = useState({ make: '', model: '', year: '2022', km: '15000', condition: 'Good' })

  const offer = useMemo(() => estimateOffer(form), [form])

  function submit(e) {
    e.preventDefault()
    show('Estimate generated — book an inspection slot to confirm', 'success')
  }

  return (
    <section className="section-pad">
      <div className="container">
        <SectionHeader label="Trade-In" title="Swap Your Old Bike" description="Get an instant estimate. Book inspection. Drive home on a CSR 762." />

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 320px', gap: 28, marginTop: 28 }}>
          <Card as="form" onSubmit={submit} style={{ padding: 26 }}>
            <h3 style={{ marginBottom: 14 }}>Your current bike</h3>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14 }}>
              <FormGroup label="Make" htmlFor="make" required>
                <input id="make" required value={form.make} onChange={(e) => setForm(f => ({ ...f, make: e.target.value }))} placeholder="e.g. Honda" />
              </FormGroup>
              <FormGroup label="Model" htmlFor="model" required>
                <input id="model" required value={form.model} onChange={(e) => setForm(f => ({ ...f, model: e.target.value }))} placeholder="e.g. Activa 6G" />
              </FormGroup>
              <FormGroup label="Year" htmlFor="year">
                <input id="year" type="number" min={2010} max={2026} value={form.year} onChange={(e) => setForm(f => ({ ...f, year: e.target.value }))} />
              </FormGroup>
              <FormGroup label="Odometer (km)" htmlFor="km">
                <input id="km" type="number" min={0} value={form.km} onChange={(e) => setForm(f => ({ ...f, km: e.target.value }))} />
              </FormGroup>
            </div>
            <FormGroup label="Condition" htmlFor="c">
              <select id="c" value={form.condition} onChange={(e) => setForm(f => ({ ...f, condition: e.target.value }))}>
                {['Excellent', 'Good', 'Fair', 'Poor'].map(o => <option key={o}>{o}</option>)}
              </select>
            </FormGroup>
            <Button variant="primary" type="submit" icon="calculator">Get Estimate</Button>
          </Card>

          <Card style={{ padding: 24, height: 'fit-content', background: 'var(--gray-950)' }}>
            <span className="section-label">Estimated Offer</span>
            <strong style={{ display: 'block', fontSize: 34, color: 'var(--accent)', marginTop: 6 }}>{formatCurrency(offer)}</strong>
            <p className="rajdhani-lbl-text-sm" style={{ color: 'var(--gray-400)', marginTop: 8, lineHeight: 1.6 }}>
              Final offer depends on physical inspection at our centre. Bring RC, insurance, and 2 keys.
            </p>
          </Card>
        </div>
      </div>
    </section>
  )
}
`)

/* ─── LEGAL ─────────────────────────────────────────────────────────── */

function legalPage(slug, title, label, sections) {
  return `import { BreadCrumb, Card, SectionHeader } from '@/ui'
import { PATHS } from '@/utils/routes'

const SECTIONS = ${JSON.stringify(sections)}

export default function ${slug}() {
  return (
    <section className="section-pad">
      <div className="container" style={{ maxWidth: 880 }}>
        <BreadCrumb items={[{ label: 'Home', to: PATHS.home }, { label: '${title}' }]} />
        <SectionHeader label="${label}" title="${title}" description="Last updated: 12 May 2026." />
        <div style={{ display: 'grid', gap: 14, marginTop: 28 }}>
          {SECTIONS.map((s) => (
            <Card key={s.title} style={{ padding: 24 }}>
              <h3 style={{ marginBottom: 10 }}>{s.title}</h3>
              {s.body.map((p, i) => (
                <p key={i} style={{ color: 'var(--gray-300)', lineHeight: 1.8, marginBottom: 10 }}>{p}</p>
              ))}
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
`
}

w('legal/TermCondition.jsx', legalPage('TermCondition', 'Terms & Conditions', 'Legal', [
  { title: '1. Acceptance', body: ['By accessing or using svitch.bike, you agree to these Terms. If you do not agree, do not use the site or our products.'] },
  { title: '2. Eligibility', body: ['You must be at least 18 years old to purchase a vehicle from Svitch Motocorp, and have a valid Indian driving licence to legally ride one.'] },
  { title: '3. Pricing & Payments', body: ['All prices are in INR and inclusive of applicable GST unless stated otherwise. Prices may change without notice. Bookings are confirmed only on receipt of token payment.'] },
  { title: '4. Delivery', body: ['Estimated delivery windows are best-effort. Delays caused by force majeure, government policy, or component shortages are excluded from any compensation.'] },
  { title: '5. Intellectual Property', body: ['All content on this site — including images, copy, code, and brand marks — is owned by or licensed to Svitch Motocorp Pvt Ltd. Reuse without permission is prohibited.'] },
  { title: '6. Limitation of Liability', body: ['Svitch Motocorp shall not be liable for indirect, incidental, or consequential damages arising from product use, beyond the price paid for the product.'] },
  { title: '7. Governing Law', body: ['These Terms are governed by Indian law. Any disputes will be subject to the exclusive jurisdiction of the courts at Ahmedabad, Gujarat.'] },
]))

w('legal/PrivacyPolicy.jsx', legalPage('PrivacyPolicy', 'Privacy Policy', 'Legal', [
  { title: '1. What We Collect', body: ['Account data (name, email, phone, address), order data, ride-telemetry (with consent), and standard web analytics (pages viewed, time on page).'] },
  { title: '2. Why We Collect It', body: ['To fulfil orders, provide service, send legally-required communications, and (with consent) personalise marketing.'] },
  { title: '3. DPDP Act 2023 Rights', body: ['You can access, correct, port, or delete your personal data at any time by emailing privacy@svitch.bike. We respond within 30 days.'] },
  { title: '4. Cookies', body: ['We use essential cookies (cart, auth) and, with consent, analytics + marketing cookies. See our Cookie Policy for the full list.'] },
  { title: '5. Sharing', body: ['We share data only with payment, logistics, and service partners who are contractually bound to our privacy standards. We do not sell personal data.'] },
  { title: '6. Retention', body: ['We retain personal data only as long as necessary for the purpose collected, or as required by Indian tax/regulatory law (usually 7 years for financial records).'] },
  { title: '7. Contact', body: ['Data Protection Officer: privacy@svitch.bike. Grievance Officer: grievance@svitch.bike.'] },
]))

w('legal/CookiePolicy.jsx', legalPage('CookiePolicy', 'Cookie Policy', 'Legal', [
  { title: 'What Are Cookies?', body: ['Cookies are small text files stored on your device when you visit a website. They help us remember you and improve your experience.'] },
  { title: 'Essential Cookies', body: ['Required for the site to function — cart contents, session/auth, security tokens. Cannot be disabled.'] },
  { title: 'Analytics Cookies', body: ['Help us understand how visitors use the site (pages viewed, time spent, popular paths). Anonymous and aggregated. You can opt out.'] },
  { title: 'Marketing Cookies', body: ['Used to show relevant ads and measure campaign effectiveness. You can opt out.'] },
  { title: 'Managing Cookies', body: ['Use the cookie consent banner at the bottom of the page to update your choices anytime. You can also clear cookies via your browser settings.'] },
]))

w('legal/RefundPolicy.jsx', legalPage('RefundPolicy', 'Refund Policy', 'Legal', [
  { title: 'Order Cancellation', body: ['Bookings can be cancelled for a full refund within 7 days of booking, provided the bike has not been dispatched.'] },
  { title: 'Token Refunds', body: ['Token amounts (₹999 etc.) are refunded within 5 working days to the original payment method.'] },
  { title: 'Accessories Returns', body: ['Helmets, chargers, and accessories can be returned within 7 days of delivery if unused and in original packaging.'] },
  { title: 'Non-Refundable', body: ['Customised or personalised products, opened battery packs, and items damaged by misuse cannot be returned or refunded.'] },
]))

w('legal/ShippingPolicy.jsx', legalPage('ShippingPolicy', 'Shipping Policy', 'Legal', [
  { title: 'Coverage', body: ['We ship the CSR 762 to addresses in 200+ cities across India. PIN-code serviceability is shown at checkout.'] },
  { title: 'Delivery Timelines', body: ['Bikes: 7–21 days from booking, depending on city and inventory. Accessories: 3–7 days.'] },
  { title: 'Shipping Charges', body: ['Free shipping on orders above ₹50,000. Below that, a flat ₹499 applies.'] },
  { title: 'White-Glove Delivery', body: ['Every CSR 762 ships fully-charged with handover orientation. Our delivery rider walks you through controls and the app.'] },
]))

w('legal/Accessibility.jsx', legalPage('Accessibility', 'Accessibility', 'Legal', [
  { title: 'Our Commitment', body: ['We design svitch.bike to meet WCAG 2.1 AA. The site is keyboard-navigable, screen-reader friendly, and high-contrast where possible.'] },
  { title: 'Features', body: ['Skip-to-main-content link, semantic landmarks, ARIA labels on icon buttons, keyboard-focus rings, support for browser zoom up to 200% without horizontal scroll.'] },
  { title: 'Need Help?', body: ['Email accessibility@svitch.bike with any barriers you encounter. We aim to respond and remediate within 5 working days.'] },
]))

/* ─── PRESS ─────────────────────────────────────────────────────────── */

/* Press */
w('press/Press.jsx', `import { Link } from 'react-router-dom'
import { Button, Card, SectionHeader } from '@/ui'
import { PATHS } from '@/utils/routes'

const POSTS = [
  { slug: 'csr-762-launch',         title: 'Svitch Launches India\\'s First Born-Electric Motorcycle', source: 'YourStory',      date: '2026-04-15', cover: '/images/products/csr-762.webp' },
  { slug: 'series-b-funding',       title: 'Svitch Raises $35M Series B Led By Lightspeed',          source: 'Inc42',           date: '2026-03-22', cover: '/images/products/csr-762-gray.webp' },
  { slug: 'sustainability-pledge',  title: 'Svitch Commits To Net-Zero Operations By 2027',          source: 'Mint',            date: '2026-02-08', cover: '/images/products/csr-762-red.webp' },
  { slug: 'expansion-south-india',  title: 'Svitch Expands To South India With 30 New Dealers',      source: 'Economic Times',  date: '2026-01-19', cover: '/images/products/csr-762-black.webp' },
]

export default function Press() {
  return (
    <section className="section-pad">
      <div className="container">
        <SectionHeader label="Press Room" title="In The News" description="Coverage, announcements, and our story in the wider world." />

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: 14, marginTop: 28 }}>
          {POSTS.map(p => (
            <Card key={p.slug} as={Link} to={\`/press/\${p.slug}\`} style={{ padding: 0, overflow: 'hidden', textDecoration: 'none' }}>
              <img src={p.cover} alt={p.title} style={{ width: '100%', height: 180, objectFit: 'cover' }} />
              <div style={{ padding: 18 }}>
                <span className="filter-pill" style={{ padding: '2px 8px', fontSize: 11 }}>{p.source}</span>
                <h3 style={{ margin: '10px 0 6px', color: 'var(--white)' }}>{p.title}</h3>
                <div className="rajdhani-lbl-text-sm" style={{ color: 'var(--gray-500)' }}>{p.date}</div>
              </div>
            </Card>
          ))}
        </div>

        <Card style={{ padding: 28, marginTop: 40 }}>
          <div className="cta-box" style={{ padding: 0, border: 'none' }}>
            <div>
              <span className="section-label">Working on a Story?</span>
              <h2 className="section-title" style={{ fontSize: 'var(--fs-h3)', marginTop: 4 }}>Media Enquiries</h2>
              <p className="section-desc">Reach our press team at press@svitch.bike — we usually reply within 24 hours.</p>
            </div>
            <div style={{ display: 'flex', gap: 10 }}>
              <Button href="mailto:press@svitch.bike" variant="primary" icon="envelope">Contact Press</Button>
              <Button to={PATHS.mediaKit} variant="secondary" icon="folder2-open">Media Kit</Button>
            </div>
          </div>
        </Card>
      </div>
    </section>
  )
}
`)

/* PressDetail */
w('press/PressDetail.jsx', `import { Link, useParams } from 'react-router-dom'
import { BreadCrumb, Card } from '@/ui'
import { PATHS } from '@/utils/routes'

const POSTS = {
  'csr-762-launch':         { title: 'Svitch Launches India\\'s First Born-Electric Motorcycle', source: 'YourStory',     date: '2026-04-15', cover: '/images/products/csr-762.webp',       url: 'https://yourstory.com' },
  'series-b-funding':       { title: 'Svitch Raises $35M Series B Led By Lightspeed',          source: 'Inc42',          date: '2026-03-22', cover: '/images/products/csr-762-gray.webp',  url: 'https://inc42.com' },
  'sustainability-pledge':  { title: 'Svitch Commits To Net-Zero Operations By 2027',          source: 'Mint',           date: '2026-02-08', cover: '/images/products/csr-762-red.webp',   url: 'https://livemint.com' },
  'expansion-south-india':  { title: 'Svitch Expands To South India With 30 New Dealers',      source: 'Economic Times', date: '2026-01-19', cover: '/images/products/csr-762-black.webp', url: 'https://economictimes.indiatimes.com' },
}

export default function PressDetail() {
  const { slug } = useParams()
  const post = POSTS[slug]

  if (!post) {
    return (
      <section className="section-pad">
        <div className="container">
          <h1 className="section-title">Article not found</h1>
          <Link to={PATHS.press} className="btn-csr primary">Back to Press</Link>
        </div>
      </section>
    )
  }

  return (
    <article className="section-pad">
      <div className="container" style={{ maxWidth: 820 }}>
        <BreadCrumb items={[{ label: 'Home', to: PATHS.home }, { label: 'Press', to: PATHS.press }, { label: post.title }]} />
        <span className="filter-pill" style={{ padding: '2px 8px', fontSize: 11, marginTop: 18, display: 'inline-block' }}>{post.source}</span>
        <h1 className="section-title" style={{ marginTop: 12 }}>{post.title}</h1>
        <div className="rajdhani-lbl-text-sm" style={{ color: 'var(--gray-400)', marginBottom: 24 }}>
          {post.source} • {post.date}
        </div>
        <img src={post.cover} alt={post.title} style={{ width: '100%', maxHeight: 420, objectFit: 'cover', marginBottom: 28 }} />
        <Card style={{ padding: 24, color: 'var(--gray-200)', lineHeight: 1.8 }}>
          <p>This page reproduces the press piece in a condensed form for editorial reference. The original full article appears on the publication's site.</p>
          <p>Mauris sit amet diam ut nibh placerat congue. Nulla et lorem nec turpis tempus aliquet. Suspendisse potenti.</p>
          <a className="btn-csr primary mt-3 rajdhani-lbl-text-sm" href={post.url} target="_blank" rel="noreferrer">
            <i className="bi bi-box-arrow-up-right"></i> Read Original
          </a>
        </Card>
      </div>
    </article>
  )
}
`)

/* MediaKit */
w('press/MediaKit.jsx', `import { Card, SectionHeader, Button } from '@/ui'

const ASSETS = [
  { type: 'Logo Pack',       icon: 'image',           desc: 'PNG + SVG + brand guide (24 MB)' },
  { type: 'Product Photos',   icon: 'camera-fill',     desc: 'High-res studio + lifestyle shots (180 MB)' },
  { type: 'Spec Sheet',       icon: 'file-earmark-pdf', desc: 'One-pager PDF with key specs (820 KB)' },
  { type: 'Founder Bios',     icon: 'people-fill',      desc: 'Headshots + bios + quotes (4 MB)' },
  { type: 'Factory B-Roll',   icon: 'film',             desc: '4K B-roll from the Ahmedabad plant (1.2 GB)' },
  { type: 'Brand Colours',    icon: 'palette-fill',     desc: 'Mono palette + tokens for editorial use' },
]

export default function MediaKit() {
  return (
    <section className="section-pad">
      <div className="container">
        <SectionHeader label="For Press & Editorial" title="Media Kit" description="Everything you need to write about us, in one place." />

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))', gap: 14, marginTop: 28 }}>
          {ASSETS.map(a => (
            <Card key={a.type} style={{ padding: 22 }}>
              <i className={\`bi bi-\${a.icon}\`} style={{ fontSize: 26, color: 'var(--accent)' }}></i>
              <h3 style={{ marginTop: 10 }}>{a.type}</h3>
              <p className="rajdhani-lbl-text-sm" style={{ color: 'var(--gray-400)', marginTop: 6, marginBottom: 12 }}>{a.desc}</p>
              <button className="btn-csr secondary sm rajdhani-lbl-text-sm" onClick={() => alert('Download stub — wire to a real CDN URL later.')}>
                <i className="bi bi-download"></i> Download
              </button>
            </Card>
          ))}
        </div>

        <Card style={{ padding: 24, marginTop: 32 }}>
          <h3 style={{ marginBottom: 10 }}>Press Inquiries</h3>
          <p style={{ color: 'var(--gray-300)' }}>For interviews, exclusive embargoes, or anything not in the kit — email <a href="mailto:press@svitch.bike">press@svitch.bike</a>. We reply within 24 hours.</p>
          <Button href="mailto:press@svitch.bike" variant="primary" icon="envelope" className="mt-3">Contact Press</Button>
        </Card>
      </div>
    </section>
  )
}
`)

console.log('Batch 6 generation complete — 14 pages written.')
