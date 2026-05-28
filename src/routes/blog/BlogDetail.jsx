import { useEffect } from 'react'
import { Link, Navigate, useParams } from 'react-router-dom'
import PageHero from '@/layouts/PageHero'
import ArticleHeader from '@/features/blog/detail/ArticleHeader'
import ArticleBody from '@/features/blog/detail/ArticleBody'
import ArticleTagsShare from '@/features/blog/detail/ArticleTagsShare'
import AuthorBio from '@/features/blog/detail/AuthorBio'
import PostNav from '@/features/blog/detail/PostNav'
import Comments from '@/features/blog/detail/Comments'
import FeaturedProductWidget from '@/features/blog/detail/FeaturedProductWidget'
import RelatedArticlesWidget from '@/features/blog/detail/RelatedArticlesWidget'
import NewsletterWidget from '@/features/blog/detail/NewsletterWidget'
import BackToAllArticles from '@/features/blog/detail/BackToAllArticles'
import TagsWidget from '@/features/blog/TagsWidget'
import BlogNewsletter from '@/features/blog/BlogNewsletter'
import { getPostBySlug, getRelatedPosts, getNeighbors } from '@/data/blog'
import '@/styles/pages/blog.css'

export default function BlogDetail() {
  const { slug } = useParams()
  const post = getPostBySlug(slug)

  // Scroll back to the top on slug change so navigating between posts doesn't
  // leave the reader halfway down the previous article.
  useEffect(() => {
    if (typeof window !== 'undefined') window.scrollTo(0, 0)
  }, [slug])

  if (!post) return <Navigate to="/blog" replace />

  const { prev, next } = getNeighbors(slug)
  const relatedItems   = getRelatedPosts(slug).map((p) => ({
    slug: p.slug, title: p.title, date: p.date,
  }))

  return (
    <>
      <PageHero
        id="blog-detail-hero"
        label="Blog"
        titleStart={<>Blog</>}
        titleHighlight="Details"
        description={
          <Link
            className="rajdhani-lbl-text-sm"
            to="/blog"
            style={{ color: 'var(--white)', textDecoration: 'underline', textUnderlineOffset: 4 }}
          >
            <i className="bi bi-arrow-left"></i> Back to All Articles
          </Link>
        }
      />

      {/* ARTICLE BODY */}
      <section id="blog-main">
        <div className="container">
          <ArticleHeader
            post={{
              catLabel:    post.catLabel,
              title:       post.title,
              author:      post.author,
              date:        post.longDate || post.date,
              readTime:    `${post.readTime}${String(post.readTime).includes('min') ? '' : ' min read'}`,
              views:       post.views,
              comments:    post.comments,
              heroImage:   post.heroImage || post.image,
              heroAlt:     post.heroAlt || post.alt || post.title,
              heroCaption: post.heroCaption,
            }}
          />

          {/* Two-column: content + sidebar. On ≤991px, sidebar appears first. */}
          <div className="blog-layout blog-layout-sidebar-first-mobile">
            <div className="blog-content">
              <ArticleBody blocks={post.body} />
            </div>
            <aside className="blog-sidebar">
              {post.featuredProduct && (
                <FeaturedProductWidget
                  label={post.featuredProduct.label}
                  image={post.featuredProduct.image}
                  alt={post.featuredProduct.alt}
                  name={post.featuredProduct.name}
                  price={post.featuredProduct.price}
                />
              )}
              <RelatedArticlesWidget items={relatedItems} />
              <NewsletterWidget />
              {post.relatedTags?.length > 0 && <TagsWidget tags={post.relatedTags} />}
              <BackToAllArticles />
            </aside>
          </div>

          {/* Full-width below the two-column layout */}
          <div>
            <ArticleTagsShare
              tags={post.tags}
              shareTitle={`${post.title} — Svitch Motocorp`}
            />
            <AuthorBio
              name={post.author}
              role={post.role}
              email={post.email}
            />
            <PostNav
              prev={prev ? { slug: prev.slug, title: prev.title } : null}
              next={next ? { slug: next.slug, title: next.title } : null}
            />
            {/* `key` resets Comments state when the user navigates to a different post */}
            <Comments key={post.slug} initial={post.initialComments || []} />
          </div>
        </div>
      </section>
      <BlogNewsletter />
    </>
  )
}
