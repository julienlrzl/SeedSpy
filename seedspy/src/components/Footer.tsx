import logo from "../assets/block_1.png";
import Social from "./Social.tsx";
import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer className="bg-white text-sm text-gray-600 px-10 py-14">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between gap-12">
        {/* Colonne 1 - Branding + Réseaux */}
        <div className="flex flex-col gap-6 max-w-sm">
          <div className="flex items-center gap-2">
            <img src={logo} alt="SeedSpy Logo" className="h-8 w-auto" />
            <span className="text-xl font-semibold text-black">SEEDSPY</span>
          </div>
          <p className="text-[18px] leading-[1.6em] text-[#484848] font-medium font-inter m-0 p-0">
            Explore every Minecraft world like never before.
          </p>
          <div className="flex gap-5 text-xl text-gray-700">
            <Social />
          </div>
        </div>

        {/* Colonne 2 - Navigation */}
        <div className="flex gap-16">
          <div className="flex flex-col gap-3">
            <h4 className="text-black font-semibold">Pages</h4>
            <Link to="/" className="hover:text-black">
              Home
            </Link>
            <Link to="/tools" className="hover:text-black">
              Tools
            </Link>
            <Link to="/world-analyzer" className="hover:text-black">
              World Analyzer
            </Link>
          </div>

          <div className="flex flex-col gap-3">
            <h4 className="text-black font-semibold">Tools</h4>
            <Link to="/tools/slime" className="hover:text-black">
              Slime Finder
            </Link>
            <Link to="/tools/biome" className="hover:text-black">
              Biome Finder
            </Link>
            <Link to="/tools/stronghold" className="hover:text-black">
              Stronghold
            </Link>
          </div>

          <div className="flex flex-col gap-3">
            <h4 className="text-black font-semibold">SeedSpy</h4>
            <Link to="/about" className="hover:text-black">
              About
            </Link>
            <a
              href="https://github.com/julienlrzl"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-black"
            >
              GitHub
            </a>
          </div>
        </div>
      </div>

      {/* Footer Bottom */}
      <div className="text-center mt-12 text-gray-400">
        © 2022–{new Date().getFullYear()} SeedSpy. All rights reserved.
      </div>
    </footer>
  );
}
