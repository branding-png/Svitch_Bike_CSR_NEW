import { useBookNow } from '@/contexts/BookNowContext'

// Convenience button that opens the global Book Now modal.
// All standard <button> props pass through, so any caller can override
// className, style, children, etc.
export default function BookNowButton({
  children   = 'Book Now',
  className  = 'rajdhani-lbl-text-sm btn-csr secondary sm headBooknowbtn',
  ...rest
}) {
  const { open } = useBookNow()
  return (
    <button
      type="button"
      className={className}
      onClick={open}
      {...rest}
    >
      {children}
    </button>
  )
}
