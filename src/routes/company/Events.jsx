import PageHero from '@/layouts/PageHero'
import EventList from '@/features/company/events/EventList'
import '@/styles/pages/events.css'

export default function Events() {
  return (
    <>
      <PageHero
        id="events-hero"
        label="Calendar"
        titleStart={<>Svitch</>}
        titleHighlight="Events"
        description="Ride. Meet. Celebrate. See where we're heading next."
      />
      <EventList />
    </>
  )
}
