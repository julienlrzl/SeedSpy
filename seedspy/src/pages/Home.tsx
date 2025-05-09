import { Link } from "react-router-dom";
import Allay from "../assets/Allay.png";

export default function Home() {
  return (
    <section className="w-full px-4 pt-[100px] pb-16 flex justify-center relative">
      {/* Bloc principal */}
      <div className="w-full max-w-5xl bg-[#fafafa] rounded-2xl border border-[#f0f0f0] px-10 py-16 text-center relative z-10">
        <h1 className="text-4xl md:text-5xl font-extrabold font-inter text-black mb-4">
          Master Minecraft like a pro
        </h1>
        <p className="text-base md:text-lg text-gray-600 max-w-xl mx-auto mb-8">
          Learn how to optimize your seed, locate rare structures, and explore
          the best biomes efficiently.
        </p>
        <div className="flex flex-col md:flex-row gap-4 justify-center">
          <Link
            to="/world-analyzer"
            className="bg-black text-white font-semibold px-6 py-3 rounded-full text-center"
          >
            Explore World Analyzer
          </Link>
          <Link
            to="/tools"
            className="border border-gray-300 px-6 py-3 rounded-full font-semibold text-black hover:bg-gray-100 text-center"
          >
            Try Slime Chunk Finder
          </Link>
        </div>
      </div>

      {/* Image Allay positionnée en bas à droite */}
      <img
        src={Allay}
        alt="Allay flying"
        className="hidden md:block absolute bottom-10 right-[calc(50%-640px/2-60px)] w-[130px] h-auto z-20"
      />
    </section>
  );
}
