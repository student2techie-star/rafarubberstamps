import React, { useState, useEffect } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";

import Header from "./components/Header";
import Footer from "./components/Footer";
import WhatsAppButton from "./components/WhatsAppButton";
import MobileBottomBar from "./components/MobileBottomBar";
import StampIntro from "./components/StampIntro";

import Home from "./pages/Home";
import About from "./pages/About";
import Services from "./pages/Services";
import Order from "./pages/Order";
import Contact from "./pages/Contact";
import Gallery from "./pages/Gallery";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import Terms from "./pages/Terms";
import NotFound from "./pages/NotFound";

// Scroll to top automatically on route change
function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: "instant" });
  }, [pathname]);

  return null;
}

export default function App() {
  const [introCompleted, setIntroCompleted] = useState(false);

  return (
    <HelmetProvider>
      <ScrollToTop />
      
      {/* Intro Stamp Animation on initial visit */}
      {!introCompleted && (
        <StampIntro onComplete={() => setIntroCompleted(true)} />
      )}

      <div className="app-layout">
        <Header />
        
        <main className="main-content">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/services" element={<Services />} />
            <Route path="/order" element={<Order />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/gallery" element={<Gallery />} />
            <Route path="/privacy-policy" element={<PrivacyPolicy />} />
            <Route path="/terms" element={<Terms />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </main>

        <Footer />
        <WhatsAppButton />
        <MobileBottomBar />
      </div>
    </HelmetProvider>
  );
}
