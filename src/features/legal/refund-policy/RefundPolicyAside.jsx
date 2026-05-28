import LegalToc from '@/features/legal/LegalToc'
import { REFUND_POLICY_TOC } from '@/data/refund-policy'

export default function RefundPolicyAside() {
  return (
    <aside className="rajdhani-lbl-text-sm card-base legal-toc">
      <LegalToc items={REFUND_POLICY_TOC} />
    </aside>
  )
}
