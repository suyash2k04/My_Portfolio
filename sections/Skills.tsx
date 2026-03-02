"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import {
  SiReact,
  SiNextdotjs,
  SiTypescript,
  SiRedux,
  SiFramer,
  SiThreedotjs,
  SiNodedotjs,
  SiExpress,
  SiGraphql,
  SiRedis,
  SiApachekafka,
  SiPostgresql,
  SiPrisma,
  SiDocker,
  SiKubernetes,
  SiAmazon,
  SiGooglecloud,
  SiGithubactions,
  SiNginx,
  SiLinux,
  SiTerraform,
  SiGrafana,
  SiPrometheus,
  SiOpenai,
  SiTensorflow,
  SiPytorch,
} from "react-icons/si";

const EXPERTISE = [
  {
    title: "Frontend Engineering Systems",
    stack: [
      { name: "React", icon: SiReact, color: "#61DAFB" },
      { name: "Next.js", icon: SiNextdotjs, color: "#FFFFFF" },
      { name: "TypeScript", icon: SiTypescript, color: "#3178C6" },
      { name: "Redux Toolkit", icon: SiRedux, color: "#764ABC" },
      { name: "Framer Motion", icon: SiFramer, color: "#0055FF" },
      { name: "Three.js", icon: SiThreedotjs, color: "#FFFFFF" },
    ],
  },
  {
    title: "Backend & Distributed Systems",
    stack: [
      { name: "Node.js", icon: SiNodedotjs, color: "#3C873A" },
      { name: "Express", icon: SiExpress, color: "#FFFFFF" },
      { name: "GraphQL", icon: SiGraphql, color: "#E10098" },
      { name: "Redis", icon: SiRedis, color: "#DC382D" },
      { name: "Apache Kafka", icon: SiApachekafka, color: "#231F20" },
      { name: "PostgreSQL", icon: SiPostgresql, color: "#336791" },
      { name: "Prisma ORM", icon: SiPrisma, color: "#2D3748" },
    ],
  },
  {
    title: "Cloud & Infrastructure",
    stack: [
      { name: "Docker", icon: SiDocker, color: "#2496ED" },
      { name: "Kubernetes", icon: SiKubernetes, color: "#326CE5" },
      { name: "AWS", icon: SiAmazon, color: "#FF9900" },
      { name: "Google Cloud", icon: SiGooglecloud, color: "#4285F4" },
      { name: "GitHub Actions", icon: SiGithubactions, color: "#2088FF" },
      { name: "Nginx", icon: SiNginx, color: "#009639" },
      { name: "Linux", icon: SiLinux, color: "#FCC624" },
      { name: "Terraform", icon: SiTerraform, color: "#7B42BC" },
    ],
  },
  {
    title: "DevOps & Observability",
    stack: [
      { name: "Grafana", icon: SiGrafana, color: "#F46800" },
      { name: "Prometheus", icon: SiPrometheus, color: "#E6522C" },
      { name: "Blue-Green Deployments", icon: SiDocker, color: "#2496ED" },
      { name: "Canary Releases", icon: SiKubernetes, color: "#326CE5" },
    ],
  },
  {
    title: "AI / Machine Learning Engineering",
    stack: [
      { name: "OpenAI APIs", icon: SiOpenai, color: "#10A37F" },
      { name: "TensorFlow", icon: SiTensorflow, color: "#FF6F00" },
      { name: "PyTorch", icon: SiPytorch, color: "#EE4C2C" },
      { name: "RAG Systems", icon: SiOpenai, color: "#10A37F" },
      { name: "LLM System Design", icon: SiOpenai, color: "#10A37F" },
    ],
  },
];

export default function Skills() {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <section className="bg-black text-white py-24 md:py-40" id="skills">
      <div className="max-w-7xl mx-auto px-6 md:px-8">

        {/* Header */}
        <div className="mb-16 md:mb-32">
          <h2 className="text-3xl md:text-6xl font-semibold tracking-tight">
            Engineering Expertise
          </h2>
          <p className="mt-4 md:mt-6 text-gray-400 max-w-2xl">
            Full-Stack Systems • Cloud • Distributed Architecture • AI
          </p>
          <div className="mt-8 h-px w-32 bg-white/30" />
        </div>

        {/* MOBILE — ACCORDION */}
        <div className="space-y-6 md:hidden">
          {EXPERTISE.map((domain, i) => (
            <div
              key={i}
              className="border border-white/10 rounded-xl overflow-hidden"
            >
              <button
                onClick={() => setOpen(open === i ? null : i)}
                className="w-full px-6 py-4 flex justify-between items-center"
              >
                <span className="text-base font-medium text-left">
                  {domain.title}
                </span>
                <span className="text-gray-400">
                  {open === i ? "−" : "+"}
                </span>
              </button>

              <AnimatePresence>
                {open === i && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.35 }}
                    className="px-6 pb-6"
                  >
                    <div className="grid grid-cols-2 gap-6">
                      {domain.stack.map((skill, idx) => {
                        const Icon = skill.icon;
                        return (
                          <div
                            key={idx}
                            className="flex flex-col items-center text-center"
                          >
                            <Icon size={34} style={{ color: skill.color }} />
                            <span className="mt-2 text-xs text-gray-400">
                              {skill.name}
                            </span>
                          </div>
                        );
                      })}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </div>

        {/* DESKTOP — GRID */}
        <div className="hidden md:block space-y-32">
          {EXPERTISE.map((domain, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 80 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="border border-white/10 rounded-3xl px-16 py-20 bg-white/5"
            >
              <div className="flex justify-between items-center mb-16">
                <h3 className="text-3xl">{domain.title}</h3>
                <span className="text-gray-500">
                  {String(i + 1).padStart(2, "0")}
                </span>
              </div>

              <div className="grid grid-cols-4 gap-14">
                {domain.stack.map((skill, idx) => {
                  const Icon = skill.icon;
                  return (
                    <div
                      key={idx}
                      className="flex flex-col items-center group"
                    >
                      <Icon
                        size={48}
                        style={{
                          color: skill.color,
                          filter: `drop-shadow(0 0 10px ${skill.color}66)`,
                        }}
                        className="group-hover:scale-110 transition"
                      />
                      <span className="mt-4 text-gray-400 group-hover:text-white transition">
                        {skill.name}
                      </span>
                    </div>
                  );
                })}
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}