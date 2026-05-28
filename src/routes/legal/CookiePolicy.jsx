import PageHero from '@/layouts/PageHero'
import CookiePolicyAside from '@/features/legal/cookie-policy/CookiePolicyAside'
import CookiePolicyContent from '@/features/legal/cookie-policy/CookiePolicyContent'
import CookiePolicyRelated from '@/features/legal/cookie-policy/CookiePolicyRelated'
import '@/styles/pages/legal.css'

export default function CookiePolicy() {
  return (
    <>
      <PageHero
        id="cookie-policy-hero"
        label="Legal"
        titleStart={<>Cookie</>}
        titleHighlight="Policy"
        description="We use cookies to keep the site running smoothly, remember your preferences, and understand how visitors interact with our pages. Here's the full breakdown."
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
            <CookiePolicyAside />
            <CookiePolicyContent />
          </div>
        </div>
      </section>
{/* RELATED POLICIES */}
      <CookiePolicyRelated />
    </>
  )
}
