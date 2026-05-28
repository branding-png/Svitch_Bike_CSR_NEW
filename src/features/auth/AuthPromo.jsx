// Left-side promo panel on auth pages — mirrors CSR_New_web `.auth-promo`.
// Driven by a `BENEFITS` array; headline + footer are also overridable.
const BENEFITS = [
  { icon: 'bi-truck',         title: 'Track Orders',        text: 'real-time delivery updates for your bike.'    },
  { icon: 'bi-heart-fill',    title: 'Wishlist',            text: 'save favorites and come back any time.'        },
  { icon: 'bi-shield-check',  title: 'Warranty',            text: "register and manage your bike's warranty online." },
  { icon: 'bi-tag-fill',      title: 'Members-only Offers', text: 'exclusive discounts on accessories.'           },
]

export default function AuthPromo({
  brand        = 'Svitch Motocorp',
  titleStart   = 'Ride Into Your ',
  titleAccent  = 'Account',
  benefits     = BENEFITS,
  footer       = '© 2026 Svitch Motocorp · Ahmedabad, India',
}) {
  return (
    <aside className="auth-promo">
      <span className="auth-promo-brand">{brand}</span>

      <div>
        <h1>
          {titleStart}<span className="highlight">{titleAccent}</span>
        </h1>
        <ul>
          {benefits.map((b) => (
            <li key={b.title}>
              <i className={`bi ${b.icon}`}></i>
              <span>
                <strong>{b.title}</strong> — {b.text}
              </span>
            </li>
          ))}
        </ul>
      </div>

      <p className="auth-promo-footer rajdhani-lbl-text-sm">{footer}</p>
    </aside>
  )
}
