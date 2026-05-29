// Features tab — bulleted list with check icons. Each item: { title, description }.
const DEFAULT_FEATURES = [
  { title: 'Regenerative Braking', description: 'adds up to 8% range on city routes.' },
  { title: 'GPS Anti-Theft',       description: 'real-time location + geofencing alerts.' },
  { title: 'Keyless Unlock',       description: 'Bluetooth PIN via CSR Connect app.' },
  { title: '3 Ride Modes',         description: 'Eco, City, Sport — for every kind of commute.' },
  { title: 'Swappable Battery',    description: 'ready for future battery-swap networks.' },
  { title: 'LED Lighting',         description: 'full-LED headlamp with auto high-beam.' },
]

export default function ProductDetailFeatures({ features = DEFAULT_FEATURES }) {
  return (
    <ul aria-label="ProductDetailFeatures" className="pd-features-list">
      {features.map((f) => (
        <li key={f.title} className="pd-feature-list-item">
          <i className="bi bi-check-circle-fill pd-feature-icon" aria-hidden="true" />
          <span><strong>{f.title}</strong> &mdash; {f.description}</span>
        </li>
      ))}
    </ul>
  )
}
