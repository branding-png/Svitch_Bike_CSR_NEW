import PageHero from '@/layouts/PageHero'
import WarrantyCoverage from '@/features/support/warranty/WarrantyCoverage'
import WarrantyScope    from '@/features/support/warranty/WarrantyScope'
import WarrantyClaim    from '@/features/support/warranty/WarrantyClaim'
import WarrantyRegister from '@/features/support/warranty/WarrantyRegister'
import '@/styles/pages/warranty.css'

export default function Warranty() {
  return (
    <>
      <PageHero
        id="warranty-hero"
        label="Peace Of Mind"
        titleStart={<>Svitch Bike </>}
        titleHighlight="Warranty"
        description="Industry-leading 3-year coverage on vehicle, battery, and motor. 500+ service centres, doorstep pickup, and a transparent claim process that respects your time."
      />

      <WarrantyCoverage />
      <WarrantyScope />
      <WarrantyClaim />
      <WarrantyRegister />
    </>
  )
}
