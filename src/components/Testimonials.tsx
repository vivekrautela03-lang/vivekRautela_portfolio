"use client";
import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ArrowLeft, MoreHorizontal, Bell, Grid, Play, User, Heart, MessageCircle } from "lucide-react";

// Mock Data for theoldverse_ Instagram posts
const INSTA_POSTS = [
  {
    id: 1,
    title: "The Light From Nowhere",
    type: "Film Poster",
    likes: "2,482",
    comments: "142",
    bgGradient: "from-slate-900 via-purple-950 to-slate-900",
    emoji: "🕯️"
  },
  {
    id: 2,
    title: "Nishaan",
    type: "Short Film",
    likes: "3,104",
    comments: "289",
    bgGradient: "from-[#800f2f] via-[#5c0f24] to-[#3f0c1f]",
    emoji: "🎯"
  },
  {
    id: 3,
    title: "Kirdar Aur Khat",
    type: "Digital Story",
    likes: "1,895",
    comments: "98",
    bgGradient: "from-[#7f5539] via-[#9c6644] to-[#b07d62]",
    emoji: "✉️"
  },
  {
    id: 4,
    title: "Aether AI Storyboards",
    type: "Tech Reel",
    likes: "4,250",
    comments: "312",
    bgGradient: "from-[#0f172a] via-[#1e293b] to-[#0f172a]",
    emoji: "🤖"
  },
  {
    id: 5,
    title: "Behind The Scenes",
    type: "BTS Reel",
    likes: "2,631",
    comments: "155",
    bgGradient: "from-zinc-900 via-[#18181b] to-zinc-900",
    emoji: "🎥"
  },
  {
    id: 6,
    title: "Production Wrap",
    type: "Crew Log",
    likes: "3,712",
    comments: "204",
    bgGradient: "from-[#10002b] via-[#240046] to-[#3c096c]",
    emoji: "🎬"
  }
];

export default function Testimonials() {
  const [activeTab, setActiveTab] = useState("grid");
  const [selectedPost, setSelectedPost] = useState<typeof INSTA_POSTS[0] | null>(null);

  return (
    <section id="testimonials" className="relative py-24 md:py-32 bg-[#ffffff] text-[#050505] z-10 overflow-hidden">
      {/* Background radial highlight */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[#0070f3]/3 rounded-full filter blur-[120px] pointer-events-none" />

      <div className="max-w-5xl mx-auto px-6 md:px-12 relative z-10">
        
        {/* Section Header */}
        <div className="mb-16 text-center">
          <motion.span
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 0.6, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-xs uppercase font-bold tracking-[0.25em] text-[#0070f3]"
          >
            Creative Hub
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1, duration: 0.6 }}
            className="text-3xl md:text-5xl font-heading font-extrabold text-slate-950 mt-2"
          >
            Instagram Studio
          </motion.h2>
          <div className="w-12 h-1 bg-[#0070f3] mt-4 rounded-full mx-auto" />
        </div>

        {/* Center phone frame mockup */}
        <div className="relative flex justify-center items-center">
          
          {/* Glass Phone Frame Wrapper */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 30 }}
            whileInView={{ opacity: 1, scale: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="relative w-full max-w-[365px] aspect-[9/19] rounded-[48px] border-[10px] border-[#18181b] bg-[#18181b] shadow-[0_25px_60px_-15px_rgba(0,0,0,0.3),_0_0_0_2px_rgba(0,0,0,0.8)] overflow-hidden p-2 flex flex-col cursor-default"
          >
            {/* Dynamic Island Notch */}
            <div className="absolute top-4 left-1/2 -translate-x-1/2 w-28 h-6 rounded-full bg-black z-30 flex items-center justify-between px-3.5 select-none pointer-events-none">
              <div className="w-2.5 h-2.5 rounded-full bg-[#111] border border-white/5" />
              <div className="w-10 h-1 rounded-full bg-[#080808]" />
            </div>

            {/* Mobile Screen Container inside iPhone (Glassmorphic) */}
            <div className="relative w-full h-full rounded-[38px] bg-white/80 backdrop-blur-xl border border-white/50 overflow-y-auto [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none] flex flex-col p-4 pt-6">
              
              {/* Status Bar */}
              <div className="flex items-center justify-between text-[10px] text-slate-900 font-bold px-3 py-1 mb-2 select-none">
                <span>9:41</span>
                <div className="flex items-center gap-1.5">
                  <svg className="w-3.5 h-3" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 3c-4.97 0-9 4.03-9 9 0 2.12.74 4.07 1.97 5.61L4.35 19.4c-.39.39-.39 1.02 0 1.41.39.39 1.02.39 1.41 0l1.79-1.79C9.09 19.64 10.5 20 12 20c4.97 0 9-4.03 9-9s-4.03-9-9-9zm0 15c-3.31 0-6-2.69-6-6s2.69-6 6-6 6 2.69 6 6-2.69 6-6 6z" />
                  </svg>
                  <div className="w-4 h-2.5 rounded-sm border border-slate-900 p-0.5 flex items-center"><div className="w-full h-full bg-slate-900 rounded-2xs" /></div>
                </div>
              </div>

              {/* Instagram App Header */}
              <div className="flex items-center justify-between pb-3 border-b border-black/[0.04] mb-4">
                <button className="p-1 text-slate-800 hover:text-black">
                  <ArrowLeft className="w-4 h-4" />
                </button>
                <div className="flex items-center gap-1">
                  <span className="font-heading font-extrabold text-sm text-slate-900">theoldverse_</span>
                  <div className="w-3.5 h-3.5 rounded-full bg-[#0095f6] flex items-center justify-center text-white text-[7px] font-bold">✓</div>
                </div>
                <div className="flex items-center gap-3">
                  <button className="text-slate-800 hover:text-black"><Bell className="w-4 h-4" /></button>
                  <button className="text-slate-800 hover:text-black"><MoreHorizontal className="w-4 h-4" /></button>
                </div>
              </div>

              {/* Profile Details Layout */}
              <div className="flex items-start gap-4 mb-4">
                {/* Avatar with Stories gradient ring */}
                <div className="w-16 h-16 rounded-full bg-gradient-to-tr from-[#fccc63] via-[#f75274] to-[#9d3a9b] p-0.5 flex items-center justify-center shrink-0">
                  <div className="w-full h-full rounded-full border-2 border-white bg-slate-950 flex items-center justify-center text-white font-heading font-black text-xs select-none">
                    TOV
                  </div>
                </div>
                {/* Stats */}
                <div className="flex-1 flex items-center justify-around pt-2 text-center">
                  <div>
                    <span className="block font-heading font-extrabold text-sm text-slate-900">12</span>
                    <span className="text-[9px] text-slate-500 font-medium">Posts</span>
                  </div>
                  <div>
                    <span className="block font-heading font-extrabold text-sm text-slate-900">12.4K</span>
                    <span className="text-[9px] text-slate-500 font-medium">Followers</span>
                  </div>
                  <div>
                    <span className="block font-heading font-extrabold text-sm text-slate-900">184</span>
                    <span className="text-[9px] text-slate-500 font-medium">Following</span>
                  </div>
                </div>
              </div>

              {/* Bio Block */}
              <div className="text-left mb-4 px-1 text-slate-800">
                <h3 className="font-bold text-xs text-slate-950">The OldVerse Productions</h3>
                <p className="text-[10px] leading-relaxed font-normal mt-1">
                  🎬 Film Production Studio & Creative Hub<br />
                  🎥 Short Films | Commercials | Digital Stories<br />
                  ✨ <i>“Every story deserves a stage.”</i><br />
                  📍 India<br />
                  <a href="https://theoldverse-productions.in" target="_blank" rel="noopener noreferrer" className="text-blue-600 font-medium hover:underline block mt-1">theoldverse-productions.in</a>
                </p>
              </div>

              {/* Action buttons */}
              <div className="flex items-center gap-1.5 mb-4">
                <a 
                  href="https://instagram.com/theoldverse_" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="flex-1 py-1.5 rounded-lg bg-[#0095f6] hover:bg-[#1880e7] text-white font-bold text-[10px] text-center transition-colors cursor-pointer select-none"
                >
                  Follow
                </a>
                <a 
                  href="https://instagram.com/theoldverse_" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="flex-1 py-1.5 rounded-lg bg-black/[0.04] border border-black/[0.06] hover:bg-black/[0.08] text-slate-800 font-bold text-[10px] text-center transition-all cursor-pointer select-none"
                >
                  Message
                </a>
                <button 
                  className="px-2 py-1.5 rounded-lg bg-black/[0.04] border border-black/[0.06] hover:bg-black/[0.08] text-slate-800 font-bold text-[10px] transition-all cursor-pointer"
                >
                  Contact
                </button>
              </div>

              {/* Tab selector */}
              <div className="flex items-center justify-around border-t border-b border-black/[0.04] py-2.5 mb-3">
                <button 
                  onClick={() => setActiveTab("grid")}
                  className={`p-1 transition-colors ${activeTab === "grid" ? "text-[#0095f6]" : "text-slate-400 hover:text-slate-800"}`}
                >
                  <Grid className="w-4 h-4" />
                </button>
                <button 
                  onClick={() => setActiveTab("reels")}
                  className={`p-1 transition-colors ${activeTab === "reels" ? "text-[#0095f6]" : "text-slate-400 hover:text-slate-800"}`}
                >
                  <Play className="w-4 h-4" />
                </button>
                <button 
                  onClick={() => setActiveTab("tagged")}
                  className={`p-1 transition-colors ${activeTab === "tagged" ? "text-[#0095f6]" : "text-slate-400 hover:text-slate-800"}`}
                >
                  <User className="w-4 h-4" />
                </button>
              </div>

              {/* Instagram Feed Grid */}
              <div className="grid grid-cols-3 gap-1 relative z-10 flex-grow pb-4">
                {INSTA_POSTS.map((post) => (
                  <div
                    key={post.id}
                    onClick={() => setSelectedPost(post)}
                    className="relative aspect-square rounded-md overflow-hidden group cursor-pointer"
                  >
                    {/* Visual Card Gradient Acting as Post Image */}
                    <div className={`absolute inset-0 bg-gradient-to-tr ${post.bgGradient} flex flex-col items-center justify-center p-1 text-center`}>
                      <span className="text-lg md:text-xl filter drop-shadow">{post.emoji}</span>
                      <span className="text-[7px] text-white/70 font-semibold tracking-wider uppercase mt-1 hidden sm:block truncate max-w-[80%]">{post.type}</span>
                    </div>

                    {/* Dark Glass Hover Overlay */}
                    <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col items-center justify-center gap-1.5 text-white z-20">
                      <div className="flex items-center gap-0.5 text-[9px] font-bold">
                        <Heart className="w-2.5 h-2.5 text-white fill-white" />
                        <span>{post.likes}</span>
                      </div>
                      <div className="flex items-center gap-0.5 text-[9px] font-bold">
                        <MessageCircle className="w-2.5 h-2.5 text-white fill-white" />
                        <span>{post.comments}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

            </div>
          </motion.div>
          
        </div>

        {/* Lightbox / Post details dialog */}
        <AnimatePresence>
          {selectedPost && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedPost(null)}
              className="fixed inset-0 bg-black/50 z-50 backdrop-blur-md flex items-center justify-center p-4 cursor-pointer"
            >
              <motion.div
                initial={{ scale: 0.95, y: 15 }}
                animate={{ scale: 1, y: 0 }}
                exit={{ scale: 0.95, y: 15 }}
                onClick={(e) => e.stopPropagation()}
                className="w-full max-w-sm glass-card-light border border-black/10 rounded-[32px] overflow-hidden p-6 text-left cursor-default shadow-2xl relative"
              >
                {/* Back / Close button */}
                <button 
                  onClick={() => setSelectedPost(null)}
                  className="absolute top-4 right-4 p-2 rounded-full hover:bg-black/5 transition-all text-slate-800 cursor-pointer"
                >
                  ✕
                </button>

                {/* Big emoji backdrop */}
                <div className={`w-full aspect-[4/3] rounded-2xl bg-gradient-to-tr ${selectedPost.bgGradient} flex items-center justify-center text-5xl mb-5 shadow-inner`}>
                  {selectedPost.emoji}
                </div>

                {/* Post details */}
                <span className="text-[10px] font-bold uppercase tracking-wider text-[#0070f3] mb-1 block">
                  {selectedPost.type}
                </span>
                
                <h3 className="font-heading font-extrabold text-xl text-slate-900 mb-2">
                  {selectedPost.title}
                </h3>
                
                <p className="text-xs text-slate-500 leading-relaxed font-normal mb-5">
                  Official project post featured on <b>@theoldverse_</b>. Exploring filmmaking, design systems, and creative technology.
                </p>

                {/* Stats Footer */}
                <div className="flex items-center gap-4 pt-4 border-t border-black/[0.06] text-slate-700 text-xs font-bold">
                  <div className="flex items-center gap-1">
                    <Heart className="w-4 h-4 text-[#ea4335] fill-[#ea4335]" />
                    <span>{selectedPost.likes} likes</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <MessageCircle className="w-4 h-4 text-slate-400" />
                    <span>{selectedPost.comments} comments</span>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

      </div>
    </section>
  );
}
