"use client";
import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";

const NAV_ITEMS = [
  { label: "Home", id: "home" },
  { label: "About", id: "about" },
  { label: "Skills", id: "skills" },
  { label: "Projects", id: "projects" },
  { label: "Experience", id: "experience" },
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
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
        scrolled
          ? "glass-nav-scrolled py-3 md:py-4 shadow-lg"
          : "bg-transparent py-5 md:py-8 border-b border-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-3 sm:px-6 md:px-12 flex items-center justify-between gap-2 md:gap-4">
        {/* Logo (Hidden below laptop size to allow the horizontal nav pill to fit) */}
        <button
          onClick={() => handleNavClick("home")}
          className="hidden lg:flex items-center gap-1.5 font-heading text-xl md:text-2xl font-bold tracking-wider cursor-pointer group"
        >
          <span className={`transition-colors duration-300 ${scrolled ? "text-[#f8fafc] group-hover:text-[#00d2ff]" : "text-[#050505] group-hover:text-[#00d2ff]"}`}>VIVEK</span>
          <span className={`transition-colors duration-300 ${scrolled ? "text-[#00d2ff] group-hover:text-white" : "text-[#00d2ff] group-hover:text-black"}`}>RAUTELA</span>
        </button>

        {/* Floating Nav Pill Items (Visible on Mobile & Desktop) */}
        <nav className={`flex flex-nowrap items-center gap-0.5 sm:gap-1.5 backdrop-blur-md rounded-full p-1 transition-all duration-300 ${
          scrolled
            ? "bg-white/[0.03] border border-white/[0.08]"
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

        {/* Action button ("Let's Talk") */}
        <div className="block">
          <button
            onClick={() => handleNavClick("contact")}
            className={`px-3 py-1.5 sm:px-5 sm:py-2.5 rounded-full text-[10px] sm:text-xs md:text-sm font-bold tracking-wide flex items-center gap-1 cursor-pointer transition-all duration-300 whitespace-nowrap ${
              scrolled
                ? "glass-btn"
                : "border border-black text-black hover:bg-black hover:text-white"
            }`}
          >
            Let's Talk
            <ArrowUpRight className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
          </button>
        </div>
      </div>
    </header>
  );
}
