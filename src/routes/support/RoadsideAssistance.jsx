import { Link } from 'react-router-dom'
import PageHero from '@/layouts/PageHero'
import RsaCoverage    from '@/features/support/roadside-assistance/RsaCoverage'
import RsaHowItWorks  from '@/features/support/roadside-assistance/RsaHowItWorks'
import RsaEligibility from '@/features/support/roadside-assistance/RsaEligibility'
import { PATHS } from '@/utils/routes'
import { PHONES, phoneHref } from '@/data/contact-info'
import '@/styles/pages/roadside-assistance.css'

export default function RoadsideAssistance() {
  return (
    <>
      <PageHero
        id="roadside-assistance-hero"
        label="24x7 Roadside Assistance"
        titleStart={<>We&apos;ve Got </>}
        titleHighlight="Your Back."
        description="Stranded? One call, and a Svitch RSA crew is on the way — 365 days a year, anywhere in India, day or night."
      >
        <div className="page-hero-ctas">
          <a
            href={phoneHref('tollFree')}
            className="rajdhani-lbl-text-sm btn-csr primary"
          >
            <i className="bi bi-telephone-fill"></i> Call {PHONES.tollFree.phone}
          </a>
          <Link
            to={PATHS.contact}
            className="rajdhani-lbl-text-sm btn-csr secondary"
          >
            Request Help Online <i className="bi bi-arrow-right"></i>
          </Link>
        </div>
      </PageHero>

      <RsaCoverage />
      <RsaHowItWorks />
      <RsaEligibility />
    </>
  )
}
