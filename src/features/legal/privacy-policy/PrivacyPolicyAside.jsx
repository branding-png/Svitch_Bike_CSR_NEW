import LegalToc from '@/features/legal/LegalToc'
import { PRIVACY_POLICY_TOC } from '@/data/privacy-policy'

export default function PrivacyPolicyAside() {
  return (
    <aside aria-label="PrivacyPolicyAside" className="rajdhani-lbl-text-sm card-base legal-toc">
      <LegalToc items={PRIVACY_POLICY_TOC} />
    </aside>
  )
}
