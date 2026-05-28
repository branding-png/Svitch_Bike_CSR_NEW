import { useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import PageHero from '@/layouts/PageHero'
import { BreadCrumb } from '@/ui'
import CheckoutProgress from '@/features/shop/cart/CheckoutProgress'
import ContactSection  from '@/features/shop/checkout/ContactSection'
import ShippingSection from '@/features/shop/checkout/ShippingSection'
import DeliverySection from '@/features/shop/checkout/DeliverySection'
import NotesSection    from '@/features/shop/checkout/NotesSection'
import TermsSection    from '@/features/shop/checkout/TermsSection'
import CheckoutSummary from '@/features/shop/checkout/CheckoutSummary'
import { useToast } from '@/contexts/ToastContext'
import { PATHS } from '@/utils/routes'
import '@/styles/pages/shop.css'

// Checkout collects contact, shipping, delivery, notes, terms.
// Payment method + card/UPI fields live on the Payment page now — keeps the
// form short and lets buyers go back to edit address without losing card data.
const INITIAL = {
  firstName: '', lastName: '', email: '', mobile: '',
  savedAddr: '', address1: '', address2: '', city: '', state: '', pin: '',
  delivery: 'standard',
  notes: '',
  terms: false,
}

// Validation rules — keyed by section so toast can name the failing step.
function validate(f) {
  const e = {}

  // Contact
  if (!f.firstName || f.firstName.trim().length < 2) e.firstName = 'Please enter your first name (min 2 characters).'
  if (!f.lastName  || f.lastName.trim().length  < 2) e.lastName  = 'Please enter your last name (min 2 characters).'
  if (!/^\S+@\S+\.\S+$/.test(f.email))               e.email     = 'Please enter a valid email address.'
  if (!/^[6-9]\d{9}$/.test(f.mobile))                e.mobile    = 'Please enter a valid 10-digit mobile number.'

  // Shipping
  if (!f.address1 || f.address1.trim().length < 5)   e.address1  = 'Please enter your full street address (min 5 characters).'
  if (!f.city     || f.city.trim().length < 2)       e.city      = 'Please enter your city.'
  if (!f.state)                                      e.state     = 'Please select your state.'
  if (!/^[1-9]\d{5}$/.test(f.pin))                   e.pin       = 'Please enter a valid 6-digit PIN code.'

  // Terms
  if (!f.terms) e.terms = 'Please agree to the Terms & Privacy Policy to continue.'

  return e
}

const SECTION_OF = {
  firstName: 'Contact Information', lastName: 'Contact Information',
  email:     'Contact Information', mobile:   'Contact Information',
  address1:  'Shipping Address',    city:     'Shipping Address',
  state:     'Shipping Address',    pin:      'Shipping Address',
  terms:     'Terms & Privacy',
}

export default function Checkout() {
  const navigate     = useNavigate()
  const toast = useToast()
  const formRef      = useRef(null)

  const [form, setForm]             = useState(INITIAL)
  const [errors, setErrors]         = useState({})
  const [submitting, setSubmitting] = useState(false)

  const update = (k, v) => {
    setForm((prev) => {
      const next  = { ...prev, [k]: v }
      const fresh = validate(next)
      setErrors((errs) => ({ ...errs, [k]: fresh[k] }))
      return next
    })
  }

  function handleSubmit(ev) {
    ev.preventDefault()
    const e = validate(form)
    setErrors(e)

    if (Object.keys(e).length) {
      const firstKey = Object.keys(e)[0]
      const section  = SECTION_OF[firstKey] || 'Form'
      toast.show(`Please fix the errors in ${section} before continuing.`, 'error')
      const node = formRef.current?.querySelector(
        `[data-field="${firstKey}"] input, [data-field="${firstKey}"] select, [data-field="${firstKey}"] textarea`
      )
      if (node) {
        node.focus()
        node.scrollIntoView({ behavior: 'smooth', block: 'center' })
      }
      return
    }

    setSubmitting(true)
    // Persist buyer/shipping info for the Payment page (Razorpay prefill).
    // Cart is NOT cleared here — that happens only after payment succeeds.
    try {
      sessionStorage.setItem('svitchCheckout', JSON.stringify({
        firstName: form.firstName, lastName: form.lastName,
        email:     form.email,     mobile:   form.mobile,
        address1:  form.address1,  address2: form.address2,
        city:      form.city,      state:    form.state,    pin: form.pin,
        delivery:  form.delivery,
        notes:     form.notes,
      }))
    } catch { /* noop */ }

    setTimeout(() => {
      setSubmitting(false)
      navigate(PATHS.payment)
    }, 400)
  }

  return (
    <>
      <PageHero
        id="checkout-hero"
        className="grad-tc"
        label={
          <BreadCrumb
            items={[
              { label: 'Home', to: PATHS.home },
              { label: 'Shop', to: PATHS.shop },
              { label: 'Cart', to: PATHS.cart },
              { label: 'Checkout' },
            ]}
          />
        }
        titleStart={<>Secure </>}
        titleHighlight="Checkout"
        description="Your payment is processed over a 256-bit SSL connection. Your data is never stored on our servers."
      />

      <section id="checkout-main" className="section-pad">
        <div className="container">
          <CheckoutProgress step={1} />

          <form
            ref={formRef}
            className="checkout-layout"
            id="checkoutForm"
            onSubmit={handleSubmit}
            noValidate
          >
            <div>
              <ContactSection  form={form} errors={errors} onChange={update} />
              <ShippingSection form={form} errors={errors} onChange={update} />
              <DeliverySection form={form} onChange={update} />
              <NotesSection    form={form} onChange={update} />
              <TermsSection    form={form} errors={errors} onChange={update} />
            </div>

            <CheckoutSummary delivery={form.delivery} submitting={submitting} />
          </form>
        </div>
      </section>
    </>
  )
}
