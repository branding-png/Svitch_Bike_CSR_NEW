import LegalCard from '@/features/legal/LegalCard'
import LegalBlocks from '@/features/legal/LegalBlocks'
import { REFUND_POLICY_SECTIONS } from '@/data/refund-policy'

export default function RefundPolicyContent({ sections = REFUND_POLICY_SECTIONS }) {
  return (
    <div aria-label="RefundPolicyContent" role="region" className="legal-content">
      {sections.map((s) => (
        <LegalCard key={s.id} id={s.id} num={s.num} title={s.title}>
          <LegalBlocks blocks={s.blocks} />
        </LegalCard>
      ))}
    </div>
  )
}
