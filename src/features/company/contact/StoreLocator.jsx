import { useMemo, useState } from 'react'
import SectionHeader from '@/ui/SectionHeader'

// Store locator — mirrors CSR_New_web `#store-locator`.
// Click a dealer card to pan the embedded map to that location.
// Each dealer carries its own `mapSrc` (Google Maps embed URL).
const DEALERS = [
  {
    name:    'Ahmedabad — Flagship Store',
    status:  'open',
    statusText: 'Open',
    address: '201, Silver Square, Gurukul Road, Ahmedabad — 380052',
    phone:   '+91 79 4012 3456',
    tel:     '+917940123456',
    mapSrc:  'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d4398.245556366713!2d72.42331187590943!3d22.892186721180195!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x395e910012686eb9%3A0x9afb7365510e4a7f!2sSvitch%20Bike%20-%20Manufacturing%20Plant!5e1!3m2!1sen!2sin!4v1776673825922!5m2!1sen!2sin',
  },
  {
    name:    'Bengaluru — Experience Centre',
    status:  'open',
    statusText: 'Open',
    address: '14, Brigade Road, Bengaluru — 560001',
    phone:   '+91 80 4012 3456',
    tel:     '+918040123456',
    mapSrc:  'https://www.google.com/maps?q=Brigade+Road,+Bengaluru,+560001&output=embed',
  },
  {
    name:    'Pune — DAK Automotives',
    status:  'open',
    statusText: 'Open',
    address: 'FC Road, Shivaji Nagar, Pune — 411005',
    phone:   '+91 20 4012 3456',
    tel:     '+912040123456',
    mapSrc:  'https://www.google.com/maps?q=FC+Road,+Shivaji+Nagar,+Pune,+411005&output=embed',
  },
  {
    name:    'Mumbai — Bandra',
    status:  'open',
    statusText: 'Open',
    address: 'Linking Road, Bandra West, Mumbai — 400050',
    phone:   '+91 22 4012 3456',
    tel:     '+912240123456',
    mapSrc:  'https://www.google.com/maps?q=Linking+Road,+Bandra+West,+Mumbai,+400050&output=embed',
  },
  {
    name:    'Delhi NCR — Gurugram',
    status:  'closed',
    statusText: 'Opening Soon',
    address: 'Cyber Hub, DLF Phase 2, Gurugram — 122002',
    phone:   '+91 124 012 3456',
    tel:     '+911240123456',
    mapSrc:  'https://www.google.com/maps?q=Cyber+Hub,+DLF+Phase+2,+Gurugram,+122002&output=embed',
  },
  {
    name:    'Chennai — Anna Nagar',
    status:  'open',
    statusText: 'Open',
    address: '2nd Avenue, Anna Nagar, Chennai — 600040',
    phone:   '+91 44 4012 3456',
    tel:     '+914440123456',
    mapSrc:  'https://www.google.com/maps?q=2nd+Avenue,+Anna+Nagar,+Chennai,+600040&output=embed',
  },
]

export default function StoreLocator({ dealers = DEALERS }) {
  const [query, setQuery] = useState('')
  const [activeName, setActiveName] = useState(dealers[0]?.name)

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase()
    if (!q) return dealers
    return dealers.filter((d) =>
      d.name.toLowerCase().includes(q) || d.address.toLowerCase().includes(q),
    )
  }, [dealers, query])

  const activeDealer = dealers.find((d) => d.name === activeName) || dealers[0]

  return (
    <section id="store-locator">
      <div className="container">
        <SectionHeader
          label="Find A Dealer"
          titleStart="Store"
          titleAccent="Locator"
          description="Visit your nearest Svitch experience centre. Test ride the CSR 762, talk to our experts, and take your new ride home today."
        />

        <div className="locator-wrap">
          <div className="locator-map card-base">
            <iframe
              key={activeDealer?.name}
              src={activeDealer?.mapSrc}
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title={`Map — ${activeDealer?.name || 'Svitch Motocorp'}`}
            />
          </div>

          <div className="locator-list">
            <div className="locator-search">
              <i className="bi bi-search"></i>
              <input
                type="text"
                id="dealerSearch"
                placeholder="Search by city or pincode..."
                aria-label="Search stores by city or pincode"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
              />
            </div>

            <div className="dealer-list" id="dealerList">
              {filtered.length === 0 ? (
                <p className="rajdhani-lbl-text-sm" style={{ opacity: 0.7 }}>
                  No dealers match "{query}". Try a different city or pincode.
                </p>
              ) : (
                filtered.map((d) => {
                  const isActive = d.name === activeName
                  return (
                    <div
                      key={d.name}
                      className={'card-base dealer-card' + (isActive ? ' active' : '')}
                      onClick={() => setActiveName(d.name)}
                      role="button"
                      tabIndex={0}
                      onKeyDown={(e) => {
                        if (e.key === 'Enter' || e.key === ' ') {
                          e.preventDefault()
                          setActiveName(d.name)
                        }
                      }}
                      style={{ cursor: 'pointer' }}
                    >
                      <div className="dealer-head">
                        <h5>{d.name}</h5>
                        <span className={`dealer-status ${d.status} rajdhani-lbl-text-sm`}>
                          <i className="bi bi-circle-fill"></i> {d.statusText}
                        </span>
                      </div>
                      <p className="dealer-addr">
                        <i className="bi bi-geo-alt"></i> {d.address}
                      </p>
                      <div className="dealer-meta">
                        <a
                          className="rajdhani-lbl-text-sm"
                          href={`tel:${d.tel}`}
                          onClick={(e) => e.stopPropagation()}
                        >
                          <i className="bi bi-telephone"></i> {d.phone}
                        </a>
                        <a
                          className="rajdhani-lbl-text-sm"
                          href="#"
                          onClick={(e) => e.stopPropagation()}
                        >
                          <i className="bi bi-arrow-up-right"></i> Directions
                        </a>
                      </div>
                    </div>
                  )
                })
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
