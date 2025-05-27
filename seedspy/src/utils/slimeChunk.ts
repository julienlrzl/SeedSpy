import { MersenneTwister19937, integer } from "random-js";

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

export function isSlimeChunkJava(
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

export function isSlimeChunkBedrock(
  _worldSeed: bigint,
  xPos: number,
  zPos: number
): boolean {
  // 1) coordonnées comme unsigned 32 bits
  const ux = BigInt(xPos >>> 0);
  const uz = BigInt(zPos >>> 0);

  // 2) hash simple
  //const hash = Number((ux * 0x1f1f1f1fn) ^ (uz & 0xffffffffn));
  const hash = Number(((ux * 0x1f1f1f1fn) ^ uz) & 0xffffffffn);

  // 3) seed MT19937 avec ce hash
  const engine = MersenneTwister19937.seed(hash);

  // 4) on tire un entier 32 bits non signé [0..0xFFFFFFFF]
  const n = integer(0, 0xffffffff)(engine);

  // 5) division entière par 10 via « multiply-high trick »
  const product = BigInt(n) * 0xcccccccdn;
  const hi = Number((product >> 32n) & 0xffffffffn);
  // équivalent à Math.floor(n/10)
  const hi10 = ((hi >>> 3) + (hi >>> 3) * 4) * 2;

  // 6) chance 1/10 si égal
  return n === hi10;
}
