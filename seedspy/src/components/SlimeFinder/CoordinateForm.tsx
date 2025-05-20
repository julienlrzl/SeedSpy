interface CoordinateFormProps {
  x: string;
  z: string;
  setX: (val: string) => void;
  setZ: (val: string) => void;
  onGo: () => void;
}

export default function CoordinateForm({
  x,
  z,
  setX,
  setZ,
  onGo,
}: CoordinateFormProps) {
  return (
    <div className="flex items-center gap-1 bg-white border border-[#f0f0f0] rounded-lg px-3 py-2 shadow-sm">
      <input
        type="number"
        placeholder="X"
        value={x}
        onChange={(e) => setX(e.target.value)}
        className="w-16 text-center bg-transparent focus:outline-none placeholder:text-neutral-500 text-black font-manrope text-sm"
      />
      <input
        type="number"
        placeholder="Z"
        value={z}
        onChange={(e) => setZ(e.target.value)}
        className="w-16 text-center bg-transparent focus:outline-none placeholder:text-neutral-500 text-black font-manrope text-sm"
      />
      <button
        onClick={onGo}
        className="px-3 py-1.5 rounded-md bg-black text-white text-sm font-semibold hover:bg-neutral-800"
      >
        Go
      </button>
    </div>
  );
}
