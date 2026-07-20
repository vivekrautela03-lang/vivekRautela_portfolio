"use client";
import React, { useState, useEffect } from "react";
import { supabase } from "../../../lib/supabase";
import { 
  LogOut, Plus, Trash2, Edit3, Settings, ShieldCheck, 
  FolderGit, Cpu, Database, Save, Loader2, RefreshCw 
} from "lucide-react";
import { motion } from "framer-motion";

export default function AdminDashboard() {
  const [session, setSession] = useState<any>(null);
  const [activeTab, setActiveTab] = useState("overview");
  const [loading, setLoading] = useState(true);

  // Projects State
  const [projects, setProjects] = useState<any[]>([]);
  const [projectForm, setProjectForm] = useState({
    title: "", category: "", subtitle: "", description: "",
    image: "", demo_link: "", github_link: "", highlights: "", technologies: ""
  });
  const [editingProjectId, setEditingProjectId] = useState<string | null>(null);

  // Skills State
  const [skills, setSkills] = useState<any[]>([]);
  const [skillsForm, setSkillsForm] = useState({ title: "", skills: "", icon_name: "" });
  const [editingSkillsId, setEditingSkillsId] = useState<string | null>(null);

  // Status message
  const [statusMsg, setStatusMsg] = useState({ type: "", text: "" });

  useEffect(() => {
    const initSession = async () => {
      const { data: { session: activeSession } } = await supabase.auth.getSession();
      
      if (!activeSession || activeSession.user.email !== "vivekrautela03@gmail.com") {
        document.cookie = "admin_auth=; path=/; expires=Thu, 01 Jan 1970 00:00:00 UTC; SameSite=Lax; Secure";
        window.location.href = "/admin";
      } else {
        setSession(activeSession);
        setLoading(false);
        fetchProjects();
        fetchSkills();
      }
    };
    initSession();
  }, []);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    document.cookie = "admin_auth=; path=/; expires=Thu, 01 Jan 1970 00:00:00 UTC; SameSite=Lax; Secure";
    window.location.href = "/admin";
  };

  const showStatus = (type: "success" | "error", text: string) => {
    setStatusMsg({ type, text });
    setTimeout(() => setStatusMsg({ type: "", text: "" }), 4000);
  };

  // DB Fetches
  const fetchProjects = async () => {
    try {
      const { data, error } = await supabase.from("projects").select("*").order("created_at", { ascending: true });
      if (!error && data) setProjects(data);
    } catch (err) {}
  };

  const fetchSkills = async () => {
    try {
      const { data, error } = await supabase.from("skills").select("*").order("created_at", { ascending: true });
      if (!error && data) setSkills(data);
    } catch (err) {}
  };

  // Projects CRUD
  const saveProject = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const payload = {
      title: projectForm.title,
      category: projectForm.category,
      subtitle: projectForm.subtitle,
      description: projectForm.description,
      image: projectForm.image || "/images/tov_studio.png",
      demo_link: projectForm.demo_link,
      github_link: projectForm.github_link,
      highlights: projectForm.highlights.split(",").map(s => s.trim()).filter(Boolean),
      technologies: projectForm.technologies.split(",").map(s => s.trim()).filter(Boolean)
    };

    try {
      let error;
      if (editingProjectId) {
        ({ error } = await supabase.from("projects").update(payload).eq("id", editingProjectId));
      } else {
        ({ error } = await supabase.from("projects").insert([payload]));
      }

      if (error) throw error;

      showStatus("success", `Project ${editingProjectId ? "updated" : "created"} successfully!`);
      setProjectForm({ title: "", category: "", subtitle: "", description: "", image: "", demo_link: "", github_link: "", highlights: "", technologies: "" });
      setEditingProjectId(null);
      fetchProjects();
    } catch (err: any) {
      showStatus("error", err.message || "Failed to save project.");
    } finally {
      setLoading(false);
    }
  };

  const editProject = (p: any) => {
    setEditingProjectId(p.id);
    setProjectForm({
      title: p.title || "",
      category: p.category || "",
      subtitle: p.subtitle || "",
      description: p.description || "",
      image: p.image || "",
      demo_link: p.demo_link || "",
      github_link: p.github_link || "",
      highlights: (p.highlights || []).join(", "),
      technologies: (p.technologies || []).join(", ")
    });
    setActiveTab("projects");
  };

  const deleteProject = async (id: string) => {
    if (!confirm("Are you sure you want to delete this project?")) return;
    setLoading(true);
    try {
      const { error } = await supabase.from("projects").delete().eq("id", id);
      if (error) throw error;
      showStatus("success", "Project deleted successfully!");
      fetchProjects();
    } catch (err: any) {
      showStatus("error", err.message || "Failed to delete project.");
    } finally {
      setLoading(false);
    }
  };

  // Skills CRUD
  const saveSkills = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const payload = {
      title: skillsForm.title,
      icon_name: skillsForm.icon_name || "Cpu",
      skills: skillsForm.skills.split(",").map(s => s.trim()).filter(Boolean)
    };

    try {
      let error;
      if (editingSkillsId) {
        ({ error } = await supabase.from("skills").update(payload).eq("id", editingSkillsId));
      } else {
        ({ error } = await supabase.from("skills").insert([payload]));
      }

      if (error) throw error;

      showStatus("success", `Skills category ${editingSkillsId ? "updated" : "created"} successfully!`);
      setSkillsForm({ title: "", skills: "", icon_name: "" });
      setEditingSkillsId(null);
      fetchSkills();
    } catch (err: any) {
      showStatus("error", err.message || "Failed to save skills.");
    } finally {
      setLoading(false);
    }
  };

  const editSkills = (s: any) => {
    setEditingSkillsId(s.id);
    setSkillsForm({
      title: s.title || "",
      icon_name: s.icon_name || "",
      skills: (s.skills || []).join(", ")
    });
    setActiveTab("skills");
  };

  const deleteSkills = async (id: string) => {
    if (!confirm("Are you sure you want to delete this skills category?")) return;
    setLoading(true);
    try {
      const { error } = await supabase.from("skills").delete().eq("id", id);
      if (error) throw error;
      showStatus("success", "Skills category deleted successfully!");
      fetchSkills();
    } catch (err: any) {
      showStatus("error", err.message || "Failed to delete skills.");
    } finally {
      setLoading(false);
    }
  };

  if (loading && !session) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#050505] text-white">
        <div className="text-center">
          <Loader2 className="w-8 h-8 animate-spin mx-auto text-[#0070f3] mb-4" />
          <p className="text-xs uppercase tracking-wider font-bold text-slate-500">Checking credentials...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#07080a] text-slate-200 flex flex-col font-sans selection:bg-[#0070f3]/20 selection:text-[#0070f3]">
      
      {/* Top Header */}
      <header className="border-b border-white/5 bg-[#0a0c10]/80 backdrop-blur-md px-6 py-4 flex items-center justify-between sticky top-0 z-40">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-[#0070f3] to-[#7928ca] flex items-center justify-center text-white font-heading font-black text-sm">
            VR
          </div>
          <div>
            <span className="font-heading font-black text-white text-sm block tracking-wider uppercase">Vivek Rautela</span>
            <span className="text-[10px] text-slate-500 font-bold uppercase tracking-wider">Control Panel</span>
          </div>
        </div>
        
        <div className="flex items-center gap-4">
          <span className="text-[10px] bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 font-bold px-3 py-1 rounded-full uppercase tracking-wider hidden sm:inline-block">
            {session?.user?.email}
          </span>
          <button
            onClick={handleLogout}
            className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 text-xs font-bold uppercase tracking-wider transition-all cursor-pointer"
          >
            <LogOut className="w-3.5 h-3.5" />
            Sign Out
          </button>
        </div>
      </header>

      {/* Main Workspace */}
      <div className="flex-1 flex flex-col md:flex-row">
        
        {/* Sidebar Nav */}
        <aside className="w-full md:w-64 border-b md:border-b-0 md:border-r border-white/5 bg-[#08090d] p-6 space-y-2 shrink-0">
          <p className="text-[10px] text-slate-500 font-extrabold uppercase tracking-wider mb-4 px-3">Management</p>
          
          {[
            { id: "overview", label: "Overview", icon: ShieldCheck },
            { id: "projects", label: "Projects", icon: FolderGit },
            { id: "skills", label: "Skills", icon: Cpu }
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-xs font-extrabold uppercase tracking-wider transition-all text-left cursor-pointer ${
                activeTab === tab.id 
                  ? "bg-[#0070f3]/10 border border-[#0070f3]/25 text-[#0070f3]" 
                  : "border border-transparent text-slate-400 hover:text-white hover:bg-white/5"
              }`}
            >
              <tab.icon className="w-4 h-4" />
              {tab.label}
            </button>
          ))}
        </aside>

        {/* Workspace Panels */}
        <main className="flex-grow p-6 md:p-10 relative overflow-y-auto max-w-4xl mx-auto w-full">
          
          {/* Status Message Overlay */}
          {statusMsg.text && (
            <div className={`mb-6 p-4 rounded-xl border font-bold text-xs flex items-center gap-2 ${
              statusMsg.type === "success" 
                ? "border-emerald-500/10 bg-emerald-500/5 text-emerald-400" 
                : "border-red-500/10 bg-red-500/5 text-red-400"
            }`}>
              {statusMsg.type === "success" ? "✓" : "⚠️"} {statusMsg.text}
            </div>
          )}

          {/* Tab: Overview */}
          {activeTab === "overview" && (
            <div className="space-y-8">
              <div className="rounded-3xl border border-white/5 bg-white/[0.01] p-6 md:p-8">
                <h2 className="text-xl md:text-2xl font-heading font-black text-white mb-2 flex items-center gap-2">
                  <ShieldCheck className="w-6 h-6 text-[#0070f3]" />
                  Admin Overview
                </h2>
                <p className="text-xs md:text-sm text-slate-400 leading-relaxed font-normal mb-6">
                  Welcome back, Vivek. You are logged in securely. From this portal, you can insert new records or edit existing featured projects and skills, sync database records, or manage dynamic content.
                </p>
                <div className="grid grid-cols-2 gap-4">
                  <div className="p-4 rounded-2xl bg-white/[0.02] border border-white/5">
                    <span className="text-[10px] text-slate-500 uppercase font-extrabold tracking-wider block mb-1">Total Projects</span>
                    <span className="text-2xl font-black text-white">{projects.length}</span>
                  </div>
                  <div className="p-4 rounded-2xl bg-white/[0.02] border border-white/5">
                    <span className="text-[10px] text-slate-500 uppercase font-extrabold tracking-wider block mb-1">Skills Categories</span>
                    <span className="text-2xl font-black text-white">{skills.length}</span>
                  </div>
                </div>
              </div>

              {/* DB Schema / SQL Editor Tab */}
              <div className="rounded-3xl border border-white/5 bg-[#090b0f] p-6 md:p-8 space-y-4">
                <div className="flex items-center gap-2">
                  <Database className="w-5 h-5 text-[#7928ca]" />
                  <h3 className="font-heading font-bold text-white text-base">Supabase Database Setup</h3>
                </div>
                <p className="text-xs text-slate-400 leading-relaxed font-normal">
                  If your Supabase database is empty, copy-paste the SQL code below into your <b>Supabase SQL Editor</b> and click **Run** to generate the required tables and public read permissions automatically:
                </p>
                
                <pre className="p-4 rounded-2xl bg-black border border-white/5 text-[10px] text-slate-300 font-mono overflow-x-auto whitespace-pre leading-relaxed select-all">
{`-- 1. Create projects table
create table projects (
  id uuid default gen_random_uuid() primary key,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  title text not null,
  category text,
  subtitle text,
  description text,
  image text,
  demo_link text,
  github_link text,
  highlights text[] default '{}',
  technologies text[] default '{}'
);

-- 2. Create skills table
create table skills (
  id uuid default gen_random_uuid() primary key,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  title text not null,
  skills text[] default '{}',
  icon_name text
);

-- 3. Enable RLS and select/write rules
alter table projects enable row level security;
alter table skills enable row level security;

create policy "Allow public read projects" on projects for select using (true);
create policy "Allow admin write projects" on projects for all using (auth.role() = 'authenticated');

create policy "Allow public read skills" on skills for select using (true);
create policy "Allow admin write skills" on skills for all using (auth.role() = 'authenticated');`}
                </pre>
              </div>
            </div>
          )}

          {/* Tab: Projects */}
          {activeTab === "projects" && (
            <div className="space-y-8">
              <div className="rounded-3xl border border-white/5 bg-white/[0.01] p-6 md:p-8">
                <h2 className="text-lg md:text-xl font-heading font-black text-white mb-6 flex items-center justify-between">
                  <span>{editingProjectId ? "Edit Project" : "Add New Project"}</span>
                  {editingProjectId && (
                    <button 
                      onClick={() => {
                        setEditingProjectId(null);
                        setProjectForm({ title: "", category: "", subtitle: "", description: "", image: "", demo_link: "", github_link: "", highlights: "", technologies: "" });
                      }}
                      className="text-[10px] uppercase font-bold text-[#ff0055] hover:underline cursor-pointer"
                    >
                      Cancel Edit
                    </button>
                  )}
                </h2>
                
                <form onSubmit={saveProject} className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="text-[10px] text-slate-500 uppercase font-extrabold tracking-wider block mb-1.5">Project Title</label>
                      <input
                        type="text"
                        value={projectForm.title}
                        onChange={(e) => setProjectForm({...projectForm, title: e.target.value})}
                        required
                        className="w-full px-4 py-2.5 rounded-xl bg-white/5 border border-white/10 text-xs text-white focus:outline-none focus:border-[#0070f3]/50"
                      />
                    </div>
                    <div>
                      <label className="text-[10px] text-slate-500 uppercase font-extrabold tracking-wider block mb-1.5">Category</label>
                      <input
                        type="text"
                        value={projectForm.category}
                        onChange={(e) => setProjectForm({...projectForm, category: e.target.value})}
                        placeholder="e.g. Filmmaking OS"
                        className="w-full px-4 py-2.5 rounded-xl bg-white/5 border border-white/10 text-xs text-white focus:outline-none focus:border-[#0070f3]/50"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="text-[10px] text-slate-500 uppercase font-extrabold tracking-wider block mb-1.5">Subtitle / Short Catchphrase</label>
                    <input
                      type="text"
                      value={projectForm.subtitle}
                      onChange={(e) => setProjectForm({...projectForm, subtitle: e.target.value})}
                      placeholder="e.g. The Operating System for Modern Filmmaking"
                      className="w-full px-4 py-2.5 rounded-xl bg-white/5 border border-white/10 text-xs text-white focus:outline-none focus:border-[#0070f3]/50"
                    />
                  </div>

                  <div>
                    <label className="text-[10px] text-slate-500 uppercase font-extrabold tracking-wider block mb-1.5">Description</label>
                    <textarea
                      value={projectForm.description}
                      onChange={(e) => setProjectForm({...projectForm, description: e.target.value})}
                      rows={3}
                      className="w-full px-4 py-2.5 rounded-xl bg-white/5 border border-white/10 text-xs text-white focus:outline-none focus:border-[#0070f3]/50"
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="text-[10px] text-slate-500 uppercase font-extrabold tracking-wider block mb-1.5">Live Demo URL</label>
                      <input
                        type="url"
                        value={projectForm.demo_link}
                        onChange={(e) => setProjectForm({...projectForm, demo_link: e.target.value})}
                        className="w-full px-4 py-2.5 rounded-xl bg-white/5 border border-white/10 text-xs text-white focus:outline-none focus:border-[#0070f3]/50"
                      />
                    </div>
                    <div>
                      <label className="text-[10px] text-slate-500 uppercase font-extrabold tracking-wider block mb-1.5">Codebase URL (Github)</label>
                      <input
                        type="url"
                        value={projectForm.github_link}
                        onChange={(e) => setProjectForm({...projectForm, github_link: e.target.value})}
                        className="w-full px-4 py-2.5 rounded-xl bg-white/5 border border-white/10 text-xs text-white focus:outline-none focus:border-[#0070f3]/50"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="text-[10px] text-slate-500 uppercase font-extrabold tracking-wider block mb-1.5">Cover Image Path / URL</label>
                      <input
                        type="text"
                        value={projectForm.image}
                        onChange={(e) => setProjectForm({...projectForm, image: e.target.value})}
                        placeholder="e.g. /images/tov_studio.png"
                        className="w-full px-4 py-2.5 rounded-xl bg-white/5 border border-white/10 text-xs text-white focus:outline-none focus:border-[#0070f3]/50"
                      />
                    </div>
                    <div>
                      <label className="text-[10px] text-slate-500 uppercase font-extrabold tracking-wider block mb-1.5">Technologies (comma separated)</label>
                      <input
                        type="text"
                        value={projectForm.technologies}
                        onChange={(e) => setProjectForm({...projectForm, technologies: e.target.value})}
                        placeholder="Next.js, React, Tailwind"
                        className="w-full px-4 py-2.5 rounded-xl bg-white/5 border border-white/10 text-xs text-white focus:outline-none focus:border-[#0070f3]/50"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="text-[10px] text-slate-500 uppercase font-extrabold tracking-wider block mb-1.5">Highlights (comma separated, include emojis)</label>
                    <input
                      type="text"
                      value={projectForm.highlights}
                      onChange={(e) => setProjectForm({...projectForm, highlights: e.target.value})}
                      placeholder="🤖 AI Production Assistant, 🎬 Script Workspace"
                      className="w-full px-4 py-2.5 rounded-xl bg-white/5 border border-white/10 text-xs text-white focus:outline-none focus:border-[#0070f3]/50"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full py-3 rounded-xl bg-white text-black hover:bg-slate-200 font-extrabold text-xs uppercase tracking-wider transition-all flex items-center justify-center gap-1.5 cursor-pointer mt-4"
                  >
                    <Save className="w-4 h-4" />
                    Save Project
                  </button>
                </form>
              </div>

              {/* Current Projects List */}
              <div className="space-y-4">
                <h3 className="text-sm font-extrabold uppercase tracking-wider text-slate-500 select-none">Existing Projects ({projects.length})</h3>
                
                {projects.length === 0 ? (
                  <div className="p-8 rounded-2xl bg-white/[0.01] border border-white/5 text-center text-slate-500 text-xs font-semibold">
                    No projects found in database. Seed tables or run the setup code.
                  </div>
                ) : (
                  <div className="space-y-3">
                    {projects.map((p) => (
                      <div 
                        key={p.id}
                        className="p-5 rounded-2xl border border-white/5 bg-white/[0.01] flex items-center justify-between gap-4"
                      >
                        <div className="text-left">
                          <span className="text-[9px] uppercase font-bold px-2 py-0.5 rounded-md bg-white/5 border border-white/10 text-[#0070f3] mb-1.5 inline-block">
                            {p.category}
                          </span>
                          <h4 className="font-heading font-bold text-white text-sm">{p.title}</h4>
                          <p className="text-[10px] text-slate-400 font-medium">{p.subtitle}</p>
                        </div>
                        <div className="flex gap-2">
                          <button
                            onClick={() => editProject(p)}
                            className="p-2.5 rounded-lg border border-white/10 bg-white/5 hover:bg-white/10 hover:text-[#0070f3] transition-all cursor-pointer text-slate-400"
                            aria-label="Edit project"
                          >
                            <Edit3 className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => deleteProject(p.id)}
                            className="p-2.5 rounded-lg border border-white/10 bg-white/5 hover:bg-white/10 hover:text-red-500 transition-all cursor-pointer text-slate-400"
                            aria-label="Delete project"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Tab: Skills */}
          {activeTab === "skills" && (
            <div className="space-y-8">
              <div className="rounded-3xl border border-white/5 bg-white/[0.01] p-6 md:p-8">
                <h2 className="text-lg md:text-xl font-heading font-black text-white mb-6 flex items-center justify-between">
                  <span>{editingSkillsId ? "Edit Skills Category" : "Add New Skills Category"}</span>
                  {editingSkillsId && (
                    <button 
                      onClick={() => {
                        setEditingSkillsId(null);
                        setSkillsForm({ title: "", skills: "", icon_name: "" });
                      }}
                      className="text-[10px] uppercase font-bold text-[#ff0055] hover:underline cursor-pointer"
                    >
                      Cancel Edit
                    </button>
                  )}
                </h2>
                
                <form onSubmit={saveSkills} className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="text-[10px] text-slate-500 uppercase font-extrabold tracking-wider block mb-1.5">Category Title</label>
                      <input
                        type="text"
                        value={skillsForm.title}
                        onChange={(e) => setSkillsForm({...skillsForm, title: e.target.value})}
                        placeholder="e.g. AI & Modern Tools"
                        required
                        className="w-full px-4 py-2.5 rounded-xl bg-white/5 border border-white/10 text-xs text-white focus:outline-none focus:border-[#0070f3]/50"
                      />
                    </div>
                    <div>
                      <label className="text-[10px] text-slate-500 uppercase font-extrabold tracking-wider block mb-1.5">Lucide Icon Name</label>
                      <input
                        type="text"
                        value={skillsForm.icon_name}
                        onChange={(e) => setSkillsForm({...skillsForm, icon_name: e.target.value})}
                        placeholder="e.g. Cpu, Video, Palette"
                        className="w-full px-4 py-2.5 rounded-xl bg-white/5 border border-white/10 text-xs text-white focus:outline-none focus:border-[#0070f3]/50"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="text-[10px] text-slate-500 uppercase font-extrabold tracking-wider block mb-1.5">Skills Tag List (comma separated)</label>
                    <input
                      type="text"
                      value={skillsForm.skills}
                      onChange={(e) => setSkillsForm({...skillsForm, skills: e.target.value})}
                      placeholder="Next.js, Python, Runway, Midjourney"
                      required
                      className="w-full px-4 py-2.5 rounded-xl bg-white/5 border border-white/10 text-xs text-white focus:outline-none focus:border-[#0070f3]/50"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full py-3 rounded-xl bg-white text-black hover:bg-slate-200 font-extrabold text-xs uppercase tracking-wider transition-all flex items-center justify-center gap-1.5 cursor-pointer mt-4"
                  >
                    <Save className="w-4 h-4" />
                    Save Category
                  </button>
                </form>
              </div>

              {/* Current Skills List */}
              <div className="space-y-4">
                <h3 className="text-sm font-extrabold uppercase tracking-wider text-slate-500 select-none">Existing Categories ({skills.length})</h3>
                
                {skills.length === 0 ? (
                  <div className="p-8 rounded-2xl bg-white/[0.01] border border-white/5 text-center text-slate-500 text-xs font-semibold">
                    No skills found in database. Seed tables or run the setup code.
                  </div>
                ) : (
                  <div className="space-y-3">
                    {skills.map((s) => (
                      <div 
                        key={s.id}
                        className="p-5 rounded-2xl border border-white/5 bg-white/[0.01] flex items-center justify-between gap-4"
                      >
                        <div className="text-left">
                          <h4 className="font-heading font-bold text-white text-sm flex items-center gap-2">
                            <span className="text-[10px] px-2 py-0.5 rounded-md bg-white/5 text-slate-400 font-mono">Icon: {s.icon_name}</span>
                            {s.title}
                          </h4>
                          <div className="flex flex-wrap gap-1 mt-2">
                            {(s.skills || []).map((sk: string, skIdx: number) => (
                              <span key={skIdx} className="text-[9px] px-2 py-0.5 rounded bg-white/5 border border-white/5 text-slate-400">
                                {sk}
                              </span>
                            ))}
                          </div>
                        </div>
                        <div className="flex gap-2">
                          <button
                            onClick={() => editSkills(s)}
                            className="p-2.5 rounded-lg border border-white/10 bg-white/5 hover:bg-white/10 hover:text-[#0070f3] transition-all cursor-pointer text-slate-400"
                            aria-label="Edit skills"
                          >
                            <Edit3 className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => deleteSkills(s.id)}
                            className="p-2.5 rounded-lg border border-white/10 bg-white/5 hover:bg-white/10 hover:text-red-500 transition-all cursor-pointer text-slate-400"
                            aria-label="Delete skills"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          )}

        </main>
      </div>

    </div>
  );
}
