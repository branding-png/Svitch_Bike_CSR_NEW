import { EMAILS, PHONES, emailHref, phoneHref } from '@/data/contact-info'

// Press Releases + Media Kit two-column section — mirrors CSR_New_web
// `#press-releases`. Left column lists official releases (PDF links); right
// column is the brand-assets list + press-contact card.
const RELEASES = [
  { title: 'Svitch Motocorp announces Series B funding round — ₹480 Cr',     date: 'November 2024',  href: '#' },
  { title: 'CSR 762 launched at ₹1,34,999 with 110 km/h top speed',          date: 'September 2024', href: '#' },
  { title: 'Svitch reaches 50,000 rider milestone',                          date: 'August 2024',    href: '#' },
  { title: 'Svitch Connect App 2.0 launched with OTA update support',       date: 'June 2024',      href: '#' },
  { title: 'Svitch opens 100th service centre in tier-2 cities',            date: 'April 2024',     href: '#' },
  { title: 'Svitch Motocorp receives FAME II certification for all variants', date: 'January 2024', href: '#' },
]

const MEDIA_ASSETS = [
  { icon: 'bi-image',         title: 'CSR 762 Logo Pack',     meta: 'SVG, PNG · Light & Dark variants', href: '/press/csr-762-press-kit.zip' },
  { icon: 'bi-bicycle',       title: 'Product Photography',   meta: 'High-res · All colours · ZIP',      href: '/press/csr-762-press-kit.zip' },
  { icon: 'bi-file-text',     title: 'Brand Guidelines',      meta: 'PDF · Fonts, colours, usage rules', href: '/press/csr-762-press-kit.zip' },
  { icon: 'bi-people-fill',   title: 'Team Photos',           meta: 'Founder portraits · Hi-res',        href: '/press/csr-762-press-kit.zip' },
]

export default function PressReleases({
  releases = RELEASES,
  assets   = MEDIA_ASSETS,
}) {
  return (
    <section id="press-releases">
      <div className="container">
        <div className="releases-layout">
          {/* LEFT — official releases */}
          <div className="releases-col">
            <span className="section-label">Press Releases</span>
            <h2 className="section-title">Official <span className="accent">Releases</span></h2>
            <div className="release-list">
              {releases.map((r) => (
                <div key={r.title} className="release-row">
                  <div>
                    <div className="release-title">{r.title}</div>
                    <div className="release-date rajdhani-lbl-text-sm">{r.date}</div>
                  </div>
                  <a href={r.href} className="release-dl">
                    PDF <i className="bi bi-file-earmark-pdf"></i>
                  </a>
                </div>
              ))}
            </div>
          </div>

          {/* RIGHT — media kit assets + press contact */}
          <div className="media-col">
            <span className="section-label">Brand Assets</span>
            <h2 className="section-title">Media <span className="accent">Kit</span></h2>
            <p className="media-desc">
              All logos, product images, and brand guidelines available for press
              and editorial use.
            </p>

            <div className="media-list">
              {assets.map((a) => (
                <div key={a.title} className="media-item">
                  <div className="media-item-info">
                    <span className="media-item-icon">
                      <i className={`bi ${a.icon}`}></i>
                    </span>
                    <div>
                      <div className="media-item-title">{a.title}</div>
                      <div className="media-item-meta rajdhani-lbl-text-sm">{a.meta}</div>
                    </div>
                  </div>
                  <a href={a.href} className="media-item-dl">
                    Download <i className="bi bi-download"></i>
                  </a>
                </div>
              ))}
            </div>

            <div className="card-base press-contact-card">
              <h3>Press Contact</h3>
              <div className="press-contact-name">
                Head of Communications — Svitch Motocorp
              </div>
              <div className="press-contact-row">
                <a href={emailHref('press')}>{EMAILS.press.address}</a>
                <a href={phoneHref('headOffice')}>{PHONES.headOffice.phone}</a>
              </div>
              <div className="press-contact-meta rajdhani-lbl-text-sm" style={{ marginTop: 10 }}>
                Response within 4 business hours
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
