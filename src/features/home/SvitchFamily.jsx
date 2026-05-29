// Svitch Eco System — parent brand + 2 sibling brand cards with sitemap-style
// connectors. Mirrors CSR_New_web `#svitch-family` exactly.
//
// Both brand cards link to external sites (svitchbike.com / csr762.com), so
// they stay as raw `<a target="_blank">` instead of React Router `<Link>`.
//
// Usage: <SvitchFamily />
const FAMILY_BRANDS = [
  {
    name: 'Svitch Bike',
    tag: 'Electric Bicycle',
    href: 'https://svitchbike.com/',
    domain: 'svitchbike.com',
    bg: '/images/svitchbike-com-.png',
    logo: '/images/logos/splash-Svitch-energy.png',
    logoAlt: 'Svitch',
    logoClass: '',           // no modifier → left-aligned
    bodyClass: '',           // default body alignment
    revealClass: 'reveal',
  },
  {
    name: 'CSR 762',
    tag: 'Electric Motorcycle',
    href: 'https://csr762.com/',
    domain: 'csr762.com',
    bg: '/images/csr-762-com.png',
    logo: '/images/logos/splash-CSR-762-logo.png',
    logoAlt: 'CSR 762',
    logoClass: 'is-right',
    bodyClass: 'text-end',
    revealClass: 'reveal delay-2',
  },
]

export default function SvitchFamily({
  id = 'svitch-family',
  label = 'Svitch Eco System',
  titleStart = 'Two Wheels.',
  titleAccent = 'One Future.',
  desc = 'The CSR 762 is one half of the Svitch story. Meet the sister brand of city-ready electric bicycles — same engineering obsession, different ride.',
  parentLogo = '/images/logos/Svitch-LOGO-white.png',
  brands = FAMILY_BRANDS,
}) {
  return (
    <section id={id} aria-label="SvitchFamily">
      <div className="container">
        <div className="family-head reveal">
          <span className="section-label">{label}</span>
          <h2>
            {titleStart} <span className="accent">{titleAccent}</span>
          </h2>
          <p>{desc}</p>
        </div>

        {/* Parent brand + sitemap-style connectors */}
        <div className="family-tree reveal">
          <div className="family-tree-logo">
            <img src={parentLogo} alt="Svitch — parent brand" />
          </div>
          <span className="family-tree-stem"></span>
          <span className="family-tree-branch"></span>
          <span className="family-tree-drop-l"></span>
          <span className="family-tree-drop-r"></span>
          <span className="family-tree-dot is-center"></span>
          <span className="family-tree-dot is-left"></span>
          <span className="family-tree-dot is-right"></span>
        </div>

        <div className="family-grid">
          {/* Mobile tree connectors (visible only < 767px via CSS) */}
          <span className="mt-rail" aria-hidden="true"></span>
          <span className="mt-tick mt-tick-1" aria-hidden="true"></span>
          <span className="mt-tick mt-tick-2" aria-hidden="true"></span>
          <span className="mt-dot is-top" aria-hidden="true"></span>
          <span className="mt-dot is-card1" aria-hidden="true"></span>
          <span className="mt-dot is-card2" aria-hidden="true"></span>

          {brands.map((b) => (
            <a
              key={b.domain}
              href={b.href}
              target="_blank"
              rel="noopener noreferrer"
              className={`family-card ${b.revealClass}`.trim()}
            >
              <div
                className="family-card-bg"
                style={{ backgroundImage: `url('${b.bg}')` }}
              />
              <div className="family-card-overlay"></div>
              <img
                src={b.logo}
                alt={b.logoAlt}
                className={`family-card-logo ${b.logoClass}`.trim()}
                loading="lazy"
                decoding="async"
              />
              <div className={`family-card-body ${b.bodyClass}`.trim()}>
                <span className="family-card-tag">{b.tag}</span>
                <h3>{b.name}</h3>
                <span className="family-card-link">
                  Visit {b.domain} <i className="bi bi-arrow-up-right"></i>
                </span>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  )
}
