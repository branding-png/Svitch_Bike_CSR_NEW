import { createContext, useCallback, useContext, useMemo } from 'react'
import { useLocalStorage } from '@/hooks/useLocalStorage'

// Saved shipping addresses — persisted to localStorage under 'svitchAddresses'.
// Shape: [{ id, label: 'Home'|'Work'|'Other', name, line1, line2?, city, state, pincode, phone, isDefault }]
//
// Used by:
//   • /account/addresses  – CRUD UI
//   • /shop/checkout      – pre-selects the default address for the form

const STORAGE_KEY = 'svitchAddresses'
const AddressContext = createContext(null)

const SEED = [
  {
    id:        'addr-home',
    label:     'Home',
    name:      'Arjun Rider',
    line1:     'A-410, Stellar Sindhu Bhavan Road',
    line2:     'Bodakdev',
    city:      'Ahmedabad',
    state:     'Gujarat',
    pincode:   '380054',
    country:   'India',
    phone:     '+91 98765 43210',
    isDefault: true,
  },
  {
    id:        'addr-work',
    label:     'Work',
    name:      'Arjun Rider',
    line1:     '203, Manek Complex, CG Road',
    line2:     'Navrangpura',
    city:      'Ahmedabad',
    state:     'Gujarat',
    pincode:   '380009',
    country:   'India',
    phone:     '+91 98765 43210',
    isDefault: false,
  },
]

function newId() {
  return `addr-${Date.now().toString(36)}-${Math.floor(Math.random() * 1e4).toString(36)}`
}

export function AddressProvider({ children }) {
  const [addresses, setAddresses] = useLocalStorage(STORAGE_KEY, SEED)

  const upsert = useCallback((draft) => {
    setAddresses((prev) => {
      const next = draft.id
        ? prev.map((a) => (a.id === draft.id ? { ...a, ...draft } : a))
        : [...prev, { ...draft, id: newId(), isDefault: prev.length === 0 }]
      // Guarantee exactly one default if any exist
      const hasDefault = next.some((a) => a.isDefault)
      if (!hasDefault && next.length) next[0] = { ...next[0], isDefault: true }
      return next
    })
  }, [setAddresses])

  const remove = useCallback((id) => {
    setAddresses((prev) => {
      const next = prev.filter((a) => a.id !== id)
      const hasDefault = next.some((a) => a.isDefault)
      if (!hasDefault && next.length) next[0] = { ...next[0], isDefault: true }
      return next
    })
  }, [setAddresses])

  const makeDefault = useCallback((id) => {
    setAddresses((prev) => prev.map((a) => ({ ...a, isDefault: a.id === id })))
  }, [setAddresses])

  const getDefault = useCallback(
    () => addresses.find((a) => a.isDefault) || addresses[0] || null,
    [addresses],
  )

  const value = useMemo(
    () => ({ addresses, upsert, remove, makeDefault, getDefault }),
    [addresses, upsert, remove, makeDefault, getDefault],
  )

  return <AddressContext.Provider value={value}>{children}</AddressContext.Provider>
}

export function useAddresses() {
  const ctx = useContext(AddressContext)
  if (!ctx) throw new Error('useAddresses must be used inside <AddressProvider>')
  return ctx
}
