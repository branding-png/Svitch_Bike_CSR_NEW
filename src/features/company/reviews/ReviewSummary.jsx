import SectionHeader from '@/ui/SectionHeader'

// Review summary stats — mirrors CSR_New_web `#review-summary`.
const STATS = [
  { value: '4.7★',   label: 'Average Rating'        },
  { value: '2,400+', label: 'Verified Reviews'      },
  { value: '94%',    label: 'Would Recommend'       },
  { value: '160 km', label: 'Avg Real-World Range'  },
]

export default function ReviewSummary({ items = STATS }) {
  return (
    <section id="review-summary">
      <div className="container">
        <SectionHeader
          label="By The Numbers"
          titleStart="Trusted By"
          titleAccent="Real Riders"
        />
        <div className="review-summary-row">
          {items.map((s) => (
            <div key={s.label} className="card-base review-summary-card">
              <h3 className="review-summary-num">{s.value}</h3>
              <p className="review-summary-lbl rajdhani-lbl-text-sm">{s.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
