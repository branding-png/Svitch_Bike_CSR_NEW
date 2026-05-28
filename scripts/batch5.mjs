// Step 9 Batch 5 — 9 support pages.
import { writeFileSync, mkdirSync } from 'node:fs'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'

const ROOT = dirname(dirname(fileURLToPath(import.meta.url)))
const w = (rel, body) => {
  const file = join(ROOT, 'src', 'routes', rel)
  mkdirSync(dirname(file), { recursive: true })
  writeFileSync(file, body, 'utf8')
}

/* Ticket */
w('support/Ticket.jsx', `import { useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import { Button, Card, FilterPill, FormGroup, SectionHeader } from '@/ui'
import { useToast } from '@/contexts/ToastContext'

const TICKETS = [
  { id: 'T-9821', subject: 'Battery not charging past 80%', priority: 'High',   status: 'open',     opened: '2026-05-12', updated: '2 hrs ago' },
  { id: 'T-9743', subject: 'Need invoice copy for SV234581', priority: 'Low',    status: 'open',     opened: '2026-05-08', updated: '1 day ago' },
  { id: 'T-9621', subject: 'Mobile app pairing issue',       priority: 'Medium', status: 'resolved', opened: '2026-04-21', updated: '2 weeks ago' },
]
const CATS = ['Order', 'Service', 'Account', 'App', 'Battery', 'Other']

export default function Ticket() {
  const [params] = useSearchParams()
  const orderId = params.get('order') || ''
  const { show } = useToast()
  const [tab, setTab] = useState('open')
  const [form, setForm] = useState({ subject: '', category: 'Order', priority: 'Medium', message: '', orderId })

  function submit(e) {
    e.preventDefault()
    show('Ticket created — we will reply within 4 hours', 'success')
    setForm({ subject: '', category: 'Order', priority: 'Medium', message: '', orderId })
  }

  const list = TICKETS.filter(t => t.status === tab)

  return (
    <section className="section-pad">
      <div className="container">
        <SectionHeader label="Support" title="Support Tickets" description="Get help fast — most tickets are answered within 4 hours." />

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 380px', gap: 28, marginTop: 28 }}>
          <div>
            <div style={{ display: 'flex', gap: 8, marginBottom: 18 }}>
              <FilterPill active={tab === 'open'} onClick={() => setTab('open')}>Open</FilterPill>
              <FilterPill active={tab === 'resolved'} onClick={() => setTab('resolved')}>Resolved</FilterPill>
            </div>
            {list.length === 0 ? (
              <Card className="account-empty"><h3>No {tab} tickets</h3></Card>
            ) : (
              <div style={{ display: 'grid', gap: 10 }}>
                {list.map(t => (
                  <Card key={t.id} style={{ padding: 18 }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap', gap: 8 }}>
                      <strong>{t.subject}</strong>
                      <span className="filter-pill" style={{ padding: '2px 8px', fontSize: 11 }}>{t.priority}</span>
                    </div>
                    <div className="rajdhani-lbl-text-sm" style={{ color: 'var(--gray-400)', marginTop: 6 }}>
                      #{t.id} • Opened {t.opened} • Updated {t.updated}
                    </div>
                  </Card>
                ))}
              </div>
            )}
          </div>

          <Card as="form" onSubmit={submit} style={{ padding: 22, height: 'fit-content' }}>
            <h3 style={{ marginBottom: 14 }}>New Ticket</h3>
            <FormGroup label="Subject" htmlFor="subject" required>
              <input id="subject" required value={form.subject} onChange={(e) => setForm(f => ({ ...f, subject: e.target.value }))} />
            </FormGroup>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
              <FormGroup label="Category" htmlFor="cat">
                <select id="cat" value={form.category} onChange={(e) => setForm(f => ({ ...f, category: e.target.value }))}>
                  {CATS.map(c => <option key={c}>{c}</option>)}
                </select>
              </FormGroup>
              <FormGroup label="Priority" htmlFor="prio">
                <select id="prio" value={form.priority} onChange={(e) => setForm(f => ({ ...f, priority: e.target.value }))}>
                  {['Low', 'Medium', 'High'].map(p => <option key={p}>{p}</option>)}
                </select>
              </FormGroup>
            </div>
            {orderId && (
              <FormGroup label="Order ID" htmlFor="orderId" hint="Pre-filled from the order page.">
                <input id="orderId" value={form.orderId} onChange={(e) => setForm(f => ({ ...f, orderId: e.target.value }))} />
              </FormGroup>
            )}
            <FormGroup label="Describe your issue" htmlFor="msg" required>
              <textarea id="msg" rows={5} required value={form.message} onChange={(e) => setForm(f => ({ ...f, message: e.target.value }))} />
            </FormGroup>
            <Button variant="primary" type="submit" icon="send">Open Ticket</Button>
          </Card>
        </div>
      </div>
    </section>
  )
}
`)

/* Dealers */
w('support/Dealers.jsx', `import { useMemo, useState } from 'react'
import { Button, Card, FormGroup, SectionHeader } from '@/ui'
import { PATHS } from '@/utils/routes'

const DEALERS = [
  { id: 1, name: 'Svitch Ahmedabad',  city: 'Ahmedabad',  state: 'Gujarat',     phone: '+91 635 127 2002', address: 'A-410 Stellar, Sindhu Bhavan Road, Ahmedabad 380054', services: ['Sales', 'Service', 'Test Ride'] },
  { id: 2, name: 'Svitch Mumbai',     city: 'Mumbai',     state: 'Maharashtra', phone: '+91 635 127 3003', address: 'Linking Road, Bandra West, Mumbai 400050',          services: ['Sales', 'Test Ride'] },
  { id: 3, name: 'Svitch Bengaluru',  city: 'Bengaluru',  state: 'Karnataka',   phone: '+91 635 127 4004', address: 'Indiranagar 100ft Road, Bengaluru 560038',          services: ['Sales', 'Service'] },
  { id: 4, name: 'Svitch Delhi',      city: 'Delhi',      state: 'Delhi',       phone: '+91 635 127 5005', address: 'Connaught Place, New Delhi 110001',                 services: ['Sales', 'Service', 'Test Ride'] },
  { id: 5, name: 'Svitch Chennai',    city: 'Chennai',    state: 'Tamil Nadu',  phone: '+91 635 127 6006', address: 'Nungambakkam High Road, Chennai 600034',            services: ['Sales', 'Service'] },
  { id: 6, name: 'Svitch Pune',       city: 'Pune',       state: 'Maharashtra', phone: '+91 635 127 7007', address: 'FC Road, Pune 411005',                              services: ['Sales', 'Test Ride'] },
]

export default function Dealers() {
  const [q, setQ] = useState('')
  const list = useMemo(() => {
    const s = q.trim().toLowerCase()
    if (!s) return DEALERS
    return DEALERS.filter(d => [d.name, d.city, d.state].some(v => v.toLowerCase().includes(s)))
  }, [q])

  return (
    <section className="section-pad" id="become-dealer">
      <div className="container">
        <SectionHeader label="Find Us" title="Authorised Dealers" description="80+ touchpoints across India — and growing." />
        <FormGroup label="Search by city or state" htmlFor="dq" className="mt-3" hint="">
          <input id="dq" value={q} onChange={(e) => setQ(e.target.value)} placeholder="e.g. Mumbai, Karnataka…" />
        </FormGroup>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: 14, marginTop: 18 }}>
          {list.map(d => (
            <Card key={d.id} style={{ padding: 20 }}>
              <h3>{d.name}</h3>
              <div className="rajdhani-lbl-text-sm" style={{ color: 'var(--gray-400)', marginTop: 4 }}>{d.city}, {d.state}</div>
              <p className="rajdhani-lbl-text-sm" style={{ color: 'var(--gray-300)', lineHeight: 1.6, margin: '10px 0' }}>{d.address}</p>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6, marginBottom: 12 }}>
                {d.services.map(s => <span key={s} className="filter-pill" style={{ padding: '2px 8px', fontSize: 11 }}>{s}</span>)}
              </div>
              <div style={{ display: 'flex', gap: 6 }}>
                <a className="btn-csr secondary sm rajdhani-lbl-text-sm" href={\`tel:\${d.phone.replace(/\\s/g, '')}\`}><i className="bi bi-telephone"></i> Call</a>
                <a className="btn-csr secondary sm rajdhani-lbl-text-sm" href={\`https://maps.google.com/?q=\${encodeURIComponent(d.address)}\`} target="_blank" rel="noreferrer">
                  <i className="bi bi-geo-alt"></i> Map
                </a>
              </div>
            </Card>
          ))}
        </div>

        <Card style={{ padding: 28, marginTop: 40 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 12 }}>
            <div>
              <span className="section-label">Partner With Us</span>
              <h2 className="section-title" style={{ fontSize: 'var(--fs-h3)', marginTop: 4 }}>Become a Dealer</h2>
              <p className="section-desc">Open a Svitch dealership in your city. Get in touch with our partnerships team.</p>
            </div>
            <Button to={PATHS.contact} variant="primary" icon="briefcase-fill">Get in Touch</Button>
          </div>
        </Card>
      </div>
    </section>
  )
}
`)

/* ChargingNetwork */
w('support/ChargingNetwork.jsx', `import { useState } from 'react'
import { Card, FilterPill, SectionHeader } from '@/ui'

const STATIONS = [
  { id: 1, name: 'Ahmedabad Hub',  city: 'Ahmedabad',  type: 'DC Fast',  power: '50 kW', ports: 4, status: 'live' },
  { id: 2, name: 'Mumbai BKC',     city: 'Mumbai',     type: 'DC Fast',  power: '50 kW', ports: 6, status: 'live' },
  { id: 3, name: 'BLR Indiranagar', city: 'Bengaluru', type: 'AC',       power: '7.2 kW', ports: 8, status: 'live' },
  { id: 4, name: 'CP New Delhi',   city: 'Delhi',      type: 'DC Fast',  power: '50 kW', ports: 4, status: 'soon' },
  { id: 5, name: 'Pune FC Rd',     city: 'Pune',       type: 'AC',       power: '7.2 kW', ports: 4, status: 'live' },
  { id: 6, name: 'Chennai Nungambakkam', city: 'Chennai', type: 'DC Fast', power: '50 kW', ports: 4, status: 'soon' },
]

export default function ChargingNetwork() {
  const [filter, setFilter] = useState('All')
  const list = filter === 'All' ? STATIONS : STATIONS.filter(s => s.type === filter)

  return (
    <section className="section-pad">
      <div className="container">
        <SectionHeader label="Charge Anywhere" title="Charging Network" description="300+ stations across 18 cities. AC + DC fast, partner + own." />

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))', gap: 14, margin: '28px 0' }}>
          <Stat num="300+" label="Stations" />
          <Stat num="18" label="Cities" />
          <Stat num="50 kW" label="Fastest" />
          <Stat num="24/7" label="Access" />
        </div>

        <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', marginBottom: 18 }}>
          {['All', 'DC Fast', 'AC'].map(f => <FilterPill key={f} active={filter === f} onClick={() => setFilter(f)}>{f}</FilterPill>)}
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))', gap: 14 }}>
          {list.map(s => (
            <Card key={s.id} style={{ padding: 20 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <h4>{s.name}</h4>
                <span className={\`order-status \${s.status === 'live' ? 'delivered' : 'processing'} rajdhani-lbl-text-sm\`}>
                  <i className={\`bi bi-\${s.status === 'live' ? 'check-circle-fill' : 'clock-history'}\`}></i> {s.status}
                </span>
              </div>
              <div className="rajdhani-lbl-text-sm" style={{ color: 'var(--gray-400)', marginTop: 6 }}>
                <i className="bi bi-geo-alt"></i> {s.city}
              </div>
              <div className="rajdhani-lbl-text-sm" style={{ color: 'var(--gray-300)', marginTop: 10, display: 'flex', justifyContent: 'space-between' }}>
                <span><i className="bi bi-lightning-charge-fill"></i> {s.type}</span>
                <span>{s.power}</span>
                <span>{s.ports} ports</span>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}

function Stat({ num, label }) {
  return (
    <div style={{ textAlign: 'center', padding: 18, border: '1px solid var(--border)' }}>
      <strong style={{ fontSize: 28, color: 'var(--white)' }}>{num}</strong>
      <div className="rajdhani-lbl-text-sm" style={{ color: 'var(--gray-400)' }}>{label}</div>
    </div>
  )
}
`)

/* Warranty */
w('support/Warranty.jsx', `import { useState } from 'react'
import { Button, Card, FormGroup, SectionHeader } from '@/ui'
import { useToast } from '@/contexts/ToastContext'

const COVERED = [
  { icon: 'battery-charging', title: 'Battery Pack',  duration: '3 years',  detail: 'Cell health degradation below 70% within 3 yrs covered.' },
  { icon: 'cpu',               title: 'Motor',         duration: '2 years',  detail: 'Manufacturing defects in PMSM motor and bearings.' },
  { icon: 'speedometer2',      title: 'Electronics',   duration: '1 year',   detail: 'Controller, dashboard, BMS, wiring harness.' },
  { icon: 'gear-fill',          title: 'Mechanical',   duration: '1 year',   detail: 'Frame, suspension, brakes (excluding wear parts).' },
]

export default function Warranty() {
  const { show } = useToast()
  const [form, setForm] = useState({ vin: '', orderId: '', odometer: '' })

  function submit(e) {
    e.preventDefault()
    show('Warranty registered — confirmation sent to your email', 'success')
    setForm({ vin: '', orderId: '', odometer: '' })
  }

  return (
    <section className="section-pad">
      <div className="container">
        <SectionHeader label="Peace of Mind" title="Register & Warranty" description="Activate your bike's warranty in 60 seconds." />

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: 14, marginTop: 28 }}>
          {COVERED.map(c => (
            <Card key={c.title} style={{ padding: 22 }}>
              <i className={\`bi bi-\${c.icon}\`} style={{ fontSize: 26, color: 'var(--accent)' }}></i>
              <h3 style={{ marginTop: 10 }}>{c.title}</h3>
              <strong style={{ color: 'var(--accent)', display: 'block', marginTop: 2 }}>{c.duration}</strong>
              <p className="rajdhani-lbl-text-sm" style={{ color: 'var(--gray-400)', marginTop: 6 }}>{c.detail}</p>
            </Card>
          ))}
        </div>

        <Card as="form" onSubmit={submit} style={{ padding: 28, marginTop: 32, maxWidth: 640 }}>
          <h3 style={{ marginBottom: 14 }}>Register Your Bike</h3>
          <FormGroup label="VIN / Chassis Number" htmlFor="vin" required>
            <input id="vin" required value={form.vin} onChange={(e) => setForm(f => ({ ...f, vin: e.target.value }))} placeholder="MD2A22XXXXXX12345" />
          </FormGroup>
          <FormGroup label="Order ID" htmlFor="oid" hint="Optional, helps us look it up faster.">
            <input id="oid" value={form.orderId} onChange={(e) => setForm(f => ({ ...f, orderId: e.target.value }))} placeholder="SV234581" />
          </FormGroup>
          <FormGroup label="Current Odometer (km)" htmlFor="odo">
            <input id="odo" type="number" value={form.odometer} onChange={(e) => setForm(f => ({ ...f, odometer: e.target.value }))} />
          </FormGroup>
          <Button variant="primary" type="submit" icon="shield-check">Register Warranty</Button>
        </Card>
      </div>
    </section>
  )
}
`)

/* RoadsideAssistance */
w('support/RoadsideAssistance.jsx', `import { Button, Card, SectionHeader } from '@/ui'

const COVERED = [
  { icon: 'truck',               title: 'Free Towing',           detail: 'Free towing to nearest service centre within 50 km.' },
  { icon: 'tools',                title: 'On-Spot Repair',        detail: 'Minor issues fixed roadside — flat tyre, fuse, battery jump.' },
  { icon: 'phone-fill',           title: '24/7 Helpline',         detail: 'Live agent within 30 seconds, any time of day.' },
  { icon: 'lightning-charge-fill', title: 'Battery Swap Service', detail: 'Hot-swap a charged pack at your location (metro cities).' },
  { icon: 'house-fill',           title: 'Drop You Home',         detail: 'Cab fare reimbursed up to ₹500 if towing required.' },
  { icon: 'shield-check',         title: 'Insurance Liaison',     detail: 'We coordinate with insurers so you don\\'t have to.' },
]

export default function RoadsideAssistance() {
  return (
    <section className="section-pad">
      <div className="container">
        <SectionHeader label="Help, Anywhere" title="Roadside Assistance" description="Free for every CSR 762 owner, 24×7×365." />

        <Card style={{ padding: 28, margin: '28px 0', textAlign: 'center', background: 'var(--gray-950)' }}>
          <i className="bi bi-telephone-inbound-fill" style={{ fontSize: 32, color: 'var(--accent)' }}></i>
          <h2 className="section-title" style={{ fontSize: 'var(--fs-h2)', marginTop: 8 }}>1800-XXX-7620</h2>
          <p className="rajdhani-lbl-text-sm" style={{ color: 'var(--gray-300)' }}>Toll-free, 24/7. Save it to your phone.</p>
          <Button href="tel:1800XXX7620" variant="primary" icon="telephone-fill" className="mt-3">Call Now</Button>
        </Card>

        <h2 className="section-title" style={{ fontSize: 'var(--fs-h3)', marginBottom: 18 }}>What\\'s Covered</h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gridAutoRows: '1fr', gap: 14 }}>
          {COVERED.map(c => (
            <Card key={c.title} style={{ padding: 22 }}>
              <i className={\`bi bi-\${c.icon}\`} style={{ fontSize: 26, color: 'var(--accent)' }}></i>
              <h3 style={{ marginTop: 10 }}>{c.title}</h3>
              <p className="rajdhani-lbl-text-sm" style={{ color: 'var(--gray-400)', marginTop: 6 }}>{c.detail}</p>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
`)

/* OwnersManual */
w('support/OwnersManual.jsx', `import { Card, SectionHeader, Button } from '@/ui'
import { PATHS } from '@/utils/routes'

const CHAPTERS = [
  { ch: '01', title: 'Getting Started',       desc: 'Unboxing, first ride, charging basics.' },
  { ch: '02', title: 'Controls & Dashboard',  desc: 'Buttons, modes, indicators, smart console.' },
  { ch: '03', title: 'Ride Modes & Range',    desc: 'Eco / City / Sport — when to use what.' },
  { ch: '04', title: 'Charging',              desc: 'Home charging, fast charging, battery care.' },
  { ch: '05', title: 'Maintenance',           desc: 'What to clean, what to check, what to leave to us.' },
  { ch: '06', title: 'Service Schedule',      desc: 'First service, periodic checks, brake pads.' },
  { ch: '07', title: 'Troubleshooting',       desc: 'Common warnings + fixes you can do at home.' },
  { ch: '08', title: 'Safety & Compliance',   desc: 'ARAI certifications, do-nots, emergency stops.' },
]

export default function OwnersManual() {
  return (
    <section className="section-pad">
      <div className="container">
        <SectionHeader label="Documentation" title="Owner's Manual" description="Everything you need to ride confidently." />

        <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap', margin: '20px 0' }}>
          <Button variant="primary" icon="file-earmark-pdf" onClick={() => alert('PDF download stub — wire to a real CDN URL.')}>Download Full PDF (12 MB)</Button>
          <Button to={PATHS.specifications} variant="secondary" icon="file-text">Specifications</Button>
          <Button to={PATHS.warranty} variant="secondary" icon="shield-check">Warranty</Button>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))', gap: 14 }}>
          {CHAPTERS.map(c => (
            <Card key={c.ch} style={{ padding: 22 }}>
              <span className="section-label">Chapter {c.ch}</span>
              <h3 style={{ marginTop: 6 }}>{c.title}</h3>
              <p className="rajdhani-lbl-text-sm" style={{ color: 'var(--gray-400)', marginTop: 6 }}>{c.desc}</p>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
`)

/* BookService */
w('support/BookService.jsx', `import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Button, Card, FilterPill, FormGroup, SectionHeader } from '@/ui'
import { PATHS } from '@/utils/routes'
import { useToast } from '@/contexts/ToastContext'

const TYPES = [
  { id: 'first',       label: 'First Service (Free)',    cost: 0,    eta: '1 hr' },
  { id: 'periodic',    label: 'Periodic Service',         cost: 499,  eta: '2 hrs' },
  { id: 'battery',     label: 'Battery Health Check',     cost: 0,    eta: '45 min' },
  { id: 'tyre',        label: 'Tyre / Brake Inspection',  cost: 299,  eta: '45 min' },
  { id: 'breakdown',   label: 'Breakdown / Repair',       cost: 0,    eta: 'Quote on inspection' },
]

export default function BookService() {
  const navigate = useNavigate()
  const { show } = useToast()
  const [type, setType] = useState('periodic')
  const [form, setForm] = useState({ name: '', phone: '', vin: '', center: 'Svitch Ahmedabad', date: '', time: '10:00' })

  function submit(e) {
    e.preventDefault()
    show('Service booked — confirmation sent via SMS', 'success')
    navigate(PATHS.serviceHistory)
  }

  return (
    <section className="section-pad">
      <div className="container">
        <SectionHeader label="Service" title="Book a Service" description="Pick a slot — pickup-and-drop free in metro cities." />

        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, margin: '22px 0' }}>
          {TYPES.map(t => <FilterPill key={t.id} active={type === t.id} onClick={() => setType(t.id)}>{t.label}</FilterPill>)}
        </div>

        <Card as="form" onSubmit={submit} style={{ padding: 28 }}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14 }}>
            <FormGroup label="Full Name" htmlFor="n" required>
              <input id="n" required value={form.name} onChange={(e) => setForm(f => ({ ...f, name: e.target.value }))} />
            </FormGroup>
            <FormGroup label="Phone" htmlFor="p" required>
              <input id="p" required maxLength={10} value={form.phone} onChange={(e) => setForm(f => ({ ...f, phone: e.target.value }))} />
            </FormGroup>
          </div>
          <FormGroup label="VIN / Chassis Number" htmlFor="vin">
            <input id="vin" value={form.vin} onChange={(e) => setForm(f => ({ ...f, vin: e.target.value }))} placeholder="MD2A22XXXXXX12345" />
          </FormGroup>
          <FormGroup label="Service Centre" htmlFor="ctr">
            <select id="ctr" value={form.center} onChange={(e) => setForm(f => ({ ...f, center: e.target.value }))}>
              {['Svitch Ahmedabad', 'Svitch Mumbai', 'Svitch Bengaluru', 'Svitch Delhi', 'Svitch Chennai', 'Svitch Pune'].map(c => <option key={c}>{c}</option>)}
            </select>
          </FormGroup>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14 }}>
            <FormGroup label="Date" htmlFor="d" required>
              <input id="d" type="date" required value={form.date} onChange={(e) => setForm(f => ({ ...f, date: e.target.value }))} />
            </FormGroup>
            <FormGroup label="Time Slot" htmlFor="t">
              <select id="t" value={form.time} onChange={(e) => setForm(f => ({ ...f, time: e.target.value }))}>
                {['09:00', '10:00', '11:00', '12:00', '14:00', '15:00', '16:00'].map(t => <option key={t}>{t}</option>)}
              </select>
            </FormGroup>
          </div>
          <Button variant="primary" type="submit" icon="calendar-check-fill">Confirm Booking</Button>
        </Card>
      </div>
    </section>
  )
}
`)

/* SaversScale */
w('support/SaversScale.jsx', `import { useMemo, useState } from 'react'
import { Card, FormGroup, SectionHeader, Button } from '@/ui'
import { PATHS } from '@/utils/routes'
import { formatCurrency } from '@/utils/formatCurrency'

// Electric vs petrol total-cost-of-ownership calculator.
// All numbers are conservative india-market averages.
const PETROL_ML_PER_KM = 1 / 45          // 45 kmpl
const PETROL_PRICE_PER_L = 105
const ELECTRIC_KWH_PER_KM = 0.022
const ELECTRIC_TARIFF = 8

export default function SaversScale() {
  const [km, setKm] = useState(40)
  const [years, setYears] = useState(5)

  const result = useMemo(() => {
    const daysPerYear = 350
    const totalKm = km * daysPerYear * years
    const petrolCost   = totalKm * PETROL_ML_PER_KM * PETROL_PRICE_PER_L
    const electricCost = totalKm * ELECTRIC_KWH_PER_KM * ELECTRIC_TARIFF
    return { totalKm, petrolCost, electricCost, savings: petrolCost - electricCost }
  }, [km, years])

  return (
    <section className="section-pad">
      <div className="container">
        <SectionHeader
          label="The Math"
          title="Saver's Scale"
          description="See exactly how much you save vs petrol — no marketing math."
        />

        <Card style={{ padding: 28, marginTop: 28 }}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 22 }}>
            <FormGroup label={\`Daily commute: \${km} km\`} htmlFor="km">
              <input id="km" type="range" min={5} max={150} value={km} onChange={(e) => setKm(Number(e.target.value))} />
            </FormGroup>
            <FormGroup label={\`Ownership years: \${years}\`} htmlFor="yr">
              <input id="yr" type="range" min={1} max={10} value={years} onChange={(e) => setYears(Number(e.target.value))} />
            </FormGroup>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: 14, marginTop: 18 }}>
            <Tile label="Total kilometres" value={result.totalKm.toLocaleString('en-IN')} suffix="km" />
            <Tile label="Petrol cost" value={formatCurrency(result.petrolCost)} dim />
            <Tile label="Electric cost" value={formatCurrency(result.electricCost)} dim />
            <Tile label="You save" value={formatCurrency(result.savings)} accent />
          </div>

          <div style={{ textAlign: 'center', marginTop: 22 }}>
            <Button to={PATHS.shop} variant="primary" iconRight="arrow-right">Switch to Electric</Button>
          </div>
        </Card>
      </div>
    </section>
  )
}

function Tile({ label, value, suffix, dim, accent }) {
  return (
    <div style={{ padding: 18, border: '1px solid var(--border)', textAlign: 'center' }}>
      <div className="rajdhani-lbl-text-sm" style={{ color: 'var(--gray-400)' }}>{label}</div>
      <strong style={{ fontSize: 24, color: accent ? 'var(--accent)' : dim ? 'var(--gray-300)' : 'var(--white)' }}>
        {value}{suffix && <small style={{ marginLeft: 4 }}>{suffix}</small>}
      </strong>
    </div>
  )
}
`)

/* Specifications */
w('support/Specifications.jsx', `import { Button, Card, SectionHeader } from '@/ui'
import { PATHS } from '@/utils/routes'

const SPECS = [
  { group: 'Performance', rows: [
    ['Peak Power', '6.5 kW'],
    ['Continuous Power', '3 kW'],
    ['Top Speed', '110 km/h'],
    ['0–60 km/h', '6 seconds'],
    ['Torque', '55 Nm'],
    ['Ride Modes', '6 (Eco / City / Sport / Custom × 3)'],
  ]},
  { group: 'Battery & Charging', rows: [
    ['Battery', '3.6 kWh Li-NMC, swappable dual-pack'],
    ['Range (IDC)', '125 km'],
    ['Real-world', '95–110 km (eco)'],
    ['Home charging', '5.5 hr (0–100%)'],
    ['DC fast charging', '80% in ~1.5 hr'],
    ['Warranty', '3 years / unlimited km'],
  ]},
  { group: 'Chassis & Dimensions', rows: [
    ['Frame', 'Tubular trellis, mild steel'],
    ['Front suspension', '37mm telescopic'],
    ['Rear suspension', 'Mono-shock, adjustable preload'],
    ['Front brake', '270mm petal disc'],
    ['Rear brake', '240mm disc'],
    ['Wheelbase', '1,330 mm'],
    ['Ground clearance', '175 mm'],
    ['Seat height', '780 mm'],
    ['Kerb weight', '128 kg'],
  ]},
  { group: 'Tyres & Wheels', rows: [
    ['Front tyre', '90/80-17 tubeless'],
    ['Rear tyre', '110/80-17 tubeless'],
    ['Wheel type', 'Alloy, cast'],
  ]},
  { group: 'Electronics', rows: [
    ['Dashboard', '7" colour TFT'],
    ['Connectivity', 'Bluetooth 5.0, GPS, 4G LTE'],
    ['App support', 'Android + iOS'],
    ['OTA updates', 'Yes'],
    ['Headlight', 'Full LED with DRL'],
  ]},
]

export default function Specifications() {
  return (
    <section className="section-pad">
      <div className="container">
        <SectionHeader label="The Numbers" title="CSR 762 Specifications" description="Every spec, on one page. Nothing hidden." />

        <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap', margin: '20px 0' }}>
          <Button to={PATHS.ownersManual} variant="primary" icon="file-earmark-pdf">Owner&apos;s Manual</Button>
          <Button to={PATHS.compare} variant="secondary" icon="bar-chart">Compare Models</Button>
        </div>

        <div style={{ display: 'grid', gap: 16, marginTop: 18 }}>
          {SPECS.map(s => (
            <Card key={s.group} style={{ padding: 0 }}>
              <div style={{ padding: '14px 20px', borderBottom: '1px solid var(--border-bright)' }}>
                <strong>{s.group}</strong>
              </div>
              <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                <tbody>
                  {s.rows.map(([k, v]) => (
                    <tr key={k} style={{ borderBottom: '1px solid var(--border)' }}>
                      <th style={{ padding: '12px 20px', textAlign: 'left', fontWeight: 500, color: 'var(--gray-400)', width: '40%' }} className="rajdhani-lbl-text-sm">{k}</th>
                      <td style={{ padding: '12px 20px', color: 'var(--white)' }}>{v}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
`)

console.log('Batch 5 generation complete — 9 support pages written.')
