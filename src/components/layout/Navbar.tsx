"use client";

import React, { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";
import { TwitterIcon, FacebookIcon, LinkedinIcon, GithubIcon, InstagramIcon } from "../ui/SocialIcons";
import { motion, AnimatePresence } from "framer-motion";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const links = [
    { name: "Home", href: "#home" },
    { name: "About", href: "#about" },
    { name: "Skills", href: "#skills" },
    { name: "Resume", href: "#resume" },
    { name: "Contact", href: "#contact" },
  ];

  const socials = [
    { icon: TwitterIcon, href: "#" },
    { icon: FacebookIcon, href: "#" },
    { icon: LinkedinIcon, href: "#" },
    { icon: GithubIcon, href: "#" },
    { icon: InstagramIcon, href: "#" },
  ];

  return (
    <motion.nav 
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className={cn(
        "fixed top-0 left-0 w-full z-50 transition-all duration-500 py-6",
        scrolled ? "bg-[#050505]/80 backdrop-blur-xl border-b border-white/5 py-4" : "bg-transparent"
      )}
    >
      <div className="container mx-auto px-6 flex justify-between items-center">
        <div className="flex items-center gap-2 group cursor-pointer">
          <div className="w-10 h-10 border border-neon flex items-center justify-center rotate-45 group-hover:rotate-0 transition-transform duration-500">
            <span className="text-neon -rotate-45 group-hover:rotate-0 transition-transform duration-500 font-bold">N</span>
          </div>
          <span className="text-xl font-bold tracking-tighter ml-2 group-hover:text-neon transition-colors">NOOR</span>
        </div>

        <div className="hidden md:flex items-center gap-8">
          {links.map((link) => (
            <a 
              key={link.name} 
              href={link.href} 
              className="text-sm uppercase tracking-[0.2em] hover:text-neon transition-colors relative group"
            >
              {link.name}
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-neon transition-all duration-300 group-hover:w-full" />
            </a>
          ))}
          <button className="bg-neon/10 border border-neon/50 text-neon px-6 py-2 rounded-sm text-sm font-bold uppercase tracking-widest hover:bg-neon hover:text-dark transition-all">
            Hire Me
          </button>
        </div>

        <button className="md:hidden text-neon" onClick={() => setIsOpen(!isOpen)}>
          <Menu size={28} />
        </button>
      </div>

      <AnimatePresence>
        {isOpen && (
          <motion.div 
            initial={{ opacity: 0, x: "100%" }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: "100%" }}
            className="fixed inset-0 bg-dark z-[60] flex flex-col items-center justify-center gap-8"
          >
            <button className="absolute top-8 right-8 text-neon" onClick={() => setIsOpen(false)}>
              <X size={32} />
            </button>
            <div className="flex flex-col items-center gap-6">
              {links.map((link) => (
                <a 
                  key={link.name} 
                  href={link.href} 
                  onClick={() => setIsOpen(false)}
                  className="text-3xl font-bold tracking-tighter hover:text-neon transition-colors"
                >
                  {link.name}
                </a>
              ))}
            </div>
            
            <div className="mt-12 flex gap-6">
              {socials.map((social, idx) => (
                <a key={idx} href={social.href} className="text-zinc-500 hover:text-neon transition-colors">
                  <social.icon width={24} height={24} />
                </a>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
};

export default Navbar;
