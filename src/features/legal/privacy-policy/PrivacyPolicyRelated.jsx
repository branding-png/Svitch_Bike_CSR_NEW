import LegalRelated from '@/features/legal/LegalRelated'

// "Related Policies" section for the Privacy Policy page.
const ITEMS = [
  {
    to:          '/legal/terms-conditions',
    icon:        'bi-file-text-fill',
    title:       'Terms & Conditions',
    description: 'Rules for using our website, booking, and warranty claims.',
    cta:         'Read Terms',
  },
  {
    to:          '/legal/cookies-policy',
    icon:        'bi-cookie',
    title:       'Cookie Policy',
    description: 'Types of cookies we use and how you can control them.',
    cta:         'Read Cookies',
  },
  {
    to:          '/company/contact',
    icon:        'bi-envelope-fill',
    title:       'Contact Us',
    description: 'Questions about our policies? Reach out to the Svitch team.',
    cta:         'Get In Touch',
  },
]

export default function PrivacyPolicyRelated() {
  return <LegalRelated items={ITEMS} />
}
