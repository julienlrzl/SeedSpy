// utils/slimeChunk.ts

export class JavaRandom {
  private seed!: bigint;

  private static readonly MULTIPLIER = BigInt(0x5deece66d);
  private static readonly ADDEND = BigInt(0xb);
  private static readonly MASK = (BigInt(1) << BigInt(48)) - BigInt(1);

  constructor(seed: bigint) {
    this.setSeed(seed);
  }

  setSeed(seed: bigint) {
    this.seed = (seed ^ JavaRandom.MULTIPLIER) & JavaRandom.MASK;
  }

  private next(bits: number): number {
    this.seed =
      (this.seed * JavaRandom.MULTIPLIER + JavaRandom.ADDEND) & JavaRandom.MASK;
    return Number(this.seed >> BigInt(48 - bits));
  }

  nextInt(bound: number): number {
    if (bound <= 0) throw new Error("bound must be positive");

    const m = bound - 1;
    if ((bound & m) === 0) {
      return Math.floor((bound * this.next(31)) / (1 << 31));
    }

    let u = this.next(31);
    let r = u % bound;
    while (u - r + m < 0) {
      u = this.next(31);
      r = u % bound;
    }
    return r;
  }
}

export function isSlimeChunk(
  seed: bigint,
  blockX: number,
  blockZ: number
): boolean {
  const chunkX = Math.floor(blockX / 16);
  const chunkZ = Math.floor(blockZ / 16);

  const a = chunkX * chunkX * 4987142;
  const b = chunkX * 5947611;
  const c = chunkZ * chunkZ * 4392871;
  const d = chunkZ * 389711;

  const newSeed = (BigInt(seed) + BigInt(a + b + c + d)) ^ BigInt(0x3ad8025f);

  const random = new JavaRandom(newSeed);
  return random.nextInt(10) === 0;
}
