import PageHero from '@/layouts/PageHero'
import AccessibilityAside from '@/features/legal/accessibility/AccessibilityAside'
import AccessibilityContent from '@/features/legal/accessibility/AccessibilityContent'
import AccessibilityRelated from '@/features/legal/accessibility/AccessibilityRelated'
import '@/styles/pages/legal.css'

export default function Accessibility() {
  return (
    <>
      <PageHero
        id="accessibility-hero"
        label="Legal"
        titleStart={<>Accessibility</>}
        titleHighlight="Statement"
        description="We're committed to making csr762.com usable by everyone — regardless of ability, device, or assistive technology."
      >
        <div className="legal-hero-meta rajdhani-lbl-text-sm mt-4">
          <i className="bi bi-clock-history"></i>
          <span>Last Updated: May 13, 2026</span>
        </div>
      </PageHero>

      {/* MAIN */}
      <section className="legal-body">
        <div className="container">
          <div className="legal-layout">
            <AccessibilityAside />
            <AccessibilityContent />
          </div>
        </div>
      </section>
{/* RELATED POLICIES */}
      <AccessibilityRelated />
    </>
  )
}
