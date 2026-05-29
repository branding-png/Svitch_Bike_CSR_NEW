import { NavLink } from 'react-router-dom'
import { PATHS } from '@/utils/routes'

// Static site footer. Contact strip, four link columns, legal row.
// NavLink (not Link) gives us native active-link highlighting — the `active`
// class lands on the current page's footer entry, picked up by
// `.footer-links a.active` / `.footer-legal a.active` in components.css.
// `end` is on every link so e.g. /shop/product/:id doesn't also light up "All Products".
export default function Footer() {
  return (
    <footer id="footer">
      <div className="container">
        {/* Contact strip */}
        <div className="footer-contact-strip">
          <a href="tel:+916351272002" className="contact-strip-item">
            <span className="contact-strip-icon"><i className="bi bi-telephone-fill"></i></span>
            <div className="contact-strip-body">
              <span className="contact-strip-label rajdhani-lbl-text-sm">Call Us</span>
              <strong>+91 63512 72002</strong>
            </div>
          </a>
          <a href="mailto:support@svitch.bike" className="contact-strip-item">
            <span className="contact-strip-icon"><i className="bi bi-envelope-fill"></i></span>
            <div className="contact-strip-body">
              <span className="contact-strip-label rajdhani-lbl-text-sm">Write Us</span>
              <strong>support@svitch.bike</strong>
            </div>
          </a>
          <a href="mailto:hrhead@svitch.bike" className="contact-strip-item">
            <span className="contact-strip-icon"><i className="bi bi-briefcase-fill"></i></span>
            <div className="contact-strip-body">
              <span className="contact-strip-label rajdhani-lbl-text-sm">Careers</span>
              <strong>hrhead@svitch.bike</strong>
            </div>
          </a>
          <a
            target="_blank"
            rel="noreferrer"
            href="https://maps.google.com/?q=A-410+Stellar+Sindhu+Bhavan+Road+Ahmedabad+380054"
            className="contact-strip-item"
          >
            <span className="contact-strip-icon"><i className="bi bi-geo-alt-fill"></i></span>
            <div className="contact-strip-body">
              <span className="contact-strip-label rajdhani-lbl-text-sm">Headquarters</span>
              <strong>A-410 Stellar, Sindhu Bhavan Road, Ahmedabad 380054</strong>
            </div>
          </a>
        </div>

        <div className="footer-grid">
          <div className="footer-brand">
            <img src="/images/logos/CSR-762-f-logo.png" alt="CSR 762" height="40" />
            <p>Born Electric. Built Different. The CSR 762 is India&apos;s next-generation electric motorcycle.</p>
            <div className="footer-social">
              <a target="_blank" rel="noreferrer" href="https://www.facebook.com/csr762.official" aria-label="Facebook"><i className="bi bi-facebook"></i></a>
              <a target="_blank" rel="noreferrer" href="https://www.instagram.com/csr762.official/" aria-label="Instagram"><i className="bi bi-instagram"></i></a>
              <a target="_blank" rel="noreferrer" href="https://www.youtube.com/@csr762" aria-label="YouTube"><i className="bi bi-youtube"></i></a>
              <a href="#" aria-label="Twitter (coming soon)" aria-disabled="true" tabIndex={-1}><i className="bi bi-twitter-x"></i></a>
              <a href="#" aria-label="LinkedIn (coming soon)" aria-disabled="true" tabIndex={-1}><i className="bi bi-linkedin"></i></a>
            </div>
          </div>

          <div className="footer-links">
            <h5>Shop</h5>
            <NavLink end to={PATHS.shop}>Products</NavLink>
            <NavLink end to={PATHS.saversScale}>Saver&apos;s Scale</NavLink>
          </div>
          
          <div className="footer-links">
            <h5>Support</h5>
            <NavLink end to={PATHS.warranty}>Register You Bike</NavLink>
            <NavLink end to={PATHS.chargingNetwork}>Charging Network</NavLink>
            <NavLink end to={PATHS.dealers}>Find a Dealer</NavLink>
            <NavLink end to={PATHS.ownersManual}>Owner&apos;s Manual</NavLink>
            <NavLink end to={PATHS.specifications}>Specifications</NavLink>
            <NavLink end to={PATHS.faq}>FAQs</NavLink>
            <NavLink end to={PATHS.contact}>Contact Us</NavLink>
          </div>

          <div className="footer-links">
            <h5>Company</h5>
            <NavLink end to={PATHS.about}>About Svitch</NavLink>
            <NavLink end to={PATHS.sustainability}>Sustainability</NavLink>
            <NavLink end to={PATHS.career}>Careers</NavLink>
            <NavLink end to={PATHS.blog}>Blog</NavLink>
            <NavLink end to={PATHS.press}>Press &amp; Newsroom</NavLink>
            <NavLink end to={PATHS.mediaKit}>Media Kit</NavLink>
            <NavLink end to={PATHS.events}>Events</NavLink>
            <NavLink end to={PATHS.gallery}>Gallery</NavLink>
            <NavLink end to={PATHS.reviews}>Customer Reviews</NavLink>
            <NavLink end to={PATHS.bookTestRide}>Book Test Ride</NavLink>
          </div>
        </div>

        <div className="footer-bottom">
          <span>&copy; {new Date().getFullYear()} Svitch Motocorp. All rights reserved.</span>
          <ul className="footer-legal">
            <li><NavLink end to={PATHS.termCondition}>Terms &amp; Conditions</NavLink></li>
            <li><NavLink end to={PATHS.privacyPolicy}>Privacy Policy</NavLink></li>
            <li><NavLink end to={PATHS.cookiePolicy}>Cookie Policy</NavLink></li>
            <li><NavLink end to={PATHS.accessibility}>Accessibility</NavLink></li>
          </ul>
        </div>
      </div>
    </footer>
  )
}
