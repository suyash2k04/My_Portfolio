"use client";

import {
  motion,
  useScroll,
  useTransform,
  useReducedMotion,
  AnimatePresence,
} from "framer-motion";
import { useRef, useState } from "react";

type Item = {
  title: string;
  place: string;
  time: string;
  description: string[];
  badges: string[];
  logo: string;
};

const EDUCATION: Item[] = [
  {
    title: "Bachelor of Engineering in Computer Science",
    place: "Marathwada Mitra Mandal's College of Engineering, Pune",
    time: "2021 — 2025",
    logo: "/image.png",
    badges: ["Full-Stack Projects", "Hackathons", "Team Collaboration"],
    description: [
      "Built academic & real-world applications.",
      "Developed full-stack apps using React, Node & MongoDB.",
      "Worked in Git-based collaborative teams.",
      "Focused on scalable architecture & debugging.",
    ],
  },
  {
    title: "Higher Secondary Education (12th)",
    place: "Nanded Education Society's Science College",
    time: "2020 — 2021",
    logo: "/image2.png",
    badges: ["Mathematics", "Logical Thinking"],
    description: [
      "Built strong foundation in calculus & probability.",
      "Developed structured analytical thinking.",
    ],
  },
  {
    title: "Secondary Education (10th)",
    place: "Shri Digamber Jain Gurukul",
    time: "2018 — 2019",
    logo: "/image4.png",
    badges: ["Early Tech Interest"],
    description: [
      "Learned core computer fundamentals.",
      "Developed early logical reasoning ability.",
    ],
  },
];

const EXPERIENCE: Item[] = [
  {
    title: "Trainee",
    place: "Optima Life Sciences Pvt. Ltd.",
    time: "Nov 2025 — Present",
    logo: "/image5.png",
    badges: ["Production UI", "Performance Optimization"],
    description: [
      "Building scalable UI components.",
      "Optimizing performance in production apps.",
      "Maintaining clean reusable architecture.",
    ],
  },
  {
    title: "Frontend Development Intern",
    place: "Posiview Digital Technologies Pvt. Ltd.",
    time: "Jan 2024 — Apr 2024",
    logo: "/image6.png",
    badges: ["Reusable Components", "Deployment"],
    description: [
      "Built reusable production-level components.",
      "Improved UI workflows & fixed critical bugs.",
    ],
  },
];

export default function Journey() {
  const ref = useRef<HTMLDivElement>(null);
  const reduceMotion = useReducedMotion();
  const [mode, setMode] = useState<"education" | "experience">("education");

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const pathLength = useTransform(scrollYProgress, [0, 1], [0, 1]);
  const data = mode === "education" ? EDUCATION : EXPERIENCE;

  return (
    <section ref={ref} id="journey" className="relative bg-black overflow-hidden">
      {/* Watermark – desktop only */}
      {!reduceMotion && (
        <motion.h1
          className="hidden md:flex absolute inset-0 items-center justify-center
          text-[18vw] font-bold text-white/5 pointer-events-none"
          animate={{ y: [0, -30, 0] }}
          transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
        >
          JOURNEY
        </motion.h1>
      )}

      <div className="relative z-10 max-w-6xl mx-auto px-6 md:px-8 py-24 md:py-32">
        {/* Heading */}
        <motion.h2
          key={mode}
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-3xl md:text-5xl font-semibold text-white mb-12 md:mb-20"
        >
          From Academic Foundations to Professional Execution.
        </motion.h2>

        {/* Toggle */}
        <div className="inline-flex mb-16 rounded-full border border-white/15 bg-white/5 p-1">
          {["education", "experience"].map((item) => (
            <button
              key={item}
              onClick={() => setMode(item as any)}
              className={`relative px-6 py-2 rounded-full text-sm capitalize ${
                mode === item ? "text-black" : "text-gray-400"
              }`}
            >
              {mode === item && (
                <motion.span
                  layoutId="toggle"
                  className="absolute inset-0 bg-white rounded-full"
                />
              )}
              <span className="relative z-10">{item}</span>
            </button>
          ))}
        </div>

        {/* Timeline */}
        <div className="relative">
          {/* Desktop SVG Line */}
          <svg
            className="hidden md:block absolute left-0 top-0 h-full w-16"
            viewBox="0 0 4 100"
            preserveAspectRatio="none"
          >
            <motion.path
              d="M2 0 V100"
              stroke="url(#grad)"
              strokeWidth="3"
              fill="none"
              style={{ pathLength }}
            />
            <defs>
              <linearGradient id="grad" gradientTransform="rotate(90)">
                <stop offset="0%" stopColor="#6366f1" />
                <stop offset="50%" stopColor="#a855f7" />
                <stop offset="100%" stopColor="#ec4899" />
              </linearGradient>
            </defs>
          </svg>

          {/* Cards */}
          <div className="md:ml-20 flex flex-col gap-12 md:gap-24">
            <AnimatePresence mode="wait">
              {data.map((item, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className="relative p-6 md:p-8 rounded-2xl
                  bg-white/5 border border-white/10 backdrop-blur"
                >
                  {/* Timeline dot */}
                  <span className="hidden md:block absolute -left-14 top-8 w-3 h-3 rounded-full bg-white shadow-[0_0_12px_white]" />

                  {/* Logo – desktop only */}
                  <img
                    src={item.logo}
                    alt=""
                    className="hidden md:block absolute right-6 top-6 w-20 opacity-100 pointer-events-none"
                  />

                  <p className="text-xs uppercase tracking-widest text-gray-500 mb-2">
                    {item.time}
                  </p>

                  <h3 className="text-xl md:text-2xl font-semibold text-white">
                    {item.title}
                  </h3>

                  <p className="text-gray-400 mb-4">{item.place}</p>

                  <div className="flex flex-wrap gap-2 mb-4">
                    {item.badges.map((badge, i) => (
                      <span
                        key={i}
                        className="px-3 py-1 text-xs rounded-full
                        bg-white/10 border border-white/20 text-gray-300"
                      >
                        {badge}
                      </span>
                    ))}
                  </div>

                  <ul className="space-y-2 text-gray-400 text-sm md:text-base">
                    {item.description.map((point, i) => (
                      <li key={i} className="flex gap-3">
                        <span className="mt-2 w-1.5 h-1.5 bg-white/60 rounded-full shrink-0" />
                        {point}
                      </li>
                    ))}
                  </ul>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        </div>

        {/* End Divider – visible on mobile & desktop */}
        <div className="mt-24 h-px w-full bg-gradient-to-r from-transparent via-white/30 to-transparent" />
      </div>
    </section>
  );
}