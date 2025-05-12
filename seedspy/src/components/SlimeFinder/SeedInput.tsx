interface SeedInputProps {
  seed: string;
  setSeed: (value: string) => void;
  generateRandomSeed: () => string;
}

export default function SeedInput({
  seed,
  setSeed,
  generateRandomSeed,
}: SeedInputProps) {
  return (
    <div className="flex items-center bg-[#fafafa] rounded-xl border border-[#f0f0f0] px-[15px] py-[12px] w-full">
      <input
        type="text"
        placeholder="Enter your seed..."
        value={seed}
        onChange={(e) => setSeed(e.target.value)}
        className="w-full bg-transparent focus:outline-none placeholder:text-neutral-500 text-black font-manrope font-medium text-[16px]"
      />
      <button className="ml-3 px-4 py-2 rounded-lg bg-white text-black border border-[#e5e5e5] font-semibold hover:bg-neutral-100 whitespace-nowrap">
        Load from Save
      </button>
      <button
        onClick={() => setSeed(generateRandomSeed())}
        className="ml-2 px-4 py-2 rounded-lg bg-white text-black border border-[#e5e5e5] font-semibold hover:bg-neutral-100 whitespace-nowrap"
      >
        Random
      </button>
    </div>
  );
}
