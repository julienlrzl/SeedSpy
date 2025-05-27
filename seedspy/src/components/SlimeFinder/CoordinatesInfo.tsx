interface CoordinateInfoProps {
  isSlime: boolean | null;
  cursorChunk: { x: number; z: number } | null;
  cursorBlock?: { x: number; z: number } | null;
}

export default function CoordinateInfo({
  isSlime,
  cursorChunk,
  cursorBlock,
}: CoordinateInfoProps) {
  if (isSlime === null) {
    return <div className="w-[512px] mx-auto mt-2 mb-1 min-h-[1.25rem]" />;
  }

  const chunkX = cursorChunk?.x ?? 0;
  const chunkZ = cursorChunk?.z ?? 0;
  const blockX = cursorBlock?.x ?? chunkX * 16;
  const blockZ = cursorBlock?.z ?? chunkZ * 16;
  const message = isSlime
    ? "C'est un chunk à slime !"
    : "Ce n'est pas un chunk à slime.";

  return (
    <div className="w-[512px] mx-auto mt-2 mb-1 text-xs min-h-[1.25rem]">
      <div className="flex items-center">
        {/* 1. Bloc X/Z tout à gauche */}
        <span className="text-gray-500 font-normal whitespace-nowrap">
          X : {blockX}, Z : {blockZ}
        </span>

        {/* 2. Groupe message + chunk à droite, collés grâce à space-x-2 */}
        <div className="flex items-center ml-auto space-x-2">
          <span
            className={`whitespace-nowrap ${
              isSlime
                ? "text-green-600 font-semibold"
                : "text-red-600 font-semibold"
            }`}
          >
            {message}
          </span>
          <span className="w-36 text-gray-500 font-normal whitespace-nowrap">
            ChunkX : {chunkX}, ChunkZ : {chunkZ}
          </span>
        </div>
      </div>
    </div>
  );
}
