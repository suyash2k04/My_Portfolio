"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";

export default function CustomCursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const [label, setLabel] = useState("");

  useEffect(() => {
    document.body.style.cursor = "none";

    let mouseX = 0;
    let mouseY = 0;
    let ringX = 0;
    let ringY = 0;

    const move = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
    };

    window.addEventListener("mousemove", move);

    const animate = () => {
      if (dotRef.current && ringRef.current) {
        dotRef.current.style.transform = `translate3d(${mouseX - 4}px, ${
          mouseY - 4
        }px, 0)`;

        ringX += (mouseX - ringX) * 0.15;
        ringY += (mouseY - ringY) * 0.15;

        ringRef.current.style.transform = `translate3d(${ringX - 28}px, ${
          ringY - 28
        }px, 0)`;
      }

      requestAnimationFrame(animate);
    };

    animate();

    const interactive = document.querySelectorAll("[data-cursor]");

    const enter = (e: Event) => {
      const target = e.currentTarget as HTMLElement;
      setLabel(target.getAttribute("data-cursor") || "");
    };

    const leave = () => setLabel("");

    interactive.forEach((el) => {
      el.addEventListener("mouseenter", enter);
      el.addEventListener("mouseleave", leave);
    });

    return () => {
      window.removeEventListener("mousemove", move);
      document.body.style.cursor = "auto";

      interactive.forEach((el) => {
        el.removeEventListener("mouseenter", enter);
        el.removeEventListener("mouseleave", leave);
      });
    };
  }, []);

  return (
    <>
      <div
        ref={dotRef}
        className="fixed top-0 left-0 w-2 h-2 bg-white rounded-full pointer-events-none z-9999"
      />

      <motion.div
        ref={ringRef}
        animate={{ scale: label ? 1.6 : 1 }}
        transition={{ type: "spring", stiffness: 300, damping: 20 }}
        className="fixed top-0 left-0 w-14 h-14 border border-white/40 rounded-full
        pointer-events-none z-9998 flex items-center justify-center text-[10px] tracking-widest text-white"
      >
        {label}
      </motion.div>
    </>
  );
}
