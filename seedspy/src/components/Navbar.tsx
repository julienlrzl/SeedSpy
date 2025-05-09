import { Link } from "react-router-dom";
import logo from "../assets/block_1.png";

export default function Navbar() {
  return (
    <header className="fixed top-0 left-0 w-full z-50 bg-white/50 backdrop-blur-md shadow border-b border-gray-200">
      <div className="w-full h-[80px] px-10 py-3 flex items-center justify-between">
        <h1 className="text-[24px] font-semibold text-black tracking-tight font-inter">
          <Link to="/" className="flex items-center gap-1.3">
            <img src={logo} alt="Logo SeedSpy" className="h-9 w-auto" />
            SEEDSPY
          </Link>
        </h1>
        <nav className="flex items-center gap-7 text-[20px] font-semibold text-black font-manrope tracking-wide">
          <Link to="/" className="transition-colors hover:text-neutral-600">
            Home
          </Link>
          <Link
            to="/world-analyzer"
            className="transition-colors hover:text-neutral-600"
          >
            World Analyzer
          </Link>
          <Link
            to="/tools"
            className="transition-colors hover:text-neutral-600"
          >
            Tools
          </Link>
          <Link
            to="/about"
            className="transition-colors hover:text-neutral-600"
          >
            About
          </Link>
        </nav>
      </div>
    </header>
  );
}
