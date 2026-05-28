import { useEffect } from 'react'

// Lazy-load + auto-play `.video-banner .vb-video` AND `.split-section video`
// elements when they scroll into view. Mirrors CSR_New_web/main.js section 6.
//
// Each banner/split video uses `<source data-src="…">` (not `src`) with
// `preload="none"`. When the element scrolls within 200px of the viewport,
// we promote data-src, load(), and play(). One-shot per video.
//
// React-specific upgrade: a MutationObserver scans newly-mounted DOM nodes
// so lazy-loaded route content (or any later-rendered video) gets observed
// automatically — no timing retries needed.
const SELECTOR = '.video-banner .vb-video, .split-section video'

export function useVideoBanner(deps = []) {
  useEffect(() => {
    const root = document.querySelector('.wrapper-body') || null
    const seen = new WeakSet()

    function activate(video) {
      video.querySelectorAll('source[data-src]').forEach((src) => {
        src.src = src.dataset.src
        src.removeAttribute('data-src')
      })
      video.load()
      video.play().catch(() => { /* autoplay policy — silent */ })
    }

    // IntersectionObserver with the same rootMargin as the static-site script
    const io = typeof IntersectionObserver !== 'undefined'
      ? new IntersectionObserver(
          (entries) => {
            entries.forEach((entry) => {
              if (entry.isIntersecting) {
                activate(entry.target)
                io.unobserve(entry.target)
              }
            })
          },
          { root, rootMargin: '200px 0px' }
        )
      : null

    function observe(video) {
      if (seen.has(video)) return
      seen.add(video)
      if (io) io.observe(video)
      else activate(video) // fallback: no IO → load eagerly
    }

    function scanInside(node) {
      if (!(node instanceof Element)) return
      if (node.matches?.(SELECTOR)) observe(node)
      node.querySelectorAll?.(SELECTOR).forEach(observe)
    }

    // 1) Initial pass — catches anything already in the DOM
    scanInside(document.body)

    // 2) MutationObserver — catches anything added later (lazy route, modal, …)
    let mo
    if (typeof MutationObserver !== 'undefined') {
      mo = new MutationObserver((mutations) => {
        mutations.forEach((m) => m.addedNodes.forEach(scanInside))
      })
      mo.observe(document.body, { childList: true, subtree: true })
    }

    return () => {
      mo?.disconnect()
      io?.disconnect()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps)
}
