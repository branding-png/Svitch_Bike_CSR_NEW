import SectionHeader from '@/ui/SectionHeader'

// Sustainability "Three Pillars" — mirrors CSR_New_web `#sus-pillars`.
const PILLARS = [
  {
    icon:  'bi-bicycle',
    title: 'Zero-emission vehicles',
    desc:  "Every CSR 762 produces zero tailpipe emissions. Even accounting for India's grid, a CSR emits 70% less CO₂ per km than an equivalent petrol two-wheeler — and improves every year as the grid gets cleaner.",
  },
  {
    icon:  'bi-building-fill',
    title: 'Clean manufacturing',
    desc:  "Our Ahmedabad plant runs entirely on renewable energy. We've eliminated single-use plastics from our supply chain, implemented closed-loop water recycling, and send zero manufacturing waste to landfill.",
  },
  {
    icon:  'bi-recycle',
    title: 'End-of-life responsibility',
    desc:  'Every CSR 762 battery is covered by our take-back programme. We partner with certified recyclers to reclaim lithium, cobalt, nickel, and manganese — keeping them out of landfill and back in the supply chain.',
  },
]

export default function Pillars({ items = PILLARS }) {
  return (
    <section aria-label="Pillars" id="sus-pillars">
      <div className="container">
        <SectionHeader
          label="Our Approach"
          titleStart="Three Pillars of"
          titleAccent="Impact"
          description="From the vehicles we build to the batteries we take back — sustainability runs through every part of Svitch."
        />
        <div className="pillars-grid">
          {items.map((p) => (
            <div key={p.title} className="card-base pillar-card">
              <div className="card-base-icon"><i className={`bi ${p.icon}`}></i></div>
              <h3 className="card-base-title">{p.title}</h3>
              <p className="card-base-desc">{p.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
