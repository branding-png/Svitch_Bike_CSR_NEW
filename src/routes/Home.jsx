import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
// Hero page-specific styles

import { SectionHeader } from "@/ui";
import { PATHS } from "@/utils/routes";
import HeroSwiper from "@/features/home/HeroSwiper";
import Rotate360 from "@/features/home/Rotate360";
import VideoBanner from "@/features/home/VideoBanner";
import PhotoGallery from "@/features/home/PhotoGallery";
import BlogCarousel from "@/features/home/BlogCarousel";
import Newsletter from "@/features/home/Newsletter";
import ContactSection from "@/features/home/ContactSection";
import NewsMarquee from "@/features/home/NewsMarquee";
import Testimonials, { TestimonialsPagination } from "@/features/home/Testimonials";
import SplitFeature from "@/features/home/SplitFeature";
import UspGrid from "@/features/home/UspGrid";
import ProductRange from "@/features/home/ProductRange";
import SvitchFamily from "@/features/home/SvitchFamily";
import { useReveal } from "@/hooks/useReveal";
import { useVideoBanner } from "@/hooks/useVideoBanner";
import { useGLightbox } from "@/hooks/useGLightbox";
import "@/styles/pages/index.css";

const PREBOOK = [
  { num: "40,118", label: "EOI So Far" },
  { num: "3", label: "Colour Options" },
  { num: "₹999", label: "Booking Amount" },
];

// 5 scroll-driven "Inspired" slides. As the user scrolls through the section,
// `useInspiredSlide` maps scroll progress (0..1) to one of 5 indices and
// toggles `.active` on the matching image + text. Matches main.js logic.
const INSPIRED_SLIDES = [
  {
    img: "/images/Inspired-1-inspired-by-the-king.webp",
    alt: "Inspired by the King",
    titleStart: "Inspired by",
    titleAccent: "the King",
    body:
      "The CSR 762 draws its design DNA from the Asiatic Lion — India's symbol of power and pride. " +
      "Every curve reflects a powerful stance, dominating road presence and a strong yet agile build. " +
      "Born electric, built to rule the road.",
  },
  {
    img: "/images/Inspired-2-Designed-for-the-Road.webp",
    alt: "Designed for the Road",
    titleStart: "Designed for",
    titleAccent: "the Road",
    body:
      "Seamless, precision-crafted panels deliver a premium finish that turns heads on every street. " +
      "Every surface is sculpted for aerodynamic efficiency while maintaining the bold, " +
      "aggressive stance that defines the CSR 762. Style, durability and performance — all in one.",
  },
  {
    img: "/images/Inspired-3-More-than-just-a-frame-it-s-a-Skeleton.webp",
    alt: "The Skeleton Frame",
    titleStart: "More Than a Frame,",
    titleAccent: "It's a Skeleton",
    body:
      "The lion-inspired lattice space frame chassis delivers maximum stability and strength at minimum weight. " +
      "Carbon steel construction ensures rigidity while the unique skeletal design provides " +
      "superior handling across Indian road conditions.",
  },
  {
    img: "/images/Inspired-4-the-Meaning-Behind-CSR-762.webp",
    alt: "The Meaning Behind CSR 762",
    titleStart: "The Meaning Behind",
    titleAccent: "CSR 762",
    body:
      "CSR 762 blends commuter practicality with sport performance. 'CSR' reflects our bold, " +
      "courageous spirit — a nod to the lion that inspires us. '762' signals daily readiness, " +
      "a motorcycle built for every day of the year, every road you ride.",
  },
  {
    img: "/images/Inspired-5-The-Essence-of-Our-Logo.webp",
    alt: "The Essence of Our Logo",
    titleStart: "The Essence of",
    titleAccent: "Our Logo",
    body:
      "The lion in our logo symbolizes courage, power, and leadership — core values that drive " +
      "every CSR 762 off the production line. It reflects our commitment to bold design, " +
      "cutting-edge technology, and the relentless pursuit of electric excellence.",
  },
];








export default function Home() {
  // Observe .reveal / .reveal-left elements on this page and add .visible
  // when they scroll into view. Mirrors CSR_New_web/main.js section 5.
  useReveal([]);

  // Lazy-load + auto-play .video-banner .vb-video on scroll into view.
  // Mirrors CSR_New_web/main.js section 6.
  useVideoBanner([]);

  // Bind GLightbox to USP feature tiles (selector matches their .glightbox).
  useGLightbox(".glightbox", []);

  // ─── Scroll-driven "Inspired" slide switcher ──────────────────────
  // Maps scroll progress through the .hm-inspired-scroll section to one of
  // 5 indices. On mobile (≤991px) every slide stays active (CSS stacks them).
  const inspiredRef = useRef(null);
  const [inspiredIdx, setInspiredIdx] = useState(0);
  useEffect(() => {
    const section = inspiredRef.current;
    if (!section) return;
    const wrap = document.querySelector(".wrapper-body") || window;
    const isMobile = () => window.innerWidth <= 991;

    function tick() {
      if (isMobile()) { setInspiredIdx(-1); return; } // -1 → all active
      const rect = section.getBoundingClientRect();
      const sectionH = section.offsetHeight;
      const vh = window.innerHeight;
      let scrolled = -rect.top;
      const range = sectionH - vh;
      if (range <= 0) return;
      if (scrolled < 0) scrolled = 0;
      if (scrolled > range) scrolled = range;
      const progress = scrolled / range;
      let idx = Math.floor(progress * INSPIRED_SLIDES.length);
      if (idx >= INSPIRED_SLIDES.length) idx = INSPIRED_SLIDES.length - 1;
      setInspiredIdx(idx);
    }

    tick();
    wrap.addEventListener("scroll", tick, { passive: true });
    window.addEventListener("resize", tick);
    return () => {
      wrap.removeEventListener("scroll", tick);
      window.removeEventListener("resize", tick);
    };
  }, []);
  const isInspiredActive = (i) => inspiredIdx === -1 || inspiredIdx === i;

  return (
    <>
      {/* ─── HERO — 5-slide Swiper (component) ─────────────────────────── */}
      <HeroSwiper />

      {/* ─── PREBOOK STRIP (exact CSR_New_web markup) ───────────────────── */}
      <section id="prebook-strip">
        <div className="container">
          <div className="prebook-wrap">
            <div className="prebook-left">
              <h5>
                <i className="bi bi-lightning-charge-fill"></i> Pre-Booking
                Available
              </h5>
              <p>Stay tuned for further updates.</p>
            </div>
            <div className="prebook-stats">
              {PREBOOK.map((p) => (
                <div key={p.label} className="prebook-stat">
                  <h3>{p.num}</h3>
                  <span className="rajdhani-lbl-text-sm">{p.label}</span>
                </div>
              ))}
            </div>
            <div className="prebook-cta">
              <Link to={PATHS.shop} className="btn-csr primary">
                <i className="bi bi-cart-check"></i> Book Now
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ─── PRODUCTS — Shop the Range (component) ──────────────────────── */}
      <ProductRange />

      {/* ─── VIDEO BANNER — Every Hero Needs a Svitch ─── */}
      <VideoBanner
        id="video-banner"
        align="left"
        video="/images/video/product-ride-video-mp4.mp4"
        poster="/images/video/hero-product-ride-media-1.webp"
        tag="CSR 762"
        titleStart="Every Hero"
        titleEnd="Needs a"
        titleAccent="Svitch."
        multiline
        desc="6.5 kW peak power. 55 Nm instant torque. 110 km/h top speed. The CSR 762 redefines what an electric motorcycle can be."
        specs={[
          { value: "6.5 kW",   label: "Peak Power" },
          { value: "110 km/h", label: "Top Speed" },
          { value: "125 km",   label: "IDC Range" },
          { value: "55 Nm",    label: "Torque" },
        ]}
        ctas={[
          { to: PATHS.shop,           label: "Book Now",   icon: "cart-check", variant: "primary"   },
          { to: PATHS.specifications, label: "Full Specs", icon: "file-text",  variant: "secondary" },
        ]}
      />
      {/* ─── INSPIRED — scroll-driven slide switcher (exact CSR_New_web) ── */}
      <section id="inspired" className="hm-inspired-scroll" ref={inspiredRef}>
        <div className="hm-inspired-sticky">
          {/* Left: stacked images, only the active one is visible */}
          <div className="hm-inspired-left">
            {INSPIRED_SLIDES.map((s, i) => (
              <div
                key={s.img}
                id={`inspired-img-${i}`}
                className={"hm-inspired-img" + (isInspiredActive(i) ? " active" : "")}
              >
                <img src={s.img} alt={s.alt} loading="lazy" decoding="async" />
              </div>
            ))}
          </div>
          {/* Right: matching text panels */}
          <div className="hm-inspired-right">
            {INSPIRED_SLIDES.map((s, i) => (
              <div
                key={s.titleAccent}
                id={`inspired-text-${i}`}
                className={"hm-inspired-text" + (isInspiredActive(i) ? " active" : "")}
              >
                <span className="section-label">
                  {String(i + 1).padStart(2, "0")} / 05
                </span>
                <h2 className="hm-inspired-title">
                  {s.titleStart} <span className="accent">{s.titleAccent}</span>
                </h2>
                <p>{s.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
      {/* ─── USP — UNIQUE FEATURES (component, GLightbox-bound) ───────── */}
      <UspGrid />
      {/* ─── SPLIT-FEATURE — Battery (image left, text right) ───────────── */}
      <SplitFeature
        label="Power Source"
        titleStart="Dual Swappable"
        titleAccent="Battery"
        desc="3.6 kWh Li-NMC battery pack — 2 removable modules at 20 kg each. Swap in under 2 minutes or charge at home. Smart BMS monitors every cell for voltage, temperature, and state of charge."
        video="/images/video/battery-anim.mp4"
        poster="/images/features/BATTERY-HOW.webp"
        stats={[
          { value: "5.5 hr", label: "Full Charge" },
          { value: "1500+", label: "Charge Cycles" },
          { value: "IP68",  label: "Protection" },
        ]}
        cta={{ to: PATHS.specifications, label: "Full Specs", icon: "file-text" }}
      />

      {/* ─── SPLIT-FEATURE — Thermal (text left, image right, reversed) ─── */}
      <SplitFeature
        reverse
        label="Cooling System"
        titleStart="Naturally Aspirated"
        titleAccent="Air Cooling"
        desc="Motor, controller, and batteries are cooled by naturally aspirated air flow. Active thermal management keeps performance optimal — even in extreme conditions. IP68 rated throughout."
        video="/images/video/air-vent-anim.mp4"
        poster="/images/features/Thermal-Protection.webp"
        stats={[
          { value: "IP68", label: "Motor" },
          { value: "IP68", label: "Controller" },
          { value: "IP68", label: "Battery" },
        ]}
      />
      {/* ─── 360° ROTATE — interactive product viewer (Rotate360 component) ─ */}
      <Rotate360 />

      {/* ─── PHOTO GALLERY (component) ─────────────────────────────────── */}
      <PhotoGallery />

      {/* ─── TESTIMONIALS + NEWS LOGO STRIP (exact CSR_New_web markup) ──── */}
      <section id="testimonials">
        <div className="container">
          <SectionHeader label="What Riders Say & News" titleStart="Real" titleAccent="Reviews" />

          {/* ─── Testimonials carousel (component) ───────────────────── */}
          <Testimonials />
          <TestimonialsPagination />

          {/* ─── News-logo marquee (component) ────────────────────────── */}
          <NewsMarquee />
        </div>
      </section>
      {/* ─── VIDEO BANNER 2 — Factory / Built with Passion (right-aligned) ─ */}
      <VideoBanner
        id="video-banner-2"
        align="right"
        video="/images/video/factory-video-mp4.mp4"
        poster="/images/video/hero-factory-media.webp"
        tag="Indian by"
        tagIcon="heart-fill"
        titleStart="Built with"
        titleAccent="Passion"
        desc="From our state-of-the-art factory floor to your doorstep. 150+ quality checks. GARC approved. Every CSR 762 is built to last."
        specs={[
          { value: "GARC", label: "Approved" },
          { value: "ARAI", label: "Approved" },
          { value: "ICAT", label: "Approved" },
          { value: "ICAT", label: "Certified" },
        ]}
        ctas={[
          { to: PATHS.shop,      label: "Book Now",  icon: "lightning-charge-fill", variant: "primary"   },
          { to: PATHS.warranty,  label: "Warranty",  icon: "shield-check",          variant: "secondary" },
        ]}
      />

      {/* ─── CONTACT / BOOK NOW (validated form) ─────────────────────────── */}
      <ContactSection />
      {/* ─── LATEST BLOG (carousel + custom prev/next + View All) ───────── */}
      <BlogCarousel viewAllTo={PATHS.blog} />

      {/* ─── NEWSLETTER SIGNUP (validated email + spinner + feedback) ───── */}
      <Newsletter />

      {/* ─── SVITCH ECO SYSTEM — two sibling brand cards (component) ────── */}
      <SvitchFamily />
    </>
  );
}
