package com.seedspy.slimeapi;

public class JavaRandom {
    private long seed;

    private static final long MULTIPLIER = 0x5DEECE66DL;
    private static final long ADDEND = 0xBL;
    private static final long MASK = (1L << 48) - 1;

    public JavaRandom(long seed) {
        setSeed(seed);
    }

    public void setSeed(long seed) {
        this.seed = (seed ^ MULTIPLIER) & MASK;
    }

    private int next(int bits) {
        seed = (seed * MULTIPLIER + ADDEND) & MASK;
        return (int) (seed >>> (48 - bits));
    }

    public int nextInt(int bound) {
        if (bound <= 0) throw new IllegalArgumentException("bound must be positive");

        int r = next(31);
        int m = bound - 1;

        if ((bound & m) == 0) {
            return (int) ((bound * (long) r) >> 31);
        }

        int u = r;
        while (u - (r = u % bound) + m < 0) {
            u = next(31);
        }

        return r;
    }
}