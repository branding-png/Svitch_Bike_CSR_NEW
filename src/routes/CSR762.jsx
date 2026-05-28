import HeroSwiper from '@/features/home/HeroSwiper'
import ValueProposition from '@/features/csr762/ValueProposition'
import UniqueFeatures from '@/features/csr762/UniqueFeatures'
import SpecsStrip from '@/features/csr762/SpecsStrip'
import Performance from '@/features/csr762/Performance'
import RangeBattery from '@/features/csr762/RangeBattery'
import Safety from '@/features/csr762/Safety'
import CostCompare from '@/features/csr762/CostCompare'
import SavingsCalculator from '@/features/csr762/SavingsCalculator'
import DesignStyle from '@/features/csr762/DesignStyle'
import SmartFeatures from '@/features/csr762/SmartFeatures'
import RideExperience from '@/features/csr762/RideExperience'
import Comparison from '@/features/csr762/Comparison'
import Pricing from '@/features/csr762/Pricing'
import Testimonials from '@/features/csr762/Testimonials'
import TestRide from '@/features/csr762/TestRide'
import Service from '@/features/csr762/Service'
import Faq from '@/features/csr762/Faq'
import FinalCta from '@/features/csr762/FinalCta'
import SvitchFamily from '@/features/home/SvitchFamily'
import VideoBanner from '@/features/home/VideoBanner'
import { useVideoBanner } from '@/hooks/useVideoBanner'
import { PATHS } from '@/utils/routes'
import '@/styles/pages/index.css'
import '@/styles/pages/shop.css'
import '@/styles/pages/csr762.css'

// Flagship landing page for the CSR 762.
export default function CSR762() {
  // Lazy-loads the <VideoBanner> mp4s via IntersectionObserver — same hook
  // Home.jsx uses. Without this, `data-src` is never promoted to `src` and
  // the videos stay blank on their poster frame.
  useVideoBanner([])

  return (
    <>
      {/* ─── HERO — 5-slide Swiper ─────────────────────────────────── */}
      <HeroSwiper />

      {/* ─── VALUE PROPOSITION — Why This Bike? ────────────────────── */}
      <ValueProposition />

      {/* ─── UNIQUE FEATURES — Built Different ──────────────────────── */}
      <UniqueFeatures />

      {/* ─── QUICK SPECS STRIP ───────────────────────────────────────── */}
      <SpecsStrip />

      {/* ─── VIDEO BANNER — Every Hero Needs a Svitch ──────────────── */}
      <VideoBanner
        id="video-banner"
        align="left"
        video="/images/video/celeb-video-mp4.mp4"
        poster="/images/video/hero-celeb-media.webp"
        tag="CSR 762"
        titleStart="Every Hero"
        titleEnd="Needs a"
        titleAccent="Svitch."
        multiline
        desc="The CSR 762 — where raw power meets zero emissions. Your ride to the future starts here."
        specs={[
          { value: 'GARC', label: 'Approved' },
          { value: 'ARAI', label: 'Approved' },
          { value: 'ICAT', label: 'Approved' },
          { value: 'ICAT', label: 'Certified' },
        ]}
        ctas={[
          { to: PATHS.shop,     label: 'Book Now', icon: 'lightning-charge-fill', variant: 'primary'   },
          { to: PATHS.warranty, label: 'Warranty', icon: 'shield-check',          variant: 'secondary' },
        ]}
      />

      {/* ─── PERFORMANCE — Every Detail. Crafted. ───────────────────── */}
      <Performance />

      {/* ─── RANGE & BATTERY — Trust Builder ────────────────────────── */}
      <RangeBattery />

      {/* ─── SAFETY — Stop Safe. Every Time. ─────────────────────────── */}
      <Safety />

      {/* ─── VIDEO BANNER — Born Electric. Built Different. ────────── */}
      <VideoBanner
        id="video-banner-2"
        align="right"
        video="/images/video/product-ride-video-mp4.mp4"
        poster="/images/video/hero-product-ride-media-1.webp"
        tag="CSR 762"
        titleStart="Born Electric."
        titleEnd="Built"
        titleAccent="Different."
        multiline
        specs={[
          { value: '6.5 kW',   label: 'Peak Power' },
          { value: '110 km/h', label: 'Top Speed' },
          { value: '125 km',   label: 'IDC Range' },
          { value: '55 Nm',    label: 'Torque' },
        ]}
        ctas={[
          { to: PATHS.shop,           label: 'Book Now',   icon: 'cart-check', variant: 'primary'   },
          { to: PATHS.specifications, label: 'Full Specs', icon: 'file-text',  variant: 'secondary' },
        ]}
      />

      {/* ─── COST COMPARE — Numbers Don't Lie. ──────────────────────── */}
      <CostCompare />

      {/* ─── SAVINGS CALCULATOR — Calculate Your Savings ──────────── */}
      <SavingsCalculator />

      {/* ─── DESIGN & STYLE — Visual Desire gallery ───────────────── */}
      <DesignStyle />

      {/* ─── SMART FEATURES — Tech Appeal ────────────────────────────── */}
      <SmartFeatures />

      {/* ─── RIDE EXPERIENCE — Emotion Section ───────────────────────── */}
      <RideExperience />

      {/* ─── COMPARISON — How We Stack Up ─────────────────────────────── */}
      <Comparison />

      {/* ─── PRICING — Own It Today. ─────────────────────────────────── */}
      <Pricing />

      {/* ─── TESTIMONIALS — What Riders Are Saying ─────────────────── */}
      <Testimonials />

      {/* ─── TEST RIDE — Book Your Test Ride ───────────────────────── */}
      <TestRide />

      {/* ─── SERVICE — We've Got You Covered. ───────────────────────── */}
      <Service />

      {/* ─── FAQ — Questions Answered. ──────────────────────────────── */}
      <Faq />

      {/* ─── FINAL CTA — Ready To Ride? ─────────────────────────────── */}
      <FinalCta />

      {/* ─── SVITCH ECO SYSTEM — two sibling brand cards ─────────────── */}
      <SvitchFamily />
    </>
  )
}
