import { useScrollSpy, smoothScrollToId } from '@/hooks/useScrollSpy'
import { OWNERS_MANUAL_TOC } from '@/data/owners-manual'

// Owner's Manual chapter aside — mirrors CSR_New_web `.manual-toc`.
// Driven by the same OWNERS_MANUAL_SECTIONS list as ManualContent, so the
// anchors and titles always stay in sync.
export default function ManualAside({ chapters = OWNERS_MANUAL_TOC }) {
  const activeId = useScrollSpy(chapters.map((c) => c.id), { spyOffset: 200 })

  const onClick = (e, id) => {
    e.preventDefault()
    smoothScrollToId(id, { clickOffset: 100 })
  }

  return (
    <aside aria-label="ManualAside" className="rajdhani-lbl-text-sm card-base legal-toc manual-toc">
      <h3>Chapters</h3>
      <ol>
        {chapters.map((c) => (
          <li key={c.id}>
            <a
              href={`#${c.id}`}
              className={`rajdhani-lbl-text-sm${activeId === c.id ? ' is-active' : ''}`}
              onClick={(e) => onClick(e, c.id)}
            >
              <i className={`bi ${c.icon}`}></i> {c.title}
            </a>
          </li>
        ))}
      </ol>
    </aside>
  )
}
