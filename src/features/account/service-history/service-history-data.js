// Sample data for the account/service-history page.

export const SERVICE_STATS = [
  { value: '6',       label: 'Total Services' },
  { value: '8,420',   label: 'KM Logged' },
  { value: '₹4,150',  label: 'Spent on Service' },
  { value: '2.5',     label: 'Years Owned' },
]

export const NEXT_SERVICE = {
  title:       'Next Service Due',
  description: '10,000 KM checkup at Svitch Ahmedabad — recommended by',
  due:         '2026-06-15',
  kmAway:      '1,580 km',
}

export const SERVICE_ENTRIES = [
  {
    title:    '5,000 KM Major Service',
    when:     '2026-02-18',
    center:   'Svitch Ahmedabad',
    tech:     'Vikram S.',
    cost:     { label: '₹1,250', accent: 'accent' },
    summary:  'Battery health check, brake pad inspection, software update v2.4.1, chain cleaning and lubrication. All systems nominal.',
    parts:    ['Brake fluid top-up', 'Software v2.4.1', 'Chain lube'],
  },
  {
    title:    'Tyre Replacement (Rear)',
    when:     '2025-11-08',
    center:   'Svitch Pune',
    tech:     'Anjali M.',
    cost:     { label: '₹2,200', accent: 'accent' },
    summary:  'Rear tyre replaced due to wear at 4,200 km. Tyre pressure calibrated, balancing redone.',
    parts:    ['MRF Zapper-FY 110/80-17', 'Wheel balance'],
  },
  {
    title:    '1,000 KM First Service',
    when:     '2025-04-12',
    center:   'Svitch Ahmedabad',
    tech:     'Rohan K.',
    cost:     { label: 'Free (Warranty)', accent: 'free' },
    summary:  'Mandatory first service. Bolts torqued, electrical connections inspected, battery firmware updated.',
    parts:    ['Bolt torque check', 'BMS firmware'],
  },
  {
    title:    'Pre-Delivery Inspection',
    when:     '2024-09-20',
    center:   'Svitch Ahmedabad',
    tech:     'Rohan K.',
    cost:     { label: 'Included', accent: 'free' },
    summary:  'Standard 27-point PDI completed before customer delivery.',
    parts:    [],
  },
]
