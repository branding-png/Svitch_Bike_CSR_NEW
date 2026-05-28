import PageHero from '@/layouts/PageHero'
import ContactMain from '@/features/company/contact/ContactMain'
import StoreLocator from '@/features/company/contact/StoreLocator'
import TestRideBooking from '@/features/company/contact/TestRideBooking'
import SocialLinks from '@/features/company/contact/SocialLinks'
import '@/styles/pages/contact.css'

export default function Contact() {
  return (
    <>
      <PageHero
        id="contact-hero"
        label="Get In Touch"
        titleStart={<>Let's</>}
        titleHighlight="Talk"
        description="Have a question about the CSR 762? Want to book a test ride? Looking for your nearest dealer? Our team is ready to help you make the switch to electric."
      />
      <ContactMain />
      <StoreLocator />
      <TestRideBooking />
      <SocialLinks />
    </>
  )
}
