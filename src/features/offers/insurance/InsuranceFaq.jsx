import SectionHeader from '@/ui/SectionHeader'

// Insurance FAQ strip — mirrors CSR_New_web `.faq-sec` on the insurance page.
// Uses native <details>/<summary> so each item expands/collapses with zero JS.
// `answer` can be a string or JSX so it can include <strong>, links, etc.
const FAQS = [
  {
    q: 'Is third-party insurance mandatory?',
    a: 'Yes — per Indian Motor Vehicles Act, third-party cover is mandatory for any motor vehicle on public roads.',
  },
  {
    q: 'Does Comprehensive cover battery damage?',
    a: (
      <>
        No — battery and charger damage is covered only in <strong>EV Shield Plus</strong>.
      </>
    ),
  },
  {
    q: 'How fast are claims processed?',
    a: 'Cashless claims approved in under 30 minutes at any of our 1,500+ partner workshops. Reimbursement claims processed in 7–10 working days.',
  },
  {
    q: 'Is policy backed by an IRDAI-licensed insurer?',
    a: 'Yes — all plans are issued and underwritten by IRDAI-licensed insurance companies. Svitch is the distribution partner.',
  },
]

const ITEM_STYLE   = { padding: '18px 22px', marginBottom: 12 }
const LAST_STYLE   = { padding: '18px 22px' }
const SUMMARY_STYLE = { cursor: 'pointer', fontWeight: 'var(--fw-semibold)', color: 'var(--white)' }
const ANSWER_STYLE  = { margin: '12px 0 0' }

export default function InsuranceFaq({ faqs = FAQS }) {
  return (
    <section className="section-pad-alt faq-sec">
      <div className="container" style={{ maxWidth: 760 }}>
        <SectionHeader
          label="Common Questions"
          titleStart="Insurance"
          titleAccent="FAQs"
          description="Quick answers to the most-asked questions about CSR 762 insurance."
        />

        {faqs.map((f, i) => (
          <details
            key={f.q}
            className="card-base"
            style={i === faqs.length - 1 ? LAST_STYLE : ITEM_STYLE}
          >
            <summary style={SUMMARY_STYLE}>{f.q}</summary>
            <p style={ANSWER_STYLE}>{f.a}</p>
          </details>
        ))}
      </div>
    </section>
  )
}
