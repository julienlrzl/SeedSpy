package com.seedspy.slimeapi;

import org.springframework.web.bind.annotation.*;

@RestController
@CrossOrigin
@RequestMapping("/slime")
public class SlimeChunkController {

    @GetMapping
    public SlimeResponse checkSlimeChunk(
            @RequestParam long seed,
            @RequestParam int x,
            @RequestParam int z
    ) {
        System.out.println("➡️ Requête : seed=" + seed + ", x=" + x + ", z=" + z);

        boolean isSlime = SlimeChunkOracle.isSlimeChunk(seed, x, z);

        int chunkX = Math.floorDiv(x, 16);
        int chunkZ = Math.floorDiv(z, 16);

        return new SlimeResponse(isSlime, seed, x, z, chunkX, chunkZ);
    }

    public record SlimeResponse(
            boolean slime,
            long seed,
            int x,
            int z,
            int chunkX,
            int chunkZ
    ) {}
}