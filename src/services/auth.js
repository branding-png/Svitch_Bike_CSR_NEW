// Auth service — single seam between UI and the backend.
//
// Behaviour:
//   • If VITE_API_BASE is set in the environment, every function POSTs to
//     `${VITE_API_BASE}/auth/<endpoint>` and returns the parsed response.
//   • Otherwise it falls back to the local mocks below so the demo flows
//     keep working without a server.
//
// Every function resolves to `{ ok, data?, error?, fieldErrors? }`.
//   • ok=true  → use `data`
//   • ok=false → render `error` (banner) and/or `fieldErrors` (per-field)
//
import { mockDelay } from '@/utils/mockDelay'

const API_BASE = import.meta?.env?.VITE_API_BASE || ''
const USE_API  = Boolean(API_BASE)

const DEMO_EMAIL    = 'arjun@svitch.bike'
const DEMO_PASSWORD = 'svitch2026'

const DEMO_PROFILE = {
  email:     DEMO_EMAIL,
  firstName: 'Arjun',
  lastName:  'Rider',
  name:      'Arjun Rider',
  mobile:    '9876543210',
  role:      'rider',
}

function ok(data)                 { return { ok: true, data } }
function fail(error, fieldErrors) { return { ok: false, error, fieldErrors } }

// ─── Real-API helpers ───────────────────────────────────────────────────
// Reads bearer token from localStorage (set by TwoFactorCard after a
// successful login). Returns the same `{ ok, data, error, fieldErrors }`
// shape as the mocks so callers don't have to branch.
async function apiPost(endpoint, body) {
  try {
    const token = (typeof localStorage !== 'undefined')
      ? localStorage.getItem('svitchAuthToken')
      : null
    const res = await fetch(`${API_BASE}${endpoint}`, {
      method:  'POST',
      headers: {
        'Content-Type': 'application/json',
        ...(token ? { Authorization: `Bearer ${token}` } : {}),
      },
      body: JSON.stringify(body ?? {}),
    })
    let json = null
    try { json = await res.json() } catch {}
    if (!res.ok) {
      return fail(json?.error || res.statusText || 'Request failed', json?.fieldErrors)
    }
    return ok(json?.data ?? json ?? {})
  } catch (err) {
    return fail(err?.message || 'Network error')
  }
}

async function apiGet(endpoint) {
  try {
    const res = await fetch(`${API_BASE}${endpoint}`, { method: 'GET' })
    let json = null
    try { json = await res.json() } catch {}
    if (!res.ok) {
      return fail(json?.error || res.statusText || 'Request failed', json?.fieldErrors)
    }
    return ok(json?.data ?? json ?? {})
  } catch (err) {
    return fail(err?.message || 'Network error')
  }
}

// ─── Sign In ────────────────────────────────────────────────────────────
export async function signIn({ email, password }) {
  if (USE_API) return apiPost('/auth/login', { email, password })

  await mockDelay()
  if (email === DEMO_EMAIL && password === DEMO_PASSWORD) {
    return ok({ profile: DEMO_PROFILE, twoFactorToken: 'tf-demo' })
  }
  return fail('Invalid email or password.', { password: 'Wrong password' })
}

// ─── Two-Factor ─────────────────────────────────────────────────────────
export async function verifyTwoFactor({ twoFactorToken, code }) {
  if (USE_API) return apiPost('/auth/2fa', { twoFactorToken, code })

  await mockDelay(1000)
  if (code === '123456' || /^\d{6}$/.test(code)) {
    return ok({ profile: DEMO_PROFILE, authToken: 'jwt-demo' })
  }
  return fail("That code didn't match. Try again.", { code: 'Invalid code' })
}

// ─── Register ───────────────────────────────────────────────────────────
export async function register(profile) {
  if (USE_API) return apiPost('/auth/register', profile)

  await mockDelay()
  if (profile.email === DEMO_EMAIL) {
    return fail('That email is already registered.', { email: 'Already in use' })
  }
  return ok({
    profile: {
      ...DEMO_PROFILE,
      email:     profile.email,
      firstName: profile.firstName,
      lastName:  profile.lastName,
      name:      `${profile.firstName} ${profile.lastName}`.trim(),
      mobile:    profile.mobile,
    },
    verifyToken: 'verify-demo-token-1234567890',
  })
}

// ─── Email Verification ─────────────────────────────────────────────────
export async function verifyEmail(token) {
  if (USE_API) return apiGet(`/auth/verify?token=${encodeURIComponent(token)}`)

  await mockDelay(800)
  if (!token) return fail('Missing token.')
  if (/^[A-Za-z0-9_-]{16,}$/.test(token)) return ok({ verified: true })
  return fail('Verification link expired or already used.')
}

// ─── Forgot / Reset Password ────────────────────────────────────────────
export async function requestPasswordOtp(email) {
  if (USE_API) return apiPost('/auth/forgot', { email })

  await mockDelay()
  if (!/^\S+@\S+\.\S+$/.test(email)) return fail('Invalid email address.')
  return ok({ otpToken: 'otp-demo', sent: true })
}

export async function verifyPasswordOtp({ otpToken, code }) {
  if (USE_API) return apiPost('/auth/otp', { otpToken, code })

  await mockDelay()
  if (code && /^\d{6}$/.test(code)) return ok({ resetToken: 'reset-demo' })
  return fail("That code didn't match.", { code: 'Invalid code' })
}

export async function resetPassword({ resetToken, password }) {
  if (USE_API) return apiPost('/auth/reset', { resetToken, password })

  await mockDelay()
  if (!resetToken) return fail('Reset link expired.')
  if (!password || password.length < 8) return fail('Password too short.', { password: 'Min 8 characters' })
  return ok({ reset: true })
}

// ─── Sign Out ───────────────────────────────────────────────────────────
export async function signOut() {
  if (USE_API) return apiPost('/auth/logout', {})

  await mockDelay(200)
  return ok({})
}
