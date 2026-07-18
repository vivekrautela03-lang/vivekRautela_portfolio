"use client";
import React, { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

export default function CustomCursor() {
  const [mounted, setMounted] = useState(false);
  const [hovered, setHovered] = useState(false);
  const [hidden, setHidden] = useState(true);

  // Position coordinates
  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);

  // Spring animations for a fluid, lag-easing premium feel
  const springConfig = { damping: 45, stiffness: 450, mass: 0.35 };
  const cursorXSpring = useSpring(cursorX, springConfig);
  const cursorYSpring = useSpring(cursorY, springConfig);

  const [isTouchDevice, setIsTouchDevice] = useState(false);

  useEffect(() => {
    setMounted(true);

    // Detect if device is touch-primary (iOS/Android mobile/tablet)
    const touchQuery = window.matchMedia("(pointer: coarse)");
    setIsTouchDevice(touchQuery.matches);

    const handleTouchChange = (e: MediaQueryListEvent) => {
      setIsTouchDevice(e.matches);
    };

    // Listen for changes (e.g. rotating tablet/resizing screen)
    if (touchQuery.addEventListener) {
      touchQuery.addEventListener("change", handleTouchChange);
    } else {
      // Fallback for older browsers
      touchQuery.addListener(handleTouchChange);
    }

    const moveCursor = (e: MouseEvent) => {
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);
      if (hidden) setHidden(false);
    };

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (!target) return;

      const isInteractive =
        target.tagName === "A" ||
        target.tagName === "BUTTON" ||
        target.closest("a") ||
        target.closest("button") ||
        target.classList.contains("interactive") ||
        target.closest(".interactive") ||
        target.tagName === "INPUT" ||
        target.tagName === "TEXTAREA";

      setHovered(!!isInteractive);
    };

    const handleMouseLeave = () => {
      setHidden(true);
    };

    const handleMouseEnter = () => {
      setHidden(false);
    };

    window.addEventListener("mousemove", moveCursor);
    window.addEventListener("mouseover", handleMouseOver);
    document.addEventListener("mouseleave", handleMouseLeave);
    document.addEventListener("mouseenter", handleMouseEnter);

    return () => {
      if (touchQuery.removeEventListener) {
        touchQuery.removeEventListener("change", handleTouchChange);
      } else {
        touchQuery.removeListener(handleTouchChange);
      }
      window.removeEventListener("mousemove", moveCursor);
      window.removeEventListener("mouseover", handleMouseOver);
      document.removeEventListener("mouseleave", handleMouseLeave);
      document.removeEventListener("mouseenter", handleMouseEnter);
    };
  }, [cursorX, cursorY, hidden]);

  if (!mounted || hidden || isTouchDevice) return null;

  return (
    <motion.div
      className="fixed top-0 left-0 w-8 h-8 rounded-full border border-white/40 bg-white/5 backdrop-blur-[2px] pointer-events-none z-[9999] mix-blend-difference flex items-center justify-center select-none"
      style={{
        x: cursorXSpring,
        y: cursorYSpring,
        translateX: "-50%",
        translateY: "-50%",
      }}
      animate={{
        scale: hovered ? 1.8 : 1,
        backgroundColor: hovered ? "rgba(255, 255, 255, 0.18)" : "rgba(255, 255, 255, 0.05)",
        borderColor: hovered ? "rgba(255, 255, 255, 0.8)" : "rgba(255, 255, 255, 0.4)",
      }}
      transition={{ type: "spring", stiffness: 600, damping: 30 }}
    >
      {/* Small center dot */}
      <motion.div
        className="w-1.5 h-1.5 bg-white rounded-full"
        animate={{
          scale: hovered ? 0.5 : 1,
        }}
      />
    </motion.div>
  );
}
