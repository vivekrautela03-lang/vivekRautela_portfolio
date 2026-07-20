"use client";
import React from "react";
import { motion } from "framer-motion";
import * as LucideIcons from "lucide-react";
import { supabase } from "../lib/supabase";

const STATIC_SKILL_CATEGORIES = [
  {
    title: "AI & Modern Tools",
    iconName: "Cpu",
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
    iconName: "Video",
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
    iconName: "Layers",
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
  const [skillsList, setSkillsList] = React.useState<any[]>([]);

  const getIconComponent = (name: string) => {
    const Icon = (LucideIcons as any)[name];
    return Icon || LucideIcons.Cpu;
  };

  React.useEffect(() => {
    // Format static categories with real components on load
    const formattedStatic = STATIC_SKILL_CATEGORIES.map(cat => ({
      title: cat.title,
      icon: getIconComponent(cat.iconName),
      skills: cat.skills
    }));
    setSkillsList(formattedStatic);

    const loadSkills = async () => {
      try {
        const { data, error } = await supabase
          .from("skills")
          .select("*")
          .order("created_at", { ascending: true });

        if (!error && data && data.length > 0) {
          const formatted = data.map((s) => ({
            title: s.title,
            icon: getIconComponent(s.icon_name),
            skills: s.skills || []
          }));
          setSkillsList(formatted);
        }
      } catch (err) {
        console.warn("Could not fetch skills from Supabase. Falling back to static data.");
      }
    };
    loadSkills();
  }, []);
  return (
    <section id="skills" className="relative py-24 md:py-32 bg-[#ffffff] z-10">
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
            className="text-3xl md:text-5xl font-heading font-extrabold text-[#050505] mt-2"
          >
            Skills & Capabilities
          </motion.h2>
          <div className="w-12 h-1 bg-[#0070f3] mt-4 rounded-full mx-auto md:mx-0" />
        </div>

        {/* Skills Cards Grid / Horizontal Scroll on Mobile */}
        <div className="flex flex-row overflow-x-auto snap-x snap-mandatory [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none] gap-5 md:grid md:grid-cols-2 lg:grid-cols-3 md:gap-8 pb-6 md:pb-0">
          {skillsList.map((category, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-30px" }}
              transition={{ delay: idx * 0.15, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              className="w-[82vw] sm:w-[350px] shrink-0 snap-center md:w-auto md:shrink h-full"
            >
              <div 
                className="relative rounded-[28px] overflow-hidden group cursor-pointer h-full transition-all duration-[0.65s] ease-out hover:-translate-y-2 hover:shadow-[0_25px_50px_-12px_rgba(0,0,0,0.08)] border border-black/[0.05] bg-white/45 backdrop-blur-md flex flex-col"
              >
                {/* Header (card__header) */}
                <div className="relative h-28 w-full overflow-hidden bg-gradient-to-tr from-[#0070f3]/10 to-[#7928ca]/10 border-b border-black/[0.04]">
                  {/* Panning gradient background overlay */}
                  <div className="absolute inset-0 bg-gradient-to-br from-[#0070f3]/5 to-[#7928ca]/5 opacity-60 group-hover:scale-110 group-hover:blur-md transition-all duration-[0.65s] ease-out" />
                  
                  {/* Profile Figure (card__profile) */}
                  <div className="absolute -bottom-7 left-6 md:left-8">
                    <div className="relative w-14 h-14 rounded-full border-[3px] border-white bg-white shadow-md flex items-center justify-center overflow-hidden">
                      <div className="absolute inset-0 bg-gradient-to-tr from-[#0070f3]/10 to-[#7928ca]/10 opacity-30" />
                      <category.icon className="relative z-10 w-6 h-6 text-[#0070f3] transition-all duration-[0.65s] ease-out group-hover:scale-125 group-hover:rotate-6" />
                    </div>
                  </div>
                </div>

                {/* Body (card__body) */}
                <div className="p-6 md:p-8 pt-9 flex flex-col flex-grow">
                  {/* Title (card__name) */}
                  <h3 className="font-heading font-extrabold text-lg md:text-xl text-[#050505] mb-1 group-hover:text-[#0070f3] transition-colors duration-300">
                    {category.title}
                  </h3>
                  
                  {/* Subtitle (card__job) */}
                  <p className="text-[9px] uppercase font-bold tracking-wider text-slate-400 mb-4">
                    Arsenal & Capabilities
                  </p>

                  {/* Skills (card__bio / skills list) */}
                  <div className="flex flex-wrap gap-2.5 mt-auto pt-2">
                    {category.skills.map((skill: string, sIdx: number) => (
                      <span
                        key={sIdx}
                        className="text-[10px] px-3 py-1.5 rounded-full bg-black/[0.02] border border-black/[0.04] text-slate-700 font-semibold transition-all duration-300 hover:text-white hover:bg-black hover:border-black"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Footer (card__footer) */}
                <div className="px-6 py-4 md:px-8 border-t border-black/[0.03] bg-black/[0.01] flex items-center justify-between">
                  <p className="text-[9px] uppercase tracking-wider font-bold text-slate-400">
                    {category.skills.length} core tags
                  </p>
                  <p className="text-[9px] font-bold text-[#0070f3] group-hover:translate-x-1 transition-transform duration-300">
                    Explore &rarr;
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}
