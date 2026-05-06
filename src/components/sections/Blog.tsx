"use client";

import React, { useRef, useLayoutEffect } from "react";
import { motion } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ExternalLink, BookOpen, Clock, Calendar } from "lucide-react";

const Blog = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);

  const posts = [
    {
      title: "My First Transmission: Journey into Cybersecurity",
      excerpt: "Sharing my experiences and insights as I navigate the complex landscape of software engineering and ethical hacking.",
      date: "May 2026",
      readTime: "5 min read",
      link: "https://medium.com/@mursahaulnur17",
      category: "Cybersecurity",
      image: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&q=80&w=800"
    }
  ];

  useLayoutEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

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

      gsap.from(".blog-card", {
        y: 60,
        opacity: 0,
        stagger: 0.2,
        duration: 1,
        ease: "power4.out",
        scrollTrigger: {
          trigger: ".blog-grid",
          start: "top 80%",
        }
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section id="blog" ref={containerRef} className="py-32 relative overflow-hidden bg-dark">
      <div className="absolute inset-0 bg-dots opacity-5 pointer-events-none" />
      
      <div className="container mx-auto px-6 relative z-10">
        <div className="text-center mb-24">
          <span className="text-neon uppercase tracking-[0.6em] text-sm font-bold">04. Intelligence</span>
          <h2 ref={titleRef} className="text-6xl md:text-8xl font-black tracking-tighter mt-4 glitch-hover">
            Recent_Writes
          </h2>
        </div>

        <div className="blog-grid grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {posts.map((post, idx) => (
            <motion.div
              key={idx}
              whileHover={{ y: -10 }}
              className="blog-card group relative bg-white/5 border border-white/10 overflow-hidden"
            >
              {/* Card Header Image */}
              <div className="relative h-48 overflow-hidden">
                <img 
                  src={post.image} 
                  alt={post.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 grayscale group-hover:grayscale-0"
                />
                <div className="absolute inset-0 bg-dark/60 group-hover:bg-dark/20 transition-colors" />
                <div className="absolute top-4 left-4 bg-neon text-dark text-[10px] font-black px-3 py-1 uppercase tracking-widest">
                  {post.category}
                </div>
              </div>

              {/* Card Body */}
              <div className="p-8">
                <div className="flex items-center gap-4 text-zinc-500 text-[10px] font-bold uppercase tracking-widest mb-4">
                  <span className="flex items-center gap-1"><Calendar size={12} /> {post.date}</span>
                  <span className="flex items-center gap-1"><Clock size={12} /> {post.readTime}</span>
                </div>
                
                <h3 className="text-2xl font-black mb-4 group-hover:text-neon transition-colors leading-tight uppercase tracking-tighter">
                  {post.title}
                </h3>
                
                <p className="text-zinc-400 text-sm mb-8 leading-relaxed line-clamp-3">
                  {post.excerpt}
                </p>

                <a 
                  href={post.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-neon text-xs font-black uppercase tracking-[0.2em] group/link"
                >
                  Read Intelligence 
                  <ExternalLink size={14} className="group-hover/link:translate-x-1 group-hover/link:-translate-y-1 transition-transform" />
                </a>
              </div>

              {/* Bottom Border Glow */}
              <div className="absolute bottom-0 left-0 w-full h-1 bg-neon scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left" />
            </motion.div>
          ))}

          {/* Placeholder for future posts */}
          <div className="blog-card border border-dashed border-white/10 flex flex-col items-center justify-center p-12 text-center opacity-50 grayscale hover:grayscale-0 hover:opacity-100 transition-all cursor-default">
            <div className="w-16 h-16 rounded-full border border-dashed border-white/20 flex items-center justify-center mb-6">
              <BookOpen size={32} className="text-zinc-600" />
            </div>
            <h3 className="text-xl font-bold uppercase tracking-tighter text-zinc-600">Pending_Transmission...</h3>
            <p className="text-zinc-700 text-xs mt-2 uppercase tracking-widest font-bold">New updates arriving soon</p>
          </div>
        </div>
        <div className="mt-20 text-center">
          <a 
            href="https://medium.com/@mursahaulnur17"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-3 px-10 py-4 bg-neon/10 border border-neon/30 text-neon font-black uppercase tracking-[0.4em] hover:bg-neon hover:text-dark transition-all duration-500 glow-box"
          >
            View Full Archive <ExternalLink size={18} />
          </a>
        </div>
      </div>
    </section>
  );
};

export default Blog;
