import { Link } from "react-router-dom";

export default function SlimeChunk() {
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
        <div className="flex flex-col items-start w-full max-w-xl mx-auto gap-4 mb-8">
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
      </div>
    </section>
  );
}
