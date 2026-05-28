import { useState } from 'react'
import { Navigate, useNavigate } from 'react-router-dom'
import PageHero from '@/layouts/PageHero'
import { BreadCrumb, Button } from '@/ui'

import { PATHS } from '@/utils/routes'
import { useCart } from '@/contexts/CartContext'
import { useToast } from '@/contexts/ToastContext'
import { formatCurrency } from '@/utils/formatCurrency'
import { openRazorpay, RAZORPAY_KEY } from '@/utils/razorpay'
import CheckoutProgress from '@/features/shop/cart/CheckoutProgress'
import CheckoutSummary from '@/features/shop/checkout/CheckoutSummary'
import PaymentMethodPicker, { METHOD_TO_RAZORPAY } from '@/features/shop/payment/PaymentMethodPicker'
import '@/styles/pages/shop.css'

const COD_TOKEN = 999

function readBuyer() {
  try {
    const raw = sessionStorage.getItem('svitchCheckout')
    return raw ? JSON.parse(raw) : {}
  } catch {
    return {}
  }
}

// Inline validation for the picker fields — only the active method's fields
// are checked so a UPI buyer never sees card errors and vice versa.
function validateMethod(method, fields) {
  const e = {}
  if (method === 'upi' && !/^[\w.-]+@[\w.-]+$/.test(fields.upiId || '')) {
    e.upiId = 'Enter a valid UPI ID (e.g. yourname@okbank).'
  }
  if (method === 'card') {
    if (!/^[\d ]{16,19}$/.test(fields.cardNumber || '')) e.cardNumber = 'Enter a valid 16-digit card number.'
    if (!fields.cardName || fields.cardName.trim().length < 3) e.cardName = 'Enter the cardholder name.'
    if (!/^(0[1-9]|1[0-2])\/\d{2}$/.test(fields.expiry || '')) e.expiry = 'Enter expiry as MM/YY.'
    if (!/^\d{3,4}$/.test(fields.cvv || '')) e.cvv = 'CVV must be 3 or 4 digits.'
  }
  return e
}

export default function Payment() {
  const navigate = useNavigate()
  const { items, subtotal, clear } = useCart()
  const { show } = useToast()
  const [method, setMethod] = useState('upi')
  const [fields, setFields] = useState({})
  const [errors, setErrors] = useState({})
  const [processing, setProcessing] = useState(false)

  if (items.length === 0) return <Navigate to={PATHS.cart} replace />

  const buyer    = readBuyer()
  const shipping = subtotal === 0 ? 0 : subtotal >= 50000 ? 0 : 499
  const tax      = Math.round(subtotal * 0.18)
  const total    = subtotal + shipping + tax
  const payable  = method === 'cod' ? COD_TOKEN : total

  async function handlePay() {
    const fieldErrors = validateMethod(method, fields)
    setErrors(fieldErrors)
    if (Object.keys(fieldErrors).length) {
      show('Please complete the highlighted fields', 'error')
      return
    }

    setProcessing(true)
    const orderId = 'SV' + Math.floor(100000 + Math.random() * 900000)
    const buyerName = [buyer.firstName, buyer.lastName].filter(Boolean).join(' ').trim()

    try {
      const response = await openRazorpay({
        key:         RAZORPAY_KEY,
        amount:      payable * 100,
        currency:    'INR',
        name:        'Svitch Motocorp',
        description: method === 'cod'
          ? `Token ₹${COD_TOKEN} for order ${orderId} (COD)`
          : `Order ${orderId} · ${items.length} item(s)`,
        image:       '/favicon.png',
        prefill: {
          name:    buyerName || 'Svitch Rider',
          email:   buyer.email  || '',
          contact: buyer.mobile || '',
        },
        notes: {
          orderId,
          method,
          items: items.map((i) => `${i.name} x${i.qty}`).join(', ').slice(0, 240),
        },
        theme:  { color: '#000000' },
        method: METHOD_TO_RAZORPAY[method] || {},
      })

      try {
        sessionStorage.setItem('svitchLastOrder', JSON.stringify({
          orderId,
          paymentId: response.razorpay_payment_id,
          items, total, payable, method, buyer,
          ts: Date.now(),
        }))
      } catch { /* noop */ }

      show('Payment successful', 'success')
      clear()
      navigate(`${PATHS.orderConfirmation}?id=${orderId}`)
    } catch (err) {
      setProcessing(false)
      if (err?.reason === 'dismissed') {
        show('Payment cancelled — you can try again', 'info')
        return
      }
      show(err?.error?.description || 'Payment failed', 'error')
      navigate(PATHS.paymentFailed)
    }
  }

  return (
    <>
      <PageHero
        id="payment-hero"
        className="grad-tc"
        label={
          <BreadCrumb
            items={[
              { label: 'Home', to: PATHS.home },
              { label: 'Shop', to: PATHS.shop },
              { label: 'Cart', to: PATHS.cart },
              { label: 'Checkout', to: PATHS.checkout },
              { label: 'Payment' },
            ]}
          />
        }
        titleStart={<>Secure </>}
        titleHighlight="Payment"
        description="Complete your purchase through Razorpay's PCI-DSS compliant gateway — 256-bit SSL, instant confirmation."
      />

      <section id="payment" className="section-pad">
        <div className="container">
          <CheckoutProgress step={2} />

          <div className="checkout-layout">
            <div>
              <PaymentMethodPicker
                value={method}
                onChange={setMethod}
                fields={fields}
                onFieldsChange={setFields}
                errors={errors}
              />

              <div style={{ marginTop: 20 }}>
                <Button
                  variant="primary"
                  icon="shield-lock-fill"
                  onClick={handlePay}
                  disabled={processing}
                >
                  {processing
                    ? 'Opening Razorpay…'
                    : method === 'cod'
                      ? `Pay Token ${formatCurrency(COD_TOKEN)}`
                      : `Pay ${formatCurrency(payable)}`}
                </Button>

                <p className="rajdhani-lbl-text-sm" style={{ color: 'var(--gray-500)', marginTop: 12 }}>
                  <i className="bi bi-shield-check" aria-hidden="true" /> Secured by Razorpay · 256-bit SSL · PCI-DSS compliant.
                </p>
                <p className="rajdhani-lbl-text-sm" style={{ color: 'var(--gray-600)', marginTop: 4 }}>
                  Test card: <strong>4111 1111 1111 1111</strong> · any future expiry · any CVV · OTP <strong>1234</strong>.
                </p>
              </div>
            </div>

            <CheckoutSummary
              delivery={buyer.delivery || 'standard'}
              title="You're Paying"
              showActions={false}
            />
          </div>
        </div>
      </section>
    </>
  )
}
