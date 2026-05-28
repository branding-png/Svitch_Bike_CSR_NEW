import { createContext, useCallback, useContext, useMemo } from 'react'
import { useLocalStorage } from '@/hooks/useLocalStorage'

// Cart state — persisted to localStorage under 'svitchCart'.
// Shape: [{ id, name, price, image, qty, variant?, color? }, ...]
const CartContext = createContext(null)

export function CartProvider({ children }) {
  const [items, setItems] = useLocalStorage('svitchCart', [])

  const addItem = useCallback((product, qty = 1) => {
    setItems((prev) => {
      const idx = prev.findIndex(
        (it) => it.id === product.id && it.variant === product.variant && it.color === product.color
      )
      if (idx >= 0) {
        const next = prev.slice()
        next[idx] = { ...next[idx], qty: next[idx].qty + qty }
        return next
      }
      return [...prev, { ...product, qty }]
    })
  }, [setItems])

  const removeItem = useCallback((id, variant, color) => {
    setItems((prev) =>
      prev.filter((it) => !(it.id === id && it.variant === variant && it.color === color))
    )
  }, [setItems])

  const updateQty = useCallback((id, qty, variant, color) => {
    setItems((prev) => {
      if (qty <= 0) {
        return prev.filter((it) => !(it.id === id && it.variant === variant && it.color === color))
      }
      return prev.map((it) =>
        it.id === id && it.variant === variant && it.color === color ? { ...it, qty } : it
      )
    })
  }, [setItems])

  const clear = useCallback(() => setItems([]), [setItems])

  const { count, subtotal } = useMemo(() => {
    let count = 0
    let subtotal = 0
    for (const it of items) {
      count += it.qty
      subtotal += (Number(it.price) || 0) * it.qty
    }
    return { count, subtotal }
  }, [items])

  const value = useMemo(
    () => ({ items, addItem, removeItem, updateQty, clear, count, subtotal }),
    [items, addItem, removeItem, updateQty, clear, count, subtotal]
  )

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>
}

export function useCart() {
  const ctx = useContext(CartContext)
  if (!ctx) throw new Error('useCart must be used inside <CartProvider>')
  return ctx
}
