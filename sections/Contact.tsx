"use client";

import {
  motion,
  useMotionValue,
  useTransform,
  useReducedMotion,
} from "framer-motion";
import { useState } from "react";
import {
  FaGithub,
  FaLinkedin,
  FaTwitter,
  FaInstagram,
} from "react-icons/fa";

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

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setStatus("loading");

    const res = await fetch("/api/contact", {
      method: "POST",
      body: JSON.stringify(form),
    });

    if (res.ok) {
      setStatus("sent");
      setForm({ name: "", email: "", message: "" });
    } else {
      setStatus("idle");
    }
  }

  return (
    <section className="relative min-h-screen bg-black overflow-hidden" id="contact">
      
      {/* ===== Cinematic Watermark ===== */}
      <motion.h1
        animate={{ y: [0, -20, 0] }}
        transition={{ duration: 18, repeat: Infinity, ease: "easeInOut" }}
        className="absolute inset-0 flex items-center justify-center
        text-[18vw] font-bold tracking-tight
        text-white/5 pointer-events-none select-none"
      >
        CONTACT
      </motion.h1>

      {/* Ambient Glow */}
      {!reduceMotion && (
        <motion.div
          style={{ left: glowX, top: glowY }}
          className="pointer-events-none absolute w-175 h-175 -translate-x-1/2 -translate-y-1/2
          bg-[radial-gradient(circle,rgba(99,102,241,0.18),transparent_65%)]"
        />
      )}

      <div
        onMouseMove={(e) => {
          const rect = e.currentTarget.getBoundingClientRect();
          x.set(e.clientX - rect.left);
          y.set(e.clientY - rect.top);
        }}
        className="relative z-10 max-w-7xl mx-auto px-8 py-32 grid grid-cols-1 md:grid-cols-2 gap-20"
      >
        {/* LEFT — TEXT */}
        <div className="flex flex-col justify-center">
          <p className="text-xs uppercase tracking-[0.45em] text-gray-500 mb-10">
            Contact
          </p>

          <h2 className="text-4xl md:text-5xl font-semibold text-white leading-tight">
            Let’s talk about
            <br />
            meaningful work.
          </h2>

          <p className="mt-8 text-lg text-gray-400 max-w-md">
            I collaborate on projects where clarity, craft,
            and long-term impact matter.
          </p>

          <p className="mt-4 text-gray-500">
            If that sounds like you, we should talk.
          </p>
        </div>

        {/* RIGHT — FORM */}
        <motion.form
          onSubmit={handleSubmit}
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="flex flex-col gap-6"
        >
          {["name", "email"].map((field) => (
            <input
              key={field}
              required
              type={field === "email" ? "email" : "text"}
              placeholder={
                field === "name" ? "Your name" : "Email address"
              }
              value={form[field as keyof typeof form]}
              onChange={(e) =>
                setForm({ ...form, [field]: e.target.value })
              }
              className="w-full px-0 py-4 bg-transparent
              border-b border-white/20
              text-white placeholder-gray-500
              outline-none focus:border-white transition"
            />
          ))}

          <textarea
            required
            placeholder="Tell me your message"
            rows={4}
            value={form.message}
            onChange={(e) =>
              setForm({ ...form, message: e.target.value })
            }
            className="w-full px-0 py-4 bg-transparent
            border-b border-white/20
            text-white placeholder-gray-500
            outline-none focus:border-white transition resize-none"
          />

          <motion.button
            whileHover={{ x: 6 }}
            whileTap={{ scale: 0.97 }}
            disabled={status === "loading"}
            className="mt-10 self-start flex items-center gap-4
            text-white text-lg font-medium group"
          >
            <span>
              {status === "sent" ? "Message sent" : "Send message"}
            </span>
            <span className="w-10 h-px bg-white group-hover:w-16 transition-all" />
          </motion.button>
        </motion.form>
      </div>

      {/* ===== FOOTER ===== */}
      <footer className="relative z-10 border-t border-white/10 mt-20 py-10 px-8">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6 text-gray-500 text-sm">
          
          <p>© {new Date().getFullYear()} Suyash Kirdakar. All rights reserved.</p>

          <div className="flex gap-6 text-white/70">
            <a
              href="https://github.com/yourusername"
              target="_blank"
              className="hover:text-white transition"
            >
              <FaGithub size={20} />
            </a>

            <a
              href="https://linkedin.com/in/yourusername"
              target="_blank"
              className="hover:text-white transition"
            >
              <FaLinkedin size={20} />
            </a>

            <a
              href="https://twitter.com/yourusername"
              target="_blank"
              className="hover:text-white transition"
            >
              <FaTwitter size={20} />
            </a>

            <a
              href="https://instagram.com/yourusername"
              target="_blank"
              className="hover:text-white transition"
            >
              <FaInstagram size={20} />
            </a>
          </div>
        </div>
      </footer>
    </section>
  );
}