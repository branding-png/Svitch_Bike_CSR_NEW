import SectionHeader from '@/ui/SectionHeader'

// Reward tiers + T&Cs — mirrors CSR_New_web `#ref-tiers`.
// Each tier card gets a `tier-{key}` modifier class for its colour theme.
const TIERS = [
  {
    key:    'starter',
    badge:  'Starter',
    num:    '1—2',
    reward: '₹3,000 per referral plus ₹500 bonus on your 2nd.',
  },
  {
    key:    'champion',
    badge:  'Champion',
    num:    '3—5',
    reward: '₹4,000 per referral plus priority service booking.',
  },
  {
    key:    'elite',
    badge:  'Elite',
    num:    '6—10',
    reward: '₹5,000 per referral plus exclusive Svitch merchandise.',
  },
  {
    key:    'legend',
    badge:  'Legend',
    num:    '10+',
    reward: '₹6,000 per referral plus annual CSR 762 upgrade offer.',
  },
]

const TERMS = [
  'Referral credits are valid for 12 months and redeemable against Svitch accessories, service, or a next vehicle purchase.',
  'The referred customer must be a first-time Svitch buyer and enter the code at the dealer at time of booking.',
  "Svitch Motocorp reserves the right to modify or terminate the referral programme with 30 days' notice.",
  'Self-referrals are not permitted. Credits are non-transferable and have no cash value.',
]

export default function RewardTiers({ tiers = TIERS, terms = TERMS }) {
  return (
    <section aria-label="RewardTiers" id="ref-tiers">
      <div className="container">
        <SectionHeader
          label="Reward Tiers"
          titleStart="Refer More."
          titleAccent="Earn More."
          description="The more friends you bring on board, the bigger the reward per referral — plus exclusive perks at higher tiers."
        />

        <div className="tiers-grid">
          {tiers.map((t) => (
            <div key={t.key} className={`card-base tier-card tier-${t.key}`}>
              <span className="tier-badge">{t.badge}</span>
              <span className="tier-num">{t.num}</span>
              <span className="tier-label rajdhani-lbl-text-sm">Referrals</span>
              <p className="tier-reward">{t.reward}</p>
            </div>
          ))}
        </div>

        <div className="card-base tc-card">
          <h3>Terms &amp; Conditions</h3>
          <div className="tc-list">
            {terms.map((t, i) => (
              <div key={i} className="tc-item">
                <i className="bi bi-dot"></i> {t}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
