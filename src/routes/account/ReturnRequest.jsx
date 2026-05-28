import PageHero from '@/layouts/PageHero'
import ReturnRequestForm from '@/features/account/return-request/ReturnRequestForm'
import ReturnAside       from '@/features/account/return-request/ReturnAside'
import '@/styles/sections/account.css'
import '@/styles/pages/returns.css'

export default function ReturnRequest() {
  return (
    <>
      <PageHero
        id="return-request-hero"
        label="Request a Return"
        titleStart={<>Return or </>}
        titleHighlight="Replace"
        description="Tell us what's wrong and we'll arrange free pickup within 48 hours."
      />

      <section id="rr-main">
        <div className="container">
          <div className="rr-layout">
            <ReturnRequestForm />
            <ReturnAside />
          </div>
        </div>
      </section>
    </>
  )
}
