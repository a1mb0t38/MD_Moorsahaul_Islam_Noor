"use client";

import React, { useEffect, useRef, useState } from "react";
import gsap from "gsap";

const CursorFollower = () => {
  const cursorRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const [isHovering, setIsHovering] = useState(false);

  useEffect(() => {
    // gsap.quickTo is the most performant way to update values frequently
    const xToCursor = gsap.quickTo(cursorRef.current, "x", { duration: 0.1, ease: "power2.out" });
    const yToCursor = gsap.quickTo(cursorRef.current, "y", { duration: 0.1, ease: "power2.out" });
    const xToRing = gsap.quickTo(ringRef.current, "x", { duration: 0.3, ease: "power2.out" });
    const yToRing = gsap.quickTo(ringRef.current, "y", { duration: 0.3, ease: "power2.out" });

    let lastCheck = 0;

    const moveCursor = (e: MouseEvent) => {
      const { clientX, clientY } = e;
      
      xToCursor(clientX);
      yToCursor(clientY);
      xToRing(clientX - 20);
      yToRing(clientY - 20);

      // Throttle hover check
      const now = Date.now();
      if (now - lastCheck > 100) {
        const target = e.target as HTMLElement;
        const isInteractive = target.closest("a, button, .group, .clickable");
        setIsHovering(!!isInteractive);
        lastCheck = now;
      }
    };

    window.addEventListener("mousemove", moveCursor);
    return () => window.removeEventListener("mousemove", moveCursor);
  }, []);

  return (
    <div className={isHovering ? "cursor-hover" : ""}>
      <div ref={cursorRef} className="cursor-follower" />
      <div ref={ringRef} className="cursor-ring" />
    </div>
  );
};

export default CursorFollower;
