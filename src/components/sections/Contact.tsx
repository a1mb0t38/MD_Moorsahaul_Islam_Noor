"use client";

import React, { useState } from "react";
import { Mail, Phone, MapPin, Terminal, CheckCircle2, AlertCircle, Loader2 } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { submitContactForm } from "@/app/actions";

const Contact = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError("");

    const formData = new FormData(e.currentTarget);

    try {
      const result = await submitContactForm(formData);

      if (result.success) {
        setIsSuccess(true);
      } else {
        setError(result.message || "Transmission interrupted. Check your uplink.");
      }
    } catch (err) {
      setError("Signal lost. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contact" className="py-32 bg-dark bg-grid">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 max-w-6xl mx-auto">
          <div className="space-y-10">
            <div>
              <span className="text-neon uppercase tracking-[0.4em] text-sm">04. Link</span>
              <h2 className="text-7xl font-black tracking-tighter mt-4">Initiate<br />Contact</h2>
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

            <AnimatePresence mode="wait">
              {isSuccess ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="h-full flex flex-col items-center justify-center text-center space-y-6 py-20"
                >
                  <div className="w-20 h-20 bg-neon/10 rounded-full flex items-center justify-center text-neon shadow-[0_0_30px_rgba(0,255,159,0.2)]">
                    <CheckCircle2 size={40} />
                  </div>
                  <h3 className="text-3xl font-black uppercase tracking-tighter">Transmission_Successful</h3>
                  <p className="text-zinc-500 max-w-xs mx-auto">
                    Your message has been encrypted and sent to the secure node. Expect a response shortly.
                  </p>
                  <button
                    onClick={() => setIsSuccess(false)}
                    className="text-neon text-xs font-bold uppercase tracking-[0.3em] hover:underline"
                  >
                    Send New Signal
                  </button>
                </motion.div>
              ) : (
                <motion.form
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  onSubmit={handleSubmit}
                  className="space-y-8 relative z-10"
                >
                  <div className="space-y-2 group">
                    <label className="text-[10px] uppercase tracking-widest text-zinc-500 group-focus-within:text-neon">Identifier</label>
                    <input
                      name="name"
                      type="text"
                      required
                      className="w-full bg-white/5 border border-white/10 p-4 outline-none focus:border-neon focus:ring-1 focus:ring-neon/50 transition-all font-mono text-sm"
                      placeholder="NAME_OR_ORG"
                    />
                  </div>
                  <div className="space-y-2 group">
                    <label className="text-[10px] uppercase tracking-widest text-zinc-500 group-focus-within:text-neon">Signal_Address</label>
                    <input
                      name="email"
                      type="email"
                      required
                      className="w-full bg-white/5 border border-white/10 p-4 outline-none focus:border-neon focus:ring-1 focus:ring-neon/50 transition-all font-mono text-sm"
                      placeholder="USER@HOST.COM"
                    />
                  </div>
                  <div className="space-y-2 group">
                    <label className="text-[10px] uppercase tracking-widest text-zinc-500 group-focus-within:text-neon">Payload</label>
                    <textarea
                      name="message"
                      rows={5}
                      required
                      className="w-full bg-white/5 border border-white/10 p-4 outline-none focus:border-neon focus:ring-1 focus:ring-neon/50 transition-all font-mono text-sm"
                      placeholder="TRANSMIT_MESSAGE..."
                    />
                  </div>

                  {error && (
                    <div className="flex items-center gap-2 text-red-500 text-xs font-mono">
                      <AlertCircle size={14} />
                      <span>{error}</span>
                    </div>
                  )}

                  <button
                    disabled={isSubmitting}
                    className="w-full bg-neon text-dark font-black uppercase tracking-[0.3em] py-5 hover:scale-[1.02] active:scale-[0.98] transition-all glow-box flex items-center justify-center gap-3 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isSubmitting ? (
                      <>
                        <Loader2 className="animate-spin" size={20} />
                        Processing...
                      </>
                    ) : (
                      "Send Transmission"
                    )}
                  </button>
                </motion.form>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
