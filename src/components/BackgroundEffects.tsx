"use client";
import React, { useEffect, useState } from "react";

export default function BackgroundEffects() {
  const [mousePos, setMousePos] = useState({ x: -1000, y: -1000 });

  useEffect(() => {
    let frameId: number;
    const handleMouseMove = (e: MouseEvent) => {
      frameId = requestAnimationFrame(() => {
        setMousePos({ x: e.clientX, y: e.clientY });
      });
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      cancelAnimationFrame(frameId);
    };
  }, []);

  return (
    <>
      {/* Cinematic noise texture */}
      <div className="noise-bg" />

      {/* Background ambient lighting */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
        {/* Glow blob 1 (Blue) */}
        <div className="absolute top-[-10%] left-[-10%] w-[50vw] h-[50vw] rounded-full blue-glow animate-blob-1 opacity-70" />

        {/* Glow blob 2 (Purple) */}
        <div className="absolute bottom-[-10%] right-[-10%] w-[50vw] h-[50vw] rounded-full purple-glow animate-blob-2 opacity-60" />

        {/* Center subtle aurora ambient lighting */}
        <div className="absolute top-[25%] left-[25%] w-[50vw] h-[50vw] rounded-full bg-gradient-to-tr from-transparent via-[#00d2ff]/5 to-[#9d4edd]/5 filter blur-[150px] animate-pulse-glow pointer-events-none" />

        {/* Mouse follow radial glow */}
        <div
          className="absolute w-[500px] h-[500px] rounded-full pointer-events-none opacity-40 select-none mix-blend-screen"
          style={{
            background: "radial-gradient(circle, rgba(0, 210, 255, 0.08) 0%, rgba(157, 78, 221, 0.04) 50%, rgba(0,0,0,0) 70%)",
            left: `${mousePos.x - 250}px`,
            top: `${mousePos.y - 250}px`,
            position: "fixed",
            willChange: "transform",
            transform: "translate3d(0,0,0)",
            transition: "left 0.15s ease-out, top 0.15s ease-out",
          }}
        />
      </div>
    </>
  );
}
