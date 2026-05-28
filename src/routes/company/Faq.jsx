import { Link } from 'react-router-dom'
import PageHero from '@/layouts/PageHero'
import FaqAccordion from '@/features/company/faq/FaqAccordion'
import SupportCta from '@/features/company/faq/SupportCta'
import '@/styles/pages/faq.css'

export default function Faq() {
  return (
    <>
      <PageHero
        id="faq-hero"
        label="Help Centre"
        titleStart="Frequently Asked"
        titleHighlight="Questions"
        description={
          <>
            Everything you need to know about the CSR 762 — from range and
            charging to warranty and financing. Can't find your answer?{' '}
            <Link className="rajdhani-lbl-text-sm" to="/company/contact">
              Talk to our team.
            </Link>
          </>
        }
      />
      <FaqAccordion />
      <SupportCta />
    </>
  )
}
