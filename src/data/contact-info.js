// Single source of truth for all Svitch contact details.
// Import from here so we never end up with a stale email or phone in one corner
// of the codebase.
//
// Each entry has:
//   { email | phone (display) | tel (clickable) | label (optional) }

const DOMAIN = 'svitch.bike'

export const EMAILS = {
  // General + sales
  hello:    { address: `hello@${DOMAIN}`,    label: 'General Enquiries' },
  info:     { address: `info@${DOMAIN}`,     label: 'General Information' },
  sales:    { address: `sales@${DOMAIN}`,    label: 'Sales' },

  // Support + ops
  support:  { address: `support@${DOMAIN}`,  label: 'Customer Support' },
  dealers:  { address: `dealers@${DOMAIN}`,  label: 'Dealer Partnerships' },

  // Specialist inboxes
  privacy:        { address: `privacy@${DOMAIN}`,        label: 'Privacy / Data Protection Officer' },
  legal:          { address: `legal@${DOMAIN}`,          label: 'Legal Department' },
  grievance:      { address: `grievance@${DOMAIN}`,      label: 'Grievance Officer' },
  accessibility:  { address: `accessibility@${DOMAIN}`,  label: 'Accessibility Feedback' },

  // Talent + press
  hrhead: { address: `hrhead@${DOMAIN}`, label: 'Careers / HR Head' },
  press:  { address: `press@${DOMAIN}`,  label: 'Press' },
  media:  { address: `media@${DOMAIN}`,  label: 'Media / Editorial' },

  // International
  international: { address: `international@${DOMAIN}`, label: 'International / Fleet Enquiries' },
}

export const PHONES = {
  // Toll-free customer-care line
  tollFree: {
    phone: '+91 1800-123-456',
    tel:   '+911800123456',
    label: 'Toll Free Customer Care',
    hours: 'Mon–Sat · 10:00 – 19:00 IST',
  },
  // Ahmedabad head office
  headOffice: {
    phone: '+91 635 127 2002',
    tel:   '+916351272002',
    label: 'Head Office (Ahmedabad)',
    hours: 'Mon–Sat · 10:00 – 19:00 IST',
  },
  // Sales / orders helpline
  sales: {
    phone: '+91 79 4012 3456',
    tel:   '+917940123456',
    label: 'Sales Helpline',
    hours: 'Mon–Sun · 10:00 – 19:00 IST',
  },
}

// Convenience helpers — keeps render sites short.
export const emailHref = (key) => `mailto:${EMAILS[key].address}`
export const phoneHref = (key) => `tel:${PHONES[key].tel}`

// Inline-node builders for the legal data files' `inline` / `ul` block schemas.
// Returns a single { tag: 'a', ... } token ready to drop into a nodes array.
//
// Example:
//   import { emailNode, phoneNode } from '@/data/contact-info'
//   { type: 'ul', items: [
//     [ { tag: 'strong', text: 'Email:' }, { text: ' ' }, emailNode('privacy') ],
//     [ { tag: 'strong', text: 'Phone:' }, { text: ' ' }, phoneNode('tollFree') ],
//   ] }
export const emailNode = (key, className = 'accent') => {
  const e = EMAILS[key]
  return { tag: 'a', href: `mailto:${e.address}`, className, text: e.address }
}

export const phoneNode = (key, className = 'accent') => {
  const p = PHONES[key]
  return { tag: 'a', href: `tel:${p.tel}`, className, text: p.phone }
}
