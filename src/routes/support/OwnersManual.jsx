import { Link } from 'react-router-dom'
import PageHero from '@/layouts/PageHero'
import ManualAside   from '@/features/support/owners-manual/ManualAside'
import ManualContent from '@/features/support/owners-manual/ManualContent'
import ManualRelated from '@/features/support/owners-manual/ManualRelated'
import { PATHS } from '@/utils/routes'
import '@/styles/pages/legal.css'
import '@/styles/pages/owners-manual.css'

export default function OwnersManual() {
  return (
    <>
      <PageHero
        id="owners-manual-hero"
        label="Owner's Manual"
        titleStart={<>Everything You Need To </>}
        titleHighlight="Know"
        description={
          <>
            Your complete guide to riding, charging, maintaining, and getting
            the most out of your CSR 762. Can&apos;t find what you need?{' '}
            <Link to={PATHS.contact} className="rajdhani-lbl-text-sm">
              Talk to our team. →
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
            <ManualAside />
            <ManualContent />
          </div>
        </div>
      </section>

      <ManualRelated />
    </>
  )
}
