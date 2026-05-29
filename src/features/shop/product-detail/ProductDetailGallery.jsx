import { useState } from 'react'

// Product detail gallery â€” main image + clickable thumbnail strip.
// Controlled by the parent via `images` prop; the active thumbnail is local
// since it only matters inside this component.
//
//   <ProductDetailGallery
//     images={[
//       { src: '/images/product/csr-762-black.webp', alt: 'Matte Black' },
//       { src: '/images/product/speed_csr_762-1.webp', alt: 'CSR 762 at speed on open road' },
//     ]}
//     productName="CSR 762"
//   />
export default function ProductDetailGallery({ images = [], productName = '' }) {
  const [active, setActive] = useState(0)
  if (!images.length) return null

  const main = images[active]

  return (
    <div aria-label="ProductDetailGallery" className="pd-gallery">
      <div className="pd-gallery-main">
        <img
          id="pdMainImg"
          src={main.src}
          alt={main.alt || productName}
          loading="lazy"
          decoding="async"
        />
      </div>

      <div className="pd-gallery-thumbs">
        {images.map((img, i) => (
          <button
            key={img.src}
            type="button"
            className={`pd-thumb${i === active ? ' is-active' : ''}`}
            data-img={img.src}
            onClick={() => setActive(i)}
            aria-label={`Show ${img.alt || `image ${i + 1}`}`}
            aria-pressed={i === active}
          >
            <img src={img.src} alt={img.alt || `${productName} ${i + 1}`} loading="lazy" decoding="async" />
          </button>
        ))}
      </div>
    </div>
  )
}
