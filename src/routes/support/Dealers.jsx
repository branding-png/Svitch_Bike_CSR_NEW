import { useState } from 'react'
import PageHero from '@/layouts/PageHero'
import DealerStats           from '@/features/support/dealers/DealerStats'
import DealerFinder          from '@/features/support/dealers/DealerFinder'
import BusinessOpportunities from '@/features/support/dealers/BusinessOpportunities'
import BecomeDealerCta       from '@/features/support/dealers/BecomeDealerCta'
import DealerApplyModal      from '@/features/support/dealers/DealerApplyModal'
import '@/styles/pages/shop.css'
import '@/styles/pages/dealers.css'

export default function Dealers() {
  const [applyOpen, setApplyOpen] = useState(false)

  return (
    <>
      <PageHero
        id="dealers-hero"
        className="pb-5"
        label="Dealership Network"
        titleStart={<>Find A </>}
        titleHighlight="Dealer"
        description="500+ service centres. 10+ flagship experience stores across India. Find your nearest Svitch dealer, book a test ride, and ride home the CSR 762 today."
      />

      <DealerStats />
      <DealerFinder />
      <BusinessOpportunities />
      <BecomeDealerCta onApply={() => setApplyOpen(true)} />

      <DealerApplyModal open={applyOpen} onClose={() => setApplyOpen(false)} />
    </>
  )
}
