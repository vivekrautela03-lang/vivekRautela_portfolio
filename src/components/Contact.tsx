import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Send, CheckCircle2, Mail, MapPin, Clock, Phone } from "lucide-react";

interface PlayBubble {
  x: number;
  y: number;
  r: number;
  vx: number;
  vy: number;
  color: string;
  opacity: number;
}

interface Sparkle {
  x: number;
  y: number;
  r: number;
  vx: number;
  vy: number;
  opacity: number;
  color: string;
  life: number;
}

export default function Contact() {
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const canvasRef = useRef<HTMLCanvasElement>(null);
  const sectionRef = useRef<HTMLElement>(null);
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
    const section = sectionRef.current;
    if (!canvas || !section) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = section.offsetWidth);
    let height = (canvas.height = section.offsetHeight);

    const handleResize = () => {
      if (section) {
        width = canvas.width = section.offsetWidth;
        height = canvas.height = section.offsetHeight;
      }
    };
    window.addEventListener("resize", handleResize);

    // Initial play bubbles setup inside the contact sandbox box
    const bubbleCount = 18;
    const playBubbles: PlayBubble[] = [];
    const sparkles: Sparkle[] = [];

    const createPlayBubble = (w: number, h: number): PlayBubble => {
      const radius = Math.random() * 25 + 15; // 15px to 40px (bigger size)
      const colorRand = Math.random();
      // Theme colors: Blue (#00d2ff) or Purple (#9d4edd)
      const color = colorRand > 0.5 ? "0, 210, 255" : "157, 78, 221"; 
      return {
        x: Math.random() * (w - radius * 2) + radius,
        y: Math.random() * (h - radius * 2) + radius,
        r: radius,
        vx: (Math.random() - 0.5) * 1.5,
        vy: (Math.random() - 0.5) * 1.5,
        color,
        opacity: Math.random() * 0.12 + 0.08
      };
    };

    for (let i = 0; i < bubbleCount; i++) {
      playBubbles.push(createPlayBubble(width, height));
    }

    const handleCanvasClick = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      const clickX = e.clientX - rect.left;
      const clickY = e.clientY - rect.top;

      let popped = false;

      // Check if we hit any bubble
      for (let i = playBubbles.length - 1; i >= 0; i--) {
        const bubble = playBubbles[i];
        const dx = clickX - bubble.x;
        const dy = clickY - bubble.y;
        const dist = Math.sqrt(dx * dx + dy * dy);

        if (dist < bubble.r + 8) {
          // Generate burst sparkles
          for (let j = 0; j < 10; j++) {
            sparkles.push({
              x: bubble.x,
              y: bubble.y,
              r: Math.random() * 3 + 1,
              vx: (Math.random() - 0.5) * 5,
              vy: (Math.random() - 0.5) * 5,
              opacity: 1,
              color: bubble.color,
              life: 25
            });
          }
          playBubbles.splice(i, 1);
          popped = true;

          // Auto-spawn replacement after a delay
          setTimeout(() => {
            if (playBubbles.length < 22) {
              playBubbles.push(createPlayBubble(canvas.width, canvas.height));
            }
          }, 1500);
          break;
        }
      }

      // Click to spawn a bubble if we didn't pop any
      if (!popped && playBubbles.length < 30) {
        const radius = Math.random() * 25 + 15; // 15px to 40px (bigger size)
        const colorRand = Math.random();
        const color = colorRand > 0.5 ? "0, 210, 255" : "157, 78, 221";
        playBubbles.push({
          x: clickX,
          y: clickY,
          r: radius,
          vx: (Math.random() - 0.5) * 1.5,
          vy: (Math.random() - 0.5) * 1.5,
          color,
          opacity: Math.random() * 0.12 + 0.08
        });
      }
    };

    canvas.addEventListener("click", handleCanvasClick);

    const animate = () => {
      ctx.clearRect(0, 0, width, height);

      const rect = canvas.getBoundingClientRect();
      const mouseX = mouseRef.current.x - rect.left;
      const mouseY = mouseRef.current.y - rect.top;

      // Update & Draw Bubbles
      playBubbles.forEach((bubble) => {
        bubble.x += bubble.vx;
        bubble.y += bubble.vy;

        // Apply friction to slow down after mouse interaction
        bubble.vx *= 0.98;
        bubble.vy *= 0.98;

        // Ensure minimum speed
        const speed = Math.sqrt(bubble.vx * bubble.vx + bubble.vy * bubble.vy);
        if (speed < 0.2) {
          const angle = Math.random() * Math.PI * 2;
          bubble.vx = Math.cos(angle) * 0.3;
          bubble.vy = Math.sin(angle) * 0.3;
        }

        // Mouse cursor repulsion/attraction forces
        const mdx = bubble.x - mouseX;
        const mdy = bubble.y - mouseY;
        const mdist = Math.sqrt(mdx * mdx + mdy * mdy);
        const forceRadius = 130;

        if (mdist < forceRadius) {
          const force = (forceRadius - mdist) / forceRadius;
          const angle = Math.atan2(mdy, mdx);
          // Apply repulsion force to velocity vectors
          bubble.vx += Math.cos(angle) * force * 0.2;
          bubble.vy += Math.sin(angle) * force * 0.2;
        }

        // Bounce off canvas walls
        if (bubble.x - bubble.r < 0) {
          bubble.x = bubble.r;
          bubble.vx *= -1;
        } else if (bubble.x + bubble.r > width) {
          bubble.x = width - bubble.r;
          bubble.vx *= -1;
        }

        if (bubble.y - bubble.r < 0) {
          bubble.y = bubble.r;
          bubble.vy *= -1;
        } else if (bubble.y + bubble.r > height) {
          bubble.y = height - bubble.r;
          bubble.vy *= -1;
        }

        // Draw bubble body
        ctx.beginPath();
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

        // White sheen border
        ctx.beginPath();
        ctx.strokeStyle = `rgba(255, 255, 255, ${bubble.opacity * 0.4})`;
        ctx.lineWidth = 0.75;
        ctx.arc(bubble.x, bubble.y, bubble.r, 0, Math.PI * 2);
        ctx.stroke();
      });

      // Update & Draw Sparkles
      for (let i = sparkles.length - 1; i >= 0; i--) {
        const sparkle = sparkles[i];
        sparkle.x += sparkle.vx;
        sparkle.y += sparkle.vy;
        sparkle.opacity = sparkle.life / 25;
        sparkle.life--;

        if (sparkle.life <= 0) {
          sparkles.splice(i, 1);
        } else {
          ctx.beginPath();
          ctx.fillStyle = `rgba(${sparkle.color}, ${sparkle.opacity * 0.8})`;
          ctx.arc(sparkle.x, sparkle.y, sparkle.r, 0, Math.PI * 2);
          ctx.fill();
        }
      }

      animationFrameId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener("resize", handleResize);
      canvas.removeEventListener("click", handleCanvasClick);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) return;

    setIsSubmitting(true);
    // Simulate submission delay
    await new Promise((resolve) => setTimeout(resolve, 1800));
    setIsSubmitting(false);
    setSubmitted(true);
    setFormData({ name: "", email: "", message: "" });
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <section ref={sectionRef} id="contact" className="relative py-24 md:py-32 bg-[#ffffff] text-[#050505] z-10 overflow-hidden">
      {/* Playable Bubbles Sandbox Canvas */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full pointer-events-auto z-0 cursor-crosshair select-none"
      />
      
      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10 pointer-events-none">
        
        {/* Section Header */}
        <div className="mb-16 text-center">
          <motion.span
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 0.6, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-xs uppercase font-bold tracking-[0.25em] text-[#0070f3]"
          >
            Get In Touch
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1, duration: 0.6 }}
            className="text-3xl md:text-5xl font-heading font-extrabold text-slate-950 mt-2"
          >
            Let's Collaborate
          </motion.h2>
          <div className="w-12 h-1 bg-[#0070f3] mt-4 rounded-full mx-auto" />
        </div>

        {/* Split Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 max-w-5xl mx-auto">
          
          {/* Left: Contact Info */}
          <div className="lg:col-span-5 flex flex-col justify-center space-y-8 pointer-events-auto">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="space-y-6"
            >
              <h3 className="text-xl md:text-2xl font-heading font-bold text-slate-900">
                Have a project in mind or want to talk cinema?
              </h3>
              <p className="text-slate-655 text-xs md:text-sm leading-relaxed font-normal">
                I am always open to discussing creative coding contracts, UI/UX systems design, independent film productions, and creative technology opportunities.
              </p>
            </motion.div>

            {/* Quick contact rows */}
            <div className="space-y-4">
              {[
                { icon: Mail, label: "Email Me", val: "vivekrautela03@gmail.com", link: "mailto:vivekrautela03@gmail.com" },
                { icon: Phone, label: "Call / WhatsApp", val: "+91 9068850966", link: "tel:+919068850966" },
                { icon: MapPin, label: "Location", val: "Dehradun, Uttarakhand", link: null },
                { icon: Clock, label: "Availability", val: "Open for contracts & freelance", link: null },
              ].map((row, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 15 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.1, duration: 0.5 }}
                  className="flex items-center gap-4 p-4 rounded-2xl bg-black/[0.02] border border-black/[0.04]"
                >
                  <div className="w-10 h-10 rounded-xl bg-black/[0.03] border border-black/[0.06] flex items-center justify-center">
                    <row.icon className="w-4 h-4 text-slate-600" />
                  </div>
                  <div>
                    <span className="text-[10px] text-slate-500 uppercase font-bold tracking-wider block">
                      {row.label}
                    </span>
                    {row.link ? (
                      <a href={row.link} className="text-slate-800 hover:text-[#0070f3] transition-colors text-xs md:text-sm font-semibold">
                        {row.val}
                      </a>
                    ) : (
                      <span className="text-slate-800 text-xs md:text-sm font-semibold block">
                        {row.val}
                      </span>
                    )}
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Right: Glass Contact Form / Success Message */}
          <div className="lg:col-span-7 pointer-events-auto">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              className="glass-card-light p-8 md:p-10 rounded-[32px] border border-black/5 relative overflow-hidden"
            >
              <AnimatePresence mode="wait">
                {!submitted ? (
                  <motion.form
                    key="form"
                    onSubmit={handleSubmit}
                    className="space-y-6"
                    initial={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                  >
                    {/* Name */}
                    <div className="flex flex-col gap-2">
                      <label htmlFor="name" className="text-xs font-bold uppercase tracking-wider text-slate-700">
                        Name
                      </label>
                      <input
                        type="text"
                        id="name"
                        name="name"
                        required
                        value={formData.name}
                        onChange={handleInputChange}
                        placeholder="John Doe"
                        className="glass-input-light px-4 py-3 text-sm"
                      />
                    </div>

                    {/* Email */}
                    <div className="flex flex-col gap-2">
                      <label htmlFor="email" className="text-xs font-bold uppercase tracking-wider text-slate-700">
                        Email Address
                      </label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        required
                        value={formData.email}
                        onChange={handleInputChange}
                        placeholder="john@example.com"
                        className="glass-input-light px-4 py-3 text-sm"
                      />
                    </div>

                    {/* Message */}
                    <div className="flex flex-col gap-2">
                      <label htmlFor="message" className="text-xs font-bold uppercase tracking-wider text-slate-700">
                        Message
                      </label>
                      <textarea
                        id="message"
                        name="message"
                        required
                        rows={4}
                        value={formData.message}
                        onChange={handleInputChange}
                        placeholder="Tell me about your project..."
                        className="glass-input-light px-4 py-3 text-sm resize-none"
                      />
                    </div>

                    {/* Submit Button */}
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="liquid-shimmer-btn w-full py-4 rounded-xl font-bold uppercase tracking-wider text-xs md:text-sm flex items-center justify-center gap-2 cursor-pointer transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {isSubmitting ? (
                        <>
                          <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                          Sending Signal...
                        </>
                      ) : (
                        <>
                          <Send className="w-4 h-4" />
                          Send Message
                        </>
                      )}
                    </button>
                  </motion.form>
                ) : (
                  <motion.div
                    key="success"
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="text-center py-10 flex flex-col items-center justify-center space-y-4"
                  >
                    <CheckCircle2 className="w-16 h-16 text-[#0070f3] animate-pulse" />
                    <h3 className="text-2xl font-heading font-extrabold text-slate-900">
                      Signal Received!
                    </h3>
                    <p className="text-slate-650 text-sm max-w-sm mx-auto leading-relaxed">
                      Thank you for reaching out. I've received your transmission and will get back to you within 24 hours.
                    </p>
                    <button
                      onClick={() => setSubmitted(false)}
                      className="px-6 py-2.5 rounded-full text-xs font-bold uppercase tracking-wider mt-6 border border-black/10 bg-black/5 hover:bg-black/10 text-slate-800 hover:text-black cursor-pointer"
                    >
                      Send Another Message
                    </button>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          </div>

        </div>

      </div>
    </section>
  );
}
