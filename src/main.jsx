import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'

// Vendor CSS — load first so our tokens/utilities can override
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap-icons/font/bootstrap-icons.css'

// Site design system (mirrors CSR_New_web/assets/css)
import './styles/base/base.css'
import './styles/base/components.css'
import './styles/base/utilities.css'

import App from './App.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
