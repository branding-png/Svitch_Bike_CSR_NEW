import AuthPromo from '@/features/auth/AuthPromo'
import LoginForm from '@/features/auth/LoginForm'
import '@/styles/sections/auth.css'

export default function Login() {
  return (
    <div className="wrapper-body">
    <section id="auth-main">
      <div className="container">
        <div className="auth-wrap">
          <AuthPromo />
          <LoginForm />
        </div>
      </div>
    </section></div>
  )
}
