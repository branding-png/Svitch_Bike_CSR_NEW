// Sample invoices for the account/invoices page.
export const INVOICE_STATS = [
  { label: 'This Financial Year',     value: '₹3,12,418' },
  { label: 'GST Paid (FY 2025–26)',   value: '₹47,656' },
  { label: 'FAME-II Eligible',        value: '₹15,000' },
  { label: 'Invoices Available',      value: '7' },
]

export const INVOICE_YEARS = ['All years', 'FY 2025–26', 'FY 2024–25']
export const INVOICE_TYPES = ['All types', 'Tax Invoice', 'Proforma', 'Credit Note']

export const INVOICES = [
  { id: 'INV-SVC-04812', date: '2026-05-08', order: 'SVC-2026-04812', type: 'Tax Invoice', amount: '₹2,52,520', gst: '₹38,520' },
  { id: 'INV-SVC-04580', date: '2026-04-22', order: 'SVC-2026-04580', type: 'Tax Invoice', amount: '₹18,500',   gst: '₹2,820' },
  { id: 'CN-SVC-04580',  date: '2026-05-02', order: 'SVC-2026-04580', type: 'Credit Note', amount: '−₹4,200',   gst: '−₹640', credit: true },
  { id: 'INV-SVC-04201', date: '2026-03-18', order: 'SVC-2026-04201', type: 'Tax Invoice', amount: '₹2,499',    gst: '₹381' },
  { id: 'INV-SVC-03988', date: '2026-02-11', order: 'SVC-2026-03988', type: 'Tax Invoice', amount: '₹1,299',    gst: '₹198' },
  { id: 'INV-SVC-03611', date: '2025-12-04', order: 'SVC-2025-03611', type: 'Tax Invoice', amount: '₹41,800',   gst: '₹6,377' },
]
