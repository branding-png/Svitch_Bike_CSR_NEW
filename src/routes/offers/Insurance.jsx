import PageHero from '@/layouts/PageHero'
import InsurancePlans from '@/features/offers/insurance/InsurancePlans'
import InsuranceFaq from '@/features/offers/insurance/InsuranceFaq'
import '@/styles/pages/insurance.css'

export default function Insurance() {
  return (
    <>
      <PageHero
        id="insurance-hero"
        label="Insurance"
        titleStart={<>Ride Covered.</>}
        titleHighlight="Ride Confident."
        description="Comprehensive insurance plans tailored for electric motorcycles. Buy or renew in 5 minutes — no paperwork, no hassle."
      />

      <InsurancePlans />
      <InsuranceFaq />
    </>
  )
}
