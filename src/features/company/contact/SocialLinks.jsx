// Social links — mirrors CSR_New_web `#social`.
const SOCIALS = [
  { key: 'instagram', icon: 'bi-instagram',  name: 'Instagram',   handle: '@csr762.official', href: 'https://www.instagram.com/csr762.official/' },
  { key: 'youtube',   icon: 'bi-youtube',    name: 'YouTube',     handle: '@csr762',          href: 'https://www.youtube.com/@csr762'           },
  { key: 'twitter',   icon: 'bi-twitter-x',  name: 'Twitter / X', handle: '@svitchmotocorp',  href: '#'                                         },
  { key: 'facebook',  icon: 'bi-facebook',   name: 'Facebook',    handle: 'Svitch Motocorp',  href: 'https://www.facebook.com/csr762.official'  },
  { key: 'linkedin',  icon: 'bi-linkedin',   name: 'LinkedIn',    handle: 'Svitch Motocorp',  href: '#'                                         },
]

export default function SocialLinks({ items = SOCIALS }) {
  return (
    <section aria-label="SocialLinks" id="social">
      <div className="container">
        <div className="social-wrap">
          <span className="section-label">Stay Connected</span>
          <h2 className="section-title">
            Follow The <span className="accent">Ride</span>
          </h2>
          <p className="section-desc">
            Join our community for daily rider stories, behind-the-scenes looks,
            launch updates, and exclusive offers.
          </p>
          <div className="social-grid">
            {items.map((s) => (
              <a
                key={s.key}
                href={s.href}
                target="_blank"
                rel="noopener"
                className={`card-base social-link social-${s.key}`}
                aria-label={s.name}
              >
                <i className={`bi ${s.icon}`}></i>
                <div className="social-meta">
                  <h6>{s.name}</h6>
                  <p>{s.handle}</p>
                </div>
                <i className="bi bi-arrow-up-right social-arrow"></i>
              </a>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
