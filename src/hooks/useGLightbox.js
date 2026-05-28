import { useEffect } from 'react'
import GLightbox from 'glightbox'
import 'glightbox/dist/css/glightbox.css'

// Bind GLightbox to any anchors matching `selector` on the current page.
//
// SCROLL PRESERVATION
// The site's scroll container is `.wrapper-body` (not window). GLightbox
// mutates document.body styles on open, which causes that container's
// scrollTop to drop to 0 before our own `open` event handler fires.
// To work around this we snapshot scrollTop in a CAPTURE-phase click
// listener on every matched anchor — that runs before GLightbox sees the
// click. We then restore on close (and again next frame to beat any late
// focus/style restoration).
export function useGLightbox(selector = '.glightbox', deps = []) {
  useEffect(() => {
    let lb
    let saved = 0
    const wrap = document.querySelector('.wrapper-body')

    // Capture-phase click listener: fires *before* GLightbox handles the click
    function onCaptureClick(e) {
      const target = e.target.closest?.(selector)
      if (target && wrap) saved = wrap.scrollTop
    }
    document.addEventListener('click', onCaptureClick, true)

    // Restore is called multiple times — GLightbox tears down in stages
    function restore() {
      if (!wrap) return
      wrap.scrollTop = saved
    }

    const id = setTimeout(() => {
      try {
        lb = GLightbox({ selector, touchNavigation: true, loop: true, skin: 'clean' })

        lb.on('open', () => {
          // Defensive: also snapshot here in case the click didn't go through
          // our anchor (e.g., programmatic open). If saved is still 0 and the
          // wrapper has scroll, capture it now.
          if (wrap && wrap.scrollTop > 0) saved = wrap.scrollTop
        })

        lb.on('close', () => {
          restore()
          requestAnimationFrame(restore)
          // Belt-and-braces: a third restore after the close animation (~300ms)
          setTimeout(restore, 350)
        })
      } catch { /* ignore — no anchors matched */ }
    }, 60)

    return () => {
      clearTimeout(id)
      document.removeEventListener('click', onCaptureClick, true)
      lb?.destroy?.()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps)
}
