"use client";
import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, ArrowUpRight } from "lucide-react";

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
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

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
    setMobileMenuOpen(false);
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
    <>
      <header
        className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
          scrolled
            ? "glass-nav-scrolled py-4 shadow-lg"
            : "bg-transparent py-8 border-b border-transparent"
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 md:px-12 flex items-center justify-between">
          {/* Logo */}
          <button
            onClick={() => handleNavClick("home")}
            className="flex items-center gap-1.5 font-heading text-xl md:text-2xl font-bold tracking-wider cursor-pointer group"
          >
            <span className={`transition-colors duration-300 ${scrolled ? "text-[#f8fafc] group-hover:text-[#00d2ff]" : "text-[#050505] group-hover:text-[#00d2ff]"}`}>VIVEK</span>
            <span className={`transition-colors duration-300 ${scrolled ? "text-[#00d2ff] group-hover:text-white" : "text-[#00d2ff] group-hover:text-black"}`}>RAUTELA</span>
          </button>

          {/* Desktop Nav Items */}
          <nav className={`hidden md:flex items-center gap-1.5 backdrop-blur-md rounded-full p-1.5 transition-all duration-300 ${
            scrolled
              ? "bg-white/[0.03] border border-white/[0.08]"
              : "bg-black/[0.03] border border-black/[0.08]"
          }`}>
            {NAV_ITEMS.map((item) => (
              <button
                key={item.id}
                onClick={() => handleNavClick(item.id)}
                className={`relative px-5 py-2 rounded-full text-sm font-semibold tracking-wide transition-all duration-300 cursor-pointer ${
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

          {/* Action button */}
          <div className="hidden md:block">
            <button
              onClick={() => handleNavClick("contact")}
              className={`px-5 py-2.5 rounded-full text-sm font-bold tracking-wide flex items-center gap-1.5 cursor-pointer transition-all duration-300 ${
                scrolled
                  ? "glass-btn"
                  : "border border-black text-black hover:bg-black hover:text-white"
              }`}
            >
              Let's Talk
              <ArrowUpRight className="w-4 h-4" />
            </button>
          </div>

          {/* Mobile Menu Toggle */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className={`p-2 md:hidden transition-colors cursor-pointer ${
              scrolled
                ? "text-[#f8fafc] hover:text-[#00d2ff]"
                : "text-[#050505] hover:text-[#0070f3]"
            }`}
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </header>

      {/* Mobile Menu Dropdown */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="fixed top-[64px] left-0 w-full z-45 glass-panel border-b border-white/10 md:hidden overflow-hidden"
          >
            <div className="px-6 py-8 flex flex-col gap-5">
              {NAV_ITEMS.map((item) => (
                <button
                  key={item.id}
                  onClick={() => handleNavClick(item.id)}
                  className={`text-left text-lg font-heading font-medium tracking-wide py-2 border-b border-white/[0.05] transition-colors cursor-pointer ${
                    activeSection === item.id
                      ? "text-[#00d2ff]"
                      : "text-slate-400 hover:text-white"
                  }`}
                >
                  {item.label}
                </button>
              ))}
              <button
                onClick={() => handleNavClick("contact")}
                className="glass-btn-primary py-3 rounded-xl text-center font-bold tracking-wider mt-2 cursor-pointer"
              >
                Let's Talk
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
