import { Link } from "react-router-dom";
import Slimeball from "../../assets/Slimeball.png";

export default function SlimeChunk() {
  const slimeChunks = new Set<number>(
    Array.from({ length: 500 }, () => Math.floor(Math.random() * 4096))
  );

  return (
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
          <div className="flex items-center bg-[#fafafa] rounded-xl border border-[#f0f0f0] px-[15px] py-[12px] w-full">
            <input
              type="text"
              placeholder="Enter your seed..."
              className="w-full bg-transparent focus:outline-none placeholder:text-neutral-500 text-black font-manrope font-medium text-[16px]"
            />
            <button className="ml-3 px-4 py-2 rounded-lg bg-white text-black border border-[#e5e5e5] font-semibold hover:bg-neutral-100 whitespace-nowrap">
              Load from Save
            </button>
            <button className="ml-2 px-4 py-2 rounded-lg bg-white text-black border border-[#e5e5e5] font-semibold hover:bg-neutral-100 whitespace-nowrap">
              Random
            </button>
          </div>

          {/* Java/Bedrock select */}
          <div className="bg-[#fafafa] rounded-xl border border-[#f0f0f0] px-4 py-[10px]">
            <select className="bg-transparent text-black font-manrope font-medium text-[16px] focus:outline-none">
              <option value="java">Java Edition</option>
              <option value="bedrock">Bedrock Edition</option>
            </select>
          </div>
        </div>
        <div className="relative w-[512px] h-[512px] mx-auto">
          {/* Flèche X centrée au-dessus avec marge haute + marge basse équilibrée */}
          <div className="absolute -top-16 left-1/2 -translate-x-1/2 flex items-center gap-1 text-gray-600 font-manrope font-semibold text-xl pointer-events-none">
            <span>X</span>
          </div>

          {/* Flèche Z centrée à gauche avec espace équivalent à droite de la grille */}
          <div className="absolute top-1/2 -left-16 -translate-y-1/2 flex items-center gap-1 text-gray-600 font-manrope font-semibold text-xl pointer-events-none">
            <span>Z</span>
          </div>

          {/* Axe X (haut) */}
          <div className="absolute -top-6 left-0 flex w-[512px] justify-between px-1 text-xs text-gray-500 font-mono">
            {[...Array(9)].map((_, i) => (
              <div key={i} className="w-[56px] text-center">
                {i * 8}
              </div>
            ))}
          </div>

          {/* Axe Z (gauche) */}
          <div className="absolute top-0 -left-6 h-[512px] flex flex-col justify-between py-1 text-xs text-gray-500 font-mono">
            {[...Array(9)].map((_, i) => (
              <div
                key={i}
                className="h-[56px] flex items-center justify-end pr-1"
              >
                {i * 8}
              </div>
            ))}
          </div>

          {/* La grille */}
          <div
            className="grid"
            style={{
              gridTemplateColumns: `repeat(64, 1fr)`,
              width: "512px",
              height: "512px",
            }}
          >
            <div className="absolute top-0 left-0 w-[512px] h-[512px] border-2 border-gray-400 rounded-sm pointer-events-none" />
            {[...Array(64 * 64)].map((_, i) => (
              <div
                key={i}
                className="w-2 h-2 border border-gray-200"
                style={{
                  backgroundColor: slimeChunks.has(i)
                    ? "#4ade80"
                    : "transparent",
                }}
              />
            ))}
          </div>
        </div>
        {/* Champs X/Z + bouton Go aligné à gauche de la grille */}
        <div className="mt-6 w-[512px] mx-auto flex justify-between items-center">
          {/* X/Z + Go */}
          <div className="flex items-center gap-1 bg-white border border-[#f0f0f0] rounded-lg px-3 py-2 shadow-sm">
            <input
              type="number"
              placeholder="X"
              className="w-16 text-center bg-transparent focus:outline-none placeholder:text-neutral-500 text-black font-manrope text-sm"
            />
            <input
              type="number"
              placeholder="Z"
              className="w-16 text-center bg-transparent focus:outline-none placeholder:text-neutral-500 text-black font-manrope text-sm"
            />
            <button className="px-3 py-1.5 rounded-md bg-black text-white text-sm font-semibold hover:bg-neutral-800">
              Go
            </button>
          </div>

          {/* Share Button */}
          <button className="flex items-center gap-2 bg-[#95D03A] text-white text-xs font-bold px-3 py-2 rounded-md hover:opacity-90 transition h-[40px]">
            <svg
              height="16"
              viewBox="0 0 512 512"
              width="16"
              xmlns="http://www.w3.org/2000/svg"
              className="fill-white"
            >
              <path d="M384,336a63.78,63.78,0,0,0-46.12,19.7l-148-83.27a63.85,63.85,0,0,0,0-32.86l148-83.27a63.8,63.8,0,1,0-15.73-27.87l-148,83.27a64,64,0,1,0,0,88.6l148,83.27A64,64,0,1,0,384,336Z" />
            </svg>
            Share
          </button>
        </div>
        <img
          src={Slimeball}
          alt="Slime Icon"
          className="hidden md:block absolute z-20 w-[110px] h-auto bottom-[150px] right-[-35px]"
        />
      </div>
    </section>
  );
}
