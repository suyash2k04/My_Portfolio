"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";

export default function WelcomeIntro() {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setVisible(false);
    }, 3000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{
            opacity: 0,
            scale: 1.3,
            rotateX: 20,
            filter: "blur(40px)",
          }}
          transition={{ duration: 1.2 }}
          className="fixed inset-0 z-99999 bg-black flex items-center justify-center overflow-hidden perspective-[2000px]"
        >
          <motion.h1
            initial={{ opacity: 0, scale: 0.4, rotateX: 90 }}
            animate={{ opacity: 1, scale: 1.1, rotateX: 0 }}
            transition={{
              duration: 1.4,
              ease: [0.22, 1, 0.36, 1],
            }}
            className="relative text-white text-6xl md:text-9xl font-extrabold
             tracking-[0.15em] sm:tracking-[0.25em] md:tracking-[0.35em]
             text-center leading-none whitespace-nowrap md:scale-150"
          >
            WELCOME
            <span className="absolute inset-0 text-red-500 opacity-40 translate-x-1">
              WELCOME
            </span>
            <span className="absolute inset-0 text-blue-500 opacity-40 -translate-x-1">
              WELCOME
            </span>
          </motion.h1>

          {/* Impact Flash */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: [0, 1, 0] }}
            transition={{ delay: 1.2, duration: 0.5 }}
            className="absolute inset-0 bg-white"
          />
        </motion.div>
      )}
    </AnimatePresence>
  );
}
