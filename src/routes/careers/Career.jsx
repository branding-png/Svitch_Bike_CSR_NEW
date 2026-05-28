import PageHero from '@/layouts/PageHero'
import WhyWorkHere from '@/features/careers/WhyWorkHere'
import CultureSection from '@/features/careers/CultureSection'
import JobOpenings from '@/features/careers/JobOpenings'
import OpenApplicationCta from '@/features/careers/OpenApplicationCta'
import '@/styles/pages/career.css'

export default function Career() {
  return (
    <>
      <PageHero
        id="career-hero"
        label="Careers"
        titleStart={<>Build The</>}
        titleHighlight="Future"
        titleEnd=" Of Mobility"
        description={
          <>
            We're not just building bikes — we're building a movement. Join a
            team that's passionate, driven, and having fun while changing how
            India commutes.{' '}
            <a className="rajdhani-lbl-text-sm" href="#career-jobs">
              See open roles →
            </a>
          </>
        }
      />
      <WhyWorkHere />
      <CultureSection />
      <JobOpenings />
      <OpenApplicationCta />
    </>
  )
}
