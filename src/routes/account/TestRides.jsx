import AccountLayout      from '@/features/account/AccountLayout'
import AccountContent     from '@/features/account/AccountContent'
import TestRideUpcoming   from '@/features/account/test-rides/TestRideUpcoming'
import TestRidePastRides  from '@/features/account/test-rides/TestRidePastRides'
import TestRideCTA        from '@/features/account/test-rides/TestRideCTA'
import '@/styles/sections/account.css'

export default function TestRides() {
  return (
    <AccountLayout>
      <AccountContent
        crumbLabel="My Test Rides"
        title="My Test Rides"
        description="Track upcoming bookings, reschedule if plans change, or revisit past rides."
      >
        <TestRideUpcoming />
        <TestRidePastRides />
        <TestRideCTA />
      </AccountContent>
    </AccountLayout>
  )
}
