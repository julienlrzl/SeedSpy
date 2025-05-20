// Emule la conversion Java int32 signée
function toInt32(n: bigint): bigint {
  const mask32 = 0xffffffffn;
  let x = n & mask32;
  // si le bit 31 est à 1, interpréter comme négatif
  if (x & 0x80000000n) {
    x -= 0x100000000n;
  }
  return x;
}

// Émulation de java.util.Random (identique à Java)
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

export function isSlimeChunk(
  worldSeed: bigint,
  xPos: number,
  zPos: number
): boolean {
  // 1) calcul int32(x*x*0x4c1906)
  const a = toInt32(BigInt(xPos) * BigInt(xPos) * 0x4c1906n);

  // 2) calcul int32(x*0x5ac0db)
  const b = toInt32(BigInt(xPos) * 0x5ac0dbn);

  // 3) calcul (int32(z*z)) * 0x4307a7L    ← note : multiplication 64-bits
  const z2i = toInt32(BigInt(zPos) * BigInt(zPos));
  const c = z2i * 0x4307a7n;

  // 4) calcul int32(z*0x5f24f)
  const d = toInt32(BigInt(zPos) * 0x5f24fn);

  // 5) somme + worldSeed, puis XOR
  // Java : seed = worldSeed + a + b + c + d ^ 0x3ad8025fL;
  const sum = worldSeed + a + b + c + d;
  const finalSeed = sum ^ 0x3ad8025fn;

  // 6) on passe au Random et on teste nextInt(10)==0
  const rnd = new JavaRandom(finalSeed);
  return rnd.nextInt(10) === 0;
}
