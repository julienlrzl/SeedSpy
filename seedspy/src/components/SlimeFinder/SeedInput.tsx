import React, { useRef, useState } from "react";
import pako from "pako";

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
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [error, setError] = useState<string | null>(null);

  // Cherche un sous-tableau 'pattern' dans 'data'
  function findPattern(data: Uint8Array, pattern: Uint8Array): number {
    for (let i = 0; i <= data.length - pattern.length; i++) {
      let ok = true;
      for (let j = 0; j < pattern.length; j++) {
        if (data[i + j] !== pattern[j]) {
          ok = false;
          break;
        }
      }
      if (ok) return i;
    }
    return -1;
  }

  const openFileDialog = () => {
    setError(null);
    fileInputRef.current?.click();
  };

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    setError(null);
    const file = e.target.files?.[0];
    if (!file) return;
    if (!file.name.toLowerCase().endsWith("level.dat")) {
      setError("Veuillez sélectionner un fichier level.dat.");
      e.target.value = "";
      return;
    }

    try {
      // 1) Charger et décompresser
      const raw = new Uint8Array(await file.arrayBuffer());
      const data = pako.inflate(raw);

      // 2) Construire le pattern [0x04, 0x00, 0x0A, ...UTF8("RandomSeed")]
      const nameBytes = new TextEncoder().encode("RandomSeed");
      const pattern = new Uint8Array(3 + nameBytes.length);
      pattern[0] = 0x04; // TAG_Long
      pattern[1] = 0x00; // name length high byte
      pattern[2] = nameBytes.length; // name length low byte (10)
      pattern.set(nameBytes, 3);

      // 3) Trouver l'index
      const idx = findPattern(data, pattern);
      if (idx === -1) {
        throw new Error("Pattern RandomSeed non trouvé");
      }

      // 4) Lire les 8 octets juste après le pattern
      const dv = new DataView(data.buffer, idx + pattern.length);
      const seedBig = dv.getBigInt64(0, false); // big-endian

      setSeed(seedBig.toString());
      setError(null);
    } catch (err) {
      console.error(err);
      setError(
        "Impossible d’extraire la seed. Assurez-vous d’avoir un level.dat valide."
      );
    } finally {
      e.target.value = "";
    }
  };

  return (
    <div className="w-full">
      <div className="flex items-center bg-[#fafafa] rounded-xl border border-[#f0f0f0] px-4 py-3">
        <input
          type="text"
          placeholder="Enter your seed..."
          value={seed}
          onChange={(e) => {
            setSeed(e.target.value);
            setError(null);
          }}
          className="flex-1 bg-transparent focus:outline-none placeholder:text-neutral-500 text-black font-manrope font-medium text-[16px]"
        />

        <input
          type="file"
          accept=".dat"
          ref={fileInputRef}
          onChange={handleFileChange}
          style={{ display: "none" }}
        />

        <button
          onClick={openFileDialog}
          className="ml-3 px-4 py-2 rounded-lg bg-white text-black border border-[#e5e5e5] font-semibold hover:bg-neutral-100 whitespace-nowrap"
        >
          Load from Save
        </button>

        <button
          onClick={() => {
            setSeed(generateRandomSeed());
            setError(null);
          }}
          className="ml-2 px-4 py-2 rounded-lg bg-white text-black border border-[#e5e5e5] font-semibold hover:bg-neutral-100 whitespace-nowrap"
        >
          Random
        </button>
      </div>

      {error && (
        <div className="mt-2 p-3 bg-red-50 border border-red-200 text-red-800 rounded">
          {error}
        </div>
      )}
    </div>
  );
}
