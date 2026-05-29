// Owner's Manual content — single source of truth.
// Both the TOC sidebar and the content cards derive from this list, so
// the chapter ids/titles/icons always stay in sync.
//
// Each chapter mirrors the LegalCard block schema (see LegalBlocks):
//   { type: 'p',       text }
//   { type: 'h3',      text }
//   { type: 'inline',  nodes: [...] }
//   { type: 'ul',      items: [string | inline-nodes] }
//   { type: 'ol',      items: [...] }
//   { type: 'callout', icon, variant?: 'warning', text }
//   { type: 'mode',    label, text }          ← drive-mode rows on Ch.02
//   { type: 'table',   headers, rows }
import { PATHS } from '@/utils/routes'

const link = (text, to) => ({ tag: 'a', text, href: to })

const OWNERS_MANUAL_SECTIONS = [
  {
    id:    'ch-start',
    num:   '01',
    icon:  'bi-power',
    title: 'Getting Started',
    blocks: [
      { type: 'p', text: 'Welcome to the CSR family. Before your first ride, take 10 minutes to complete these steps and get the most out of your new electric motorcycle.' },

      { type: 'h3', text: 'First-Time Setup' },
      { type: 'ol', items: [
        [ { text: 'Download the ' }, { tag: 'strong', text: 'CSR Connect App' }, { text: ' from the App Store or Google Play.' } ],
        [ { text: 'Create your CSR account and register your vehicle using the ' }, { tag: 'strong', text: 'chassis number' }, { text: ' (found under the seat).' } ],
        [ { text: 'Pair your phone with the bike via Bluetooth in the app ' }, { tag: 'strong', text: 'Settings' }, { text: '.' } ],
        [ { text: 'Set your preferred ' }, { tag: 'strong', text: 'PIN code' }, { text: ' for keyless lock & unlock.' } ],
        [ { text: 'Charge the battery fully before your first long ride.' } ],
      ] },

      { type: 'callout', icon: 'bi-lightbulb-fill', text: [
        { tag: 'strong', text: 'Pro tip:' },
        { text: ' Register your warranty within 30 days of purchase on our ' },
        link('warranty page', PATHS.warranty),
        { text: ' to activate full coverage.' },
      ] },

      { type: 'h3', text: 'Dashboard Indicators' },
      { type: 'ul', items: [
        [ { tag: 'strong', text: 'Green battery icon' }, { text: ' — charging or fully charged.' } ],
        [ { tag: 'strong', text: 'Amber battery' }, { text: ' — below 20%, find a charger soon.' } ],
        [ { tag: 'strong', text: 'Red battery' }, { text: ' — below 10%, range critically low.' } ],
        [ { tag: 'strong', text: 'Wrench icon' }, { text: ' — service reminder due.' } ],
        [ { tag: 'strong', text: 'Shield icon' }, { text: ' — anti-theft alarm active.' } ],
      ] },
    ],
  },

  {
    id:    'ch-ride',
    num:   '02',
    icon:  'bi-lightning-charge-fill',
    title: 'Riding Your CSR',
    blocks: [
      { type: 'p', text: "The CSR rides differently from a petrol bike — instant torque, zero warm-up, silent power. Here's how to get the best out of every mode." },

      { type: 'h3', text: 'Drive Modes Explained' },
      { type: 'mode', label: 'Eco',   text: [ { text: 'Maximum range. Throttle response softened. Recommended for daily commuting — ' }, { tag: 'strong', text: '200 km range' }, { text: '.' } ] },
      { type: 'mode', label: 'City',  text: [ { text: 'Balanced performance and range. Top speed ' }, { tag: 'strong', text: '70 km/h' }, { text: ', range ' }, { tag: 'strong', text: '150 km' }, { text: '. Best for urban traffic.' } ] },
      { type: 'mode', label: 'Sport', text: [ { text: 'Full motor output. Maximum torque and ' }, { tag: 'strong', text: '110 km/h' }, { text: ' top speed. Range ' }, { tag: 'strong', text: '110 km' }, { text: '. Spirited riding.' } ] },

      { type: 'callout', variant: 'warning', icon: 'bi-exclamation-triangle-fill', text: [
        { tag: 'strong', text: 'Ride safely:' },
        { text: " Always wear a helmet and appropriate riding gear. The CSR's instant torque can surprise first-time EV riders — be smooth on the throttle." },
      ] },

      { type: 'callout', icon: 'bi-lightbulb-fill', text: [
        { tag: 'strong', text: 'Pro tip:' },
        { text: ' Regenerative braking increases range. Use the regen paddle on the left handlebar in city traffic to recover energy on every deceleration.' },
      ] },
    ],
  },

  {
    id:    'ch-charge',
    num:   '03',
    icon:  'bi-plug-fill',
    title: 'Charging',
    blocks: [
      { type: 'p', text: "Charging your CSR is as simple as charging your phone. Here's everything you need to know." },

      { type: 'h3', text: 'Home Charging (Standard)' },
      { type: 'ol', items: [
        [ { text: 'Use the ' }, { tag: 'strong', text: 'included 15A portable charger' }, { text: ' only. Do not use third-party chargers.' } ],
        [ { text: 'Open the charge-port flap on the left side panel.' } ],
        [ { text: 'Connect the charger to the bike first, then to the wall socket.' } ],
        [ { text: 'The charging indicator on the TFT will show progress. A full charge takes ' }, { tag: 'strong', text: '~5 hours' }, { text: '.' } ],
        [ { text: 'Disconnect the charger from the bike before unplugging from the wall.' } ],
      ] },

      { type: 'callout', variant: 'warning', icon: 'bi-exclamation-triangle-fill', text: [
        { tag: 'strong', text: 'Important:' },
        { text: ' Never charge in rain or standing water. Always use the CSR-supplied charger — using non-certified chargers voids the battery warranty.' },
      ] },
    ],
  },

  {
    id:    'ch-safety',
    num:   '04',
    icon:  'bi-shield-fill-check',
    title: 'Safety & Controls',
    blocks: [
      { type: 'p', text: 'The CSR 762 features multiple active safety systems working together to keep every ride secure.' },

      { type: 'h3', text: 'ABS & Braking System' },
      { type: 'ul', items: [
        [ { tag: 'strong', text: 'Dual-channel ABS' }, { text: ' prevents wheel lock on hard braking. Do not disable.' } ],
        [ { tag: 'strong', text: 'Front brake lever' }, { text: ' (right) controls the front hydraulic disc.' } ],
        [ { tag: 'strong', text: 'Rear brake lever' }, { text: ' (left) controls the rear disc and activates regen braking.' } ],
        [ { tag: 'strong', text: 'Combined Braking System (CBS)' }, { text: ' applies the rear brake automatically when the front is pulled hard.' } ],
      ] },

      { type: 'h3', text: 'Anti-Theft System' },
      { type: 'ol', items: [
        [ { text: 'Arm the alarm via the CSR app or the left-handlebar button (2-second hold).' } ],
        [ { text: 'Any motion triggers the alarm and sends a push notification to your phone.' } ],
        [ { tag: 'strong', text: 'Remote kill-switch:' }, { text: ' tap "Immobilise" in the app to prevent the motor from starting.' } ],
      ] },
    ],
  },

  {
    id:    'ch-maintain',
    num:   '05',
    icon:  'bi-tools',
    title: 'Maintenance',
    blocks: [
      { type: 'p', text: "The CSR 762 requires far less maintenance than a petrol bike — no oil, no clutch, no spark plugs. Here's your check schedule." },

      { type: 'table',
        headers: ['Check', 'Frequency', 'DIY or Workshop?'],
        rows: [
          [ [ { tag: 'strong', text: 'Tyre Pressure' } ],          'Weekly',            'DIY — gauge at fuel station' ],
          [ [ { tag: 'strong', text: 'Brake Pad Wear' } ],         'Monthly',           'DIY — visual check' ],
          [ [ { tag: 'strong', text: 'Battery Health Report' } ],  'Every 6 months',    'Via CSR Connect App' ],
          [ [ { tag: 'strong', text: 'Brake Fluid' } ],            'Every 10,000 km',   'Authorised service centre' ],
          [ [ { tag: 'strong', text: 'Suspension Check' } ],       'Every 10,000 km',   'Authorised service centre' ],
          [ [ { tag: 'strong', text: 'Firmware Update' } ],        'As prompted',       'DIY — via CSR app' ],
        ],
      },

      { type: 'callout', icon: 'bi-calendar-check-fill', text: [
        { tag: 'strong', text: 'Find a dealer:' },
        { text: ' Schedule a workshop visit at your nearest ' },
        link('authorised dealer', PATHS.dealers),
        { text: ' — doorstep pickup is available in major cities.' },
      ] },
    ],
  },

  {
    id:    'ch-support',
    num:   '06',
    icon:  'bi-wrench-adjustable',
    title: 'Troubleshooting',
    blocks: [
      { type: 'p', text: 'Common issues and quick fixes you can try before calling support.' },

      { type: 'h3', text: "Bike Won't Start" },
      { type: 'ol', items: [
        [ { text: 'Check the kickstand is up — the motor cuts off if the stand is down.' } ],
        [ { text: 'Ensure the ' }, { tag: 'strong', text: 'kill switch' }, { text: ' (right handlebar) is in the RUN position.' } ],
        [ { text: 'Check if the anti-theft immobiliser is active in the CSR app.' } ],
        [ { text: 'Verify battery level is above 5%.' } ],
      ] },

      { type: 'h3', text: 'Range Lower Than Expected' },
      { type: 'ul', items: [
        [ { text: "Check you're not in Sport mode — switch to Eco for maximum range." } ],
        [ { text: 'Cold weather reduces range by 10–20%. This is normal.' } ],
        [ { text: 'Tyre pressure below ' }, { tag: 'strong', text: '32 PSI' }, { text: ' significantly reduces efficiency.' } ],
        [ { text: 'Check battery health report in the app for capacity degradation.' } ],
      ] },

      { type: 'callout', icon: 'bi-headset', text: [
        { tag: 'strong', text: 'Still stuck?' },
        { text: ' Our support team is available ' },
        { tag: 'strong', text: '9AM – 7PM, Mon – Sat' },
        { text: '. ' },
        link('Contact support', PATHS.contact),
        { text: ' or call ' },
        { tag: 'a', text: '+91 63512 72002', href: 'tel:+916351272002' },
        { text: '.' },
      ] },
    ],
  },
]

export { OWNERS_MANUAL_SECTIONS }

// TOC slice for the sidebar — keeps id/icon/title pairs in one place.
export const OWNERS_MANUAL_TOC = OWNERS_MANUAL_SECTIONS.map((s) => ({
  id:    s.id,
  icon:  s.icon,
  title: s.title,
}))
