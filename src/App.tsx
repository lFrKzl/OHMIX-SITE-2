/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Hero from "./components/Hero";
import Services from "./components/Services";
import About from "./components/About";
import Footer from "./components/Footer";
import Portfolio from "./components/Portfolio";

function Home() {
  return (
    <main>
      <Hero />
      <Services />
      <About />
    </main>
  );
}

export default function App() {
  return (
    <Router>
      <div className="min-h-screen font-sans bg-white relative">
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/portfolio" element={<Portfolio />} />
        </Routes>
        <Footer />
      </div>
    </Router>
  );
}
