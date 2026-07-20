"use client";
import React, { useState, useEffect } from "react";
import { supabase } from "../../../lib/supabase";
import { KeyRound, Lock, ArrowRight, Loader2, Sparkles } from "lucide-react";
import { motion } from "framer-motion";

export default function ResetPasswordPage() {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  useEffect(() => {
    // Supabase automatically parses recovery token from email link hash
    const checkRecovery = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) {
        setError("Invalid or expired password reset link. Please request a new link.");
      }
    };
    checkRecovery();
  }, []);

  const handleUpdatePassword = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!password || !confirmPassword) return;

    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    setError("");
    setSuccess("");
    setLoading(true);

    try {
      const { error: updateError } = await supabase.auth.updateUser({
        password: password,
      });

      if (updateError) {
        throw new Error(updateError.message);
      }

      setSuccess("Password updated successfully! Redirecting to login...");
      setTimeout(() => {
        window.location.href = "/admin";
      }, 2000);
    } catch (err: any) {
      setError(err.message || "Failed to update password.");
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#050505] p-6 relative overflow-hidden selection:bg-[#00d2ff]/20 selection:text-[#00d2ff]">
      {/* Background neon glows */}
      <div className="absolute top-[20%] left-[10%] w-[300px] h-[300px] rounded-full bg-[#0070f3]/10 filter blur-[100px] pointer-events-none" />
      <div className="absolute bottom-[20%] right-[10%] w-[350px] h-[350px] rounded-full bg-[#7928ca]/10 filter blur-[120px] pointer-events-none" />

      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className="w-full max-w-md rounded-[32px] border border-white/10 bg-white/[0.03] backdrop-blur-2xl p-8 md:p-10 text-center relative overflow-hidden"
        style={{
          boxShadow: "0 25px 60px -15px rgba(0, 0, 0, 0.5), inset 0 1px 1px rgba(255, 255, 255, 0.08)"
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-tr from-[#0070f3]/5 to-[#7928ca]/5 pointer-events-none" />

        {/* Lock Icon */}
        <div className="w-14 h-14 rounded-full bg-white/5 border border-white/10 flex items-center justify-center mx-auto mb-6 relative group">
          <Lock className="w-6 h-6 text-white" />
          <Sparkles className="w-4 h-4 text-[#0070f3]/40 absolute -top-1 -right-1" />
        </div>

        <h1 className="font-heading font-black text-2xl md:text-3xl text-white mb-2 select-none">
          Reset Credentials
        </h1>
        
        <p className="text-[10px] md:text-xs font-bold uppercase tracking-wider text-[#0070f3] mb-8 select-none">
          Define your new administrative password
        </p>

        {/* Status Alerts */}
        {error && (
          <div className="mb-6 p-4 rounded-xl border border-red-500/10 bg-red-500/5 text-red-400 text-xs text-left leading-relaxed font-semibold">
            ⚠️ {error}
          </div>
        )}
        {success && (
          <div className="mb-6 p-4 rounded-xl border border-emerald-500/10 bg-emerald-500/5 text-emerald-400 text-xs text-left leading-relaxed font-semibold">
            ✓ {success}
          </div>
        )}

        {/* Reset Password Form */}
        <form onSubmit={handleUpdatePassword} className="space-y-4">
          <div className="relative">
            <KeyRound className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="New password"
              required
              disabled={loading}
              className="w-full pl-12 pr-4 py-3.5 rounded-2xl bg-white/5 border border-white/10 text-white text-xs placeholder-slate-500 focus:outline-none focus:border-[#0070f3]/50 focus:bg-white/10 transition-all font-semibold"
            />
          </div>

          <div className="relative">
            <KeyRound className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
            <input
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              placeholder="Confirm new password"
              required
              disabled={loading}
              className="w-full pl-12 pr-4 py-3.5 rounded-2xl bg-white/5 border border-white/10 text-white text-xs placeholder-slate-500 focus:outline-none focus:border-[#0070f3]/50 focus:bg-white/10 transition-all font-semibold"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full mt-6 py-3.5 rounded-2xl bg-white text-black hover:bg-slate-200 font-extrabold text-xs uppercase tracking-wider transition-all shadow-md flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
          >
            {loading ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                Updating Credentials...
              </>
            ) : (
              <>
                Update Credentials
                <ArrowRight className="w-4 h-4" />
              </>
            )}
          </button>
        </form>
      </motion.div>
    </div>
  );
}
