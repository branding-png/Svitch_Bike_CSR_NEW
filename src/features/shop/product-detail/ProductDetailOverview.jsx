// Overview panel — long-form marketing copy. Children override the default body.
export default function ProductDetailOverview({ children }) {
  if (children) return <>{children}</>
  return (
    <>
      <p>
        The CSR 762 is Svitch&apos;s flagship electric motorcycle &mdash; engineered in Ahmedabad,
        tested on Indian roads. With a 6.5 kW peak-power motor, a 72V lithium-ion battery, and
        125 km of real-world range, the CSR 762 is built to dominate the daily commute and
        weekend run alike.
      </p>
      <p>
        Every component &mdash; from the dual-channel ABS, to the 7-inch TFT display, to the
        GPS-tracked anti-theft system &mdash; is designed to make electric riding effortless.
        Because going electric shouldn&apos;t mean compromise.
      </p>
    </>
  )
}
