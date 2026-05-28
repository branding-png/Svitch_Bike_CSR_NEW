import PageHero from '@/layouts/PageHero'
import PaymentFailedCard from '@/features/shop/payment-failed/PaymentFailedCard'
import '@/styles/pages/shop.css'
import '@/styles/pages/payment.css'

export default function PaymentFailed() {
  return (
    <>
      <PageHero
        id="payment-failed-hero"
        label="Payment Status"
        titleStart={<>Payment </>}
        titleHighlight="Failed"
        description="We couldn't process your transaction. Don't worry — your cart is safe."
      />

      <section id="fail-main">
        <div className="container">
          <PaymentFailedCard orderRef="SVC-2026-04812" />
        </div>
      </section>
    </>
  )
}
