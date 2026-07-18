"use client";
import React from "react";
import { motion } from "framer-motion";
import { Cpu, Video, Layers } from "lucide-react";

const SKILL_CATEGORIES = [
  {
    title: "AI & Modern Tools",
    icon: Cpu,
    skills: [
      "Prompt Engineering",
      "ChatGPT / GPT APIs",
      "Claude AI",
      "Gemini AI",
      "Cursor AI",
      "GitHub Copilot",
      "LangChain",
      "n8n Automation",
      "Runway Gen-3",
      "Midjourney",
      "Stable Diffusion",
      "LLM Integration",
      "AI Agents",
      "RAG Systems"
    ],
  },
  {
    title: "Filmmaking & Direction",
    icon: Video,
    skills: [
      "Film Direction",
      "Creative Direction",
      "Screenwriting",
      "Storyboarding",
      "Cinematography",
      "Camera Operation",
      "Lighting Design",
      "Shot Composition",
      "Production Planning",
      "Video Editing",
      "Color Grading (DaVinci Resolve)",
      "Sound Design"
    ],
  },
  {
    title: "UI/UX Design",
    icon: Layers,
    skills: [
      "Figma",
      "UI Design",
      "UX Design",
      "Wireframing",
      "Interactive Prototyping",
      "Design Systems",
      "User Research",
      "Responsive Design",
      "Glassmorphism Design",
      "Motion UI"
    ],
  },
];

export default function Skills() {
  return (
    <section id="skills" className="relative py-24 md:py-32 bg-[#050505] z-10">
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
            The Arsenal
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1, duration: 0.6 }}
            className="text-3xl md:text-5xl font-heading font-extrabold text-white mt-2"
          >
            Skills & Capabilities
          </motion.h2>
          <div className="w-12 h-1 bg-[#00d2ff] mt-4 rounded-full mx-auto md:mx-0" />
        </div>

        {/* Skills Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {SKILL_CATEGORIES.map((category, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-30px" }}
              transition={{ delay: idx * 0.15, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              className="h-full"
            >
              <div 
                className="relative rounded-[24px] p-6 md:p-8 overflow-hidden group cursor-pointer h-full transition-all duration-500 ease-out hover:-translate-y-2 hover:scale-[1.02] hover:border-white/20 hover:border-t-white/30 hover:shadow-[0_25px_50px_-12px_rgba(0,0,0,0.85),_0_0_20px_rgba(0,112,243,0.12)] flex flex-col"
                style={{
                  background: "rgba(15, 15, 15, 0.45)",
                  backdropFilter: "blur(20px)",
                  WebkitBackdropFilter: "blur(20px)",
                  border: "1px solid rgba(255, 255, 255, 0.08)",
                  borderTop: "1px solid rgba(255, 255, 255, 0.18)",
                  boxShadow: "0 15px 35px -10px rgba(0, 0, 0, 0.6)",
                }}
              >
                {/* Subtle top glossy overlay */}
                <div className="absolute inset-0 bg-gradient-to-b from-white/[0.03] to-transparent pointer-events-none" />

                {/* Card Content */}
                <div className="relative z-10 flex flex-col h-full">
                  {/* Header */}
                  <div className="flex items-center gap-4 mb-6">
                    <div className="p-3 rounded-2xl bg-white/[0.03] border border-white/[0.08] text-white/70 group-hover:text-white transition-all duration-300">
                      <category.icon className="w-5 h-5 transition-transform duration-500 group-hover:scale-110" />
                    </div>
                    <h3 className="font-heading font-bold text-lg md:text-xl text-white group-hover:translate-x-1 transition-transform duration-300">
                      {category.title}
                    </h3>
                  </div>

                  {/* Skill Pills */}
                  <div className="flex flex-wrap gap-3 mt-auto">
                    {category.skills.map((skill, sIdx) => (
                      <span
                        key={sIdx}
                        className="text-xs px-4 py-2 rounded-full bg-white/[0.03] border border-white/[0.06] text-[#B8B8B8] font-medium transition-colors duration-300 hover:text-white hover:bg-white/[0.08] hover:border-white/[0.12]"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}
