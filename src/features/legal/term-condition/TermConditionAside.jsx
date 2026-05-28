import LegalToc from '@/features/legal/LegalToc'
import { TERM_CONDITION_TOC } from '@/data/term-condition'

export default function TermConditionAside() {
  return (
    <aside className="rajdhani-lbl-text-sm card-base legal-toc">
      <LegalToc items={TERM_CONDITION_TOC} />
    </aside>
  )
}
