import { Link } from "react-router-dom";
import { useState } from "react";
import logo from "../assets/block_1.png";

const NAV_LINKS = [
  { to: "/", label: "Home" },
  { to: "/world-analyzer", label: "World Analyzer" },
  { to: "/tools", label: "Tools" },
  { to: "/about", label: "About" },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <header className="fixed top-0 left-0 w-full z-50 bg-white/50 backdrop-blur-md shadow border-b border-gray-200">
      <div className="w-full h-[80px] px-6 md:px-10 py-3 flex items-center justify-between">
        <h1 className="text-[24px] font-semibold text-black tracking-tight font-inter">
          <Link to="/" className="flex items-center gap-1.3" onClick={() => setOpen(false)}>
            <img src={logo} alt="Logo SeedSpy" className="h-9 w-auto" />
            SEEDSPY
          </Link>
        </h1>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-7 text-[20px] font-semibold text-black font-manrope tracking-wide">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.to}
              to={link.to}
              className="transition-colors hover:text-neutral-600"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        {/* Burger button */}
        <button
          onClick={() => setOpen((o) => !o)}
          className="md:hidden flex flex-col justify-center items-center w-10 h-10 gap-[5px]"
          aria-label="Menu"
        >
          <span
            className={`block w-6 h-[2px] bg-black rounded transition-all duration-300 ${
              open ? "rotate-45 translate-y-[7px]" : ""
            }`}
          />
          <span
            className={`block w-6 h-[2px] bg-black rounded transition-all duration-300 ${
              open ? "opacity-0" : ""
            }`}
          />
          <span
            className={`block w-6 h-[2px] bg-black rounded transition-all duration-300 ${
              open ? "-rotate-45 -translate-y-[7px]" : ""
            }`}
          />
        </button>
      </div>

      {/* Mobile menu */}
      <div
        className={`md:hidden overflow-hidden transition-all duration-300 bg-white/80 backdrop-blur-md border-t border-gray-100 ${
          open ? "max-h-[300px]" : "max-h-0"
        }`}
      >
        <nav className="flex flex-col px-6 py-4 gap-1">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.to}
              to={link.to}
              onClick={() => setOpen(false)}
              className="py-3 text-[18px] font-semibold text-black font-manrope hover:text-neutral-600 transition-colors"
            >
              {link.label}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  );
}
