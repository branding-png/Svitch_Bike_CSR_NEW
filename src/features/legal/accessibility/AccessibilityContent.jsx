import LegalCard from '@/features/legal/LegalCard'
import LegalBlocks from '@/features/legal/LegalBlocks'
import { ACCESSIBILITY_SECTIONS } from '@/data/accessibility'

// Main content column for the Accessibility statement.
// Renders every section in @/data/accessibility as a numbered LegalCard
// with its `blocks` array passed through the LegalBlocks renderer.
export default function AccessibilityContent({ sections = ACCESSIBILITY_SECTIONS }) {
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
