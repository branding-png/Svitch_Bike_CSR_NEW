import SectionHeader from '@/ui/SectionHeader'

// Leadership / Founder's Desk — mirrors CSR_New_web `#leadership`.
const LEADERS = [
  {
    photo:   '/images/team/Raj-patel-Owner-CEO.png',
    alt:     'Mr. Rajkumar Patel — Owner & CEO',
    role:    'Owner & CEO',
    name:    'Mr. Rajkumar Patel',
    heading: 'Journey',
    paragraphs: [
      'Svitch is founded and owned by Mr. Rajkumar Patel in 2018, he came up with a unique concept during his quest to solve the problem of last-mile mobility.',
      'While in Australia, he started to think about the Electric Bike and its potential applications; product designing was initiated in 2016.',
      'However, the idea got amplified when he returned to India and envisioned the scope in the field of Electric Vehicles and their application to deliver the dreams of people - Svitch.',
      "Thus, Svitch was born and he became the CEO & Managing Director of Svitch Bike. It's the Speed of Flash. Power of Hulk. Thunder of Thor. And the brains of Ironman.",
      'With Svitch we believe to surprise our customers each and every moment. We aim to revolutionize the Indian automobile sector with electric-change and re-think our way to commute, luxury and recreation because we believe in precision and quality. We care for you and our environment equally.',
    ],
  },
  {
    photo:   '/images/team/chintan-khatri-ceo.png',
    alt:     'Mr. Chintan Khatri — CEO',
    role:    'CEO',
    name:    'Mr. Chintan Khatri',
    heading: 'Our Story',
    reverse: true,
    paragraphs: [
      "Some fine words from our CEO, Mr. Chintan Khatri — Svitch is not just a product, it's an idea, a lifestyle, a movement, set forth to change the way of fitness through e-bikes. It started with a small and simple yet great thought to take a step towards green energy.",
      'While green technology is the core of our product, we knew we could contribute way more. Thus started the phase of ideation, where multiple ideas were shot in, many of them made their way through, and many of them were lost in oblivion during the process.',
      'We as a bunch of designers, engineers, managers and marketeers wanted something disruptive which as a product left no stone unturned. Henceforth, Svitch was born — or we would say made — with a lot of perseverance, patience, sweat, sleepless nights, and yes, a lot of coffee and green tea.',
      'Come and join this revolution and be a part of the Svitch Army.',
    ],
  },
]

export default function Leadership({
  quote = 'Enthusiasm is the mother of effort — and without it, nothing great was ever achieved.',
  leaders = LEADERS,
}) {
  return (
    <section aria-label="Leadership" id="leadership">
      <div className="container">
        <SectionHeader
          label="Leadership"
          titleStart="Founder's"
          titleAccent="Desk"
        />

        <div className="leadership-quote">
          <p>{quote}</p>
        </div>

        {leaders.map((l) => (
          <div key={l.name} className={'leadership-row' + (l.reverse ? ' reverse' : '')}>
            <div className="leader-photo">
              <img src={l.photo} alt={l.alt} loading="lazy" decoding="async" />
            </div>
            <div className="leader-content">
              <span className="leader-role">{l.role}</span>
              <h3 className="leader-name">{l.name}</h3>
              <h4 className="leader-heading">{l.heading}</h4>
              {l.paragraphs.map((p, i) => <p key={i}>{p}</p>)}
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
