import AccountLayout    from '@/features/account/AccountLayout'
import AccountContent   from '@/features/account/AccountContent'
import DashboardStats   from '@/features/account/dashboard/DashboardStats'
import ReferralPromo    from '@/features/account/dashboard/ReferralPromo'
import QuickActions     from '@/features/account/dashboard/QuickActions'
import RecentOrders     from '@/features/account/dashboard/RecentOrders'
import WishlistPreview  from '@/features/account/dashboard/WishlistPreview'
import { useUser } from '@/contexts/UserContext'
import '@/styles/sections/account.css'

export default function Dashboard() {
  const { user } = useUser()
  const firstName = (user?.name || 'Arjun').split(' ')[0]

  return (
    <AccountLayout>
      <AccountContent
        crumbLabel="Dashboard"
        title={<>Welcome Back, <span>{firstName}</span></>}
        description="Your Svitch account at a glance — orders, saved bikes, addresses, and more."
      >
        <DashboardStats />
        <ReferralPromo />
        <QuickActions />
        <RecentOrders />
        <WishlistPreview extraCount={1} />
      </AccountContent>
    </AccountLayout>
  )
}
