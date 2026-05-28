import PageHero from '@/layouts/PageHero'
import OurStory from '@/features/company/about/OurStory'
import MissionVision from '@/features/company/about/MissionVision'
import Leadership from '@/features/company/about/Leadership'
import TeamCarousel from '@/features/company/about/TeamCarousel'
import CompanyTimeline from '@/features/company/about/CompanyTimeline'
import Awards from '@/features/company/about/Awards'
import Partners from '@/features/company/about/Partners'
import '@/styles/pages/about.css'

export default function About() {
  return (
    <>
      <PageHero
        id="about-hero"
        label="About Svitch Motocorp"
        titleStart={<>Born Electric.<br />Built</>}
        titleHighlight="Different"
        titleEnd="."
        description="We are building India's next-generation electric motorcycle — engineered for real Indian roads, designed with the spirit of a lion, and powered by the future of clean mobility."
      />
      <OurStory />
      <MissionVision />
      <Leadership />
      <TeamCarousel />
      <CompanyTimeline />
      <Awards />
      <Partners />
    </>
  )
}
