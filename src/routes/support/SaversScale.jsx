import PageHero from '@/layouts/PageHero'
import SaversStats         from '@/features/support/savers-scale/SaversStats'
import SaversCalculator    from '@/features/support/savers-scale/SaversCalculator'
import EnvironmentalImpact from '@/features/support/savers-scale/EnvironmentalImpact'
import EvVsPetrol          from '@/features/support/savers-scale/EvVsPetrol'
import SaversCta           from '@/features/support/savers-scale/SaversCta'
import '@/styles/pages/savers-scale.css'

export default function SaversScale() {
  return (
    <>
      <PageHero
        id="savers-scale-hero"
        className="pb-5"
        label="Cost Calculator"
        titleStart={<>Saver&apos;s </>}
        titleHighlight="Scale"
        description="See exactly how much you save with the CSR 762 compared to a petrol bike. Enter your real commute and local rates — numbers update live."
      />

      <SaversStats />
      <SaversCalculator />
      <EnvironmentalImpact />
      <EvVsPetrol />
      <SaversCta />
    </>
  )
}
