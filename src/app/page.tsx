"use client";
import React from "react";
import { ReactLenis } from "lenis/react";
import Navbar from "../components/Navbar";
import BackgroundEffects from "../components/BackgroundEffects";
import CustomCursor from "../components/CustomCursor";
import Hero from "../components/Hero";
import About from "../components/About";
import Skills from "../components/Skills";
import Projects from "../components/Projects";
import Experience from "../components/Experience";
import Testimonials from "../components/Testimonials";
import Contact from "../components/Contact";
import Footer from "../components/Footer";

export default function Home() {
  return (
    <ReactLenis root>
      {/* Custom Mouse Interactions */}
      <CustomCursor />

      {/* Cinematic animated lights, blobs and film grain */}
      <BackgroundEffects />

      {/* Main Structural Wrapper */}
      <div className="relative min-h-screen flex flex-col bg-[#050505] overflow-x-hidden selection:bg-[#00d2ff]/20 selection:text-[#00d2ff]">
        
        {/* Transparent Sticky Navbar */}
        <Navbar />

        {/* Section Contents */}
        <main className="flex-1 flex flex-col relative z-10 w-full">
          <Hero />
          <About />
          <Skills />
          <Projects />
          <Experience />
          <Testimonials />
          <Contact />
        </main>

        {/* Minimal Glass Footer */}
        <Footer />
        
      </div>
    </ReactLenis>
  );
}
