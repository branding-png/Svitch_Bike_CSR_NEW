import AccountAside from './AccountAside'
import '@/styles/sections/account.css'
import '@/styles/pages/shop.css'

// Page shell for every /account/* page: a two-column grid with the shared
// sidebar (AccountAside) on the left and page-specific children on the
// right (usually an <AccountContent>, which renders the breadcrumb +
// header itself).
export default function AccountLayout({ children }) {
  return (
    <section aria-label="AccountLayout" id="account-main">
      <div className="container">
        <div className="account-layout">
          <AccountAside />
          {children}
        </div>
      </div>
    </section>
  )
}
