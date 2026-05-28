import SectionHeader from '@/ui/SectionHeader'

// Partners marquee — mirrors CSR_New_web `#partners`.
// Logos are rendered 2× back-to-back for the seamless CSS scroll loop.
const PARTNERS = [
  'DAK Automotives',
  'Bosch India',
  'LG Energy',
  'Qualcomm',
  'Statiq',
  'Tata Power',
  'Samsung SDI',
  'Continental',
]

export default function Partners({ items = PARTNERS }) {
  const track = [...items, ...items]
  return (
    <section aria-label="Partners" id="partners">
      <div className="container">
        <SectionHeader
          label="Ecosystem"
          titleStart="Our"
          titleAccent="Partners"
        />
      </div>
      <div className="partners-wrap">
        <div className="partners-track">
          {track.map((name, i) => (
            <div key={i} className="partner-logo"><span>{name}</span></div>
          ))}
        </div>
      </div>
    </section>
  )
}
