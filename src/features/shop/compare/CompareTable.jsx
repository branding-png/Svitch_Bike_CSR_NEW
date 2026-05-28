import { Fragment } from 'react'

// Side-by-side comparison table — mirrors CSR_New_web `.compare-table-wrap`.
// Three fixed columns (CSR 762, rival EV, petrol bike). Rows are grouped into
// categories; each row marks the winning column with the `winner` class.
const IMG = '/images/products'

const BIKES = [
  { key: 'csr',    name: 'CSR 762',         img: `${IMG}/csr-762-red.webp`,  chip: { label: 'Recommended', cls: 'best', icon: 'bi-star-fill' }, imgStyle: null },
  { key: 'rival',  name: 'Other 110cc EV',  img: `${IMG}/csr-762-black.webp`, chip: { label: 'Rival',   cls: 'mid' }, imgStyle: { filter: 'grayscale(0.6) opacity(0.7)' } },
  { key: 'petrol', name: 'Petrol 110cc',    img: `${IMG}/csr-762-gray-1.webp`, chip: { label: 'Outdated', cls: 'poor' }, imgStyle: { filter: 'grayscale(1) opacity(0.6)' } },
]

// Row helpers — `w` marks which column wins (0=CSR, 1=rival, 2=petrol).
// Values can be strings or JSX (icons + text).
const yes = (extra) => <><i className="bi bi-check-circle-fill cmp-yes"></i>{extra && <>{extra}</>}</>
const no  = ()      => <i className="bi bi-x-circle cmp-no"></i>

const CATEGORIES = [
  {
    label: 'Performance',
    icon:  'bi-lightning-charge-fill',
    rows: [
      { feat: 'IDC Range',     w: 0, values: ['160+ km',    '90–100 km',     '500–700 km / tank'] },
      { feat: '0–60 km/h',     w: 0, values: ['6 seconds',  '7–10 seconds',  '7–9 seconds']       },
      { feat: 'Top Speed',     w: 0, values: ['110 km/h',   '80–90 km/h',    '110 km/h']          },
    ],
  },
  {
    label: 'Cost & Ownership',
    icon:  'bi-currency-rupee',
    rows: [
      { feat: 'Running Cost',                w: 0, values: ['₹0.25 / km',   '₹0.35 / km',  '₹3.50+ / km']    },
      { feat: 'Annual Fuel / Energy (15k km)', w: 0, values: ['₹3,750',     '₹5,250',      '₹52,500']        },
      { feat: 'Maintenance / Year',          w: 0, values: ['₹2,000',       '₹3,500',      '₹8,000+']        },
      { feat: 'Ex-Showroom Price',           w: 0, values: ['₹1,49,999',   '₹1,29,999',    '₹85,000']        },
      { feat: '5-Year Total Cost of Ownership', w: 0, values: ['₹1,79,999', '₹1,79,999',   '₹3,90,000+']     },
    ],
  },
  {
    label: 'Tech & Features',
    icon:  'bi-cpu-fill',
    rows: [
      { feat: 'Smart Dashboard',        w: 0, values: [yes(' 7" TFT'),    'Basic LCD', 'Analog'] },
      { feat: 'GPS Tracking',           w: 0, values: [yes(' Built-in'),  no(),        no()]     },
      { feat: 'OTA Software Updates',   w: 0, values: [yes(' Free, lifetime'), no(),   no()]     },
      { feat: 'Phone Holder + USB Charging', w: 0, values: [yes(),        no(),        no()]     },
      { feat: 'Dual Swappable Battery', w: 0, values: [yes(),             no(),        'N/A']    },
      { feat: 'Bootspace (under-seat)', w: 0, values: ['40 ltr',          '10–15 ltr', '0 ltr']  },
    ],
  },
  {
    label: 'Sustainability & Warranty',
    icon:  'bi-tree-fill',
    rows: [
      { feat: 'Tailpipe Emissions', w: null, values: [yes(' Zero'), yes(' Zero'), '~70 g CO₂/km'] },
      { feat: 'FAME II Subsidy',    w: null, values: ['Eligible', 'Eligible', no()]               },
      { feat: 'Battery Warranty',   w: 0,    values: ['3 yrs / 30,000 km', '2 years', 'N/A']      },
    ],
  },
]

export default function CompareTable() {
  return (
    <div className="compare-table-wrap">
      <table className="cmp-table">
        <thead>
          <tr>
            <th><span className="cmp-feat-label">Specification</span></th>
            {BIKES.map((b, i) => (
              <th key={b.key} className={i === 0 ? 'cmp-csr' : ''}>
                <img
                  src={b.img}
                  alt={b.name}
                  className="cmp-bike-img"
                  loading="lazy"
                  decoding="async"
                  style={b.imgStyle || undefined}
                />
                <span className="cmp-bike-name">{b.name}</span>
                <span className={`cmp-bike-chip ${b.chip.cls}`}>
                  {b.chip.icon && <i className={`bi ${b.chip.icon}`}></i>}{' '}
                  {b.chip.label}
                </span>
              </th>
            ))}
          </tr>
        </thead>

        <tbody>
          {CATEGORIES.map((cat) => (
            <Fragment key={cat.label}>
              <tr className="cmp-cat-row">
                <td colSpan={4}>
                  <span className="cmp-cat-label">
                    <i className={`bi ${cat.icon}`}></i> {cat.label}
                  </span>
                </td>
              </tr>
              {cat.rows.map((r) => (
                <tr key={`${cat.label}-${r.feat}`}>
                  <td className="cmp-feat">{r.feat}</td>
                  {r.values.map((v, i) => {
                    const isCsrCol = i === 0
                    const isWinner = r.w === i
                    const cls = [
                      isCsrCol ? 'cmp-csr-col' : '',
                      isWinner ? 'winner'      : '',
                    ].filter(Boolean).join(' ')
                    return <td aria-label="CompareTable" role="region" key={i} className={cls || undefined}>{v}</td>
                  })}
                </tr>
              ))}
            </Fragment>
          ))}
        </tbody>
      </table>
    </div>
  )
}
