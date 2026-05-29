import LegalRelated from '@/features/legal/LegalRelated'

// "Related Policies" section for the Accessibility page.
// Lists the 3 cards specific to this page; other legal pages have their own
// wrapper component with a different items array.
const ITEMS = [
  {
    to:          '/legal/terms-conditions',
    icon:        'bi-file-earmark-text-fill',
    title:       'Terms & Conditions',
    description: "The rules that govern your use of Svitch Motocorp's website and services.",
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
    description: 'Questions or accessibility feedback? Reach out to the Svitch team.',
    cta:         'Get In Touch',
  },
]

export default function AccessibilityRelated() {
  return <LegalRelated aria-label="AccessibilityRelated" items={ITEMS} />
}
