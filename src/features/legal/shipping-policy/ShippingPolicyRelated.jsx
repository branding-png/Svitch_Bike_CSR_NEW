import LegalRelated from '@/features/legal/LegalRelated'

// "Related Policies" section for the Shipping Policy page.
const ITEMS = [
  {
    to:          '/legal/refund-policy',
    icon:        'bi-arrow-counterclockwise',
    title:       'Refund Policy',
    description: 'Cancellations, refunds, defective units, and timelines.',
    cta:         'Read Refunds',
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
    description: 'Shipping or delivery question? Our team is here.',
    cta:         'Get In Touch',
  },
]

export default function ShippingPolicyRelated() {
  return <LegalRelated items={ITEMS} />
}
