import { useEffect, useRef } from 'react'
import GLightbox from 'glightbox'
import 'glightbox/dist/css/glightbox.css'

// Thin React wrapper around GLightbox. Renders `images` as anchors that the
// library binds to. Each image opens in a themed lightbox (CSS lives in
// components.css under .glightbox-clean overrides).
//
// images: [{ src, alt?, caption? }]
// className passed through to the grid wrapper.
export default function Lightbox({ images = [], className = '', children }) {
  const wrapRef = useRef(null)
  const lbRef = useRef(null)

  useEffect(() => {
    if (!wrapRef.current) return
    // Initialize once per mount; the selector targets only links inside this wrap.
    lbRef.current = GLightbox({
      selector: '.lb-item',
      touchNavigation: true,
      loop: true,
      skin: 'clean',
    })
    return () => { lbRef.current?.destroy() }
  }, [images])

  // Consumer may supply `children` (custom grid) — otherwise we render a
  // default flat grid of clickable thumbnails.
  return (
    <div ref={wrapRef} className={`lightbox-grid ${className}`}>
      {children ?? images.map((img, i) => (
        <a key={i} href={img.src} className="lb-item" data-glightbox={img.caption ? `title: ${img.caption}` : undefined}>
          <img src={img.src} alt={img.alt || `Image ${i + 1}`} loading="lazy" />
        </a>
      ))}
    </div>
  )
}
