import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useUser } from '@/contexts/UserContext'
import { PATHS } from '@/utils/routes'

// If the user is already signed in, bounce them away from guest-only pages
// (Login, Register, VerifyEmail, etc.) to their dashboard.
//
//   useAuthRedirect()                 — default redirect → /account/dashboard
//   useAuthRedirect('/checkout')      — custom destination
export function useAuthRedirect(to = PATHS.dashboard) {
  const { isAuthed } = useUser()
  const navigate = useNavigate()

  useEffect(() => {
    if (isAuthed) navigate(to, { replace: true })
  }, [isAuthed, navigate, to])
}
