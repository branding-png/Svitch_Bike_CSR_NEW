import { Link } from 'react-router-dom'
import PageHero from '@/layouts/PageHero'
import SpecificationsAside   from '@/features/support/specifications/SpecificationsAside'
import SpecificationsContent from '@/features/support/specifications/SpecificationsContent'
import SpecificationsRelated from '@/features/support/specifications/SpecificationsRelated'
import { PATHS } from '@/utils/routes'
import '@/styles/pages/legal.css'
import '@/styles/pages/specifications.css'

export default function Specifications() {
  return (
    <>
      <PageHero
        id="specifications-hero"
        label="Technical Data"
        titleStart={<>Complete </>}
        titleHighlight="Specifications"
        description={
          <>
            Every detail of the CSR 762 — performance, powertrain, chassis,
            electronics, and warranty. Need a PDF?{' '}
            <Link to={PATHS.contact} className="rajdhani-lbl-text-sm">
              Request a copy. →
            </Link>
          </>
        }
      >
        <div className="legal-hero-meta rajdhani-lbl-text-sm mt-4">
          <i className="bi bi-clock-history"></i>
          <span>Last Updated: May 13, 2026</span>
        </div>
      </PageHero>

      <section className="legal-body">
        <div className="container">
          <div className="legal-layout">
            <SpecificationsAside />
            <SpecificationsContent />
          </div>
        </div>
      </section>

      <SpecificationsRelated />
    </>
  )
}
