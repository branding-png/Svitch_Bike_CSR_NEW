import { useEffect } from 'react'

// Adds `.visible` to every `.reveal` / `.reveal-left` element when it
// scrolls into view. Mirrors CSR_New_web/main.js section 5.
//
// Robustness upgrades for React lazy routes / dynamic content:
//   1. MutationObserver — catches `.reveal` elements mounted after initial
//      render (lazy chunks, modals, conditional content, etc.).
//   2. Fallback eager-show — if an element is already at or above the viewport
//      when first observed, we add `.visible` immediately. This handles the
//      case where the user scrolls past content while React was still rendering.
//   3. No unobserve — same as the static-site behaviour. WeakSet prevents
//      duplicate observations of the same node.
export function useReveal(deps = []) {
  useEffect(() => {
    const root = document.querySelector('.wrapper-body')
    const scroller = root || document.documentElement

    // Settings copied verbatim from main.js section 5
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) entry.target.classList.add('visible')
        })
      },
      { root, threshold: 0.08, rootMargin: '0px 0px -40px 0px' }
    )

    const seen = new WeakSet()
    function observe(el) {
      if (seen.has(el) || el.classList.contains('visible')) return
      seen.add(el)
      io.observe(el)

      // Eager-show: if the element top is already at or above the current
      // viewport bottom, mark it visible right now (don't wait for the user
      // to scroll back to it).
      const viewportTop = scroller.scrollTop || 0
      const viewportBot = viewportTop + (root ? root.clientHeight : window.innerHeight)
      const elTop = el.getBoundingClientRect().top + viewportTop -
                    (root ? root.getBoundingClientRect().top : 0)
      if (elTop < viewportBot - 40) {
        // Use rAF so the .visible class is added after the initial paint —
        // gives the user a brief fade even on above-the-fold content.
        requestAnimationFrame(() => el.classList.add('visible'))
      }
    }
    function scanInside(node) {
      if (!(node instanceof Element)) return
      if (node.matches?.('.reveal, .reveal-left')) observe(node)
      node.querySelectorAll?.('.reveal, .reveal-left').forEach(observe)
    }

    scanInside(document.body)

    let mo
    if (typeof MutationObserver !== 'undefined') {
      mo = new MutationObserver((mutations) => {
        mutations.forEach((m) => m.addedNodes.forEach(scanInside))
      })
      mo.observe(document.body, { childList: true, subtree: true })
    }

    return () => {
      mo?.disconnect()
      io.disconnect()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps)
}
