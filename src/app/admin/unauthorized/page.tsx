"use client";
import React from "react";
import { ShieldAlert, ArrowLeft } from "lucide-react";
import { motion } from "framer-motion";

export default function UnauthorizedPage() {
  const handleReturn = () => {
    window.location.href = "/";
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#050505] p-6 relative overflow-hidden selection:bg-[#ff0055]/20 selection:text-[#ff0055]">
      {/* Background neon glows */}
      <div className="absolute top-[30%] left-[20%] w-[300px] h-[300px] rounded-full bg-[#ff0055]/10 filter blur-[100px] pointer-events-none" />
      <div className="absolute bottom-[30%] right-[20%] w-[350px] h-[350px] rounded-full bg-[#7928ca]/10 filter blur-[120px] pointer-events-none" />

      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className="w-full max-w-md rounded-[32px] border border-white/10 bg-white/[0.03] backdrop-blur-2xl p-8 md:p-10 text-center relative overflow-hidden"
        style={{
          boxShadow: "0 25px 60px -15px rgba(0, 0, 0, 0.5), inset 0 1px 1px rgba(255, 255, 255, 0.08)"
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-tr from-[#ff0055]/5 to-[#7928ca]/5 pointer-events-none" />

        {/* Shield Icon */}
        <div className="w-16 h-16 rounded-full bg-white/5 border border-white/10 flex items-center justify-center mx-auto mb-6 relative">
          <ShieldAlert className="w-8 h-8 text-[#ff0055]" />
          <div className="absolute inset-0 rounded-full border-2 border-[#ff0055]/40 animate-ping opacity-75" />
        </div>

        <h1 className="font-heading font-black text-2xl md:text-3xl text-white mb-2 select-none">
          403 Access Denied
        </h1>
        
        <p className="text-[10px] md:text-xs font-bold uppercase tracking-wider text-[#ff0055] mb-5 select-none">
          Restricted Administrator Console
        </p>

        <p className="text-slate-400 text-xs md:text-sm leading-relaxed mb-8 font-normal">
          This system is configured to authorize only `vivekrautela03@gmail.com`. Your current profile is unauthorized to view these records.
        </p>

        {/* Action Button */}
        <button
          onClick={handleReturn}
          className="w-full py-3.5 rounded-2xl bg-white text-black hover:bg-slate-200 font-extrabold text-xs uppercase tracking-wider transition-all shadow-md flex items-center justify-center gap-2 cursor-pointer select-none"
        >
          <ArrowLeft className="w-4 h-4" />
          Return to Portfolio
        </button>
      </motion.div>
    </div>
  );
}
