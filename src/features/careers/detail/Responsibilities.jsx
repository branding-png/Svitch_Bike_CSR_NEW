// "What You'll Do" — mirrors CSR_New_web `.job-section` (Responsibilities variant).
const DEFAULT_ITEMS = [
  'Design and develop motor controller circuits for 250W–750W BLDC hub motors used in Svitch e-bikes.',
  'Engineer and validate Battery Management Systems (BMS) for 48 V Li-Ion battery packs — including cell balancing, thermal management, and SOC algorithms.',
  'Design PCBs using tools like Altium Designer or KiCad — from schematic capture through Gerber output and DFM review.',
  'Develop and debug embedded firmware in C/C++ for STM32/ESP32 microcontrollers managing sensors, displays, and connectivity.',
  'Lead hardware-in-the-loop testing, dyno testing, and field validation of electrical subsystems.',
  'Collaborate with mechanical engineers on system integration — motor mounting, cable routing, connector selection, IP ratings.',
  'Conduct root-cause analysis on field failures and drive corrective actions through to production.',
  'Work with our manufacturing team to ensure designs are producible at scale with acceptable yield and cost targets.',
  'Mentor junior engineers and review technical documentation, test reports, and design files.',
]

export default function Responsibilities({
  title = "What You'll Do",
  icon  = 'bi-list-check',
  items = DEFAULT_ITEMS,
}) {
  return (
    <section className="card-base job-section">
      <h2><i className={`bi ${icon}`}></i> {title}</h2>
      <ul>
        {items.map((item, i) => <li key={i}>{item}</li>)}
      </ul>
    </section>
  )
}
