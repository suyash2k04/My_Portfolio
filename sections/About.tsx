"use client";

import {
  motion,
  useScroll,
  useTransform,
  useReducedMotion,
  AnimatePresence,
} from "framer-motion";
import { useRef, useEffect, useState } from "react";

const HIGHLIGHT_WORDS = ["Innovation", "Precision", "Impact"];

/* ---------------- Counter Hook ---------------- */
function useCounter(target: number, duration = 1200, trigger = false) {
  const [value, setValue] = useState(0);

  useEffect(() => {
    if (!trigger) return;
    const start = performance.now();

    const tick = (now: number) => {
      const progress = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setValue(Math.floor(eased * target));
      if (progress < 1) requestAnimationFrame(tick);
    };

    requestAnimationFrame(tick);
  }, [target, duration, trigger]);

  return value;
}

export default function About() {
  const ref = useRef<HTMLDivElement>(null);
  const reduceMotion = useReducedMotion();
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const obs = new IntersectionObserver(
      ([e]) => setInView(e.isIntersecting),
      { threshold: 0.3 }
    );
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);

  const projects = useCounter(20, 1200, inView);
  const experience = useCounter(1, 1200, inView);
  const skills = useCounter(15, 1200, inView);

  return (
    <section
      ref={ref}
      id="about"
      className="relative min-h-screen bg-black flex items-center overflow-hidden"
    >
      {/* Floating watermark */}
      <h1 className="absolute top-1/2 left-6 -translate-y-1/2 text-[28vw] md:text-[16vw] font-bold text-white/5 pointer-events-none">
        ABOUT
      </h1>

      <div className="relative z-10 max-w-6xl mx-auto px-6 md:px-10 py-28 w-full grid md:grid-cols-2 gap-16">
        {/* TEXT */}
        <div>
          <motion.h2
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-4xl md:text-5xl font-semibold text-white leading-tight"
          >
            I design digital experiences that balance
          </motion.h2>

          {/* Highlight words */}
          <div className="flex flex-wrap gap-4 mt-4">
            {HIGHLIGHT_WORDS.map((word, i) => (
              <motion.span
                key={word}
                animate={{ opacity: [0.6, 1, 0.6] }}
                transition={{ duration: 2.5, repeat: Infinity, delay: i * 0.4 }}
                className="text-3xl md:text-4xl font-bold bg-[linear-gradient(90deg,#ff5f5f,#c084fc,#6366f1)]
                bg-clip-text text-transparent"
              >
                {word}
              </motion.span>
            ))}
          </div>

          <p className="mt-6 text-lg text-gray-400 max-w-xl">
            I create intuitive interfaces that move with purpose, hiding
            complexity beneath refined motion. My focus is scalable systems
            that feel effortless and deliver real impact.
          </p>

          {/* COUNTERS */}
          <div className="mt-14 grid grid-cols-3 gap-6 md:grid-cols-3 md:gap-12">
            {[
              { value: projects, label: "Projects" },
              { value: experience, label: "Years" },
              { value: skills, label: "Skills" },
            ].map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.15 }}
                className="text-center md:text-left"
              >
                <p className="text-4xl md:text-5xl font-semibold text-white">
                  {item.value}+
                </p>
                <p className="mt-1 text-xs uppercase tracking-widest text-gray-500">
                  {item.label}
                </p>
              </motion.div>
            ))}
          </div>
        </div>

        {/* IMAGE — DESKTOP ONLY */}
        <motion.div
          className="hidden md:flex justify-end items-center"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1 }}
        >
          <motion.img
            src="/personal.png"
            alt="Suyash Kirdakar"
            className="w-96 rounded-2xl border border-white/10 shadow-2xl"
            whileHover={{ scale: 1.04 }}
          />
        </motion.div>

        <div className="relative z-10 mt-24 md:mt-32 px-6 md:px-0">
  <motion.div
    initial={{ scaleX: 0 }}
    whileInView={{ scaleX: 1 }}
    viewport={{ once: true }}
    transition={{ duration: 1.2, ease: "easeOut" }}
    className="
      origin-center
      mx-auto
      h-px
      w-full
      max-w-6xl
      bg-gradient-to-r
      from-transparent
      via-white/50
      to-transparent
    "
  />
</div>
      </div>
    </section>
  );
}