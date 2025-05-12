interface SlimeGridProps {
  chunksPerRow: number;
  chunkSize: number;
  gridSize: number;
  centerChunk: { x: number; z: number } | null;
  slimeChunksSet: Set<string>;
  gridRef: React.RefObject<HTMLDivElement>;
}

export default function SlimeGrid({
  chunksPerRow,
  chunkSize,
  gridSize,
  centerChunk,
  slimeChunksSet,
  gridRef,
}: SlimeGridProps) {
  return (
    <div
      ref={gridRef}
      className="grid relative"
      style={{
        gridTemplateColumns: `repeat(${chunksPerRow}, ${chunkSize}px)`,
        width: `${gridSize}px`,
        height: `${gridSize}px`,
      }}
    >
      <div className="absolute top-0 left-0 w-full h-full border-2 border-gray-400 rounded-sm pointer-events-none z-10" />
      {[...Array(chunksPerRow * chunksPerRow)].map((_, i) => {
        const dx = i % chunksPerRow;
        const dz = Math.floor(i / chunksPerRow);

        const chunkX = centerChunk
          ? centerChunk.x - Math.floor(chunksPerRow / 2) + dx
          : dx;

        const chunkZ = centerChunk
          ? centerChunk.z - Math.floor(chunksPerRow / 2) + dz
          : dz;

        const key = `${chunkX},${chunkZ}`;
        const isSlime = slimeChunksSet.has(key);

        const relX = Math.floor(chunksPerRow / 2);
        const relZ = Math.floor(chunksPerRow / 2);
        const isCursor = dx === relX && dz === relZ;

        return (
          <div
            key={i}
            className="border"
            style={{
              width: chunkSize,
              height: chunkSize,
              borderColor: isCursor ? "rgb(55, 65, 81)" : "rgb(229, 231, 235)",
              backgroundColor: isCursor
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
