import PageHero from '@/layouts/PageHero'
import PrivacyPolicyAside from '@/features/legal/privacy-policy/PrivacyPolicyAside'
import PrivacyPolicyContent from '@/features/legal/privacy-policy/PrivacyPolicyContent'
import PrivacyPolicyRelated from '@/features/legal/privacy-policy/PrivacyPolicyRelated'
import '@/styles/pages/legal.css'

export default function PrivacyPolicy() {
  return (
    <>
      <PageHero
        id="privacy-policy-hero"
        label="Legal"
        titleStart={<>Privacy</>}
        titleHighlight="Policy"
        description="Your privacy matters. Here's exactly what data we collect, why we collect it, how we protect it, and the rights you have over it."
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
            <PrivacyPolicyAside />
            <PrivacyPolicyContent />
          </div>
        </div>
      </section>
{/* RELATED POLICIES */}
      <PrivacyPolicyRelated />
    </>
  )
}
