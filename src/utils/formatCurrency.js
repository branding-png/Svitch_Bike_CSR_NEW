// Indian-locale currency formatter — used across cart, checkout, PDP, summary.
const formatter = new Intl.NumberFormat('en-IN', {
  style: 'currency',
  currency: 'INR',
  maximumFractionDigits: 0,
})

export function formatCurrency(amount) {
  if (amount == null || Number.isNaN(Number(amount))) return '—'
  return formatter.format(Number(amount))
}
