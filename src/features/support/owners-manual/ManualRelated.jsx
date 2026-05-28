import LegalRelated from '@/features/legal/LegalRelated'
import { PATHS } from '@/utils/routes'

// "Related Resources" section for the Owner's Manual page.
// Same pattern as AccessibilityRelated — just a different items array.
const ITEMS = [
  {
    to:          PATHS.faq,
    icon:        'bi-question-circle-fill',
    title:       'FAQs',
    description: 'Quick answers on range, charging, warranty, and financing.',
    cta:         'Read FAQs',
  },
  {
    to:          PATHS.bookService,
    icon:        'bi-tools',
    title:       'Book a Service',
    description: 'Schedule periodic checks, pickup & drop, or an OTA update.',
    cta:         'Book Service',
  },
  {
    to:          PATHS.contact,
    icon:        'bi-envelope-fill',
    title:       'Contact Support',
    description: 'Still have questions? Reach our team by chat, email, or phone.',
    cta:         'Get In Touch',
  },
]

export default function ManualRelated() {
  return <LegalRelated items={ITEMS} label="Related Resources" titleStart="Read" titleAccent="More" />
}
