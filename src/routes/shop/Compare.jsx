import PageHero from '@/layouts/PageHero'
import CompareSummary from '@/features/shop/compare/CompareSummary'
import CompareTable   from '@/features/shop/compare/CompareTable'
import CompareCta     from '@/features/shop/compare/CompareCta'
import '@/styles/pages/compare.css'

export default function Compare() {
  return (
    <>
      <PageHero
        id="compare-hero"
        label="Side-by-Side"
        titleStart={<>Compare the </>}
        titleHighlight="CSR 762"
        description="See how the CSR 762 stacks up against petrol bikes and rival EVs — performance, cost, charging, smart features."
      />

      <section id="compare-main" className="section-pad com-sec">
        <div className="container">
          <CompareSummary />
          <CompareTable />
          <CompareCta />
        </div>
      </section>
    </>
  )
}
