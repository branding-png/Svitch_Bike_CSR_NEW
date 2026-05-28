// Privacy Policy content — single source of truth.
// Block-based schema documented in src/features/legal/LegalBlocks.jsx.
// Contact addresses come from @/data/contact-info so the entire site updates
// from a single edit.
import { emailNode, phoneNode } from './contact-info'

const PRIVACY_POLICY_SECTIONS = [
  {
    id:    'legal-collect',
    num:   '01',
    title: 'Information We Collect',
    blocks: [
      { type: 'p', text: "When you use Svitch Motocorp's website, book a test ride, apply for a dealership, or purchase a CSR 762, we collect the following types of information:" },

      { type: 'h3', text: 'Personal Information' },
      { type: 'ul', items: [
        [ { tag: 'strong', text: 'Identity:' }, { text: ' Full name, date of birth, government-issued ID (Aadhaar / PAN) for purchase & registration.' } ],
        [ { tag: 'strong', text: 'Contact:' }, { text: ' Phone number, email address, postal address.' } ],
        [ { tag: 'strong', text: 'Payment:' }, { text: ' Card details, UPI IDs, or bank information (processed by PCI-DSS compliant gateways — we never store full card numbers).' } ],
      ] },

      { type: 'h3', text: 'Usage & Device Data' },
      { type: 'ul', items: [
        'IP address, browser type, device type, operating system, screen size.',
        'Pages visited, time spent, links clicked, referral source.',
        'Location (approximate, from IP) for dealer locator features.',
      ] },

      { type: 'h3', text: 'Vehicle Telemetry' },
      { type: 'p', text: 'If you opt in via the CSR 762 Android console, we may collect anonymised riding data: range, battery cycles, speed profiles, service alerts — used to improve firmware and deliver OTA updates.' },
    ],
  },
  {
    id:    'legal-use',
    num:   '02',
    title: 'How We Use Your Data',
    blocks: [
      { type: 'p', text: 'We use your information to:' },
      { type: 'ul', items: [
        'Process bookings, purchases, test rides, and warranty registrations.',
        'Respond to support enquiries and service requests.',
        'Send order updates, service reminders, and safety notices.',
        'Improve the CSR 762 via analytics and telemetry (anonymised).',
        [ { text: "Send marketing communications — " }, { tag: 'strong', text: "only if you've opted in" }, { text: '.' } ],
        'Comply with legal and regulatory obligations (RTO, tax, subsidy programs).',
      ] },
    ],
  },
  {
    id:    'legal-share',
    num:   '03',
    title: 'Sharing Your Data',
    blocks: [
      { type: 'inline', nodes: [
        { text: 'We ' },
        { tag: 'strong', text: 'do not sell' },
        { text: ' your personal data. We share it only with:' },
      ] },
      { type: 'ul', items: [
        [ { tag: 'strong', text: 'Authorised dealers' }, { text: ' for pre-booking fulfilment, test rides, and service.' } ],
        [ { tag: 'strong', text: 'Banks & NBFCs' }, { text: ' (only if you opt for EMI financing).' } ],
        [ { tag: 'strong', text: 'Logistics partners' }, { text: ' for vehicle delivery.' } ],
        [ { tag: 'strong', text: 'Government authorities' }, { text: ' (RTO, tax) as required by law.' } ],
        [ { tag: 'strong', text: 'Technology providers' }, { text: ' (hosting, analytics, payment gateways) bound by data-protection agreements.' } ],
      ] },
      { type: 'callout', icon: 'bi-shield-check', text: 'All third parties we share data with are contractually obligated to keep your information confidential and use it only for the specified purpose.' },
    ],
  },
  {
    id:    'legal-cookies',
    num:   '04',
    title: 'Cookies & Tracking',
    blocks: [
      { type: 'inline', nodes: [
        { text: 'We use cookies and similar technologies to keep you signed in, remember preferences, and measure site performance. For full details, please see our ' },
        { tag: 'a', href: '/legal/cookies-policy', className: 'accent', text: 'Cookie Policy' },
        { text: '.' },
      ] },
    ],
  },
  {
    id:    'legal-security',
    num:   '05',
    title: 'Data Security',
    blocks: [
      { type: 'p', text: 'We protect your data using industry-standard practices:' },
      { type: 'ul', items: [
        [ { tag: 'strong', text: 'TLS/SSL encryption' }, { text: ' for all data in transit.' } ],
        [ { tag: 'strong', text: 'Encrypted databases' }, { text: ' at rest (AES-256).' } ],
        [ { tag: 'strong', text: 'Access controls' }, { text: ' — only authorised Svitch staff with a business need can access your data.' } ],
        [ { tag: 'strong', text: 'Regular security audits' }, { text: ' and vulnerability scans.' } ],
      ] },
      { type: 'p', text: 'Despite our best efforts, no online system is 100% secure. If we become aware of a data breach affecting you, we will notify you within 72 hours as required by Indian data protection law.' },
    ],
  },
  {
    id:    'legal-rights',
    num:   '06',
    title: 'Your Rights',
    blocks: [
      { type: 'p', text: 'Under Indian data protection law, you have the right to:' },
      { type: 'ul', items: [
        [ { tag: 'strong', text: 'Access' }, { text: ' — Request a copy of the data we hold about you.' } ],
        [ { tag: 'strong', text: 'Rectify' }, { text: ' — Correct inaccurate or incomplete data.' } ],
        [ { tag: 'strong', text: 'Erase' }, { text: ' — Ask us to delete your data (subject to legal retention obligations).' } ],
        [ { tag: 'strong', text: 'Opt-out' }, { text: ' — Unsubscribe from marketing emails or SMS at any time.' } ],
        [ { tag: 'strong', text: 'Port' }, { text: ' — Receive your data in a structured, machine-readable format.' } ],
        [ { tag: 'strong', text: 'Complain' }, { text: ' — Lodge a complaint with the Data Protection Board of India.' } ],
      ] },
      { type: 'inline', nodes: [
        { text: 'To exercise any of these rights, email ' },
        emailNode('privacy'),
        { text: '. We respond within 30 days.' },
      ] },
    ],
  },
  {
    id:    'legal-retention',
    num:   '07',
    title: 'Data Retention',
    blocks: [
      { type: 'p', text: 'We retain your data only as long as necessary:' },
      { type: 'ul', items: [
        [ { tag: 'strong', text: 'Purchase records & warranty:' }, { text: ' 7 years (tax & statutory requirement).' } ],
        [ { tag: 'strong', text: 'Service history:' }, { text: ' Life of the vehicle + 3 years.' } ],
        [ { tag: 'strong', text: 'Marketing data:' }, { text: ' Until you unsubscribe or 2 years of inactivity.' } ],
        [ { tag: 'strong', text: 'Cookies & analytics:' }, { text: ' 14–26 months (see Cookie Policy).' } ],
      ] },
    ],
  },
  {
    id:    'legal-children',
    num:   '08',
    title: "Children's Privacy",
    blocks: [
      { type: 'p', text: 'The CSR 762 requires a valid two-wheeler driving licence (age 18+ in India). We do not knowingly collect data from anyone under 18. If you believe a child has submitted data to us, please contact us and we will delete it promptly.' },
    ],
  },
  {
    id:    'legal-changes',
    num:   '09',
    title: 'Changes to This Policy',
    blocks: [
      { type: 'p', text: 'We may update this privacy policy as our practices or legal requirements change. Material changes will be highlighted at the top of this page and — for significant updates — communicated via email to registered users.' },
    ],
  },
  {
    id:    'legal-contact',
    num:   '10',
    title: 'Contact',
    blocks: [
      { type: 'p', text: 'Privacy questions? Our Data Protection Officer is here to help:' },
      { type: 'ul', items: [
        [ { tag: 'strong', text: 'Email:' }, { text: ' ' }, emailNode('privacy') ],
        [ { tag: 'strong', text: 'Phone:' }, { text: ' ' }, phoneNode('tollFree') ],
        [ { tag: 'strong', text: 'Post:' }, { text: ' Data Protection Officer, Svitch Motocorp Pvt. Ltd., 201 Silver Square, Gurukul Road, Ahmedabad — 380052, India' } ],
      ] },
    ],
  },
]

const PRIVACY_POLICY_TOC = PRIVACY_POLICY_SECTIONS.map((s) => ({
  id:    s.id,
  label: s.title,
}))

export { PRIVACY_POLICY_SECTIONS, PRIVACY_POLICY_TOC }
