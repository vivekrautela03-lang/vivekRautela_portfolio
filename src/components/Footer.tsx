"use client";
import React from "react";
import { Mail } from "lucide-react";

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

const GithubSocialIcon = ({ className }: { className?: string }) => <GithubIcon />;
const LinkedinSocialIcon = ({ className }: { className?: string }) => <LinkedinIcon />;
const InstagramSocialIcon = ({ className }: { className?: string }) => <InstagramIcon />;
const BehanceSocialIcon = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 24 24" fill="currentColor" className={className || "w-4 h-4"}>
    <path d="M8.228 15.01h2.152c.866 0 1.252-.401 1.252-.962 0-.641-.453-.943-1.252-.943H8.228v1.905zm-.105-3.664h1.761c.773 0 1.155-.333 1.155-.836 0-.54-.423-.797-1.155-.797H8.123v1.633zm5.666 3.664h2.71c-.053.864-.711 1.341-1.616 1.341-.951 0-1.62-.647-1.62-1.787 0-1.189.673-1.849 1.62-1.849.92 0 1.543.518 1.616 1.353h-3.23c-.021.57.29 1.08.92 1.08v-.138zm3.003-2.915h-3.003c.074-.539.395-.972.934-.972.585 0 .86.433.934.972zm-8.666 6.942H2.433V7.003H8.38c2.47 0 3.753 1.144 3.753 2.766 0 1.171-.689 1.986-1.776 2.308 1.4.293 2.196 1.26 2.196 2.651 0 2.127-1.57 3.275-4.325 3.275zm12.353-8.877h-3.565v-.905h3.565v.905zm-4.708 8.877c-2.52 0-4.148-1.597-4.148-4.102 0-2.484 1.642-4.116 4.148-4.116 2.511 0 4.123 1.632 4.123 4.116 0 2.505-1.612 4.102-4.123 4.102z" />
  </svg>
);
const MailSocialIcon = ({ className }: { className?: string }) => <Mail className={className || "w-4 h-4"} />;

const SOCIAL_LINKS = [
  { 
    icon: GithubSocialIcon, 
    href: "https://github.com/vivekrautela03-lang", 
    label: "GitHub",
    hoverClass: "hover:bg-[#181717] hover:text-white hover:border-[#181717]" 
  },
  { 
    icon: LinkedinSocialIcon, 
    href: "https://www.linkedin.com/in/vivek-rautela-1a8194381?utm_source=share_via&utm_content=profile&utm_medium=member_android", 
    label: "LinkedIn",
    hoverClass: "hover:bg-[#0a66c2] hover:text-white hover:border-[#0a66c2]" 
  },
  { 
    icon: InstagramSocialIcon, 
    href: "https://instagram.com/psf_vivek", 
    label: "Instagram",
    hoverClass: "hover:bg-[#e1306c] hover:text-white hover:border-[#e1306c]" 
  },
  { 
    icon: MailSocialIcon, 
    href: "mailto:vivekrautela03@gmail.com", 
    label: "Email",
    hoverClass: "hover:bg-[#ea4335] hover:text-white hover:border-[#ea4335]" 
  },
];

export default function Footer() {
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
    <footer className="relative bg-[#ffffff] text-[#050505] z-10 border-t border-black/[0.06] pt-16 pb-12 overflow-hidden">
      {/* Footer glow backdrop */}
      <div className="absolute bottom-0 left-[20%] w-[35vw] h-[35vw] rounded-full bg-[#0070f3]/3 filter blur-[100px] pointer-events-none" />
      <div className="absolute bottom-0 right-[20%] w-[35vw] h-[35vw] rounded-full bg-[#7928ca]/3 filter blur-[100px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
        
        {/* Top Footer Info */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 md:gap-16 pb-12 border-b border-black/[0.06]">
          
          {/* Brand Info */}
          <div className="md:col-span-6 flex flex-col items-center md:items-start text-center md:text-left">
            <button
              onClick={() => handleScrollTo("home")}
              className="flex items-center gap-1.5 font-heading text-xl font-bold tracking-wider mb-4 cursor-pointer"
            >
              <span className="text-black">VIVEK</span>
              <span className="text-[#0070f3]">RAUTELA</span>
            </button>
            <p className="text-slate-600 text-xs md:text-sm leading-relaxed max-w-sm font-normal">
              Crafting cinematic digital experiences where storytelling, layout design, high-end engineering, and responsive motion come together.
            </p>
          </div>

          {/* Quick Navigation Links */}
          <div className="md:col-span-6 flex flex-wrap justify-center md:justify-end gap-x-8 gap-y-3">
            {[
              { label: "Home", id: "home" },
              { label: "About", id: "about" },
              { label: "Skills", id: "skills" },
              { label: "Projects", id: "projects" },
              { label: "Experience", id: "experience" },
              { label: "Contact", id: "contact" },
            ].map((link, idx) => (
              <button
                key={idx}
                onClick={() => handleScrollTo(link.id)}
                className="text-slate-650 hover:text-[#0070f3] transition-colors text-xs font-semibold uppercase tracking-wider cursor-pointer"
              >
                {link.label}
              </button>
            ))}
          </div>

        </div>

        {/* Bottom Footer Credits */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-6 pt-10">
          
          {/* Copyright */}
          <p className="text-slate-600 text-[11px] md:text-xs font-normal">
            &copy; {new Date().getFullYear()} Vivek Rautela. All rights reserved.
          </p>

          {/* Designer / Developer Credit */}
          <p className="text-slate-655 text-[11px] md:text-xs font-medium tracking-wide">
            Designed & Developed by{" "}
            <span className="text-slate-900 font-bold hover:text-[#0070f3] transition-colors duration-300">
              Vivek Rautela
            </span>
          </p>

          {/* Social Links Row */}
          <div className="flex items-center gap-4">
            {SOCIAL_LINKS.map((social, idx) => (
              <a
                key={idx}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                className={`text-slate-600 p-2.5 bg-black/[0.02] border border-black/[0.04] rounded-full transition-all cursor-pointer flex items-center justify-center ${social.hoverClass}`}
                aria-label={social.label}
              >
                <social.icon className="w-4 h-4" />
              </a>
            ))}
          </div>

        </div>

      </div>
    </footer>
  );
}
