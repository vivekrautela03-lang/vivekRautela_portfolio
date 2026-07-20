"use client";
import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";

const GithubIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4">
    <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
    <path d="M9 18c-4.51 2-5-2-7-2" />
  </svg>
);

const PROJECTS = [
  {
    title: "TOV Studio",
    category: "Filmmaking OS",
    subtitle: "The Operating System for Modern Filmmaking",
    description: "From concept to final delivery, TOV Studio streamlines every stage of production with AI-powered planning, collaborative workspaces, intelligent project management, crew coordination, and cinematic workflow automation—helping creative teams build faster, collaborate smarter, and produce exceptional stories.",
    image: "/images/tov_studio.png",
    demoLink: "https://tov-studio.vercel.app",
    githubLink: "https://github.com/vivekrautela03-lang/Tov_studio",
    highlights: [
      "🤖 AI Production Assistant",
      "🎬 Storyboarding & Script Workspace",
      "👥 Crew & Project Collaboration",
      "💬 Real-Time Messaging",
      "📁 Asset & File Management",
      "📅 Production Scheduling",
      "🔔 Live Notifications",
      "🔐 Secure Authentication",
      "📱 Responsive Glassmorphic UI"
    ],
    technologies: ["Next.js", "React", "TypeScript", "Supabase", "Tailwind CSS", "Framer Motion"]
  },
  {
    title: "TheOldverse Website",
    category: "Creative Studio",
    subtitle: "TheOldverse – Production House Website",
    description: "A cinematic glassmorphism website showcasing films, creative projects, founders, and interactive storytelling with immersive animations.",
    image: "/images/theoldverse_web.png",
    demoLink: "https://www.theoldverse-productions.in/",
    githubLink: "https://github.com/vivekrautela03-lang/theoldverse_production",
    highlights: [
      "🎬 Film & Project Showcases",
      "✨ Premium Glassmorphic Design",
      "🌀 GSAP & ScrollTrigger Animations",
      "👥 Founders & Team Spotlights",
      "📱 Highly Responsive Layouts",
      "🚀 Ultra-Fast Server Renderings"
    ],
    technologies: ["Next.js", "Tailwind CSS", "GSAP", "Framer Motion", "Vercel"]
  },
  {
    title: "Nirmala Sweets",
    category: "Food & E-Commerce",
    subtitle: "Premium Mithai & Catering Platform",
    description: "A modern e-commerce experience designed for one of Dehradun's trusted sweet brands. The platform combines elegant storytelling, premium product presentation, online ordering, festive promotions, and catering services into a fast, responsive shopping experience inspired by luxury Indian confectionery brands.",
    image: "/images/nirmala_sweets.png",
    demoLink: "https://mithai-premium-19.preview.emergentagent.com/?utm_source=share",
    githubLink: "https://github.com/vivekrautela03-lang",
    highlights: [
      "🛒 Online Sweet Ordering",
      "🎉 Festival & Seasonal Offers",
      "🍰 Premium Product Showcase",
      "🚚 Fast Delivery Experience",
      "🍽️ Catering Booking System",
      "📱 Fully Responsive Design",
      "✨ Modern Luxury UI",
      "⚡ Optimized Performance"
    ],
    technologies: ["Next.js", "React", "TypeScript", "Tailwind CSS", "Framer Motion"]
  }
];

export default function Projects() {
  return (
    <section id="projects" className="relative py-24 md:py-32 bg-[#ffffff] text-[#050505] z-10">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        
        {/* Section Header */}
        <div className="mb-20 flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div>
            <motion.span
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 0.6, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="text-xs uppercase font-bold tracking-[0.25em] text-[#0070f3]"
            >
              The Showcase
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
            className="text-slate-655 text-sm md:text-base max-w-md leading-relaxed font-normal"
          >
            A curated showcase of interactive digital platforms built for film production, workflow orchestration, gourmet confectionery, and e-commerce.
          </motion.p>
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {PROJECTS.map((project, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-30px" }}
              transition={{ delay: idx * 0.15, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              className="relative rounded-[36px] overflow-hidden border border-black/5 bg-white/45 backdrop-blur-md shadow-lg p-6 flex flex-col justify-between h-full hover:shadow-xl transition-all duration-500 group"
            >
              {/* Subtle reflection overlay */}
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/15 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-out pointer-events-none z-20" />
              
              <div>
                {/* Mockup Image Container */}
                <div className="relative aspect-[16/10] w-full rounded-2xl overflow-hidden border border-black/[0.06] shadow-sm bg-black/[0.01] mb-6">
                  <Image
                    src={project.image}
                    alt={project.title}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 380px"
                    className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.03]"
                    priority={idx === 0}
                  />
                  <div className="absolute top-4 left-4 z-10">
                    <span className="text-[9px] uppercase font-bold tracking-wider px-3.5 py-1.5 rounded-full bg-white/85 border border-black/10 backdrop-blur-md text-slate-700">
                      {project.category}
                    </span>
                  </div>
                </div>

                {/* Project Titles */}
                <h3 className="font-heading font-black text-xl text-slate-900 mb-1 group-hover:text-[#0070f3] transition-colors duration-300">
                  {project.title}
                </h3>
                
                <p className="text-[10px] md:text-xs font-bold tracking-wide text-slate-500 uppercase mb-4">
                  {project.subtitle}
                </p>
                
                {/* Description */}
                <p className="text-slate-650 text-xs md:text-sm leading-relaxed mb-6 font-normal">
                  {project.description}
                </p>

                {/* Highlights Grid */}
                <div className="grid grid-cols-1 gap-2 mb-6">
                  {project.highlights.slice(0, 6).map((hl, hlIdx) => (
                    <div key={hlIdx} className="flex items-center gap-2 text-[10px] sm:text-xs text-slate-700 font-semibold">
                      <span className="flex-shrink-0">{hl.split(" ")[0]}</span>
                      <span>{hl.substring(hl.indexOf(" ") + 1)}</span>
                    </div>
                  ))}
                  {project.highlights.length > 6 && (
                    <div className="text-[9px] text-slate-400 font-bold uppercase tracking-wider pl-6 mt-1">
                      + {project.highlights.length - 6} more capabilities
                    </div>
                  )}
                </div>

                {/* Tech Pills */}
                <div className="flex flex-wrap gap-1.5 mb-8">
                  {project.technologies.map((tech, techIdx) => (
                    <span
                      key={techIdx}
                      className="text-[10px] px-3 py-1 rounded-md bg-black/[0.02] border border-black/[0.04] text-slate-600 font-bold"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>

              {/* Action Buttons Row */}
              <div className="flex items-center justify-between border-t border-black/[0.06] pt-6 mt-auto">
                <a
                  href={project.githubLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1.5 text-xs text-slate-600 hover:text-black transition-colors duration-300 font-bold cursor-pointer"
                >
                  <GithubIcon />
                  Codebase
                </a>
                
                <a
                  href={project.demoLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1 text-xs text-[#0070f3] hover:text-black transition-colors duration-300 font-bold group/link cursor-pointer"
                >
                  Live Demo
                  <ArrowUpRight className="w-4 h-4 group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5 transition-transform" />
                </a>
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}
