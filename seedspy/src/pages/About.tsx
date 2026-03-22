import { Link } from "react-router-dom";
import { FaGithub } from "react-icons/fa6";
import Social from "../components/Social";
import Allay from "../assets/Allay.png";

const TIMELINE = [
  {
    title: "The idea",
    description:
      "SeedSpy started as a personal side project to learn more about Minecraft world generation and build a modern alternative to existing tools.",
  },
  {
    title: "Slime Finder",
    description:
      "The first tool shipped was the Slime Chunk Finder, supporting both Java Edition (LCG) and Bedrock Edition (MT19937) algorithms.",
  },
  {
    title: "25+ tools planned",
    description:
      "The roadmap now includes finders for every major structure across all three dimensions, plus a full World Analyzer.",
  },
  {
    title: "Open source",
    description:
      "The entire codebase is public on GitHub. Contributions, bug reports, and feature requests are always welcome.",
  },
];

const TECH = [
  "React 19",
  "TypeScript",
  "Vite",
  "Tailwind CSS",
  "Canvas API",
  "random-js",
];

export default function About() {
  return (
    <>
      {/* ─── Hero ─── */}
      <section className="w-full px-4 pt-[120px] pb-20 flex justify-center relative">
        <div className="w-full max-w-5xl bg-[#fafafa] rounded-2xl border border-[#f0f0f0] px-10 py-20 text-center relative z-10">
          <p className="text-sm font-semibold font-manrope text-gray-500 uppercase tracking-widest mb-4">
            About
          </p>
          <h1 className="text-4xl md:text-5xl font-extrabold font-inter text-black mb-5 leading-tight">
            The story behind SeedSpy
          </h1>
          <p className="text-base md:text-lg text-[#6b6b6b] font-medium font-inter max-w-2xl mx-auto leading-relaxed">
            A free, open-source toolkit that helps Minecraft players explore
            their world seeds with accurate algorithms and a modern interface.
            Built by a solo developer, for the community.
          </p>
        </div>
        <img
          src={Allay}
          alt="Allay"
          className="hidden lg:block absolute bottom-6 right-[calc(50%-520px)] w-[120px] h-auto z-20 pointer-events-none"
        />
      </section>

      {/* ─── Mission ─── */}
      <section className="w-full bg-white py-20 px-4">
        <div className="max-w-5xl mx-auto flex flex-col lg:flex-row gap-16 items-start">
          <div className="lg:w-1/2">
            <h2 className="text-3xl md:text-4xl font-semibold font-inter text-black mb-4">
              Why SeedSpy?
            </h2>
            <p className="text-[#6b6b6b] font-inter text-base leading-relaxed mb-4">
              Most Minecraft seed tools feel outdated, cluttered with ads, or
              limited to a single edition. SeedSpy was created to offer a clean,
              fast, and accurate alternative that works entirely in your browser.
            </p>
            <p className="text-[#6b6b6b] font-inter text-base leading-relaxed mb-4">
              Every calculation runs client-side. Your seeds and save files are
              never uploaded anywhere. The algorithms are based on the same logic
              Minecraft uses internally, verified against the game for both Java
              and Bedrock editions.
            </p>
            <p className="text-[#6b6b6b] font-inter text-base leading-relaxed">
              The goal is simple: give players the best possible tool to
              understand and explore their worlds, without compromises.
            </p>
          </div>

          <div className="lg:w-1/2">
            <h3 className="text-xl font-bold font-manrope text-black mb-6">
              Project timeline
            </h3>
            <div className="space-y-6">
              {TIMELINE.map((item, i) => (
                <div key={i} className="flex gap-4">
                  <div className="flex flex-col items-center">
                    <div className="w-3 h-3 rounded-full bg-black mt-1.5 shrink-0" />
                    {i < TIMELINE.length - 1 && (
                      <div className="w-px flex-1 bg-gray-200 mt-1" />
                    )}
                  </div>
                  <div className="pb-2">
                    <h4 className="text-[16px] font-bold font-manrope text-black mb-1">
                      {item.title}
                    </h4>
                    <p className="text-[14px] text-[#6b6b6b] font-inter leading-relaxed">
                      {item.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ─── Tech Stack ─── */}
      <section className="w-full bg-[#fafafa] py-20 px-4">
        <div className="max-w-5xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-semibold font-inter text-black mb-3">
            Built with
          </h2>
          <p className="text-[#6b6b6b] font-medium font-inter text-base md:text-lg max-w-lg mx-auto mb-10">
            Modern technologies for performance and reliability.
          </p>
          <div className="flex flex-wrap justify-center gap-3">
            {TECH.map((t) => (
              <span
                key={t}
                className="bg-white border border-[#e5e5e5] rounded-full px-5 py-2.5 text-[15px] font-semibold font-manrope text-black"
              >
                {t}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* ─── Connect ─── */}
      <section className="w-full bg-white py-20 px-4">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-semibold font-inter text-black mb-3">
            Get in touch
          </h2>
          <p className="text-[#6b6b6b] font-medium font-inter text-base md:text-lg max-w-md mx-auto mb-8">
            Join the community, report bugs, or suggest new features.
          </p>

          <div className="flex justify-center mb-8">
            <Social />
          </div>

          <a
            href="https://github.com/julienlrzl"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 bg-black text-white font-semibold px-8 py-3.5 rounded-full hover:bg-neutral-800 transition"
          >
            <FaGithub size={20} />
            View on GitHub
          </a>
        </div>
      </section>

      {/* ─── CTA ─── */}
      <section className="w-full bg-[#fafafa] py-20 px-4">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-semibold font-inter text-black mb-4">
            Ready to explore?
          </h2>
          <p className="text-[#6b6b6b] font-medium font-inter text-base md:text-lg max-w-md mx-auto mb-8">
            Start using SeedSpy today. No sign-up, no download, no ads.
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
      </section>
    </>
  );
}
