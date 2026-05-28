import LegalCard   from '@/features/legal/LegalCard'
import LegalBlocks  from '@/features/legal/LegalBlocks'
import { OWNERS_MANUAL_SECTIONS } from '@/data/owners-manual'

// Main content column for the Owner's Manual.
// Renders every chapter in @/data/owners-manual as a numbered LegalCard
// (with the `.ch-icon` prefix) and a "Download Owner's Manual" CTA at the end.
export default function ManualContent({
  sections = OWNERS_MANUAL_SECTIONS,
  pdfHref  = '/docs/csr-762-owners-manual.pdf',
}) {
  return (
    <div className="legal-content">
      {sections.map((s) => (
        <LegalCard
          key={s.id}
          id={s.id}
          num={s.num}
          icon={s.icon}
          title={s.title}
        >
          <LegalBlocks blocks={s.blocks} />
        </LegalCard>
      ))}

      <div className="manual-download-cta">
        <a href={pdfHref} className="btn-csr primary" download>
          <i className="bi bi-file-earmark-pdf"></i>
          Download Owner&apos;s Manual
          <span className="manual-download-meta">PDF · ~4 MB</span>
        </a>
      </div>
    </div>
  )
}
