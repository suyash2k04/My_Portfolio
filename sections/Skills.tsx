"use client";

import {
  motion,
  useScroll,
  useTransform,
  useMotionValueEvent,
  useMotionValue,
  useSpring,
} from "framer-motion";
import { useRef, useState } from "react";

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

/* ============================= */
/* ===== ENTERPRISE MATRIX ===== */
/* ============================= */

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
      { name: "Blue-Green Deployment", icon: SiDocker, color: "#2496ED" },
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

/* ============================= */
/* ===== MAGNETIC COMPONENT ==== */
/* ============================= */

function Magnetic({ children }: { children: React.ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);

  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const smoothX = useSpring(x, { stiffness: 200, damping: 20 });
  const smoothY = useSpring(y, { stiffness: 200, damping: 20 });

  const handleMove = (e: any) => {
    const rect = ref.current?.getBoundingClientRect();
    if (!rect) return;

    const dx = e.clientX - (rect.left + rect.width / 2);
    const dy = e.clientY - (rect.top + rect.height / 2);

    x.set(dx * 0.3);
    y.set(dy * 0.3);
  };

  const reset = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      ref={ref}
      style={{ x: smoothX, y: smoothY }}
      onMouseMove={handleMove}
      onMouseLeave={reset}
      whileHover={{ scale: 1.1 }}
      className="transition"
    >
      {children}
    </motion.div>
  );
}

/* ============================= */
/* ===== MAIN SECTION ========== */
/* ============================= */

export default function ExpertisePage() {
  const ref = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end end"],
  });

  useMotionValueEvent(scrollYProgress, "change", (v) => {
    const index = Math.min(
      EXPERTISE.length - 1,
      Math.floor(v * EXPERTISE.length)
    );
    setActive(index);
  });

  const opacity = useTransform(scrollYProgress, [0, 0.1], [0, 1]);

  return (
    <motion.section
      ref={ref}

      className="relative bg-black text-white min-h-screen overflow-hidden"
    >
      {/* Background Grid */}
      <div
        className="absolute inset-0 opacity-[0.03]
        bg-[linear-gradient(to_right,white_1px,transparent_1px),
            linear-gradient(to_bottom,white_1px,transparent_1px)]
        bg-size-[100px_100px]"
      />

      {/* Massive Watermark */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <h1 className="text-[18vw] font-bold tracking-tight text-white/5">
          EXPERTISE
        </h1>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-8 py-40">
        {/* Header */}
        <div className="mb-32">
          <h2 className="text-6xl font-semibold tracking-tight">
            ENGINEERING EXPERTISE
          </h2>
          <p className="mt-6 text-gray-400 max-w-2xl">
            Full-Stack Systems • Distributed Architecture • Cloud Infrastructure • AI Engineering
          </p>
          <div className="mt-10 h-px w-40 bg-white/30" />
        </div>

        {/* Domains */}
        <div className="space-y-32">
          {EXPERTISE.map((domain, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 80 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className={`border px-16 py-20 rounded-3xl transition-all duration-500 ${
                active === i
                  ? "border-white bg-white/5"
                  : "border-white/10"
              }`}
            >
              <div className="flex justify-between items-center mb-16">
                <h3 className="text-3xl tracking-tight">
                  {domain.title}
                </h3>
                <span className="text-sm text-gray-500 tracking-widest">
                  {String(i + 1).padStart(2, "0")}
                </span>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-14">
                {domain.stack.map((skill, idx) => {
                  const Icon = skill.icon;
                  return (
                    <Magnetic key={idx}>
                      <div className="flex flex-col items-center space-y-4 cursor-pointer group">
                        <Icon
                          size={48}
                          style={{
                            color: skill.color,
                            filter: `drop-shadow(0 0 10px ${skill.color}88)`,
                          }}
                          className="transition duration-300 group-hover:scale-110"
                        />
                        <span className="text-sm text-gray-400 group-hover:text-white transition">
                          {skill.name}
                        </span>
                      </div>
                    </Magnetic>
                  );
                })}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.section>
  );
}