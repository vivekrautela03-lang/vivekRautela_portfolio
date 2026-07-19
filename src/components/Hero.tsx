"use client";
import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Mail, ArrowDown } from "lucide-react";

const GithubIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4">
    <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
    <path d="M9 18c-4.51 2-5-2-7-2" />
  </svg>
);

const LinkedinIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4">
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
    <rect width="4" height="12" x="2" y="9" />
    <circle cx="4" cy="4" r="2" />
  </svg>
);

const InstagramIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4">
    <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
    <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
  </svg>
);

const ROLES = [
  "Filmmaker",
  "Writer",
  "AI Engineer",
  "UI/UX Designer",
];

const SOCIAL_LINKS = [
  { icon: GithubIcon, href: "https://github.com", label: "GitHub" },
  { icon: LinkedinIcon, href: "https://linkedin.com", label: "LinkedIn" },
  { icon: InstagramIcon, href: "https://instagram.com", label: "Instagram" },
  { icon: Mail, href: "mailto:hello@vivekrautela.com", label: "Email" },
];

export default function Hero() {
  const [roleIndex, setRoleIndex] = useState(0);
  const [isVideoLoaded, setIsVideoLoaded] = useState(false);
  const mobileVideoRef = useRef<HTMLVideoElement>(null);
  const desktopVideoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const interval = setInterval(() => {
      setRoleIndex((prev) => (prev + 1) % ROLES.length);
    }, 2800);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    // Explicitly set muted=true and call play() programmatically on mobile/Safari
    const playVideo = (videoEl: HTMLVideoElement | null) => {
      if (videoEl) {
        videoEl.muted = true;
        videoEl.setAttribute("muted", "");
        videoEl.play()
          .then(() => {
            setIsVideoLoaded(true);
          })
          .catch((err) => {
            console.warn("Video autoplay blocked by browser policy:", err);
          });
      }
    };

    const handleResume = (e: Event) => {
      const video = e.target as HTMLVideoElement;
      if (video && video.paused) {
        video.play().catch(() => {});
      }
    };

    const mobileEl = mobileVideoRef.current;
    const desktopEl = desktopVideoRef.current;

    // Attempt autoplay immediately
    playVideo(mobileEl);
    playVideo(desktopEl);

    // Auto resume if paused by browser automatically
    if (mobileEl) mobileEl.addEventListener("pause", handleResume);
    if (desktopEl) desktopEl.addEventListener("pause", handleResume);

    // Trigger on scroll to ensure it plays while scrolling
    const handleScrollPlay = () => {
      if (mobileEl && mobileEl.paused) mobileEl.play().catch(() => {});
      if (desktopEl && desktopEl.paused) desktopEl.play().catch(() => {});
    };
    window.addEventListener("scroll", handleScrollPlay, { passive: true });

    // Try again on user's first interaction if autoplay got blocked by strict mobile policies
    const resumePlayback = () => {
      playVideo(mobileVideoRef.current);
      playVideo(desktopVideoRef.current);
      // Remove listeners once playback starts
      window.removeEventListener("touchstart", resumePlayback);
      window.removeEventListener("click", resumePlayback);
    };

    window.addEventListener("touchstart", resumePlayback, { passive: true });
    window.addEventListener("click", resumePlayback, { passive: true });

    return () => {
      if (mobileEl) mobileEl.removeEventListener("pause", handleResume);
      if (desktopEl) desktopEl.removeEventListener("pause", handleResume);
      window.removeEventListener("scroll", handleScrollPlay);
      window.removeEventListener("touchstart", resumePlayback);
      window.removeEventListener("click", resumePlayback);
    };
  }, []);

  const handleScrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      const offset = 80;
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
    <section
      id="home"
      className="relative w-full min-h-[100svh] flex items-center justify-start overflow-hidden bg-[#050505] z-10"
    >
      {/* Fallback visual gradient before video loads */}
      <div
        className={`absolute inset-0 bg-gradient-to-br from-[#050505] via-[#0F1117] to-[#050505] transition-opacity duration-1000 z-0 ${
          isVideoLoaded ? "opacity-0" : "opacity-100"
        }`}
      />

      {/* Cinematic Background Videos (Responsive) */}
      {/* Mobile background video */}
      <video
        ref={mobileVideoRef}
        autoPlay
        muted
        loop
        playsInline
        preload="auto"
        className="absolute inset-0 w-full h-full object-cover object-center transition-all duration-1000 select-none pointer-events-none opacity-100 md:hidden"
        style={{
          objectFit: "cover",
          width: "100%",
          height: "100%",
          position: "absolute",
          inset: 0,
        }}
      >
        <source
          src="https://res.cloudinary.com/qia3rzqk/video/upload/w_720,c_scale,vc_h264/v1784439049/1000044059_gwr_video_mvp_wllvul.mp4"
          type="video/mp4"
          media="(min-width: 480px)"
        />
        <source
          src="https://res.cloudinary.com/qia3rzqk/video/upload/w_480,c_scale,vc_h264/v1784439049/1000044059_gwr_video_mvp_wllvul.mp4"
          type="video/mp4"
        />
      </video>

      {/* Desktop/Laptop background video */}
      <video
        ref={desktopVideoRef}
        autoPlay
        muted
        loop
        playsInline
        preload="auto"
        className="absolute inset-0 w-full h-full object-cover object-center transition-all duration-1000 select-none pointer-events-none scale-105 opacity-100 hidden md:block"
        style={{
          objectFit: "cover",
          width: "100%",
          height: "100%",
          position: "absolute",
          inset: 0,
        }}
      >
        <source
          src="https://res.cloudinary.com/qia3rzqk/video/upload/w_1920,c_scale,vc_h264/v1784386883/watermark-removed-dont_add_text_last_202607181153_y37s5u.mp4"
          type="video/mp4"
          media="(min-width: 1200px)"
        />
        <source
          src="https://res.cloudinary.com/qia3rzqk/video/upload/w_1280,c_scale,vc_h264/v1784386883/watermark-removed-dont_add_text_last_202607181153_y37s5u.mp4"
          type="video/mp4"
        />
      </video>

      {/* Left-aligned Hero Content Wrapper */}
      <div className="z-10 w-full max-w-7xl mx-auto px-6 md:px-12 flex items-center justify-start h-full pt-20">
        <motion.div
          initial={{ opacity: 0, x: -40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
          className="max-w-xl text-left flex flex-col items-start relative"
        >
          {/* Subtle panel backlight on the side */}
          <div className="absolute -top-32 -left-32 w-64 h-64 rounded-full bg-[#00d2ff]/5 filter blur-3xl pointer-events-none" />

          {/* Content */}
          <motion.span
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.8 }}
            className="text-xs md:text-sm font-semibold tracking-[0.25em] text-slate-800 uppercase mb-4 block"
          >
            Hello, I'm
          </motion.span>

          <motion.h1
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.8 }}
            className="text-4xl sm:text-5xl md:text-8xl font-heading font-extrabold tracking-tight text-[#050505] mb-4 select-none"
          >
            Vivek Rautela
          </motion.h1>

          {/* Rotating Roles Section */}
          <div className="h-10 md:h-14 flex items-center justify-start overflow-hidden mb-6">
            <AnimatePresence mode="wait">
              <motion.span
                key={roleIndex}
                initial={{ y: 25, opacity: 0, filter: "blur(4px)" }}
                animate={{ y: 0, opacity: 1, filter: "blur(0px)" }}
                exit={{ y: -25, opacity: 0, filter: "blur(4px)" }}
                transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                className="text-lg sm:text-xl md:text-3xl font-heading font-medium tracking-wide text-slate-800"
              >
                {ROLES[roleIndex]}
              </motion.span>
            </AnimatePresence>
          </div>

          <motion.p
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.8 }}
            className="text-xs sm:text-sm md:text-lg text-slate-900 max-w-lg leading-relaxed mb-10 font-semibold"
          >
            I craft cinematic digital experiences where storytelling, design, engineering, and motion come together.
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.8 }}
            className="flex flex-col sm:flex-row items-stretch sm:items-center justify-start gap-4 w-full sm:w-auto"
          >
            <button
              onClick={() => handleScrollTo("projects")}
              className="bg-[#050505] text-white border border-[#050505] hover:bg-slate-800 hover:border-slate-800 px-5 py-3 sm:px-8 sm:py-3.5 rounded-full text-[10px] sm:text-xs font-bold uppercase tracking-wider text-center cursor-pointer transition-all duration-300 shadow-md"
            >
              View Projects
            </button>
            <button
              onClick={() => handleScrollTo("about")}
              className="border border-[#050505] text-[#050505] hover:bg-[#050505]/10 px-5 py-3 sm:px-8 sm:py-3.5 rounded-full text-[10px] sm:text-xs font-bold uppercase tracking-wider text-center cursor-pointer transition-all duration-300"
            >
              Download Resume
            </button>
            <button
              onClick={() => handleScrollTo("contact")}
              className="px-4 py-3 sm:px-6 sm:py-3.5 text-[10px] sm:text-xs font-bold uppercase tracking-wider text-slate-700 hover:text-black hover:underline transition-colors text-center cursor-pointer flex items-center justify-center gap-1"
            >
              Contact Me
            </button>
          </motion.div>
        </motion.div>
      </div>

      {/* Social Icons Bottom-Left */}
      <div className="absolute bottom-8 left-6 md:left-12 z-20 hidden md:flex items-center gap-5">
        {SOCIAL_LINKS.map((social, idx) => (
          <motion.a
            key={idx}
            href={social.href}
            target="_blank"
            rel="noopener noreferrer"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 0.7, x: 0 }}
            whileHover={{ opacity: 1, scale: 1.15, y: -2 }}
            transition={{ type: "spring", stiffness: 400, damping: 15 }}
            className="text-[#050505] p-2 bg-[#050505]/5 border border-[#050505]/10 rounded-full hover:bg-[#050505] hover:text-white hover:border-[#050505] transition-all cursor-pointer"
            aria-label={social.label}
          >
            <social.icon className="w-4 h-4" />
          </motion.a>
        ))}
      </div>

      {/* Scroll Indicator Bottom-Center */}
      <motion.button
        onClick={() => handleScrollTo("about")}
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 0.7, y: 0 }}
        transition={{ delay: 1, duration: 0.8 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-2 text-slate-800 hover:text-[#050505] transition-colors cursor-pointer group"
      >
        <span className="text-[10px] uppercase font-bold tracking-[0.2em]">Scroll Down</span>
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
          className="w-5 h-9 rounded-full border-2 border-slate-700 group-hover:border-[#050505] flex justify-center p-1.5 transition-colors"
        >
          <div className="w-1.5 h-1.5 bg-slate-700 group-hover:bg-[#050505] rounded-full transition-colors" />
        </motion.div>
      </motion.button>
    </section>
  );
}
