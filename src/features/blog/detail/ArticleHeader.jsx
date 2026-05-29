// Blog detail article header + hero image — mirrors CSR_New_web `.article-header`
// and `.article-hero`. Avatar initials are derived from the author name so any
// author renders consistently.
const DEFAULT_POST = {
  catLabel:   'News & Launches',
  title:      'Svitch Launches the NXE Pro: 120 km Range, Bafang Motor & Everything You Need to Know',
  author:     'Svitch Team',
  date:       'March 28, 2026',
  readTime:   '5 min read',
  views:      '12,400 views',
  comments:   '24 comments',
  heroImage:  '/images/product/CSR-762-black-rider.webp',
  heroAlt:    'Svitch NXE Pro',
  heroCaption: 'The all-new Svitch NXE Pro — available in 5 stunning colours starting March 2026',
}

function initials(name = '') {
  return name.split(/\s+/).filter(Boolean).slice(0, 2).map((w) => w[0]).join('').toUpperCase()
}

export default function ArticleHeader({ post = DEFAULT_POST }) {
  return (
    <div aria-label="ArticleHeader">
      <div className="article-header">
        <span className="post-cat">{post.catLabel}</span>
        <h1>{post.title}</h1>
        <div className="article-meta-row rajdhani-lbl-text-sm">
          <span className="author-chip">
            <span className="author-avatar">{initials(post.author)}</span>
            <span>{post.author}</span>
          </span>
          <span><i className="bi bi-calendar-event"></i> {post.date}</span>
          <span><i className="bi bi-clock"></i> {post.readTime}</span>
          {post.views    && <span><i className="bi bi-eye-fill"></i> {post.views}</span>}
          {post.comments && <span><i className="bi bi-chat-dots-fill"></i> {post.comments}</span>}
        </div>
      </div>

      <figure className="article-hero">
        <img
          src={post.heroImage}
          alt={post.heroAlt || post.title}
          loading="lazy"
          decoding="async"
        />
        {post.heroCaption && (
          <figcaption className="article-hero-caption rajdhani-lbl-text-sm">
            {post.heroCaption}
          </figcaption>
        )}
      </figure>
    </div>
  )
}
