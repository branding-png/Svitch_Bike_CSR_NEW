import { createContext, useCallback, useContext, useEffect, useState } from 'react'

/**
 * @typedef {Object} UserProfile
 * @property {string}  email           — Primary email (also login id).
 * @property {string}  [firstName]
 * @property {string}  [lastName]
 * @property {string}  [name]          — Convenience "First Last".
 * @property {string}  [mobile]        — 10-digit Indian mobile, digits only.
 * @property {string}  [dob]           — ISO YYYY-MM-DD.
 * @property {string}  [gender]
 * @property {string}  [city]
 * @property {('rider'|'admin'|'support')} [role] — For future admin panel.
 * @property {string[]} [permissions]   — Optional fine-grained perms.
 */

const STORAGE_KEY = 'svitchUser'
const UserContext = createContext(null)

// For the demo credentials, backfill any missing profile fields so older
// sessions (signed in before we started storing the full profile shape)
// still see the expected name + mobile across the account pages.
// We also overwrite a `name` that's just the email local-part (e.g. "demo")
// since that's the placeholder the old LoginForm wrote.
function hydrate(profile) {
  if (!profile || profile.email !== 'arjun@svitch.bike') return profile
  const looksLikePlaceholder = !profile.name || profile.name === 'arjun'
  return {
    ...profile,
    firstName: profile.firstName || 'Arjun',
    lastName:  profile.lastName  || 'Rider',
    name:      looksLikePlaceholder ? 'Arjun Rider' : profile.name,
    mobile:    profile.mobile    || '9876543210',
  }
}

export function UserProvider({ children }) {
  const [user, setUser] = useState(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY)
      return hydrate(raw ? JSON.parse(raw) : null)
    } catch {
      return null
    }
  })

  // Persist on every change
  useEffect(() => {
    if (user) localStorage.setItem(STORAGE_KEY, JSON.stringify(user))
    else localStorage.removeItem(STORAGE_KEY)
  }, [user])

  const login = useCallback((profile) => setUser(profile), [])
  const logout = useCallback(() => setUser(null), [])

  return (
    <UserContext.Provider value={{ user, login, logout, isAuthed: Boolean(user) }}>
      {children}
    </UserContext.Provider>
  )
}

export function useUser() {
  const ctx = useContext(UserContext)
  if (!ctx) throw new Error('useUser must be used inside <UserProvider>')
  return ctx
}
