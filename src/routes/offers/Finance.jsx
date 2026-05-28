import PageHero from '@/layouts/PageHero'
import EmiCalculator from '@/features/offers/finance/EmiCalculator'
import '@/styles/pages/finance.css'

export default function Finance() {
  return (
    <>
      <PageHero
        id="finance-hero"
        label="Finance & EMI"
        titleStart={<>Own It on</>}
        titleHighlight="Easy EMI"
        description="Calculate your monthly payment, total interest, and total payable amount. Pre-approved loans from 15+ banks with 0% processing fee."
      />

      <EmiCalculator />
    </>
  )
}
