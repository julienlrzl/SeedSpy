import { Link } from "react-router-dom";
import Allay from "../assets/Allay.png";
import Frog from "../assets/Frog.png";
import SlimeIcon from "../assets/Slime_2D.png";
import EyeIcon from "../assets/Eye_2D.png";
import VillagerIcon from "../assets/Villager_2D.png";
import GrassIcon from "../assets/Grass_2D.png";
import NetherwartIcon from "../assets/Netherwart_2D.png";
import EndIcon from "../assets/End_2D.png";

const POPULAR_TOOLS = [
  { name: "Slime Chunk", link: "/tools/slime", image: SlimeIcon },
  { name: "Biome", link: "/tools/biome", image: GrassIcon },
  { name: "Village", link: "/tools/village", image: VillagerIcon },
  { name: "Stronghold", link: "/tools/stronghold", image: EyeIcon },
  { name: "Nether Fortress", link: "/tools/nether-fortress", image: NetherwartIcon },
  { name: "End City", link: "/tools/end-city", image: EndIcon },
];

const STEPS = [
  {
    number: "01",
    title: "Enter your seed",
    description:
      "Type your world seed manually, generate a random one, or load it directly from your level.dat save file.",
  },
  {
    number: "02",
    title: "Choose your tool",
    description:
      "Select from 25+ specialized finders covering the Overworld, Nether, and End dimensions.",
  },
  {
    number: "03",
    title: "Explore the map",
    description:
      "Navigate an interactive map with smooth zoom, drag controls, and real-time coordinate tracking.",
  },
];

const FEATURES = [
  {
    title: "Java & Bedrock",
    description:
      "Full support for both editions with their respective algorithms. Switch between them in one click.",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M7.5 21L3 16.5m0 0L7.5 12M3 16.5h13.5m0-13.5L21 7.5m0 0L16.5 12M21 7.5H7.5" />
      </svg>
    ),
  },
  {
    title: "Instant results",
    description:
      "All calculations run locally in your browser. No server, no loading, no waiting.",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z" />
      </svg>
    ),
  },
  {
    title: "Load from save",
    description:
      "Drag and drop your level.dat file to automatically extract the seed. No manual input needed.",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5m-13.5-9L12 3m0 0l4.5 4.5M12 3v13.5" />
      </svg>
    ),
  },
  {
    title: "Share your finds",
    description:
      "Generate a link that preserves your seed, position, and zoom level. Share maps with friends instantly.",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M7.217 10.907a2.25 2.25 0 100 2.186m0-2.186c.18.324.283.696.283 1.093s-.103.77-.283 1.093m0-2.186l9.566-5.314m-9.566 7.5l9.566 5.314m0 0a2.25 2.25 0 103.935 2.186 2.25 2.25 0 00-3.935-2.186zm0-12.814a2.25 2.25 0 103.933-2.185 2.25 2.25 0 00-3.933 2.185z" />
      </svg>
    ),
  },
  {
    title: "Accurate algorithms",
    description:
      "Uses the exact same generation logic as Minecraft. Java LCG and Bedrock MT19937, verified against the game.",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z" />
      </svg>
    ),
  },
  {
    title: "100% private",
    description:
      "Everything runs in your browser. Your seeds and worlds are never sent to any server.",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 10.5V6.75a4.5 4.5 0 10-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 002.25-2.25v-6.75a2.25 2.25 0 00-2.25-2.25H6.75a2.25 2.25 0 00-2.25 2.25v6.75a2.25 2.25 0 002.25 2.25z" />
      </svg>
    ),
  },
];

export default function Home() {
  return (
    <>
      {/* ─── Hero ─── */}
      <section className="w-full px-4 pt-[120px] pb-20 flex justify-center relative">
        <div className="w-full max-w-5xl bg-[#fafafa] rounded-2xl border border-[#f0f0f0] px-10 py-20 text-center relative z-10">
          <p className="text-sm font-semibold font-manrope text-gray-500 uppercase tracking-widest mb-4">
            Minecraft Seed Toolkit
          </p>
          <h1 className="text-4xl md:text-6xl font-extrabold font-inter text-black mb-5 leading-tight">
            Master Minecraft
            <br />
            like a pro
          </h1>
          <p className="text-base md:text-lg text-[#6b6b6b] font-medium font-inter max-w-xl mx-auto mb-10 leading-relaxed">
            Analyze your world seed, locate rare structures, and explore every
            biome. All tools run in your browser, free and open source.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/tools/slime"
              className="bg-black text-white font-semibold px-8 py-3.5 rounded-full text-center hover:bg-neutral-800 transition"
            >
              Try Slime Finder
            </Link>
            <Link
              to="/tools"
              className="border border-gray-300 px-8 py-3.5 rounded-full font-semibold text-black hover:bg-gray-100 text-center transition"
            >
              Browse all tools
            </Link>
          </div>
        </div>

        <img
          src={Allay}
          alt="Allay"
          className="hidden lg:block absolute bottom-6 right-[calc(50%-520px)] w-[130px] h-auto z-20 pointer-events-none"
        />
      </section>

      {/* ─── Popular Tools ─── */}
      <section className="w-full bg-white py-20 px-4">
        <div className="max-w-5xl mx-auto">
          <div className="flex items-end justify-between mb-10">
            <div>
              <h2 className="text-3xl md:text-4xl font-semibold font-inter text-black mb-2">
                Popular tools
              </h2>
              <p className="text-[#6b6b6b] font-medium font-inter text-base md:text-lg">
                The most used finders to get started quickly.
              </p>
            </div>
            <Link
              to="/tools"
              className="hidden md:inline-flex items-center gap-1.5 text-sm font-semibold font-manrope text-black hover:text-neutral-600 transition whitespace-nowrap"
            >
              View all
              <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
              </svg>
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {POPULAR_TOOLS.map((tool) => (
              <Link
                key={tool.name}
                to={tool.link}
                className="group flex justify-between items-center bg-white rounded-xl border border-[#f0f0f0] shadow-[0px_0.5px_2.4px_-2px_rgba(0,0,0,0.086),0px_4px_20px_-4px_rgba(0,0,0,0.024)] p-6 hover:shadow-md hover:border-gray-200 transition"
              >
                <h3 className="text-lg font-manrope font-bold text-black group-hover:text-neutral-700 transition">
                  {tool.name}
                </h3>
                <img
                  src={tool.image}
                  alt={tool.name}
                  className="w-10 h-10 object-contain"
                />
              </Link>
            ))}
          </div>

          <Link
            to="/tools"
            className="md:hidden mt-6 inline-flex items-center gap-1.5 text-sm font-semibold font-manrope text-black"
          >
            View all tools
            <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
            </svg>
          </Link>
        </div>
      </section>

      {/* ─── How It Works ─── */}
      <section className="w-full bg-[#fafafa] py-20 px-4">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-14">
            <h2 className="text-3xl md:text-4xl font-semibold font-inter text-black mb-3">
              How it works
            </h2>
            <p className="text-[#6b6b6b] font-medium font-inter text-base md:text-lg max-w-lg mx-auto">
              Get results in seconds. No installation, no sign-up required.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {STEPS.map((step) => (
              <div
                key={step.number}
                className="bg-white rounded-xl border border-[#f0f0f0] p-8"
              >
                <span className="text-4xl font-extrabold font-inter text-black/10 mb-4 block">
                  {step.number}
                </span>
                <h3 className="text-xl font-bold font-manrope text-black mb-3">
                  {step.title}
                </h3>
                <p className="text-[#6b6b6b] font-inter text-[15px] leading-relaxed">
                  {step.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── Features ─── */}
      <section className="w-full bg-white py-20 px-4 relative">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-14">
            <h2 className="text-3xl md:text-4xl font-semibold font-inter text-black mb-3">
              Built for Minecraft players
            </h2>
            <p className="text-[#6b6b6b] font-medium font-inter text-base md:text-lg max-w-lg mx-auto">
              Every feature designed to save you time and help you find what matters.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {FEATURES.map((feature) => (
              <div
                key={feature.title}
                className="bg-[#fafafa] rounded-xl border border-[#f0f0f0] p-7"
              >
                <div className="w-11 h-11 rounded-lg bg-white border border-[#e5e5e5] flex items-center justify-center text-black mb-5">
                  {feature.icon}
                </div>
                <h3 className="text-lg font-bold font-manrope text-black mb-2">
                  {feature.title}
                </h3>
                <p className="text-[#6b6b6b] font-inter text-[15px] leading-relaxed">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>

        <img
          src={Frog}
          alt="Frog"
          className="hidden lg:block absolute bottom-10 right-[calc(50%-580px)] w-[110px] h-auto pointer-events-none"
        />
      </section>

      {/* ─── Stats Band ─── */}
      <section className="w-full bg-black py-16 px-4">
        <div className="max-w-5xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          {[
            { value: "25+", label: "Tools" },
            { value: "2", label: "Editions" },
            { value: "3", label: "Dimensions" },
            { value: "100%", label: "Free & Open Source" },
          ].map((stat) => (
            <div key={stat.label}>
              <p className="text-3xl md:text-4xl font-extrabold font-inter text-white mb-1">
                {stat.value}
              </p>
              <p className="text-sm font-medium font-manrope text-gray-400">
                {stat.label}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* ─── CTA ─── */}
      <section className="w-full bg-white py-20 px-4">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-semibold font-inter text-black mb-4">
            Ready to explore your world?
          </h2>
          <p className="text-[#6b6b6b] font-medium font-inter text-base md:text-lg max-w-md mx-auto mb-8">
            Enter your seed and start discovering everything your Minecraft world has to offer.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/tools/slime"
              className="bg-black text-white font-semibold px-8 py-3.5 rounded-full text-center hover:bg-neutral-800 transition"
            >
              Get started
            </Link>
            <Link
              to="/tools"
              className="border border-gray-300 px-8 py-3.5 rounded-full font-semibold text-black hover:bg-gray-100 text-center transition"
            >
              Explore tools
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
