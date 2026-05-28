import { useCallback, useEffect, useState } from 'react'

// JSON-aware localStorage hook with cross-tab sync.
// Same surface as useState — pass a default, get [value, setValue].
export function useLocalStorage(key, defaultValue) {
  const [value, setValue] = useState(() => {
    try {
      const raw = localStorage.getItem(key)
      return raw == null ? defaultValue : JSON.parse(raw)
    } catch {
      return defaultValue
    }
  })

  useEffect(() => {
    try {
      if (value === undefined) localStorage.removeItem(key)
      else localStorage.setItem(key, JSON.stringify(value))
    } catch { /* quota / private mode — ignore */ }
  }, [key, value])

  // Cross-tab sync (storage event only fires in OTHER tabs)
  useEffect(() => {
    function onStorage(e) {
      if (e.key !== key) return
      try { setValue(e.newValue == null ? defaultValue : JSON.parse(e.newValue)) }
      catch { /* ignore parse errors */ }
    }
    window.addEventListener('storage', onStorage)
    return () => window.removeEventListener('storage', onStorage)
    // defaultValue intentionally excluded — only re-bind on key change
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [key])

  const reset = useCallback(() => setValue(defaultValue), [defaultValue])

  return [value, setValue, reset]
}
