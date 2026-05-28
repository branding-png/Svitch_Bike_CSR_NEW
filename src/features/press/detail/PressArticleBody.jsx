import { Link } from 'react-router-dom'
import { EMAILS, PHONES } from '@/data/contact-info'
import { PATHS } from '@/utils/routes'

// Press-release article body — block renderer for entries in data/press.js.
// Block types: p (with optional `lead`), h3, quote, download, contact.
export default function PressArticleBody({ blocks = [], image, imageAlt }) {
  return (
    <article className="blog-article section-pad">
      <div className="container" style={{ maxWidth: 760 }}>
        {image && (
          <figure className="press-detail-hero-img">
            <img src={image} alt={imageAlt} loading="lazy" decoding="async" />
          </figure>
        )}
        {blocks.map((b, i) => {
          switch (b.type) {
            case 'p':
              return b.lead ? (
                <p key={i} style={{ fontSize: 'var(--fs-lg)', color: 'var(--gray-200)', lineHeight: 1.7 }}>
                  {b.text}
                </p>
              ) : (
                <p key={i}>{b.text}</p>
              )

            case 'h3':
              return <h3 key={i}>{b.text}</h3>

            case 'quote':
              return (
                <blockquote
                  key={i}
                  style={{
                    borderLeft: '4px solid var(--accent)',
                    padding: '16px 24px',
                    margin: '32px 0',
                    background: 'var(--gray-950)',
                    fontStyle: 'italic',
                    color: 'var(--gray-300)',
                  }}
                >
                  “{b.text}”
                  {b.author && (
                    <>
                      <br />
                      <strong style={{ display: 'block', marginTop: 10, fontStyle: 'normal', color: 'var(--white)' }}>
                        — {b.author}
                      </strong>
                    </>
                  )}
                </blockquote>
              )

            case 'download':
              return (
                <div
                  key={i}
                  className="card-base"
                  style={{
                    padding: 24,
                    marginTop: 36,
                    display: 'flex',
                    flexWrap: 'wrap',
                    gap: 14,
                    alignItems: 'center',
                    justifyContent: 'space-between',
                  }}
                >
                  <div>
                    <strong style={{ display: 'block' }}>{b.title}</strong>
                    <span>{b.meta}</span>
                  </div>
                  <a href={b.href} className="rajdhani-lbl-text-sm btn-csr primary" download>
                    <i className="bi bi-download"></i> Download Kit
                  </a>
                </div>
              )

            case 'contact': {
              const email = EMAILS[b.emailKey]
              const phone = PHONES[b.phoneKey]
              return (
                <div aria-label="PressArticleBody" role="region" key={i} style={{ marginTop: 36 }}>
                  <h4>Media Contact</h4>
                  <p>
                    {b.name}
                    <br />
                    {email && (
                      <a className="rajdhani-lbl-text-sm" href={`mailto:${email.address}`}>
                        {email.address}
                      </a>
                    )}
                    {email && phone && ' · '}
                    {phone && <a href={`tel:${phone.tel}`}>{phone.phone}</a>}
                  </p>
                </div>
              )
            }

            default:
              return null
          }
        })}

        <Link to={PATHS.press} className="btn-csr secondary" style={{ marginTop: 32 }}>
          <i className="bi bi-arrow-left"></i> Back to All Press Releases
        </Link>
      </div>
    </article>
  )
}
