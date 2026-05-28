import { BreadCrumb } from '@/ui'
import { PATHS } from '@/utils/routes'
import AccountMobilePills from './AccountMobilePills'

// Right-column wrapper used by every /account/* page. Renders the mobile
// pills nav (hidden on desktop via CSS), an optional breadcrumb above the
// page header, the page header itself, and finally the page-specific
// children below.
export default function AccountContent({ crumbs, crumbLabel, title, description, actions, children }) {
  const trail = crumbs || [
    { label: 'Home', to: PATHS.home },
    { label: 'Account', to: PATHS.dashboard },
    ...(crumbLabel ? [{ label: crumbLabel }] : (typeof title === 'string' ? [{ label: title }] : [])),
  ]

  return (
    <div className="account-main">
      <AccountMobilePills />

      <BreadCrumb items={trail} />

      {(title || description) && (
        <div className="account-header">
          {title && <h1>{title}</h1>}
          {description && <p>{description}</p>}
          {actions && <div className="account-header-actions">{actions}</div>}
        </div>
      )}

      {children}
    </div>
  )
}
