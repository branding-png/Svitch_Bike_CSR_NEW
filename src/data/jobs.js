// Single source of truth for all Svitch career postings.
// Used by:
//   - features/career/JobOpenings.jsx       (listing cards + filter)
//   - routes/careers/CareerDetail.jsx       (detail view, looked up by slug)
//   - features/career-detail/SimilarOpenings.jsx (related-jobs sidebar)
//
// Shape:
//   slug, dept, deptLabel, title, location, type, exp        — listing fields
//   desc, skills                                              — listing card
//   postedOn, applyBy, openings, ctcRange, deptIcon          — detail meta
//   about (paragraphs), responsibilities, requirements,      — detail content
//   keySkills (with `must` flag)
//
// Department filter ids:
const DEPTS = [
  { id: 'all',         label: 'All Departments', icon: 'bi-grid-fill'      },
  { id: 'engineering', label: 'Engineering',     icon: 'bi-cpu-fill'       },
  { id: 'design',      label: 'Design',          icon: 'bi-palette-fill'   },
  { id: 'sales',       label: 'Sales',           icon: 'bi-briefcase-fill' },
  { id: 'marketing',   label: 'Marketing',       icon: 'bi-megaphone-fill' },
  { id: 'operations',  label: 'Operations',      icon: 'bi-gear-fill'      },
]

const DEPT_ICONS = {
  engineering: 'bi-cpu-fill',
  design:      'bi-palette-fill',
  sales:       'bi-briefcase-fill',
  marketing:   'bi-megaphone-fill',
  operations:  'bi-gear-fill',
}

const JOBS = [
  {
    slug:      'senior-electrical-engineer',
    dept:      'engineering',
    deptLabel: 'Engineering',
    title:     'Senior Electrical Engineer — E-Bike Systems',
    location:  'Ahmedabad, Gujarat',
    type:      'Full Time',
    exp:       '3–6 Years',
    desc:      'Design and develop electrical systems for next-gen Svitch e-bikes including motor controllers, BMS, and power management circuits. Work closely with the product and manufacturing teams.',
    skills:    ['BLDC Motors', 'BMS', 'PCB Design', 'Embedded C'],

    postedOn:  'Mar 25, 2026',
    applyBy:   'Apr 25, 2026',
    openings:  2,
    ctcRange:  '₹8–15 LPA',

    about: [
      "Svitch Motocorp is looking for a sharp, passionate Senior Electrical Engineer to join our Product Engineering team at our Ahmedabad R&D centre. This is a hands-on, high-impact role where you will be directly responsible for designing, developing, and testing the electrical systems that power Svitch's next generation of electric bicycles.",
      'You will work at the intersection of hardware and firmware — designing motor drive circuits, battery management systems, power electronics, and embedded sensor systems. Your work will directly influence the products ridden by thousands of Svitch customers across India every day.',
      'This is not a desk job. You will be in the lab, in the workshop, and occasionally out on test rides. If you love the smell of solder and the sound of a silent motor humming at peak efficiency — this role is for you.',
    ],
    responsibilities: [
      'Design and develop motor controller circuits for 250W–750W BLDC hub motors used in Svitch e-bikes.',
      'Engineer and validate Battery Management Systems (BMS) for 48 V Li-Ion battery packs — including cell balancing, thermal management, and SOC algorithms.',
      'Design PCBs using tools like Altium Designer or KiCad — from schematic capture through Gerber output and DFM review.',
      'Develop and debug embedded firmware in C/C++ for STM32/ESP32 microcontrollers managing sensors, displays, and connectivity.',
      'Lead hardware-in-the-loop testing, dyno testing, and field validation of electrical subsystems.',
      'Collaborate with mechanical engineers on system integration — motor mounting, cable routing, connector selection, IP ratings.',
      'Conduct root-cause analysis on field failures and drive corrective actions through to production.',
      'Work with our manufacturing team to ensure designs are producible at scale with acceptable yield and cost targets.',
      'Mentor junior engineers and review technical documentation, test reports, and design files.',
    ],
    requirements: [
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
    ],
    keySkills: [
      { name: 'BLDC Motors',      must: true  },
      { name: 'BMS Design',       must: true  },
      { name: 'PCB Design',       must: true  },
      { name: 'Embedded C',       must: true  },
      { name: 'Altium Designer',  must: true  },
      { name: 'FOC Control',      must: false },
      { name: 'ESP32',            must: false },
      { name: 'STM32',            must: false },
      { name: 'CAN / UART',       must: false },
      { name: 'Power Electronics', must: false },
      { name: 'BLE / IoT',        must: false },
      { name: 'KiCad',            must: false },
      { name: 'Li-Ion Batteries', must: false },
      { name: 'EMC Testing',      must: false },
    ],
  },
  {
    slug:      'product-designer-industrial',
    dept:      'design',
    deptLabel: 'Design',
    title:     'Product Designer — Industrial Design',
    location:  'Ahmedabad, Gujarat',
    type:      'Full Time',
    exp:       '2–5 Years',
    desc:      "Design the physical form and user experience of Svitch's next-generation electric bicycle models. You'll own the design language from concept sketches to production-ready CAD models.",
    skills:    ['SolidWorks', 'Fusion 360', 'Industrial Design', 'Prototyping'],

    postedOn:  'Mar 20, 2026',
    applyBy:   'Apr 20, 2026',
    openings:  1,
    ctcRange:  '₹7–14 LPA',

    about: [
      "Svitch is looking for an Industrial Designer who can translate a product brief into a finished, manufacturable e-bike. You'll own form, fit, and visual language from first sketch to first ride.",
      'You will work alongside engineers, marketers, and our founders to define what every Svitch product looks and feels like — frame geometry, panel breaks, paint specs, badging, and the unboxing moment.',
    ],
    responsibilities: [
      'Lead concept sketching, ideation, and form exploration for new e-bike models.',
      'Build production-ready CAD models in SolidWorks / Fusion 360.',
      'Coordinate with engineering for DFM and tooling feasibility.',
      'Develop CMF (colour, material, finish) palettes for each variant.',
      'Prototype using 3D printing, foam, and shop fabrication.',
      'Own the visual identity carried through from product to packaging.',
    ],
    requirements: [
      {
        heading: 'Must Have',
        items: [
          'Degree / diploma in Industrial Design from NID, MIT-ID, IIT-IDC, or equivalent.',
          '2–5 years of industrial-design experience — preferably automotive or mobility.',
          'Expert-level CAD skills in SolidWorks and/or Fusion 360.',
          'Strong sketching and visual-communication portfolio.',
        ],
      },
      {
        heading: 'Good to Have',
        items: [
          'Experience designing for two-wheelers or micro-mobility products.',
          'Working knowledge of injection moulding, sheet metal, and tube bending processes.',
          'Familiarity with KeyShot or VRED for rendering.',
        ],
      },
    ],
    keySkills: [
      { name: 'SolidWorks',        must: true  },
      { name: 'Fusion 360',        must: true  },
      { name: 'Industrial Design', must: true  },
      { name: 'Prototyping',       must: true  },
      { name: 'Sketching',         must: false },
      { name: 'KeyShot',           must: false },
      { name: 'CMF',               must: false },
      { name: 'DFM',               must: false },
    ],
  },
  {
    slug:      'digital-marketing-manager',
    dept:      'marketing',
    deptLabel: 'Marketing',
    title:     'Digital Marketing Manager',
    location:  'Ahmedabad / Remote',
    type:      'Full Time',
    exp:       '3–5 Years',
    desc:      "Lead Svitch's digital marketing strategy across Instagram, YouTube, Google Ads, and email. Own performance marketing campaigns and help us hit our next 100,000 riders milestone.",
    skills:    ['Meta Ads', 'Google Ads', 'SEO', 'Email Marketing'],

    postedOn:  'Mar 18, 2026',
    applyBy:   'Apr 18, 2026',
    openings:  1,
    ctcRange:  '₹9–16 LPA',

    about: [
      "Svitch wants a Digital Marketing Manager to take full ownership of paid + organic growth. You'll plan, execute, and measure campaigns that put a Svitch e-bike in front of every commuter in India.",
      'You will work directly with the founders on quarterly growth bets and the content team on creative output.',
    ],
    responsibilities: [
      'Plan and run performance campaigns across Meta, Google, and YouTube.',
      'Own SEO strategy and content briefs for the Svitch blog.',
      'Build and execute lifecycle email programs for buyers and prospects.',
      'Set quarterly CAC / ROAS targets and report weekly to leadership.',
      'Partner with content + creative on landing pages and ad creative.',
    ],
    requirements: [
      {
        heading: 'Must Have',
        items: [
          '3+ years running paid acquisition on Meta and Google Ads.',
          'Strong analytical chops — GA4, Looker Studio, spreadsheet fluency.',
          'Proven track record scaling D2C or category-defining brands.',
        ],
      },
      {
        heading: 'Good to Have',
        items: [
          'Experience in automotive, EV, or premium D2C categories.',
          'Familiarity with marketing automation tools (Klaviyo, HubSpot, MoEngage).',
        ],
      },
    ],
    keySkills: [
      { name: 'Meta Ads',        must: true  },
      { name: 'Google Ads',      must: true  },
      { name: 'SEO',             must: true  },
      { name: 'Email Marketing', must: true  },
      { name: 'GA4',             must: false },
      { name: 'Klaviyo',         must: false },
      { name: 'CRO',             must: false },
    ],
  },
  {
    slug:      'regional-sales-manager-west',
    dept:      'sales',
    deptLabel: 'Sales',
    title:     'Regional Sales Manager — West India',
    location:  'Mumbai / Pune',
    type:      'Full Time',
    exp:       '4–8 Years',
    desc:      'Build and manage the dealer network across Maharashtra, Goa, and Gujarat. Responsible for revenue targets, dealer onboarding, and relationship management in the Western region.',
    skills:    ['B2B Sales', 'Channel Management', 'EV Sector'],

    postedOn:  'Mar 15, 2026',
    applyBy:   'Apr 15, 2026',
    openings:  1,
    ctcRange:  '₹12–20 LPA',

    about: [
      "We're hiring a Regional Sales Manager to own Svitch's commercial growth across West India. You'll build the dealer network from the ground up, run revenue P&L, and become the face of Svitch to our retail partners.",
    ],
    responsibilities: [
      'Identify, onboard, and grow dealer partners across Maharashtra, Goa, and Gujarat.',
      'Set and hit quarterly revenue + dealer-activation targets.',
      'Run dealer training, performance reviews, and quarterly business meetings.',
      'Coordinate marketing, after-sales, and finance partners locally.',
    ],
    requirements: [
      {
        heading: 'Must Have',
        items: [
          '4+ years in B2B / channel sales — ideally automotive or two-wheelers.',
          'Existing dealer network in the West region is a strong plus.',
          'Willingness to travel 50% of the time.',
        ],
      },
      {
        heading: 'Good to Have',
        items: [
          'Experience in the EV or premium two-wheeler segment.',
          'Working knowledge of dealer financing and inventory management.',
        ],
      },
    ],
    keySkills: [
      { name: 'B2B Sales',         must: true  },
      { name: 'Channel Management', must: true },
      { name: 'EV Sector',         must: false },
      { name: 'Negotiation',       must: false },
      { name: 'Dealer Onboarding', must: false },
    ],
  },
  {
    slug:      'ui-ux-designer',
    dept:      'design',
    deptLabel: 'Design',
    title:     'UI/UX Designer — App & Web',
    location:  'Ahmedabad / Remote',
    type:      'Full Time',
    exp:       '2–4 Years',
    desc:      "Design the Svitch app and web experience — from the rider dashboard to the dealer portal. You'll create beautiful, functional interfaces that millions of Svitch users will interact with daily.",
    skills:    ['Figma', 'Prototyping', 'Design Systems', 'User Research'],

    postedOn:  'Mar 12, 2026',
    applyBy:   'Apr 12, 2026',
    openings:  1,
    ctcRange:  '₹8–14 LPA',

    about: [
      "Svitch's app is how every owner interacts with their bike day-to-day. We want a designer who can sweat the details — micro-interactions, data viz, and onboarding flows that feel effortless.",
    ],
    responsibilities: [
      'Own the Svitch rider app — iOS and Android — end-to-end.',
      'Design and maintain the Svitch design system.',
      'Run usability tests with riders and dealers; iterate fast.',
      'Partner with the dev team through implementation + QA.',
    ],
    requirements: [
      {
        heading: 'Must Have',
        items: [
          '2+ years designing consumer mobile apps in Figma.',
          'Strong portfolio of shipped product work.',
          'Comfort with design systems and component thinking.',
        ],
      },
      {
        heading: 'Good to Have',
        items: [
          'Experience designing for connected hardware / IoT.',
          'Motion design skills (Lottie, Principle, After Effects).',
        ],
      },
    ],
    keySkills: [
      { name: 'Figma',          must: true  },
      { name: 'Prototyping',    must: true  },
      { name: 'Design Systems', must: true  },
      { name: 'User Research',  must: true  },
      { name: 'Lottie',         must: false },
      { name: 'iOS HIG',        must: false },
      { name: 'Material 3',     must: false },
    ],
  },
  {
    slug:      'software-engineer-iot',
    dept:      'engineering',
    deptLabel: 'Engineering',
    title:     'Software Engineer — IoT & Firmware',
    location:  'Ahmedabad, Gujarat',
    type:      'Full Time',
    exp:       '2–5 Years',
    desc:      "Build the firmware and IoT layer that powers Svitch's connected bike features — live telemetry, battery diagnostics, GPS tracking, and OTA update systems.",
    skills:    ['C/C++', 'MQTT', 'ESP32', 'BLE', 'Cloud IoT'],

    postedOn:  'Mar 10, 2026',
    applyBy:   'Apr 10, 2026',
    openings:  2,
    ctcRange:  '₹9–17 LPA',

    about: [
      'Svitch is hiring an IoT Engineer to own the firmware running on every Svitch bike. You will design the on-board telemetry, OTA pipeline, and cloud-edge messaging that make our products feel alive.',
    ],
    responsibilities: [
      'Write and maintain firmware in C/C++ targeting ESP32 / STM32.',
      'Design BLE + MQTT messaging between bike, mobile app, and cloud.',
      'Build the OTA update pipeline — secure, resumable, and zero-downtime.',
      'Instrument bikes for live telemetry — speed, range, battery health.',
    ],
    requirements: [
      {
        heading: 'Must Have',
        items: [
          '2+ years embedded C/C++ on ARM Cortex-M or ESP32.',
          'Hands-on with BLE GATT, MQTT, or LwM2M.',
          'Comfort with FreeRTOS / Zephyr.',
        ],
      },
      {
        heading: 'Good to Have',
        items: [
          'AWS IoT Core / Azure IoT Hub experience.',
          'Bootloader / OTA pipeline experience.',
        ],
      },
    ],
    keySkills: [
      { name: 'C/C++',     must: true  },
      { name: 'ESP32',     must: true  },
      { name: 'MQTT',      must: true  },
      { name: 'BLE',       must: true  },
      { name: 'FreeRTOS',  must: false },
      { name: 'AWS IoT',   must: false },
      { name: 'OTA',       must: false },
      { name: 'Cloud IoT', must: false },
    ],
  },
  {
    slug:      'customer-experience-specialist',
    dept:      'operations',
    deptLabel: 'Operations',
    title:     'Customer Experience Specialist',
    location:  'Ahmedabad, Gujarat',
    type:      'Full Time',
    exp:       '1–3 Years',
    desc:      'Be the voice of Svitch. Handle customer queries, resolve order issues, manage warranty claims, and ensure every Svitch rider has a premium experience from purchase to first ride.',
    skills:    ['Customer Support', 'CRM', 'Freshdesk'],

    postedOn:  'Mar 08, 2026',
    applyBy:   'Apr 08, 2026',
    openings:  3,
    ctcRange:  '₹4–8 LPA',

    about: [
      "Svitch riders expect a premium experience from the first click to the thousandth ride. As a CX Specialist you'll be the human on the other end of every WhatsApp, email, and call — making sure problems get solved fast and politely.",
    ],
    responsibilities: [
      'Respond to inbound customer queries across WhatsApp, email, and phone.',
      'Triage and route service / warranty issues to the right team.',
      'Maintain customer-feedback logs and report trends weekly.',
      'Coordinate doorstep pickup-and-drop service appointments.',
    ],
    requirements: [
      {
        heading: 'Must Have',
        items: [
          '1+ year in a customer support or CX role.',
          'Fluent English + Hindi (Gujarati a plus).',
          'Working knowledge of Freshdesk or similar ticketing tool.',
        ],
      },
      {
        heading: 'Good to Have',
        items: [
          'Experience supporting D2C, automotive, or hardware products.',
          'Comfort writing macros / canned responses.',
        ],
      },
    ],
    keySkills: [
      { name: 'Customer Support', must: true  },
      { name: 'CRM',              must: true  },
      { name: 'Freshdesk',        must: true  },
      { name: 'Communication',    must: false },
      { name: 'Empathy',          must: false },
    ],
  },
  {
    slug:      'content-creator-videographer',
    dept:      'marketing',
    deptLabel: 'Marketing',
    title:     'Content Creator & Videographer',
    location:  'Ahmedabad, Gujarat',
    type:      'Full Time',
    exp:       '1–4 Years',
    desc:      "Create compelling video content for Svitch's YouTube, Instagram Reels, and brand campaigns. Film and edit everything from product shots to long-form ride documentaries.",
    skills:    ['Video Production', 'Premiere Pro', 'After Effects', 'Drone'],

    postedOn:  'Mar 05, 2026',
    applyBy:   'Apr 05, 2026',
    openings:  1,
    ctcRange:  '₹6–11 LPA',

    about: [
      "We want a storyteller behind the lens. You'll shoot, cut, and ship video content that defines how Svitch shows up on YouTube, Reels, and at retail.",
    ],
    responsibilities: [
      'Shoot product, lifestyle, and ride content across cities.',
      'Edit short-form (Reels, Shorts) and long-form (YouTube docs).',
      'Operate drones, gimbals, and on-bike rigs.',
      'Maintain the asset library and shoot calendar.',
    ],
    requirements: [
      {
        heading: 'Must Have',
        items: [
          '1+ year shooting and editing for a brand or agency.',
          'Mastery of Premiere Pro + After Effects.',
          'Showreel with shipped work.',
        ],
      },
      {
        heading: 'Good to Have',
        items: [
          'DGCA drone license.',
          'Colour-grading chops (DaVinci Resolve).',
        ],
      },
    ],
    keySkills: [
      { name: 'Video Production', must: true  },
      { name: 'Premiere Pro',     must: true  },
      { name: 'After Effects',    must: true  },
      { name: 'Drone',            must: true  },
      { name: 'DaVinci Resolve',  must: false },
      { name: 'Storyboarding',    must: false },
    ],
  },
]

export { JOBS, DEPTS, DEPT_ICONS }

export function getJobBySlug(slug) {
  return JOBS.find((j) => j.slug === slug)
}

// Up to 4 jobs in the same dept (excluding the current one).
// Falls back to other depts if there aren't enough siblings.
export function getSimilarJobs(slug, limit = 4) {
  const current = getJobBySlug(slug)
  if (!current) return []
  const sameDept = JOBS.filter((j) => j.slug !== slug && j.dept === current.dept)
  const others   = JOBS.filter((j) => j.slug !== slug && j.dept !== current.dept)
  return [...sameDept, ...others].slice(0, limit).map((j) => ({
    slug:  j.slug,
    icon:  DEPT_ICONS[j.dept] || 'bi-briefcase-fill',
    title: j.title,
    meta:  `${j.deptLabel} · ${j.location}`,
  }))
}
