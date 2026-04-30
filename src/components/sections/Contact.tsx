"use client";

import React from "react";
import { Mail, Phone, MapPin, Terminal } from "lucide-react";

const Contact = () => {
  return (
    <section id="contact" className="py-32 bg-dark bg-grid">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 max-w-6xl mx-auto">
          <div className="space-y-10">
            <div>
              <span className="text-neon uppercase tracking-[0.4em] text-sm">04. Link</span>
              <h2 className="text-7xl font-black tracking-tighter mt-4">Initiate<br/>Contact</h2>
            </div>
            
            <p className="text-zinc-400 text-xl max-w-md">
              Ready to build the next evolution of the web? Drop a secure transmission below.
            </p>

            <div className="space-y-6">
              {[
                { icon: Mail, label: "Secure Email", val: "mursahaulnur17@gmail.com" },
                { icon: Phone, label: "Signal / WhatsApp", val: "+8801913540968" },
                { icon: MapPin, label: "Node Location", val: "Dhaka, Bangladesh" },
              ].map((item, i) => (
                <div key={i} className="flex items-center gap-6 group cursor-pointer">
                  <div className="w-12 h-12 glass-neon flex items-center justify-center text-neon group-hover:bg-neon group-hover:text-dark transition-all">
                    <item.icon size={20} />
                  </div>
                  <div>
                    <span className="text-[10px] uppercase tracking-widest text-zinc-500">{item.label}</span>
                    <p className="font-bold">{item.val}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="glass-neon p-10 relative overflow-hidden">
            <div className="absolute top-0 right-0 p-4 opacity-10">
              <Terminal size={120} />
            </div>
            <form className="space-y-8 relative z-10">
              <div className="space-y-2 group">
                <label className="text-[10px] uppercase tracking-widest text-zinc-500 group-focus-within:text-neon">Identifier</label>
                <input 
                  type="text" 
                  className="w-full bg-white/5 border border-white/10 p-4 outline-none focus:border-neon focus:ring-1 focus:ring-neon/50 transition-all font-mono text-sm"
                  placeholder="NAME_OR_ORG"
                />
              </div>
              <div className="space-y-2 group">
                <label className="text-[10px] uppercase tracking-widest text-zinc-500 group-focus-within:text-neon">Signal_Address</label>
                <input 
                  type="email" 
                  className="w-full bg-white/5 border border-white/10 p-4 outline-none focus:border-neon focus:ring-1 focus:ring-neon/50 transition-all font-mono text-sm"
                  placeholder="USER@HOST.COM"
                />
              </div>
              <div className="space-y-2 group">
                <label className="text-[10px] uppercase tracking-widest text-zinc-500 group-focus-within:text-neon">Payload</label>
                <textarea 
                  rows={5}
                  className="w-full bg-white/5 border border-white/10 p-4 outline-none focus:border-neon focus:ring-1 focus:ring-neon/50 transition-all font-mono text-sm"
                  placeholder="TRANSMIT_MESSAGE..."
                />
              </div>
              <button className="w-full bg-neon text-dark font-black uppercase tracking-[0.3em] py-5 hover:scale-[1.02] active:scale-[0.98] transition-all glow-box">
                Send Transmission
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
