import { createContext, useCallback, useContext, useMemo } from 'react'
import { useLocalStorage } from '@/hooks/useLocalStorage'
import { useCart } from './CartContext'

// Wishlist state — persisted to localStorage under 'svitchWishlist'.
// Shape: [{ id, name, price, image, ... }]
const WishlistContext = createContext(null)

export function WishlistProvider({ children }) {
  const [items, setItems] = useLocalStorage('svitchWishlist', [])
  const { addItem: addToCartItem } = useCart()

  const add = useCallback((product) => {
    setItems((prev) => (prev.some((it) => it.id === product.id) ? prev : [...prev, product]))
  }, [setItems])

  const remove = useCallback((id) => {
    setItems((prev) => prev.filter((it) => it.id !== id))
  }, [setItems])

  const toggle = useCallback((product) => {
    setItems((prev) =>
      prev.some((it) => it.id === product.id)
        ? prev.filter((it) => it.id !== product.id)
        : [...prev, product]
    )
  }, [setItems])

  const has = useCallback(
    (id) => items.some((it) => it.id === id),
    [items]
  )

  // Atomic operation: add to cart and remove from wishlist in one go
  // (matches the "Move to Cart" behaviour from the static wishlist page).
  const moveToCart = useCallback((product, qty = 1) => {
    addToCartItem(product, qty)
    setItems((prev) => prev.filter((it) => it.id !== product.id))
  }, [addToCartItem, setItems])

  const clear = useCallback(() => setItems([]), [setItems])

  const value = useMemo(
    () => ({ items, count: items.length, add, remove, toggle, has, moveToCart, clear }),
    [items, add, remove, toggle, has, moveToCart, clear]
  )

  return <WishlistContext.Provider value={value}>{children}</WishlistContext.Provider>
}

export function useWishlist() {
  const ctx = useContext(WishlistContext)
  if (!ctx) throw new Error('useWishlist must be used inside <WishlistProvider>')
  return ctx
}
