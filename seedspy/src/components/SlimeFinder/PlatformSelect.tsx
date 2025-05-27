// src/components/SlimeFinder/PlatformSelect.tsx
import { type PlatformType } from "../../types/platform";

export interface PlatformSelectProps {
  value: PlatformType;
  onChange: (value: PlatformType) => void;
}

export default function PlatformSelect({
  value,
  onChange,
}: PlatformSelectProps) {
  return (
    <div className="bg-[#fafafa] rounded-xl border border-[#f0f0f0] px-4 py-[10px]">
      <select
        value={value}
        onChange={(e) => onChange(e.target.value as PlatformType)}
        className="bg-transparent text-black font-manrope font-medium text-[16px] focus:outline-none"
      >
        <option value="java">Java Edition</option>
        <option value="bedrock">Bedrock Edition</option>
      </select>
    </div>
  );
}
