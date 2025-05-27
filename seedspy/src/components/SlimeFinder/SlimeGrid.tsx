import React, { useState, useEffect, useRef } from "react";

export interface SlimeGridProps {
  chunksPerRow: number;
  chunkSize: number;
  gridSize: number;
  centerChunk: { x: number; z: number } | null;
  markerChunk: { x: number; z: number } | null;
  slimeChunksSet: Set<string>;
  gridRef: React.RefObject<HTMLDivElement>;

  // drag & drop
  setCenterChunk: React.Dispatch<
    React.SetStateAction<{ x: number; z: number }>
  >;
  // callback pour remonter le chunk sous la souris
  onHoverChunk: React.Dispatch<
    React.SetStateAction<{ x: number; z: number } | null>
  >;
  // callback pour remonter la coordonnée exacte en blocs
  onHoverBlock?: React.Dispatch<
    React.SetStateAction<{ x: number; z: number } | null>
  >;
}

export default function SlimeGrid({
  chunksPerRow,
  chunkSize,
  gridSize,
  centerChunk,
  markerChunk,
  slimeChunksSet,
  gridRef,
  setCenterChunk,
  onHoverChunk,
  onHoverBlock,
}: SlimeGridProps) {
  const [isDragging, setIsDragging] = useState(false);
  const dragStart = useRef<{
    x: number;
    z: number;
    px: number;
    pz: number;
  } | null>(null);

  // Pré-calcul pour centrer
  const half = Math.floor(chunksPerRow / 2);

  useEffect(() => {
    const grid = gridRef.current;
    if (!grid) return;

    const onPointerDown = (e: PointerEvent) => {
      e.preventDefault();
      grid.setPointerCapture(e.pointerId);
      setIsDragging(true);
      dragStart.current = {
        x: centerChunk?.x ?? 0,
        z: centerChunk?.z ?? 0,
        px: e.clientX,
        pz: e.clientY,
      };
    };

    const onPointerMove = (e: PointerEvent) => {
      // 1. Drag & drop
      if (isDragging && dragStart.current) {
        const dx = e.clientX - dragStart.current.px;
        const dz = e.clientY - dragStart.current.pz;
        const deltaX = -Math.round(dx / chunkSize);
        const deltaZ = -Math.round(dz / chunkSize);
        setCenterChunk({
          x: dragStart.current.x + deltaX,
          z: dragStart.current.z + deltaZ,
        });
      }

      // 2. Survol : calcul du chunk et du bloc sous la souris
      const rect = grid.getBoundingClientRect();
      const relX = e.clientX - rect.left;
      const relY = e.clientY - rect.top;

      if (
        relX < 0 ||
        relX >= gridSize ||
        relY < 0 ||
        relY >= gridSize ||
        centerChunk === null
      ) {
        onHoverChunk(null);
        onHoverBlock && onHoverBlock(null);
      } else {
        const cellX = Math.floor(relX / chunkSize);
        const cellZ = Math.floor(relY / chunkSize);
        const hoverChunkX = centerChunk.x - half + cellX;
        const hoverChunkZ = centerChunk.z - half + cellZ;

        onHoverChunk({ x: hoverChunkX, z: hoverChunkZ });

        if (onHoverBlock) {
          // intra-chunk (0..15)
          const intraX = Math.floor(((relX % chunkSize) / chunkSize) * 16);
          const intraZ = Math.floor(((relY % chunkSize) / chunkSize) * 16);
          const blockX = hoverChunkX * 16 + intraX;
          const blockZ = hoverChunkZ * 16 + intraZ;
          onHoverBlock({ x: blockX, z: blockZ });
        }
      }
    };

    const onPointerUp = (e: PointerEvent) => {
      grid.releasePointerCapture(e.pointerId);
      setIsDragging(false);
      dragStart.current = null;
    };

    const onPointerLeave = () => {
      onHoverChunk(null);
      onHoverBlock && onHoverBlock(null);
    };

    grid.addEventListener("pointerdown", onPointerDown);
    grid.addEventListener("pointermove", onPointerMove);
    grid.addEventListener("pointerup", onPointerUp);
    grid.addEventListener("pointerleave", onPointerLeave);

    return () => {
      grid.removeEventListener("pointerdown", onPointerDown);
      grid.removeEventListener("pointermove", onPointerMove);
      grid.removeEventListener("pointerup", onPointerUp);
      grid.removeEventListener("pointerleave", onPointerLeave);
    };
  }, [
    gridRef,
    isDragging,
    chunkSize,
    gridSize,
    centerChunk,
    setCenterChunk,
    onHoverChunk,
    onHoverBlock,
    half,
  ]);

  return (
    <div
      ref={gridRef}
      className="grid relative"
      style={{
        gridTemplateColumns: `repeat(${chunksPerRow}, ${chunkSize}px)`,
        width: `${gridSize}px`,
        height: `${gridSize}px`,
        cursor: isDragging ? "grabbing" : "grab",
        userSelect: "none",
      }}
    >
      {/* Bordure fixe */}
      <div className="absolute top-0 left-0 w-full h-full border-2 border-gray-400 rounded-sm pointer-events-none z-10" />

      {/* Cases */}
      {[...Array(chunksPerRow * chunksPerRow)].map((_, i) => {
        const dx = i % chunksPerRow;
        const dz = Math.floor(i / chunksPerRow);

        // coordonnées monde de la case
        const chunkX = centerChunk ? centerChunk.x - half + dx : dx;
        const chunkZ = centerChunk ? centerChunk.z - half + dz : dz;

        const key = `${chunkX},${chunkZ}`;
        const isSlime = slimeChunksSet.has(key);

        // Est-ce le chunk marker ?
        const isMarker =
          markerChunk !== null &&
          markerChunk.x === chunkX &&
          markerChunk.z === chunkZ;

        return (
          <div
            key={key}
            className="border"
            style={{
              width: chunkSize,
              height: chunkSize,
              borderColor: isMarker ? "rgb(55, 65, 81)" : "rgb(229, 231, 235)",
              backgroundColor: isMarker
                ? "red"
                : isSlime
                  ? "rgba(118, 190, 109, 1)"
                  : "transparent",
            }}
          />
        );
      })}
    </div>
  );
}
