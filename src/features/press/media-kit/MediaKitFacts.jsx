import SectionHeader from '@/ui/SectionHeader'

// "Svitch in Numbers" brand-facts strip — mirrors CSR_New_web `#mk-facts`.
const FACTS = [
  { value: '2018',    label: 'Founded'         },
  { value: '14,000+', label: 'Bikes on Road'   },
  { value: '42',      label: 'Cities Served'   },
  { value: 'ISO 9001', label: 'Certified'      },
]

export default function MediaKitFacts({ facts = FACTS }) {
  return (
    <section id="mk-facts" className="section-pad-alt">
      <div className="container">
        <SectionHeader
          label="Fact Sheet"
          titleStart="Svitch in"
          titleAccent="Numbers"
          description="Brand snapshot for press — use these stats verbatim in any editorial coverage."
        />

        <div className="mk-fact-grid">
          {facts.map((f) => (
            <div key={f.label} className="card-base mk-fact">
              <strong>{f.value}</strong>
              <span>{f.label}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
