// Shipping Policy content — single source of truth.
// Block-based schema documented in src/features/legal/LegalBlocks.jsx.
// Contact addresses come from @/data/contact-info.
import { emailNode, phoneNode } from './contact-info'

const SHIPPING_POLICY_SECTIONS = [
  {
    id:    'legal-overview',
    num:   '01',
    title: 'Overview',
    blocks: [
      { type: 'p', text: 'This policy explains how Svitch Motocorp ships the CSR 762 (and accessories) to you — where we deliver, how long it takes, what it costs, how to track your order, and what to do if something goes wrong in transit.' },
      { type: 'callout', icon: 'bi-truck', text: 'Every CSR 762 ships fully assembled, fully charged, and is hand-delivered with a 20-minute walk-through of controls, dashboard, and the rider app.' },
    ],
  },
  {
    id:    'legal-coverage',
    num:   '02',
    title: 'Coverage Areas',
    blocks: [
      { type: 'p', text: 'We currently deliver to 200+ Indian cities across three service zones. Enter your PIN code at checkout to see exact serviceability for your address.' },
      { type: 'table',
        headers: ['Zone', 'Cities Covered', 'Examples'],
        rows: [
          [ [ { tag: 'strong', text: 'Zone A' } ], 'Tier-1 metros',          'Mumbai, Delhi NCR, Bengaluru, Hyderabad, Chennai, Pune, Ahmedabad, Kolkata' ],
          [ [ { tag: 'strong', text: 'Zone B' } ], 'Tier-2 cities',          'Indore, Jaipur, Surat, Vadodara, Coimbatore, Lucknow, Kochi, Chandigarh' ],
          [ [ { tag: 'strong', text: 'Zone C' } ], 'Tier-3 and smaller',     'Most district HQs + major towns. Premium freight may apply.' ],
        ],
      },
      { type: 'callout', icon: 'bi-exclamation-triangle-fill', text: 'Some remote and restricted areas (Andaman & Nicobar, parts of NE India, J&K beyond Srinagar) currently require special freight. Our team will quote separately for those orders.' },
    ],
  },
  {
    id:    'legal-timelines',
    num:   '03',
    title: 'Delivery Timelines',
    blocks: [
      { type: 'p', text: 'Time-from-payment to delivery, after PDI clearance:' },
      { type: 'table',
        headers: ['Zone', 'CSR 762 (Bike)', 'Accessories'],
        rows: [
          [ [ { tag: 'strong', text: 'Zone A' } ], '7–14 days',  '3–5 days'  ],
          [ [ { tag: 'strong', text: 'Zone B' } ], '14–21 days', '5–7 days'  ],
          [ [ { tag: 'strong', text: 'Zone C' } ], '21–30 days', '7–10 days' ],
        ],
      },
      { type: 'inline', nodes: [
        { text: 'These windows are ' },
        { tag: 'strong', text: 'business days only' },
        { text: ' and exclude national holidays. Festive seasons (Diwali, end of FY) can add 2–4 days of slack.' },
      ] },
    ],
  },
  {
    id:    'legal-charges',
    num:   '04',
    title: 'Shipping Charges',
    blocks: [
      { type: 'p', text: 'Transparent, flat-rate freight — no surprise charges at checkout.' },
      { type: 'ul', items: [
        [ { tag: 'strong', text: 'Bikes — Zone A:' }, { text: ' free (included in on-road price).' } ],
        [ { tag: 'strong', text: 'Bikes — Zone B:' }, { text: ' ₹ 2,500 flat freight.' } ],
        [ { tag: 'strong', text: 'Bikes — Zone C:' }, { text: ' ₹ 4,500 flat freight (₹ 6,500 for special remote PINs).' } ],
        [ { tag: 'strong', text: 'Accessories:' }, { text: ' ₹ 499 below ₹ 5,000 order value. Free above.' } ],
      ] },
      { type: 'callout', icon: 'bi-info-circle-fill', text: "Government registration fees (RTO, road tax, insurance) are billed separately and are not part of shipping charges — they're paid at the state RTO." },
    ],
  },
  {
    id:    'legal-handover',
    num:   '05',
    title: 'White-Glove Handover',
    blocks: [
      { type: 'p', text: 'Every Svitch delivery is hand-driven by a trained delivery executive — not a third-party courier. The handover includes:' },
      { type: 'ul', items: [
        'Visual inspection of the bike with you at the door.',
        'Mandatory PDI (Pre-Delivery Inspection) checklist signed off by both parties.',
        '20-minute walk-through of dashboard, controls, riding modes, regen settings.',
        'Pairing your phone with the rider app and a test ride around the block.',
        'Handover of all paperwork: invoice, warranty card, registration packet, RC docs (if pre-paid).',
      ] },
      { type: 'h3', text: 'Slot Confirmation' },
      { type: 'p', text: "Our logistics team calls you 24–48 hours before delivery to confirm a 2-hour slot. You can reschedule once at no charge; further reschedules within the same delivery cycle may attract a re-attempt fee of ₹ 750." },
    ],
  },
  {
    id:    'legal-tracking',
    num:   '06',
    title: 'Tracking Your Order',
    blocks: [
      { type: 'p', text: 'You can track your order at every stage:' },
      { type: 'ol', items: [
        [ { tag: 'strong', text: 'Order confirmation' }, { text: ' — emailed within 5 minutes of payment.' } ],
        [ { tag: 'strong', text: 'Production update' }, { text: ' — when your bike enters the build queue.' } ],
        [ { tag: 'strong', text: 'PDI cleared' }, { text: ' — your specific VIN passes pre-delivery inspection.' } ],
        [ { tag: 'strong', text: 'Out for dispatch' }, { text: ' — bike leaves the Ahmedabad plant. Tracking link goes live.' } ],
        [ { tag: 'strong', text: 'In transit' }, { text: ' — live GPS tracking via the rider app.' } ],
        [ { tag: 'strong', text: 'Out for delivery' }, { text: ' — delivery executive contact details shared on the morning of delivery.' } ],
      ] },
      { type: 'inline', nodes: [
        { text: 'Check status any time at the ' },
        { tag: 'a', href: '/account/orders', className: 'accent', text: 'Orders' },
        { text: ' page in your Svitch account.' },
      ] },
    ],
  },
  {
    id:    'legal-damage',
    num:   '07',
    title: 'Damage in Transit',
    blocks: [
      { type: 'p', text: 'Every CSR 762 is shipped in a custom-fit transit crate with shock sensors. In the rare event that something arrives damaged:' },
      { type: 'ol', items: [
        [ { tag: 'strong', text: 'Do not sign acceptance' }, { text: ' on the delivery slip. Note the visible damage on the docket.' } ],
        'Take clear photos and a short video of the issue before unloading.',
        [ { text: 'Email ' }, emailNode('support'), { text: ' within ' }, { tag: 'strong', text: '24 hours' }, { text: ' of delivery with photos, video, and your order ID.' } ],
        'We dispatch a technician for inspection. Repair, replacement, or full refund will be offered based on severity (per the Refund Policy).',
      ] },
      { type: 'inline', nodes: [
        { text: 'For full refund handling, see our ' },
        { tag: 'a', href: '/legal/refund-policy', className: 'accent', text: 'Refund Policy' },
        { text: ' — section 8 (Defective / DOA Units).' },
      ] },
    ],
  },
  {
    id:    'legal-failed',
    num:   '08',
    title: 'Failed or Missed Delivery',
    blocks: [
      { type: 'p', text: 'Sometimes things go wrong on delivery day. What happens next:' },
      { type: 'ul', items: [
        [ { tag: 'strong', text: 'You were unreachable:' }, { text: ' we retry the next working day, free of charge. After 3 failed attempts, the bike is returned to the regional hub and a re-attempt fee of ₹ 1,500 applies.' } ],
        [ { tag: 'strong', text: 'Address inaccessible:' }, { text: " (heavy traffic, no parking, gated society without permit) — we arrange handover at the nearest hub or coordinate a society-permit document." } ],
        [ { tag: 'strong', text: 'Documents pending:' }, { text: ' if RTO paperwork is incomplete, the bike waits at the city hub until cleared, up to 15 days. After that, storage charges of ₹ 250/day apply.' } ],
        [ { tag: 'strong', text: 'Customer refuses delivery:' }, { text: ' the bike returns to plant. Cancellation rules under the Refund Policy apply (post-dispatch charge ₹ 5,000 + return freight).' } ],
      ] },
    ],
  },
  {
    id:    'legal-international',
    num:   '09',
    title: 'International Shipping',
    blocks: [
      { type: 'p', text: 'We currently do not ship CSR 762 vehicles outside India. International accessories and merchandise may be available via Svitch resellers in select markets.' },
      { type: 'p', text: 'For commercial / fleet enquiries outside India, write to international@svitch.bike with quantity, country, and intended use. Our partnerships team will respond within 5 working days.' },
    ],
  },
  {
    id:    'legal-changes',
    num:   '10',
    title: 'Changes to This Policy',
    blocks: [
      { type: 'p', text: 'Shipping rates, zones, and timelines may change as we expand the dealer and logistics network. The "Last Updated" date at the top of this page reflects the most recent change. Material changes for in-flight orders are honoured at the rate confirmed at booking.' },
    ],
  },
  {
    id:    'legal-contact',
    num:   '11',
    title: 'Contact',
    blocks: [
      { type: 'p', text: 'Shipping / delivery questions?' },
      { type: 'ul', items: [
        [ { tag: 'strong', text: 'Email:' }, { text: ' ' }, emailNode('support') ],
        [ { tag: 'strong', text: 'Phone:' }, { text: ' ' }, phoneNode('tollFree'), { text: ' (Mon–Sat, 09:00–19:00 IST)' } ],
        [ { tag: 'strong', text: 'Post:' }, { text: ' Logistics & Dispatch, Svitch Motocorp Pvt. Ltd., 201 Silver Square, Gurukul Road, Ahmedabad — 380052, India' } ],
      ] },
    ],
  },
]

const SHIPPING_POLICY_TOC = SHIPPING_POLICY_SECTIONS.map((s) => ({
  id:    s.id,
  label: s.title,
}))

export { SHIPPING_POLICY_SECTIONS, SHIPPING_POLICY_TOC }
