"use client";

import React, { useRef, useLayoutEffect } from "react";
import Image from "next/image";
import profilePic from "../../../public/profile.jpg";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

const About = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const imgRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const ctx = gsap.context(() => {
      gsap.from(".about-text p", {
        y: 30,
        opacity: 0,
        stagger: 0.2,
        duration: 1,
        scrollTrigger: {
          trigger: ".about-text",
          start: "top 80%",
        }
      });

      gsap.to(imgRef.current, {
        clipPath: "inset(0% 0% 0% 0%)",
        duration: 1.5,
        ease: "power4.inOut",
        scrollTrigger: {
          trigger: imgRef.current,
          start: "top 70%",
        }
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section id="about" ref={containerRef} className="py-32 relative overflow-hidden">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
          <div 
            ref={imgRef} 
            className="relative aspect-square max-w-lg mx-auto lg:mx-0 overflow-hidden" 
            style={{ clipPath: "inset(100% 0% 0% 0%)" }}
          >
            <Image 
              src={profilePic} 
              alt="MD. Moorsahaul Islam Noor" 
              fill
              priority
              className="object-cover grayscale hover:grayscale-0 transition-all duration-1000"
            />
            <div className="absolute inset-0 border-[20px] border-dark/50 pointer-events-none" />
            <div className="absolute inset-0 border border-neon/20 pointer-events-none" />
          </div>

          <div className="about-text space-y-8">
            <div className="space-y-4">
              <span className="text-neon uppercase tracking-[0.4em] text-sm">01. Discovery</span>
              <h2 className="text-5xl font-black tracking-tighter">Who am I?</h2>
            </div>
            
            <p className="text-zinc-400 text-xl leading-relaxed">
              I’m a <span className="text-neon font-bold">Cybersecurity Learner</span> and <span className="text-white font-bold">Frontend Developer</span> focused on penetration testing and web security. I have a background in Software Engineering (Cybersecurity) and hands-on experience solving CTF challenges on platforms like <span className="text-neon">TryHackMe</span> and <span className="text-neon">Hack The Box</span>.
            </p>
            
            <p className="text-zinc-400 text-lg leading-relaxed">
              I build responsive web applications using modern technologies while continuously improving my skills in vulnerability analysis, scripting, and real-world security practices. Currently working toward becoming a skilled penetration tester.
            </p>

            <div className="grid grid-cols-2 gap-8 pt-8">
              {[
                { label: "Location", val: "Global / Remote" },
                { label: "Experience", val: "Web & Security" },
                { label: "Freelance", val: "Available" },
                { label: "Interests", val: "Pentesting & CTFs" },
              ].map((item, i) => (
                <div key={i} className="space-y-1">
                  <span className="text-zinc-600 text-[10px] uppercase tracking-widest">{item.label}</span>
                  <p className="font-bold text-neon">{item.val}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
