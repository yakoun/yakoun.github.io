export type TileSize = 'hero' | 'large' | 'wide' | 'tall' | 'medium' | 'small'

const WEIGHTS: Record<TileSize, number> = {
  hero: 5,
  large: 15,
  wide: 20,
  tall: 20,
  medium: 20,
  small: 20,
}

// Deterministic pseudo-random in [0,1) from an integer seed.
// Avoids hydration mismatches and keeps the composition stable per index.
function pseudo(i: number): number {
  const x = Math.sin(i * 127.1 + 311.7) * 43758.5453
  return x - Math.floor(x)
}

function pick(weights: Record<TileSize, number>, r: number): TileSize {
  const entries = (Object.entries(weights) as [TileSize, number][]).filter(([, w]) => w > 0)
  const total = entries.reduce((s, [, w]) => s + w, 0)
  let acc = r * total
  for (const [k, w] of entries) {
    acc -= w
    if (acc <= 0) return k
  }
  return entries[entries.length - 1][0]
}

/**
 * Assigns a TileSize to every image so the grid looks composed by a designer:
 * - first image of a rich set is biased toward hero/large
 * - never two hero in a row
 * - avoids two wide in a row
 * - balances tall so they don't stack
 */
export function assignSizes(n: number): TileSize[] {
  const sizes: TileSize[] = []
  let prev: TileSize | null = null
  let prev2: TileSize | null = null

  for (let i = 0; i < n; i++) {
    const weights: Record<TileSize, number> = { ...WEIGHTS }

    if (i === 0 && n >= 3) {
      weights.hero = 55
      weights.large = 45
    }
    if (prev === 'hero') weights.hero = 0
    if (prev === 'wide') weights.wide = 3
    if (prev === 'tall') weights.tall = 8
    if (prev2 === 'wide' && prev === 'wide') weights.wide = 0

    const chosen = pick(weights, pseudo(i + 1))
    sizes.push(chosen)
    prev2 = prev
    prev = chosen
  }

  return sizes
}

// Responsive CSS grid spans (mobile 2 / tablet 8 / desktop 12 cols).
export const SIZE_CLASS: Record<TileSize, string> = {
  hero: 'col-span-2 md:col-span-6 lg:col-span-6 row-span-2 md:row-span-3 lg:row-span-4',
  large: 'col-span-2 md:col-span-4 lg:col-span-4 row-span-2 md:row-span-3 lg:row-span-3',
  wide: 'col-span-2 md:col-span-5 lg:col-span-6 row-span-2 md:row-span-2 lg:row-span-2',
  tall: 'col-span-1 md:col-span-3 lg:col-span-3 row-span-2 md:row-span-3 lg:row-span-3',
  medium: 'col-span-1 md:col-span-3 lg:col-span-3 row-span-2 md:row-span-2 lg:row-span-2',
  small: 'col-span-1 md:col-span-2 lg:col-span-2 row-span-2 md:row-span-2 lg:row-span-2',
}
