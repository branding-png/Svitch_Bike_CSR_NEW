import PageHero from '@/layouts/PageHero'
import PressCoverage from '@/features/press/PressCoverage'
import PressReleases from '@/features/press/PressReleases'
import PressCta from '@/features/press/PressCta'
import { EMAILS, emailHref } from '@/data/contact-info'
import '@/styles/pages/press.css'

export default function Press() {
  return (
    <>
      <PageHero
        id="press-hero"
        label="Newsroom"
        titleStart={<>Svitch Bike</>}
        titleHighlight="In The"
        titleEnd=" Press"
        description={
          <>
            Media coverage, press releases, and brand assets. For interviews or
            inquiries, reach us at{' '}
            <a className="rajdhani-lbl-text-sm" href={emailHref('press')}>
              {EMAILS.press.address}.
            </a>
          </>
        }
      >
        <div className="press-hero-ctas">
          <a
            href="/press/csr-762-press-kit.zip"
            className="rajdhani-lbl-text-sm btn-csr primary"
          >
            <i className="bi bi-download"></i> Download Press Kit
          </a>
          <a
            href={emailHref('press')}
            className="rajdhani-lbl-text-sm btn-csr secondary"
          >
            <i className="bi bi-envelope-fill"></i> Press Enquiry
          </a>
        </div>
      </PageHero>

      <PressCoverage />
      <PressReleases />
      <PressCta />
    </>
  )
}
