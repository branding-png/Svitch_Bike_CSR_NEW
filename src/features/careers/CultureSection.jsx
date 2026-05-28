// Culture section — mirrors CSR_New_web `#career-culture`.
const IMAGES = [
  { src: '/images/hero/CSR-762-3D-Helmet-Video_1296x.webp',         alt: 'Showroom' },
  { src: '/images/features/Svitch_OS_540x.webp',                    alt: 'Team'     },
  { src: '/images/Inspired-4-the-Meaning-Behind-CSR-762.webp',      alt: 'Culture'  },
]

export default function CultureSection({ images = IMAGES }) {
  return (
    <section id="career-culture">
      <div className="container">
        <div className="culture-layout">
          <div className="culture-copy">
            <span className="section-label">Our Culture</span>
            <h2 className="section-title">
              Built By Riders, <span className="accent">For Riders</span>
            </h2>
            <p>
              At Svitch, we ride what we build. Our offices have bike racks, our
              meetings have bike talk, and our team outings involve actual rides.
              This isn't just a job — it's a lifestyle.
            </p>
            <p>
              We're a flat organization where every voice matters. Junior or
              senior, your ideas get heard and implemented. We move fast, iterate,
              and celebrate wins together.
            </p>
            <a href="mailto:hrhead@svitch.bike" className="btn-csr primary">
              <i className="bi bi-send-fill"></i> Send Your Resume
            </a>
          </div>
          <div className="culture-media">
            {images.map((img) => (
              <img
                key={img.src}
                src={img.src}
                alt={img.alt}
                loading="lazy"
                decoding="async"
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
