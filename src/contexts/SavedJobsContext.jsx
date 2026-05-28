import { createContext, useCallback, useContext, useMemo } from 'react'
import { useLocalStorage } from '@/hooks/useLocalStorage'
import { SAVED_JOBS as SEED } from '@/data/saved-jobs-data'

// Saved-jobs state — persisted to localStorage under 'svitchSavedJobs'.
// Shape: [{ id, slug, title, dept, location, type, experience, savedOn, applyBy }]
//
// Used by:
//   • /account/saved-jobs   — CRUD UI (remove)
//   • /careers              — listing cards show "Saved" status + bookmark toggle
const STORAGE_KEY = 'svitchSavedJobs'
const SavedJobsContext = createContext(null)

function todayISO() {
  return new Date().toISOString().slice(0, 10)
}

export function SavedJobsProvider({ children }) {
  const [jobs, setJobs] = useLocalStorage(STORAGE_KEY, SEED)

  const has = useCallback(
    (slug) => jobs.some((j) => j.slug === slug),
    [jobs],
  )

  const add = useCallback((job) => {
    setJobs((prev) => {
      if (prev.some((j) => j.slug === job.slug)) return prev
      return [
        ...prev,
        {
          id:        `sj-${job.slug}`,
          slug:      job.slug,
          title:     job.title,
          dept:      job.deptLabel || job.dept,
          location:  job.location,
          type:      job.type,
          experience:job.exp || job.experience || '',
          savedOn:   todayISO(),
          applyBy:   job.applyBy || 'See posting',
        },
      ]
    })
  }, [setJobs])

  const remove = useCallback((slugOrId) => {
    setJobs((prev) => prev.filter((j) => j.slug !== slugOrId && j.id !== slugOrId))
  }, [setJobs])

  const toggle = useCallback((job) => {
    setJobs((prev) => {
      if (prev.some((j) => j.slug === job.slug)) {
        return prev.filter((j) => j.slug !== job.slug)
      }
      return [
        ...prev,
        {
          id:        `sj-${job.slug}`,
          slug:      job.slug,
          title:     job.title,
          dept:      job.deptLabel || job.dept,
          location:  job.location,
          type:      job.type,
          experience:job.exp || job.experience || '',
          savedOn:   todayISO(),
          applyBy:   job.applyBy || 'See posting',
        },
      ]
    })
  }, [setJobs])

  const value = useMemo(
    () => ({ jobs, count: jobs.length, has, add, remove, toggle }),
    [jobs, has, add, remove, toggle],
  )

  return <SavedJobsContext.Provider value={value}>{children}</SavedJobsContext.Provider>
}

export function useSavedJobs() {
  const ctx = useContext(SavedJobsContext)
  if (!ctx) throw new Error('useSavedJobs must be used inside <SavedJobsProvider>')
  return ctx
}
