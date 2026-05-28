// Static mock orders. Replace with API later — every consumer reads from here.
export const ORDERS = [
  {
    id: 'SV234581',
    placedAt: '2026-04-12',
    status: 'delivered',
    paymentMethod: 'UPI',
    items: [
      { id: 'csr-762', name: 'CSR 762', color: 'Black', qty: 1, price: 189999, image: '/images/products/csr-762.webp' },
    ],
    address: { name: 'Riya Sharma', line: 'A-410 Stellar, Sindhu Bhavan Road', city: 'Ahmedabad', state: 'Gujarat', pincode: '380054' },
    subtotal: 189999, shipping: 0, tax: 34200, total: 224199,
    trackingNumber: 'BLR12345IN',
    timeline: [
      { stage: 'Placed',     date: '2026-04-12', done: true },
      { stage: 'Confirmed',  date: '2026-04-12', done: true },
      { stage: 'Shipped',    date: '2026-04-15', done: true },
      { stage: 'Out for delivery', date: '2026-04-18', done: true },
      { stage: 'Delivered',  date: '2026-04-19', done: true },
    ],
  },
  {
    id: 'SV234562',
    placedAt: '2026-05-02',
    status: 'shipped',
    paymentMethod: 'Card',
    items: [
      { id: 'helmet-csr', name: 'CSR Helmet (ISI)', qty: 1, price: 4999, image: '/images/products/csr-762.webp' },
      { id: 'home-charger', name: 'Home Charging Dock', qty: 1, price: 8499, image: '/images/products/csr-762-gray.webp' },
    ],
    address: { name: 'Riya Sharma', line: 'A-410 Stellar', city: 'Ahmedabad', state: 'Gujarat', pincode: '380054' },
    subtotal: 13498, shipping: 499, tax: 2430, total: 16427,
    trackingNumber: 'BLR12346IN',
    timeline: [
      { stage: 'Placed',     date: '2026-05-02', done: true },
      { stage: 'Confirmed',  date: '2026-05-02', done: true },
      { stage: 'Shipped',    date: '2026-05-05', done: true },
      { stage: 'Out for delivery', date: '', done: false },
      { stage: 'Delivered',  date: '', done: false },
    ],
  },
  {
    id: 'SV234540',
    placedAt: '2026-05-10',
    status: 'processing',
    paymentMethod: 'EMI',
    items: [
      { id: 'csr-762-pro', name: 'CSR 762 Pro', color: 'Gray', qty: 1, price: 229999, image: '/images/products/csr-762-gray.webp' },
    ],
    address: { name: 'Riya Sharma', line: 'A-410 Stellar', city: 'Ahmedabad', state: 'Gujarat', pincode: '380054' },
    subtotal: 229999, shipping: 0, tax: 41400, total: 271399,
    trackingNumber: '',
    timeline: [
      { stage: 'Placed',     date: '2026-05-10', done: true },
      { stage: 'Confirmed',  date: '2026-05-10', done: true },
      { stage: 'Shipped',    date: '', done: false },
      { stage: 'Out for delivery', date: '', done: false },
      { stage: 'Delivered',  date: '', done: false },
    ],
  },
]

export function getOrder(id) {
  return ORDERS.find((o) => o.id === id) || null
}
