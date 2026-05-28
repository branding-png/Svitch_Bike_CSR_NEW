import { createContext, useCallback, useContext, useState } from 'react'

// Global "Book Now" modal state. Any component can call `useBookNow().open()`
// to surface the modal; the modal itself lives once at the root.
const BookNowContext = createContext(null)

export function BookNowProvider({ children }) {
  const [isOpen, setIsOpen] = useState(false)

  const open  = useCallback(() => setIsOpen(true),  [])
  const close = useCallback(() => setIsOpen(false), [])

  return (
    <BookNowContext.Provider value={{ isOpen, open, close }}>
      {children}
    </BookNowContext.Provider>
  )
}

export function useBookNow() {
  const ctx = useContext(BookNowContext)
  if (!ctx) throw new Error('useBookNow must be used inside <BookNowProvider>')
  return ctx
}
