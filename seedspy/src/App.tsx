import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import WorldAnalyzer from "./pages/WorldAnalyzer";
import Tools from "./pages/Tools";
import About from "./pages/About";
import Home from "./pages/Home";
import SlimeChunk from "./pages/tools/SlimeChunk";
import Biome from "./pages/tools/Biome";
import Village from "./pages/tools/Village";
import Dungeon from "./pages/tools/Dungeon";
import Stronghold from "./pages/tools/Stronghold";
import Mansion from "./pages/tools/Mansion";
import Monument from "./pages/tools/Monument";
import PillagerOutpost from "./pages/tools/Outpost";
import Mineshaft from "./pages/tools/Mineshaft";
import RuinedPortal from "./pages/tools/RuinedPortal";
import JungleTemple from "./pages/tools/JungleTemple";
import DesertTemple from "./pages/tools/DesertTemple";
import WitchHut from "./pages/tools/WitchHut";
import BuriedTreasure from "./pages/tools/Treasure";
import Shipwreck from "./pages/tools/Shipwreck";
import Igloo from "./pages/tools/Igloo";
import OceanRuin from "./pages/tools/OceanRuin";
import Fossil from "./pages/tools/Fossil";
import Ravine from "./pages/tools/Ravine";
import AmethystGeode from "./pages/tools/Amethyst";
import AncientCity from "./pages/tools/AncientCity";
import EndCity from "./pages/tools/EndCity";
import EndGateway from "./pages/tools/EndGateway";
import NetherFortress from "./pages/tools/NetherFortress";
import Bastion from "./pages/tools/Bastion";

export default function App() {
  return (
    <Router>
      <Navbar />
      <main className="p-6">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/world-analyzer" element={<WorldAnalyzer />} />
          <Route path="/tools" element={<Tools />} />
          <Route path="/about" element={<About />} />
          <Route path="/tools/slime" element={<SlimeChunk />} />
          <Route path="/tools/biome" element={<Biome />} />
          <Route path="/tools/village" element={<Village />} />
          <Route path="/tools/dungeon" element={<Dungeon />} />
          <Route path="/tools/stronghold" element={<Stronghold />} />
          <Route path="/tools/mansion" element={<Mansion />} />
          <Route path="/tools/monument" element={<Monument />} />
          <Route path="/tools/outpost" element={<PillagerOutpost />} />
          <Route path="/tools/mineshaft" element={<Mineshaft />} />
          <Route path="/tools/ruined-portal" element={<RuinedPortal />} />
          <Route path="/tools/jungle-temple" element={<JungleTemple />} />
          <Route path="/tools/desert-temple" element={<DesertTemple />} />
          <Route path="/tools/witch-hut" element={<WitchHut />} />
          <Route path="/tools/treasure" element={<BuriedTreasure />} />
          <Route path="/tools/shipwreck" element={<Shipwreck />} />
          <Route path="/tools/igloo" element={<Igloo />} />
          <Route path="/tools/ocean-ruin" element={<OceanRuin />} />
          <Route path="/tools/fossil" element={<Fossil />} />
          <Route path="/tools/ravine" element={<Ravine />} />
          <Route path="/tools/amethyst" element={<AmethystGeode />} />
          <Route path="/tools/ancient-city" element={<AncientCity />} />
          <Route path="/tools/end-city" element={<EndCity />} />
          <Route path="/tools/end-gateway" element={<EndGateway />} />
          <Route path="/tools/nether-fortress" element={<NetherFortress />} />
          <Route path="/tools/bastion" element={<Bastion />} />
        </Routes>
      </main>
    </Router>
  );
}
