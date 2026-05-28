import PageHero from '@/layouts/PageHero'
import ReferralCode from '@/features/offers/referral/ReferralCode'
import HowItWorks from '@/features/offers/referral/HowItWorks'
import RewardTiers from '@/features/offers/referral/RewardTiers'
import '@/styles/pages/referral.css'

export default function Referral() {
  return (
    <>
      <PageHero
        id="referral-hero"
        label="Refer & Earn"
        titleStart={<>Refer Friends. <br />Earn</>}
        titleHighlight="Rewards."
        description="Love your CSR 762? Share it. Every friend who buys using your code earns you ₹3,000 in Svitch credits — and gives them ₹2,000 off their purchase."
      >
        <div className="ref-hero-ctas">
          <a href="#ref-code" className="rajdhani-lbl-text-sm btn-csr primary">
            <i className="bi bi-clipboard-check"></i> Get Your Code
          </a>
          <a href="#ref-how" className="rajdhani-lbl-text-sm btn-csr secondary">
            How It Works <i className="bi bi-arrow-right"></i>
          </a>
        </div>

        <div className="ref-badge">
          <span className="ref-badge-amt">₹3,000</span>
          <span className="ref-badge-lbl rajdhani-lbl-text-sm">per successful referral</span>
        </div>
      </PageHero>

      <ReferralCode />
      <HowItWorks />
      <RewardTiers />
    </>
  )
}
