import { useMemo, useState } from 'react'
import { Link } from 'react-router-dom'

// FAQ accordion + search + category filter — mirrors CSR_New_web `#faq-main`.
// Pure-React replacement for the Bootstrap collapse + JS filter logic.
const CATEGORIES = [
  { id: 'all',         label: 'All',                   icon: 'bi-grid-fill'             },
  { id: 'general',     label: 'General',               icon: 'bi-info-circle-fill'      },
  { id: 'battery',     label: 'Battery & Charging',    icon: 'bi-battery-charging'      },
  { id: 'performance', label: 'Performance & Range',   icon: 'bi-lightning-charge-fill' },
  { id: 'service',     label: 'Warranty & Service',    icon: 'bi-tools'                 },
  { id: 'pricing',     label: 'Pricing & Booking',     icon: 'bi-cash-coin'             },
]

const FAQS = [
  // ── GENERAL ──
  {
    cat: 'general',
    q: 'What makes the CSR 762 different from other electric motorcycles?',
    keywords: 'what makes csr 762 different other electric motorcycles',
    a: (
      <>
        The CSR 762 is built on a <strong>lion-inspired lattice space-frame chassis</strong>,
        delivering exceptional stability and a lightweight feel. It offers a{' '}
        <strong>7-inch Android console</strong>, dual swappable batteries, 6 riding modes,
        and IP68-rated weather protection — all designed specifically for Indian roads,
        rain, and long commutes.
      </>
    ),
  },
  {
    cat: 'general',
    q: 'Is the CSR 762 suitable for daily commuting?',
    keywords: 'daily commuting office work suitable commute',
    a: (
      <>
        Absolutely. With a <strong>160+ km real-world range</strong>, swappable batteries,
        and an <strong>Eco mode</strong> optimised for efficiency, the CSR 762 easily
        covers two-day commutes on a single charge for most city riders.
      </>
    ),
  },
  {
    cat: 'general',
    q: 'What documents do I need to buy a CSR 762?',
    keywords: 'documents buy purchase license registration kyc',
    a: (
      <>
        You'll need a <strong>valid two-wheeler driving licence</strong>,{' '}
        <strong>Aadhaar card</strong>, <strong>PAN card</strong>, and{' '}
        <strong>address proof</strong>. Our dealer handles RTO registration, insurance,
        and FAME II subsidy paperwork on your behalf — just sign and ride.
      </>
    ),
  },

  // ── BATTERY & CHARGING ──
  {
    cat: 'battery',
    q: 'How long does it take to fully charge the battery?',
    keywords: 'charging time full battery hours home socket',
    a: (
      <>
        A full charge from 0–100% takes <strong>5.5 hours</strong> on a standard 15A home
        socket. With the optional fast charger, you can go from 20–80% in about{' '}
        <strong>90 minutes</strong>.
      </>
    ),
  },
  {
    cat: 'battery',
    q: 'Can I use a regular home socket to charge?',
    keywords: 'home socket plug regular power 15 amp',
    a: (
      <>
        Yes. The CSR 762 ships with a <strong>standard 15A portable charger</strong> that
        plugs into any regular home or office socket. No special wiring or installation
        is required.
      </>
    ),
  },
  {
    cat: 'battery',
    q: 'What is the battery warranty?',
    keywords: 'battery warranty years coverage li-nmc',
    a: (
      <>
        The Li-NMC battery pack is covered by a{' '}
        <strong>3-year / 30,000 km warranty</strong>, whichever comes first. Extended
        warranty plans up to 5 years are available at the time of purchase.
      </>
    ),
  },
  {
    cat: 'battery',
    q: 'Is the battery swappable?',
    keywords: 'swappable battery remove portable carry office',
    a: (
      <>
        Yes. The CSR 762 features <strong>dual swappable 3.6 kWh Li-NMC battery packs</strong>.
        Remove one or both batteries, carry them to your office or apartment, and charge
        at any standard socket. Perfect for riders without dedicated parking-spot charging.
      </>
    ),
  },

  // ── PERFORMANCE & RANGE ──
  {
    cat: 'performance',
    q: 'What is the real-world range of the CSR 762?',
    keywords: 'real world range ride kilometer km single charge',
    a: (
      <>
        The CSR 762 delivers a <strong>certified IDC range of 125 km</strong> and a
        real-world range of <strong>160+ km</strong> on a single charge under mixed urban
        and highway conditions. Range varies with riding mode, rider weight, terrain, and
        traffic.
      </>
    ),
  },
  {
    cat: 'performance',
    q: 'How fast can the CSR 762 go?',
    keywords: 'top speed fast max kmph mph acceleration',
    a: (
      <>
        The CSR 762 has a <strong>top speed of 110 km/h</strong>, powered by a 6.5 kW
        peak-power PMSM motor delivering <strong>55 Nm of instant torque</strong>. 0–60 km/h
        takes just <strong>6 seconds</strong>.
      </>
    ),
  },
  {
    cat: 'performance',
    q: 'How many riding modes does it have?',
    keywords: 'riding modes eco sport range power',
    a: (
      <>
        <strong>6 driving modes</strong>: 4 riding modes (Eco, City, Sport, Range) + 2
        assist modes (Reverse, Walk). Each is tuned for different balances of power,
        range, and responsiveness.
      </>
    ),
  },

  // ── WARRANTY & SERVICE ──
  {
    cat: 'service',
    q: 'What warranty comes with the CSR 762?',
    keywords: 'warranty years vehicle battery motor frame',
    a: (
      <>
        Every CSR 762 is covered by our{' '}
        <strong>3-year / 30,000 km comprehensive warranty</strong> on the vehicle,
        battery (Li-NMC), and PMSM motor — among the most industry-leading warranties in
        India.
      </>
    ),
  },
  {
    cat: 'service',
    q: 'How does service and maintenance work?',
    keywords: 'service maintenance cost oil petrol diy',
    a: (
      <>
        EVs need drastically less maintenance than petrol bikes — no oil changes, no
        spark plugs, no clutch adjustments. Our network of{' '}
        <strong>500+ service centres</strong> nationwide provides periodic checks,
        doorstep pickup, and OTA updates that improve your bike over time.{' '}
        <Link to="/support/dealers">Find a service centre →</Link>
      </>
    ),
  },
  {
    cat: 'service',
    q: 'Where are your service centres located?',
    keywords: 'service centre location find dealer nearest city',
    a: (
      <>
        We have <strong>500+ authorised service centres</strong> across 25+ Indian
        cities, with 10 flagship experience stores in major metros. Check our{' '}
        <Link to="/support/dealers">dealer locator</Link> to find the closest one to you.
      </>
    ),
  },

  // ── PRICING & BOOKING ──
  {
    cat: 'pricing',
    q: 'What is the booking amount?',
    keywords: 'booking amount pre-order pre-booking refundable 999',
    a: (
      <>
        Reserve your CSR 762 with a fully-refundable deposit of just <strong>₹999</strong>.
        You can cancel any time before delivery for a full refund — no questions asked.
      </>
    ),
  },
  {
    cat: 'pricing',
    q: 'Do you offer EMI / financing?',
    keywords: 'emi financing loan monthly payment tenure bank',
    a: (
      <>
        Yes. We've partnered with <strong>leading banks and NBFCs</strong> to offer
        flexible EMI plans starting at just <strong>₹3,999/month</strong> with tenures up
        to 48 months. Zero-cost EMI is available on select cards.
      </>
    ),
  },
  {
    cat: 'pricing',
    q: 'Is the CSR 762 FAME II eligible?',
    keywords: 'fame subsidy government scheme incentive state',
    a: (
      <>
        Yes. The CSR 762 is <strong>FAME II eligible</strong>, and many state governments
        offer additional EV-purchase subsidies that can be stacked on top. Your dealer
        will apply all applicable incentives to your final on-road price.
      </>
    ),
  },
]

function pad2(n) {
  return String(n + 1).padStart(2, '0')
}

export default function FaqAccordion({ items = FAQS, categories = CATEGORIES }) {
  const [query, setQuery]   = useState('')
  const [cat, setCat]       = useState('all')
  const [openIdx, setOpenIdx] = useState(null)

  const counts = useMemo(() => {
    const base = { all: items.length }
    items.forEach((f) => { base[f.cat] = (base[f.cat] || 0) + 1 })
    return base
  }, [items])

  const visible = useMemo(() => {
    const q = query.trim().toLowerCase()
    return items
      .map((f, i) => ({ ...f, _origIndex: i }))
      .filter((f) => (cat === 'all' || f.cat === cat))
      .filter((f) => {
        if (!q) return true
        return (
          f.q.toLowerCase().includes(q) ||
          (f.keywords || '').toLowerCase().includes(q)
        )
      })
  }, [items, cat, query])

  function reset() {
    setQuery('')
    setCat('all')
    setOpenIdx(null)
  }

  return (
    <section id="faq-main">
      <div className="container">
        {/* Search */}
        <div className="faq-search-wrap card-base">
          <i className="bi bi-search"></i>
          <input
            type="text"
            id="faqSearch"
            placeholder="Search questions..."
            autoComplete="off"
            aria-label="Search FAQs"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
          {query && (
            <button
              type="button"
              className="faq-search-clear"
              aria-label="Clear search"
              onClick={() => setQuery('')}
            >
              <i className="bi bi-x-lg"></i>
            </button>
          )}
        </div>

        {/* Tabs */}
        <div className="faq-tabs" role="tablist">
          {categories.map((c) => (
            <button
              key={c.id}
              type="button"
              role="tab"
              className={'filter-pill' + (cat === c.id ? ' is-active' : '')}
              onClick={() => setCat(c.id)}
            >
              <i className={`bi ${c.icon}`}></i> {c.label}
              <span className="faq-tab-count">{counts[c.id] || 0}</span>
            </button>
          ))}
        </div>

        {/* Meta */}
        <div className="faq-meta">
          <span className="rajdhani-lbl-text-sm">
            Showing {visible.length} of {items.length} questions
          </span>
          <button type="button" className="faq-reset rajdhani-lbl-text-sm" onClick={reset}>
            <i className="bi bi-arrow-counterclockwise"></i> Reset
          </button>
        </div>

        {/* Accordion */}
        {visible.length > 0 ? (
          <div className="accordion faq-accordion">
            {visible.map((f) => {
              const isOpen = openIdx === f._origIndex
              return (
                <div aria-label="FaqAccordion" key={f._origIndex} className="accordion-item faq-item" data-cat={f.cat}>
                  <h3 className="accordion-header">
                    <button
                      type="button"
                      className={'accordion-button faq-btn' + (isOpen ? '' : ' collapsed')}
                      aria-expanded={isOpen}
                      onClick={() => setOpenIdx(isOpen ? null : f._origIndex)}
                    >
                      <span className="faq-num">{pad2(f._origIndex)}</span>
                      {f.q}
                    </button>
                  </h3>
                  <div className={'accordion-collapse collapse' + (isOpen ? ' show' : '')}>
                    <div className="accordion-body faq-body">{f.a}</div>
                  </div>
                </div>
              )
            })}
          </div>
        ) : (
          <div className="faq-empty">
            <div className="faq-empty-icon"><i className="bi bi-search"></i></div>
            <h3>No questions match</h3>
            <p>Try a different keyword, pick another category, or reset the filters.</p>
            <button type="button" className="btn-csr secondary" onClick={reset}>
              <i className="bi bi-arrow-counterclockwise"></i> Reset Filters
            </button>
          </div>
        )}
      </div>
    </section>
  )
}
