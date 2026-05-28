import { useEffect, useRef } from 'react'
import { createPortal } from 'react-dom'

// Portal-rendered modal that mirrors the .csr-modal markup from
// components.css. Closes on Esc + backdrop click. Locks body scroll, traps
// focus inside the dialog while open, and restores focus to the trigger
// element when closed.
const FOCUSABLE = [
  'a[href]',
  'button:not([disabled])',
  'input:not([disabled])',
  'select:not([disabled])',
  'textarea:not([disabled])',
  '[tabindex]:not([tabindex="-1"])',
].join(',')

export default function Modal({ isOpen, onClose, title, subtitle, children, footer, size }) {
  const dialogRef = useRef(null)
  const triggerRef = useRef(null)

  useEffect(() => {
    if (!isOpen) return

    // Remember whatever had focus before the modal opened so we can restore
    // it on close (typically the button that triggered the modal).
    triggerRef.current = document.activeElement

    function onKey(e) {
      if (e.key === 'Escape') {
        onClose?.()
        return
      }
      if (e.key === 'Tab') {
        // Focus trap — wrap Tab / Shift+Tab inside the dialog.
        const root = dialogRef.current
        if (!root) return
        const nodes = root.querySelectorAll(FOCUSABLE)
        if (nodes.length === 0) return
        const first = nodes[0]
        const last  = nodes[nodes.length - 1]
        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault(); last.focus()
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault(); first.focus()
        }
      }
    }

    document.addEventListener('keydown', onKey)
    const prevOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'

    // Move focus into the dialog after the first paint so screen readers
    // announce the modal title.
    const enter = requestAnimationFrame(() => {
      const root = dialogRef.current
      if (!root) return
      const firstFocusable = root.querySelector(FOCUSABLE)
      firstFocusable?.focus()
    })

    return () => {
      document.removeEventListener('keydown', onKey)
      document.body.style.overflow = prevOverflow
      cancelAnimationFrame(enter)
      // Restore focus to the trigger element so keyboard users land where
      // they were.
      const t = triggerRef.current
      if (t && typeof t.focus === 'function') t.focus()
    }
  }, [isOpen, onClose])

  if (!isOpen) return null

  return createPortal(
    <div
      className="modal fade show"
      role="dialog"
      aria-modal="true"
      style={{ display: 'block', background: 'rgba(0,0,0,0.7)' }}
      onClick={(e) => { if (e.target === e.currentTarget) onClose?.() }}
    >
      <div
        ref={dialogRef}
        className={`modal-dialog modal-dialog-centered ${size === 'lg' ? 'modal-lg' : ''}`}
      >
        <div className="modal-content csr-modal">
          {(title || subtitle) && (
            <div className="modal-header csr-modal-header">
              <div>
                {title && <h5 className="modal-title">{title}</h5>}
                {subtitle && <p className="csr-modal-subtitle">{subtitle}</p>}
              </div>
              <button
                type="button"
                className="btn-close btn-close-white"
                aria-label="Close"
                onClick={onClose}
              ></button>
            </div>
          )}
          <div className="modal-body csr-modal-body">{children}</div>
          {footer && <div className="modal-footer csr-modal-footer">{footer}</div>}
        </div>
      </div>
    </div>,
    document.body
  )
}
