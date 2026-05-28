import LegalRelated from '@/features/legal/LegalRelated'

// "Related Policies" section for the Cookie Policy page.
const ITEMS = [
  {
    to:          '/legal/terms-conditions',
    icon:        'bi-file-text-fill',
    title:       'Terms & Conditions',
    description: 'Rules for using our website, booking, and warranty claims.',
    cta:         'Read Terms',
  },
  {
    to:          '/legal/privacy-policy',
    icon:        'bi-shield-lock-fill',
    title:       'Privacy Policy',
    description: 'How we collect, use, and protect your personal data.',
    cta:         'Read Privacy',
  },
  {
    to:          '/company/contact',
    icon:        'bi-envelope-fill',
    title:       'Contact Us',
    description: 'Questions about our policies? Reach out to the Svitch team.',
    cta:         'Get In Touch',
  },
]

export default function CookiePolicyRelated() {
  return <LegalRelated aria-label="CookiePolicyRelated" role="region" items={ITEMS} />
}
