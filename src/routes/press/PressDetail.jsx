import { Link, useParams } from 'react-router-dom'
import PageHero from '@/layouts/PageHero'
import PressArticleBody from '@/features/press/detail/PressArticleBody'
import { getPressBySlug } from '@/data/press'
import { PATHS } from '@/utils/routes'
import '@/styles/pages/press.css'

export default function PressDetail() {
  const { slug } = useParams()
  const article  = getPressBySlug(slug)

  if (!article) {
    return (
      <section className="section-pad">
        <div className="container">
          <h1 className="section-title">Article not found</h1>
          <Link to={PATHS.press} className="btn-csr primary">
            Back to Press
          </Link>
        </div>
      </section>
    )
  }

  return (
    <>
      <PageHero
        id="press-detail-hero"
        className="grad-tc"
        label={
          <span className="press-detail-label">
            {article.logo && (
              <span className="press-detail-outlet-logo" aria-label={article.outlet}>
                <img src={article.logo} alt={article.outlet} loading="lazy" decoding="async" />
              </span>
            )}
            <span>Press Release · {article.dateLong}</span>
          </span>
        }
        titleStart={article.title}
        titleHighlight={article.titleAccent}
        titleEnd={article.titleEnd}
        description={article.description}
      >
        <Link
          to={PATHS.press}
          className="rajdhani-lbl-text-sm mt-3"
          style={{
            color: 'var(--gray-300)',
            display: 'inline-flex',
            alignItems: 'center',
            gap: 6,
            marginBottom: 16,
            textDecoration: 'none',
          }}
        >
          <i className="bi bi-arrow-left"></i> All Press Releases
        </Link>

        <div
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            gap: 18,
            alignItems: 'center',
            marginTop: 24,
            color: 'var(--gray-300)',
          }}
        >
          <span><i className="bi bi-person-fill"></i> {article.author}</span>
          <span><i className="bi bi-clock"></i> {article.readTime}</span>
          <span><i className="bi bi-tag-fill"></i> {article.tags}</span>
        </div>
      </PageHero>

      <PressArticleBody
        blocks={article.body}
        image={article.image}
        imageAlt={article.alt || article.title}
      />
    </>
  )
}
