import { useEffect, useRef, useState } from 'react'

// CSR 762 — "Numbers Don't Lie." cost-per-km comparison section.
// Mirrors svitch.bike `#cost-compare`. 2 horizontal bars (petrol vs electric)
// animate from 0 → target width when the section scrolls into view, then a
// monthly / annual savings callout below. Styles live in src/styles/pages/
// csr762.css (.cc-* / .cost-* / .savings-* classes).
const BARS = [
  {
    name: 'Petrol Bike',
    icon: 'bi-fuel-pump',
    value: '₹3.50 / km',
    label: '₹3.50/km',
    width: '100%',
    variant: '',
  },
  {
    name: 'CSR 762 Electric',
    icon: 'bi-lightning-charge',
    value: '₹0.25 / km',
    label: '₹0.25/km',
    width: '7%',
    variant: 'ev',
  },
]

export default function CostCompare({
  label       = 'Cost Comparison',
  titleStart  = 'Numbers',
  titleEnd    = "Don't Lie.",
  description = 'Every kilometre you ride on the CSR 762 costs a fraction of what petrol costs. The math is simple — the savings are extraordinary.',
  bars        = BARS,
  monthlyLabel = 'Monthly Savings',
  monthlyValue = '₹6,375',
  annualLabel  = 'Annual Savings',
  annualValue  = '₹76,500',
  footnote     = 'Based on 75 km/day average riding. Petrol @ ₹100/L, 35 km/L efficiency. CSR 762 at ₹8/kWh grid rate. Your actual savings may be even higher.',
}) {
  // Animate bar fills from 0 → target width when the section becomes visible.
  // CSS already declares `transition: width 1.5s` on `.cost-fill`, so we just
  // flip a state flag once the IntersectionObserver fires.
  const sectionRef = useRef(null)
  const [animate, setAnimate] = useState(false)

  useEffect(() => {
    const el = sectionRef.current
    if (!el || animate) return
    const io = new IntersectionObserver(
      (entries) => {
        if (entries.some((e) => e.isIntersecting)) {
          setAnimate(true)
          io.disconnect()
        }
      },
      { threshold: 0.25 },
    )
    io.observe(el)
    return () => io.disconnect()
  }, [animate])

  return (
    <section id="cost-compare" ref={sectionRef}>
      <div className="container">
        <div className="cc-intro reveal">
          <div className="cc-intro-heading">
            <span className="section-label">{label}</span>
            <h2 className="section-title display">
              {titleStart}<br />{titleEnd}
            </h2>
          </div>
          <div className="cc-intro-copy">
            <p className="section-title-p">{description}</p>
          </div>
        </div>

        <div className="cost-bar-section">
          {bars.map((b, i) => (
            <div
              key={b.name}
              className={`cost-fuel-bar reveal${i > 0 ? ` delay-${i * 3}` : ''}`}
            >
              <div className="cost-fuel-header">
                <span className="cost-fuel-name">
                  <i className={`bi ${b.icon}`} style={{ marginRight: 8 }} />
                  {b.name}
                </span>
                <span className="cost-fuel-val">{b.value}</span>
              </div>
              <div className="cost-track">
                <div
                  className={`cost-fill${b.variant ? ` ${b.variant}` : ''}`}
                  style={{ width: animate ? b.width : 0 }}
                >
                  <span className="cost-fill-label">{b.label}</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="savings-callout reveal mt-5">
          <div>
            <div className="cc-savings-label">{monthlyLabel}</div>
            <div className="savings-big">{monthlyValue}</div>
          </div>
          <div>
            <div className="cc-savings-label">{annualLabel}</div>
            <div className="savings-big">{annualValue}</div>
          </div>
          <div>
            <p className="savings-text">{footnote}</p>
          </div>
        </div>
      </div>
    </section>
  )
}
