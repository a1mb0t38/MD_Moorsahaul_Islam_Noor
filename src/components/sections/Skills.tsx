"use client";

import React, { useState, useRef, useLayoutEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import gsap from "gsap";
import { 
  Shield, 
  Search, 
  Activity, 
  Server, 
  Lock, 
  Terminal, 
  Code2, 
  Zap, 
  Binary, 
  Layers, 
  Globe, 
  Cpu 
} from "lucide-react";

const Skills = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);

  const categories = [
    {
      title: "Cybersecurity",
      icon: Shield,
      skills: [
        { name: "Web Penetration Testing", level: 75, desc: "Testing web apps for OWASP Top 10 vulnerabilities.", icon: Search },
        { name: "Vulnerability Analysis", level: 70, desc: "Identifying and assessing security risks in systems.", icon: Activity },
        { name: "Network Security Basics", level: 65, desc: "Understanding protocols, firewalls, and traffic analysis.", icon: Server },
        { name: "SIEM & Security Concepts", level: 60, desc: "Log monitoring and security event management.", icon: Lock },
        { name: "CTF Problem Solving", level: 80, desc: "Hands-on practice on TryHackMe, HTB, and PicoCTF.", icon: Terminal },
      ]
    },
    {
      title: "Programming & Scripting",
      icon: Code2,
      skills: [
        { name: "Python", level: 85, desc: "Automation scripts and security tooling development.", icon: Zap },
        { name: "JavaScript", level: 90, desc: "Core concepts, ES6+, and asynchronous programming.", icon: Binary },
        { name: "Bash / Linux", level: 80, desc: "Proficient in Kali Linux and command-line automation.", icon: Terminal },
      ]
    },
    {
      title: "Frontend Development",
      icon: Layers,
      skills: [
        { name: "HTML & CSS", level: 95, desc: "Semantic structure and modern CSS techniques.", icon: Globe },
        { name: "Tailwind CSS & DaisyUI", level: 90, desc: "Rapid UI development with utility-first frameworks.", icon: Zap },
        { name: "React / Next.js", level: 85, desc: "Building scalable, high-performance web applications.", icon: Code2 },
        { name: "Responsive Design", level: 95, desc: "Ensuring seamless experiences across all devices.", icon: Cpu },
      ]
    }
  ];

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      if (titleRef.current) {
        const text = titleRef.current.innerText;
        titleRef.current.innerHTML = text.split("").map(char => `<span class="inline-block translate-y-full opacity-0">${char === " " ? "&nbsp;" : char}</span>`).join("");
        
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

      gsap.from(".skill-category", {
        y: 60,
        opacity: 0,
        stagger: 0.2,
        duration: 1,
        ease: "power4.out",
        scrollTrigger: {
          trigger: ".skills-grid",
          start: "top 80%",
        }
      });

      gsap.from(".skill-progress-fill", {
        width: 0,
        duration: 1.5,
        ease: "power4.inOut",
        stagger: 0.1,
        scrollTrigger: {
          trigger: ".skills-grid",
          start: "top 70%",
        }
      });

      gsap.to(".skills-bg", {
        yPercent: 20,
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
    <section id="skills" ref={containerRef} className="py-32 relative overflow-hidden bg-[#050505]">
      <div className="skills-bg absolute inset-0 bg-grid-small opacity-10 pointer-events-none" />
      <div className="absolute top-0 left-0 w-full h-32 bg-gradient-to-b from-dark to-transparent z-10" />
      
      <div className="container mx-auto px-6 relative z-20">
        <div className="text-center mb-24">
          <motion.span 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            className="text-neon uppercase tracking-[0.6em] text-sm font-bold"
          >
            02. Arsenal
          </motion.span>
          <h2 ref={titleRef} className="text-6xl md:text-8xl font-black tracking-tighter mt-4 glow-text-small">
            Technical_Stack
          </h2>
        </div>

        <div className="skills-grid grid grid-cols-1 xl:grid-cols-3 gap-12">
          {categories.map((cat, idx) => (
            <div key={idx} className="skill-category space-y-8">
              <div className="flex items-center gap-4 mb-10">
                <div className="w-12 h-12 bg-neon/10 border border-neon/30 flex items-center justify-center text-neon shadow-[0_0_15px_rgba(0,255,159,0.2)]">
                  <cat.icon size={24} />
                </div>
                <h3 className="text-2xl font-black uppercase tracking-widest text-white/90">{cat.title}</h3>
              </div>

              <div className="space-y-6">
                {cat.skills.map((skill, sIdx) => (
                  <SkillItem key={sIdx} skill={skill} />
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

const SkillItem = ({ skill }: { skill: any }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div 
      className="relative group"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      whileHover={{ scale: 1.02, x: 10 }}
      transition={{ type: "spring", stiffness: 400, damping: 25 }}
    >
      <div className="flex justify-between items-end mb-2">
        <div className="flex items-center gap-3">
          <skill.icon size={16} className="text-neon/70 group-hover:text-neon group-hover:rotate-12 transition-all duration-300" />
          <span className="text-sm font-bold uppercase tracking-wider text-zinc-400 group-hover:text-white transition-colors">
            {skill.name}
          </span>
        </div>
      </div>

      <div className="h-[6px] w-full bg-white/5 relative overflow-hidden border border-white/5">
        <div 
          className="skill-progress-fill h-full bg-gradient-to-r from-neon/40 to-neon shadow-[0_0_10px_rgba(0,255,159,0.5)]" 
          style={{ width: `${skill.level}%` }} 
        />
        <div className="absolute inset-0 bg-[linear-gradient(90deg,transparent_0%,rgba(255,255,255,0.1)_50%,transparent_100%)] translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000" />
      </div>

      <AnimatePresence>
        {isHovered && (
          <motion.div 
            initial={{ opacity: 0, y: 10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.95 }}
            className="absolute left-0 -top-12 z-30 px-4 py-2 bg-neon text-dark text-[10px] font-black uppercase tracking-widest whitespace-nowrap pointer-events-none"
          >
            {skill.desc}
            <div className="absolute -bottom-1 left-4 w-2 h-2 bg-neon rotate-45" />
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default Skills;
