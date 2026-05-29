import { Link } from 'react-router-dom'
import { getFeaturedPost } from '@/data/blog'

// Blog "Featured" post card â€” mirrors CSR_New_web `.featured-post`.
// Pulls the flagged-featured post from @/data/blog so the same record
// powers the detail page when clicked.
export default function FeaturedPost({ post = getFeaturedPost() }) {
  if (!post) return null
  return (
    <Link aria-label="FeaturedPost"
      to={`/blog/${post.slug}`}
      className="p-0 card-base featured-post"
      data-cat={post.cat}
    >
      <div className="featured-post-media">
        <img src={post.image} alt={post.alt || post.title} loading="lazy" decoding="async" />
      </div>
      <div className="featured-post-body">
        <span className="post-cat">{post.catLabel}</span>
        <h2>{post.title}</h2>
        <div className="post-meta rajdhani-lbl-text-sm">
          <span><i className="bi bi-calendar-event"></i> {post.longDate || post.date}</span>
          <span><i className="bi bi-person-fill"></i> {post.author || 'Svitch Team'}</span>
          <span><i className="bi bi-clock"></i> {post.readTime}{!String(post.readTime).includes('min') && ' min read'}</span>
        </div>
        <p>{post.excerpt}</p>
        <span className="read-more">Read More <i className="bi bi-arrow-right"></i></span>
      </div>
    </Link>
  )
}
