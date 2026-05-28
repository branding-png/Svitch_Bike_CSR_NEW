import LegalRelated from '@/features/legal/LegalRelated'
import { PATHS } from '@/utils/routes'

// "Related Resources" section for the Specifications page.
// Same pattern as ManualRelated / AccessibilityRelated — different items array.
const ITEMS = [
  {
    to:          PATHS.ownersManual,
    icon:        'bi-book-fill',
    title:       "Owner's Manual",
    description: 'Riding, charging, maintenance and troubleshooting your CSR 762.',
    cta:         'Read Manual',
  },
  {
    to:          PATHS.faq,
    icon:        'bi-question-circle-fill',
    title:       'FAQs',
    description: 'Quick answers on range, charging, warranty, and financing.',
    cta:         'Read FAQs',
  },
  {
    to:          PATHS.warranty,
    icon:        'bi-shield-fill-check',
    title:       'Warranty & Registration',
    description: 'Activate your comprehensive warranty within 30 days of purchase.',
    cta:         'Register Now',
  },
]

export default function SpecificationsRelated() {
  return (
    <LegalRelated
      items={ITEMS}
      label="Related Resources"
      titleStart="Explore"
      titleAccent="More"
    />
  )
}
