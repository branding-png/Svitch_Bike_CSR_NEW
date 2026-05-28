import PageHero from '@/layouts/PageHero'
import ReviewSummary from '@/features/company/reviews/ReviewSummary'
import ReviewList from '@/features/company/reviews/ReviewList'
import '@/styles/pages/reviews.css'

export default function Reviews() {
  return (
    <>
      <PageHero
        id="reviews-hero"
        label="Customer Stories"
        titleStart={<>What Riders</>}
        titleHighlight="Are Saying"
        description="Honest reviews from verified CSR 762 owners across India. Real range, real costs, real ownership."
      />
      <ReviewSummary />
      <ReviewList />
    </>
  )
}
