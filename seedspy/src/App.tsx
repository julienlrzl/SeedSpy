import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import WorldAnalyzer from "./pages/WorldAnalyzer";
import Tools from "./pages/Tools";
import About from "./pages/About";
import Home from "./pages/Home";

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
        </Routes>
      </main>
    </Router>
  );
}
