// Refund Policy content — single source of truth.
// Block-based schema documented in src/features/legal/LegalBlocks.jsx.
// Contact addresses come from @/data/contact-info.
import { emailNode, phoneNode } from './contact-info'

const REFUND_POLICY_SECTIONS = [
  {
    id:    'legal-overview',
    num:   '01',
    title: 'Overview',
    blocks: [
      { type: 'p', text: 'Svitch Motocorp Pvt. Ltd. stands behind every CSR 762 we deliver. This policy explains when you can cancel or request a refund, what is refundable, how long it takes, and how we handle damaged or defective units.' },
      { type: 'inline', nodes: [
        { text: 'All refund requests are processed through our support team and subject to verification. Refunds are issued to the ' },
        { tag: 'strong', text: 'original payment method' },
        { text: '.' },
      ] },
      { type: 'callout', icon: 'bi-info-circle-fill', text: [
        { text: 'Government charges (RTO registration, road tax, insurance) already paid to third parties are ' },
        { tag: 'strong', text: 'not refundable' },
        { text: ' — they are governed by the respective government department.' },
      ] },
    ],
  },
  {
    id:    'legal-cancellation',
    num:   '02',
    title: 'Cancellation Windows',
    blocks: [
      { type: 'p', text: 'You may cancel your CSR 762 booking at any of these stages:' },
      { type: 'table',
        headers: ['Stage', 'Cancellation Charge', 'Refund'],
        rows: [
          [ [ { tag: 'strong', text: 'Before PDI' } ], 'NIL', '100% of amount paid' ],
          [ [ { tag: 'strong', text: 'After PDI, before dispatch' } ], '₹ 5,000 (admin fee)', 'Amount paid minus ₹ 5,000' ],
          [ [ { tag: 'strong', text: 'After dispatch, before delivery' } ], '₹ 5,000 + actual return freight', 'Amount paid minus charges' ],
          [ [ { tag: 'strong', text: 'After delivery & registration' } ], 'Not eligible (except under Defective clause)', '—' ],
        ],
      },
      { type: 'p', text: 'Accessory and spare-part orders can be cancelled any time before dispatch for a full refund. After dispatch, standard return rules apply.' },
    ],
  },
  {
    id:    'legal-eligibility',
    num:   '03',
    title: 'Refund Eligibility',
    blocks: [
      { type: 'p', text: 'You are eligible for a refund if:' },
      { type: 'ul', items: [
        'You cancel within the windows described above.',
        [ { text: 'The bike arrives damaged and the damage was reported within 24 hours (see our ' }, { tag: 'a', href: '/legal/shipping-policy', className: 'accent', text: 'Shipping Policy' }, { text: ').' } ],
        'The bike is found defective on arrival (DOA — see § 8).',
        'We fail to deliver within 45 days of confirmed payment, and the delay is not caused by documents pending from your side.',
        'You paid for an accessory that was not included in the delivered order.',
      ] },

      { type: 'h3', text: 'Ineligible Scenarios' },
      { type: 'ul', items: [
        'Bike has been registered with the RTO or driven on public roads.',
        'Damage caused by the customer after delivery (scratches, drops, modifications).',
        'Change of mind after registration.',
        'Failure to take delivery within 15 days of arrival at your city hub.',
      ] },
    ],
  },
  {
    id:    'legal-process',
    num:   '04',
    title: 'Refund Process',
    blocks: [
      { type: 'p', text: 'To raise a refund request:' },
      { type: 'ol', items: [
        [ { text: 'Email ' }, emailNode('support'), { text: ' with your order number, reason, and supporting photos or documents.' } ],
        [ { text: 'Our team acknowledges within ' }, { tag: 'strong', text: '2 business days' }, { text: ' and assigns a case number.' } ],
        'For DOA or damage cases, a technician may inspect the unit at your location or at an authorised service centre.',
        'Once verified, we send you a refund-confirmation email with the exact amount and expected credit date.',
        'Refund is credited to your original payment source (card / UPI / bank account).',
      ] },
      { type: 'p', text: 'Refund confirmations are auditable — every step is logged against your case number, visible when you call customer care.' },
    ],
  },
  {
    id:    'legal-timeline',
    num:   '05',
    title: 'Refund Timeline',
    blocks: [
      { type: 'p', text: 'Once your refund is approved, the money reflects in your account within:' },
      { type: 'table',
        headers: ['Payment Method', 'Refund Time (after approval)'],
        rows: [
          [ [ { tag: 'strong', text: 'UPI' } ],                       '2–5 business days' ],
          [ [ { tag: 'strong', text: 'Net Banking' } ],               '5–7 business days' ],
          [ [ { tag: 'strong', text: 'Credit / Debit Card' } ],       '5–10 business days' ],
          [ [ { tag: 'strong', text: 'EMI / Loan Part-Payment' } ],   '10–15 business days (coordinated with lender)' ],
          [ [ { tag: 'strong', text: 'Cheque / DD' } ],               'Dispatched within 7 business days; credit on realisation' ],
        ],
      },
      { type: 'p', text: "If you haven't received the refund after the stated period, first check with your bank — interbank settlement can sometimes add 1–2 business days. If still missing, write to us with the transaction reference and we will escalate." },
    ],
  },
  {
    id:    'legal-partial',
    num:   '06',
    title: 'Partial Refunds',
    blocks: [
      { type: 'p', text: 'In certain situations, only a partial refund is issued:' },
      { type: 'ul', items: [
        'Cancellation after PDI but before dispatch — admin fee deducted.',
        'Accessories returned with damage, missing parts, or packaging opened beyond inspection.',
        'Bundled offers (free accessory with bike): if the bike is cancelled, the MRP of any retained accessory is deducted from the refund.',
        'Loan-based purchase: bank processing fees already paid are not refunded.',
      ] },
      { type: 'p', text: 'Every partial deduction is itemised in the refund-confirmation email so there are no surprises.' },
    ],
  },
  {
    id:    'legal-nonrefundable',
    num:   '07',
    title: 'Non-Refundable Items',
    blocks: [
      { type: 'p', text: 'The following are never refundable:' },
      { type: 'ul', items: [
        'RTO registration, road tax, and insurance premiums already paid to the government or insurer.',
        'Consumables and wear items (brake pads, tyres, chain) once used.',
        'Customised paint jobs, engraved name-plates, or other personalisation services.',
        'Promotional discount credits, referral bonuses, or loyalty points redeemed at purchase.',
        'Delivery charges already incurred for Zone B / Zone C shipments when customer cancels after dispatch.',
      ] },
    ],
  },
  {
    id:    'legal-defective',
    num:   '08',
    title: 'Defective or DOA Units',
    blocks: [
      { type: 'p', text: '"Dead on Arrival" (DOA) means the bike or a major component does not function as intended at the moment of delivery — not later, not after usage. Covered components include motor, battery pack, controller, dashboard, and drivetrain.' },

      { type: 'h3', text: 'How to Report a DOA' },
      { type: 'ol', items: [
        'Stop using the vehicle and take photos/videos showing the fault.',
        [ { text: 'Email ' }, emailNode('support'), { text: ' within ' }, { tag: 'strong', text: '72 hours' }, { text: ' of delivery.' } ],
        'Allow our technician to inspect at your location or at an authorised service centre.',
        'If confirmed DOA, we offer: (a) free replacement of the faulty component, OR (b) full unit replacement, OR (c) full refund — your choice.',
      ] },

      { type: 'h3', text: 'After the 72-hour Window' },
      { type: 'inline', nodes: [
        { text: 'Issues reported after 72 hours are handled under the ' },
        { tag: 'a', href: '/support/warranty', className: 'accent', text: 'Warranty Policy' },
        { text: ', which covers repairs and replacements for up to 3 years, not refunds.' },
      ] },

      { type: 'callout', icon: 'bi-exclamation-triangle-fill', text: 'Once the bike is registered with the RTO, it cannot be refunded — only replaced or repaired under warranty. Please verify the bike in person before the RTO paperwork is filed.' },
    ],
  },
  {
    id:    'legal-contact',
    num:   '09',
    title: 'Contact',
    blocks: [
      { type: 'p', text: 'For any refund or cancellation question:' },
      { type: 'ul', items: [
        [ { tag: 'strong', text: 'Email:' }, { text: ' ' }, emailNode('support') ],
        [ { tag: 'strong', text: 'Phone:' }, { text: ' ' }, phoneNode('tollFree'), { text: ' (Mon–Sat, 9:00–18:00)' } ],
        [ { tag: 'strong', text: 'Post:' }, { text: ' Refunds & Cancellations, Svitch Motocorp Pvt. Ltd., 201 Silver Square, Gurukul Road, Ahmedabad — 380052, India' } ],
      ] },
      { type: 'inline', nodes: [
        { text: 'Or visit our ' },
        { tag: 'a', href: '/company/contact', className: 'accent', text: 'Contact page' },
        { text: ' for all the ways to reach our team.' },
      ] },
    ],
  },
]

const REFUND_POLICY_TOC = REFUND_POLICY_SECTIONS.map((s) => ({
  id:    s.id,
  label: s.title,
}))

export { REFUND_POLICY_SECTIONS, REFUND_POLICY_TOC }
