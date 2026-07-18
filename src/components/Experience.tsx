"use client";
import React from "react";
import { motion } from "framer-motion";
import { Briefcase, Calendar, MapPin } from "lucide-react";

const EXPERIENCES = [
  {
    period: "2024 - Present",
    role: "Lead Creative Technologist",
    company: "Aetheric Labs",
    location: "Mumbai, India (Hybrid)",
    description: "Architecting interactive WebGL experiences and real-time design systems. Spearheading generative AI tooling pipelines for storyboard pre-visualization and movie timeline processing. Collaborating between engineering and film post-production teams.",
    points: [
      "Led design & frontend architecture for WebGL 3D storyboard visualizers.",
      "Spearheaded Next.js and Rust integration, reducing assets compilation times by 40%.",
      "Directed UX research to unify filmmaker scripts and video tracks workflows.",
    ]
  },
  {
    period: "2022 - 2024",
    role: "Senior UI Engineer",
    company: "Linear Flow",
    location: "Remote / San Francisco",
    description: "Developed features for a premium design-to-code web platform. Created high-performance component libraries, optimized DOM render pipelines, and implemented strict WCAG accessibility patterns.",
    points: [
      "Engineered an atomic, headless Design System utilizing Figma Token APIs.",
      "Optimized canvas-based vector editing performance, increasing frame rates to 60 FPS.",
      "Mentored junior developers on motion choreography and scroll animation states.",
    ]
  },
  {
    period: "2020 - 2022",
    role: "Creative Developer & Director",
    company: "Freelance / Independent Studio",
    location: "New Delhi, India",
    description: "Directed and post-produced short cinematic films while designing and coding custom high-end portfolios, startup landings, and interactive web tools for international clients.",
    points: [
      "Directed 3 award-winning short films, handling color grading and sound design.",
      "Developed bespoke React + GSAP marketing sites, winning two Awwwards Honors.",
      "Constructed client web portals with custom SVG/canvas animations.",
    ]
  },
  {
    period: "2018 - 2020",
    role: "Full Stack Developer",
    company: "Digital Studio Inc.",
    location: "Bengaluru, India",
    description: "Created high-load Node.js servers, implemented real-time communication systems, and engineered pixel-perfect frontends for digital branding campaigns.",
    points: [
      "Built low-latency WebSocket communication services for interactive kiosk systems.",
      "Optimized PostgreSQL database schemas, improving query response speeds by 25%.",
      "Integrated secure payment gateways and OAuth third-party user auth services.",
    ]
  },
];

export default function Experience() {
  return (
    <section id="experience" className="relative py-24 md:py-32 bg-[#ffffff] text-[#050505] z-10">
      <div className="max-w-4xl mx-auto px-6 md:px-12">
        
        {/* Section Header */}
        <div className="mb-20 text-center">
          <motion.span
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 0.6, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-xs uppercase font-bold tracking-[0.25em] text-[#0070f3]"
          >
            The Journey
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1, duration: 0.6 }}
            className="text-3xl md:text-5xl font-heading font-extrabold text-slate-950 mt-2"
          >
            Experience Timeline
          </motion.h2>
          <div className="w-12 h-1 bg-[#0070f3] mt-4 rounded-full mx-auto" />
        </div>

        {/* Timeline Container */}
        <div className="relative">
          {/* Vertical Line */}
          <div 
            className="absolute left-4 md:left-8 top-2 bottom-2 w-[2px] pointer-events-none" 
            style={{ background: 'linear-gradient(to bottom, rgba(0, 112, 243, 0.4) 0%, rgba(121, 40, 202, 0.4) 50%, rgba(0,0,0,0.05) 100%)' }}
          />

          {/* Timeline Items */}
          <div className="space-y-12">
            {EXPERIENCES.map((exp, idx) => (
              <div key={idx} className="relative pl-10 md:pl-20 group">
                
                {/* Glowing Glass Node */}
                <motion.div
                  initial={{ scale: 0.8, opacity: 0 }}
                  whileInView={{ scale: 1, opacity: 1 }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{ delay: 0.1, duration: 0.5 }}
                  className="absolute left-[9px] md:left-[25px] top-1.5 w-4 h-4 rounded-full bg-white border-2 border-[#0070f3] shadow-[0_0_10px_rgba(0,112,243,0.3)] group-hover:scale-125 group-hover:border-[#7928ca] group-hover:shadow-[0_0_15px_rgba(121,40,202,0.4)] transition-all duration-300 z-10"
                />

                {/* Content Glass Card */}
                <motion.div
                  initial={{ opacity: 0, x: 30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
                  className="glass-card-light p-6 md:p-8 rounded-[28px] border border-black/5 relative overflow-hidden"
                >
                  {/* Subtle corner light */}
                  <div className="absolute top-0 right-0 w-24 h-24 rounded-full bg-[#0070f3]/3 filter blur-2xl pointer-events-none" />

                  {/* Header Details */}
                  <div className="flex flex-col md:flex-row md:items-center justify-between gap-2 mb-4">
                    <div>
                      <span className="text-xs font-bold text-[#0070f3] tracking-wide uppercase flex items-center gap-1.5 mb-1.5">
                        <Calendar className="w-3.5 h-3.5" />
                        {exp.period}
                      </span>
                      <h3 className="text-xl md:text-2xl font-heading font-extrabold text-slate-900">
                        {exp.role}
                      </h3>
                    </div>
                    
                    <div className="text-left md:text-right">
                      <span className="text-sm font-semibold text-slate-800 block">
                        {exp.company}
                      </span>
                      <span className="text-xs text-slate-500 flex items-center md:justify-end gap-1 mt-1">
                        <MapPin className="w-3 h-3 text-slate-400" />
                        {exp.location}
                      </span>
                    </div>
                  </div>

                  {/* Description */}
                  <p className="text-slate-600 text-xs md:text-sm leading-relaxed mb-5 font-normal">
                    {exp.description}
                  </p>

                  {/* Key points */}
                  <ul className="space-y-2">
                    {exp.points.map((pt, pIdx) => (
                      <li key={pIdx} className="text-xs text-slate-600 flex items-start gap-2 leading-relaxed font-medium">
                        <span className="w-1.5 h-1.5 bg-[#7928ca] rounded-full mt-1.5 shrink-0" />
                        <span>{pt}</span>
                      </li>
                    ))}
                  </ul>

                </motion.div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}
