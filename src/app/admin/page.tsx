"use client";
import React, { useState, useEffect } from "react";
import { supabase } from "../../lib/supabase";
import { Lock, Mail, KeyRound, ArrowRight, Loader2, Sparkles } from "lucide-react";
import { motion } from "framer-motion";

export default function AdminPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  useEffect(() => {
    // Check if already authenticated
    const checkSession = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (session && session.user.email === "vivekrautela03@gmail.com") {
        // Set auth cookie for middleware guard
        document.cookie = "admin_auth=true; path=/; max-age=86400; SameSite=Lax; Secure";
        window.location.href = "/admin/dashboard";
      }
    };
    checkSession();
  }, []);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) return;

    setError("");
    setSuccess("");
    setLoading(true);

    try {
      const { data, error: authError } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (authError) {
        throw new Error(authError.message);
      }

      if (data?.user?.email === "vivekrautela03@gmail.com") {
        // Correct admin account - set cookie & redirect
        document.cookie = "admin_auth=true; path=/; max-age=86400; SameSite=Lax; Secure";
        setSuccess("Authentication successful! Redirecting...");
        setTimeout(() => {
          window.location.href = "/admin/dashboard";
        }, 1200);
      } else {
        // Non-admin logged in - log out immediately & redirect to 403
        await supabase.auth.signOut();
        document.cookie = "admin_auth=; path=/; expires=Thu, 01 Jan 1970 00:00:00 UTC; SameSite=Lax; Secure";
        window.location.href = "/admin/unauthorized";
      }
    } catch (err: any) {
      setError(err.message || "An authentication error occurred.");
      setLoading(false);
    }
  };

  const handlePasswordReset = async () => {
    if (!email) {
      setError("Please fill in your email address to request a reset link.");
      return;
    }
    setError("");
    setSuccess("");
    setLoading(true);

    try {
      const { error: resetError } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: `${window.location.origin}/admin/reset-password`,
      });

      if (resetError) {
        throw new Error(resetError.message);
      }

      setSuccess("A password reset link has been sent to your email.");
    } catch (err: any) {
      setError(err.message || "Could not process password reset.");
    } finally {
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
          <Lock className="w-6 h-6 text-white group-hover:scale-110 transition-transform duration-350" />
          <Sparkles className="w-4 h-4 text-[#0070f3]/40 absolute -top-1 -right-1 animate-pulse" />
        </div>

        <h1 className="font-heading font-black text-2xl md:text-3xl text-white mb-2 select-none">
          Admin Gate
        </h1>
        
        <p className="text-[10px] md:text-xs font-bold uppercase tracking-wider text-[#0070f3] mb-8 select-none">
          Secure Administrator Sign In
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

        {/* Login Form */}
        <form onSubmit={handleLogin} className="space-y-4">
          <div className="relative">
            <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Email address"
              required
              disabled={loading}
              className="w-full pl-12 pr-4 py-3.5 rounded-2xl bg-white/5 border border-white/10 text-white text-xs placeholder-slate-500 focus:outline-none focus:border-[#0070f3]/50 focus:bg-white/10 transition-all font-semibold"
            />
          </div>

          <div className="relative">
            <KeyRound className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password"
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
                Verifying Session...
              </>
            ) : (
              <>
                Authenticate Session
                <ArrowRight className="w-4 h-4" />
              </>
            )}
          </button>
        </form>

        {/* Password Reset Trigger */}
        <div className="mt-8 border-t border-white/5 pt-5 text-center">
          <button
            type="button"
            onClick={handlePasswordReset}
            disabled={loading}
            className="text-[10px] uppercase font-bold tracking-wider text-slate-500 hover:text-white transition-colors cursor-pointer select-none"
          >
            Forgot Password? Reset credentials
          </button>
        </div>
      </motion.div>
    </div>
  );
}
