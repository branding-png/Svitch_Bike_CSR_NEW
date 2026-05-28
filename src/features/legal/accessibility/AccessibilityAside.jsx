import LegalToc from '@/features/legal/LegalToc'
import { ACCESSIBILITY_TOC } from '@/data/accessibility'

// Sidebar "On This Page" navigation for the Accessibility statement.
// Items derived from @/data/accessibility so the anchors always match
// the section IDs rendered by <AccessibilityContent />.
export default function AccessibilityAside() {
  return (
    <aside className="rajdhani-lbl-text-sm card-base legal-toc">
      <LegalToc items={ACCESSIBILITY_TOC} />
    </aside>
  )
}
