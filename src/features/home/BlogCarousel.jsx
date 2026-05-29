import { Link } from 'react-router-dom'
import { Swiper, SwiperSlide } from 'swiper/react'
import SectionHeader from '@/ui/SectionHeader'
import { Navigation, Pagination } from 'swiper/modules'
import 'swiper/css'
import 'swiper/css/pagination'
import 'swiper/css/navigation'

// Blog carousel section — mirrors CSR_New_web `#blog` with custom Swiper
// pagination + prev/next arrows.
//
// Each post: `{ slug, title, date, tag, cover, href? }`
//   - `href` overrides the default `/blog/${slug}` route if you want an
//     external link or a different internal path.
//
// Usage:
//   <BlogCarousel />                         // 6 default posts baked in
//   <BlogCarousel posts={CUSTOM} viewAllTo={PATHS.blog} />
const BLOG_POSTS = [
  {
    slug: 'csr-762-times-drive-feature',
    title: "CSR 762 Featured on Times Drive — Here's What They Said",
    date: 'March 28, 2026',
    tag: 'Industry',
    cover: '/images/hero/banner.webp',
  },
  {
    slug: 'battery-real-world-range',
    title: 'How Our 4.2 kWh Battery Delivers 125 km Real-World Range',
    date: 'March 15, 2026',
    tag: 'Technology',
    cover: '/images/features/BATTERY-HOW.webp',
  },
  {
    slug: 'fame-ii-subsidy-guide',
    title: 'Your Complete Guide to FAME II Subsidies on the CSR 762',
    date: 'February 20, 2026',
    tag: 'Guide',
    cover: '/images/product/side-profile.webp',
  },
  {
    slug: 'weekend-ride-stories',
    title: 'Weekend Rides Reimagined — Owners Share Their Stories',
    date: 'February 5, 2026',
    tag: 'Lifestyle',
    cover: '/images/product/CSR-762-black-rider.webp',
  },
  {
    slug: 'ride-modes-explained',
    title: '4 Ride Modes Explained — Eco, Comfort, Dynamic & Sport',
    date: 'January 18, 2026',
    tag: 'Features',
    cover: '/images/features/Ride-modes.webp',
  },
  {
    slug: 'best-ev-design-auto-expo',
    title: "CSR 762 Wins 'Best EV Design' at Auto Expo 2026",
    date: 'January 3, 2026',
    tag: 'News',
    cover: '/images/product/csr-762-red-1.webp',
  },
]

export default function BlogCarousel({
  id = 'blog',
  label = 'News & Insights',
  titleStart = 'Latest from the',
  titleAccent = 'Blog',
  posts = BLOG_POSTS,
  viewAllTo,
  viewAllLabel = 'View All Posts',
}) {
  return (
    <section id={id} aria-label="BlogCarousel">
      <div className="container">
        <SectionHeader label={label} titleStart={titleStart} titleAccent={titleAccent} center />

        <div className="blog-slider-wrap reveal">
          <Swiper
            className="blog-swiper"
            modules={[Navigation, Pagination]}
            spaceBetween={20}
            slidesPerView={1}
            breakpoints={{
              768:  { slidesPerView: 2 },
              1024: { slidesPerView: 3 },
            }}
            pagination={{ clickable: true, el: '.blog-swiper-pagination' }}
            navigation={{
              prevEl: '.blog-swiper-prev',
              nextEl: '.blog-swiper-next',
            }}
            loop
          >
            {posts.map((p) => (
              <SwiperSlide key={p.slug}>
                <article className="card-base blog-card">
                  <div className="blog-thumb">
                    <img src={p.cover} alt={p.title} loading="lazy" decoding="async" />
                    {p.tag && <span className="blog-tag">{p.tag}</span>}
                  </div>
                  <div className="blog-body">
                    <time className="blog-date">
                      <i className="bi bi-calendar3"></i> {p.date}
                    </time>
                    <h3 className="blog-title">{p.title}</h3>
                    <Link to={p.href || `/blog/${p.slug}`} className="blog-read-more">
                      Read More <i className="bi bi-arrow-right"></i>
                    </Link>
                  </div>
                </article>
              </SwiperSlide>
            ))}
          </Swiper>
          <div className="blog-swiper-pagination" />

          {/* Custom prev/next — Swiper binds to these via the navigation prop */}
          <button type="button" className="blog-swiper-prev" aria-label="Previous">
            <i className="bi bi-chevron-left"></i>
          </button>
          <button type="button" className="blog-swiper-next" aria-label="Next">
            <i className="bi bi-chevron-right"></i>
          </button>
        </div>

        {viewAllTo && (
          <div className="text-center" style={{ marginTop: 40 }}>
            <Link to={viewAllTo} className="btn-csr secondary">
              {viewAllLabel} <i className="bi bi-arrow-right"></i>
            </Link>
          </div>
        )}
      </div>
    </section>
  )
}
