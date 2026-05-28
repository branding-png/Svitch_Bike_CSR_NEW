import { useState } from 'react'
import PageHero from '@/layouts/PageHero'
import BlogFilters from '@/features/blog/BlogFilters'
import FeaturedPost from '@/features/blog/FeaturedPost'
import PostGrid from '@/features/blog/PostGrid'
import SearchWidget from '@/features/blog/SearchWidget'
import CategoriesWidget from '@/features/blog/CategoriesWidget'
import RecentPostsWidget from '@/features/blog/RecentPostsWidget'
import TagsWidget from '@/features/blog/TagsWidget'
import PromoWidget from '@/features/blog/PromoWidget'
import BlogNewsletter from '@/features/blog/BlogNewsletter'
import { getCategoryCounts } from '@/data/blog'
import '@/styles/pages/blog.css'

// Live counts derived from src/data/blog.js — stays accurate as posts are added.
const POST_COUNTS = getCategoryCounts()

export default function Blog() {
  const [cat, setCat]     = useState('all')
  const [query, setQuery] = useState('')
  const [page, setPage]   = useState(1)

  return (
    <>
      <PageHero
        id="blog-hero"
        label="Editorial"
        titleStart={<>The Svitch</>}
        titleHighlight="Journal"
        description={
          <>
            News, rider stories, launches, and tips — everything from India's
            boldest electric two-wheeler brand. Looking for a specific topic?{' '}
            <a className="rajdhani-lbl-text-sm" href="#blog-main">
              Browse by category. →
            </a>
          </>
        }
      />

      {/* MAIN */}
      <section id="blog-main">
        <div className="container">
          <BlogFilters active={cat} onChange={setCat} />

          {/* Content + Sidebar */}
          <div className="blog-layout">
            <div className="blog-content">
              {/* Hide the featured card while searching OR when paginated past
                  page 1 — keeps the results view tight and avoids duplicate-
                  feeling layouts on subsequent pages. */}
              {!query.trim() && page === 1 && <FeaturedPost />}
              <PostGrid
                cat={cat}
                query={query}
                page={page}
                onPageChange={setPage}
              />
            </div>
            <aside className="blog-sidebar">
              <SearchWidget query={query} onChange={setQuery} />
              <CategoriesWidget active={cat} onChange={setCat} counts={POST_COUNTS} />
              <RecentPostsWidget />
              <TagsWidget />
              <PromoWidget />
            </aside>
          </div>
        </div>
      </section>

      <BlogNewsletter />
    </>
  )
}
