import { useState, useEffect } from "react";
import JavaLogo from "../assets/java_logo.png";

export default function CoffeeWidget() {
  const [open, setOpen] = useState(false);
  const [visible, setVisible] = useState(false);

  // Show the button after a short delay so it doesn't flash on page load
  useEffect(() => {
    const t = setTimeout(() => setVisible(true), 1500);
    return () => clearTimeout(t);
  }, []);

  if (!visible) return null;

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end">
      {/* Card */}
      <div
        className={`mb-3 w-[300px] bg-white rounded-2xl border border-[#f0f0f0] shadow-lg p-6 origin-bottom-right transition-all duration-200 ${
          open
            ? "scale-100 opacity-100 translate-y-0"
            : "scale-90 opacity-0 translate-y-2 pointer-events-none"
        }`}
      >
        <button
          onClick={() => setOpen(false)}
          className="absolute top-3 right-4 text-gray-400 hover:text-gray-600 transition text-lg leading-none"
          aria-label="Close"
        >
          &times;
        </button>

        <img src={JavaLogo} alt="Coffee" className="w-8 h-8 object-contain mb-2" />
        <h3 className="text-[17px] font-bold font-manrope text-black mb-2">
          Support SeedSpy
        </h3>
        <p className="text-[14px] text-[#6b6b6b] font-inter leading-relaxed mb-5">
          SeedSpy is free and open source. If you find it useful, a coffee helps
          me keep developing new features!
        </p>

        <a
          href="https://buymeacoffee.com/julienlrzl"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center justify-center gap-2 w-full bg-[#FFDD00] hover:bg-[#ffce00] text-black font-bold font-manrope text-[15px] py-3 rounded-xl transition"
        >
          Buy me a coffee
        </a>
      </div>

      {/* Floating button */}
      <button
        onClick={() => setOpen((o) => !o)}
        className={`w-14 h-14 rounded-full shadow-lg flex items-center justify-center transition-all duration-200 hover:scale-105 active:scale-95 ${
          open
            ? "bg-black text-white"
            : "bg-white text-black border border-[#e5e5e5]"
        }`}
        aria-label="Support SeedSpy"
      >
        {open ? (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="w-5 h-5"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        ) : (
          <img src={JavaLogo} alt="Coffee" className="w-7 h-7 object-contain" />
        )}
      </button>
    </div>
  );
}
