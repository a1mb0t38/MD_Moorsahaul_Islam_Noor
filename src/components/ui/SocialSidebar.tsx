"use client";

import React from "react";
import { motion } from "framer-motion";
import { TwitterIcon, FacebookIcon, LinkedinIcon, GithubIcon, InstagramIcon, MediumIcon } from "./SocialIcons";

const socialLinks = [
  { icon: TwitterIcon, href: "#", label: "Twitter" },
  { icon: FacebookIcon, href: "#", label: "Facebook" },
  { icon: LinkedinIcon, href: "https://www.linkedin.com/in/moorsahaul-islam-noor", label: "LinkedIn" },
  { icon: GithubIcon, href: "https://github.com/a1mb0t38", label: "GitHub" },
  { icon: MediumIcon, href: "https://medium.com/@mursahaulnur17", label: "Medium" },
  { icon: InstagramIcon, href: "#", label: "Instagram" },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2, // Faster entrance
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, x: 20 },
  visible: { opacity: 1, x: 0 },
};

const SocialSidebar = () => {
  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="fixed right-8 md:right-16 bottom-24 z-50 flex flex-col items-center gap-6"
    >
      <div className="flex flex-col gap-6">
        {socialLinks.map((social, index) => (
          <motion.a
            key={index}
            href={social.href}
            target="_blank"
            rel="noopener noreferrer"
            variants={itemVariants}
            whileHover={{ y: -5, color: "#ffffff", scale: 1.2 }}
            className="text-neon/80 hover:text-white transition-colors duration-300 drop-shadow-[0_0_10px_rgba(0,255,159,0.5)]"
            aria-label={social.label}
          >
            <social.icon width={24} height={24} strokeWidth={2} />
          </motion.a>
        ))}
      </div>
      <motion.div
        variants={itemVariants}
        className="w-px h-32 bg-gradient-to-t from-neon via-neon/50 to-transparent mt-2 shadow-[0_0_15px_rgba(0,255,159,0.6)]"
      />
    </motion.div>
  );
};

export default SocialSidebar;
