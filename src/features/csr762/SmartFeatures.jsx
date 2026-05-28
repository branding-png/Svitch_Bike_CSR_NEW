// CSR 762 — "Smart Features" tile grid. Mirrors svitch.bike `#smart-features`.
// 9 small tiles in a 3-col grid with shared 1px borders forming a continuous
// grid look. Styles live in src/styles/pages/csr762.css (.features-grid,
// .feature-item, .feature-icon, .feature-name, .feature-desc).
const SMART_FEATURES = [
  {
    icon: 'bi-display',
    name: 'Smart Dashboard',
    desc: '7" TFT color display. Speed, range, battery, navigation, calls.',
  },
  {
    icon: 'bi-phone',
    name: 'e-SIM Connectivity',
    desc: 'Experience seamless connectivity with built-in eSIM technology.',
  },
  {
    icon: 'bi-map',
    name: 'Navigation',
    desc: 'Built-in turn-by-turn navigation via Google Maps integration.',
  },
  {
    icon: 'bi-wifi',
    name: 'Wifi Connectivity',
    desc: 'Built-in WiFi for seamless OTA updates, cloud sync and app pairing without mobile data.',
  },
  {
    icon: 'bi-cloud-arrow-down',
    name: 'OTA Updates',
    desc: 'Over-the-air firmware updates. Your bike gets better with time.',
  },
  {
    icon: 'bi-layout-text-window',
    name: 'Display UI',
    desc: 'Customisable dashboards, dark / light modes, widget layouts.',
  },
  {
    icon: 'bi-geo-alt',
    name: 'Live GPS (Upcoming)',
    desc: 'Real-time location tracking, ride history, geofencing alerts.',
  },
  {
    icon: 'bi-speedometer2',
    name: 'Ride Mode',
    desc: '6 modes (4 riding + 2 assist). One machine.',
  },
  {
    icon: 'bi-bluetooth',
    name: 'Bluetooth',
    desc: 'Connect headsets, speakers, and your smartphone seamlessly.',
  },
]

export default function SmartFeatures({
  label      = 'Tech Appeal',
  titleStart = 'Smart',
  titleEnd   = 'Features',
  features   = SMART_FEATURES,
}) {
  return (
    <section aria-label="SmartFeatures" id="smart-features">
      <div className="container">
        <div className="sf-heading reveal">
          <span className="section-label">{label}</span>
          <h2 className="section-title display">
            {titleStart}<br />{titleEnd}
          </h2>
        </div>

        <div className="features-grid reveal">
          {features.map((f) => (
            <div key={f.name} className="feature-item">
              <div className="feature-icon">
                <i className={`bi ${f.icon}`} aria-hidden="true" />
              </div>
              <div>
                <h3 className="feature-name">{f.name}</h3>
                <p className="feature-desc">{f.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
