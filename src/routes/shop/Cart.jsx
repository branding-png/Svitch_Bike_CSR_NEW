import PageHero from '@/layouts/PageHero'
import { BreadCrumb } from '@/ui'
import CheckoutProgress from '@/features/shop/cart/CheckoutProgress'
import CartTable        from '@/features/shop/cart/CartTable'
import CartSummary      from '@/features/shop/cart/CartSummary'
import CartEmpty        from '@/features/shop/cart/CartEmpty'
import { useCart } from '@/contexts/CartContext'
import { PATHS } from '@/utils/routes'
import '@/styles/pages/shop.css'

export default function Cart() {
  const { items } = useCart()

  return (
    <>
      <PageHero
        id="cart-hero"
        className="grad-tc"
        label={
          <>
           <BreadCrumb
            items={[
              { label: 'Home', to: PATHS.home },
              { label: 'Shop', to: PATHS.shop },
              { label: 'Cart' },
            ]}
          />
          </>
        }
        titleStart={<>Your </>}
        titleHighlight="Cart"
        description="Review your selection, apply a coupon, and head to secure checkout."
      />

      <section id="cart-main" className="section-pad">
        <div className="container">
         
          <CheckoutProgress step={0} />

          {items.length > 0 ? (
            <div className="cart-layout" id="cartWithItems">
              <CartTable />
              <CartSummary />
            </div>
          ) : (
            <CartEmpty />
          )}
        </div>
      </section>
    </>
  )
}
