import LegalCard from '@/features/legal/LegalCard'
import LegalBlocks from '@/features/legal/LegalBlocks'
import { TERM_CONDITION_SECTIONS } from '@/data/term-condition'

export default function TermConditionContent({ sections = TERM_CONDITION_SECTIONS }) {
  return (
    <div className="legal-content">
      {sections.map((s) => (
        <LegalCard key={s.id} id={s.id} num={s.num} title={s.title}>
          <LegalBlocks blocks={s.blocks} />
        </LegalCard>
      ))}
    </div>
  )
}
