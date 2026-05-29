import LegalCard from '@/features/legal/LegalCard'
import LegalBlocks from '@/features/legal/LegalBlocks'
import { SHIPPING_POLICY_SECTIONS } from '@/data/shipping-policy'

export default function ShippingPolicyContent({ sections = SHIPPING_POLICY_SECTIONS }) {
  return (
    <div aria-label="ShippingPolicyContent" className="legal-content">
      {sections.map((s) => (
        <LegalCard key={s.id} id={s.id} num={s.num} title={s.title}>
          <LegalBlocks blocks={s.blocks} />
        </LegalCard>
      ))}
    </div>
  )
}
