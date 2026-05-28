import PageHero from '@/layouts/PageHero'
import TradeInProcess from '@/features/offers/trade-in/TradeInProcess'
import TradeInValuation from '@/features/offers/trade-in/TradeInValuation'
import '@/styles/pages/trade-in.css'

export default function TradeIn() {
  return (
    <>
      <PageHero
        id="trade-in-hero"
        label="Old Bike Exchange"
        titleStart={<>Trade In.</>}
        titleHighlight="Save Up To ₹15,000."
        description="Tell us about your current bike, get an instant valuation in 60 seconds, and have it credited toward your CSR 762 purchase."
      />

      <TradeInProcess />
      <TradeInValuation />
    </>
  )
}
