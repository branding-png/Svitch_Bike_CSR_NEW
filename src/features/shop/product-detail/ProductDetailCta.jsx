import { useBookNow } from '@/contexts/BookNowContext'

export default function ProductDetailCta() {
  const { open } = useBookNow()
  return (
    <div aria-label="ProductDetailCta" className="pd-cta-row">
      <button type="button" className="btn-csr primary" onClick={open}>
        <i className="bi bi-calendar-check" aria-hidden="true" /> Book Now
      </button>
    </div>
  )
}
