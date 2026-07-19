"use client";
import React from "react";
import { motion } from "framer-motion";
import { Award, ShieldCheck, Sparkles } from "lucide-react";

export default function Experience() {
  return (
    <section id="experience" className="relative py-24 md:py-32 bg-[#ffffff] text-[#050505] z-10">
      {/* Subtle light background blobs */}
      <div className="absolute top-1/2 left-1/4 -translate-x-1/2 -translate-y-1/2 w-[350px] h-[350px] bg-[#0070f3]/2 rounded-full filter blur-[80px] pointer-events-none" />
      
      <div className="max-w-4xl mx-auto px-6 md:px-12 relative z-10">
        
        {/* Section Header */}
        <div className="mb-16 text-center">
          <motion.span
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 0.6, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-xs uppercase font-bold tracking-[0.25em] text-[#0070f3] flex items-center justify-center gap-1.5"
          >
            <Award className="w-3.5 h-3.5" />
            The Honors
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1, duration: 0.6 }}
            className="text-3xl md:text-5xl font-heading font-extrabold text-slate-950 mt-2"
          >
            Achievements & Certificates
          </motion.h2>
          <div className="w-12 h-1 bg-[#0070f3] mt-4 rounded-full mx-auto" />
        </div>

        {/* Blank Placeholder State (Wait for user upload) */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="relative rounded-[32px] border-2 border-dashed border-black/[0.08] bg-black/[0.01] hover:bg-black/[0.02] p-12 md:p-20 text-center transition-all duration-300"
        >
          {/* Decorative glowing gradient inside */}
          <div className="absolute inset-0 bg-gradient-to-tr from-[#0070f3]/2 to-[#7928ca]/2 rounded-[30px] opacity-40 pointer-events-none" />
          
          <div className="relative z-10 max-w-md mx-auto flex flex-col items-center">
            {/* Certificate Icon Box */}
            <div className="w-16 h-16 rounded-full bg-white border border-black/[0.06] shadow-sm flex items-center justify-center mb-6 relative group">
              <ShieldCheck className="w-8 h-8 text-slate-400 group-hover:text-[#0070f3] transition-colors duration-300" />
              <Sparkles className="w-4 h-4 text-[#0070f3]/60 absolute -top-1 -right-1 animate-pulse" />
            </div>

            <h3 className="font-heading font-bold text-lg md:text-xl text-slate-900 mb-3">
              Achievements Pending Verification
            </h3>
            
            <p className="text-slate-500 text-xs md:text-sm leading-relaxed font-normal mb-8">
              Verified certifications, film awards, and professional credentials will be uploaded shortly.
            </p>

            {/* Subtle premium accent tag */}
            <div className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full border border-black/[0.05] bg-white text-[10px] font-bold uppercase tracking-wider text-slate-500 shadow-sm select-none">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
              Vault Initialized
            </div>
          </div>
        </motion.div>

      </div>
    </section>
  );
}
