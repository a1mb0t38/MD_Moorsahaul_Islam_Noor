"use client";

import React, { useRef, useLayoutEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  GraduationCap,
  Award,
  Terminal,
  Code2,
  ShieldCheck,
  Activity,
  ChevronDown
} from "lucide-react";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

const Resume = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const timelineRef = useRef<HTMLDivElement>(null);
  const progressRef = useRef<HTMLDivElement>(null);

  const items = [
    {
      type: "education",
      title: "BSc in Software Engineering",
      organization: "Daffodil International University",
      year: "2020 - 2024",
      icon: GraduationCap,
      description: "Strong foundation in networks, security concepts, and system analysis.",
      details: [
        "Major in Cybersecurity",
        "Network Security & Cryptography protocols",
      ],
      tags: ["Degree", "Academic", "Foundation"]
    },
    {
      type: "certification",
      title: "Cybersecurity Certifications",
      organization: "Google & TCM Security",
      year: "2025",
      icon: Award,
      description: "Professional certifications focused on practical ethical hacking and security operations.",
      details: [
        "Google Cybersecurity Certificate",
        "Practical Ethical Hacking (PEH) – TCM Security",
        "Active Directory Penetration Tester"
      ],
      tags: ["Certified", "Ethical Hacking"]
    },
    {
      type: "skill",
      title: "Technical Stack & Development",
      organization: "Frontend Development",
      year: "2026 - PRES",
      icon: Code2,
      description: "Building secure, responsive Website.",
      details: [
        "Frontend: React, Next.js, Tailwind CSS, DaisyUI",
        "Programming: Python for security automation & scripting",
        "OS/CLI: Bash, Linux (Kali Linux), Command-line automation"
      ],
      tags: ["Development", "Automation", "Tooling"]
    },
    {
      type: "experience",
      title: "Hands-on Security Practice",
      organization: "CTF & Labs",
      year: "2023 - PRES",
      icon: ShieldCheck,
      description: "Solving real-world security challenges on gamified platforms.",
      details: [
        "CTF Challenger: TryHackMe (Cyber Security 101), HTB Academy, PicoCTF",
        "Vulnerable Machines: Exploiting labs and boxes",
        "Self-learning Web Penetration Testing & OWASP top 10"
      ],
      tags: ["Practical", "CTF", "Hands-on"]
    },
    {
      type: "focus",
      title: "Core Specializations",
      organization: "Focus Areas",
      year: "Current",
      icon: Activity,
      description: "Targeted focus on offensive security and secure Frontend Development.",
      details: [
        "Red Teaming: AD exploitation & Lateral movement",
        "Web Security: Deep dive into web-app vulnerabilities",
        "Python for Automation: Custom security tooling"
      ],
      tags: ["Specialization", "Red Teaming", "Web Security", "Frontend Development"]
    }
  ];

  useLayoutEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      // Split text reveal with glitch simulation
      if (titleRef.current) {
        const text = titleRef.current.innerText;
        titleRef.current.innerHTML = text.split("").map(char => `<span class="inline-block translate-y-full opacity-0" data-char="${char}">${char === " " ? "&nbsp;" : char}</span>`).join("");

        gsap.to(titleRef.current.querySelectorAll("span"), {
          y: 0,
          opacity: 1,
          stagger: 0.05,
          duration: 1,
          ease: "power4.out",
          scrollTrigger: {
            trigger: titleRef.current,
            start: "top 90%",
          }
        });
      }

      // Timeline progress line animation
      gsap.fromTo(progressRef.current,
        { scaleY: 0 },
        {
          scaleY: 1,
          ease: "none",
          scrollTrigger: {
            trigger: timelineRef.current,
            start: "top 20%",
            end: "bottom 80%",
            scrub: true
          }
        }
      );

      // Timeline items entrance
      gsap.utils.toArray(".timeline-item").forEach((item: any) => {
        const side = item.dataset.side;
        gsap.from(item, {
          x: side === "left" ? -100 : 100,
          opacity: 0,
          duration: 1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: item,
            start: "top 85%",
          }
        });
      });

      // Background parallax
      gsap.to(".resume-bg", {
        yPercent: 15,
        ease: "none",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top bottom",
          end: "bottom top",
          scrub: true
        }
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section id="resume" ref={containerRef} className="py-32 relative overflow-hidden bg-dark">
      <div className="resume-bg absolute inset-0 bg-dots opacity-10 pointer-events-none" />

      <div className="container mx-auto px-6 relative z-10">
        <div className="text-center mb-32">
          <span className="text-neon uppercase tracking-[0.6em] text-sm font-bold">03. Archive</span>
          <h2 ref={titleRef} className="text-6xl md:text-8xl font-black tracking-tighter mt-4 glitch-hover">
            Career_Journey
          </h2>
        </div>

        <div ref={timelineRef} className="relative max-w-6xl mx-auto">
          {/* Central Timeline Line */}
          <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-px bg-white/10 -translate-x-1/2" />
          <div
            ref={progressRef}
            className="absolute left-4 md:left-1/2 top-0 bottom-0 w-px bg-neon -translate-x-1/2 origin-top z-20 shadow-[0_0_15px_rgba(0,255,159,0.5)]"
          />

          <div className="space-y-24">
            {items.map((item, idx) => (
              <TimelineItem
                key={idx}
                item={item}
                side={idx % 2 === 0 ? "left" : "right"}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

const TimelineItem = ({ item, side }: { item: any, side: "left" | "right" }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <div
      className={cn(
        "timeline-item relative w-full md:w-1/2 flex",
        side === "right" ? "md:ml-auto md:pl-20 pl-12" : "md:pr-20 pl-12 md:pl-0 flex-row-reverse"
      )}
      data-side={side}
    >
      {/* Node Dot */}
      <div className={cn(
        "absolute top-8 w-4 h-4 rounded-full z-30 transition-all duration-500",
        "bg-dark border-2 border-neon shadow-[0_0_10px_rgba(0,255,159,0.5)]",
        side === "right" ? "left-2 md:left-[-8.5px]" : "left-2 md:right-[-8.5px]"
      )}>
        <div className="absolute inset-0 rounded-full bg-neon animate-ping opacity-20" />
      </div>

      <motion.div
        whileHover={{ scale: 1.02, rotateY: side === "left" ? 2 : -2 }}
        whileTap={{ scale: 0.98 }}
        className="glass-neon w-full p-8 relative group cursor-pointer border-l-4 border-l-neon/50 md:border-l-0"
        onClick={() => setIsExpanded(!isExpanded)}
      >
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-neon/10 border border-neon/30 flex items-center justify-center text-neon group-hover:bg-neon group-hover:text-dark transition-all duration-500">
              <item.icon size={24} />
            </div>
            <div>
              <span className="text-neon font-mono text-xs mb-1 block uppercase tracking-widest">{item.year}</span>
              <h3 className="text-xl md:text-2xl font-black uppercase tracking-tight group-hover:text-neon transition-colors">{item.title}</h3>
            </div>
          </div>
          <motion.div
            animate={{ rotate: isExpanded ? 180 : 0 }}
            className="text-zinc-600 group-hover:text-neon"
          >
            <ChevronDown size={20} />
          </motion.div>
        </div>

        <p className="text-zinc-400 font-medium mb-4 leading-relaxed italic">
          {item.organization} — {item.description}
        </p>

        <AnimatePresence>
          {isExpanded && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="overflow-hidden"
            >
              <div className="space-y-3 pt-4 border-t border-white/5">
                {item.details.map((detail: string, i: number) => (
                  <div key={i} className="flex items-start gap-3">
                    <div className="w-1.5 h-1.5 rounded-full bg-neon mt-2 shrink-0" />
                    <p className="text-zinc-400 text-sm leading-relaxed">{detail}</p>
                  </div>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        <div className="flex flex-wrap gap-2 mt-6">
          {item.tags.map((tag: string, i: number) => (
            <span key={i} className="px-3 py-1 bg-white/5 border border-white/10 text-[10px] font-bold uppercase tracking-widest text-zinc-500 group-hover:border-neon/30 group-hover:text-neon/70 transition-colors">
              #{tag}
            </span>
          ))}
        </div>
      </motion.div>
    </div>
  );
};

export default Resume;
