import OrderSuccessHero from '@/features/shop/order-confirmation/OrderSuccessHero'
import CheckoutProgress from '@/features/shop/cart/CheckoutProgress'
import OrderShippingPayment from '@/features/shop/order-confirmation/OrderShippingPayment'
import OrderSummaryCard from '@/features/shop/order-confirmation/OrderSummaryCard'
import OrderActions from '@/features/shop/order-confirmation/OrderActions'
import '@/styles/pages/shop.css'
import '@/styles/sections/account.css'

export default function OrderConfirmation() {
  return (
    <>
      <OrderSuccessHero customer="Arjun" orderNo="#SVT-847291" />

      <section className="section-pad pt-2">
        <div className="container" style={{ maxWidth: 880 }}>
          <CheckoutProgress step={3} />
          <OrderSummaryCard />
          <OrderShippingPayment />
          <OrderActions orderId="SVT-847291" />
        </div>
      </section>
    </>
  )
}
