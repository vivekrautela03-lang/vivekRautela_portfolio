"use client";
import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { ExternalLink, ArrowUpRight } from "lucide-react";

const GithubIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-3.5 h-3.5">
    <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
    <path d="M9 18c-4.51 2-5-2-7-2" />
  </svg>
);

const PROJECTS = [
  {
    title: "Aether - AI Filmmaking Suite",
    category: "AI / Creative Tech",
    description: "A next-generation platform for filmmakers where AI models storyboard concepts, draft script ideas, and pre-compose rough cuts based on timeline metadata.",
    technologies: ["Next.js", "Tauri", "Runway API", "Three.js", "WebAudio API"],
    image: "/images/aether.png",
    demoLink: "https://aether.vivekrautela.com",
    githubLink: "https://github.com",
  },
  {
    title: "Nova - Next-Gen Design System",
    category: "UI/UX / Engineering",
    description: "A headless, token-driven glassmorphic design system engine. Integrates directly with Figma APIs to generate style sheets, React components, and guidelines.",
    technologies: ["React", "TypeScript", "Figma API", "Tailwind CSS", "CSS Modules"],
    image: "/images/nova.png",
    demoLink: "https://nova.vivekrautela.com",
    githubLink: "https://github.com",
  },
  {
    title: "Chronos - Cinematic Editor",
    category: "Desktop / Editor",
    description: "A lightweight timeline cutting application that utilizes audio waveform signature matching to automatically align multicam video files in real-time.",
    technologies: ["Rust", "Tauri", "React", "FFmpeg", "WebAudio API"],
    image: "/images/chronos.png",
    demoLink: "https://chronos.vivekrautela.com",
    githubLink: "https://github.com",
  },
];

export default function Projects() {
  return (
    <section id="projects" className="relative py-24 md:py-32 bg-[#ffffff] text-[#050505] z-10">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        
        {/* Section Header */}
        <div className="mb-16 flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div>
            <motion.span
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 0.6, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="text-xs uppercase font-bold tracking-[0.25em] text-[#0070f3]"
            >
              The Archives
            </motion.span>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1, duration: 0.6 }}
              className="text-3xl md:text-5xl font-heading font-extrabold text-slate-950 mt-2"
            >
              Featured Projects
            </motion.h2>
            <div className="w-12 h-1 bg-[#0070f3] mt-4 rounded-full" />
          </div>
          <motion.p
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 0.8, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="text-slate-600 text-sm md:text-base max-w-md leading-relaxed font-normal"
          >
            A selective showcase of works spanning interactive digital experiences, motion design systems, and post-production utilities.
          </motion.p>
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {PROJECTS.map((project, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ delay: idx * 0.15, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              className="glass-card-light rounded-[32px] overflow-hidden border border-black/5 flex flex-col group relative"
            >
              {/* Shine reflection overlay on hover */}
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-out pointer-events-none z-20" />
              
              {/* Thumbnail Container */}
              <div className="relative aspect-[16/10] w-full overflow-hidden border-b border-black/[0.06]">
                <Image
                  src={project.image}
                  alt={project.title}
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 380px"
                  className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                  priority={idx === 0}
                />
                
                {/* Floating Category Tag */}
                <div className="absolute top-4 left-4 z-10">
                  <span className="text-[10px] uppercase font-bold tracking-wider px-3.5 py-1.5 rounded-full bg-white/80 border border-black/10 backdrop-blur-md text-slate-700">
                    {project.category}
                  </span>
                </div>
              </div>

              {/* Card Body */}
              <div className="p-6 md:p-8 flex flex-col flex-1 relative">
                {/* Subtle backlight glow behind card body */}
                <div className="absolute top-[-50px] right-0 w-24 h-24 rounded-full bg-[#0070f3]/5 filter blur-2xl group-hover:scale-150 transition-all duration-700 pointer-events-none" />

                <h3 className="font-heading font-extrabold text-lg md:text-xl text-slate-900 mb-3 group-hover:text-[#0070f3] transition-colors duration-300">
                  {project.title}
                </h3>
                
                <p className="text-slate-600 text-xs md:text-sm leading-relaxed mb-6 font-normal flex-1">
                  {project.description}
                </p>

                {/* Technology Pills */}
                <div className="flex flex-wrap gap-1.5 mb-6">
                  {project.technologies.map((tech, tIdx) => (
                    <span
                      key={tIdx}
                      className="text-[10px] px-2.5 py-1 rounded-md bg-black/[0.02] border border-black/[0.04] text-slate-600"
                    >
                      {tech}
                    </span>
                  ))}
                </div>

                {/* Footer Links */}
                <div className="flex items-center justify-between border-t border-black/[0.06] pt-5 mt-auto">
                  <a
                    href={project.githubLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-1.5 text-xs text-slate-500 hover:text-black transition-colors duration-300 font-medium cursor-pointer"
                  >
                    <GithubIcon />
                    Codebase
                  </a>
                  
                  <a
                    href={project.demoLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-1.5 text-xs text-[#0070f3] hover:text-black transition-colors duration-300 font-medium group/link cursor-pointer"
                  >
                    Live Demo
                    <ArrowUpRight className="w-3.5 h-3.5 group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5 transition-transform" />
                  </a>
                </div>
              </div>

            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}
