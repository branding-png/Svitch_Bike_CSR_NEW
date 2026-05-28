// Terms & Conditions content — single source of truth.
// Block-based schema documented in src/features/legal/LegalBlocks.jsx.
// Contact addresses come from @/data/contact-info.
import { emailNode, phoneNode } from './contact-info'

const TERM_CONDITION_SECTIONS = [
  {
    id:    'legal-acceptance',
    num:   '01',
    title: 'Acceptance of Terms',
    blocks: [
      { type: 'inline', nodes: [
        { text: 'By accessing or using the Svitch Motocorp website (' },
        { tag: 'strong', text: 'csr762.com' },
        { text: '), placing a booking, or purchasing any product, you agree to be bound by these Terms & Conditions and all applicable laws. If you do not agree, please do not use this site or any of our services.' },
      ] },
      { type: 'p', text: 'We may update these terms from time to time. Continued use of the site after changes are posted constitutes acceptance of the revised terms.' },
    ],
  },
  {
    id:    'legal-use',
    num:   '02',
    title: 'Use of Website',
    blocks: [
      { type: 'p', text: 'You agree to use the site only for lawful purposes. You must not:' },
      { type: 'ul', items: [
        'Attempt to gain unauthorised access to any portion of the site, server, or database.',
        "Interfere with or disrupt the site's operation or the experience of other users.",
        'Use any automated system (bots, scrapers) to access the site without prior written consent.',
        'Upload or transmit viruses, malware, or any other harmful code.',
        'Impersonate another person or misrepresent your affiliation with any entity.',
      ] },
    ],
  },
  {
    id:    'legal-products',
    num:   '03',
    title: 'Product Information',
    blocks: [
      { type: 'p', text: 'We make every effort to display the CSR 762 and related products accurately, including specifications, range, colours, and pricing. However, product features, visual renderings, and pricing are subject to change without notice.' },
      { type: 'inline', nodes: [
        { text: 'Certified IDC range, top-speed, and charging-time figures are laboratory values. ' },
        { tag: 'strong', text: 'Real-world figures vary' },
        { text: ' based on riding mode, rider weight, terrain, traffic, weather, battery age, and accessory load.' },
      ] },
      { type: 'callout', icon: 'bi-info-circle-fill', text: 'Product images on the website are for illustration only. Actual appearance may differ slightly based on colour variant, local accessory fitment, or minor running changes.' },
    ],
  },
  {
    id:    'legal-booking',
    num:   '04',
    title: 'Booking & Payment',
    blocks: [
      { type: 'inline', nodes: [
        { text: 'Pre-bookings can be placed online or at any authorised Svitch dealer with a fully-refundable deposit of ' },
        { tag: 'strong', text: '₹999' },
        { text: '. The final on-road price, applicable taxes, insurance, and any government incentives (such as FAME II) are confirmed at delivery.' },
      ] },
      { type: 'p', text: 'All payments are processed via secure payment gateways (PCI-DSS compliant). Svitch does not store your full card details on our servers.' },

      { type: 'h3', text: 'EMI Plans' },
      { type: 'p', text: 'EMI options are offered in partnership with third-party banks and NBFCs. Final approval, interest rate, and tenure are at the sole discretion of the financing partner. Svitch is not liable for any disputes arising from third-party financing arrangements.' },
    ],
  },
  {
    id:    'legal-warranty',
    num:   '05',
    title: 'Warranty',
    blocks: [
      { type: 'inline', nodes: [
        { text: 'Every CSR 762 ships with a ' },
        { tag: 'strong', text: '3-year / 30,000 km comprehensive warranty' },
        { text: " covering the vehicle, Li-NMC battery pack, and PMSM motor. For the full list of what is and isn't covered, see our " },
        { tag: 'a', href: '/support/warranty', className: 'accent', text: 'Warranty page' },
        { text: '.' },
      ] },
      { type: 'p', text: 'Warranty becomes void if the vehicle is serviced at unauthorised workshops, modified without consent, used for racing or commercial purposes, or damaged by negligence.' },
    ],
  },
  {
    id:    'legal-delivery',
    num:   '06',
    title: 'Delivery & Risk',
    blocks: [
      { type: 'p', text: 'Delivery timelines are communicated at the time of booking. Delays may occur due to manufacturing constraints, logistics, or local regulatory requirements. Svitch is not liable for consequential losses caused by delivery delays.' },
      { type: 'p', text: 'Risk of loss passes to you once the vehicle is handed over at the dealership and you sign the delivery acknowledgement. We recommend inspecting the vehicle thoroughly at delivery.' },
    ],
  },
  {
    id:    'legal-returns',
    num:   '07',
    title: 'Returns & Cancellations',
    blocks: [
      { type: 'inline', nodes: [
        { tag: 'strong', text: 'Pre-booking cancellation:' },
        { text: ' You may cancel your pre-booking at any time before delivery for a ' },
        { tag: 'strong', text: 'full refund of the ₹999 deposit' },
        { text: '. Refunds are processed within 7 business days to the original payment method.' },
      ] },
      { type: 'inline', nodes: [
        { tag: 'strong', text: 'Post-delivery:' },
        { text: ' Due to the nature of motor vehicles, we do not accept returns after delivery. Any manufacturing defects are addressed through the warranty claim process.' },
      ] },
      { type: 'inline', nodes: [
        { text: 'For the full cancellation and refund timeline, see our ' },
        { tag: 'a', href: '/legal/refund-policy', className: 'accent', text: 'Refund Policy' },
        { text: '.' },
      ] },
    ],
  },
  {
    id:    'legal-ip',
    num:   '08',
    title: 'Intellectual Property',
    blocks: [
      { type: 'p', text: 'All content on this site — including the Svitch logo, CSR 762 brand, product images, text, videos, 3D models, and software — is the intellectual property of Svitch Motocorp Pvt. Ltd. or its licensors, and is protected under applicable copyright, trademark, and patent laws.' },
      { type: 'p', text: 'You may not reproduce, distribute, or create derivative works without prior written permission.' },
    ],
  },
  {
    id:    'legal-liability',
    num:   '09',
    title: 'Limitation of Liability',
    blocks: [
      { type: 'p', text: 'To the maximum extent permitted by law, Svitch Motocorp shall not be liable for any indirect, incidental, special, or consequential damages arising from your use of the website, our products, or services.' },
      { type: 'p', text: 'Our total liability in any matter related to the CSR 762 shall not exceed the price actually paid for the affected product.' },
    ],
  },
  {
    id:    'legal-law',
    num:   '10',
    title: 'Governing Law',
    blocks: [
      { type: 'p', text: 'These Terms & Conditions are governed by the laws of India. Any dispute arising out of or in connection with these terms shall be subject to the exclusive jurisdiction of the courts at Ahmedabad, Gujarat.' },
      { type: 'p', text: 'Before pursuing litigation, both parties agree to first attempt resolution through good-faith negotiation and, if needed, mediation under the rules of the Indian Council of Arbitration.' },
    ],
  },
  {
    id:    'legal-contact',
    num:   '11',
    title: 'Contact',
    blocks: [
      { type: 'p', text: 'Questions about these terms? Reach out to:' },
      { type: 'ul', items: [
        [ { tag: 'strong', text: 'Email:' }, { text: ' ' }, emailNode('legal') ],
        [ { tag: 'strong', text: 'Phone:' }, { text: ' ' }, phoneNode('tollFree'), { text: ' (Mon–Sat, 09:00–19:00 IST)' } ],
        [ { tag: 'strong', text: 'Post:' }, { text: ' Legal Department, Svitch Motocorp Pvt. Ltd., 201 Silver Square, Gurukul Road, Ahmedabad — 380052, India' } ],
      ] },
    ],
  },
]

const TERM_CONDITION_TOC = TERM_CONDITION_SECTIONS.map((s) => ({
  id:    s.id,
  label: s.title,
}))

export { TERM_CONDITION_SECTIONS, TERM_CONDITION_TOC }
