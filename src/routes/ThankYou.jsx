import ThankYouHero from '@/features/system/thank-you/ThankYouHero'
import Newsletter   from '@/features/home/Newsletter'
import '@/styles/pages/index.css'
import '@/styles/pages/thank-you.css'

export default function ThankYou() {
  return (
    <>
      <ThankYouHero />
      <Newsletter />
    </>
  )
}
