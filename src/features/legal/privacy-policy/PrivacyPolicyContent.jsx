import LegalCard from '@/features/legal/LegalCard'
import LegalBlocks from '@/features/legal/LegalBlocks'
import { PRIVACY_POLICY_SECTIONS } from '@/data/privacy-policy'

export default function PrivacyPolicyContent({ sections = PRIVACY_POLICY_SECTIONS }) {
  return (
    <div aria-label="PrivacyPolicyContent" role="region" className="legal-content">
      {sections.map((s) => (
        <LegalCard key={s.id} id={s.id} num={s.num} title={s.title}>
          <LegalBlocks blocks={s.blocks} />
        </LegalCard>
      ))}
    </div>
  )
}
