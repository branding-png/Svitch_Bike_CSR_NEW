import { RouterProvider } from 'react-router-dom'
import { ToastProvider } from '@/contexts/ToastContext'
import { BookNowProvider } from '@/contexts/BookNowContext'
import BookNowModal from '@/features/book-now/BookNowModal'
import { router } from './routes'

// Top-level providers wrap the router so every route gets shared state.
// BookNowProvider sits inside ToastProvider because the modal reads useToast().
export default function App() {
  return (
    <ToastProvider>
      <BookNowProvider>
        <RouterProvider router={router} />
        {/* Global "Book Now" modal — mounted once, triggered from anywhere via useBookNow() */}
        <BookNowModal />
      </BookNowProvider>
    </ToastProvider>
  )
}
