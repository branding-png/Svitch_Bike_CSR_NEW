import { useMemo, useState } from 'react'
import { DEALERS, STATES } from '@/data/dealers'
import { useBookNow } from '@/contexts/BookNowContext'

// Dealer locator — mirrors CSR_New_web `#dealer-finder`.
// Left: search + state filter + result list.
// Right: detail panel that swaps between empty-state and the selected dealer.
const STATUS_LABEL = {
  open:   { cls: 'open',   icon: 'bi-check-circle-fill', text: 'Open Now'  },
  closed: { cls: 'closed', icon: 'bi-x-circle-fill',     text: 'Closed'    },
}

// Fallback showroom thumb used when a dealer entry doesn't provide its own.
const DEFAULT_PHOTO = '/images/product/csr-762-black.webp'

// Prefer the explicit `mapUrl` from data; fall back to a search query.
function mapsLink(d) {
  if (d.mapUrl) return d.mapUrl
  const q = encodeURIComponent(`${d.name}, ${d.address}, ${d.pincode}`)
  return `https://maps.google.com/?q=${q}`
}
// Derive an embed URL from the chosen mapsLink by appending output=embed.
function mapsEmbed(d) {
  const url = mapsLink(d)
  return url.includes('?') ? `${url}&output=embed` : `${url}?output=embed`
}

export default function DealerFinder({ dealers = DEALERS }) {
  const [q, setQ]       = useState('')
  const [state, setState] = useState('')
  const [pickedId, setPickedId] = useState(null)
  const { open: openBookNow } = useBookNow()

  const list = useMemo(() => {
    const needle = q.trim().toLowerCase()
    return dealers.filter((d) => {
      if (state && d.state !== state) return false
      if (!needle) return true
      return (
        d.name.toLowerCase().includes(needle)    ||
        d.city.toLowerCase().includes(needle)    ||
        d.pincode.includes(needle)               ||
        d.state.toLowerCase().includes(needle)
      )
    })
  }, [dealers, q, state])

  const picked = pickedId ? dealers.find((d) => d.id === pickedId) : null

  const resetAll = () => { setQ(''); setState(''); setPickedId(null) }

  return (
    <section id="dealer-finder">
      <div className="container">
        <div className="section-header">
          <span className="section-label rajdhani-lbl-text-sm">Locator</span>
          <h2 className="section-title">
            Your Nearest <span className="accent">Svitch Store</span>
          </h2>
          <p className="section-desc">
            Search by city, pincode, or dealer name. Filter by state. Click any
            dealer to see full details, hours, and directions.
          </p>
        </div>

        <div className="finder-wrap">
          {/* LEFT */}
          <aside className="rajdhani-lbl-text-sm finder-sidebar">
            <div className="finder-filters">
              <div className="finder-search">
                <i className="bi bi-search"></i>
                <input
                  type="text"
                  id="dealerSearch"
                  placeholder="City, pincode or dealer name..."
                  autoComplete="off"
                  value={q}
                  onChange={(e) => setQ(e.target.value)}
                  aria-label="Search dealers by city, pincode or name"
                />
              </div>
              <div className="finder-state">
                <select
                  id="stateFilter"
                  aria-label="Filter by state"
                  value={state}
                  onChange={(e) => setState(e.target.value)}
                >
                  <option value="">All States</option>
                  {STATES.map((s) => <option key={s} value={s}>{s}</option>)}
                </select>
              </div>
            </div>

            <div className="finder-meta">
              <span className="rajdhani-lbl-text-sm">
                Showing {list.length} of {dealers.length} dealers
              </span>
              <button
                type="button"
                className="finder-reset rajdhani-lbl-text-sm"
                onClick={resetAll}
              >
                <i className="bi bi-arrow-counterclockwise"></i> Reset
              </button>
            </div>

            <div className="dealer-results">
              {list.map((d) => {
                const st = STATUS_LABEL[d.status]
                const hasTestRide = d.services.includes('Test Ride')
                return (
                  <button
                    type="button"
                    key={d.id}
                    data-id={d.id}
                    className={`card-base dealer-item${pickedId === d.id ? ' is-active' : ''}`}
                    onClick={() => setPickedId(d.id)}
                  >
                    {/* Left-side showroom thumb — clicking it opens Google Maps
                        in a new tab. stopPropagation so the card's own
                        selection click doesn't also fire. <span> + role="link"
                        because nesting an <a> inside a <button> is invalid. */}
                    <span
                      className="dealer-item-thumb"
                      role="link"
                      tabIndex={0}
                      aria-label={`Open ${d.name} on Google Maps`}
                      onClick={(e) => {
                        e.stopPropagation()
                        window.open(mapsLink(d), '_blank', 'noopener,noreferrer')
                      }}
                      onKeyDown={(e) => {
                        if (e.key === 'Enter' || e.key === ' ') {
                          e.preventDefault()
                          e.stopPropagation()
                          window.open(mapsLink(d), '_blank', 'noopener,noreferrer')
                        }
                      }}
                    >
                      <img
                        src={d.photo || DEFAULT_PHOTO}
                        alt={`${d.name} showroom`}
                        loading="lazy"
                        decoding="async"
                      />
                      <span className="dealer-item-thumb-overlay" aria-hidden="true">
                        <i className="bi bi-geo-alt-fill"></i>
                      </span>
                    </span>

                    <div className="dealer-item-content">
                    <div className="dealer-item-head">
                      <div className="dealer-item-title">
                        <span className="dealer-city-tag">{d.state}</span>
                        <h3>{d.name}</h3>
                      </div>
                      <span className={`dealer-status ${st.cls} rajdhani-lbl-text-sm`}>
                        <i className={`bi ${st.icon}`}></i> {st.text}
                      </span>
                    </div>

                    <p className="dealer-item-addr">
                      <i className="bi bi-geo-alt"></i>
                      {' '}{d.city} · {d.address} · {d.pincode}
                    </p>

                    <div className="dealer-item-chips">
                      {hasTestRide && (
                        <span className="dealer-chip chip-accent rajdhani-lbl-text-sm">
                          <i className="bi bi-lightning-charge-fill"></i> Test Ride
                        </span>
                      )}
                      <span className="dealer-chip rajdhani-lbl-text-sm">
                        <i className="bi bi-telephone"></i> {d.phone}
                      </span>
                    </div>

                    <span className="dealer-item-view rajdhani-lbl-text-sm">
                      View Details <i className="bi bi-arrow-right"></i>
                    </span>
                    </div>
                  </button>
                )
              })}

              {list.length === 0 && (
                <div className="dealer-empty">
                  <i className="bi bi-search"></i>
                  <h4>No dealers match</h4>
                  <p>Try a different city, pincode, or reset the filters.</p>
                </div>
              )}
            </div>
          </aside>

          {/* RIGHT */}
          <div className="finder-detail card-base">
            {!picked ? (
              <div className="detail-empty">
                <div className="detail-empty-icon">
                  <i className="bi bi-geo-alt-fill"></i>
                </div>
                <h3>Pick A Dealer</h3>
                <p>
                  Select any dealer from the list on the left to see full
                  details — address, phone, opening hours, services offered,
                  and directions.
                </p>
                <div className="detail-hint rajdhani-lbl-text-sm">
                  <i className="bi bi-info-circle"></i>
                  <span>Tip: use the search or state filter to narrow down.</span>
                </div>
              </div>
            ) : (
              <div className="detail-body">
                <div className="detail-header">
                  <div className="detail-header-top">
                    <span className="detail-city">{picked.city}</span>
                    <span className="detail-status">
                      <span className={`dealer-status ${STATUS_LABEL[picked.status].cls} rajdhani-lbl-text-sm`}>
                        <i className="bi bi-circle-fill"></i>{' '}
                        {STATUS_LABEL[picked.status].text}
                      </span>
                    </span>
                  </div>
                  <h3 className="detail-name">{picked.name}</h3>
                  <p className="detail-addr">{picked.address}</p>
                </div>

                <figure className="detail-photo">
                  <img
                    src={picked.photo || DEFAULT_PHOTO}
                    alt={`${picked.name} showroom`}
                    loading="lazy"
                    decoding="async"
                  />
                </figure>

                <div className="detail-map">
                  <iframe
                    title="Dealer location on Google Maps"
                    src={mapsEmbed(picked)}
                    width="100%"
                    height="100%"
                    style={{ border: 0 }}
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                  />
                  <a
                    href={mapsLink(picked)}
                    target="_blank"
                    rel="noreferrer"
                    className="detail-map-expand"
                    aria-label="Open in Google Maps"
                  >
                    <i className="bi bi-arrows-fullscreen"></i>
                  </a>
                </div>

                <div className="detail-badges">
                  {picked.services.map((s) => (
                    <span key={s} className="dealer-status rajdhani-lbl-text-sm">{s}</span>
                  ))}
                </div>

                <div className="detail-info-grid">
                  <div className="detail-info">
                    <span className="detail-info-label rajdhani-lbl-text-sm">
                      <i className="bi bi-telephone"></i> Phone
                    </span>
                    <a className="detail-info-val" href={`tel:${picked.phone.replace(/\s/g, '')}`}>
                      {picked.phone}
                    </a>
                  </div>
                  <div className="detail-info">
                    <span className="detail-info-label rajdhani-lbl-text-sm">
                      <i className="bi bi-envelope"></i> Email
                    </span>
                    <a className="detail-info-val" href={`mailto:${picked.email}`}>
                      {picked.email}
                    </a>
                  </div>
                  <div className="detail-info">
                    <span className="detail-info-label rajdhani-lbl-text-sm">
                      <i className="bi bi-clock"></i> Hours
                    </span>
                    <span className="detail-info-val">{picked.hours}</span>
                  </div>
                  <div className="detail-info">
                    <span className="detail-info-label rajdhani-lbl-text-sm">
                      <i className="bi bi-pin-map"></i> Pincode
                    </span>
                    <span className="detail-info-val">{picked.pincode}</span>
                  </div>
                </div>

                <div className="detail-services">
                  <h4>Services Offered</h4>
                  <ul>
                    {picked.services.map((s) => (
                      <li key={s}><i className="bi bi-check2"></i> {s}</li>
                    ))}
                  </ul>
                </div>

                <div className="detail-actions">
                  <a
                    href={mapsLink(picked)}
                    target="_blank"
                    rel="noreferrer"
                    className="btn-csr primary"
                  >
                    <i className="bi bi-geo-alt-fill"></i> Get Directions
                  </a>
                  <button
                    type="button"
                    className="btn-csr secondary"
                    onClick={() => openBookNow()}
                  >
                    <i className="bi bi-calendar-check"></i> Book Test Ride
                  </button>
                  <a href={`tel:${picked.phone.replace(/\s/g, '')}`} className="btn-csr ghost">
                    <i className="bi bi-telephone-fill"></i> Call Now
                  </a>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}
