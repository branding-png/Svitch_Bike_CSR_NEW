// Accessibility statement content — single source of truth.
// Both the aside (TOC) and the content cards derive from this list, so
// the anchors always match the section IDs on the page.
//
// Each section has a `blocks` array. Each block has a `type`:
//   { type: 'p',     text }                          — paragraph (string with optional html-ish fragments)
//   { type: 'ul',    items: [ ...string|nodes ] }     — unordered list
//   { type: 'inline', nodes: [ ...{tag, text} ] }    — paragraph with inline markup
//
// To keep this file plain JavaScript (no JSX), inline markup is expressed as
// arrays of `{ tag, text }` tokens — the renderer wraps each in its tag.
// Supported inline tags: 'strong', 'code', 'kbd', 'a' (uses `href`).
// Contact addresses come from @/data/contact-info.
import { emailNode, phoneNode } from './contact-info'

const ACCESSIBILITY_SECTIONS = [
  {
    id:    'legal-commitment',
    num:   '01',
    title: 'Our Commitment',
    blocks: [
      { type: 'inline', nodes: [
        { text: 'Svitch Motocorp aims to make this website and all related digital experiences accessible to as wide an audience as possible — regardless of ability, technology, or context of use. We target conformance with ' },
        { tag: 'strong', text: 'Web Content Accessibility Guidelines (WCAG) 2.1, Level AA' },
        { text: ' and continuously work to raise the bar across every page.' },
      ] },
      { type: 'p', text: 'Accessibility is an ongoing process. We audit, test, and iterate — and we welcome your feedback when we fall short.' },
    ],
  },
  {
    id:    'legal-measures',
    num:   '02',
    title: 'Measures We Take',
    blocks: [
      { type: 'p', text: 'The following practices are baked into how we build and ship the Svitch website:' },
      { type: 'ul', items: [
        [ { text: 'Semantic HTML5 landmarks (' }, { tag: 'code', text: '<nav>' }, { text: ', ' }, { tag: 'code', text: '<main>' }, { text: ', ' }, { tag: 'code', text: '<article>' }, { text: ', ' }, { tag: 'code', text: '<footer>' }, { text: ') on every page.' } ],
        [ { text: 'Color contrast tested against WCAG AA — minimum ' }, { tag: 'strong', text: '4.5:1' }, { text: ' for body text and ' }, { tag: 'strong', text: '3:1' }, { text: ' for large text and UI components.' } ],
        [ { text: 'Descriptive ' }, { tag: 'code', text: 'alt' }, { text: ' text on every meaningful image; decorative images marked with empty alt + ' }, { tag: 'code', text: 'role="presentation"' }, { text: '.' } ],
        [ { tag: 'code', text: 'aria-label' }, { text: ' on all icon-only buttons (search, hamburger, back-to-top, social icons).' } ],
        [ { text: 'Form labels paired with inputs via ' }, { tag: 'code', text: 'for' }, { text: ' / ' }, { tag: 'code', text: 'id' }, { text: '; required fields marked with ' }, { tag: 'code', text: 'aria-required' }, { text: '.' } ],
        [ { text: 'Live regions (' }, { tag: 'code', text: 'aria-live="polite"' }, { text: ') on toast notifications so screen readers announce them.' } ],
        [ { text: 'Respects ' }, { tag: 'code', text: 'prefers-reduced-motion' }, { text: ' — scroll-reveal and animations disable when this OS setting is enabled.' } ],
        [ { text: 'Visible focus states on every interactive element (no ' }, { tag: 'code', text: 'outline: none' }, { text: ' without a replacement).' } ],
      ] },
    ],
  },
  {
    id:    'legal-keyboard',
    num:   '03',
    title: 'Keyboard & Navigation',
    blocks: [
      { type: 'p', text: 'The entire site is operable without a mouse. Common shortcuts:' },
      { type: 'ul', items: [
        [ { tag: 'kbd', text: 'Tab' }, { text: ' — move forward through interactive elements in logical DOM order.' } ],
        [ { tag: 'kbd', text: 'Shift' }, { text: ' + ' }, { tag: 'kbd', text: 'Tab' }, { text: ' — move backward.' } ],
        [ { tag: 'kbd', text: 'Enter' }, { text: ' / ' }, { tag: 'kbd', text: 'Space' }, { text: ' — activate buttons, links, and form controls.' } ],
        [ { tag: 'kbd', text: 'Esc' }, { text: ' — close any open modal, drawer, or dropdown.' } ],
        [ { tag: 'kbd', text: 'Arrow keys' }, { text: ' — navigate inside menus and carousels.' } ],
      ] },
      { type: 'inline', nodes: [
        { text: 'Heading hierarchy on every page starts with a single ' },
        { tag: 'code', text: '<h1>' },
        { text: ' and nests logically — screen-reader users can jump between landmarks and headings without surprise.' },
      ] },
    ],
  },
  {
    id:    'legal-limitations',
    num:   '04',
    title: 'Known Limitations',
    blocks: [
      { type: 'p', text: "We're transparent about gaps we're still closing:" },
      { type: 'ul', items: [
        "Some embedded carousels (Swiper) may trap focus on first interaction — we're upgrading to a fully accessible variant.",
        'Older gallery images are being audited for richer alt text.',
        'The 360° product viewer is currently mouse / touch driven; keyboard rotation is on our 2026-Q3 roadmap.',
        [ { text: 'Some auto-playing videos lack synchronised captions; transcripts are available on request via ' }, emailNode('accessibility'), { text: '.' } ],
      ] },
    ],
  },
  {
    id:    'legal-assistive',
    num:   '05',
    title: 'Assistive Technologies Tested',
    blocks: [
      { type: 'p', text: 'Our pages are regularly tested with:' },
      { type: 'ul', items: [
        [ { tag: 'strong', text: 'NVDA 2024.x' }, { text: ' on Firefox & Chrome (Windows)' } ],
        [ { tag: 'strong', text: 'VoiceOver' }, { text: ' on macOS 14 (Safari) and iOS 17 (Safari)' } ],
        [ { tag: 'strong', text: 'TalkBack' }, { text: ' on Android 14 (Chrome)' } ],
        [ { tag: 'strong', text: 'JAWS 2024' }, { text: ' on Chrome (Windows)' } ],
      ] },
      { type: 'p', text: 'Automated checks run with axe-core during development and against a Lighthouse Accessibility target of 95+.' },
    ],
  },
  {
    id:    'legal-feedback',
    num:   '06',
    title: 'Feedback & Help',
    blocks: [
      { type: 'p', text: 'If you encounter a barrier or have a suggestion, please contact us through any of these channels:' },
      { type: 'ul', items: [
        [ { tag: 'strong', text: 'Email:' }, { text: ' ' }, emailNode('accessibility') ],
        [ { tag: 'strong', text: 'Phone:' }, { text: ' ' }, phoneNode('headOffice'), { text: ' (Mon–Sat, 09:00–19:00 IST)' } ],
        [ { tag: 'strong', text: 'Support ticket:' }, { text: ' ' }, { tag: 'a', href: '/support/ticket', className: 'accent', text: 'raise a request' }, { text: ' with category "Accessibility".' } ],
      ] },
      { type: 'inline', nodes: [
        { text: 'We aim to respond to accessibility feedback within ' },
        { tag: 'strong', text: '2 working days' },
        { text: ', and where appropriate, provide an alternative way for you to access the content while we resolve the issue.' },
      ] },
    ],
  },
  {
    id:    'legal-standards',
    num:   '07',
    title: 'Standards Referenced',
    blocks: [
      { type: 'p', text: 'This statement and our remediation roadmap are guided by:' },
      { type: 'ul', items: [
        [ { tag: 'strong', text: 'WCAG 2.1, Level AA' }, { text: ' — Web Content Accessibility Guidelines (W3C).' } ],
        [ { tag: 'strong', text: 'EN 301 549' }, { text: ' — European accessibility requirements for ICT.' } ],
        [ { tag: 'strong', text: 'The Rights of Persons with Disabilities Act, 2016' }, { text: ' — Government of India.' } ],
        [ { tag: 'strong', text: 'Section 508' }, { text: ' of the U.S. Rehabilitation Act — where applicable to international visitors.' } ],
      ] },
    ],
  },
]

// Sidebar TOC items derived from the same array so anchors never drift.
const ACCESSIBILITY_TOC = ACCESSIBILITY_SECTIONS.map((s) => ({
  id:    s.id,
  label: s.title,
}))

export { ACCESSIBILITY_SECTIONS, ACCESSIBILITY_TOC }
