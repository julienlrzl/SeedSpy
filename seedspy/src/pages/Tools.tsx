import { Link } from "react-router-dom";
import { useState } from "react";
import Frog from "../assets/Frog.png";
import SlimeIcon from "../assets/Slime_2D.png";
import EyeIcon from "../assets/Eye_2D.png";
import RailIcon from "../assets/Rail_2D.png";
import PillagerIcon from "../assets/Pillager_Head_2D.png";
import SpawnerIcon from "../assets/Spawner_2D.png";
import VillagerIcon from "../assets/Villager_2D.png";
import PortalIcon from "../assets/Portal_2D.png";
import WitchIcon from "../assets/Witch_2D.png";
import ChestIcon from "../assets/Chest_2D.png";
import DrawnedIcon from "../assets/Drawned_2D.png";
import AmethystIcon from "../assets/Amethyst_2D.png";
import GatewayIcon from "../assets/Gateway_2D.png";
import SnowballIcon from "../assets/Snowball_2D.png";
import NetherwartIcon from "../assets/Netherwart_2D.png";
import BlackstoneIcon from "../assets/Blackstone_2D.png";
import BoneIcon from "../assets/Bone_2D.png";
import LanternIcon from "../assets/Lantern_2D.png";
import DiamondIcon from "../assets/Diamond_2D.png";
import EndIcon from "../assets/End_2D.png";
import PrismarineIcon from "../assets/Prismarine_2D.png";
import PlanksIcon from "../assets/Planks_2D.png";
import MossyIcon from "../assets/Mossy_2D.png";
import SandstoneIcon from "../assets/Sandstone_2D.png";
import MapIcon from "../assets/Map_2D.png";
import GrassIcon from "../assets/Grass_2D.png";

export default function Tools() {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [searchTerm, setSearchTerm] = useState("");
  const tools = [
    {
      name: "Biome",
      link: "/tools/biome",
      category: "Popular",
      image: GrassIcon,
    },
    {
      name: "Slime Chunk",
      link: "/tools/slime",
      category: "Popular",
      image: SlimeIcon,
    },
    {
      name: "Village",
      link: "/tools/village",
      category: "Popular",
      image: VillagerIcon,
    },

    {
      name: "Dungeon",
      link: "/tools/dungeon",
      category: "Overworld",
      image: SpawnerIcon,
    },
    {
      name: "Stronghold",
      link: "/tools/stronghold",
      category: "Overworld",
      image: EyeIcon,
    },
    {
      name: "Mansion",
      link: "/tools/mansion",
      category: "Overworld",
      image: PlanksIcon,
    },
    {
      name: "Monument",
      link: "/tools/monument",
      category: "Overworld",
      image: PrismarineIcon,
    },
    {
      name: "Pillager Outpost",
      link: "/tools/outpost",
      category: "Overworld",
      image: PillagerIcon,
    },
    {
      name: "Mineshaft",
      link: "/tools/mineshaft",
      category: "Overworld",
      image: RailIcon,
    },
    {
      name: "Ruined Portal",
      link: "/tools/ruined-portal",
      category: "Overworld",
      image: PortalIcon,
    },
    {
      name: "Jungle Temple",
      link: "/tools/jungle-temple",
      category: "Overworld",
      image: MossyIcon,
    },
    {
      name: "Desert Temple",
      link: "/tools/desert-temple",
      category: "Overworld",
      image: SandstoneIcon,
    },
    {
      name: "Witch Hut",
      link: "/tools/witch-hut",
      category: "Overworld",
      image: WitchIcon,
    },
    {
      name: "Buried Treasure",
      link: "/tools/treasure",
      category: "Overworld",
      image: ChestIcon,
    },
    {
      name: "Shipwreck",
      link: "/tools/shipwreck",
      category: "Overworld",
      image: MapIcon,
    },
    {
      name: "Igloo",
      link: "/tools/igloo",
      category: "Overworld",
      image: SnowballIcon,
    },
    {
      name: "Ocean Ruin",
      link: "/tools/ocean-ruin",
      category: "Overworld",
      image: DrawnedIcon,
    },
    {
      name: "Fossil",
      link: "/tools/fossil",
      category: "Overworld",
      image: BoneIcon,
    },
    {
      name: "Ravine",
      link: "/tools/ravine",
      category: "Overworld",
      image: DiamondIcon,
    },
    {
      name: "Amethyst Geode",
      link: "/tools/amethyst",
      category: "Overworld",
      image: AmethystIcon,
    },
    {
      name: "Ancient City",
      link: "/tools/ancient-city",
      category: "Overworld",
      image: LanternIcon,
    },

    {
      name: "End City",
      link: "/tools/end-city",
      category: "End",
      image: EndIcon,
    },
    {
      name: "End Gateway",
      link: "/tools/end-gateway",
      category: "End",
      image: GatewayIcon,
    },

    {
      name: "Nether Fortress",
      link: "/tools/nether-fortress",
      category: "Nether",
      image: NetherwartIcon,
    },
    {
      name: "Bastion",
      link: "/tools/bastion",
      category: "Nether",
      image: BlackstoneIcon,
    },
  ];

  const filteredTools =
    selectedCategory === "All"
      ? tools
      : tools.filter((tool) => tool.category === selectedCategory);

  const displayedTools = filteredTools.filter((tool) =>
    tool.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <section className="w-full pt-[100px] pb-16 flex">
      <div className="w-full max-w-6xl px-6 md:px-8 lg:px-10">
        <h1 className="text-4xl md:text-5xl font-extrabold font-inter text-black mb-4 text-left">
          Chunk Finders
        </h1>
        <p className="text-[20px] font-inter font-medium leading-[1.5em] text-[#6b6b6b] mb-10 max-w-2xl text-left">
          Discover useful Minecraft tools to enhance your world exploration and
          gameplay.
        </p>
        <div className="relative flex items-center gap-2 bg-[#fafafa] rounded-xl border border-[#f0f0f0] px-[15px] py-[12px] w-full text-[#000] font-manrope font-semibold text-[16px] leading-[1.4em]">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5 text-neutral-500"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M21 21l-4.35-4.35M17 11a6 6 0 11-12 0 6 6 0 0112 0z"
            />
          </svg>
          <input
            type="text"
            placeholder="Search..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full bg-transparent focus:outline-none placeholder:text-neutral-500"
          />
        </div>
        <img
          src={Frog}
          alt="Frog Icon"
          className="hidden md:block absolute right-[300px] top-[300px] w-[130px] h-auto z-20"
        />
        <div className="flex flex-wrap gap-3 mt-6">
          {["All", "Popular", "Overworld", "Nether", "End"].map((category) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-4 py-2 rounded-[10px] font-manrope text-[18px] font-bold leading-[1.4em] border ${
                selectedCategory === category
                  ? "bg-black text-white"
                  : "bg-white text-black border-[#f0f0f0] hover:bg-neutral-100"
              }`}
            >
              {category}
            </button>
          ))}
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-10">
          {displayedTools.map((tool) => (
            <Link
              to={tool.link}
              key={tool.name}
              className="flex justify-between items-center bg-white rounded-[12px] border border-[#f0f0f0] shadow-[0px_0.5px_2.4px_-2px_rgba(0,0,0,0.086),0px_4px_20px_-4px_rgba(0,0,0,0.024)] p-6 hover:shadow-md transition"
            >
              <h3 className="text-[20px] font-manrope font-bold leading-[1.4em] text-black">
                {tool.name}
              </h3>
              {tool.image && (
                <img
                  src={tool.image}
                  alt={`${tool.name} icon`}
                  className="w-10 h-10 object-contain ml-4"
                />
              )}
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
