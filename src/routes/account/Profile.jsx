import AccountLayout  from '@/features/account/AccountLayout'
import AccountContent from '@/features/account/AccountContent'
import ProfileHero          from '@/features/account/profile/ProfileHero'
import ProfilePersonalInfo  from '@/features/account/profile/ProfilePersonalInfo'
import ProfilePassword      from '@/features/account/profile/ProfilePassword'
import ProfileNotifications from '@/features/account/profile/ProfileNotifications'
import ProfileTwoFactor     from '@/features/account/profile/ProfileTwoFactor'
import ProfileSessions      from '@/features/account/profile/ProfileSessions'
import ProfilePrivacy       from '@/features/account/profile/ProfilePrivacy'
import ProfileDangerZone    from '@/features/account/profile/ProfileDangerZone'
import '@/styles/sections/account.css'

export default function Profile() {
  return (
    <AccountLayout>
      <AccountContent
        crumbLabel="My Profile"
        title="My Profile"
        description="Manage your personal details, security, notifications and privacy."
      >
        <ProfileHero />
        <ProfilePersonalInfo />
        <ProfilePassword />
        <ProfileNotifications />
        <ProfileTwoFactor />
        <ProfileSessions />
        <ProfilePrivacy />
        <ProfileDangerZone />
      </AccountContent>
    </AccountLayout>
  )
}
