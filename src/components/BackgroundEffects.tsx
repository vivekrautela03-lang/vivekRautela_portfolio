"use client";
import React, { useEffect, useRef } from "react";

interface Bubble {
  x: number;
  y: number;
  r: number;
  vx: number;
  vy: number;
  opacity: number;
  color: string;
  sinOffset: number;
  sinSpeed: number;
}

export default function BackgroundEffects() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mouseRef = useRef({ x: -1000, y: -1000 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      mouseRef.current = { x: e.clientX, y: e.clientY };
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const handleResize = () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };
    window.addEventListener("resize", handleResize);

    // Initialize bubbles parameters
    const bubbleCount = 40;
    const bubbles: Bubble[] = [];

    const createBubble = (isInit = false): Bubble => {
      const radius = Math.random() * 12 + 4; // 4px to 16px
      const colorRand = Math.random();
      // Theme colors: Blue (#00d2ff) or Purple (#9d4edd)
      const color = colorRand > 0.5 ? "0, 210, 255" : "157, 78, 221";
      
      return {
        x: Math.random() * width,
        y: isInit ? Math.random() * height : height + radius + 10,
        r: radius,
        vx: Math.random() * 0.4 - 0.2,
        vy: -(Math.random() * 0.5 + 0.3), // slow upward speed
        opacity: Math.random() * 0.08 + 0.04, // subtle translucency
        color,
        sinOffset: Math.random() * 1000,
        sinSpeed: Math.random() * 0.015 + 0.005,
      };
    };

    for (let i = 0; i < bubbleCount; i++) {
      bubbles.push(createBubble(true));
    }

    const animate = () => {
      ctx.clearRect(0, 0, width, height);

      const mouseX = mouseRef.current.x;
      const mouseY = mouseRef.current.y;

      bubbles.forEach((bubble) => {
        // Move bubble upward
        bubble.y += bubble.vy;
        
        // Sway horizontally
        bubble.sinOffset += bubble.sinSpeed;
        let currentX = bubble.x + bubble.vx + Math.sin(bubble.sinOffset) * 0.25;

        // Repulsion physics from mouse cursor coordinates
        const dx = currentX - mouseX;
        const dy = bubble.y - mouseY;
        const distance = Math.sqrt(dx * dx + dy * dy);
        const repulsionRadius = 140;

        if (distance < repulsionRadius) {
          const force = (repulsionRadius - distance) / repulsionRadius;
          const angle = Math.atan2(dy, dx);
          // Push bubble away from cursor positions
          currentX += Math.cos(angle) * force * 3.5;
          bubble.y += Math.sin(angle) * force * 3.5;
        }

        // Apply boundary checking
        if (bubble.y < -bubble.r || currentX < -bubble.r || currentX > width + bubble.r) {
          // Recycle bubble to the bottom
          const fresh = createBubble(false);
          bubble.x = fresh.x;
          bubble.y = fresh.y;
          bubble.r = fresh.r;
          bubble.vx = fresh.vx;
          bubble.vy = fresh.vy;
          bubble.opacity = fresh.opacity;
          bubble.color = fresh.color;
        } else {
          bubble.x = currentX;
        }

        // Draw bubble body
        ctx.beginPath();
        // 3D frosted glass sphere radial gradient effect
        const grad = ctx.createRadialGradient(
          bubble.x - bubble.r / 3,
          bubble.y - bubble.r / 3,
          bubble.r / 6,
          bubble.x,
          bubble.y,
          bubble.r
        );
        grad.addColorStop(0, `rgba(255, 255, 255, ${bubble.opacity * 1.5})`);
        grad.addColorStop(0.3, `rgba(${bubble.color}, ${bubble.opacity})`);
        grad.addColorStop(1, `rgba(${bubble.color}, 0)`);

        ctx.fillStyle = grad;
        ctx.arc(bubble.x, bubble.y, bubble.r, 0, Math.PI * 2);
        ctx.fill();

        // Specular glow outline
        ctx.beginPath();
        ctx.strokeStyle = `rgba(255, 255, 255, ${bubble.opacity * 0.4})`;
        ctx.lineWidth = 0.75;
        ctx.arc(bubble.x, bubble.y, bubble.r, 0, Math.PI * 2);
        ctx.stroke();
      });

      animationFrameId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener("resize", handleResize);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <>
      {/* Cinematic noise texture */}
      <div className="noise-bg" />

      {/* Interactive Background Bubbles Canvas */}
      <canvas
        ref={canvasRef}
        className="fixed inset-0 w-full h-full pointer-events-none z-0"
      />

      {/* Background ambient lighting */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
        {/* Glow blob 1 (Blue) */}
        <div className="absolute top-[-10%] left-[-10%] w-[50vw] h-[50vw] rounded-full blue-glow animate-blob-1 opacity-70" />

        {/* Glow blob 2 (Purple) */}
        <div className="absolute bottom-[-10%] right-[-10%] w-[50vw] h-[50vw] rounded-full purple-glow animate-blob-2 opacity-60" />

        {/* Center subtle aurora ambient lighting */}
        <div className="absolute top-[25%] left-[25%] w-[50vw] h-[50vw] rounded-full bg-gradient-to-tr from-transparent via-[#00d2ff]/5 to-[#9d4edd]/5 filter blur-[150px] animate-pulse-glow pointer-events-none" />
      </div>
    </>
  );
}
