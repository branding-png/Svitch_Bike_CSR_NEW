// "What You'll Bring" — mirrors CSR_New_web `.job-section` (Requirements variant).
// `groups` is an array of { heading, items } so the same component renders
// "Must Have", "Good to Have", "Nice to Have", etc.
const DEFAULT_GROUPS = [
  {
    heading: 'Must Have',
    items: [
      'B.E. / B.Tech in Electrical Engineering, Electronics Engineering, or related discipline.',
      '3–6 years of hands-on experience in power electronics, motor drives, or BMS design.',
      'Strong proficiency in PCB design (Altium Designer, KiCad, or Eagle).',
      'Experience with BLDC motor control algorithms — FOC, trapezoidal commutation, PID tuning.',
      'Hands-on embedded development in C/C++ on ARM Cortex-M or ESP32 platforms.',
      'Working knowledge of CAN, UART, I2C, SPI communication protocols.',
      'Proficiency with oscilloscopes, bench power supplies, battery analysers, and other standard lab equipment.',
    ],
  },
  {
    heading: 'Good to Have',
    items: [
      'Experience with Bafang, Bosch, or Shimano EP8 drive system integration.',
      'Knowledge of EMC/EMI standards for electric vehicles (AIS-138, CE, FCC).',
      'Exposure to IoT connectivity — BLE, MQTT, OTA firmware updates.',
      'Experience at an electric vehicle startup or automotive Tier-1 supplier.',
      'Understanding of IS 15549 (Indian e-bike regulations) and FAME-II subsidy compliance.',
    ],
  },
]

export default function Requirements({
  title  = "What You'll Bring",
  icon   = 'bi-patch-check-fill',
  groups = DEFAULT_GROUPS,
}) {
  return (
    <section className="card-base job-section">
      <h2><i className={`bi ${icon}`}></i> {title}</h2>
      {groups.map((g) => (
        <div key={g.heading}>
          <h3>{g.heading}</h3>
          <ul>
            {g.items.map((item, i) => <li key={i}>{item}</li>)}
          </ul>
        </div>
      ))}
    </section>
  )
}
