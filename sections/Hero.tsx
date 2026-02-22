"use client";

import {
  motion,
  useScroll,
  useTransform,
  useReducedMotion,
  AnimatePresence,
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

  // SSR SAFE PARTICLES
  const generateParticles = () =>
    Array.from({ length: 25 }).map((_, i) => ({
      top: (i * 37) % 100,
      left: (i * 53) % 100,
      duration: 8 + i,
    }));

  const [particles] = useState(generateParticles);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((v) => (v + 1) % WORDS.length);
    }, 3200);
    return () => clearInterval(interval);
  }, []);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  const scale = useTransform(scrollYProgress, [0, 1], [1, 0.9]);
  const opacity = useTransform(scrollYProgress, [0, 0.75], [1, 0]);
  const yContent = useTransform(scrollYProgress, [0, 1], [0, -200]);

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
      {/* REACTIVE GLOW BACKGROUND */}
      {!reduceMotion && (
        <div
          style={{
            background: `radial-gradient(circle at ${mouse.x}% ${mouse.y}%, rgba(99,102,241,0.25), transparent 60%)`,
          }}
          className="absolute inset-0 transition-all duration-200"
        />
      )}

      {/* SUBTLE GLOBAL GLOW */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(99,102,241,0.08),transparent_70%)]" />

      {/* FLOATING WATERMARK */}
      <motion.h1
        animate={{ y: [0, -20, 0] }}
        transition={{ duration: 18, repeat: Infinity, ease: "easeInOut" }}
        className="absolute inset-0 flex items-center justify-center
        text-[18vw] font-bold tracking-tight
        text-white/5 pointer-events-none select-none"
      >
        SUYASH
      </motion.h1>

      {/* TOP BORDER LINE */}
      <div className="absolute top-0 left-0 w-full h-px bg-white/10" />
      <motion.div
        animate={{ x: ["-10%", "110%"] }}
        transition={{ duration: 6, repeat: Infinity, ease: "linear" }}
        className="absolute top-0 w-24 h-0.5 bg-linear-to-r from-transparent via-indigo-400 to-transparent blur-[2px]"
      />

      {/* BOTTOM BORDER LINE */}
      <div className="absolute bottom-0 left-0 w-full h-px bg-white/10" />
      <motion.div
        animate={{ x: ["110%", "-10%"] }}
        transition={{ duration: 7, repeat: Infinity, ease: "linear" }}
        className="absolute bottom-0 w-24 h-0.5 bg-linear-to-r from-transparent via-purple-400 to-transparent blur-[2px]"
      />

      {/* GLOWING PARTICLES */}
      <div className="absolute inset-0 pointer-events-none">
        {particles.map((p, i) => (
          <motion.span
            key={i}
            animate={{ y: [0, -30, 0], opacity: [0.2, 0.6, 0.2] }}
            transition={{
              duration: p.duration,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            className="absolute w-1.5 h-1.5 bg-indigo-400 rounded-full blur-[2px]"
            style={{
              top: `${p.top}%`,
              left: `${p.left}%`,
            }}
          />
        ))}
      </div>

      {/* CONTENT */}
      <motion.div
        style={{ y: yContent }}
        className="relative z-10 h-full flex flex-col items-center justify-center text-center px-6"
      >
        <motion.p
          initial={{ opacity: 0, y: 22 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="text-xs uppercase tracking-[0.45em] text-gray-500 mb-8"
        >
          Creative Full-Stack Developer
        </motion.p>

        <h1 className="font-display text-5xl md:text-7xl font-semibold tracking-tight text-white">
          <motion.span
            initial={{ opacity: 0, y: 32 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="block mb-3"
          >
            I’m Suyash Kirdakar
          </motion.span>

          <div className="relative h-[1.6em] overflow-hidden">
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
                className="block bg-[linear-gradient(90deg,#ff5f5f,#c084fc,#6366f1)]
                bg-size-[300%_300%]
                animate-gradient
                bg-clip-text text-transparent"
              >
                {WORDS[index]}
              </motion.span>
            </AnimatePresence>
          </div>
        </h1>

        <motion.div
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ delay: 1.2, duration: 1 }}
          className="mt-12 mb-10 h-px w-80 bg-linear-to-r from-transparent via-white/40 to-transparent"
        />

        <motion.p
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.4 }}
          className="text-lg md:text-xl text-gray-400 max-w-xl"
        >
          I craft high-performance digital experiences where engineering precision meets cinematic motion.
        </motion.p>

        <motion.a
          href="/SuyashK_CV.pdf"
          download
          whileTap={{ scale: 0.96 }}
          className="group mt-16 inline-flex items-center gap-3 px-14 py-5 rounded-full
          bg-white/10 backdrop-blur
          border border-white/20
          text-white text-lg font-medium
          shadow-[0_0_60px_rgba(99,102,241,0.35)]
          hover:bg-white hover:text-black transition-all duration-300"
        >
          Resume
          <Download
            size={20}
            className="transition-transform duration-300 group-hover:translate-y-1"
          />
        </motion.a>
      </motion.div>
    </motion.section>
  );
}