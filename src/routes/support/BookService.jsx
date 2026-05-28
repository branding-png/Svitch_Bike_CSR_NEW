import PageHero from '@/layouts/PageHero'
import ServiceStats        from '@/features/support/book-service/ServiceStats'
import BookServiceForm     from '@/features/support/book-service/BookServiceForm'
import MaintenanceSchedule from '@/features/support/book-service/MaintenanceSchedule'
import '@/styles/pages/service.css'

export default function BookService() {
  return (
    <>
      <PageHero
        id="book-service-hero"
        className="pb-1"
        label="After-Sales Support"
        titleStart={<>Service </>}
        titleHighlight="Network"
        description="Three transparent service plans. 500+ authorised centres. Doorstep pickup. Zero oil changes, zero spark plugs — electric maintenance is simpler, cheaper, and smarter."
      />

      <ServiceStats className="pb-5" />
      <BookServiceForm />
      <MaintenanceSchedule />
    </>
  )
}
