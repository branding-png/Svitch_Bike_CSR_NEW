import { useEffect } from 'react'

// Calls onOutside(event) when a click/touch lands outside the ref'd element.
// `enabled` lets you turn the listener off (e.g., when the menu is closed)
// so we don't pay for a global listener on every render.
export function useOutsideClick(ref, onOutside, enabled = true) {
  useEffect(() => {
    if (!enabled) return
    function handler(e) {
      if (ref.current && !ref.current.contains(e.target)) onOutside(e)
    }
    document.addEventListener('mousedown', handler)
    document.addEventListener('touchstart', handler, { passive: true })
    return () => {
      document.removeEventListener('mousedown', handler)
      document.removeEventListener('touchstart', handler)
    }
  }, [ref, onOutside, enabled])
}
