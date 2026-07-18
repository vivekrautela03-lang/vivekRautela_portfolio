"use client";
import React, { useRef, useState } from "react";
import { motion } from "framer-motion";
import {
  Code,
  Server,
  Layers,
  Video,
  Scissors,
  Sparkles,
  Cpu,
} from "lucide-react";

const SKILL_CATEGORIES = [
  {
    title: "Frontend Engineering",
    icon: Code,
    skills: ["React", "Next.js", "TypeScript", "Tailwind CSS", "Framer Motion", "WebGL/Three.js"],
    glowColor: "rgba(0, 112, 243, 0.2)",
    borderColor: "rgba(0, 112, 243, 0.15)",
    accentText: "text-[#0070f3]",
  },
  {
    title: "Backend & Systems",
    icon: Server,
    skills: ["Node.js", "Express.js", "PostgreSQL", "MongoDB", "GraphQL", "RESTful APIs"],
    glowColor: "rgba(0, 163, 137, 0.2)",
    borderColor: "rgba(0, 163, 137, 0.15)",
    accentText: "text-[#00a389]",
  },
  {
    title: "UI/UX Design",
    icon: Layers,
    skills: ["Figma", "Design Systems", "Interactive Prototyping", "User Research", "Wireframing"],
    glowColor: "rgba(214, 0, 111, 0.2)",
    borderColor: "rgba(214, 0, 111, 0.15)",
    accentText: "text-[#d6006f]",
  },
  {
    title: "Filmmaking & Direction",
    icon: Video,
    skills: ["Cinematography", "Creative Direction", "Screenwriting", "Lighting Design", "Camera Op"],
    glowColor: "rgba(217, 119, 6, 0.2)",
    borderColor: "rgba(217, 119, 6, 0.15)",
    accentText: "text-[#d97706]",
  },
  {
    title: "Editing & Post",
    icon: Scissors,
    skills: ["DaVinci Resolve", "Premiere Pro", "Color Grading (HDR)", "Sound Design", "VFX"],
    glowColor: "rgba(220, 38, 38, 0.2)",
    borderColor: "rgba(220, 38, 38, 0.15)",
    accentText: "text-[#dc2626]",
  },
  {
    title: "Motion & Interactive",
    icon: Sparkles,
    skills: ["After Effects", "Cinema 4D", "SVG Animations", "Spline 3D", "Lottie Web"],
    glowColor: "rgba(121, 40, 202, 0.2)",
    borderColor: "rgba(121, 40, 202, 0.15)",
    accentText: "text-[#7928ca]",
  },
  {
    title: "AI & Modern Tools",
    icon: Cpu,
    skills: ["Prompt Engineering", "Midjourney/SD", "Runway Gen-3", "LLM Integration", "Copilot/Cursor"],
    glowColor: "rgba(81, 45, 168, 0.2)",
    borderColor: "rgba(81, 45, 168, 0.15)",
    accentText: "text-[#512da8]",
  },
];

function SkillCard({ category, idx }: { category: typeof SKILL_CATEGORIES[0]; idx: number }) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const [shine, setShine] = useState({ x: 50, y: 50 });
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const card = cardRef.current;
    if (!card) return;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const xc = rect.width / 2;
    const yc = rect.height / 2;

    // Angle limits (-12deg to 12deg)
    const angleX = (yc - y) / 8;
    const angleY = (x - xc) / 8;

    // Shine coordinates (percentage)
    const shineX = (x / rect.width) * 100;
    const shineY = (y / rect.height) * 100;

    setTilt({ x: angleX, y: angleY });
    setShine({ x: shineX, y: shineY });
  };

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    setTilt({ x: 0, y: 0 });
  };

  return (
    <motion.div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ delay: idx * 0.08, duration: 0.6 }}
      style={{
        transform: isHovered
          ? `perspective(1000px) rotateX(${tilt.x}deg) rotateY(${tilt.y}deg) scale3d(1.02, 1.02, 1.02)`
          : "perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)",
        transition: isHovered ? "none" : "all 0.5s cubic-bezier(0.16, 1, 0.3, 1)",
      }}
      className="relative glass-card-light rounded-[28px] p-7 border border-black/5 overflow-hidden group cursor-pointer h-full"
    >
      {/* Glow highlight */}
      <div
        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none filter blur-2xl"
        style={{
          background: `radial-gradient(circle at ${shine.x}% ${shine.y}%, ${category.glowColor} 0%, transparent 60%)`,
        }}
      />

      {/* Shine reflection effect */}
      <div
        className="absolute inset-0 opacity-0 group-hover:opacity-15 transition-opacity duration-300 pointer-events-none z-1"
        style={{
          background: `radial-gradient(circle at ${shine.x}% ${shine.y}%, rgb(255, 255, 255) 0%, transparent 50%)`,
        }}
      />

      {/* Glow border ring */}
      <div
        className="absolute inset-0 border rounded-[28px] opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
        style={{ borderColor: category.borderColor }}
      />

      {/* Card Content */}
      <div className="relative z-10 flex flex-col h-full">
        {/* Header */}
        <div className="flex items-center gap-4 mb-5">
          <div
            className={`p-3 rounded-2xl bg-black/[0.03] border border-black/[0.08] transition-all duration-300 group-hover:bg-black/[0.06]`}
          >
            <category.icon className={`w-5 h-5 text-slate-600 group-hover:scale-110 transition-all duration-300 ${category.accentText}`} />
          </div>
          <h3 className="font-heading font-bold text-lg md:text-xl text-slate-900 group-hover:translate-x-1 transition-transform duration-300">
            {category.title}
          </h3>
        </div>

        {/* Skill Pills */}
        <div className="flex flex-wrap gap-2 mt-auto">
          {category.skills.map((skill, sIdx) => (
            <span
              key={sIdx}
              className="text-xs px-3.5 py-1.5 rounded-full bg-black/[0.02] border border-black/[0.06] text-slate-700 group-hover:text-black group-hover:border-black/[0.12] transition-colors duration-300 font-medium"
            >
              {skill}
            </span>
          ))}
        </div>
      </div>
    </motion.div>
  );
}

export default function Skills() {
  return (
    <section id="skills" className="relative py-24 md:py-32 bg-[#ffffff] text-[#050505] z-10">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        
        {/* Section Header */}
        <div className="mb-16 text-center md:text-left">
          <motion.span
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 0.6, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-xs uppercase font-bold tracking-[0.25em] text-[#0070f3]"
          >
            The Arsenal
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1, duration: 0.6 }}
            className="text-3xl md:text-5xl font-heading font-extrabold text-slate-950 mt-2"
          >
            Skills & Capabilities
          </motion.h2>
          <div className="w-12 h-1 bg-[#0070f3] mt-4 rounded-full mx-auto md:mx-0" />
        </div>

        {/* Skills Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {SKILL_CATEGORIES.map((category, idx) => (
            <div key={idx} className="h-full">
              <SkillCard category={category} idx={idx} />
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
