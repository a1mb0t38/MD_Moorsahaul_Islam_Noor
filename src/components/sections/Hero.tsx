"use client";

import React, { useState, useEffect, useRef, useLayoutEffect } from "react";
import { motion } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

const Hero = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const [text, setText] = useState("");
  const fullText = "Fullstack Developer | Security Researcher";

  useEffect(() => {
    let index = 0;
    const interval = setInterval(() => {
      setText(fullText.slice(0, index));
      index++;
      if (index > fullText.length) clearInterval(interval);
    }, 50);
    return () => clearInterval(interval);
  }, []);

  useLayoutEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      if (titleRef.current) {
        const chars = titleRef.current.innerText.split("");
        titleRef.current.innerHTML = chars.map(c => `<span class="inline-block translate-y-full opacity-0">${c === " " ? "&nbsp;" : c}</span>`).join("");

        gsap.to(titleRef.current.querySelectorAll("span"), {
          y: 0,
          opacity: 1,
          stagger: 0.03,
          duration: 1,
          ease: "power4.out",
          delay: 0.5
        });
      }

      gsap.to(".hero-bg", {
        yPercent: 30,
        ease: "none",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top top",
          end: "bottom top",
          scrub: true
        }
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section id="home" ref={containerRef} className="relative h-screen flex items-center justify-center overflow-hidden bg-grid">
      <div className="hero-bg absolute inset-0 bg-dots opacity-20" />
      <div className="absolute top-1/4 -left-20 w-96 h-96 bg-neon/10 rounded-full blur-[120px] animate-pulse" />
      <div className="absolute bottom-1/4 -right-20 w-96 h-96 bg-neon/10 rounded-full blur-[120px] animate-pulse" style={{ animationDelay: "2s" }} />

      <div className="container mx-auto px-6 relative z-10 text-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          className="mb-6 inline-block py-2 px-4 border border-neon/30 bg-neon/5 text-neon text-xs tracking-[0.3em] uppercase rounded-full glow-border"
        >
          Available for new projects
        </motion.div>

        <h1 ref={titleRef} className="text-4xl md:text-7xl lg:text-8xl font-black mb-8 tracking-tighter leading-none glow-text uppercase">
          MD. Moorsahaul Islam
        </h1>

        <div className="h-8 md:h-12 overflow-hidden flex justify-center items-center">
          <p className="text-xl md:text-3xl text-zinc-400 font-mono">
            {text}<span className="animate-pulse text-neon">_</span>
          </p>
        </div>


        <div className="mt-12 flex flex-wrap justify-center gap-6">
          <button className="group relative px-10 py-4 bg-neon text-dark font-black uppercase tracking-widest overflow-hidden transition-all duration-300 hover:scale-105 active:scale-95">
            <span className="relative z-10">Download CV</span>
            <div className="absolute inset-0 bg-white translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
          </button>
          <button className="px-10 py-4 border border-neon text-neon font-black uppercase tracking-widest hover:bg-neon/10 transition-all duration-300">
            View Work
          </button>
        </div>
      </div>

      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-4">
        <span className="text-[10px] uppercase tracking-[0.5em] text-zinc-500">Scroll Down</span>
        <div className="w-px h-16 bg-gradient-to-b from-neon to-transparent" />
      </div>
    </section>
  );
};

export default Hero;
