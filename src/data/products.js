// Static product catalog. Swap for an API call when the backend lands —
// every consumer reads from this module so there's a single seam to change.
//
// Shape per product:
//   id, name, tagline, category, color, colors?, price, oldPrice?,
//   image, images?, rating, reviews, stock ('in-stock'|'pre-order'|'coming-soon'),
//   badge? ('new'|'sale'|'pre-order'|'coming-soon'|'oem'|'spicy'|'bestseller'),
//   description?, specs?
//
// `image: 'ICON:bi-<name>'` is the convention for icon-only tiles (makhana).
const IMG = '/images/products'

export const CATEGORIES = [
  { id: 'all',          label: 'All Products'          },
  { id: 'motorcycles',  label: 'Electric Motorcycles'  },
  { id: 'ebikes',       label: 'E-Bicycles'            },
  { id: 'spare-parts',  label: 'Spare Parts'           },
  { id: 'makhana',      label: 'Nutraceutical Makhana' },
]

export const PRODUCTS = [
  // ============ ELECTRIC MOTORCYCLES ============
  {
    id: 'csr-762-black',
    name: 'CSR 762 — Matte Black',
    tagline: 'Flagship Electric',
    category: 'motorcycles',
    color: 'black',
    price: 125000,
    oldPrice: 145000,
    image: `${IMG}/csr-762-black.webp`,
    rating: 4.8,
    reviews: 124,
    stock: 'in-stock',
    badge: 'new',
    description: 'The flagship CSR 762 in matte black — 110 km/h top speed, 125 km IDC range, and a 3-year battery warranty. Built for daily commute and weekend escape alike.',
  },
  {
    id: 'csr-762-red',
    name: 'CSR 762 — Crimson Red',
    tagline: 'Flagship Electric',
    category: 'motorcycles',
    color: 'red',
    price: 125000,
    oldPrice: 145000,
    image: `${IMG}/csr-762-red.webp`,
    rating: 4.6,
    reviews: 98,
    stock: 'in-stock',
    badge: 'sale',
    description: 'CSR 762 dressed in crimson red. Same flagship platform, same 125 km range, same 110 km/h top speed — now with a head-turning finish.',
  },
  {
    id: 'csr-762-gray',
    name: 'CSR 762 — Stealth Gray',
    tagline: 'Flagship Electric',
    category: 'motorcycles',
    color: 'gray',
    price: 125000,
    image: `${IMG}/csr-762-gray-1.webp`,
    rating: 4.9,
    reviews: 156,
    stock: 'in-stock',
    description: 'Stealth Gray CSR 762 — our most-loved colourway. Flagship 6.5 kW peak motor, 125 km IDC range, 3-year battery warranty.',
  },
  {
    id: 'nxe-pro-blue',
    name: 'NXE Pro — Ocean Blue',
    tagline: 'Next-Gen',
    category: 'motorcycles',
    color: 'blue',
    price: 149900,
    image: `${IMG}/product-1-blue.png`,
    rating: 4.3,
    reviews: 42,
    stock: 'pre-order',
    badge: 'pre-order',
    description: 'The NXE platform debuts in Ocean Blue. 7.5 kW peak motor, 160+ km range, and CAN-bus connected dashboard. Pre-orders ship from Q3.',
  },
  {
    id: 'csr-762-red-alt',
    name: 'CSR 762 — Red Edition',
    tagline: 'Limited Edition',
    category: 'motorcycles',
    color: 'red',
    price: 132000,
    oldPrice: 149000,
    image: `${IMG}/csr-762-red-1.webp`,
    rating: 4.5,
    reviews: 61,
    stock: 'in-stock',
    badge: 'sale',
    description: 'Limited Red Edition CSR 762 — special-finish trim, badged seat, and a numbered chassis plate. Only 250 units produced.',
  },
  {
    id: 'nxe-pro-yellow',
    name: 'NXE Pro — Sunrise Yellow',
    tagline: 'Next-Gen',
    category: 'motorcycles',
    color: 'yellow',
    price: 155000,
    image: `${IMG}/product-1-yellow.png`,
    rating: 4.4,
    reviews: 36,
    stock: 'pre-order',
    badge: 'pre-order',
    description: 'NXE Pro in Sunrise Yellow — limited run of 100 units. Same 7.5 kW platform, same 160 km range, signature high-vis paint.',
  },
  {
    id: 'nxe-sport-black',
    name: 'NXE Sport — Carbon Black',
    tagline: 'Sport Edition',
    category: 'motorcycles',
    color: 'black',
    price: 175000,
    image: `${IMG}/product-2-black.png`,
    rating: 4.7,
    reviews: 28,
    stock: 'coming-soon',
    badge: 'coming-soon',
    description: 'NXE Sport — the track-tuned variant. Lightweight carbon panels, sport-mapped throttle, and uprated brakes. Hits showrooms next quarter.',
  },
  {
    id: 'lite-xe-swap',
    name: 'Lite XE — Swappable Battery',
    tagline: 'Urban Commuter',
    category: 'motorcycles',
    color: 'gray',
    price: 89000,
    oldPrice: 99000,
    image: `${IMG}/csr-762-gray-Swappable-Battery.webp`,
    rating: 4.7,
    reviews: 89,
    stock: 'in-stock',
    description: 'Lite XE — the lightest Svitch with a 5-second hot-swap battery pack. 80 km per pack, 65 km/h top speed, perfect for tier-1 city commutes.',
  },

  // ============ E-BICYCLES ============
  {
    id: 'nxe-urban-red',
    name: 'NXE Urban — Red',
    tagline: 'City Commuter',
    category: 'ebikes',
    color: 'red',
    price: 49000,
    oldPrice: 55000,
    image: `${IMG}/product-3-red.png`,
    rating: 4.5,
    reviews: 72,
    stock: 'in-stock',
    badge: 'new',
    description: 'NXE Urban — the city commute e-bicycle in red. Pedal-assist + throttle, 60 km range, integrated lights, and a 2-year battery warranty.',
  },
  {
    id: 'brorix-blue',
    name: 'Brorix City — Ocean Blue',
    tagline: 'Daily Commute',
    category: 'ebikes',
    color: 'blue',
    price: 42000,
    image: `${IMG}/product-3-blue.png`,
    rating: 4.4,
    reviews: 58,
    stock: 'in-stock',
    description: 'Brorix City e-bicycle — relaxed geometry, comfort saddle, and a 250W mid-drive. 55 km on pedal-assist, ready for daily commutes.',
  },
  {
    id: 'xeplus-green',
    name: 'XE+ — Goblin Green',
    tagline: 'Lifestyle Commuter',
    category: 'ebikes',
    color: 'green',
    price: 38500,
    oldPrice: 44000,
    image: `${IMG}/product-3-green.png`,
    rating: 4.6,
    reviews: 44,
    stock: 'in-stock',
    badge: 'sale',
    description: 'XE+ in Goblin Green — lightweight aluminium frame, hydraulic disc brakes, and Shimano 7-speed shifters. Great first e-bike.',
  },
  {
    id: 'lite-fold-yellow',
    name: 'Lite Fold — Sunburst Yellow',
    tagline: 'Foldable Commuter',
    category: 'ebikes',
    color: 'yellow',
    price: 35000,
    image: `${IMG}/product-3-yellow.png`,
    rating: 4.2,
    reviews: 38,
    stock: 'in-stock',
    description: 'Lite Fold — folds down in under 8 seconds to fit in any car boot or metro train. 16-inch wheels, 40 km range, ideal for last-mile riders.',
  },
  {
    id: 'nxe-urban-gray',
    name: 'NXE Urban — Stealth Gray',
    tagline: 'City Commuter',
    category: 'ebikes',
    color: 'gray',
    price: 45000,
    image: `${IMG}/product-3-gray.png`,
    rating: 4.4,
    reviews: 51,
    stock: 'in-stock',
    description: 'NXE Urban in Stealth Gray — same 60 km range and pedal-assist platform as the red, finished in a low-key matte gray.',
  },

  // ============ SPARE PARTS & APPAREL ============
  {
    id: 'battery-72v',
    name: '72V 14.5Ah Battery Pack',
    tagline: 'Power & Range',
    category: 'spare-parts',
    color: 'gray',
    price: 28000,
    image: `${IMG}/csr-762-gray-Swappable-Battery.webp`,
    rating: 4.8,
    reviews: 45,
    stock: 'in-stock',
    badge: 'oem',
    description: 'Genuine OEM 72V 14.5Ah Li-NMC pack for the CSR 762 platform. IP67-rated, BMS-managed, and covered by a 3-year warranty.',
  },
  {
    id: 'brake-disc',
    name: 'Hydraulic Brake Disc Set',
    tagline: 'Safety & Control',
    category: 'spare-parts',
    color: 'black',
    price: 4500,
    image: `${IMG}/black-bike.webp`,
    rating: 4.6,
    reviews: 31,
    stock: 'in-stock',
    description: 'Front + rear hydraulic disc brake set — 240 mm rotor up front, 220 mm rear. Includes pads, bolts, and bleed kit.',
  },
  {
    id: 'tshirt-black',
    name: 'Svitch Racing Tee — Black',
    tagline: 'Apparel',
    category: 'spare-parts',
    color: 'black',
    price: 899,
    image: `${IMG}/Black-T-shirt-04-1_380x446.jpg`,
    rating: 4.5,
    reviews: 112,
    stock: 'in-stock',
    description: 'Svitch Racing Tee in black — 100% combed cotton, soft hand-feel, screen-printed Svitch logo. Pre-shrunk, ride-ready.',
  },
  {
    id: 'tshirt-red',
    name: 'Svitch Racing Tee — Red',
    tagline: 'Apparel',
    category: 'spare-parts',
    color: 'red',
    price: 1299,
    image: `${IMG}/Red-Tshirt-02.jpg`,
    rating: 4.7,
    reviews: 76,
    stock: 'in-stock',
    badge: 'new',
    description: 'Svitch Racing Tee in red — premium 200 GSM cotton, embroidered Svitch crest, side seams for a clean ride fit.',
  },
  {
    id: 'tank-white',
    name: 'Estelle Tank — White',
    tagline: 'Apparel',
    category: 'spare-parts',
    color: 'white',
    price: 799,
    image: `${IMG}/Estelle-White-Tank-02.jpg`,
    rating: 4.4,
    reviews: 54,
    stock: 'in-stock',
    description: 'Estelle tank in white — light, breathable, and built for warm rides. Wide-strap shoulder cut and bound neckline.',
  },
]

export function getProduct(id) {
  return PRODUCTS.find((p) => p.id === id) || null
}

export function getProductById(id) {
  return getProduct(id)
}

export function searchProducts(query) {
  const q = (query || '').trim().toLowerCase()
  if (!q) return PRODUCTS
  return PRODUCTS.filter((p) =>
    [p.name, p.tagline, p.category, p.color, ...(p.colors || [])]
      .filter(Boolean)
      .some((field) => String(field).toLowerCase().includes(q)),
  )
}

export function filterByCategory(list, category) {
  if (!category || category === 'all') return list
  return list.filter((p) => p.category === category)
}

function stockOf(p) {
  if (p.stock) return p.stock
  return p.inStock === false ? 'coming-soon' : 'in-stock'
}

export function categoryCounts(list = PRODUCTS) {
  const counts = { all: list.length }
  for (const p of list) counts[p.category] = (counts[p.category] || 0) + 1
  return counts
}

export function stockCounts(list = PRODUCTS) {
  const counts = {}
  for (const p of list) {
    const s = stockOf(p)
    counts[s] = (counts[s] || 0) + 1
  }
  return counts
}

export function filterProducts(list, { category, maxPrice, color, stock, query } = {}) {
  let out = list
  // `category` may be a string ('all' | id) or an array of ids (multi-select).
  // Empty array / 'all' / nullish → no filter.
  if (Array.isArray(category)) {
    if (category.length > 0) out = out.filter((p) => category.includes(p.category))
  } else if (category && category !== 'all') {
    out = out.filter((p) => p.category === category)
  }
  if (maxPrice != null)               out = out.filter((p) => p.price <= maxPrice)
  if (color) {
    out = out.filter((p) => {
      const c = String(p.color || '').toLowerCase()
      const list2 = (p.colors || []).map((x) => String(x).toLowerCase())
      return c === color || list2.includes(color)
    })
  }
  if (stock && stock.length) out = out.filter((p) => stock.includes(stockOf(p)))
  if (query) {
    const q = query.toLowerCase()
    out = out.filter((p) =>
      `${p.name} ${p.tagline || ''} ${p.category || ''}`.toLowerCase().includes(q),
    )
  }
  return out
}

export function sortProducts(list, sort) {
  const out = list.slice()
  switch (sort) {
    case 'price-asc':  return out.sort((a, b) => a.price - b.price)
    case 'price-desc': return out.sort((a, b) => b.price - a.price)
    case 'newest':     return out.sort((a, b) => (b.createdAt || 0) - (a.createdAt || 0))
    case 'rated':      return out.sort((a, b) => (b.rating || 0) - (a.rating || 0))
    default:           return out // 'featured' — keep authoring order
  }
}
