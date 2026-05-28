import { createContext, useCallback, useContext, useState } from 'react'
import { createPortal } from 'react-dom'

// Global toast queue. Components call useToast().show('message', 'success')
// and a styled .csr-toast slides in from the bottom-right for ~3s.
//
// CSS classes used: matches components.css `.csr-toast-container` rules.
//   .csr-toast            — base (hidden by default, transform translateX(...))
//   .csr-toast.show       — slid into view (added a frame after mount)
//   .csr-toast.toast-error  — red icon + left border
//   .csr-toast.toast-success — green (default)
//   .csr-toast.toast-info / .toast-warning — info / warning variants
const ToastContext = createContext(null)

const ICONS = {
  success: 'bi-check-circle-fill',
  error:   'bi-exclamation-octagon-fill',
  info:    'bi-info-circle-fill',
  warning: 'bi-exclamation-triangle-fill',
}

export function ToastProvider({ children }) {
  const [toasts, setToasts] = useState([])

  const show = useCallback((message, type = 'success', duration = 3000) => {
    const id = Date.now() + Math.random()
    setToasts((list) => {
      // Dedupe — if the same message+type is already on screen, refresh its
      // dismissal timer instead of stacking another copy.
      const existing = list.find((t) => t.message === message && t.type === type)
      if (existing) {
        clearTimeout(existing._timeoutId)
        existing._timeoutId = setTimeout(() => {
          setToasts((l) => l.filter((t) => t.id !== existing.id))
        }, duration)
        return list
      }
      const next = { id, message, type, entering: true }
      next._timeoutId = setTimeout(() => {
        setToasts((l) => l.filter((t) => t.id !== id))
      }, duration)
      return [...list, next]
    })
    // Slide-in: drop the `entering` flag on the next frame so `.show` is applied
    requestAnimationFrame(() => {
      setToasts((list) => list.map((t) => (t.id === id ? { ...t, entering: false } : t)))
    })
  }, [])

  const dismiss = useCallback((id) => {
    setToasts((list) => list.filter((t) => t.id !== id))
  }, [])

  return (
    <ToastContext.Provider value={{ show, dismiss }}>
      {children}
      {createPortal(
        <div className="csr-toast-container" aria-live="polite" aria-atomic="true">
          {toasts.map((t) => (
            <div
              key={t.id}
              className={`csr-toast toast-${t.type}${t.entering ? '' : ' show'}`}
              onClick={() => dismiss(t.id)}
              role={t.type === 'error' ? 'alert' : 'status'}
            >
              <i className={`csr-toast-icon bi ${ICONS[t.type] || ICONS.info}`}></i>
              <div className="csr-toast-body">
                <p>{t.message}</p>
              </div>
              <button
                type="button"
                className="csr-toast-close"
                aria-label="Dismiss"
                onClick={(e) => { e.stopPropagation(); dismiss(t.id) }}
              >
                <i className="bi bi-x-lg"></i>
              </button>
            </div>
          ))}
        </div>,
        document.body
      )}
    </ToastContext.Provider>
  )
}

export function useToast() {
  const ctx = useContext(ToastContext)
  if (!ctx) throw new Error('useToast must be used inside <ToastProvider>')
  return ctx
}
