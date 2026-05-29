import { Link } from 'react-router-dom'

// Split-feature section — video + text side-by-side. Mirrors CSR_New_web
// `.split-section`. Pass `reverse` to flip the layout (text-left, image-right).
// Video uses `data-src` so the global `useVideoBanner` hook lazy-loads it.
//
// Usage:
//   <SplitFeature
//     label="Power Source"
//     titleStart="Dual Swappable"
//     titleAccent="Battery"
//     desc="3.6 kWh Li-NMC..."
//     video="/images/video/battery-anim.mp4"
//     poster="/images/features/BATTERY-HOW.webp"
//     stats={[{ value: '5.5 hr', label: 'Full Charge' }, ...]}
//     cta={{ to: PATHS.specifications, label: 'Full Specs', icon: 'file-text' }}
//   />
//
//   <SplitFeature reverse {...} />
export default function SplitFeature({
  label,
  titleStart,
  titleAccent,
  desc,
  video,
  poster,
  stats = [],
  cta,                    // { to, label, icon, variant?, href? }
  reverse = false,
}) {
  return (
    <section className="split-section" aria-label="SplitFeature">
      <div className="container">
        <div className={`split-feature${reverse ? ' split-feature--reverse' : ''} reveal`}>
          <div className="split-media">
            <video muted loop playsInline preload="none" poster={poster}>
              {/* data-src — useVideoBanner promotes to src + plays on scroll */}
              <source data-src={video} type="video/mp4" />
            </video>
          </div>
          <div className="split-text">
            {label && <span className="section-label">{label}</span>}
            <h2>
              {titleStart}
              {titleAccent && (
                <>
                  <br />
                  <span className="accent">{titleAccent}</span>
                </>
              )}
            </h2>
            {desc && <p>{desc}</p>}

            {stats.length > 0 && (
              <div className="split-stats">
                {stats.map((s, i) => (
                  <div key={s.label || i} className="split-stat">
                    <h3>{s.value}</h3>
                    <p className="rajdhani-lbl-text-sm">{s.label}</p>
                  </div>
                ))}
              </div>
            )}

            {cta && (
              cta.href ? (
                <a
                  href={cta.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`btn-csr ${cta.variant || 'secondary'}`}
                >
                  {cta.icon && <i className={`bi bi-${cta.icon}`}></i>} {cta.label}
                </a>
              ) : (
                <Link to={cta.to} className={`btn-csr ${cta.variant || 'secondary'}`}>
                  {cta.icon && <i className={`bi bi-${cta.icon}`}></i>} {cta.label}
                </Link>
              )
            )}
          </div>
        </div>
      </div>
    </section>
  )
}
