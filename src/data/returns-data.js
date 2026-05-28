// Sample returns / replacements for the account/returns page.
// Statuses mirror the legacy page: pending | approved | refunded | rejected
export const RETURNS = [
  {
    id:          'RMA-2026-0148',
    order:       'SVC-2026-04812',
    item:        'CSR Helmet — Matte Black',
    image:       '/images/product/csr-762-black.webp',
    alt:         'CSR Helmet',
    status:      'pending',
    statusLabel: 'Pending Pickup',
    requestedAt: 'Requested: 2026-05-10',
    reason:      'Wrong size — needs XL instead of L',
    action:      { label: 'View Details', icon: 'eye',     kind: 'detail' },
  },
  {
    id:          'RMA-2026-0132',
    order:       'SVC-2026-04580',
    item:        'Spare Battery Pack 2.5kWh',
    image:       '/images/product/csr-762-gray-Swappable-Battery.webp',
    alt:         'Battery pack',
    status:      'approved',
    statusLabel: 'Replacement Shipped',
    requestedAt: 'Approved: 2026-05-08',
    reason:      'Defective on arrival — not charging',
    action:      { label: 'Track Replacement', icon: 'geo-alt', kind: 'track' },
  },
  {
    id:          'RMA-2026-0099',
    order:       'SVC-2026-04201',
    item:        'Riding Gloves — Carbon',
    image:       '/images/product/csr-762-black.webp',
    alt:         'Riding Gloves',
    status:      'refunded',
    statusLabel: 'Refunded',
    requestedAt: 'Refunded: 2026-04-22',
    reason:      'Refunded ₹2,499 to HDFC card •••• 4421',
    action:      { label: 'View Invoice', icon: 'receipt', kind: 'invoice' },
  },
  {
    id:          'RMA-2026-0067',
    order:       'SVC-2026-03988',
    item:        'Universal Phone Mount',
    image:       '/images/product/csr-762-gray-Swappable-Battery.webp',
    alt:         'Phone Mount',
    status:      'rejected',
    statusLabel: 'Rejected',
    requestedAt: 'Rejected: 2026-04-15',
    reason:      'Rejected: Return window (7 days) exceeded',
    action:      { label: 'Appeal', icon: 'headset', kind: 'appeal' },
  },
]

export const RETURN_TABS = [
  { id: 'all',      label: 'All' },
  { id: 'pending',  label: 'Pending' },
  { id: 'approved', label: 'Approved' },
  { id: 'refunded', label: 'Refunded' },
  { id: 'rejected', label: 'Rejected' },
]

// Helper: build counts per tab for badge text — `{ all: 4, pending: 1, ... }`.
export function countByStatus(rows) {
  const by = rows.reduce((acc, r) => ({ ...acc, [r.status]: (acc[r.status] || 0) + 1 }), {})
  return { all: rows.length, ...by }
}
