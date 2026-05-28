import { useEffect, useState } from 'react'

// Watches the `.wrapper-body` scroll container (or `window` as a fallback) and
// returns the id of the section whose top is closest to — but still above —
// the spy offset. Mirrors CSR_New_web's legal scroll-spy behaviour.
//
// Usage:
//   const activeId = useScrollSpy(['legal-commitment', 'legal-measures', ...])
//
// Options:
//   spyOffset  — distance from top of scroller that marks "active" (default 200)
export function useScrollSpy(ids = [], { spyOffset = 200 } = {}) {
  const [activeId, setActiveId] = useState(ids[0] || null)

  useEffect(() => {
    if (!ids.length) return
    const scroller = document.querySelector('.wrapper-body') || window
    const isWin = scroller === window

    function compute() {
      const cTop = isWin ? 0 : scroller.getBoundingClientRect().top
      let current = ids[0]
      for (const id of ids) {
        const el = document.getElementById(id)
        if (!el) continue
        const top = el.getBoundingClientRect().top - cTop
        if (top - spyOffset <= 0) current = id
      }
      setActiveId(current)
    }

    compute()
    const target = isWin ? window : scroller
    target.addEventListener('scroll', compute, { passive: true })
    window.addEventListener('resize', compute)
    return () => {
      target.removeEventListener('scroll', compute)
      window.removeEventListener('resize', compute)
    }
  }, [ids.join('|'), spyOffset]) // eslint-disable-line react-hooks/exhaustive-deps

  return activeId
}

// Smooth-scrolls the `.wrapper-body` (or window) so the given element's top
// sits `clickOffset` pixels below the scroller top. Updates the URL hash too.
export function smoothScrollToId(id, { clickOffset = 100 } = {}) {
  const el = document.getElementById(id)
  if (!el) return
  const scroller = document.querySelector('.wrapper-body') || window
  const isWin = scroller === window
  const cRect = isWin ? { top: 0 } : scroller.getBoundingClientRect()
  const scrollTop = isWin ? window.scrollY : scroller.scrollTop
  const top = Math.max(0, el.getBoundingClientRect().top - cRect.top + scrollTop - clickOffset)
  scroller.scrollTo({ top, behavior: 'smooth' })
  if (window.history?.replaceState) window.history.replaceState(null, '', `#${id}`)
}
