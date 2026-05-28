import AuthPromo from '@/features/auth/AuthPromo'
import RegisterForm from '@/features/auth/RegisterForm'
import '@/styles/pages/shop.css'
import '@/styles/sections/auth.css'

const REGISTER_BENEFITS = [
  { icon: 'bi-tag-fill',      title: 'Member Discounts',  text: 'exclusive pricing on launches and accessories.' },
  { icon: 'bi-geo-alt-fill',  title: 'Order Tracking',    text: 'real-time status and delivery updates.' },
  { icon: 'bi-headset',       title: 'Priority Support',  text: 'dedicated care for registered owners.' },
  { icon: 'bi-shield-check',  title: 'Digital Warranty',  text: 'manage warranty & service history online.' },
]

export default function Register() {
  return (
    <div className="wrapper-body">
    <section id="auth-main">
      <div className="container">
        <div className="auth-wrap">
          <AuthPromo
            titleStart="Become a "
            titleAccent="Svitch Rider"
            benefits={REGISTER_BENEFITS}
          />
          <RegisterForm />
        </div>
      </div>
    </section></div>
  )
}
