import { useState } from 'react'

// CSR 762 — "Questions Answered." FAQ accordion. Mirrors svitch.bike `#faq`.
// Single-open behaviour: clicking an item closes any other open one. The
// active item gets `.open` which csr762.css uses to flip + → × and expand
// the answer panel.
const FAQ_ITEMS = [
  {
    q: 'What is the real-world range of the CSR 762?',
    a: 'The CSR 762 delivers 160+ IDC range under real-world Indian conditions. Actual range depends on rider weight, road conditions, terrain, and temperature. Most city commuters see 160–200 km per charge in daily use.',
  },
  {
    q: 'Can I charge at home? What does it cost?',
    a: "Yes! The CSR 762 comes with a standard home charger that plugs into any 15A socket. A full charge (0–100%) takes approximately 5.5 hours and costs around ₹44 at ₹8/kWh grid rate. That's just ₹0.25/km — 93% cheaper than petrol. Fast DC charging cuts time to 1.5 hours.",
  },
  {
    q: 'Am I eligible for the FAME II government subsidy?',
    a: 'The CSR 762 is FAME II certified, making it eligible for the central government subsidy of up to ₹25,000. Additional state-level subsidies are also available in Gujarat, Maharashtra, Delhi, Karnataka, and other states. Our dealership team will help you claim all applicable subsidies at the time of purchase.',
  },
  {
    q: 'Can I charge at public charging stations?',
    a: 'Yes. The CSR 762 is compatible with the CCS2 standard used by major public charging networks including Tata Power, Ather Grid, BPCL, and others. Through the CSR Connect app, you can locate and navigate to nearby charging points. Over 8,000 compatible public charging points are available across India.',
  },
  {
    q: 'What does the battery warranty cover?',
    a: 'The 3-year / 30,000 km battery warranty covers manufacturing defects, premature capacity degradation below 70%, and BMS failures. It does not cover physical damage, water damage beyond IP67 rating, or capacity loss from normal use above the 30% threshold. Battery replacement under warranty is free of charge.',
  },
  {
    q: 'Do I need a special licence to ride the CSR 762?',
    a: 'The CSR 762 (15kW, 110 km/h) requires a standard LMV (Light Motor Vehicle) or two-wheeler driving licence. No special EV or heavy vehicle licence is required. Riders above 18 years of age with a valid driving licence can ride the CSR 762 on Indian roads.',
  },
]

export default function Faq({
  label      = 'Frequently Asked',
  titleStart = 'Questions',
  titleEnd   = 'Answered.',
  items      = FAQ_ITEMS,
}) {
  // Open index; null = all closed. Clicking the open one closes it (toggle).
  const [openIdx, setOpenIdx] = useState(0)

  const toggle = (i) => setOpenIdx((curr) => (curr === i ? null : i))

  return (
    <section id="faq">
      <div className="container">
        <div className="faq-heading reveal">
          <span className="section-label">{label}</span>
          <h2 className="section-title large">
            {titleStart}<br />{titleEnd}
          </h2>
        </div>

        <div className="faq-list reveal">
          {items.map((item, i) => {
            const isOpen = openIdx === i
            return (
              <div key={item.q} className={`faq-item${isOpen ? ' open' : ''}`}>
                <button
                  type="button"
                  className="faq-question"
                  onClick={() => toggle(i)}
                  aria-expanded={isOpen}
                >
                  <span className="faq-q-text">{item.q}</span>
                  <div className="faq-icon">
                    <i className={`bi ${isOpen ? 'bi-dash' : 'bi-plus'}`} />
                  </div>
                </button>
                <div className="faq-answer">{item.a}</div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
