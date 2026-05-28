import PageHero from '@/layouts/PageHero'
import RefundPolicyAside from '@/features/legal/refund-policy/RefundPolicyAside'
import RefundPolicyContent from '@/features/legal/refund-policy/RefundPolicyContent'
import RefundPolicyRelated from '@/features/legal/refund-policy/RefundPolicyRelated'
import '@/styles/pages/legal.css'

export default function RefundPolicy() {
  return (
    <>
      <PageHero
        id="refund-policy-hero"
        label="Legal"
        titleStart={<>Refund</>}
        titleHighlight="Policy"
        description="When you can cancel, when you are eligible for a refund, how long it takes, and what happens with defective units. Fair to you, fair to us."
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
            <RefundPolicyAside />
            <RefundPolicyContent />
          </div>
        </div>
      </section>

      {/* RELATED POLICIES */}
      <RefundPolicyRelated />
    </>
  )
}
