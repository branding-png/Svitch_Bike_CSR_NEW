// Small helpers for masking PII in the UI (2FA screens, profile cards…).

// "9876543210"        → "+91 ••••• 43210"
// "+91 98765 43210"   → "+91 ••••• 43210"
export function maskPhone(mobile) {
  if (!mobile) return '+91 ••••• •••••'
  const digits = String(mobile).replace(/\D/g, '').slice(-10)
  if (digits.length < 5) return '+91 ••••• •••••'
  return `+91 ••••• ${digits.slice(-5)}`
}

// "arjun@svitch.bike" → "ar***@svitch.bike"
export function maskEmail(email = '') {
  const [local, domain] = email.split('@')
  if (!domain) return email
  const visible = local.slice(0, 2)
  return `${visible}${'*'.repeat(Math.max(0, local.length - 2))}@${domain}`
}
