import AccountLayout    from '@/features/account/AccountLayout'
import AccountContent   from '@/features/account/AccountContent'
import ServiceStats     from '@/features/account/service-history/ServiceStats'
import ServiceNext      from '@/features/account/service-history/ServiceNext'
import ServiceTimeline  from '@/features/account/service-history/ServiceTimeline'
import ServiceReportDownload from '@/features/account/service-history/ServiceReportDownload'
import { SERVICE_ENTRIES } from '@/features/account/service-history/service-history-data'
import '@/styles/pages/service-history.css'

export default function ServiceHistory() {
  return (
    <AccountLayout>
      <AccountContent
        crumbLabel="Service History"
        title="Service History"
        description="Every service, every part. The complete record for your CSR 762."
      >
        <ServiceStats />
        <ServiceNext />

        <h3 style={{ marginBottom: 20 }}>Past Services</h3>
        <ServiceTimeline entries={SERVICE_ENTRIES} />

        <ServiceReportDownload />
      </AccountContent>
    </AccountLayout>
  )
}
