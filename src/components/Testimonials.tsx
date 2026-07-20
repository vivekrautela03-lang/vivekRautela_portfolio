"use client";
import React, { useRef } from "react";
import { motion } from "framer-motion";
import { Heart, MessageCircle, Send, Bookmark, MoreHorizontal, ChevronLeft, ChevronRight } from "lucide-react";

export default function Testimonials() {
  const scrollRef = useRef<HTMLDivElement>(null);

  // Generate 14 blank cards
  const totalScreens = Array.from({ length: 14 }, (_, i) => i + 1);

  const scroll = (direction: "left" | "right") => {
    if (scrollRef.current) {
      const { scrollLeft, clientWidth } = scrollRef.current;
      const scrollTo = direction === "left" ? scrollLeft - clientWidth * 0.8 : scrollLeft + clientWidth * 0.8;
      scrollRef.current.scrollTo({ left: scrollTo, behavior: "smooth" });
    }
  };

  return (
    <section id="testimonials" className="relative py-24 md:py-32 bg-[#ffffff] text-[#050505] z-10 overflow-hidden">
      
      {/* Floating Neon Color Orbs Behind the Carousel for Glassmorphic Blur Effect */}
      <div className="absolute top-[20%] left-[10%] w-[300px] h-[300px] rounded-full bg-[#ff0055]/6 filter blur-[100px] animate-pulse pointer-events-none" />
      <div className="absolute bottom-[20%] right-[10%] w-[350px] h-[350px] rounded-full bg-[#ff00aa]/6 filter blur-[120px] animate-pulse pointer-events-none" />
      <div className="absolute top-[50%] left-[45%] w-[250px] h-[250px] rounded-full bg-[#7928ca]/8 filter blur-[95px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
        
        {/* Section Header */}
        <div className="mb-16 text-center">
          <motion.span
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 0.6, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-xs uppercase font-bold tracking-[0.25em] text-[#0070f3]"
          >
            Creative Frames
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1, duration: 0.6 }}
            className="text-3xl md:text-5xl font-heading font-extrabold text-slate-950 mt-2"
          >
            Glassmorphic Feed
          </motion.h2>
          <div className="w-12 h-1 bg-[#0070f3] mt-4 rounded-full mx-auto" />
        </div>

        {/* Carousel Slider Wrapper */}
        <div className="relative group">
          
          {/* Navigation Controls (Desktop only) */}
          <button
            onClick={() => scroll("left")}
            className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 z-25 p-3 rounded-full bg-white/80 border border-black/[0.08] shadow-md hover:bg-white hover:scale-105 transition-all opacity-0 group-hover:opacity-100 hidden md:flex items-center justify-center cursor-pointer"
            aria-label="Scroll left"
          >
            <ChevronLeft className="w-5 h-5 text-slate-700" />
          </button>
          
          <button
            onClick={() => scroll("right")}
            className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 z-25 p-3 rounded-full bg-white/80 border border-black/[0.08] shadow-md hover:bg-white hover:scale-105 transition-all opacity-0 group-hover:opacity-100 hidden md:flex items-center justify-center cursor-pointer"
            aria-label="Scroll right"
          >
            <ChevronRight className="w-5 h-5 text-slate-700" />
          </button>

          {/* Swipe Container */}
          <div
            ref={scrollRef}
            className="flex flex-row overflow-x-auto snap-x snap-mandatory [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none] gap-6 pb-8 pt-4 px-2"
          >
            {totalScreens.map((num) => (
              <motion.div
                key={num}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true, margin: "-20px" }}
                transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                className="w-[290px] md:w-[330px] shrink-0 snap-center"
              >
                {/* Premium Transparent Glassmorphic Instagram Post Card */}
                <div 
                  className="rounded-[28px] border border-white/60 bg-white/20 p-4 shadow-[0_8px_32px_0_rgba(31,38,135,0.04)] flex flex-col relative overflow-hidden backdrop-blur-2xl transition-all duration-[0.5s] ease-out hover:-translate-y-1.5 hover:shadow-[0_20px_50px_-10px_rgba(0,0,0,0.08)] group"
                  style={{
                    boxShadow: "0 8px 32px 0 rgba(31, 38, 135, 0.04), inset 0 1px 1px rgba(255, 255, 255, 0.8)",
                  }}
                >
                  {/* Glowing color gradient overlay - fades in on hover/touch */}
                  <div className="absolute inset-0 bg-gradient-to-tr from-[#ff0055]/5 via-[#7928ca]/3 to-[#0070f3]/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
                  
                  {/* Subtle top glare glow */}
                  <div className="absolute inset-0 bg-gradient-to-b from-white/[0.6] to-transparent pointer-events-none" />

                  {/* 1. Header (User Info) */}
                  <div className="relative z-10 flex items-center justify-between mb-3 select-none">
                    <div className="flex items-center gap-2.5">
                      {/* Avatar Placeholder */}
                      <div className="w-8 h-8 rounded-full bg-black/[0.04] border border-black/[0.06] flex items-center justify-center text-slate-500 group-hover:bg-gradient-to-tr group-hover:from-[#ff0055]/10 group-hover:to-[#0070f3]/10 transition-colors duration-300">
                        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
                        </svg>
                      </div>
                      <div className="text-left">
                        <p className="text-xs font-extrabold text-slate-900 tracking-wide group-hover:text-black transition-colors duration-300">user_name</p>
                        <p className="text-[9px] text-slate-400 font-semibold">Screen {num} of 14</p>
                      </div>
                    </div>
                    <button className="text-slate-400 hover:text-slate-800 transition-colors">
                      <MoreHorizontal className="w-4 h-4" />
                    </button>
                  </div>

                  {/* 2. Main Blank Glassmorphic Image Area */}
                  <div className="relative aspect-square w-full rounded-xl border border-black/[0.04] bg-black/[0.01] backdrop-blur-md overflow-hidden flex items-center justify-center mb-4 select-none group-hover:bg-gradient-to-tr group-hover:from-[#ff0055]/5 group-hover:to-[#0070f3]/5 group-hover:border-[#ff0055]/10 transition-all duration-500">
                    {/* Inner glossy light shine */}
                    <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/[0.1] to-white/[0.3] group-hover:scale-105 transition-transform duration-500" />
                    
                    {/* Visual watermark indicating the empty screen */}
                    <div className="text-center p-6 flex flex-col items-center relative z-10">
                      <div className="w-12 h-12 rounded-full border border-black/[0.05] bg-white flex items-center justify-center text-slate-400 shadow-sm mb-3 font-heading font-black text-sm group-hover:text-[#0070f3] group-hover:border-[#0070f3]/20 transition-all duration-500">
                        {num}
                      </div>
                      <p className="text-[10px] tracking-wider uppercase font-bold text-slate-450 group-hover:text-slate-500 transition-colors duration-500">Frosted Glass Area</p>
                    </div>
                  </div>

                  {/* 3. Footer (Actions & Engagement) */}
                  <div className="relative z-10 flex flex-col text-left">
                    {/* Icons Bar */}
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center gap-3.5 text-slate-500">
                        <button className="hover:text-[#ff0055] hover:scale-115 group-hover:text-[#ff0055] transition-all duration-300"><Heart className="w-4 h-4" /></button>
                        <button className="hover:text-[#7928ca] hover:scale-115 group-hover:text-[#7928ca] transition-all duration-300"><MessageCircle className="w-4 h-4" /></button>
                        <button className="hover:text-[#0070f3] hover:scale-115 group-hover:text-[#0070f3] transition-all duration-300"><Send className="w-4 h-4" /></button>
                      </div>
                      
                      {/* Dots Indicator */}
                      <div className="flex gap-1">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#0070f3] opacity-80" />
                        <span className="w-1.5 h-1.5 rounded-full bg-black/10" />
                      </div>

                      <button className="text-slate-500 hover:text-amber-500 hover:scale-115 group-hover:text-slate-700 transition-all duration-300">
                        <Bookmark className="w-4 h-4" />
                      </button>
                    </div>

                    {/* Engagement text */}
                    <p className="text-[11px] font-extrabold text-slate-900 mb-1 select-none">482 likes</p>
                    
                    <p className="text-[10px] text-slate-750 leading-relaxed font-normal mb-1">
                      <span className="font-extrabold text-slate-900 mr-1.5">user_name</span>
                      Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                    </p>
                    
                    {/* Hashtags */}
                    <p className="text-[9px] text-[#0070f3] font-bold mb-1.5 group-hover:text-[#ff0055] transition-colors duration-500">
                      #glassmorphism #carousel #blankcard
                    </p>

                    <button className="text-[9px] text-slate-400 font-bold mb-1 text-left hover:text-slate-600 select-none">
                      View all 7 comments
                    </button>
                    
                    <span className="text-[8px] text-slate-400 uppercase font-bold tracking-wider select-none">
                      4 hours ago
                    </span>
                  </div>

                </div>
              </motion.div>
            ))}
          </div>

        </div>

      </div>
    </section>
  );
}
