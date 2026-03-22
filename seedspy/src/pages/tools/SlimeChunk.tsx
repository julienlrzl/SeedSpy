import Slimeball from "../../assets/Slimeball.png";
import { useEffect, useRef, useState } from "react";
import { useLocation } from "react-router-dom";
import { isSlimeChunkJava } from "../../utils/slimeChunkJava";
import { isSlimeChunkBedrock } from "../../utils/slimeChunkBedrock";

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
  const [x, setX] = useState("0");
  const location = useLocation();
  const [z, setZ] = useState("0");

  function generateRandomSeed(): string {
    const min = BigInt("-9000000000000000000");
    const max = BigInt("9000000000000000000");
    const range = max - min + BigInt(1);
    const rand =
      BigInt(Math.floor(Math.random() * Number.MAX_SAFE_INTEGER)) *
      BigInt(Date.now());
    return ((rand % range) + min).toString();
  }

  const [seed, setSeed] = useState(generateRandomSeed);
  const [isSlime, setIsSlime] = useState(false);
  const [zoom, setZoom] = useState(1);
  const [centerChunk, setCenterChunk] = useState<{ x: number; z: number }>({
    x: 0,
    z: 0,
  });
  const gridSize = 512;
  const gridRef = useRef<HTMLDivElement>(null!);
  const [hoverChunk, setHoverChunk] = useState<{ x: number; z: number } | null>(
    null
  );
  const [hoverBlock, setHoverBlock] = useState<{ x: number; z: number } | null>(
    null
  );
  const [markerChunk, setMarkerChunk] = useState<{
    x: number;
    z: number;
  }>({ x: 0, z: 0 });

  const isSlimeFn =
    platform === "java" ? isSlimeChunkJava : isSlimeChunkBedrock;

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
  }

  // Recheck marker when platform/seed changes
  useEffect(() => {
    if (markerChunk && seed) {
      try {
        const worldSeed = BigInt(seed);
        setIsSlime(isSlimeFn(worldSeed, markerChunk.x, markerChunk.z));
      } catch {
        /* invalid seed */
      }
    }
  }, [platform, seed]);

  // URL params
  useEffect(() => {
    const params = new URLSearchParams(location.search);

    const s = params.get("seed");
    if (s) setSeed(s);

    const zq = parseFloat(params.get("zoom") ?? "");
    if (!isNaN(zq)) setZoom(zq);

    const gl = params.get("gridLines");
    if (gl === "true" || gl === "false") setGridLines(gl === "true");

    const cx = parseInt(params.get("centerX") ?? "", 10);
    const cz = parseInt(params.get("centerZ") ?? "", 10);
    if (!isNaN(cx) && !isNaN(cz)) {
      setCenterChunk({ x: cx, z: cz });
      setMarkerChunk({ x: cx, z: cz });
      setIsSlime(isSlimeFn(BigInt(s ?? "0"), cx, cz));
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
          <div className="mx-auto" style={{ width: gridSize + 30 }}>
            {/* Grid + rulers */}
            <SlimeGrid
              gridSize={gridSize}
              seed={seed}
              platform={platform}
              isSlimeFn={isSlimeFn}
              centerChunk={centerChunk}
              setCenterChunk={setCenterChunk}
              markerChunk={markerChunk}
              zoom={zoom}
              setZoom={setZoom}
              onHoverChunk={setHoverChunk}
              onHoverBlock={setHoverBlock}
              gridRef={gridRef}
            />
            {/* Info + controls aligned with grid (offset by ruler) */}
            <div style={{ paddingLeft: 30 }}>
              <CoordinateInfo
                isSlime={isSlime}
                cursorChunk={hoverChunk ?? centerChunk}
                cursorBlock={hoverBlock}
              />
            </div>
          </div>
          <div className="mt-2 mx-auto flex justify-between items-center" style={{ width: gridSize + 30, paddingLeft: 30 }}>
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
