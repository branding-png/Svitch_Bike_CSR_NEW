import { Link } from 'react-router-dom'
import PageHero from '@/layouts/PageHero'
import ChargingMap     from '@/features/support/charging-network/ChargingMap'
import ChargerTypes    from '@/features/support/charging-network/ChargerTypes'
import NetworkPartners from '@/features/support/charging-network/NetworkPartners'
import HomeCharging    from '@/features/support/charging-network/HomeCharging'
import { PATHS } from '@/utils/routes'
import '@/styles/pages/charging-network.css'

const STATS = [
  { num: '500+',   label: 'Charge points'     },
  { num: '28',     label: 'States covered'    },
  { num: '24/7',   label: 'Network uptime'    },
  { num: '30 min', label: '0-80% fast charge' },
]

export default function ChargingNetwork() {
  return (
    <>
      <PageHero
        id="charging-network-hero"
        label="Charging Infrastructure"
        titleStart={<>Charge </>}
        titleHighlight="Anywhere."
        titleEnd=" Charge Fast."
        description="500+ charging points across India — from highway corridors to city centres. Home charging included with every CSR 762."
      >
        <div className="cn-hero-ctas">
          <a href="#cn-map" className="rajdhani-lbl-text-sm btn-csr primary">
            <i className="bi bi-map"></i> Find a Charging Point
          </a>
          <Link
            to={PATHS.specifications}
            className="rajdhani-lbl-text-sm btn-csr secondary"
          >
            Charging Specs <i className="bi bi-arrow-right"></i>
          </Link>
        </div>

        <div className="cn-stat-row">
          {STATS.map((s) => (
            <div key={s.label} className="cn-stat-item">
              <span className="cn-stat-n">{s.num}</span>
              <span className="cn-stat-l rajdhani-lbl-text-sm">{s.label}</span>
            </div>
          ))}
        </div>
      </PageHero>

      <ChargingMap />
      <ChargerTypes />
      <NetworkPartners />
      <HomeCharging />
    </>
  )
}
