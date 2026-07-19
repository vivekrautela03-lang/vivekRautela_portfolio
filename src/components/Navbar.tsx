"use client";
import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";

const NAV_ITEMS = [
  { label: "Home", id: "home" },
  { label: "About", id: "about" },
  { label: "Skills", id: "skills" },
  { label: "Projects", id: "projects" },
  { label: "Achievements", id: "experience" },
  { label: "Contact", id: "contact" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState("home");

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);

      // Scroll active section spy
      const scrollPosition = window.scrollY + 120;
      for (const item of NAV_ITEMS) {
        const el = document.getElementById(item.id);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPosition >= top && scrollPosition < top + height) {
            setActiveSection(item.id);
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll(); // Trigger initially
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleNavClick = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      const offset = 80; // height offset
      const bodyRect = document.body.getBoundingClientRect().top;
      const elementRect = el.getBoundingClientRect().top;
      const elementPosition = elementRect - bodyRect;
      const offsetPosition = elementPosition - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth",
      });
    }
  };

  return (
    <header
      className="fixed top-0 left-0 w-full z-50 transition-all duration-300 bg-transparent py-4 md:py-6"
    >
      <div className="max-w-7xl mx-auto px-3 sm:px-6 md:px-12 flex items-center justify-center md:justify-between gap-2 md:gap-4">
        {/* Spacer on the left to center the nav items when the logo is removed */}
        <div className="hidden md:block w-32" />

        {/* Floating Nav Pill Items (Visible on Mobile & Desktop) */}
        <nav className={`flex flex-nowrap items-center gap-0.5 sm:gap-1.5 backdrop-blur-md rounded-full p-1.5 transition-all duration-300 shadow-md ${
          scrolled
            ? "bg-[#0b0c10]/85 border border-white/[0.08] shadow-lg"
            : "bg-black/[0.03] border border-black/[0.08]"
        }`}>
          {NAV_ITEMS.map((item) => (
            <button
              key={item.id}
              onClick={() => handleNavClick(item.id)}
              className={`relative px-2.5 py-1.5 sm:px-5 sm:py-2 rounded-full text-[10px] sm:text-xs md:text-sm font-semibold tracking-wide transition-all duration-300 cursor-pointer whitespace-nowrap ${
                activeSection === item.id
                  ? scrolled ? "text-[#050505]" : "text-[#f8fafc]"
                  : scrolled ? "text-slate-400 hover:text-white" : "text-slate-700 hover:text-black"
              }`}
            >
              {activeSection === item.id && (
                <motion.div
                  layoutId="activePill"
                  className={`absolute inset-0 rounded-full -z-10 shadow-md ${scrolled ? "bg-[#f8fafc]" : "bg-[#050505]"}`}
                  transition={{ type: "spring", stiffness: 380, damping: 30 }}
                />
              )}
              {item.label}
            </button>
          ))}
        </nav>

        {/* Action button ("Let's Talk") - Hidden on Mobile */}
        <div className="hidden md:block w-32 text-right">
          <button
            onClick={() => handleNavClick("contact")}
            className="px-5 py-2 rounded-full text-sm font-bold tracking-wide inline-flex items-center gap-1.5 cursor-pointer transition-all duration-300 whitespace-nowrap border border-black text-black hover:bg-black hover:text-white"
          >
            Let's Talk
            <ArrowUpRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </header>
  );
}
