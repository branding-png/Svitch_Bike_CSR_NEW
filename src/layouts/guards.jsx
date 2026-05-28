import { Navigate, useLocation } from 'react-router-dom'
import { useUser } from '@/contexts/UserContext'
import { PATHS } from '@/utils/routes'

// AuthGuard — wrap children that require the user to be signed in.
// Use as a route element:  element={<AuthGuard><Dashboard /></AuthGuard>}
//
// On bounce, the original path is forwarded via location state so Login can
// send the user back where they were trying to go.
export function AuthGuard({ children }) {
  const { isAuthed } = useUser()
  const location = useLocation()

  if (!isAuthed) {
    return <Navigate to={PATHS.login} replace state={{ from: location.pathname }} />
  }
  return children
}

// GuestGuard — wrap children that are only useful when NOT signed in
// (Login, Register, the password-reset flow, etc.).
export function GuestGuard({ children, to = PATHS.dashboard }) {
  const { isAuthed } = useUser()
  if (isAuthed) return <Navigate to={to} replace />
  return children
}
