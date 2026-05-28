import { Link } from 'react-router-dom'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Autoplay, Navigation, Pagination } from 'swiper/modules'
import SectionHeader from '@/ui/SectionHeader'
import { PRODUCTS } from '@/data/products'
import { formatCurrency } from '@/utils/formatCurrency'
import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/pagination'

// Related-products carousel for the ProductDetail page.
// Picks up-to `limit` items from the same `category` (excluding the current
// productId), padded with other categories if there aren't enough matches.
function pickRelated(productId, category, limit) {
  const same   = PRODUCTS.filter((p) => p.id !== productId && p.category === category)
  const others = PRODUCTS.filter((p) => p.id !== productId && p.category !== category)
  return [...same, ...others].slice(0, limit)
}

export default function RelatedProducts({
  productId   = 'csr-762-black',
  category    = 'motorcycles',
  limit       = 8,
  label       = 'You Might Also Like',
  titleStart  = 'Related',
  titleAccent = 'Products',
}) {
  const items = pickRelated(productId, category, limit)
  if (items.length === 0) return null

  return (
    <section aria-label="RelatedProducts" id="related-products" className="related-products-section">
      <div className="container">
        <SectionHeader className="section-header"
          label={label}
          titleStart={titleStart}
          titleAccent={titleAccent}
          center
        />

        <div className="related-slider-wrap">
          <Swiper
            className="related-swiper"
            modules={[Autoplay, Navigation, Pagination]}
            spaceBetween={16}
            slidesPerView={1.15}
            centeredSlides={false}
            loop={items.length > 4}
            autoplay={{
              delay: 3500,
              disableOnInteraction: false,
              pauseOnMouseEnter: true,
            }}
            speed={650}
            breakpoints={{
              480:  { slidesPerView: 1.6, spaceBetween: 16 },
              640:  { slidesPerView: 2,   spaceBetween: 18 },
              768:  { slidesPerView: 2.4, spaceBetween: 20 },
              992:  { slidesPerView: 3,   spaceBetween: 20 },
              1280: { slidesPerView: 4,   spaceBetween: 20 },
            }}
            pagination={{ clickable: true, el: '.related-swiper-pagination' }}
            navigation={{
              prevEl: '.related-swiper-prev',
              nextEl: '.related-swiper-next',
            }}
          >
            {items.map((p) => (
              <SwiperSlide key={p.id}>
                <Link to={`/shop/product/${p.id}`} className="card-base p-0 product-card">
                  <div className="product-card-media">
                    {p.badge && (
                      <span className={`product-badge${p.badge === 'sale' ? ' sale' : ''}`}>
                        {p.badge.toUpperCase()}
                      </span>
                    )}
                    <img
                      src={p.image}
                      alt={p.name}
                      loading="lazy"
                      decoding="async"
                    />
                  </div>
                  <div className="product-card-body">
                    {p.tagline && <span className="product-tagline">{p.tagline}</span>}
                    <h3>{p.name}</h3>
                    {p.rating != null && (
                      <div className="product-rating">
                        {Array.from({ length: 5 }).map((_, i) => (
                          <i
                            key={i}
                            className={`bi ${i < Math.round(p.rating) ? 'bi-star-fill' : 'bi-star'}`}
                            aria-hidden="true"
                          />
                        ))}
                        <span>{p.rating.toFixed(1)} · {p.reviews} reviews</span>
                      </div>
                    )}
                    <div className="product-price">
                      <span className="price">{formatCurrency(p.price)}</span>
                      {p.oldPrice && (
                        <span className="price-old rajdhani-lbl-text-sm">{formatCurrency(p.oldPrice)}</span>
                      )}
                    </div>
                    <span className="btn-csr secondary sm related-cta">
                      View Details <i className="bi bi-arrow-right" />
                    </span>
                  </div>
                </Link>
              </SwiperSlide>
            ))}
          </Swiper>

          <div className="related-swiper-pagination" />
          <button type="button" className="related-swiper-prev" aria-label="Previous">
            <i className="bi bi-chevron-left" />
          </button>
          <button type="button" className="related-swiper-next" aria-label="Next">
            <i className="bi bi-chevron-right" />
          </button>
        </div>
      </div>
    </section>
  )
}
