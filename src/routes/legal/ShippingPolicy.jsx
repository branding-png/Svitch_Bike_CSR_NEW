import PageHero from '@/layouts/PageHero'
import ShippingPolicyAside from '@/features/legal/shipping-policy/ShippingPolicyAside'
import ShippingPolicyContent from '@/features/legal/shipping-policy/ShippingPolicyContent'
import ShippingPolicyRelated from '@/features/legal/shipping-policy/ShippingPolicyRelated'
import '@/styles/pages/legal.css'

export default function ShippingPolicy() {
  return (
    <>
      <PageHero
        id="shipping-policy-hero"
        label="Legal"
        titleStart={<>Shipping</>}
        titleHighlight="Policy"
        description="How we dispatch and deliver your CSR 762 — service areas, timing, tracking, charges, and what to do if something goes wrong in transit."
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
            <ShippingPolicyAside />
            <ShippingPolicyContent />
          </div>
        </div>
      </section>

      {/* RELATED POLICIES */}
      <ShippingPolicyRelated />
    </>
  )
}
