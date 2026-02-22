"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { ReactNode } from "react";

interface NavbarProps {
  className?: string;
}

export default function Navbar({ className = "" }: NavbarProps) {
  const { scrollY } = useScroll();

  const navBg = useTransform(
    scrollY,
    [0, 80],
    ["rgba(0,0,0,0)", "rgba(0,0,0,0.6)"],
  );

  const navBlur = useTransform(scrollY, [0, 80], ["blur(0px)", "blur(12px)"]);

  return (
    <motion.header
      initial={{ opacity: 0, y: -40, filter: "blur(8px)" }}
      animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
      transition={{
        delay: 3.6,
        duration: 0.9,
        ease: [0.22, 1, 0.36, 1],
      }}
      className={`fixed top-0 left-0 w-full z-1000 ${className}`}
    >
      <motion.div
        style={{
          backgroundColor: navBg,
          backdropFilter: navBlur,
        }}
        className="transition-all"
      >
        <div className="max-w-7xl mx-auto px-8 py-6 flex items-center justify-between">
          {/* Logo */}
          <motion.div
            whileHover={{ scale: 1.08 }}
            transition={{ type: "spring", stiffness: 200, damping: 12 }}
            className="relative w-12 h-12 flex items-center justify-center rounded-full cursor-pointer"
            onClick={() =>
              document
                .getElementById("hero")
                ?.scrollIntoView({ behavior: "smooth" })
            }
          >
            <div className="absolute inset-0 rounded-full p-[1.5px] bg-linear-to-br from-indigo-500 via-purple-500 to-pink-500">
              <div className="w-full h-full bg-black rounded-full" />
            </div>

            <span className="relative z-10 text-white font-semibold tracking-tight">
              SK
            </span>
          </motion.div>

          {/* Links */}
          <nav className="hidden md:flex gap-12 text-sm text-gray-400">
            {[
              { label: "About", id: "about" },
              { label: "Journey", id: "journey" },
              { label: "Skills", id: "skills" },
              { label: "Projects", id: "projects" },
            ].map((item) => (
              <button
                key={item.id}
                onClick={() => {
                  document
                    .getElementById(item.id)
                    ?.scrollIntoView({ behavior: "smooth" });
                }}
                className="relative hover:text-white transition after:absolute after:left-0 after:-bottom-1 after:h-px after:w-0 after:bg-white/60 after:transition-all hover:after:w-full"
              >
                {item.label}
              </button>
            ))}
          </nav>

          {/* Contact CTA */}
          <button
            onClick={() =>
              document
                .getElementById("contact")
                ?.scrollIntoView({ behavior: "smooth" })
            }
            className="px-6 py-2 rounded-full border border-white/20 text-sm text-white hover:bg-white hover:text-black transition"
          >
            Contact
          </button>
        </div>
      </motion.div>
    </motion.header>
  );
}
