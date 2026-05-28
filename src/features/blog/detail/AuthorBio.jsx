// Author bio card — mirrors CSR_New_web `.author-bio`.
// Sits below the article in the content column. Avatar initials are derived
// from the author name so any byline renders consistently.
function initials(name = '') {
  return name.split(/\s+/).filter(Boolean).slice(0, 2).map((w) => w[0]).join('').toUpperCase()
}

export default function AuthorBio({
  name  = 'Svitch Editorial Team',
  role  = 'Svitch Bikes — Official Blog',
  email = 'media@svitch.bike',
  bio = (
    <>
      The Svitch Editorial Team covers product launches, rider stories, e-bike
      tips, and the latest from India's fastest-growing electric bicycle brand.
      For press enquiries, contact{' '}
    </>
  ),
}) {
  return (
    <div aria-label="AuthorBio" role="region" className="card-base author-bio">
      <span className="author-avatar rajdhani-lbl-text-sm">{initials(name)}</span>
      <div className="author-bio-body">
        <h4>{name}</h4>
        <span className="author-role rajdhani-lbl-text-sm">{role}</span>
        <p>
          {bio}
          {email && (
            <a
              className="rajdhani-lbl-text-sm"
              href={`mailto:${email}`}
              style={{ color: 'var(--accent)', textDecoration: 'underline' }}
            >
              {email}
            </a>
          )}
          .
        </p>
      </div>
    </div>
  )
}
