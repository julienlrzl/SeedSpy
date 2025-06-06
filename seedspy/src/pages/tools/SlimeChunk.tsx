import Slimeball from "../../assets/Slimeball.png";
import { useEffect, useRef, useState } from "react";
import { useLocation } from "react-router-dom";
import { isSlimeChunkJava, isSlimeChunkBedrock } from "../../utils/slimeChunk";

// Import des composants
import SeedInput from "../../components/SlimeFinder/SeedInput";
import PlatformSelect from "../../components/SlimeFinder/PlatformSelect";
import ShareButton from "../../components/SlimeFinder/ShareButton";
import CoordinateForm from "../../components/SlimeFinder/CoordinateForm";
import CoordinateInfo from "../../components/SlimeFinder/CoordinatesInfo";
import SlimeGrid from "../../components/SlimeFinder/SlimeGrid";
import Questions from "../../components/Questions";

export default function SlimeChunk() {
  const [platform, setPlatform] = useState<"java" | "bedrock">("java");
  const [gridLines, setGridLines] = useState(true);
  const [x, setX] = useState("");
  const location = useLocation();
  const [z, setZ] = useState("");
  const [seed, setSeed] = useState("");
  const [isSlime, setIsSlime] = useState<boolean | null>(null);
  const [slimeChunksSet, setSlimeChunksSet] = useState<Set<string>>(new Set());
  const [zoom, setZoom] = useState(1);
  const [centerChunk, setCenterChunk] = useState<{ x: number; z: number }>({
    x: 0,
    z: 0,
  });
  const gridSize = 512;
  const chunksPerRow = Math.floor(64 / zoom);
  const chunkSize = gridSize / chunksPerRow;
  const gridRef = useRef<HTMLDivElement>(null!);
  const wheelDeltaRef = useRef(0);
  const animationRef = useRef<number | null>(null);
  const [hoverChunk, setHoverChunk] = useState<{ x: number; z: number } | null>(
    null
  );
  const [hoverBlock, setHoverBlock] = useState<{ x: number; z: number } | null>(
    null
  );
  const [markerChunk, setMarkerChunk] = useState<{
    x: number;
    z: number;
  } | null>(null);

  const isSlimeFn =
    platform === "java" ? isSlimeChunkJava : isSlimeChunkBedrock;

  function smoothZoom() {
    if (wheelDeltaRef.current === 0) return;

    const delta = wheelDeltaRef.current;
    wheelDeltaRef.current *= 0.8; // Atténuation progressive

    if (Math.abs(wheelDeltaRef.current) < 0.01) {
      wheelDeltaRef.current = 0;
      animationRef.current = null;
      return;
    }

    setZoom((prev) => {
      const newZoom =
        delta < 0 ? Math.max(prev - 0.05, 1) : Math.min(prev + 0.05, 4);
      return newZoom;
    });

    animationRef.current = requestAnimationFrame(smoothZoom);
  }

  function checkSlimeChunk() {
    let currentSeed = seed;

    if (currentSeed.trim() === "") {
      currentSeed = generateRandomSeed();
      setSeed(currentSeed);
    }

    const blockX = Number(x);
    const blockZ = Number(z);
    const chunkX = Math.floor(blockX / 16);
    const chunkZ = Math.floor(blockZ / 16);
    setCenterChunk({ x: chunkX, z: chunkZ });
    setMarkerChunk({ x: chunkX, z: chunkZ });

    const result = isSlimeFn(BigInt(currentSeed), chunkX, chunkZ);
    setIsSlime(result);

    loadSlimeChunksAround(chunkX, chunkZ);
  }

  function handleWheel(e: WheelEvent) {
    e.preventDefault();
    wheelDeltaRef.current += e.deltaY;

    if (!animationRef.current) {
      animationRef.current = requestAnimationFrame(smoothZoom);
    }
  }

  function generateRandomSeed(): string {
    const min = BigInt("-9000000000000000000");
    const max = BigInt("9000000000000000000");
    const range = max - min + BigInt(1);

    const rand =
      BigInt(Math.floor(Math.random() * Number.MAX_SAFE_INTEGER)) *
      BigInt(Date.now());
    const seed = (rand % range) + min;

    return seed.toString();
  }

  function loadSlimeChunksAround(centerX: number, centerZ: number) {
    const chunksToLoad = Math.floor(64 / zoom);
    const half = Math.floor(chunksToLoad / 2);

    const newSet = new Set<string>();
    const seedParam = BigInt(seed);

    for (let dx = -half; dx < half; dx++) {
      for (let dz = -half; dz < half; dz++) {
        const chunkX = centerX + dx;
        const chunkZ = centerZ + dz;

        if (isSlimeFn(seedParam, centerX + dx, centerZ + dz)) {
          newSet.add(`${chunkX},${chunkZ}`);
        }
      }
    }

    setSlimeChunksSet(newSet);
  }

  useEffect(() => {
    if (!centerChunk) return;

    // 1) on recharge la grille
    loadSlimeChunksAround(centerChunk.x, centerChunk.z);

    // 2) et on recalcul aussi le marker (la pastille rouge)
    if (markerChunk) {
      const worldSeed = BigInt(seed);
      const isSlimy = isSlimeFn(worldSeed, markerChunk.x, markerChunk.z);
      setIsSlime(isSlimy);
    }
  }, [platform, seed, zoom, centerChunk]);

  useEffect(() => {
    const grid = gridRef.current;
    if (!grid) return;
    grid.addEventListener("wheel", handleWheel, { passive: false });
    return () => {
      grid.removeEventListener("wheel", handleWheel);
    };
  }, []);

  useEffect(() => {
    const params = new URLSearchParams(location.search);

    // seed
    const s = params.get("seed");
    if (s) setSeed(s);

    // zoom
    const zq = parseFloat(params.get("zoom") ?? "");
    if (!isNaN(zq)) setZoom(zq);

    // gridLines
    const gl = params.get("gridLines");
    if (gl === "true" || gl === "false") setGridLines(gl === "true");

    // centre de vue
    const cx = parseInt(params.get("centerX") ?? "", 10);
    const cz = parseInt(params.get("centerZ") ?? "", 10);
    if (!isNaN(cx) && !isNaN(cz)) {
      setCenterChunk({ x: cx, z: cz });
      setMarkerChunk({ x: cx, z: cz });
      setIsSlime(isSlimeFn(BigInt(s ?? "0"), cx, cz));
      loadSlimeChunksAround(cx, cz);
    }
  }, [location.search]);

  return (
    <>
      <section className="w-full px-4 pt-[100px] pb-16 flex justify-center relative">
        {/* Bloc principal */}
        <div className="w-full max-w-5xl bg-[#fafafa] rounded-2xl border border-[#f0f0f0] px-10 py-16 text-center relative z-10">
          <h1 className="text-4xl md:text-5xl font-extrabold font-inter text-black mb-4">
            Slime Finder
          </h1>
          <p className="text-base md:text-lg text-gray-600 max-w-xl mx-auto mb-8">
            Learn how to optimize your seed, locate rare structures, and explore
            the best biomes efficiently.
          </p>
          <div className="flex flex-col items-start w-full max-w-xl mx-auto gap-4 mb-8 pb-10">
            {/* Seed input + buttons */}
            <SeedInput
              seed={seed}
              setSeed={setSeed}
              generateRandomSeed={generateRandomSeed}
            />

            {/* Java/Bedrock select */}
            <PlatformSelect value={platform} onChange={setPlatform} />
          </div>
          <div className="relative w-[512px] h-[512px] mx-auto overflow-hidden">
            {/* Grille zoomable */}
            <SlimeGrid
              chunksPerRow={chunksPerRow}
              chunkSize={chunkSize}
              gridSize={gridSize}
              centerChunk={centerChunk}
              markerChunk={markerChunk}
              slimeChunksSet={slimeChunksSet}
              gridRef={gridRef}
              setCenterChunk={setCenterChunk}
              onHoverChunk={setHoverChunk}
              onHoverBlock={setHoverBlock}
            />
          </div>
          {/* Info sur les coordonnées */}
          <CoordinateInfo
            isSlime={isSlime}
            cursorChunk={hoverChunk ?? centerChunk}
            cursorBlock={hoverBlock}
          />
          {/* Champs X/Z + bouton Go aligné à gauche de la grille */}
          <div className="mt-2 w-[512px] mx-auto flex justify-between items-center">
            {/* X/Z + Go */}
            <CoordinateForm
              x={x}
              z={z}
              setX={setX}
              setZ={setZ}
              onGo={checkSlimeChunk}
            />
            {/* Share Button */}
            <ShareButton
              gridRef={gridRef}
              seed={seed}
              centerChunk={centerChunk}
              zoom={zoom}
              gridLines={gridLines}
            />
          </div>
        </div>
        <img
          src={Slimeball}
          alt="Slime Icon"
          className="hidden md:block absolute z-20 w-[110px] h-auto bottom-[150px] right-[150px]"
        />
      </section>
      <Questions />
    </>
  );
}
