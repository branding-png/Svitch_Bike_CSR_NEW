import { Link } from 'react-router-dom'

// Full-bleed video banner with overlay text — mirrors the two `.video-banner`
// sections in CSR_New_web/index.html. Video uses `data-src` so the global
// `useVideoBanner` hook lazy-loads and plays it when scrolled into view.
//
// Usage:
//   <VideoBanner
//     id="video-banner"
//     align="left"
//     video="/images/video/product-ride-video-mp4.mp4"
//     poster="/images/video/hero-product-ride-media-1.webp"
//     tag="CSR 762"
//     titleStart="Every Hero"
//     titleEnd="Needs a"
//     titleAccent="Svitch."
//     desc="6.5 kW peak power..."
//     specs={[{ value: '6.5 kW', label: 'Peak Power' }, ...]}
//     ctas={[
//       { to: PATHS.shop, label: 'Book Now', icon: 'cart-check', variant: 'primary' },
//       { to: PATHS.specifications, label: 'Full Specs', icon: 'file-text', variant: 'secondary' },
//     ]}
//   />
export default function VideoBanner({
  id,
  align = 'left',          // 'left' | 'right'
  video,
  poster,
  tag,
  tagIcon,                  // optional bootstrap-icon class (without `bi-`)
  titleStart,               // first chunk of the headline
  titleEnd,                  // optional middle text (before the accent span)
  titleAccent,               // highlighted span
  multiline = false,         // if true, inserts a <br/> between titleStart and titleAccent
  desc,
  specs = [],                // [{ value, label }]
  ctas = [],                 // [{ to, label, icon, variant }]
  reveal = true,
}) {
  return (
    <section id={id} className="video-banner" aria-label="VideoBanner">
      <video
        className="vb-video"
        muted
        loop
        playsInline
        preload="none"
        poster={poster}
      >
        {/* data-src — useVideoBanner promotes to src + plays when in view */}
        <source data-src={video} type="video/mp4" />
      </video>

      <div className={`vb-overlay vb-overlay--${align}`}></div>

      <div className={`vb-content vb-content--${align}${reveal ? ' reveal' : ''}`}>
        {tag && (
          <span className="vb-tag">
            {tag}
            {tagIcon && <i className={`bi bi-${tagIcon}`} style={{ marginLeft: 6 }}></i>}
          </span>
        )}

        <h2 className="vb-title">
          {titleStart}{' '}
          {multiline && <br />}
          {titleEnd && <>{titleEnd} </>}
          {titleAccent && <span className="highlight">{titleAccent}</span>}
        </h2>

        {desc && <p className="vb-desc">{desc}</p>}

        {specs.length > 0 && (
          <div className="vb-specs">
            {specs.map((s, i) => (
              <div key={s.label || i} className="vb-spec">
                <h3>{s.value}</h3>
                <p>{s.label}</p>
              </div>
            ))}
          </div>
        )}

        {ctas.length > 0 && (
          <div className="vb-cta">
            {ctas.map((c, i) => (
              <Link
                key={c.to || i}
                to={c.to}
                className={`btn-csr ${c.variant || 'primary'}`}
              >
                {c.icon && <i className={`bi bi-${c.icon}`}></i>} {c.label}
              </Link>
            ))}
          </div>
        )}
      </div>
    </section>
  )
}
