import { useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import UnsubscribePreferences from '@/features/system/unsubscribe/UnsubscribePreferences'
import UnsubscribeDone        from '@/features/system/unsubscribe/UnsubscribeDone'
import '@/styles/pages/unsubscribe.css'

export default function Unsubscribe() {
  const [searchParams] = useSearchParams()
  const email = searchParams.get('email') || 'your@email.com'

  const [done, setDone] = useState(false)

  return (
    <div className="wrapper-body">
    <section id="unsub-main">
      <div className="container">
        {done
          ? <UnsubscribeDone        email={email} />
          : <UnsubscribePreferences email={email} onComplete={() => setDone(true)} />}
      </div>
    </section></div>
  )
}
