/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import Header from "./components/Header";
import Hero from "./components/Hero";
import Services from "./components/Services";
import About from "./components/About";
import Footer from "./components/Footer";
import WhatsAppButton from "./components/WhatsAppButton";

export default function App() {
  return (
    <div className="min-h-screen font-sans bg-white relative">
      <Header />
      <main>
        <Hero />
        <Services />
        <About />
      </main>
      <Footer />
      <WhatsAppButton />
    </div>
  );
}
