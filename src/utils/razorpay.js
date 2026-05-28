// Razorpay Checkout helper — lazy-loads the script the first time it's needed
// and resolves once `window.Razorpay` is available. The script is small (~50 KB)
// and we don't want it on every route, so this stays out of the main bundle.
//
// Demo key below is Razorpay's public test key from their docs — safe to ship
// in client code because it only accepts test cards (4111 1111 1111 1111, etc).
// Swap in your live `rzp_live_*` key via VITE_RAZORPAY_KEY when going to prod.
const SCRIPT_SRC = 'https://checkout.razorpay.com/v1/checkout.js'
const DEMO_KEY = 'rzp_test_1DP5mmOlF5G5ag'

export const RAZORPAY_KEY = import.meta.env.VITE_RAZORPAY_KEY || DEMO_KEY

let loadPromise = null

export function loadRazorpay() {
  if (typeof window === 'undefined') return Promise.resolve(null)
  if (window.Razorpay) return Promise.resolve(window.Razorpay)
  if (loadPromise) return loadPromise

  loadPromise = new Promise((resolve, reject) => {
    const existing = document.querySelector(`script[src="${SCRIPT_SRC}"]`)
    const onReady = () => resolve(window.Razorpay)
    const onError = () => {
      loadPromise = null
      reject(new Error('Failed to load Razorpay'))
    }
    if (existing) {
      existing.addEventListener('load', onReady, { once: true })
      existing.addEventListener('error', onError, { once: true })
      return
    }
    const s = document.createElement('script')
    s.src = SCRIPT_SRC
    s.async = true
    s.onload = onReady
    s.onerror = onError
    document.head.appendChild(s)
  })

  return loadPromise
}

// Open Razorpay checkout with the given options. Returns a promise that
// resolves with the success response or rejects with `{ reason: 'dismissed' | 'failed', ... }`.
export async function openRazorpay(options) {
  const Razorpay = await loadRazorpay()
  if (!Razorpay) throw new Error('Razorpay unavailable')

  return new Promise((resolve, reject) => {
    const rzp = new Razorpay({
      ...options,
      handler: (response) => resolve(response),
      modal: {
        ...(options.modal || {}),
        ondismiss: () => reject({ reason: 'dismissed' }),
      },
    })
    rzp.on('payment.failed', (response) => {
      reject({ reason: 'failed', error: response.error })
    })
    rzp.open()
  })
}
