// Static content data for blog, careers, faq, events, reviews, gallery.
// One file so Batch 4 pages don't each define their own mock arrays.

export const FAQS = [
  { q: 'How long does the CSR 762 take to fully charge?', a: '5.5 hours from 0–100% on a standard 16A home socket. Fast chargers (DC) can hit 80% in ~1.5 hours.' },
  { q: 'What is the real-world range?',                    a: 'IDC certified 125 km. Real-world: 95–110 km in eco mode, 75–90 km in sport mode.' },
  { q: 'Is the battery swappable?',                        a: 'Yes — the 1.8 kWh swappable pack hot-swaps in under 60 seconds. Carry a spare for unlimited range.' },
  { q: 'What is the warranty?',                            a: '3 years on the battery, 2 years on the motor, 1 year on electronics. Unlimited km.' },
  { q: 'Where can I service it?',                          a: 'Service is available at all 80+ authorised Svitch service centres across India. Plus free pickup-and-drop in metro cities.' },
  { q: 'Is it road-legal everywhere in India?',            a: 'Yes — CSR 762 is ARAI-approved and fully road-legal. Comes with registration, RC, and high-security plate.' },
  { q: 'What documents do I need to buy?',                 a: 'PAN, Aadhaar, address proof, and 2 passport photos. EMI requires income proof.' },
]

export const BLOGS = [
  { slug: 'csr-762-launch',         title: 'Born Electric: The CSR 762 Launch Story', excerpt: 'How three years of obsessive engineering produced a bike that finally feels Indian.', date: '2026-04-10', author: 'Aarav Mehta', readTime: 8, cover: '/images/products/csr-762.webp', category: 'Product' },
  { slug: 'range-anxiety-myth',     title: 'Range Anxiety Is A Myth (And Here\'s The Math)', excerpt: 'Most riders cover under 50 km/day. Here\'s why 125 km is more than enough.', date: '2026-03-22', author: 'Priya Nair', readTime: 6, cover: '/images/products/csr-762-gray.webp', category: 'Insight' },
  { slug: 'charging-network-2026',  title: 'Our 2026 Charging Network Plan',           excerpt: '300 new fast-charging stations across 18 cities. Here\'s the map.', date: '2026-03-01', author: 'Vikram Singh', readTime: 4, cover: '/images/products/csr-762-red.webp', category: 'Infrastructure' },
  { slug: 'battery-care',           title: '6 Habits That Double Your Battery Life',  excerpt: 'Small choices that compound. We tested 200 rider profiles.', date: '2026-02-14', author: 'Ananya Iyer', readTime: 5, cover: '/images/products/csr-762.webp', category: 'How-To' },
  { slug: 'monsoon-riding',         title: 'Monsoon Riding: 12 Things You Must Check', excerpt: 'Tyres, brakes, electrics. Your monsoon-prep checklist.',     date: '2026-01-30', author: 'Rohan Desai', readTime: 7, cover: '/images/products/csr-762-black.webp', category: 'Safety' },
  { slug: 'service-cost-honesty',   title: 'The Honest Cost of Owning A CSR 762',     excerpt: '5-year TCO breakdown vs ICE 150cc bikes — no marketing fluff.', date: '2026-01-05', author: 'Aarav Mehta', readTime: 9, cover: '/images/products/csr-762.webp', category: 'Insight' },
]

export const JOBS = [
  { slug: 'sr-firmware-engineer',  title: 'Senior Firmware Engineer',     dept: 'Engineering', loc: 'Ahmedabad',      type: 'Full-time', exp: '5+ yrs', summary: 'Own the motor-controller firmware on real ARM Cortex hardware. C/C++ + CAN.' },
  { slug: 'battery-cell-engineer', title: 'Battery Cell Engineer',        dept: 'Engineering', loc: 'Ahmedabad',      type: 'Full-time', exp: '3+ yrs', summary: 'Design BMS thermal models. Li-NMC chemistry. Hands-on bench testing.' },
  { slug: 'ux-designer-2',         title: 'UX Designer II',                dept: 'Design',      loc: 'Remote, India',  type: 'Full-time', exp: '3+ yrs', summary: 'Shape the rider app + dashboard UI. Tight loop with firmware + product.' },
  { slug: 'service-tech-mumbai',   title: 'Service Technician',            dept: 'Service',     loc: 'Mumbai',         type: 'Full-time', exp: '1+ yr',  summary: 'Diagnose, repair, deliver. EV experience a bonus, not required.' },
  { slug: 'dealer-success-lead',   title: 'Dealer Success Lead',           dept: 'Sales',       loc: 'Bengaluru',      type: 'Full-time', exp: '4+ yrs', summary: 'Grow the 200-strong dealer network. KPI ownership, monthly visits.' },
  { slug: 'content-writer',        title: 'Senior Content Writer',         dept: 'Marketing',   loc: 'Remote, India',  type: 'Full-time', exp: '4+ yrs', summary: 'Long-form blog + email + product copy. Tone matters more than volume.' },
]

export const EVENTS = [
  { id: 'auto-expo-2026',  title: 'Auto Expo 2026',                 date: '2026-06-15', loc: 'Pragati Maidan, New Delhi', type: 'Trade Show', cover: '/images/products/csr-762.webp' },
  { id: 'svitch-day-blr',  title: 'Svitch Riders Day — Bengaluru',  date: '2026-06-28', loc: 'Mahalakshmi Layout, Bengaluru', type: 'Community',  cover: '/images/products/csr-762-gray.webp' },
  { id: 'tn-launch',       title: 'CSR 762 Launch — Tamil Nadu',     date: '2026-07-10', loc: 'Chennai',                    type: 'Launch',     cover: '/images/products/csr-762-red.webp' },
  { id: 'monsoon-ride',    title: 'Monsoon Rider Meet — Goa',        date: '2026-07-26', loc: 'Panjim, Goa',                type: 'Community',  cover: '/images/products/csr-762.webp' },
]

export const REVIEWS = [
  { name: 'Karan T.',  city: 'Pune',     rating: 5, date: '2026-04-22', text: 'Two months in, 1,800 km. Honestly silent, smooth, and the battery still says 96% health.' },
  { name: 'Meera P.',  city: 'Mumbai',   rating: 5, date: '2026-04-08', text: 'Saved ₹3,400 on petrol last month. The torque is addictive.' },
  { name: 'Rahul K.',  city: 'Delhi',    rating: 4, date: '2026-03-31', text: 'Build feels premium. Wish there were more fast chargers on highways though.' },
  { name: 'Sneha R.',  city: 'Bengaluru', rating: 5, date: '2026-03-15', text: 'Service team came home for the first service. Five-star experience.' },
  { name: 'Anjali D.', city: 'Ahmedabad', rating: 5, date: '2026-02-20', text: 'I am 5\'2" and the 780mm seat works for me. Confident handling in traffic.' },
  { name: 'Vivek S.',  city: 'Chennai',  rating: 4, date: '2026-02-04', text: 'Great commuter. Test ride was no-pressure, very honest pitch.' },
]

export const GALLERY = [
  { src: '/images/products/csr-762.webp',       caption: 'Hero Shot' },
  { src: '/images/products/csr-762-black.webp', caption: 'Black Edition' },
  { src: '/images/products/csr-762-red.webp',   caption: 'Crimson Red' },
  { src: '/images/products/csr-762-gray.webp',  caption: 'Slate Gray' },
  { src: '/images/products/csr-762.webp',       caption: 'Side Profile' },
  { src: '/images/products/csr-762-black.webp', caption: 'Cockpit Detail' },
]

export const FAQ_TOPICS = ['All', 'Battery', 'Range', 'Service', 'Buying', 'Warranty']
export const BLOG_CATS = ['All', 'Product', 'Insight', 'Infrastructure', 'How-To', 'Safety']
export const JOB_DEPTS = ['All', 'Engineering', 'Design', 'Service', 'Sales', 'Marketing']
