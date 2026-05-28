import { useEffect, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import { PATHS } from '@/utils/routes'

// Slide-down search drawer. Closes on Esc, autofocuses input when opened,
// and on submit navigates to /shop?q=<term>.
export default function NavSearchDrawer({ open, onClose }) {
  const inputRef = useRef(null)
  const navigate = useNavigate()

  useEffect(() => {
    if (!open) return
    // Autofocus once the drawer is visible
    const id = requestAnimationFrame(() => inputRef.current?.focus())
    function onKey(e) { if (e.key === 'Escape') onClose() }
    document.addEventListener('keydown', onKey)
    return () => {
      cancelAnimationFrame(id)
      document.removeEventListener('keydown', onKey)
    }
  }, [open, onClose])

  function handleSubmit(e) {
    e.preventDefault()
    const q = inputRef.current?.value.trim()
    if (!q) return
    navigate(`${PATHS.shop}?q=${encodeURIComponent(q)}`)
    onClose()
  }

  return (
    <div className={'nav-search-drawer' + (open ? ' is-open' : '')} id="navSearchDrawer">
      <form className="nav-search-inner" onSubmit={handleSubmit}>
        <input
          ref={inputRef}
          type="search"
          id="navSearchInput"
          placeholder="Search bikes, accessories, parts..."
          aria-label="Search site"
        />
        <button
          type="button"
          className="nav-search-close"
          aria-label="Close"
          onClick={onClose}
        >
          <i className="bi bi-x-lg"></i>
        </button>
      </form>
    </div>
  )
}
