import LegalCard from '@/features/legal/LegalCard'
import LegalBlocks from '@/features/legal/LegalBlocks'
import { COOKIE_POLICY_SECTIONS } from '@/data/cookie-policy'

// Main content column for the Cookie Policy.
export default function CookiePolicyContent({ sections = COOKIE_POLICY_SECTIONS }) {
  return (
    <div aria-label="CookiePolicyContent" role="region" className="legal-content">
      {sections.map((s) => (
        <LegalCard key={s.id} id={s.id} num={s.num} title={s.title}>
          <LegalBlocks blocks={s.blocks} />
        </LegalCard>
      ))}
    </div>
  )
}
