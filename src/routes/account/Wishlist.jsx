import { useState } from 'react'
import AccountLayout    from '@/features/account/AccountLayout'
import AccountContent   from '@/features/account/AccountContent'
import WishlistActions  from '@/features/account/wishlist/WishlistActions'
import WishlistToolbar  from '@/features/account/wishlist/WishlistToolbar'
import WishlistGrid     from '@/features/account/wishlist/WishlistGrid'
import WishlistEmpty    from '@/features/account/wishlist/WishlistEmpty'
import { WISHLIST_ITEMS } from '@/features/account/wishlist/wishlist-data'
import { useToast } from '@/contexts/ToastContext'
import '@/styles/sections/account.css'

export default function Wishlist() {
  const { show } = useToast()
  const [items, setItems] = useState(WISHLIST_ITEMS)

  function remove(product) {
    setItems((list) => list.filter((p) => p.id !== product.id))
    show(`Removed "${product.name}" from your wishlist.`, 'success', 2500)
  }

  function moveToCart(product) {
    setItems((list) => list.filter((p) => p.id !== product.id))
    show(`Moved "${product.name}" to cart.`, 'success', 3000)
  }

  function notify(product) {
    show(`We'll email you when "${product.name}" is back in stock.`, 'info', 3500)
  }

  function clearAll() {
    if (!items.length) return
    if (window.confirm('Remove all items from your wishlist?')) {
      setItems([])
      show('Wishlist cleared.', 'success', 2500)
    }
  }

  return (
    <AccountLayout>
      <AccountContent
        crumbLabel="My Wishlist"
        title="My Wishlist"
        description="Save favorites now, buy them later."
        actions={<WishlistActions items={items} />}
      >
        {items.length === 0 ? (
          <WishlistEmpty />
        ) : (
          <>
            <WishlistToolbar count={items.length} onClear={clearAll} />
            <WishlistGrid
              items={items}
              onRemove={remove}
              onMoveToCart={moveToCart}
              onNotify={notify}
            />
          </>
        )}
      </AccountContent>
    </AccountLayout>
  )
}
