import { Link } from 'react-router-dom'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Autoplay, EffectFade, Navigation, Pagination, Parallax } from 'swiper/modules'
import 'swiper/css'
import 'swiper/css/effect-fade'
import 'swiper/css/pagination'
import 'swiper/css/navigation'
import { Button } from '@/ui'
import { PATHS } from '@/utils/routes'

// 5-slide fade-effect hero with parallax — mirrors CSR_New_web/index.html.
// Video slides use `<source data-src=…>` so the global useVideoBanner hook
// can lazy-load them. The Swiper itself also lazy-promotes the active
// slide's video on `slideChangeTransitionEnd` (matches main.js section 4).
//
// Usage:
//   <HeroSwiper />
//
// Data is baked in; if you ever need to drive it from a CMS, swap SLIDES.
const HERO_STATS = [
  ['3', 'yr', 'Battery Warranty'],
  ['5.5', 'hr', 'Charging Time'],
  ['6', 's', '0–60 km/h'],
  ['55', 'Nm', 'Torque'],
]
const HERO_STATS_2 = [
  ['160+', 'km', 'IDC Range'],
  ['6.5', 'kW', 'Peak Power'],
  ['110', 'km/h', 'Top Speed'],
]

function HeroStats({ items }) {
  return (
    <div className="hero-stats" data-swiper-parallax="-500">
      {items.map(([num, unit, label]) => (
        <div key={label} className="hero-stat">
          <span className="hero-stat-num">
            {num}
            <small>{unit}</small>
          </span>
          <span className="hero-stat-label rajdhani-lbl-text-sm">{label}</span>
        </div>
      ))}
    </div>
  )
}

export default function HeroSwiper() {
  // ─ Pause every <video> in the swiper as a transition starts ───────
  function handleSlideStart(swiper) {
    swiper.el.querySelectorAll('video').forEach((v) => v.pause())
  }

  // ─ After a slide ends: lazy-promote data-src → src, load + play ───
  function handleSlideEnd(swiper) {
    const activeSlide = swiper.slides[swiper.activeIndex]
    if (!activeSlide) return
    const video = activeSlide.querySelector('video')
    if (!video) return
    video.querySelectorAll('source[data-src]').forEach((src) => {
      src.src = src.dataset.src
      src.removeAttribute('data-src')
    })
    video.load()
    try { video.currentTime = 0 } catch { /* ignore */ }
    video.play().catch(() => { /* autoplay policy — silent */ })
  }

  // Kick the initial active slide on mount
  const handleSwiperInit = (s) => handleSlideEnd(s)

  return (
    <section id="hero" aria-label="HeroSwiper">
      <Swiper
        className="hero-swiper"
        modules={[Autoplay, EffectFade, Navigation, Pagination, Parallax]}
        effect="fade"
        fadeEffect={{ crossFade: true }}
        parallax
        loop
        speed={1000}
        autoplay={{ delay: 6500, disableOnInteraction: false }}
        pagination={{ clickable: true }}
        navigation
        onInit={handleSwiperInit}
        onSlideChangeTransitionStart={handleSlideStart}
        onSlideChangeTransitionEnd={handleSlideEnd}
      >
        {/* ─ Slide 1: banner image ─ */}
        <SwiperSlide>
          <div
            className="hero-bg"
            style={{ backgroundImage: "url('/images/hero/web-banner-04.webp')" }}
          />
          <div className="hero-overlay" />
          <div className="hero-content" data-swiper-parallax="-300">
            <span className="hero-tag" data-swiper-parallax="-100">
              Starting at ₹1,89,999
            </span>
            <h1 className="hero-title nowrap" data-swiper-parallax="-200">
              Indian by{' '}
              <span className="highlight heart-icon">
                <i className="bi bi-heart-fill"></i>
              </span>
            </h1>
            <p className="hero-desc" data-swiper-parallax="-300">
              3kW PMSM motor. 125 km IDC range. 110 km/h top speed. 6 driving
              modes. 3-year battery warranty.
            </p>
            <div className="hero-btns" data-swiper-parallax="-400">
              <Button to={PATHS.shop} variant="primary" icon="cart-check">Book Now</Button>
              <a
                href="#rotate360"
                className="rajdhani-lbl-text-sm btn-csr secondary"
                onClick={(e) => {
                  e.preventDefault()
                  const el = document.getElementById('rotate360')
                  if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' })
                }}
              >
                <i className="bi bi-arrow-repeat"></i> 360° View
              </a>
            </div>
            <HeroStats items={HERO_STATS} />
          </div>
        </SwiperSlide>

        {/* ─ Slide 2: product ride video ─ */}
        <SwiperSlide>
          <video
            className="hero-video"
            muted loop playsInline preload="none"
            poster="/images/video/hero-product-ride-media-1.webp"
          >
            <source data-src="/images/video/product-ride-video-mp4.mp4" type="video/mp4" />
          </video>
          <div className="hero-overlay" />
          <div className="hero-content" data-swiper-parallax="-300">
            <span className="hero-tag" data-swiper-parallax="-100">Born Electric</span>
            <h2 className="hero-title" data-swiper-parallax="-200">
              Every Hero Needs a <span className="highlight">Svitch</span>
            </h2>
            <p className="hero-desc" data-swiper-parallax="-300">
              6.5 kW peak power at 3600 RPM. 55 Nm torque. 0-60 km/h in 6
              seconds. Your ride to the future starts here.
            </p>
            <div className="hero-btns" data-swiper-parallax="-400">
              <Link to={PATHS.shop} className="rajdhani-lbl-text-sm btn-csr primary">
                <i className="bi bi-lightning-charge-fill"></i> Explore
              </Link>
              <Link to={PATHS.bookTestRide} className="rajdhani-lbl-text-sm btn-csr secondary">
                <i className="bi bi-geo-alt"></i> Test Ride
              </Link>
            </div>
          </div>
        </SwiperSlide>

        {/* ─ Slide 3: factory video ─ */}
        <SwiperSlide>
          <video
            className="hero-video"
            muted loop playsInline preload="none"
            poster="/images/video/hero-factory-media.webp"
          >
            <source data-src="/images/video/factory-video-mp4.mp4" type="video/mp4" />
          </video>
          <div className="hero-overlay" />
          <div className="hero-content" data-swiper-parallax="-300">
            <span className="hero-tag" data-swiper-parallax="-100">Precision Engineered</span>
            <h2 className="hero-title" data-swiper-parallax="-200">
              Built with<br />
              <span className="highlight">Passion</span>
            </h2>
            <p className="hero-desc" data-swiper-parallax="-300">
              Lattice space frame. Carbon steel chassis. IP68 protection. GARC
              approved. Made in India.
            </p>
            <div className="hero-btns" data-swiper-parallax="-400">
              <Link to={PATHS.specifications} className="rajdhani-lbl-text-sm btn-csr primary">
                <i className="bi bi-speedometer2"></i> Performance
              </Link>
              <Link to={PATHS.gallery} className="rajdhani-lbl-text-sm btn-csr secondary">
                <i className="bi bi-images"></i> Gallery
              </Link>
            </div>
          </div>
        </SwiperSlide>

        {/* ─ Slide 4: celebrity video ─ */}
        <SwiperSlide>
          <video
            className="hero-video"
            muted loop playsInline preload="none"
            poster="/images/video/hero-celeb-media.webp"
          >
            <source data-src="/images/video/celeb-video-mp4.mp4" type="video/mp4" />
          </video>
          <div className="hero-overlay" />
          <div className="hero-content" data-swiper-parallax="-300">
            <span className="hero-tag" data-swiper-parallax="-100">Celebrities Love It</span>
            <h2 className="hero-title" data-swiper-parallax="-200">
              Ride Like<br />a <span className="highlight">Star</span>
            </h2>
            <p className="hero-desc" data-swiper-parallax="-300">
              The CSR 762 is turning heads everywhere — from city streets to
              celebrity garages.
            </p>
            <div className="hero-btns" data-swiper-parallax="-400">
              <Link to={PATHS.shop} className="btn-csr primary">
                <i className="bi bi-lightning-charge-fill"></i> Book Now
              </Link>
              <Link to={PATHS.reviews} className="btn-csr secondary">
                <i className="bi bi-star"></i> Reviews
              </Link>
            </div>
          </div>
        </SwiperSlide>

        {/* ─ Slide 5: render video (centered banner variant) ─ */}
        <SwiperSlide className="hero-banner-slide">
          <video
            className="hero-video"
            muted loop playsInline preload="none"
            poster="/images/video/hero-render-media.webp"
          >
            <source data-src="/images/video/render.mp4" type="video/mp4" />
          </video>
          <div className="hero-overlay" />
          <div className="hero-content" data-swiper-parallax="-300">
            <span className="hero-tag" data-swiper-parallax="-100">CSR 762</span>
            <h2 className="hero-title" data-swiper-parallax="-200">
              Ride Into<br />
              <span className="highlight">The Future.</span>
            </h2>
            <p className="hero-desc" data-swiper-parallax="-300">
              Zero emissions. Maximum power. The CSR 762 delivers a premium
              electric ride with 160+ km range, instant torque, and smart tech
              built for Indian roads.
            </p>
            <div className="hero-btns" data-swiper-parallax="-400">
              <Link to={PATHS.shop} className="btn-csr primary">
                <i className="bi bi-lightning-charge-fill"></i> Explore Models
              </Link>
              <Link to={PATHS.bookTestRide} className="btn-csr secondary">
                <i className="bi bi-geo-alt"></i> Book Test Ride
              </Link>
            </div>
            <HeroStats items={HERO_STATS_2} />
          </div>
        </SwiperSlide>
      </Swiper>
    </section>
  )
}
