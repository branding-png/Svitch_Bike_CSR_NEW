import LegalRelated from '@/features/legal/LegalRelated'

// "Related Policies" section for the Refund Policy page.
const ITEMS = [
  {
    to:          '/legal/shipping-policy',
    icon:        'bi-truck',
    title:       'Shipping Policy',
    description: 'Delivery windows, coverage areas, charges, and the white-glove handover.',
    cta:         'Read Shipping',
  },
  {
    to:          '/legal/terms-conditions',
    icon:        'bi-file-text-fill',
    title:       'Terms & Conditions',
    description: 'Rules for using our website, booking, and warranty claims.',
    cta:         'Read Terms',
  },
  {
    to:          '/company/contact',
    icon:        'bi-envelope-fill',
    title:       'Contact Us',
    description: 'Refund issue or appeal? Our customer-care team will help.',
    cta:         'Get In Touch',
  },
]

export default function RefundPolicyRelated() {
  return <LegalRelated aria-label="RefundPolicyRelated" items={ITEMS} />
}
