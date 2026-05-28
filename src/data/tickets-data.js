// Sample support tickets shown in the sidebar list.
export const TICKETS = [
  {
    id:       'TKT-2026-1847',
    subject:  'Battery not holding charge',
    status:   'open',
    statusLabel: 'Open',
    updated:  '2 hrs ago',
    priority: 'high',
    priorityLabel: 'High',
    unread:   true,
    category: 'Battery',
    sla:      'Replies in ~4 hrs',
  },
  {
    id:       'TKT-2026-1801',
    subject:  'App pairing failed',
    status:   'pending',
    statusLabel: 'Pending',
    updated:  '2026-05-04',
    priority: 'medium',
    priorityLabel: 'Medium',
  },
  {
    id:       'TKT-2026-1722',
    subject:  'Invoice GSTIN correction',
    status:   'closed',
    statusLabel: 'Closed',
    updated:  '2026-04-28',
    priority: 'low',
    priorityLabel: 'Low',
  },
  {
    id:       'TKT-2026-1611',
    subject:  'Test ride rescheduling',
    status:   'closed',
    statusLabel: 'Closed',
    updated:  '2026-04-12',
    priority: 'low',
    priorityLabel: 'Low',
  },
]

export const TICKET_FILTERS = [
  { id: 'all',     label: 'All' },
  { id: 'open',    label: 'Open' },
  { id: 'pending', label: 'Pending' },
  { id: 'closed',  label: 'Closed' },
]

// Sample conversation threads, keyed by ticket id. `side` is 'them' (the
// ticket owner — shown on the left) or 'you' (the support agent replying).
export const TICKET_THREADS = {
  'TKT-2026-1847': [
    { day: 'May 9, 2026' },
    { side: 'them', sender: 'Arjun', role: 'You',     time: '10:42',
      body: 'My CSR 762 only shows 80% charge after a full overnight charge cycle. Started happening last week. Bike is 14 months old, currently at 8,420 km.' },
    { side: 'you',  sender: 'Priya', role: 'Support', time: '11:28',
      body: "Hi! Sorry to hear that. Could you share a screenshot of the battery health screen in the Svitch app (Settings → Battery → Diagnostics)? Also, are you using the original charger? We'll book a free diagnostic visit if needed." },
    { side: 'them', sender: 'Arjun', role: 'You',     time: '14:15',
      body: 'Attached the screenshot. Yes, original charger always. App shows BMS health 92%, but capacity reads 81%.' },
    { side: 'you',  sender: 'Priya', role: 'Support', time: '14:48',
      bodyHtml: 'Thank you. That\'s an early-degradation flag — the BMS firmware has a known calibration drift. A free battery rebalance has been scheduled at Svitch Ahmedabad on <strong>2026-05-14 at 11:00</strong>. Your warranty covers full replacement if rebalance doesn\'t restore capacity above 90%.' },
  ],
}

export function getThread(id) {
  return TICKET_THREADS[id] || []
}
