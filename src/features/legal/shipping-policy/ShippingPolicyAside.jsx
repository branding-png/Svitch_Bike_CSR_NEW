import LegalToc from '@/features/legal/LegalToc'
import { SHIPPING_POLICY_TOC } from '@/data/shipping-policy'

export default function ShippingPolicyAside() {
  return (
    <aside aria-label="ShippingPolicyAside" className="rajdhani-lbl-text-sm card-base legal-toc">
      <LegalToc items={SHIPPING_POLICY_TOC} />
    </aside>
  )
}
