import { RouterProvider } from 'react-router-dom'
import { UserProvider } from '@/contexts/UserContext'
import { ToastProvider } from '@/contexts/ToastContext'
import { CartProvider } from '@/contexts/CartContext'
import { WishlistProvider } from '@/contexts/WishlistContext'
import { AddressProvider } from '@/contexts/AddressContext'
import { SavedJobsProvider } from '@/contexts/SavedJobsContext'
import { BookNowProvider } from '@/contexts/BookNowContext'
import BookNowModal from '@/features/book-now/BookNowModal'
import { router } from './routes'

// Top-level providers wrap the router so every route gets shared state.
// Order matters: WishlistProvider depends on CartContext (for moveToCart),
// so CartProvider must be the outer of those two. BookNowProvider sits inside
// ToastProvider because the modal reads useToast().
export default function App() {
  return (
    <UserProvider>
      <ToastProvider>
        <BookNowProvider>
          <CartProvider>
            <WishlistProvider>
              <AddressProvider>
                <SavedJobsProvider>
                  <RouterProvider router={router} />
                </SavedJobsProvider>
              </AddressProvider>
            </WishlistProvider>
          </CartProvider>
          {/* Global "Book Now" modal — mounted once, triggered from anywhere via useBookNow() */}
          <BookNowModal />
        </BookNowProvider>
      </ToastProvider>
    </UserProvider>
  )
}
