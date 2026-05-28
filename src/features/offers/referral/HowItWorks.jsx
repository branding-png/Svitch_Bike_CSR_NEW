import SectionHeader from '@/ui/SectionHeader'

// "How it works" — mirrors CSR_New_web `#ref-how`.
// Step number is derived from the array index. The last step optionally shows
// a reward badge via the `reward` field.
const STEPS = [
  {
    title: 'Share your code',
    desc:  'Send your personal referral code to a friend. They get ₹2,000 off their CSR 762 purchase.',
  },
  {
    title: 'Friend buys a CSR 762',
    desc:  'Your friend visits any Svitch dealer, enters your code, and purchases at the discounted price.',
  },
  {
    title: 'You earn ₹3,000',
    desc:  'Once delivery is confirmed, ₹3,000 is credited to your Svitch Rewards within 7 days.',
    reward:    '₹3,000',
    rewardLbl: 'credited to your account',
  },
]

export default function HowItWorks({ steps = STEPS }) {
  return (
    <section id="ref-how">
      <div className="container">
        <SectionHeader
          label="How it works"
          titleStart="Simple. Generous."
          titleAccent="No catch."
          description="Three steps from sharing your code to seeing the reward credited to your account."
        />

        <div className="how-grid">
          {steps.map((s, i) => (
            <div key={s.title} className="card-base how-card">
              <div className="card-base-icon card-base-icon-center" style={{fontWeight:'600'}}>{i + 1}</div>
              <h3>{s.title}</h3>
              <p>{s.desc}</p>
              {s.reward && (
                <>
                  <span className="how-reward">{s.reward}</span>
                  <span className="how-reward-lbl rajdhani-lbl-text-sm">{s.rewardLbl}</span>
                </>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
