import LegalToc from '@/features/legal/LegalToc'
import { COOKIE_POLICY_TOC } from '@/data/cookie-policy'

// Sidebar "On This Page" navigation for the Cookie Policy.
export default function CookiePolicyAside() {
  return (
    <aside aria-label="CookiePolicyAside" className="rajdhani-lbl-text-sm card-base legal-toc">
      <LegalToc items={COOKIE_POLICY_TOC} />
    </aside>
  )
}
