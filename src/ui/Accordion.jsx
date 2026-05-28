import { useState } from 'react'

// FAQ-style accordion. Pass items: [{ q, a }]. `multi` lets users open
// more than one panel at a time (default: single-open).
export default function Accordion({ items = [], multi = false, className = '' }) {
  const [open, setOpen] = useState(() => new Set())

  function toggle(i) {
    setOpen((prev) => {
      const next = new Set(multi ? prev : [])
      if (prev.has(i)) next.delete(i)
      else next.add(i)
      return next
    })
  }

  return (
    <div className={`faq-accordion ${className}`}>
      {items.map((it, i) => {
        const isOpen = open.has(i)
        return (
          <div key={i} className={'faq-item' + (isOpen ? ' is-open' : '')}>
            <button
              type="button"
              className="faq-q rajdhani-lbl-text-sm"
              aria-expanded={isOpen}
              onClick={() => toggle(i)}
            >
              <span>{it.q}</span>
              <i className={`bi ${isOpen ? 'bi-dash-lg' : 'bi-plus-lg'}`}></i>
            </button>
            {isOpen && <div className="faq-a">{it.a}</div>}
          </div>
        )
      })}
    </div>
  )
}
