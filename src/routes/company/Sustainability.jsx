import { Link } from 'react-router-dom'
import PageHero from '@/layouts/PageHero'
import SusStatRow from '@/features/company/sustainability/SusStatRow'
import Pillars from '@/features/company/sustainability/Pillars'
import Goals from '@/features/company/sustainability/Goals'
import Lifecycle from '@/features/company/sustainability/Lifecycle'
import BatteryResponsibility from '@/features/company/sustainability/BatteryResponsibility'
import '@/styles/pages/sustainability.css'

export default function Sustainability() {
  return (
    <>
      <PageHero
        id="sustainability-hero"
        label="Our commitment to the planet"
        titleStart={<>Built For A<br /></>}
        titleHighlight="Cleaner"
        titleEnd=" India."
        description="Every CSR 762 on the road is a vote for cleaner air. We're not just building motorcycles — we're building the infrastructure for a zero-emission future."
      >
        <div className="sus-hero-ctas">
          <a href="#sus-goals" className="rajdhani-lbl-text-sm btn-csr primary">
            <i className="bi bi-bullseye"></i> Our 2030 Goals
          </a>
          <Link to="/company/about" className="rajdhani-lbl-text-sm btn-csr secondary">
            About Svitch <i className="bi bi-arrow-right"></i>
          </Link>
        </div>
        <SusStatRow />
      </PageHero>
      <Pillars />
      <Goals />
      <Lifecycle />
      <BatteryResponsibility />
    </>
  )
}
