interface CoordinateInfoProps {
  isSlime: boolean | null;
  x: string;
  z: string;
}

export default function CoordinateInfo({ isSlime, x, z }: CoordinateInfoProps) {
  const chunkX = Math.floor(Number(x) / 16);
  const chunkZ = Math.floor(Number(z) / 16);

  return (
    <div className="w-[512px] mx-auto mt-2 mb-1 text-end text-xs min-h-[1.25rem]">
      <p
        className={`transition-opacity duration-200 ${
          isSlime === null
            ? "invisible"
            : isSlime
              ? "text-green-600 font-semibold"
              : "text-red-600 font-semibold"
        }`}
      >
        {isSlime
          ? "C'est un chunk à slime !"
          : "Ce n'est pas un chunk à slime."}
        <span className="text-gray-500 font-normal ml-2 text-xs">
          ChunkX: {chunkX}, ChunkZ: {chunkZ}
        </span>
      </p>
    </div>
  );
}
