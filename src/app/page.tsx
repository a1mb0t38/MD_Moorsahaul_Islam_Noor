"use client";

import React, { useEffect } from "react";
import Lenis from "lenis";

// Import components
import Navbar from "@/components/layout/Navbar";
import Hero from "@/components/sections/Hero";
import About from "@/components/sections/About";
import Skills from "@/components/sections/Skills";
import Resume from "@/components/sections/Resume";
import Contact from "@/components/sections/Contact";
import CursorFollower from "@/components/ui/CursorFollower";

// --- Smooth Scroll Hook ---
const useLenis = () => {
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
      wheelMultiplier: 1,
      touchMultiplier: 2,
      infinite: false,
    });

    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    return () => {
      lenis.destroy();
    };
  }, []);
};

// --- Main Page ---
export default function Home() {
  useLenis();

  return (
    <main className="relative selection:bg-neon selection:text-dark">
      <div className="noise-overlay" />
      <CursorFollower />
      <Navbar />
      <Hero />
      <About />
      <Skills />
      <Resume />
      <Contact />
      
      <footer className="py-12 border-t border-white/5 text-center">
        <p className="text-zinc-600 text-[10px] uppercase tracking-[0.5em]">
          © 2026 MD. Moorsahaul Islam Noor // Secured by Neural Encryption
        </p>
      </footer>
    </main>
  );
}
