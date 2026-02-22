"use client";

import { useEffect } from "react";
import Hero from "@/sections/Hero";
import About from "@/sections/About";
import Skills from "@/sections/Skills";
import Projects from "@/sections/Projects";
import Contact from "@/sections/Contact";
import Journey from "@/sections/Journey";

export default function Home() {
  useEffect(() => {
    document.body.classList.add("dark");
  }, []);

  return (
    <main>
      <Hero />
      <About />
      <Journey />
      <Skills />
      <Projects />
      <Contact />
    </main>
  );
}
