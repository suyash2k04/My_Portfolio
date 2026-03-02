"use client";

import {
  motion,
  useMotionValue,
  useTransform,
  useReducedMotion,
  AnimatePresence,
} from "framer-motion";
import { useState } from "react";
import {
  FaGithub,
  FaLinkedin,
  FaTwitter,
  FaInstagram,
} from "react-icons/fa";

/* ================= TOAST ================= */

function Toast({
  show,
  message,
}: {
  show: boolean;
  message: string;
}) {
  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ opacity: 0, y: -20, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: -10, scale: 0.95 }}
          transition={{ duration: 0.35, ease: "easeOut" }}
          className="
            fixed z-[9999]

            /* 📱 Mobile */
            bottom-6 left-1/2 -translate-x-1/2

            /* 🖥 Desktop */
            md:top-8 md:right-8 md:bottom-auto md:left-auto md:translate-x-0

            flex items-center gap-3
            px-6 py-4 rounded-2xl
            bg-black/80 backdrop-blur-xl
            border border-white/20
            text-white text-sm md:text-base
            shadow-[0_20px_60px_rgba(99,102,241,0.35)]
          "
        >
          {/* ✅ ICON */}
          <span className="text-green-400 text-lg">✔</span>

          {/* MESSAGE */}
          <span className="font-medium">
            {message}
          </span>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

/* ================= MAIN ================= */

export default function Contact() {
  const reduceMotion = useReducedMotion();

  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const glowX = useTransform(x, [-200, 200], ["30%", "70%"]);
  const glowY = useTransform(y, [-200, 200], ["20%", "80%"]);

  const [form, setForm] = useState({
    name: "",
    email: "",
    message: "",
  });

  const [status, setStatus] = useState<"idle" | "loading" | "sent">("idle");
  const [showToast, setShowToast] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setStatus("loading");

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        body: JSON.stringify(form),
      });

      if (res.ok) {
        setStatus("sent");
        setForm({ name: "", email: "", message: "" });

        setShowToast(true);
        setTimeout(() => setShowToast(false), 3000);
      } else {
        setStatus("idle");
      }
    } catch {
      setStatus("idle");
    }
  }

  return (
    <section
      id="contact"
      className="relative min-h-screen bg-black overflow-hidden"
    >
      {/* ================= WATERMARK ================= */}
      {!reduceMotion && (
        <motion.h1
          animate={{ y: [0, -20, 0] }}
          transition={{ duration: 18, repeat: Infinity, ease: "easeInOut" }}
          className="
            absolute inset-0 flex items-center justify-center
            text-[22vw] md:text-[18vw]
            font-bold tracking-tight
            text-white/5 pointer-events-none select-none
          "
        >
          CONTACT
        </motion.h1>
      )}

      {/* ================= AMBIENT GLOW ================= */}
      {!reduceMotion && (
        <motion.div
          style={{ left: glowX, top: glowY }}
          className="
            pointer-events-none absolute
            w-175 h-175 -translate-x-1/2 -translate-y-1/2
            bg-[radial-gradient(circle,rgba(99,102,241,0.18),transparent_65%)]
          "
        />
      )}

      {/* ================= CONTENT ================= */}
      <div
        onMouseMove={(e) => {
          const rect = e.currentTarget.getBoundingClientRect();
          x.set(e.clientX - rect.left);
          y.set(e.clientY - rect.top);
        }}
        className="
          relative z-10
          max-w-7xl mx-auto
          px-6 md:px-8
          py-24 md:py-32
          grid grid-cols-1 md:grid-cols-2
          gap-16 md:gap-20
        "
      >
        {/* ===== LEFT TEXT ===== */}
        <div className="flex flex-col justify-center">
          <p className="text-xs uppercase tracking-[0.45em] text-gray-500 mb-8">
            Contact
          </p>

          <h2 className="text-3xl md:text-5xl font-semibold text-white leading-tight">
            Let’s talk about
            <br />
            meaningful work.
          </h2>

          <p className="mt-6 text-base md:text-lg text-gray-400 max-w-md">
            I collaborate on projects where clarity, craft,
            and long-term impact matter.
          </p>

          <p className="mt-4 text-gray-500">
            If that sounds like you, we should talk.
          </p>
        </div>

        {/* ===== FORM ===== */}
        <motion.form
          onSubmit={handleSubmit}
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="flex flex-col gap-6"
        >
          {["name", "email"].map((field) => (
            <input
              key={field}
              required
              type={field === "email" ? "email" : "text"}
              placeholder={field === "name" ? "Your name" : "Email address"}
              value={form[field as keyof typeof form]}
              onChange={(e) =>
                setForm({ ...form, [field]: e.target.value })
              }
              className="
                w-full py-4 bg-transparent
                border-b border-white/20
                text-white placeholder-gray-500
                outline-none focus:border-white transition
              "
            />
          ))}

          <textarea
            required
            rows={4}
            placeholder="Tell me about your project"
            value={form.message}
            onChange={(e) =>
              setForm({ ...form, message: e.target.value })
            }
            className="
              w-full py-4 bg-transparent
              border-b border-white/20
              text-white placeholder-gray-500
              outline-none focus:border-white transition
              resize-none
            "
          />

          <motion.button
            whileHover={{ x: 6 }}
            whileTap={{ scale: 0.97 }}
            disabled={status === "loading"}
            className="
              mt-8 self-start flex items-center gap-4
              text-white text-base md:text-lg font-medium group
            "
          >
            <span>
              {status === "sent" ? "Message sent" : "Send message"}
            </span>
            <span className="w-10 h-px bg-white group-hover:w-16 transition-all" />
          </motion.button>
        </motion.form>
      </div>

      {/* ================= FOOTER ================= */}
      <footer className="border-t border-white/10 py-10 px-6">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6 text-gray-500 text-sm">
          <p>© {new Date().getFullYear()} Suyash Kirdakar</p>

          <div className="flex gap-6 text-white/70">
            <a href="https://github.com/suyash2k04" className="hover:text-white transition">
              <FaGithub size={18} />
            </a>
            <a href="https://www.linkedin.com/in/suyash2k04/" className="hover:text-white transition">
              <FaLinkedin size={18} />
            </a>
            <a href="https://www.instagram.com/suyash2k04" className="hover:text-white transition">
              <FaInstagram size={18} />
            </a>
          </div>
        </div>
      </footer>

      {/* ================= TOAST ================= */}
      <Toast
        show={showToast}
        message="Thanks! I’ll get back to you soon."
      />
    </section>
  );
}