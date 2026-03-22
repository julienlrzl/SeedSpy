import { MersenneTwister19937, integer } from "random-js";

/**
 * Bedrock Edition slime chunk detection.
 * Uses MT19937 (Mersenne Twister) seeded with a hash of chunk coordinates.
 * The world seed is NOT used — slime chunks are the same in every Bedrock world.
 */
export function isSlimeChunkBedrock(
  _worldSeed: bigint,
  xPos: number,
  zPos: number
): boolean {
  const ux = BigInt(xPos >>> 0);
  const uz = BigInt(zPos >>> 0);

  const hash = Number(((ux * 0x1f1f1f1fn) ^ uz) & 0xffffffffn);

  const engine = MersenneTwister19937.seed(hash);
  const n = integer(0, 0xffffffff)(engine);

  return n % 10 === 0;
}
