import { useMemo, useState } from 'react'
import { Link } from 'react-router-dom'

// Events list — mirrors CSR_New_web `#ev-main`.
// Filter pills switch the visible category; "all" shows everything.
const FILTERS = [
  { id: 'all',      label: 'All'              },
  { id: 'testride', label: 'Test-Ride Camps'  },
  { id: 'expo',     label: 'Expos'            },
  { id: 'meet',     label: 'Owners Meets'     },
]

const EVENTS = [
  {
    cat:   'testride',
    img:   '/images/hero/banner.webp',
    day:   '22',
    month: 'May 2026',
    tag:   'Test Ride Camp',
    title: 'CSR 762 Test Days — Bengaluru',
    meta:  'Cubbon Park · 10:00 – 18:00',
    desc:  'Ride all three CSR 762 colors back-to-back on a closed test track. Pre-bookings get priority slots.',
    cta:   { text: 'Reserve a Slot', href: '/offers/book-test-ride', variant: 'primary' },
  },
  {
    cat:   'expo',
    img:   '/images/hero/web-banner-04.webp',
    day:   '04',
    month: 'Jun 2026',
    tag:   'Auto Expo',
    title: 'India EV Expo — Delhi',
    meta:  'Pragati Maidan, Hall 4 · 4–8 Jun',
    desc:  'Visit our pavilion for unveils, factory video walls, and live charging demos.',
    cta:   { text: 'Add to Calendar', href: '#', variant: 'secondary' },
  },
  {
    cat:   'meet',
    img:   '/images/hero/hero-render-media.webp',
    day:   '15',
    month: 'Jun 2026',
    tag:   'Owners Meet',
    title: 'Sunday Coffee Ride — Ahmedabad',
    meta:  'Sindhu Bhavan · 07:00 start',
    desc:  '60 km loop ride through Sanand for current CSR 762 owners. Breakfast on us.',
    cta:   { text: 'RSVP', href: '#', variant: 'secondary' },
  },
  {
    cat:   'testride',
    img:   '/images/hero/Ground-Clearance.webp',
    day:   '29',
    month: 'Jun 2026',
    tag:   'Test Ride Camp',
    title: 'Test Days — Pune',
    meta:  'Aundh · 10:00 – 18:00',
    desc:  'Test rides, EMI quotes on the spot, and exchange estimates for any old bike.',
    cta:   { text: 'Reserve a Slot', href: '/offers/book-test-ride', variant: 'primary' },
  },
]

export default function EventList({ items = EVENTS, filters = FILTERS }) {
  const [active, setActive] = useState('all')

  const visible = useMemo(
    () => (active === 'all' ? items : items.filter((e) => e.cat === active)),
    [items, active],
  )

  return (
    <section id="ev-main">
      <div className="container">
        <div className="ev-tabs">
          {filters.map((f) => (
            <button
              key={f.id}
              type="button"
              className={'filter-pill' + (active === f.id ? ' is-active' : '')}
              onClick={() => setActive(f.id)}
            >
              {f.label}
            </button>
          ))}
        </div>

        <div className="ev-grid">
          {visible.map((e) => (
            <div key={e.title} className="card-base ev-card" data-cat={e.cat}>
              <div className="ev-media">
                {e.img && <img src={e.img} alt={e.title} loading="lazy" />}
                <div className="ev-date">
                  <strong>{e.day}</strong>
                  <span>{e.month}</span>
                </div>
              </div>
              <div className="ev-body">
                <span className="ev-tag">{e.tag}</span>
                <h3>{e.title}</h3>
                <p className="ev-meta">
                  <i className="bi bi-geo-alt"></i> {e.meta}
                </p>
                <p>{e.desc}</p>
                {e.cta && (
                  e.cta.href.startsWith('/') ? (
                    <Link
                      to={e.cta.href}
                      className={`btn-csr ${e.cta.variant} sm`}
                      style={{ marginTop: 10 }}
                    >
                      {e.cta.text}
                    </Link>
                  ) : (
                    <a
                      href={e.cta.href}
                      className={`btn-csr ${e.cta.variant} sm`}
                      style={{ marginTop: 10 }}
                    >
                      {e.cta.text}
                    </a>
                  )
                )}
              </div>
            </div>
          ))}
        </div>

        <div style={{ textAlign: 'center', marginTop: 40 }}>
          <p>
            Hosting an EV event?{' '}
            <Link className="accent" to="/company/contact">Invite us</Link>
            {' · '}
            Subscribe to event alerts in your{' '}
            <Link className="accent" to="/account/notifications">notification settings</Link>.
          </p>
        </div>
      </div>
    </section>
  )
}
