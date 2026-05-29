import LegalRelated from '@/features/legal/LegalRelated'

// "Related Policies" section for the Terms & Conditions page.
const ITEMS = [
  {
    to:          '/legal/privacy-policy',
    icon:        'bi-shield-lock-fill',
    title:       'Privacy Policy',
    description: 'How we collect, use, and protect your personal data.',
    cta:         'Read Privacy',
  },
  {
    to:          '/legal/cookie-policy',
    icon:        'bi-cookie',
    title:       'Cookie Policy',
    description: 'How we use cookies and similar tracking technologies.',
    cta:         'Read Cookies',
  },
  {
    to:          '/company/contact',
    icon:        'bi-envelope-fill',
    title:       'Contact Us',
    description: 'Legal question or dispute? Our team is here to help.',
    cta:         'Get In Touch',
  },
]

export default function TermConditionRelated() {
  return <LegalRelated aria-label="TermConditionRelated" items={ITEMS} />
}
