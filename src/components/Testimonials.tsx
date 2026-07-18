"use client";
import React, { useRef, useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Quote, ChevronLeft, ChevronRight } from "lucide-react";

const TESTIMONIALS = [
  {
    quote: "Vivek's ability to blend high-fidelity motion design with robust frontend architecture is exceptionally rare. He helped us architect our main AI media suite dashboard, raising user engagement by 40% and winning praise for its premium visual feel.",
    author: "Sarah Jenkins",
    role: "VP of Product",
    company: "Aetheric Labs",
  },
  {
    quote: "He didn't just build our marketing platform; he translated our brand into an experience. The cinematic backgrounds, smooth parallax, and micro-interactions feel like entering a studio. Vivek is a master of creative coding.",
    author: "Liam Chen",
    role: "Director of Marketing",
    company: "Chronos Media",
  },
  {
    quote: "An exceptional UI engineer who brings true creative vision. The Figma-integrated design system tokens engine he built has saved our design and developer teams countless hours of handoff friction.",
    author: "Elena Rostova",
    role: "Engineering Lead",
    company: "Linear Flow",
  },
];

export default function Testimonials() {
  const [index, setIndex] = useState(0);
  const [direction, setDirection] = useState(0); // -1 for left, 1 for right

  const slideWidth = 400; // rough width

  const handleNext = () => {
    setDirection(1);
    setIndex((prev) => (prev + 1) % TESTIMONIALS.length);
  };

  const handlePrev = () => {
    setDirection(-1);
    setIndex((prev) => (prev - 1 + TESTIMONIALS.length) % TESTIMONIALS.length);
  };

  return (
    <section id="testimonials" className="relative py-24 md:py-32 bg-[#ffffff] text-[#050505] z-10 overflow-hidden">
      {/* Background glowing blob */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[#7928ca]/5 rounded-full filter blur-[120px] pointer-events-none" />

      <div className="max-w-4xl mx-auto px-6 md:px-12">
        
        {/* Section Header */}
        <div className="mb-16 text-center">
          <motion.span
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 0.6, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-xs uppercase font-bold tracking-[0.25em] text-[#0070f3]"
          >
            Endorsements
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1, duration: 0.6 }}
            className="text-3xl md:text-5xl font-heading font-extrabold text-slate-950 mt-2"
          >
            What Clients Say
          </motion.h2>
          <div className="w-12 h-1 bg-[#0070f3] mt-4 rounded-full mx-auto" />
        </div>

        {/* Carousel Container */}
        <div className="relative min-h-[350px] md:min-h-[280px] flex items-center justify-center">
          
          <AnimatePresence initial={false} custom={direction} mode="wait">
            <motion.div
              key={index}
              custom={direction}
              initial={{ opacity: 0, x: direction > 0 ? 100 : -100, scale: 0.95 }}
              animate={{ opacity: 1, x: 0, scale: 1 }}
              exit={{ opacity: 0, x: direction > 0 ? -100 : 100, scale: 0.95 }}
              transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
              className="glass-card-light p-8 md:p-12 rounded-[32px] border border-black/5 relative overflow-hidden w-full max-w-2xl shadow-2xl mx-auto"
            >
              {/* Giant Quote Icon */}
              <Quote className="absolute top-6 right-8 w-24 h-24 text-black/[0.01] rotate-180 pointer-events-none" />

              <div className="relative z-10 flex flex-col h-full">
                {/* Quote Text */}
                <p className="text-slate-750 text-sm md:text-base italic leading-relaxed mb-8 font-normal">
                  "{TESTIMONIALS[index].quote}"
                </p>

                {/* Author Info */}
                <div className="flex items-center gap-4 mt-auto border-t border-black/[0.06] pt-6">
                  {/* Avatar Placeholder inside Glass Circle */}
                  <div className="w-11 h-11 rounded-full bg-gradient-to-tr from-[#0070f3]/10 to-[#7928ca]/10 border border-black/10 flex items-center justify-center font-heading font-extrabold text-xs text-slate-800">
                    {TESTIMONIALS[index].author.split(" ").map(n => n[0]).join("")}
                  </div>
                  
                  <div>
                    <h4 className="font-heading font-bold text-sm md:text-base text-slate-900">
                      {TESTIMONIALS[index].author}
                    </h4>
                    <span className="text-[10px] md:text-xs text-slate-500 font-medium">
                      {TESTIMONIALS[index].role} &mdash; <span className="text-[#0070f3]">{TESTIMONIALS[index].company}</span>
                    </span>
                  </div>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>

        </div>

        {/* Carousel Controls */}
        <div className="flex items-center justify-center gap-5 mt-8">
          <button
            onClick={handlePrev}
            className="p-3 rounded-full border border-black/10 bg-black/5 hover:bg-black/10 transition-all cursor-pointer"
            aria-label="Previous testimonial"
          >
            <ChevronLeft className="w-4 h-4 text-slate-600" />
          </button>
          
          {/* Pagination Indicators */}
          <div className="flex gap-2">
            {TESTIMONIALS.map((_, idx) => (
              <button
                key={idx}
                onClick={() => {
                  setDirection(idx > index ? 1 : -1);
                  setIndex(idx);
                }}
                className={`h-1.5 rounded-full transition-all duration-300 cursor-pointer ${
                  index === idx ? "w-6 bg-[#0070f3]" : "w-1.5 bg-black/20 hover:bg-black/40"
                }`}
                aria-label={`Go to slide ${idx + 1}`}
              />
            ))}
          </div>

          <button
            onClick={handleNext}
            className="glass-btn p-3 rounded-full hover:scale-105 transition-all cursor-pointer"
            aria-label="Next testimonial"
          >
            <ChevronRight className="w-4 h-4 text-slate-300" />
          </button>
        </div>

      </div>
    </section>
  );
}
