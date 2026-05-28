import { Fragment, useState } from 'react'
import { useGLightbox } from '@/hooks/useGLightbox'

// CSR 762 — "Every Detail. Crafted." performance / engineering breakthroughs
// grid + Console Feature carousel. Mirrors svitch.bike `#performance`.
// Card grid reuses the .uf-* pattern; console carousel uses its own .console-*
// classes already present in csr762.css.
const IMG = '/images/features'

const PERF_CARDS = [
  {
    img:   `${IMG}/aerodynamics.webp`,
    icon:  'bi-wind',
    title: 'Aerodynamics',
    desc:  'Wind-tunnel tuned bodywork for higher speed and stability.',
  },
  {
    img:   `${IMG}/advanced-battery-BMS.webp`,
    icon:  'bi-cpu-fill',
    title: 'Advanced Battery BMS',
    desc:  'Intelligent wind channeling cools motor and battery, optimised across every ride mode.',
  },
  {
    img:   `${IMG}/thermal-protection.webp`,
    icon:  'bi-thermometer-half',
    title: 'Thermal Protection',
    desc:  'Multi-layer shielding keeps motor and battery at optimal temperature.',
  },
  {
    img:   `${IMG}/svitch-OS.webp`,
    icon:  'bi-cpu-fill',
    title: 'Svitch OS',
    desc:  'Proprietary onboard OS unifies ride modes, diagnostics, OTA updates and app connectivity — your bike, smarter with every update.',
  },
]

const CONSOLE_SLIDES = [
  {
    img: `${IMG}/smart-dashboard.webp`,
    alt: 'Smart Dashboard',
    titleLines: ['Smart', 'Dashboard'],
    body: 'A bright, glance-friendly 7" TFT cluster shows speed, battery, range and ride mode at a glance. Auto day-night brightness keeps every detail crisp from sunrise to night rides.',
  },
  {
    img: `${IMG}/Ride-modes.webp`,
    alt: 'Ride Mode',
    titleLines: ['Ride', 'Mode'],
    body: 'Switch between Eco, City and Sport on the fly to match your road. Each mode retunes throttle response, top speed and regen — so the bike always feels exactly the way you want it.',
  },
  {
    img: `${IMG}/consol-1.webp`,
    alt: 'Live GPS System',
    titleLines: ['Live GPS', 'System'],
    body: 'Built-in GPS streams live location, ride history and geo-fencing alerts to your phone. Track your bike anytime, set safe-zones, and get instant tamper notifications for full peace of mind.',
  },
  {
    img: `${IMG}/consol-2.webp`,
    alt: 'Bluetooth',
    titleLines: ['Bluetooth', 'Connect'],
    body: 'Pair with the Svitch app over Bluetooth to receive call & message alerts, turn-by-turn navigation, and OTA updates — all displayed right on the console without unlocking your phone.',
  },
]

function ConsoleFeature({ slides = CONSOLE_SLIDES }) {
  const [idx, setIdx] = useState(0)
  const total = slides.length
  const prev = () => setIdx((i) => (i - 1 + total) % total)
  const next = () => setIdx((i) => (i + 1) % total)

  return (
    <div className="console-feature reveal mt-5">
      <div className="console-display">
        <div className="console-slides">
          {slides.map((s, i) => (
            <img
              key={s.img}
              className={`console-slide${i === idx ? ' active' : ''}`}
              src={s.img}
              alt={s.alt}
              loading="lazy"
              decoding="async"
            />
          ))}
        </div>
        <div className="console-slider-arrows">
          <button
            type="button"
            className="arrow-btn"
            onClick={prev}
            aria-label="Previous console slide"
          >
            <i className="bi bi-chevron-left" />
          </button>
          <div className="console-slide-counter">
            <span>{idx + 1}</span> / <span>{total}</span>
          </div>
          <button
            type="button"
            className="arrow-btn"
            onClick={next}
            aria-label="Next console slide"
          >
            <i className="bi bi-chevron-right" />
          </button>
        </div>
      </div>

      <div className="console-content">
        <span className="section-label">Console Feature</span>
        <div className="console-content-slides">
          {slides.map((s, i) => (
            <div
              key={s.alt}
              className={`console-content-slide${i === idx ? ' active' : ''}`}
            >
              <h2 className="section-title medium mb-3">
                {s.titleLines.map((line, j) => (
                  <Fragment key={j}>
                    {line}
                    {j < s.titleLines.length - 1 && <br />}
                  </Fragment>
                ))}
              </h2>
              <p>{s.body}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default function Performance({
  label       = 'Power Story',
  titleLines  = ['Every', 'Detail.', 'Crafted.'],
  description = '19 engineering breakthroughs. One machine. From the chain-drive powertrain to the smart console, every component is engineered for one purpose — to deliver the perfect ride.',
  cards       = PERF_CARDS,
  consoleSlides = CONSOLE_SLIDES,
  gallery     = 'csr762-perf-gallery',
}) {
  // Same selector pattern as UniqueFeatures / Gallery — GLightbox handles
  // the modal, prev/next, dots, caption, ESC close, swipe nav.
  useGLightbox('#performance .uf-card.glightbox', [cards])

  return (
    <section id="performance">
      <div className="container">
        <div className="perf-intro reveal">
          <div className="perf-intro-heading">
            <span className="section-label">{label}</span>
            <h2 className="section-title display">
              {titleLines.map((line, i) => (
                <Fragment key={i}>
                  {line}
                  {i < titleLines.length - 1 && <br />}
                </Fragment>
              ))}
            </h2>
          </div>
          <div className="perf-intro-copy">
            <p className="section-title-p">{description}</p>
          </div>
        </div>

        <div className="uf-grid reveal">
          {cards.map((c, i) => (
            <a
              key={c.title}
              href={c.img}
              className={`uf-card glightbox reveal delay-${(i + 1) * 2}`}
              data-gallery={gallery}
              data-glightbox={`title: ${c.title}; description: ${c.desc}`}
              aria-label={`${c.title} — open full image`}
            >
              <div
                className="uf-img"
                style={{ backgroundImage: `url('${c.img}')` }}
              />
              <span className="uf-zoom-badge" aria-hidden="true">
                <i className="bi bi-zoom-in" />
              </span>
              <div className="uf-body">
                <i className={`bi ${c.icon} uf-icon`} aria-hidden="true" />
                <h3 className="uf-title">{c.title}</h3>
                <div className="uf-desc">{c.desc}</div>
              </div>
            </a>
          ))}
        </div>

        {/* Console feature — image carousel + synced text panels */}
        <ConsoleFeature slides={consoleSlides} />
      </div>
    </section>
  )
}
