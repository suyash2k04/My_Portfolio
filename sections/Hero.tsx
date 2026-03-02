"use client";

import {
  motion,
  AnimatePresence,
  useScroll,
  useTransform,
  useReducedMotion,
} from "framer-motion";
import { useRef, useState, useEffect } from "react";
import { Download } from "lucide-react";

const WORDS = [
  "Frontend Engineer",
  "Full-Stack Developer",
  "Data Analyst",
  "Growth-Focused Strategist",
  "UX-Driven Architect",
  "Tech Innovator",
];

export default function Hero() {
  const ref = useRef<HTMLDivElement>(null);
  const reduceMotion = useReducedMotion();
  const [index, setIndex] = useState(0);
  const [mouse, setMouse] = useState({ x: 50, y: 50 });

  /* ---------------- Rotating Text ---------------- */
  useEffect(() => {
    const interval = setInterval(
      () => setIndex((v) => (v + 1) % WORDS.length),
      3200,
    );
    return () => clearInterval(interval);
  }, []);

  /* ---------------- Scroll Effects ---------------- */
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  const scale = useTransform(scrollYProgress, [0, 1], [1, 0.92]);
  const opacity = useTransform(scrollYProgress, [0, 0.75], [1, 0]);
  const yContent = useTransform(scrollYProgress, [0, 1], [0, -180]);

  /* ---------------- Mouse Glow ---------------- */
  const handleMouseMove = (e: React.MouseEvent) => {
    const { innerWidth, innerHeight } = window;
    setMouse({
      x: (e.clientX / innerWidth) * 100,
      y: (e.clientY / innerHeight) * 100,
    });
  };

  return (
    <motion.section
      ref={ref}
      style={{ scale, opacity }}
      onMouseMove={handleMouseMove}
      className="relative h-screen overflow-hidden bg-black"
      id="hero"
    >
      {/* ---------------- Reactive Glow ---------------- */}
      {!reduceMotion && (
        <div
          className="absolute inset-0 transition-all duration-200 pointer-events-none"
          style={{
            background: `radial-gradient(circle at ${mouse.x}% ${mouse.y}%, rgba(99,102,241,0.25), transparent 60%)`,
          }}
        />
      )}

      {/* ---------------- Ambient Center Glow ---------------- */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(99,102,241,0.08),transparent_70%)]" />

      {/* ---------------- Watermark ---------------- */}
      <motion.h1
  animate={{ y: [0, -20, 0] }}
  transition={{ duration: 18, repeat: Infinity, ease: "easeInOut" }}
  className="absolute inset-0 flex items-center justify-center
             text-[22vw] sm:text-[26vw] md:text-[18vw]
             font-bold text-white/5
             pointer-events-none select-none"
>
  SUYASH
</motion.h1>

      {/* ---------------- Content ---------------- */}
      <motion.div
        style={{ y: yContent }}
        className="relative z-10 h-full flex flex-col
                   items-center justify-center text-center px-6"
      >
        {/* Label */}
        <motion.p
          initial={{ opacity: 0, y: 22 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="text-xs uppercase tracking-[0.45em]
                     text-gray-500 mb-8"
        >
          Creative Full-Stack Developer
        </motion.p>

        {/* Headline */}
        <h1 className="font-display text-5xl sm:text-6xl md:text-7xl
                       font-semibold tracking-tight
                       leading-tight text-white">
          <motion.span
            initial={{ opacity: 0, y: 32 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="block mb-4"
          >
            I’m Suyash Kirdakar
          </motion.span>

          {/* Rotating Role */}
          <div className="relative h-[2.4em] sm:h-[2.1em] md:h-[1.6em] overflow-hidden">
            <AnimatePresence mode="wait">
              <motion.span
                key={index}
                initial={{ y: 60, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: -60, opacity: 0 }}
                transition={{
                  duration: 0.55,
                  ease: [0.22, 1, 0.36, 1],
                }}
                className="block leading-[1.15] bg-gradient-to-r
           from-rose-500 via-fuchsia-400 to-indigo-500
           bg-clip-text text-transparent"
              >
                {WORDS[index]}
              </motion.span>
            </AnimatePresence>
          </div>
        </h1>

        {/* ---------------- SAFE DIVIDER ---------------- */}
        <div className="mt-14 mb-10 flex justify-center">
          <motion.div
            initial={{ scaleX: 0, opacity: 0 }}
            animate={{ scaleX: 1, opacity: 1 }}
            transition={{ delay: 1.2, duration: 1, ease: "easeOut" }}
            className="origin-center h-px w-72
                       bg-gradient-to-r
                       from-transparent via-white/40 to-transparent"
          />
        </div>

        {/* Description */}
        <motion.p
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.4 }}
          className="text-base sm:text-lg md:text-xl
                     text-gray-400 max-w-xl
                     leading-relaxed"
        >
          I craft high-performance digital experiences where engineering
          precision meets cinematic motion.
        </motion.p>

        {/* CTA */}
        <motion.a
          href="/SuyashK_CV.pdf"
          download
          whileTap={{ scale: 0.96 }}
          className="group mt-16 inline-flex items-center gap-3
                     px-14 py-5 rounded-full
                     bg-white/10 backdrop-blur
                     border border-white/20
                     text-white text-lg font-medium
                     shadow-[0_0_60px_rgba(99,102,241,0.35)]
                     hover:bg-white hover:text-black
                     transition-all duration-300"
        >
          Resume
          <Download
            size={20}
            className="transition-transform duration-300
                       group-hover:translate-y-1"
          />
        </motion.a>
      </motion.div>
    </motion.section>
  );
}