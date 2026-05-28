import PageHero from '@/layouts/PageHero'
import TermConditionAside from '@/features/legal/term-condition/TermConditionAside'
import TermConditionContent from '@/features/legal/term-condition/TermConditionContent'
import TermConditionRelated from '@/features/legal/term-condition/TermConditionRelated'
import '@/styles/pages/legal.css'

export default function TermCondition() {
  return (
    <>
      <PageHero
        id="term-condition-hero"
        label="Legal"
        titleStart={<>Terms &</>}
        titleHighlight="Conditions"
        description="The rules that govern your use of the Svitch Motocorp website, our products, and any services you access through our platform."
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
            <TermConditionAside />
            <TermConditionContent />
          </div>
        </div>
      </section>

      {/* RELATED POLICIES */}
      <TermConditionRelated />
    </>
  )
}
