// Emule la conversion Java int32 signée
function toInt32(n: bigint): bigint {
  const mask32 = 0xffffffffn;
  let x = n & mask32;
  if (x & 0x80000000n) {
    x -= 0x100000000n;
  }
  return x;
}

// Émulation de java.util.Random (LCG identique à Java)
class JavaRandom {
  private static readonly MULTIPLIER = 0x5deece66dn;
  private static readonly ADDEND = 0xbn;
  private static readonly MASK = (1n << 48n) - 1n;

  private seed: bigint;

  constructor(seedVal: bigint) {
    this.seed = (seedVal ^ JavaRandom.MULTIPLIER) & JavaRandom.MASK;
  }

  private next(bits: number): number {
    this.seed =
      (this.seed * JavaRandom.MULTIPLIER + JavaRandom.ADDEND) & JavaRandom.MASK;
    return Number(this.seed >> (48n - BigInt(bits)));
  }

  public nextInt(n: number): number {
    if ((n & -n) === n) {
      return (this.next(31) >>> 0) & (n - 1);
    }
    let bits: number, val: number;
    do {
      bits = this.next(31);
      val = bits % n;
    } while (bits - val + (n - 1) < 0);
    return val;
  }
}

export function isSlimeChunkJava(
  worldSeed: bigint,
  xPos: number,
  zPos: number
): boolean {
  const a = toInt32(BigInt(xPos) * BigInt(xPos) * 0x4c1906n);
  const b = toInt32(BigInt(xPos) * 0x5ac0dbn);
  const z2i = toInt32(BigInt(zPos) * BigInt(zPos));
  const c = z2i * 0x4307a7n;
  const d = toInt32(BigInt(zPos) * 0x5f24fn);

  const sum = worldSeed + a + b + c + d;
  const finalSeed = sum ^ 0x3ad8025fn;

  const rnd = new JavaRandom(finalSeed);
  return rnd.nextInt(10) === 0;
}
