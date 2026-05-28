import { useMemo } from 'react'
import { useScrollSpy, smoothScrollToId } from '@/hooks/useScrollSpy'

// Generic "On This Page" TOC for legal pages — mirrors CSR_New_web `.legal-toc`.
// Adds scroll-spy: as the reader scrolls, the link whose section is currently
// in view receives `.is-active`. Clicking a link smooth-scrolls the
// `.wrapper-body` container so the section sits ~100px from the top.
//
// `items` shape: [{ id, label }]
export default function LegalToc({ title = 'On This Page', items = [] }) {
  const ids = useMemo(() => items.map((i) => i.id), [items])
  const activeId = useScrollSpy(ids)

  function onClick(e, id) {
    e.preventDefault()
    smoothScrollToId(id)
  }

  return (
    <>
      <h3>{title}</h3>
      <ol>
        {items.map((i) => (
          <li key={i.id}>
            <a
              className={'rajdhani-lbl-text-sm' + (activeId === i.id ? ' is-active' : '')}
              href={`#${i.id}`}
              onClick={(e) => onClick(e, i.id)}
            >
              {i.label}
            </a>
          </li>
        ))}
      </ol>
    </>
  )
}
