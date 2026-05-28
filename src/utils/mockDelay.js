// Simulated network latency for demo flows. Wrap any fake "API call" in
// this helper so tests can flip it to 0 ms via an env var and CI doesn't
// have to sit through the 1.2s spinners.
//
//   import { mockDelay } from '@/utils/mockDelay'
//   await mockDelay()              // 1200ms default
//   await mockDelay(400)           // override
//
const DEFAULT_MS = 1200

export function mockDelay(ms = DEFAULT_MS) {
  if (import.meta?.env?.MODE === 'test') return Promise.resolve()
  return new Promise((resolve) => setTimeout(resolve, ms))
}
