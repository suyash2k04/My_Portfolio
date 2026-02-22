"use client";
import React, { JSX, useRef, Suspense } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { motion, useScroll, useTransform, MotionValue } from "framer-motion";
import { OrbitControls, useTexture } from "@react-three/drei";

import {
  SiNextdotjs,
  SiTypescript,
  SiOpenai,
  SiPostgresql,
  SiStripe,
  SiPrisma,
  SiRedis,
  SiReact,
} from "react-icons/si";

/* ================= TYPES ================= */

type Project = {
  title: string;
  category: string;
  description: string;
  stack: { name: string; icon: JSX.Element; color: string }[];
  image: string;
  live?: string;
};

/* ================= DATA ================= */

const PROJECTS: Project[] = [
  {
    title: "AI Resume Builder",
    category: "AI SAAS PLATFORM",
    description:
      "An intelligent resume generation system powered by LLMs with ATS scoring, keyword optimization, and subscription billing.",
    stack: [
      { name: "Next.js", icon: <SiNextdotjs />, color: "#ffffff" },
      { name: "TypeScript", icon: <SiTypescript />, color: "#3178C6" },
      { name: "OpenAI", icon: <SiOpenai />, color: "#412991" },
      { name: "PostgreSQL", icon: <SiPostgresql />, color: "#336791" },
      { name: "Stripe", icon: <SiStripe />, color: "#635BFF" },
    ],
    image: "/projects/image.png",
  },
  {
    title: "NextCommerce Enterprise",
    category: "E-COMMERCE SYSTEM",
    description:
      "A scalable multi-vendor e-commerce platform featuring secure payments, analytics dashboard, and enterprise role control.",
    stack: [
      { name: "Next.js", icon: <SiNextdotjs />, color: "#ffffff" },
      { name: "Prisma", icon: <SiPrisma />, color: "#0C344B" },
      { name: "PostgreSQL", icon: <SiPostgresql />, color: "#336791" },
      { name: "Stripe", icon: <SiStripe />, color: "#635BFF" },
      { name: "Redis", icon: <SiRedis />, color: "#DC382D" },
    ],
    image: "/projects/image1.png",
  },
  {
    title: "FinTrack Pro",
    category: "FINTECH PLATFORM",
    description:
      "A smart financial intelligence application tracking expenses, generating deep analytics, and providing predictive insights for better money management decisions.",
    stack: [
      { name: "Next.js", icon: <SiNextdotjs />, color: "#ffffff" },
      { name: "TypeScript", icon: <SiTypescript />, color: "#3178C6" },
      { name: "PostgreSQL", icon: <SiPostgresql />, color: "#336791" },
      { name: "React", icon: <SiReact />, color: "#61DAFB" },
      { name: "Chart.js", icon: <SiReact />, color: "#61DAFB" },
    ],
    image: "/projects/image3.png",
  },
];

/* ================= MAIN ================= */

export default function Projects() {
  return (
    <section className="bg-black text-white">
      {PROJECTS.map((project, i) => (
        <ProjectPanel key={i} project={project} />
      ))}
    </section>
  );
}

/* ================= PANEL ================= */

function ProjectPanel({ project }: { project: Project }) {
  const ref = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const contentY = useTransform(scrollYProgress, [0, 1], [100, -100]);
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);
  const bgScale = useTransform(scrollYProgress, [0, 1], [1.1, 1.2]);

  return (
    <section
      ref={ref}
      className="relative h-[140vh] flex items-center justify-center overflow-hidden"
    >
      {/* BACKGROUND IMAGE */}
      <motion.img
        src={project.image}
        alt={project.title}
        className="absolute inset-0 w-full h-full object-cover"
        style={{ scale: bgScale }}
      />

      {/* DARK OVERLAY */}
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" />

      {/* 3D BACKGROUND */}
      <div className="absolute inset-0 opacity-40">
        <Canvas>
          <ambientLight intensity={0.5} />
          <directionalLight position={[5, 5, 5]} intensity={1} />
          <Suspense fallback={null}>
            <LayeredPlane image={project.image} scroll={scrollYProgress} />
          </Suspense>
          <OrbitControls enableZoom={false} enablePan={false} />
        </Canvas>
      </div>

      {/* GLASS CONTENT CARD */}
      <motion.div
        style={{ y: contentY, opacity }}
        className="relative z-20 w-[85%] max-w-6xl backdrop-blur-2xl bg-white/5 border border-white/10 rounded-3xl p-16 shadow-2xl"
      >
        <p className="text-xs tracking-[0.4em] text-white/50 mb-6">
          {project.category}
        </p>

        <h2 className="text-7xl font-bold mb-8 leading-tight bg-gradient-to-r from-white to-white/60 bg-clip-text text-transparent">
          {project.title}
        </h2>

        <p className="text-white/80 text-xl leading-relaxed max-w-3xl mb-12">
          {project.description}
        </p>

        {/* TECH STACK */}
        <div className="flex flex-wrap gap-6 mb-12">
          {project.stack.map((tech) => (
            <motion.div
              key={tech.name}
              whileHover={{ scale: 1.25, rotate: 6 }}
              className="cursor-pointer"
            >
              {React.cloneElement(tech.icon, {
                color: tech.color,
                size: 40,
              })}
            </motion.div>
          ))}
        </div>

        {/* BUTTON */}
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.97 }}
          className="px-10 py-4 rounded-full bg-gradient-to-r from-blue-500 to-purple-600 text-white font-semibold tracking-widest shadow-lg hover:shadow-2xl transition"
        >
          View Project →
        </motion.button>
      </motion.div>
    </section>
  );
}

/* ================= 3D PLANE ================= */

function LayeredPlane({
  image,
  scroll,
}: {
  image: string;
  scroll: MotionValue<number>;
}) {
  const meshRef = useRef<any>(null);
  const texture = useTexture(image);

  useFrame(() => {
    if (meshRef.current) {
      meshRef.current.rotation.y = scroll.get() * 0.5;
      meshRef.current.rotation.x = scroll.get() * 0.15;
    }
  });

  return (
    <mesh ref={meshRef} scale={[6, 4, 0.1]}>
      <planeGeometry args={[6, 4]} />
      <meshStandardMaterial map={texture} />
    </mesh>
  );
}