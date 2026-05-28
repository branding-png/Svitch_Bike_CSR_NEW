# Svitch Motocorp — CSR 762 Storefront

A React + Vite single-page app for **svitch.bike** — Svitch Motocorp's marketing site, customer account portal, and shop for the CSR 762 electric motorcycle.

Converted from the static `CSR_New_web/` HTML build to a fully-routed React SPA with shared contexts, lazy routes, a clean primitives layer, and production-ready deployment configs.

---

## Quick start

```bash
npm install           # one-time
npm run dev           # http://localhost:5173
npm run build         # production build → dist/
npm run preview       # serve the built bundle
npm run lint          # ESLint
```

> Windows PowerShell users: if `npm run dev` is blocked by execution policy, use `npm.cmd run dev` or run `Set-ExecutionPolicy -Scope CurrentUser RemoteSigned` once.

### Demo credentials

| Field | Value |
|---|---|
| Email | `arjun@svitch.bike` |
| Password | `svitch2026` |
| 2FA code | any 6 digits (mock accepts all) |

The auth flow uses `services/auth.js` mocks today. Flip to a real backend by setting `VITE_API_BASE` in `.env.local` — no code changes needed (see [Backend integration](#backend-integration)).

---

## Tech stack

- **React 19** with **react-router-dom 7**
- **Vite 8** (dev server + production bundle with manual vendor chunks)
- **Bootstrap 5** (component scaffolding) + **Bootstrap Icons**
- **Swiper** (hero carousels) + **GLightbox** (gallery)
- Single design system in `src/styles/` mirroring the legacy CSS
- **ESLint** + **Prettier** + **EditorConfig** for style enforcement

No TypeScript, no Tailwind, no state library — `useState` + a handful of small contexts is enough.

---

## Folder structure

The **`features/`** tree mirrors the **`routes/`** tree exactly. A new contributor finds the components for any route by replacing `routes/` with `features/` in the path.

```
src/
├── App.jsx                 # Provider chain + RouterProvider
├── main.jsx                # Entry — imports base + components + utilities CSS
├── routes.jsx              # Single source of truth for all routes
│
├── routes/                 # Route files — thin wrappers, mostly composition
│   ├── Home.jsx            # /
│   ├── Sitemap.jsx, ThankYou.jsx, ExtraSection.jsx
│   ├── account/            # /account/*  (guarded by AuthGuard)
│   ├── auth/               # /auth/*     (guest-only via useAuthRedirect)
│   ├── blog/, careers/, company/, legal/, offers/,
│   ├── press/, shop/, support/, system/
│
├── features/               # Components — same group layout as routes/
│   ├── home/               # landing-page sections
│   ├── book-now/           # global Book-Now modal (cross-cutting)
│   ├── account/
│   │   ├── AccountLayout.jsx, AccountAside.jsx, AccountContent.jsx
│   │   └── dashboard/, profile/, orders/, order-detail/, wishlist/,
│   │      addresses/, notifications/, saved-jobs/, service-history/,
│   │      test-rides/, invoices/, returns/, return-request/
│   ├── auth/
│   │   ├── LoginForm.jsx, RegisterForm.jsx, AuthCard.jsx, …
│   │   └── forgot-password/, reset-password/, two-factor/, verify-email/
│   ├── blog/{,detail/}
│   ├── careers/{,detail/}
│   ├── company/{about,contact,events,faq,gallery,reviews,sustainability}/
│   ├── legal/
│   │   ├── LegalBlocks.jsx, LegalCard.jsx, LegalToc.jsx (shared)
│   │   └── accessibility/, cookie-policy/, privacy-policy/,
│   │      refund-policy/, shipping-policy/, term-condition/
│   ├── offers/{book-test-ride,finance,insurance,referral,trade-in}/
│   ├── press/{,detail/, media-kit/}
│   ├── shop/
│   │   ├── ProductCard.jsx, ProductGrid.jsx, … (listing primitives)
│   │   └── cart/, checkout/, compare/, order-confirmation/,
│   │      payment-failed/, track-order/
│   ├── support/{book-service,charging-network,dealers,owners-manual,
│   │            roadside-assistance,savers-scale,specifications,tickets,warranty}/
│   └── system/{sitemap,thank-you,unsubscribe}/
│
├── ui/                     # Generic primitives — barrel exported from @/ui
│   # Button, Card, Modal, InputControl, PasswordField, OtpInput,
│   # StatusBadge, MetaRow, FormGroup, BreadCrumb, ToggleSwitch, FilterPill,
│   # Pagination, EmptyState, Accordion, Lightbox, StatTile, CtaBox,
│   # SectionHeader, OrderStatusBadge
│
├── contexts/               # Cross-cutting state (localStorage-backed)
│   # UserContext, CartContext, WishlistContext, AddressContext,
│   # SavedJobsContext, BookNowContext, ToastContext
│
├── services/               # API seams — swap mocks for fetch() here
│   └── auth.js             # signIn, register, verifyEmail, etc.
│
├── data/                   # Static / sample data (will become API responses)
│   # products, jobs, blog, press, orders-data, tickets-data,
│   # returns-data, saved-jobs-data, notifications-data,
│   # contact-info, owners-manual, specifications, accessibility,
│   # privacy-policy, refund-policy, term-condition, …
│
├── hooks/
│   # useLocalStorage, useAuthRedirect
│
├── layouts/                # App shell + route guards
│   # AppLayout, Navbar, Footer, MobileMenu, guards (AuthGuard / GuestGuard)
│
├── utils/
│   # routes (PATHS), mask, mockDelay, formatCurrency
│
└── styles/
    ├── base/               # base.css, components.css, utilities.css
    ├── sections/           # Cross-page sections (auth.css, account.css, …)
    └── pages/              # Page-specific CSS
```

### Tooling

| File | Purpose |
|---|---|
| `eslint.config.js` | `no-unused-vars`, `no-console`, `no-debugger`, `prefer-const`, `eqeqeq`, react-hooks rules |
| `.prettierrc` | no semicolons, single quotes, 100-col width, trailing commas, LF EOL |
| `.editorconfig` | 2-space indent, UTF-8, LF, trim trailing whitespace |
| `.prettierignore` | skip `dist`, `node_modules`, `public`, `scripts` |

---

## Routing tree

Top-level groups in [src/routes.jsx](src/routes.jsx):

```
/                           AppLayout (Navbar + Footer)
├─ /shop                    Shop, ProductDetail, Cart, Checkout, Payment, …
├─ /careers, /blog, /press  marketing + content
├─ /support/*               Dealers, Warranty, Service, Ticket, …
├─ /company/*               About, Contact, FAQ, Reviews, …
├─ /legal/*                 Privacy, Terms, Refund, Shipping, Cookies
└─ /account/*               <AuthGuard> Dashboard, Profile, Orders, Wishlist, …

/auth/*                     Standalone (no chrome)
├─ /auth/login              <GuestGuard via useAuthRedirect>
├─ /auth/register           "
├─ /auth/two-factor         "
├─ /auth/verify-email
├─ /auth/forgot-password
└─ /auth/reset-password

System pages (standalone, no chrome)
/coming-soon, /maintenance, /offline, /unsubscribe, /404 (*)
```

`<PageLoading />` splash is shown **only** on `/`. Every other lazy route uses `Suspense fallback={null}` — no spinner flash between navs.

---

## Data flow

```
            ┌────────────────────┐
            │  src/data/*.js     │  ← static sample data (will become API)
            └─────────┬──────────┘
                      │
                      ▼
            ┌────────────────────┐
            │  src/services/*    │  ← swap mock ↔ real fetch() here
            └─────────┬──────────┘
                      │
                      ▼
            ┌────────────────────┐
            │  src/contexts/*    │  ← persistent + cross-cut state
            └─────────┬──────────┘
                      │
                      ▼
       routes/ ↔  features/  ↔  ui/  (composition)
```

Every async function returns the same shape:

```js
{ ok: true,  data: { … } }
{ ok: false, error: 'message', fieldErrors: { email: 'in use' } }
```

UI consumers don't care if the response came from mocks or a real server.

---

## Backend integration

1. Copy `.env.example` → `.env.local`
2. Set `VITE_API_BASE=https://api.svitch.bike`
3. Restart `npm run dev`

[src/services/auth.js](src/services/auth.js) will switch from mocks to `fetch()` calls automatically. Endpoints documented in `.env.example`.

For protected calls, the auth token is auto-attached from `localStorage.svitchAuthToken` (set after a successful 2FA verify).

---

## UI primitives

Import via the barrel: `import { Button, Card, Modal, … } from '@/ui'`

| Primitive | Purpose |
|---|---|
| `Button` | All `.btn-csr` variants. Accepts `to` for Link, `href` for anchor, default `<button>` |
| `Card` | `.card-base` wrapper with optional padding |
| `Modal` | Portal-based, focus-trapped, ESC + backdrop close, body-scroll-lock, focus restore |
| `InputControl` | Single label + input/select/textarea + error; live `.is-invalid` / `.is-valid` borders |
| `PasswordField` | InputControl + eye toggle + CapsLock warning + optional `rules={PASSWORD_RULES}` checklist |
| `OtpInput` | 6-digit code grid with paste / auto-advance / arrow keys / role=group |
| `StatusBadge` | Status pill with presets (delivered=green, shipped=blue, processing=amber, cancelled=red) |
| `MetaRow` | Icon + label strip; `variant="inline"` or `"pills"` |
| `FormGroup`, `ToggleSwitch`, `FilterPill`, `BreadCrumb`, `Pagination`, `EmptyState`, `Accordion`, `Lightbox`, `StatTile`, `CtaBox`, `SectionHeader` | Self-explanatory |

---

## Build & deploy

### Production build

```bash
npm run build
```

Vite splits the output into cacheable vendor chunks:

| Chunk | Contents |
|---|---|
| `react-vendor` | react, react-dom, react-router-dom |
| `swiper-vendor` | swiper |
| `glightbox-vendor` | glightbox |
| `bootstrap-vendor` | bootstrap |
| `index` | application code |
| route chunks | lazy-loaded per page |

`console.log` + `debugger` are stripped automatically in production.

### Deployment

Drop the `dist/` folder on any static host. Pre-configured for:

| Host | Config file | Notes |
|---|---|---|
| **Vercel** | [vercel.json](vercel.json) | SPA rewrite + cache + security headers |
| **Netlify** | [netlify.toml](netlify.toml) | same as Vercel in TOML syntax |
| **Cloudflare Pages / Render** | [public/_redirects](public/_redirects) | SPA fallback only |

All three set:
- `/assets/*`, `/images/*`, `/fonts/*` → `Cache-Control: public, max-age=31536000, immutable`
- `*.html` → `Cache-Control: public, max-age=0, must-revalidate`
- Security: `X-Content-Type-Options`, `X-Frame-Options`, `Referrer-Policy`, `Permissions-Policy`

### PWA

[public/manifest.webmanifest](public/manifest.webmanifest) defines the install prompt (name, theme, icons). The `/offline` route already exists as a fallback when a service worker is added later.

---

## Adding a new page (recipe)

1. **Add the path** in [src/utils/routes.js](src/utils/routes.js) under `PATHS`.
2. **Create the route file** in `src/routes/<group>/MyPage.jsx`.
3. **Create matching feature components** in `src/features/<group>/<my-page>/` if the page needs multiple pieces.
4. **Compose** from primitives + new feature components.
5. **Register in [src/routes.jsx](src/routes.jsx)** — choose `lazyRoute()` (public), `lazyProtected()` (account), or `lazyRouteWithSplash()` (Home only).
6. **If it needs data**, add a file under `src/data/` and (optionally) a service function in `src/services/`.

---

## Conventions

- **Files** — PascalCase for components (`OrderCard.jsx`), camelCase for everything else (`useAuthRedirect.js`, `orders-data.js`)
- **Components** — `function` declarations (not arrow), default export at the top
- **State** — `useState` + lazy init for localStorage reads. Lift state to the smallest common parent
- **Styles** — page-specific CSS in `src/styles/pages/`, cross-cutting in `src/styles/base/`. Inline `style={{}}` only for one-off values that wouldn't be reused. Use the `utilities.css` helpers (`.text-center`, `.flex-center`, `.mt-md`, etc.) before reaching for inline styles
- **Toasts** — `useToast().show(message, type, duration)` — never call directly inside render, always inside an event handler. Identical messages are de-duped automatically. **Do not destructure `showToast`** — the hook returns `{ show, dismiss }`
- **Paths** — never hardcode URLs; always `PATHS.X`
- **Contact info** — never hardcode phones/emails; import from `@/data/contact-info`

---

## Critical conventions (don't break these)

These rules look small but cause real bugs when violated. Each has bitten this codebase at least once.

### 1. Every route MUST import its own page CSS

Each route file under `src/routes/` is independently loaded (via `React.lazy`). If a route relies on CSS imported by a *sibling* route, it works while navigating from that sibling — but **breaks completely on direct URL / refresh / Ctrl+Click** (new tab) because no other route has loaded that stylesheet.

```jsx
// src/routes/shop/ProductDetail.jsx
import '@/styles/pages/shop.css'   // ✅ required — even though Shop.jsx already imports it
```

Pattern: if your route uses class names defined in `pages/X.css` or `sections/X.css`, import that file.

### 2. Use the semantic color tokens, not raw hex

```css
/* ✅ */                    /* ❌ */
color: var(--success);      color: #22c55e;
border-color: var(--danger); border-color: #ef4444;
background: var(--warning-tint); background: rgba(245, 158, 11, 0.12);
```

Available tokens (defined in `src/styles/base/base.css`):

| Color | Token | Tint (12% alpha) | Border (45% alpha) |
|---|---|---|---|
| Success (green) | `--success` | `--success-tint` | `--success-border` |
| Danger (red) | `--danger` | `--danger-tint` | `--danger-border` |
| Warning (amber) | `--warning` | `--warning-tint` | `--warning-border` |
| Info (blue) | `--info` | `--info-tint` | `--info-border` |
| Star rating | `--rating-star` | — | — |

### 3. Standard responsive breakpoints

Always use one of: **575 / 767 / 991 / 1199 px**. Avoid 480, 640, 720, 1024, 1100, 1200 — they create gaps where pages "fine on Y but broken on X".

```css
@media (max-width: 575px)  { /* phones */ }
@media (max-width: 767px)  { /* small tablets / large phones landscape */ }
@media (max-width: 991px)  { /* tablets */ }
@media (max-width: 1199px) { /* small desktops */ }
```

(`360px` / `380px` overrides are allowed for very narrow phones — used by OTP inputs.)

### 4. `position: sticky` needs a mobile fallback

Sidebars / sticky bars should reset to `position: static` at `≤991px` (or wherever the layout collapses). Otherwise they pin to the viewport edge inside a stacked layout and look broken.

```css
.my-sidebar { position: sticky; top: 100px; }
@media (max-width: 991px) {
  .my-sidebar { position: static; top: auto; }
}
```

### 5. Form inputs need accessible labels

Every `<input>`, `<select>`, `<textarea>` MUST have either:
- A wrapping or `htmlFor`-linked `<label>`
- An `aria-label` attribute

Placeholders are NOT accessible labels — screen readers skip them.

Wrappers like `<InputControl>` and `<FormGroup>` handle this automatically; use them for any form field that has a visible label. For icon-only / placeholder-only inputs (search bars, etc.), add `aria-label="..."` directly.

### 6. Icon-only buttons need `aria-label`

```jsx
<button aria-label="Close" onClick={onClose}>
  <i className="bi bi-x" />
</button>
```

### 7. UTF-8 in CSS files

Style files contain `—`, `·`, `₹`, `™` etc. **Never bulk-edit with PowerShell's `Get-Content` / `Set-Content`** — they mangle multi-byte chars. Use `[System.IO.File]::ReadAllText($path, [System.Text.Encoding]::UTF8)` and write back with `UTF8Encoding($false)`, or use the project's Prettier (`npx prettier --write src/styles/**/*.css`).

---

## Browser support

Modern evergreen browsers (last 2 versions of Chrome, Firefox, Safari, Edge). No IE11.

---

## License

Proprietary — Svitch Motocorp Pvt Ltd. All rights reserved.
