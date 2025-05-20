interface PlatformSelectProps {
  value: string;
  onChange: (value: string) => void;
}

export default function PlatformSelect({
  value,
  onChange,
}: PlatformSelectProps) {
  return (
    <div className="bg-[#fafafa] rounded-xl border border-[#f0f0f0] px-4 py-[10px]">
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="bg-transparent text-black font-manrope font-medium text-[16px] focus:outline-none"
      >
        <option value="java">Java Edition</option>
        <option value="bedrock">Bedrock Edition</option>
      </select>
    </div>
  );
}
