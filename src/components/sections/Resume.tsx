"use client";

import React, { useRef, useLayoutEffect } from "react";
import gsap from "gsap";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

const Resume = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const items = [
    { type: "exp", title: "Frontend Developer", company: "Freelance / Open Source", year: "2023 - PRES", side: "left" },
    { type: "exp", title: "Cybersecurity Analyst (Intern)", company: "Security Research", year: "2022 - 2023", side: "right" },
    { type: "edu", title: "Software Engineering (Cybersecurity)", company: "University Graduate", year: "2019 - 2022", side: "left" },
  ];

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".timeline-item", {
        x: (i, target) => target.dataset.side === "left" ? -100 : 100,
        opacity: 0,
        stagger: 0.2,
        duration: 1,
        scrollTrigger: {
          trigger: ".timeline-container",
          start: "top 80%",
        }
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section id="resume" ref={containerRef} className="py-32 overflow-hidden">
      <div className="container mx-auto px-6">
        <div className="text-center mb-20">
          <span className="text-neon uppercase tracking-[0.4em] text-sm">03. Archive</span>
          <h2 className="text-6xl font-black tracking-tighter mt-4">Experience</h2>
        </div>

        <div className="timeline-container relative max-w-4xl mx-auto before:absolute before:left-1/2 before:top-0 before:h-full before:w-px before:bg-white/10">
          {items.map((item, i) => (
            <div 
              key={i} 
              data-side={item.side} 
              className={cn(
                "timeline-item relative w-full md:w-1/2 mb-12",
                item.side === "right" ? "md:ml-auto md:pl-12" : "md:pr-12 text-right"
              )}
            >
              <div className="glass p-8 hover:border-neon/30 transition-colors group">
                <span className="text-neon font-mono text-sm mb-2 block">{item.year}</span>
                <h3 className="text-2xl font-bold group-hover:text-neon transition-colors">{item.title}</h3>
                <p className="text-zinc-500 uppercase tracking-widest text-xs mt-1">{item.company}</p>
              </div>
              <div className={cn(
                "absolute top-1/2 -translate-y-1/2 w-4 h-4 bg-neon rounded-full glow-box z-10",
                item.side === "right" ? "left-[-8px] md:left-[-8px]" : "right-[-8px] md:right-[-8px]"
              )} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Resume;
