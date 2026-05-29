import LegalCard   from '@/features/legal/LegalCard'
import LegalBlocks  from '@/features/legal/LegalBlocks'
import { useBookNow } from '@/contexts/BookNowContext'
import { SPECIFICATIONS_SECTIONS } from '@/data/specifications'

// Main content column for the Specifications page.
// Renders every section in @/data/specifications as a numbered LegalCard
// (with `.ch-icon`) and appends a download + Book Now CTA at the end.
export default function SpecificationsContent({
  sections = SPECIFICATIONS_SECTIONS,
  specSheetHref = '/docs/CSR-762-SPECS-SHEET.pdf',
}) {
  const { open: openBookNow } = useBookNow()

  return (
    <div aria-label="SpecificationsContent" className="legal-content">
      {sections.map((s) => (
        <LegalCard
          key={s.id}
          id={s.id}
          num={s.num}
          icon={s.icon}
          title={s.title}
        >
          <LegalBlocks blocks={s.blocks} />

          {/* Warranty section gets the bottom CTA strip */}
          {s.id === 'spec-warranty' && (
            <div className="spec-cta">
              <a href={specSheetHref} className="btn-csr secondary" download>
                <i className="bi bi-download"></i> Download Spec Sheet
              </a>
              <button type="button" className="btn-csr primary" onClick={openBookNow}>
                <i className="bi bi-cart-check"></i> Book Now
              </button>
            </div>
          )}
        </LegalCard>
      ))}
    </div>
  )
}
