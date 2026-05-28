import SectionHeader from '@/ui/SectionHeader'

// Product lifecycle — mirrors CSR_New_web `#sus-lifecycle`.
// Index is used to render a zero-padded step number (01, 02, …).
const STEPS = [
  { icon: 'bi-sun',           title: 'Solar manufacturing', desc: 'Our Ahmedabad facility runs on 1.2 MW of rooftop solar. Every bike assembly powered by renewables since 2022.' },
  { icon: 'bi-box-seam-fill', title: 'Recycled packaging',  desc: '45% of packaging materials are currently recycled or biodegradable. Target: 100% by 2026.'                       },
  { icon: 'bi-bicycle',       title: 'Zero-emission ride',  desc: "Zero tailpipe CO₂ across the vehicle's life. Every km on CSR 762 is a km not burning petrol."                    },
  { icon: 'bi-recycle',       title: 'Battery take-back',   desc: 'Free battery collection at end-of-life. 95% of battery materials recovered and re-entered into the supply chain.' },
]

export default function Lifecycle({ items = STEPS }) {
  return (
    <section aria-label="Lifecycle" id="sus-lifecycle">
      <div className="container">
        <SectionHeader
          label="Product Lifecycle"
          titleStart="From Factory To Road To"
          titleAccent="Recycled"
          description="Every stage of a Svitch product is engineered to minimise environmental impact."
        />
        <div className="lifecycle-grid">
          {items.map((s, i) => (
            <div key={s.title} className="lifecycle-step">
              <span className="lifecycle-num">{String(i + 1).padStart(2, '0')}</span>
              <i className={`bi ${s.icon} lifecycle-icon`}></i>
              <h3>{s.title}</h3>
              <p>{s.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
