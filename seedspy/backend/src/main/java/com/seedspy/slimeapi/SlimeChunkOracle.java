package com.seedspy.slimeapi;

public class SlimeChunkOracle {

    public static boolean isSlimeChunk(long seed, int blockX, int blockZ) {
        int chunkX = Math.floorDiv(blockX, 16);
        int chunkZ = Math.floorDiv(blockZ, 16);

        long a = (long) (int) (chunkX * chunkX * 4987142);
        long b = (long) (int) (chunkX * 5947611);
        long c = (long) (int) (chunkZ * chunkZ * 4392871);
        long d = (long) (int) (chunkZ * 389711);

        long newSeed = seed + a + b + c + d ^ 0x3AD8025FL;

        System.out.println("📍 seed=" + seed + ", chunkX=" + chunkX + ", chunkZ=" + chunkZ);
        System.out.println("🧮 Terms: a=" + a + ", b=" + b + ", c=" + c + ", d=" + d);
        System.out.println("🎯 newSeed=" + newSeed);

        JavaRandom random = new JavaRandom(newSeed);
        int result = random.nextInt(10);
        System.out.println("🎲 random.nextInt(10)=" + result);

        return result == 0;
    }
}