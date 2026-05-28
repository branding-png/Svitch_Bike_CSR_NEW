// One-shot generator for Step 9 Batch 2. Run with: node scripts/batch2.mjs
// Writes 17 ported pages (4 remaining shop + 13 account). Overwrites existing.

import { writeFileSync, mkdirSync } from 'node:fs'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'

const ROOT = dirname(dirname(fileURLToPath(import.meta.url)))
const r = (p) => join(ROOT, 'src', 'routes', p)
const w = (rel, body) => {
  const file = r(rel)
  mkdirSync(dirname(file), { recursive: true })
  writeFileSync(file, body, 'utf8')
}

/* ─── shop/PaymentFailed ─────────────────────────────────────────────── */
w('shop/PaymentFailed.jsx', `import { Link } from 'react-router-dom'
import { Button, Card } from '@/ui'
import { PATHS } from '@/utils/routes'

export default function PaymentFailed() {
  return (
    <section className="section-pad">
      <div className="container" style={{ textAlign: 'center' }}>
        <i className="bi bi-x-circle-fill" style={{ fontSize: 64, color: '#ef4444' }}></i>
        <span className="section-label" style={{ marginTop: 12 }}>Payment Failed</span>
        <h1 className="section-title">Something went wrong</h1>
        <p className="section-desc">
          Your payment didn't go through. No amount has been deducted. Please try again
          or pick a different payment method.
        </p>
        <Card style={{ maxWidth: 480, margin: '28px auto', padding: 22, textAlign: 'left' }}>
          <h4 style={{ marginBottom: 10 }}>Common causes</h4>
          <ul className="rajdhani-lbl-text-sm" style={{ color: 'var(--gray-300)', paddingLeft: 18, lineHeight: 1.9 }}>
            <li>Card limit exceeded or expired card</li>
            <li>UPI app session timed out</li>
            <li>Network interruption mid-transaction</li>
            <li>Bank declined the transaction</li>
          </ul>
        </Card>
        <div style={{ display: 'flex', gap: 10, justifyContent: 'center', flexWrap: 'wrap' }}>
          <Button to={PATHS.payment} variant="primary" icon="arrow-repeat">Retry Payment</Button>
          <Button to={PATHS.cart} variant="secondary" icon="cart3">Back to Cart</Button>
          <Link to={PATHS.ticket} className="btn-csr secondary rajdhani-lbl-text-sm"><i className="bi bi-headset"></i> Get Help</Link>
        </div>
      </div>
    </section>
  )
}
`)

/* ─── shop/OrderConfirmation ────────────────────────────────────────── */
w('shop/OrderConfirmation.jsx', `import { Link, useSearchParams } from 'react-router-dom'
import { Button, Card } from '@/ui'
import { PATHS } from '@/utils/routes'
import { formatCurrency } from '@/utils/formatCurrency'

export default function OrderConfirmation() {
  const [params] = useSearchParams()
  const id = params.get('id') || 'SV000000'
  let order = null
  try { order = JSON.parse(sessionStorage.getItem('svitchLastOrder') || 'null') } catch {}

  const milestones = [
    { icon: 'check-circle-fill', title: 'Order Confirmed', desc: 'We received your order' },
    { icon: 'box-seam',          title: 'Processing',      desc: 'Packed within 24 hrs' },
    { icon: 'truck',             title: 'Dispatched',      desc: 'Tracking link via SMS' },
    { icon: 'flag-fill',         title: 'Delivered',       desc: 'Right to your door' },
  ]

  return (
    <section className="section-pad">
      <div className="container" style={{ textAlign: 'center' }}>
        <i className="bi bi-check-circle-fill" style={{ fontSize: 64, color: 'var(--accent)' }}></i>
        <span className="section-label" style={{ marginTop: 12 }}>Order Placed</span>
        <h1 className="section-title">Thank you — your order is in!</h1>
        <p className="section-desc">
          Order ID <strong style={{ color: 'var(--white)' }}>#{id}</strong>. A confirmation email is on its way.
        </p>

        {order && (
          <Card style={{ maxWidth: 520, margin: '28px auto', padding: 24, textAlign: 'left' }}>
            <h3>Order Summary</h3>
            <ul style={{ listStyle: 'none', padding: 0, margin: '12px 0', display: 'grid', rowGap: 8 }}>
              {(order.items || []).map((it) => (
                <li key={it.id} className="rajdhani-lbl-text-sm" style={{ display: 'flex', justifyContent: 'space-between', color: 'var(--gray-300)' }}>
                  <span>{it.name} × {it.qty}</span>
                  <span>{formatCurrency(it.price * it.qty)}</span>
                </li>
              ))}
            </ul>
            <hr style={{ borderColor: 'var(--border)' }} />
            <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 10 }}>
              <strong>Total</strong>
              <strong>{formatCurrency(order.total)}</strong>
            </div>
          </Card>
        )}

        <div style={{ display: 'flex', gap: 10, justifyContent: 'center', flexWrap: 'wrap', marginTop: 16 }}>
          <Button to={PATHS.trackOrder} variant="primary" icon="truck">Track Order</Button>
          <Button to={PATHS.orders} variant="secondary" icon="bag-check">View My Orders</Button>
        </div>

        <h2 className="section-title" style={{ fontSize: 'var(--fs-h3)', marginTop: 56 }}>What happens next</h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: 14, marginTop: 20 }}>
          {milestones.map((m) => (
            <Card key={m.title} style={{ padding: 18, textAlign: 'left' }}>
              <i className={\`bi bi-\${m.icon}\`} style={{ fontSize: 22, color: 'var(--accent)' }}></i>
              <h4 style={{ margin: '10px 0 4px' }}>{m.title}</h4>
              <p className="rajdhani-lbl-text-sm" style={{ color: 'var(--gray-400)' }}>{m.desc}</p>
            </Card>
          ))}
        </div>

        <p className="rajdhani-lbl-text-sm" style={{ marginTop: 32, color: 'var(--gray-500)' }}>
          Need help? <Link to={PATHS.ticket} style={{ color: 'var(--white)' }}>Open a support ticket</Link>.
        </p>
      </div>
    </section>
  )
}
`)

/* ─── shop/TrackOrder ───────────────────────────────────────────────── */
w('shop/TrackOrder.jsx', `import { useState } from 'react'
import { BreadCrumb, Button, Card, FormGroup, OrderStatusBadge } from '@/ui'
import { PATHS } from '@/utils/routes'
import { getOrder, ORDERS } from '@/data/orders'

export default function TrackOrder() {
  const [orderId, setOrderId] = useState('')
  const [order, setOrder] = useState(null)
  const [error, setError] = useState('')

  function handleSearch(e) {
    e.preventDefault()
    const found = getOrder(orderId.trim())
    if (!found) {
      setError('No order found with that ID. Try ' + ORDERS.map(o => o.id).join(' / '))
      setOrder(null)
      return
    }
    setError('')
    setOrder(found)
  }

  return (
    <section className="section-pad">
      <div className="container">
        <BreadCrumb items={[{ label: 'Home', to: PATHS.home }, { label: 'Track Order' }]} />
        <h1 className="section-title" style={{ marginTop: 16 }}>Track Your Order</h1>
        <p className="section-desc">Enter your order ID to see its current status.</p>

        <Card as="form" onSubmit={handleSearch} style={{ padding: 22, marginTop: 24, maxWidth: 560 }}>
          <FormGroup label="Order ID" htmlFor="orderId" error={error}>
            <input id="orderId" value={orderId} onChange={(e) => setOrderId(e.target.value)} placeholder="e.g. SV234581" />
          </FormGroup>
          <Button variant="primary" type="submit" icon="search">Track</Button>
        </Card>

        {order && (
          <Card style={{ padding: 24, marginTop: 28 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap', gap: 12 }}>
              <div>
                <h3>Order #{order.id}</h3>
                <span className="rajdhani-lbl-text-sm" style={{ color: 'var(--gray-400)' }}>Placed {order.placedAt}</span>
              </div>
              <OrderStatusBadge status={order.status} />
            </div>
            <ol style={{ listStyle: 'none', padding: 0, margin: '24px 0 0', display: 'grid', gap: 10 }}>
              {order.timeline.map((s, i) => (
                <li key={i} style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                  <i className={\`bi \${s.done ? 'bi-check-circle-fill' : 'bi-circle'}\`}
                     style={{ color: s.done ? 'var(--accent)' : 'var(--gray-500)' }}></i>
                  <strong style={{ flex: 1 }}>{s.stage}</strong>
                  <span className="rajdhani-lbl-text-sm" style={{ color: 'var(--gray-400)' }}>{s.date || '—'}</span>
                </li>
              ))}
            </ol>
            {order.trackingNumber && (
              <p className="rajdhani-lbl-text-sm" style={{ marginTop: 16, color: 'var(--gray-300)' }}>
                Tracking: <strong style={{ color: 'var(--white)' }}>{order.trackingNumber}</strong>
              </p>
            )}
          </Card>
        )}
      </div>
    </section>
  )
}
`)

/* ─── shop/Compare ──────────────────────────────────────────────────── */
w('shop/Compare.jsx', `import { useMemo, useState } from 'react'
import { BreadCrumb, Card } from '@/ui'
import { PATHS } from '@/utils/routes'
import { PRODUCTS } from '@/data/products'
import { formatCurrency } from '@/utils/formatCurrency'

// Compare up to 3 products side-by-side. Specs union ensures every row is
// shown even if one product doesn't have that spec key.
export default function Compare() {
  const bikes = PRODUCTS.filter(p => p.category === 'motorcycles' || p.category === 'ebikes')
  const [picks, setPicks] = useState(bikes.slice(0, 2).map(p => p.id))

  const selected = picks.map(id => bikes.find(b => b.id === id)).filter(Boolean)
  const allSpecKeys = useMemo(() => {
    const keys = new Set()
    selected.forEach(p => Object.keys(p.specs || {}).forEach(k => keys.add(k)))
    return Array.from(keys)
  }, [selected])

  function setPick(i, id) {
    setPicks(prev => { const next = prev.slice(); next[i] = id; return next })
  }

  return (
    <section className="section-pad">
      <div className="container">
        <BreadCrumb items={[{ label: 'Home', to: PATHS.home }, { label: 'Compare' }]} />
        <h1 className="section-title" style={{ marginTop: 16 }}>Compare Bikes</h1>
        <p className="section-desc">Pick up to 3 bikes and see how they stack up, side-by-side.</p>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 14, marginTop: 24 }}>
          {[0, 1, 2].map(i => {
            const p = selected[i]
            return (
              <Card key={i} style={{ padding: 18 }}>
                <select
                  value={picks[i] || ''}
                  onChange={(e) => setPick(i, e.target.value)}
                  style={{ width: '100%', marginBottom: 12 }}
                >
                  <option value="">— Select bike —</option>
                  {bikes.map(b => <option key={b.id} value={b.id}>{b.name}</option>)}
                </select>
                {p ? (
                  <>
                    <img src={p.image} alt={p.name} style={{ width: '100%', height: 160, objectFit: 'cover', background: 'var(--gray-950)' }} />
                    <h3 style={{ marginTop: 10 }}>{p.name}</h3>
                    <strong>{formatCurrency(p.price)}</strong>
                  </>
                ) : (
                  <div style={{ height: 160, display: 'grid', placeItems: 'center', background: 'var(--gray-950)', color: 'var(--gray-500)' }}>
                    <i className="bi bi-plus-circle" style={{ fontSize: 32 }}></i>
                  </div>
                )}
              </Card>
            )
          })}
        </div>

        {selected.length >= 2 && (
          <Card style={{ marginTop: 28, padding: 0 }}>
            <table style={{ width: '100%', borderCollapse: 'collapse' }}>
              <tbody>
                {allSpecKeys.map(k => (
                  <tr key={k} style={{ borderBottom: '1px solid var(--border)' }}>
                    <th style={{ textAlign: 'left', padding: '12px 16px', color: 'var(--gray-400)', fontWeight: 500, textTransform: 'capitalize' }} className="rajdhani-lbl-text-sm">
                      {k.replace(/([A-Z])/g, ' $1')}
                    </th>
                    {[0, 1, 2].map(i => (
                      <td key={i} style={{ padding: '12px 16px', color: 'var(--white)' }}>
                        {selected[i]?.specs?.[k] || '—'}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </Card>
        )}
      </div>
    </section>
  )
}
`)

/* ─── ACCOUNT PAGES ─────────────────────────────────────────────────── */

/* Dashboard */
w('account/Dashboard.jsx', `import { Link } from 'react-router-dom'
import AccountLayout from '@/features/account/AccountLayout'
import { Card, OrderStatusBadge } from '@/ui'
import { PATHS } from '@/utils/routes'
import { ORDERS } from '@/data/orders'
import { useUser } from '@/contexts/UserContext'
import { useCart } from '@/contexts/CartContext'
import { useWishlist } from '@/contexts/WishlistContext'
import { formatCurrency } from '@/utils/formatCurrency'

export default function Dashboard() {
  const { user } = useUser()
  const { count: cartCount, subtotal } = useCart()
  const { count: wishCount } = useWishlist()
  const recent = ORDERS.slice(0, 3)

  const tiles = [
    { label: 'Orders',   value: ORDERS.length, icon: 'bag-check',   to: PATHS.orders },
    { label: 'Cart',     value: cartCount,     icon: 'cart3',       to: PATHS.cart },
    { label: 'Wishlist', value: wishCount,     icon: 'heart',       to: PATHS.wishlist },
    { label: 'Saved',    value: formatCurrency(subtotal), icon: 'piggy-bank', to: PATHS.cart },
  ]

  return (
    <AccountLayout
      title={\`Hi, \${user?.name || 'Rider'}\`}
      description="Your account at a glance."
    >
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(170px, 1fr))', gap: 14 }}>
        {tiles.map(t => (
          <Card key={t.label} as={Link} to={t.to} style={{ padding: 18, textDecoration: 'none' }}>
            <i className={\`bi bi-\${t.icon}\`} style={{ fontSize: 22, color: 'var(--accent)' }}></i>
            <div className="rajdhani-lbl-text-sm" style={{ color: 'var(--gray-400)', marginTop: 8 }}>{t.label}</div>
            <strong style={{ display: 'block', fontSize: 22, color: 'var(--white)' }}>{t.value}</strong>
          </Card>
        ))}
      </div>

      <h3 style={{ marginTop: 36, marginBottom: 16 }}>Recent Orders</h3>
      <div style={{ display: 'grid', gap: 10 }}>
        {recent.map(o => (
          <Card key={o.id} style={{ padding: 16, display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 12 }}>
            <div>
              <Link to={\`/account/orders/\${o.id}\`} style={{ color: 'var(--white)' }}><strong>#{o.id}</strong></Link>
              <div className="rajdhani-lbl-text-sm" style={{ color: 'var(--gray-400)' }}>{o.placedAt} • {o.items.length} item{o.items.length === 1 ? '' : 's'}</div>
            </div>
            <OrderStatusBadge status={o.status} />
            <strong>{formatCurrency(o.total)}</strong>
          </Card>
        ))}
      </div>
    </AccountLayout>
  )
}
`)

/* Orders */
w('account/Orders.jsx', `import { useState } from 'react'
import { Link } from 'react-router-dom'
import AccountLayout from '@/features/account/AccountLayout'
import { Card, FilterPill, OrderStatusBadge } from '@/ui'
import { ORDERS } from '@/data/orders'
import { formatCurrency } from '@/utils/formatCurrency'

const TABS = [
  { id: 'all',        label: 'All' },
  { id: 'processing', label: 'Processing' },
  { id: 'shipped',    label: 'Shipped' },
  { id: 'delivered',  label: 'Delivered' },
  { id: 'cancelled',  label: 'Cancelled' },
]

export default function Orders() {
  const [tab, setTab] = useState('all')
  const list = tab === 'all' ? ORDERS : ORDERS.filter(o => o.status === tab)

  return (
    <AccountLayout title="My Orders" description="Every order you've placed with us.">
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, marginBottom: 20 }}>
        {TABS.map(t => (
          <FilterPill key={t.id} active={tab === t.id} onClick={() => setTab(t.id)}>{t.label}</FilterPill>
        ))}
      </div>

      {list.length === 0 ? (
        <Card className="account-empty"><h3>No orders in this tab</h3></Card>
      ) : (
        <div style={{ display: 'grid', gap: 12 }}>
          {list.map(o => (
            <Card key={o.id} style={{ padding: 18, display: 'grid', gridTemplateColumns: '90px 1fr auto', gap: 16, alignItems: 'center' }}>
              <img src={o.items[0]?.image} alt="" style={{ width: 90, height: 90, objectFit: 'cover', background: 'var(--gray-950)' }} />
              <div>
                <Link to={\`/account/orders/\${o.id}\`} style={{ color: 'var(--white)' }}><strong>#{o.id}</strong></Link>
                <div className="rajdhani-lbl-text-sm" style={{ color: 'var(--gray-400)', marginTop: 4 }}>
                  {o.items.map(i => i.name).join(', ')}
                </div>
                <div className="rajdhani-lbl-text-sm" style={{ color: 'var(--gray-500)', marginTop: 2 }}>{o.placedAt} • {o.paymentMethod}</div>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: 6 }}>
                <OrderStatusBadge status={o.status} />
                <strong>{formatCurrency(o.total)}</strong>
              </div>
            </Card>
          ))}
        </div>
      )}
    </AccountLayout>
  )
}
`)

/* OrderDetail */
w('account/OrderDetail.jsx', `import { Link, useParams } from 'react-router-dom'
import AccountLayout from '@/features/account/AccountLayout'
import { Card, OrderStatusBadge, Button } from '@/ui'
import { PATHS } from '@/utils/routes'
import { getOrder } from '@/data/orders'
import { formatCurrency } from '@/utils/formatCurrency'

export default function OrderDetail() {
  const { id } = useParams()
  const order = getOrder(id)

  if (!order) {
    return (
      <AccountLayout title="Order not found">
        <Card className="account-empty">
          <h3>We couldn&apos;t find order #{id}</h3>
          <Link to={PATHS.orders} className="btn-csr primary">Back to Orders</Link>
        </Card>
      </AccountLayout>
    )
  }

  return (
    <AccountLayout
      title={\`Order #\${order.id}\`}
      description={\`Placed on \${order.placedAt}\`}
      actions={
        <>
          <Button to={\`\${PATHS.returnRequest}?order=\${order.id}\`} variant="secondary" size="sm" icon="arrow-counterclockwise">Return / Replace</Button>
          <Button to={\`\${PATHS.ticket}?order=\${order.id}\`} variant="secondary" size="sm" icon="headset">Get Help</Button>
        </>
      }
    >
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 320px', gap: 20 }}>
        <div style={{ display: 'grid', gap: 14 }}>
          <Card style={{ padding: 20 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <h3>Status</h3>
              <OrderStatusBadge status={order.status} />
            </div>
            <ol style={{ listStyle: 'none', padding: 0, margin: '16px 0 0', display: 'grid', gap: 10 }}>
              {order.timeline.map((s, i) => (
                <li key={i} style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                  <i className={\`bi \${s.done ? 'bi-check-circle-fill' : 'bi-circle'}\`}
                     style={{ color: s.done ? 'var(--accent)' : 'var(--gray-500)' }}></i>
                  <strong style={{ flex: 1 }}>{s.stage}</strong>
                  <span className="rajdhani-lbl-text-sm" style={{ color: 'var(--gray-400)' }}>{s.date || '—'}</span>
                </li>
              ))}
            </ol>
          </Card>

          <Card style={{ padding: 20 }}>
            <h3 style={{ marginBottom: 12 }}>Items ({order.items.length})</h3>
            {order.items.map(it => (
              <div key={it.id} style={{ display: 'grid', gridTemplateColumns: '80px 1fr auto', gap: 14, padding: '10px 0', borderBottom: '1px solid var(--border)', alignItems: 'center' }}>
                <img src={it.image} alt="" style={{ width: 80, height: 80, objectFit: 'cover', background: 'var(--gray-950)' }} />
                <div>
                  <strong>{it.name}</strong>
                  <div className="rajdhani-lbl-text-sm" style={{ color: 'var(--gray-400)' }}>{[it.color, \`Qty \${it.qty}\`].filter(Boolean).join(' • ')}</div>
                </div>
                <strong>{formatCurrency(it.price * it.qty)}</strong>
              </div>
            ))}
          </Card>
        </div>

        <div style={{ display: 'grid', gap: 14, alignContent: 'start' }}>
          <Card style={{ padding: 20 }}>
            <h4 style={{ marginBottom: 10 }}>Shipping To</h4>
            <p className="rajdhani-lbl-text-sm" style={{ color: 'var(--gray-300)', lineHeight: 1.7 }}>
              <strong style={{ color: 'var(--white)', display: 'block' }}>{order.address.name}</strong>
              {order.address.line}<br />
              {order.address.city}, {order.address.state} {order.address.pincode}
            </p>
          </Card>
          <Card style={{ padding: 20 }}>
            <h4 style={{ marginBottom: 10 }}>Summary</h4>
            <Row label="Subtotal" value={formatCurrency(order.subtotal)} />
            <Row label="Shipping" value={order.shipping === 0 ? 'Free' : formatCurrency(order.shipping)} />
            <Row label="GST" value={formatCurrency(order.tax)} />
            <hr style={{ borderColor: 'var(--border)' }} />
            <Row label="Total" value={formatCurrency(order.total)} strong />
            <div className="rajdhani-lbl-text-sm" style={{ color: 'var(--gray-400)', marginTop: 8 }}>Paid via {order.paymentMethod}</div>
          </Card>
        </div>
      </div>
    </AccountLayout>
  )
}

function Row({ label, value, strong }) {
  return (
    <div style={{ display: 'flex', justifyContent: 'space-between', padding: '4px 0' }}>
      <span className="rajdhani-lbl-text-sm" style={{ color: 'var(--gray-400)' }}>{label}</span>
      <strong style={{ color: 'var(--white)', fontWeight: strong ? 700 : 400 }}>{value}</strong>
    </div>
  )
}
`)

/* Profile */
w('account/Profile.jsx', `import { useState } from 'react'
import AccountLayout from '@/features/account/AccountLayout'
import { Card, FormGroup, Button, ToggleSwitch } from '@/ui'
import { useUser } from '@/contexts/UserContext'
import { useToast } from '@/contexts/ToastContext'

export default function Profile() {
  const { user, login } = useUser()
  const { show } = useToast()
  const [form, setForm] = useState({
    name:  user?.name  || '',
    email: user?.email || '',
    phone: user?.phone || '',
  })
  const [prefs, setPrefs] = useState({ twoFactor: false, marketing: true, dataShare: false })

  function save(e) {
    e.preventDefault()
    login({ ...(user || {}), ...form })
    show('Profile updated', 'success')
  }

  return (
    <AccountLayout title="My Profile" description="Personal details and account preferences.">
      <Card as="form" onSubmit={save} style={{ padding: 24, marginBottom: 20 }}>
        <h3 style={{ marginBottom: 18 }}>Personal Info</h3>
        <FormGroup label="Full Name" htmlFor="name">
          <input id="name" value={form.name} onChange={(e) => setForm(f => ({ ...f, name: e.target.value }))} />
        </FormGroup>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14 }}>
          <FormGroup label="Email" htmlFor="email">
            <input id="email" type="email" value={form.email} onChange={(e) => setForm(f => ({ ...f, email: e.target.value }))} />
          </FormGroup>
          <FormGroup label="Phone" htmlFor="phone">
            <input id="phone" value={form.phone} onChange={(e) => setForm(f => ({ ...f, phone: e.target.value }))} />
          </FormGroup>
        </div>
        <Button variant="primary" type="submit" icon="check2">Save Changes</Button>
      </Card>

      <Card style={{ padding: 24, marginBottom: 20 }}>
        <h3 style={{ marginBottom: 4 }}>Two-Factor Authentication</h3>
        <p className="rajdhani-lbl-text-sm" style={{ color: 'var(--gray-400)', marginBottom: 14 }}>
          Add an extra layer of security to your account.
        </p>
        <ToggleSwitch checked={prefs.twoFactor} onChange={(v) => setPrefs(p => ({ ...p, twoFactor: v }))} label="Enable 2FA via SMS" />
      </Card>

      <Card style={{ padding: 24 }}>
        <h3 style={{ marginBottom: 4 }}>Privacy & Data</h3>
        <p className="rajdhani-lbl-text-sm" style={{ color: 'var(--gray-400)', marginBottom: 14 }}>
          Control how we contact you and share your data.
        </p>
        <div style={{ display: 'grid', gap: 12 }}>
          <ToggleSwitch checked={prefs.marketing} onChange={(v) => setPrefs(p => ({ ...p, marketing: v }))} label="Marketing emails & SMS" />
          <ToggleSwitch checked={prefs.dataShare} onChange={(v) => setPrefs(p => ({ ...p, dataShare: v }))} label="Share anonymised data for product improvement" />
        </div>
      </Card>
    </AccountLayout>
  )
}
`)

/* Invoices */
w('account/Invoices.jsx', `import AccountLayout from '@/features/account/AccountLayout'
import { Card } from '@/ui'
import { ORDERS } from '@/data/orders'
import { formatCurrency } from '@/utils/formatCurrency'

export default function Invoices() {
  return (
    <AccountLayout title="Invoices & GST" description="Download tax invoices for every paid order.">
      <Card style={{ padding: 0 }}>
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr style={{ borderBottom: '1px solid var(--border-bright)' }}>
              <th style={{ textAlign: 'left', padding: '14px 16px' }} className="rajdhani-lbl-text-sm">Invoice #</th>
              <th style={{ textAlign: 'left', padding: '14px 16px' }} className="rajdhani-lbl-text-sm">Order</th>
              <th style={{ textAlign: 'left', padding: '14px 16px' }} className="rajdhani-lbl-text-sm">Date</th>
              <th style={{ textAlign: 'right', padding: '14px 16px' }} className="rajdhani-lbl-text-sm">Amount</th>
              <th style={{ textAlign: 'right', padding: '14px 16px' }} className="rajdhani-lbl-text-sm">Action</th>
            </tr>
          </thead>
          <tbody>
            {ORDERS.map(o => (
              <tr key={o.id} style={{ borderBottom: '1px solid var(--border)' }}>
                <td style={{ padding: '14px 16px' }}>INV-{o.id.replace('SV', '')}</td>
                <td style={{ padding: '14px 16px' }}>#{o.id}</td>
                <td style={{ padding: '14px 16px', color: 'var(--gray-300)' }}>{o.placedAt}</td>
                <td style={{ padding: '14px 16px', textAlign: 'right' }}>{formatCurrency(o.total)}</td>
                <td style={{ padding: '14px 16px', textAlign: 'right' }}>
                  <button className="btn-csr secondary sm rajdhani-lbl-text-sm" onClick={() => alert('Download stub — wire to real PDF later')}>
                    <i className="bi bi-download"></i> PDF
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </Card>
    </AccountLayout>
  )
}
`)

/* Returns */
w('account/Returns.jsx', `import { Link } from 'react-router-dom'
import AccountLayout from '@/features/account/AccountLayout'
import { Card, Button } from '@/ui'
import { PATHS } from '@/utils/routes'

const RETURNS = [
  { id: 'RT-1001', order: 'SV234581', item: 'CSR Helmet (ISI)',     image: '/images/products/csr-762.webp',       status: 'pending',   statusLabel: 'Pending Pickup' },
  { id: 'RT-1002', order: 'SV234581', item: 'Home Charging Dock',   image: '/images/products/csr-762-gray.webp',  status: 'approved',  statusLabel: 'Replacement Shipped' },
  { id: 'RT-1003', order: 'SV234562', item: 'Battery Pack',         image: '/images/products/csr-762-red.webp',   status: 'refunded',  statusLabel: 'Refunded' },
  { id: 'RT-1004', order: 'SV234540', item: 'CSR 762 (defect)',     image: '/images/products/csr-762.webp',       status: 'rejected',  statusLabel: 'Rejected' },
]

export default function Returns() {
  return (
    <AccountLayout
      title="Returns & Refunds"
      description="Track returns and replacement requests."
      actions={<Button to={PATHS.returnRequest} variant="primary" size="sm" icon="arrow-counterclockwise">New Return</Button>}
    >
      <div style={{ display: 'grid', gap: 12 }}>
        {RETURNS.map(r => (
          <Card key={r.id} style={{ padding: 18, display: 'grid', gridTemplateColumns: '100px 1fr 170px', gap: 16, alignItems: 'center' }}>
            <img src={r.image} alt="" style={{ width: 100, height: 100, objectFit: 'cover', background: 'var(--gray-950)' }} />
            <div>
              <strong>{r.item}</strong>
              <div className="rajdhani-lbl-text-sm" style={{ color: 'var(--gray-400)', marginTop: 4 }}>
                Return ID {r.id} • Order <Link to={\`/account/orders/\${r.order}\`}>#{r.order}</Link>
              </div>
            </div>
            <div className="return-actions">
              <span className={\`return-status \${r.status} rajdhani-lbl-text-sm\`}>{r.statusLabel}</span>
              <Link to={\`\${PATHS.returnRequest}?id=\${r.id}\`} className="btn-csr secondary sm rajdhani-lbl-text-sm">View Details</Link>
            </div>
          </Card>
        ))}
      </div>
    </AccountLayout>
  )
}
`)

/* ReturnRequest */
w('account/ReturnRequest.jsx', `import { useState } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'
import AccountLayout from '@/features/account/AccountLayout'
import { Card, FormGroup, Button } from '@/ui'
import { PATHS } from '@/utils/routes'
import { useToast } from '@/contexts/ToastContext'

const REASONS = [
  'Defective / damaged on arrival',
  'Wrong item delivered',
  'Different from description',
  'No longer needed',
  'Other',
]

export default function ReturnRequest() {
  const [params] = useSearchParams()
  const orderId = params.get('order') || ''
  const navigate = useNavigate()
  const { show } = useToast()
  const [form, setForm] = useState({ orderId, reason: REASONS[0], details: '' })

  function submit(e) {
    e.preventDefault()
    show('Return request submitted', 'success')
    navigate(PATHS.returns)
  }

  return (
    <AccountLayout title="Request a Return" description="Tell us what went wrong and we'll handle it.">
      <Card as="form" onSubmit={submit} style={{ padding: 24, maxWidth: 720 }}>
        <FormGroup label="Order ID" htmlFor="orderId">
          <input id="orderId" value={form.orderId} onChange={(e) => setForm(f => ({ ...f, orderId: e.target.value }))} placeholder="e.g. SV234581" />
        </FormGroup>
        <FormGroup label="Reason" htmlFor="reason">
          <select id="reason" value={form.reason} onChange={(e) => setForm(f => ({ ...f, reason: e.target.value }))}>
            {REASONS.map(r => <option key={r}>{r}</option>)}
          </select>
        </FormGroup>
        <FormGroup label="Details" htmlFor="details" hint="The more detail, the faster we can resolve it.">
          <textarea id="details" rows={5} value={form.details} onChange={(e) => setForm(f => ({ ...f, details: e.target.value }))} />
        </FormGroup>
        <Button variant="primary" type="submit" icon="send">Submit Request</Button>
      </Card>
    </AccountLayout>
  )
}
`)

/* ServiceHistory */
w('account/ServiceHistory.jsx', `import AccountLayout from '@/features/account/AccountLayout'
import { Card, Button } from '@/ui'
import { PATHS } from '@/utils/routes'

const HISTORY = [
  { date: '2026-03-18', center: 'Svitch Ahmedabad', service: 'First Service (Free)', km: '1,250', cost: 0,    status: 'completed' },
  { date: '2026-04-22', center: 'Svitch Ahmedabad', service: 'Battery Health Check', km: '3,420', cost: 0,    status: 'completed' },
  { date: '2026-05-30', center: 'Svitch Ahmedabad', service: 'Brake pad replacement', km: '5,200', cost: 1499, status: 'scheduled' },
]

export default function ServiceHistory() {
  return (
    <AccountLayout
      title="Service History"
      description="Every service visit, on record."
      actions={<Button to={PATHS.bookService} variant="primary" size="sm" icon="calendar-plus">Book Service</Button>}
    >
      <Card style={{ padding: 0 }}>
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr style={{ borderBottom: '1px solid var(--border-bright)' }}>
              <th style={{ textAlign: 'left', padding: '14px 16px' }} className="rajdhani-lbl-text-sm">Date</th>
              <th style={{ textAlign: 'left', padding: '14px 16px' }} className="rajdhani-lbl-text-sm">Service</th>
              <th style={{ textAlign: 'left', padding: '14px 16px' }} className="rajdhani-lbl-text-sm">Center</th>
              <th style={{ textAlign: 'right', padding: '14px 16px' }} className="rajdhani-lbl-text-sm">Odometer</th>
              <th style={{ textAlign: 'right', padding: '14px 16px' }} className="rajdhani-lbl-text-sm">Cost</th>
              <th style={{ textAlign: 'right', padding: '14px 16px' }} className="rajdhani-lbl-text-sm">Status</th>
            </tr>
          </thead>
          <tbody>
            {HISTORY.map((h, i) => (
              <tr key={i} style={{ borderBottom: '1px solid var(--border)' }}>
                <td style={{ padding: '14px 16px', color: 'var(--gray-300)' }}>{h.date}</td>
                <td style={{ padding: '14px 16px' }}>{h.service}</td>
                <td style={{ padding: '14px 16px', color: 'var(--gray-400)' }}>{h.center}</td>
                <td style={{ padding: '14px 16px', textAlign: 'right' }}>{h.km} km</td>
                <td style={{ padding: '14px 16px', textAlign: 'right' }}>{h.cost === 0 ? 'Free' : '₹' + h.cost.toLocaleString('en-IN')}</td>
                <td style={{ padding: '14px 16px', textAlign: 'right' }}>
                  <span className={\`return-status \${h.status === 'completed' ? 'approved' : 'pending'} rajdhani-lbl-text-sm\`}>{h.status}</span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </Card>
    </AccountLayout>
  )
}
`)

/* TestRides */
w('account/TestRides.jsx', `import { useState } from 'react'
import AccountLayout from '@/features/account/AccountLayout'
import { Card, Button } from '@/ui'
import { PATHS } from '@/utils/routes'

const SEED = [
  { id: 'TR-501', bike: 'CSR 762',     date: '2026-05-20', time: '11:00', dealer: 'Svitch Ahmedabad', status: 'confirmed', image: '/images/products/csr-762.webp' },
  { id: 'TR-498', bike: 'CSR 762 Pro', date: '2026-04-12', time: '15:30', dealer: 'Svitch Mumbai',    status: 'completed', image: '/images/products/csr-762-gray.webp' },
  { id: 'TR-490', bike: 'CSR 762',     date: '2026-03-02', time: '10:00', dealer: 'Svitch Bengaluru', status: 'completed', image: '/images/products/csr-762.webp' },
]

export default function TestRides() {
  const [rides, setRides] = useState(SEED)

  function cancel(id) {
    setRides(rs => rs.map(r => r.id === id ? { ...r, status: 'cancelled' } : r))
  }

  return (
    <AccountLayout
      title="My Test Rides"
      description="Upcoming and past test ride bookings."
      actions={<Button to={PATHS.bookTestRide} variant="primary" size="sm" icon="calendar-event">Book New</Button>}
    >
      <div style={{ display: 'grid', gap: 12 }}>
        {rides.map(r => (
          <Card key={r.id} style={{ padding: 18, display: 'grid', gridTemplateColumns: '90px 1fr auto', gap: 16, alignItems: 'center' }}>
            <img src={r.image} alt="" style={{ width: 90, height: 90, objectFit: 'cover', background: 'var(--gray-950)' }} />
            <div>
              <strong>{r.bike}</strong>
              <div className="rajdhani-lbl-text-sm" style={{ color: 'var(--gray-400)', marginTop: 4 }}>
                {r.date} • {r.time} • {r.dealer}
              </div>
              <div className="rajdhani-lbl-text-sm" style={{ color: 'var(--gray-500)' }}>Booking #{r.id}</div>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 6, alignItems: 'flex-end' }}>
              <span className={\`order-status \${r.status === 'completed' ? 'delivered' : r.status === 'cancelled' ? 'cancelled' : 'processing'} rajdhani-lbl-text-sm\`}>
                <i className="bi bi-clock-history"></i> {r.status}
              </span>
              {r.status === 'confirmed' && (
                <button type="button" className="rajdhani-lbl-text-sm" onClick={() => cancel(r.id)}
                  style={{ background: 'none', border: 'none', color: 'var(--gray-400)', cursor: 'pointer' }}>
                  Cancel
                </button>
              )}
            </div>
          </Card>
        ))}
      </div>
    </AccountLayout>
  )
}
`)

/* Wishlist */
w('account/Wishlist.jsx', `import { Link } from 'react-router-dom'
import AccountLayout from '@/features/account/AccountLayout'
import { Card, Button } from '@/ui'
import { PATHS } from '@/utils/routes'
import { useWishlist } from '@/contexts/WishlistContext'
import { useToast } from '@/contexts/ToastContext'
import { formatCurrency } from '@/utils/formatCurrency'

export default function Wishlist() {
  const { items, remove, moveToCart } = useWishlist()
  const { show } = useToast()

  if (items.length === 0) {
    return (
      <AccountLayout title="Wishlist" description="Bikes and gear you're keeping an eye on.">
        <Card className="account-empty">
          <i className="bi bi-heart"></i>
          <h3>Your wishlist is empty</h3>
          <p>Tap the heart on any product to save it for later.</p>
          <Link to={PATHS.shop} className="btn-csr primary"><i className="bi bi-grid-fill"></i> Browse Products</Link>
        </Card>
      </AccountLayout>
    )
  }

  function handleMove(p) {
    moveToCart(p, 1)
    show(\`\${p.name} moved to cart\`, 'success')
  }

  return (
    <AccountLayout title="Wishlist" description={\`\${items.length} saved item\${items.length === 1 ? '' : 's'}\`}>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))', gap: 14 }}>
        {items.map(p => (
          <Card key={p.id} style={{ padding: 16 }}>
            <Link to={\`/shop/product/\${p.id}\`}>
              <img src={p.image} alt={p.name} style={{ width: '100%', height: 180, objectFit: 'cover', background: 'var(--gray-950)' }} />
            </Link>
            <h3 style={{ margin: '12px 0 4px' }}>{p.name}</h3>
            <strong style={{ display: 'block', marginBottom: 12 }}>{formatCurrency(p.price)}</strong>
            <div style={{ display: 'flex', gap: 8 }}>
              <Button variant="primary" size="sm" icon="cart-plus" onClick={() => handleMove(p)}>Move to Cart</Button>
              <button type="button" className="btn-csr secondary sm rajdhani-lbl-text-sm" onClick={() => remove(p.id)}>
                <i className="bi bi-trash"></i>
              </button>
            </div>
          </Card>
        ))}
      </div>
    </AccountLayout>
  )
}
`)

/* Addresses */
w('account/Addresses.jsx', `import { useState } from 'react'
import AccountLayout from '@/features/account/AccountLayout'
import { Card, Button, FormGroup, Modal } from '@/ui'
import { useToast } from '@/contexts/ToastContext'

const SEED = [
  { id: 1, label: 'Home',   name: 'Riya Sharma', line: 'A-410 Stellar, Sindhu Bhavan Road', city: 'Ahmedabad', state: 'Gujarat',     pincode: '380054', phone: '+91 635 127 2002', default: true },
  { id: 2, label: 'Office', name: 'Riya Sharma', line: '3rd Floor, Iconic Tower, SG Highway', city: 'Ahmedabad', state: 'Gujarat',   pincode: '380060', phone: '+91 635 127 2002', default: false },
]
const EMPTY = { label: 'Home', name: '', line: '', city: '', state: '', pincode: '', phone: '' }

export default function Addresses() {
  const { show } = useToast()
  const [list, setList] = useState(SEED)
  const [editing, setEditing] = useState(null)
  const isOpen = editing !== null

  function save(e) {
    e.preventDefault()
    if (editing.id) {
      setList(l => l.map(a => a.id === editing.id ? { ...a, ...editing } : a))
      show('Address updated', 'success')
    } else {
      setList(l => [...l, { ...editing, id: Date.now() }])
      show('Address added', 'success')
    }
    setEditing(null)
  }
  function makeDefault(id) {
    setList(l => l.map(a => ({ ...a, default: a.id === id })))
  }
  function remove(id) {
    setList(l => l.filter(a => a.id !== id))
  }

  return (
    <AccountLayout
      title="Addresses"
      description="Save shipping addresses for faster checkout."
      actions={<Button variant="primary" size="sm" icon="plus-lg" onClick={() => setEditing({ ...EMPTY })}>Add Address</Button>}
    >
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: 14 }}>
        {list.map(a => (
          <Card key={a.id} style={{ padding: 20 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <strong>{a.label}</strong>
              {a.default && <span className="product-badge rajdhani-lbl-text-sm">Default</span>}
            </div>
            <p className="rajdhani-lbl-text-sm" style={{ color: 'var(--gray-300)', lineHeight: 1.6, marginTop: 8 }}>
              <strong style={{ color: 'var(--white)' }}>{a.name}</strong><br />
              {a.line}<br />
              {a.city}, {a.state} {a.pincode}<br />
              {a.phone}
            </p>
            <div style={{ display: 'flex', gap: 6, marginTop: 12, flexWrap: 'wrap' }}>
              <button className="btn-csr secondary sm rajdhani-lbl-text-sm" onClick={() => setEditing(a)}><i className="bi bi-pencil"></i> Edit</button>
              {!a.default && <button className="btn-csr secondary sm rajdhani-lbl-text-sm" onClick={() => makeDefault(a.id)}>Set Default</button>}
              {!a.default && <button className="btn-csr secondary sm rajdhani-lbl-text-sm" onClick={() => remove(a.id)}><i className="bi bi-trash"></i></button>}
            </div>
          </Card>
        ))}
      </div>

      <Modal isOpen={isOpen} onClose={() => setEditing(null)} title={editing?.id ? 'Edit Address' : 'Add Address'}>
        {editing && (
          <form onSubmit={save}>
            <FormGroup label="Label" htmlFor="label">
              <select id="label" value={editing.label} onChange={(e) => setEditing(p => ({ ...p, label: e.target.value }))}>
                {['Home', 'Office', 'Other'].map(o => <option key={o}>{o}</option>)}
              </select>
            </FormGroup>
            <FormGroup label="Full Name" htmlFor="name"><input id="name" value={editing.name} onChange={(e) => setEditing(p => ({ ...p, name: e.target.value }))} /></FormGroup>
            <FormGroup label="Address Line" htmlFor="line"><input id="line" value={editing.line} onChange={(e) => setEditing(p => ({ ...p, line: e.target.value }))} /></FormGroup>
            <div style={{ display: 'grid', gridTemplateColumns: '2fr 2fr 1fr', gap: 12 }}>
              <FormGroup label="City" htmlFor="city"><input id="city" value={editing.city} onChange={(e) => setEditing(p => ({ ...p, city: e.target.value }))} /></FormGroup>
              <FormGroup label="State" htmlFor="state"><input id="state" value={editing.state} onChange={(e) => setEditing(p => ({ ...p, state: e.target.value }))} /></FormGroup>
              <FormGroup label="PIN" htmlFor="pincode"><input id="pincode" value={editing.pincode} onChange={(e) => setEditing(p => ({ ...p, pincode: e.target.value }))} maxLength={6} /></FormGroup>
            </div>
            <FormGroup label="Phone" htmlFor="phone"><input id="phone" value={editing.phone} onChange={(e) => setEditing(p => ({ ...p, phone: e.target.value }))} /></FormGroup>
            <Button variant="primary" type="submit" icon="check2">Save</Button>
          </form>
        )}
      </Modal>
    </AccountLayout>
  )
}
`)

/* Notifications */
w('account/Notifications.jsx', `import { useState } from 'react'
import AccountLayout from '@/features/account/AccountLayout'
import { Card, ToggleSwitch, Button } from '@/ui'

const SEED = [
  { id: 1, title: 'Your CSR 762 is on the way',          ts: '2 hours ago',  unread: true,  icon: 'truck' },
  { id: 2, title: 'Service due in 200 km',                ts: 'Yesterday',    unread: true,  icon: 'tools' },
  { id: 3, title: 'New blog: 6 hidden CSR 762 features',  ts: '3 days ago',   unread: false, icon: 'newspaper' },
  { id: 4, title: 'Welcome to Svitch!',                    ts: 'Last month',   unread: false, icon: 'stars' },
]

export default function Notifications() {
  const [list, setList] = useState(SEED)
  const [prefs, setPrefs] = useState({ orderUpdates: true, service: true, marketing: false })

  function markAllRead() {
    setList(l => l.map(n => ({ ...n, unread: false })))
  }
  function toggleRead(id) {
    setList(l => l.map(n => n.id === id ? { ...n, unread: !n.unread } : n))
  }

  return (
    <AccountLayout
      title="Notifications"
      description="Stay on top of orders, service and announcements."
      actions={<Button variant="secondary" size="sm" icon="check-all" onClick={markAllRead}>Mark all read</Button>}
    >
      <div style={{ display: 'grid', gap: 10, marginBottom: 28 }}>
        {list.map(n => (
          <Card key={n.id} style={{ padding: 16, display: 'flex', alignItems: 'center', gap: 14, opacity: n.unread ? 1 : 0.7, cursor: 'pointer' }} onClick={() => toggleRead(n.id)}>
            <i className={\`bi bi-\${n.icon}\`} style={{ fontSize: 22, color: n.unread ? 'var(--accent)' : 'var(--gray-500)' }}></i>
            <div style={{ flex: 1 }}>
              <strong>{n.title}</strong>
              <div className="rajdhani-lbl-text-sm" style={{ color: 'var(--gray-400)' }}>{n.ts}</div>
            </div>
            {n.unread && <span style={{ width: 8, height: 8, background: 'var(--accent)', borderRadius: '50%' }}></span>}
          </Card>
        ))}
      </div>

      <Card style={{ padding: 24 }}>
        <h3 style={{ marginBottom: 14 }}>Notification Preferences</h3>
        <div style={{ display: 'grid', gap: 10 }}>
          <ToggleSwitch checked={prefs.orderUpdates} onChange={(v) => setPrefs(p => ({ ...p, orderUpdates: v }))} label="Order & shipping updates" />
          <ToggleSwitch checked={prefs.service}      onChange={(v) => setPrefs(p => ({ ...p, service: v }))}      label="Service reminders" />
          <ToggleSwitch checked={prefs.marketing}    onChange={(v) => setPrefs(p => ({ ...p, marketing: v }))}    label="Marketing & new features" />
        </div>
      </Card>
    </AccountLayout>
  )
}
`)

/* SavedJobs */
w('account/SavedJobs.jsx', `import { Link } from 'react-router-dom'
import AccountLayout from '@/features/account/AccountLayout'
import { Card, Button } from '@/ui'
import { PATHS } from '@/utils/routes'

const JOBS = [
  { slug: 'sr-firmware-engineer', title: 'Senior Firmware Engineer', dept: 'Engineering', loc: 'Ahmedabad',    type: 'Full-time' },
  { slug: 'ux-designer-2',         title: 'UX Designer II',           dept: 'Design',      loc: 'Remote, India', type: 'Full-time' },
  { slug: 'service-tech-mumbai',   title: 'Service Technician',       dept: 'Service',     loc: 'Mumbai',        type: 'Full-time' },
]

export default function SavedJobs() {
  return (
    <AccountLayout
      title="Saved Jobs"
      description="Roles you've bookmarked from the careers page."
      actions={<Button to={PATHS.career} variant="secondary" size="sm" icon="briefcase">Browse All Jobs</Button>}
    >
      <div style={{ display: 'grid', gap: 12 }}>
        {JOBS.map(j => (
          <Card key={j.slug} style={{ padding: 18, display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 12 }}>
            <div>
              <Link to={\`\${PATHS.career}/\${j.slug}\`} style={{ color: 'var(--white)' }}><strong>{j.title}</strong></Link>
              <div className="rajdhani-lbl-text-sm" style={{ color: 'var(--gray-400)', marginTop: 4 }}>
                <span className="filter-pill" style={{ padding: '2px 8px', fontSize: 11 }}>{j.dept}</span>
                <span style={{ marginLeft: 8 }}><i className="bi bi-geo-alt"></i> {j.loc}</span>
                <span style={{ marginLeft: 8 }}><i className="bi bi-clock"></i> {j.type}</span>
              </div>
            </div>
            <Link to={\`\${PATHS.career}/\${j.slug}\`} className="btn-csr primary sm rajdhani-lbl-text-sm">View & Apply</Link>
          </Card>
        ))}
      </div>
    </AccountLayout>
  )
}
`)

console.log('Batch 2 generation complete — 17 files written.')
