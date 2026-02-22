"use client";

import {
  motion,
  useScroll,
  useTransform,
  useReducedMotion,
  AnimatePresence,
} from "framer-motion";
import { useRef, useEffect, useState } from "react";

const HIGHLIGHT_WORDS = ["Innovation ", "Precision ", "Impact"];

/* ---------------- Animated Counter Hook ---------------- */
function useCounter(target: number, duration = 1200, trigger = false) {
  const [value, setValue] = useState(0);

  useEffect(() => {
    if (!trigger) return;

    const startTime = performance.now();
    function update(now: number) {
      const progress = Math.min((now - startTime) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setValue(Math.floor(eased * target));
      if (progress < 1) requestAnimationFrame(update);
    }

    requestAnimationFrame(update);
  }, [target, duration, trigger]);

  return value;
}

export default function About() {
  const ref = useRef<HTMLDivElement>(null);
  const reduceMotion = useReducedMotion();

  /* ---------------- Mouse Tracking ---------------- */
  const [mouse, setMouse] = useState({ x: 50, y: 50 });
  const handleMouseMove = (e: React.MouseEvent) => {
    const { innerWidth, innerHeight } = window;
    setMouse({
      x: (e.clientX / innerWidth) * 100,
      y: (e.clientY / innerHeight) * 100,
    });
  };

  /* ---------------- Scroll Animations ---------------- */
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const yScroll = useTransform(scrollYProgress, [0, 1], [60, -60]);
  const opacity = useTransform(scrollYProgress, [0, 0.25], [0, 1]);
  const blur = useTransform(scrollYProgress, [0, 0.4], ["14px", "0px"]);

  /* ---------------- Section In-View Detection ---------------- */
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => setInView(entry.isIntersecting),
      { threshold: 0.3 },
    );

    if (ref.current) observer.observe(ref.current);

    // Proper cleanup function
    return () => {
      if (ref.current) {
        observer.unobserve(ref.current);
      }
    };
  }, []);

  /* ---------------- Counters ---------------- */
  const projects = useCounter(20, 1200, inView);
  const experience = useCounter(1, 1200, inView);
  const skills = useCounter(15, 1200, inView);

  /* ---------------- Ambient Particles ---------------- */
  const generateParticles = () =>
    Array.from({ length: 20 }).map((_, i) => ({
      top: (i * 37) % 100,
      left: (i * 53) % 100,
      duration: 12 + i,
      size: 1 + (i % 3),
      opacity: 0.08 + (i % 3) * 0.05,
    }));
  const [particles] = useState(generateParticles);

  return (
    <motion.section
      ref={ref}
      onMouseMove={handleMouseMove}
      style={{filter: reduceMotion ? "none" : blur }}
      className="relative min-h-screen bg-black overflow-hidden flex items-center"
      id="about"
    >
      {/* ---------------- Radial Light ---------------- */}
      {!reduceMotion && (
        <div
          style={{
            background: `radial-gradient(circle at ${mouse.x}% ${mouse.y}%, rgba(99,102,241,0.2), transparent 70%)`,
          }}
          className="absolute inset-0 pointer-events-none transition-all duration-200"
        />
      )}

      {/* ---------------- Ambient Particles ---------------- */}
      {!reduceMotion && (
        <div className="absolute inset-0 pointer-events-none">
          {particles.map((p, i) => (
            <motion.span
              key={i}
              animate={{ y: [0, -30, 0], x: [0, 10, 0] }}
              transition={{
                duration: p.duration,
                repeat: Infinity,
                ease: "easeInOut",
              }}
              className="absolute rounded-full bg-white/20"
              style={{
                width: `${p.size}px`,
                height: `${p.size}px`,
                top: `${p.top}%`,
                left: `${p.left}%`,
                opacity: p.opacity,
              }}
            />
          ))}
        </div>
      )}

      {/* ---------------- Floating Watermark ---------------- */}
      <motion.h1
        animate={{ y: [0, -20, 0] }}
        transition={{ duration: 18, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-1/2 left-10 transform -translate-y-1/2 text-[16vw] font-bold tracking-tight text-white/7 pointer-events-none select-none"
      >
        ABOUT
      </motion.h1>

      {/* ---------------- Content Wrapper ---------------- */}
      <div className="relative z-10 max-w-6xl mx-auto px-8 py-32 w-full flex flex-col md:flex-row items-start gap-16">
        {/* ---------------- Text Column ---------------- */}
        <motion.div style={{ y: yScroll }} className="flex-[0.5] text-left">
          {/* Philosophy Label */}

          {/* Headline */}
          <motion.h2
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.9 }}
            className="text-4xl md:text-5xl font-semibold text-white max-w-[90%] leading-tight"
          >
            I design digital experiences that balance
          </motion.h2>

          {/* Highlight Words */}
          <div className="flex flex-wrap gap-4 mt-4">
            {HIGHLIGHT_WORDS.map((word, i) => (
              <AnimatePresence mode="wait" key={i}>
                <motion.span
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{
                    delay: i * 0.7,
                    duration: 2,
                    ease: "easeInOut",
                    repeat: Infinity,
                    repeatType: "reverse",
                  }}
                  className="bg-[linear-gradient(90deg,#ff5f5f,#c084fc,#6366f1)]
                             bg-clip-text text-transparent font-bold text-3xl md:text-4xl"
                >
                  {word}
                </motion.span>
              </AnimatePresence>
            ))}
          </div>

          {/* Description */}
          <motion.p
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4, duration: 0.8 }}
            className="mt-6 text-lg text-gray-400 max-w-lg"
          >
            I create intuitive interfaces that move with purpose, seamlessly
            hiding complexity. My work focuses on building scalable, adaptive
            digital systems that delight users and drive results.
          </motion.p>

          {/* Divider */}
          <motion.div
            initial={{ scaleX: 0, y: 0 }}
            whileInView={{ scaleX: 1, y: 80 }}
            viewport={{ once: true }}
            transition={{ delay: 0.6, duration: 1 }}
            className="h-px w-full bg-linear-to-r from-transparent via-white/80 to-transparent"
          />

          {/* Metrics */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mt-30">
  {[projects, experience, skills].map((val, idx) => (
    <motion.div
      key={idx}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: 0.15 * idx, duration: 0.8 }}
      className="flex flex-col"
    >
      <motion.p
        animate={{ scale: [1, 1.07, 1] }}
        transition={{ repeat: Infinity, duration: 1.8, delay: 0.2 }}
        className="text-5xl font-semibold text-white"
      >
        {val}+
      </motion.p>
      <p className="mt-2 text-sm uppercase tracking-widest text-gray-500">
        {idx === 0
          ? "Projects Completed"
          : idx === 1
            ? "Years of Experience"
            : "Core Skills"}
      </p>
    </motion.div>
  ))}
</div>

        </motion.div>

        {/* ---------------- Photo Column with 3D Tilt ---------------- */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1 }}
          className="flex-[0.5] flex justify-end perspective-1000"
        >
          <motion.img
            src="/personal.png"
            alt="Suyash Kirdakar"
            className="w-72 md:w-96 rounded-2xl shadow-2xl border border-white/10"
            style={{
              rotateY: (mouse.x - 50) / 8,
              rotateX: -(mouse.y - 50) / 8,
            }}
            whileHover={{ scale: 1.04 }}
            transition={{ type: "spring", stiffness: 120 }}
          />
        </motion.div>
      </div>
    </motion.section>
  );
}
