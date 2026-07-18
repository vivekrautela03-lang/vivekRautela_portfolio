"use client";
import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";

export default function About() {
  return (
    <section id="about" className="relative py-24 md:py-32 bg-[#050505] z-10">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        
        {/* Section Header */}
        <div className="mb-16 text-center md:text-left">
          <motion.span
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 0.6, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-xs uppercase font-bold tracking-[0.25em] text-[#00d2ff]"
          >
            The Architect
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1, duration: 0.6 }}
            className="text-3xl md:text-5xl font-heading font-extrabold text-white mt-2"
          >
            About Me
          </motion.h2>
          <div className="w-12 h-1 bg-[#00d2ff] mt-4 rounded-full mx-auto md:mx-0" />
        </div>

        {/* Split Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          
          {/* Left: Professional image inside floating glass frame */}
          <div className="lg:col-span-5 flex justify-center">
            <motion.div
              initial={{ opacity: 0, scale: 0.95, rotate: -3 }}
              whileInView={{ opacity: 1, scale: 1, rotate: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="relative w-full max-w-[360px] aspect-[4/5] rounded-[32px] group cursor-pointer"
            >
              {/* Outer Glowing Background Layer */}
              <div className="absolute inset-0 bg-gradient-to-tr from-[#00d2ff]/20 to-[#9d4edd]/20 rounded-[32px] filter blur-xl opacity-50 group-hover:opacity-85 transition-opacity duration-500" />
              
              {/* Glass Frame Borders */}
              <div className="absolute -inset-2 border border-white/10 rounded-[36px] pointer-events-none group-hover:scale-[1.03] group-hover:-rotate-2 transition-all duration-500" />
              <div className="absolute -inset-4 border border-white/[0.03] rounded-[40px] pointer-events-none group-hover:scale-[1.05] group-hover:rotate-1 transition-all duration-500" />

              {/* Core Image Container */}
              <div className="relative w-full h-full rounded-[32px] overflow-hidden border border-white/15 glass-panel p-2 shadow-2xl">
                <div className="relative w-full h-full rounded-[24px] overflow-hidden">
                  <Image
                    src="https://res.cloudinary.com/qia3rzqk/image/upload/v1784388405/WhatsApp_Image_2026-07-18_at_8.55.51_PM_jxmiws.jpg"
                    alt="Vivek Rautela portrait"
                    fill
                    sizes="(max-width: 768px) 100vw, 360px"
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                    priority
                  />
                  {/* Subtle glass reflection overlay */}
                  <div className="absolute inset-0 bg-gradient-to-tr from-[#050505]/60 via-transparent to-white/10" />
                </div>
              </div>
            </motion.div>
          </div>

          {/* Right: About Text & Stats */}
          <div className="lg:col-span-7 text-center md:text-left">
            <motion.h3
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="text-xl md:text-2xl font-heading font-semibold text-white mb-6 leading-relaxed"
            >
              Blending cinema, design, and AI engineering into unforgettable digital experiences.
            </motion.h3>

            <motion.div
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1, duration: 0.6 }}
              className="text-slate-300 space-y-5 text-sm md:text-base leading-relaxed font-normal"
            >
              <p>
                I'm Vivek Rautela, a multidisciplinary creator driven by the belief that technology should inspire emotion. As an AI Engineer, Full-Stack Developer, Filmmaker, and UI/UX Designer, I create intelligent digital experiences where engineering precision meets cinematic storytelling. Every product I build combines innovation, creativity, and thoughtful design to leave a lasting impact.
              </p>
              <p>
                From immersive portfolio experiences and AI-powered applications to short films and digital brands, I craft work that is visually refined, technically robust, and deeply human. Every interface, animation, and interaction is designed with intention—turning ideas into experiences people don't just use, but remember.
              </p>
              <p className="text-white font-medium pt-2">
                My mission is simple: build the future where technology feels like art.
              </p>
            </motion.div>
          </div>

        </div>

      </div>
    </section>
  );
}
