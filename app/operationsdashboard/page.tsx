"use client";

import { useState } from "react";
import { 
  TruckIcon, 
  ShieldCheckIcon, 
  ArchiveBoxIcon, 
  ChartBarIcon, 
  CircleStackIcon, 
  Cog6ToothIcon, 
  Squares2X2Icon,
  MagnifyingGlassIcon,
  BellIcon,
  ChatBubbleLeftRightIcon
} from "@heroicons/react/24/outline";
import { AnimatePresence, motion } from "framer-motion";
import { cn } from "@/lib/utils";

// Components
import OpsDashboard from "./components/operationsDashboard";
import { Checkpoints } from "./components/opsCheckpoints";
import { FleetRadar } from "./components/opsFleetRadar";

const menuItems = [
  { id: "overview", label: "Overview", icon: Squares2X2Icon },
  { id: "fleet-radar", label: "Fleet Radar", icon: TruckIcon },
  { id: "checkpoints", label: "Checkpoints", icon: ShieldCheckIcon },
  { id: "verifications", label: "Verifications", icon: ArchiveBoxIcon },
  { id: "analytics", label: "Analytics", icon: ChartBarIcon },
];

export default function MainOperationsLayout() {
  const [activeTab, setActiveTab] = useState("overview");

  return (
    <div className="flex min-h-screen bg-[#fafafa] dark:bg-[#05010d] text-slate-900 dark:text-white font-sans antialiased selection:bg-emerald-500/30 overflow-hidden">
      
      {/* --- AMBIENT BACKGROUND ELEMENTS --- */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
        <motion.div 
          animate={{ 
            scale: [1, 1.2, 1],
            opacity: [0.08, 0.12, 0.08] 
          }}
          transition={{ duration: 10, repeat: Infinity }}
          className="absolute -top-[10%] -left-[10%] w-[50%] h-[50%] bg-emerald-500 blur-[120px] rounded-full" 
        />
        <div className="absolute bottom-[-5%] right-[-5%] w-[40%] h-[40%] bg-purple-500/5 blur-[100px] rounded-full" />
      </div>

      {/* --- SIDEBAR NAVIGATION --- */}
      <aside className="w-80 border-r border-slate-200/50 dark:border-white/5 hidden lg:flex flex-col p-8 sticky top-0 h-screen bg-white/40 dark:bg-transparent backdrop-blur-2xl z-20">
        <div className="flex items-center gap-4 mb-16 px-2">
          <div className="h-12 w-12 bg-emerald-600 rounded-2xl flex items-center justify-center shadow-2xl shadow-emerald-500/40 rotate-3 group-hover:rotate-0 transition-transform">
            <CircleStackIcon className="text-white w-7 h-7" />
          </div>
          <div>
            <span className="text-2xl font-black tracking-tighter uppercase italic font-serif leading-none block">
              RECYC<span className="text-emerald-500 not-italic font-sans">OP</span>
            </span>
            <span className="text-[9px] font-black text-slate-400 dark:text-white/20 uppercase tracking-[0.3em]">Ops Terminal v2.1</span>
          </div>
        </div>

        <nav className="flex-grow space-y-1.5">
          <p className="text-[10px] font-black uppercase tracking-[0.4em] text-slate-400/60 mb-6 px-4">Management</p>
          {menuItems.map((item) => (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={cn(
                "w-full flex items-center gap-4 px-5 py-4 rounded-2xl transition-all duration-500 font-bold text-[11px] uppercase tracking-widest group relative",
                activeTab === item.id 
                  ? "text-white" 
                  : "text-slate-500 dark:text-white/30 hover:text-emerald-500"
              )}
            >
              {activeTab === item.id && (
                <motion.div 
                  layoutId="activeGlow"
                  className="absolute inset-0 bg-emerald-600 shadow-2xl shadow-emerald-600/30 rounded-2xl z-0"
                  transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                />
              )}
              <item.icon className={cn("w-5 h-5 relative z-10 transition-transform group-hover:scale-110", activeTab === item.id ? "text-white" : "")} />
              <span className="relative z-10">{item.label}</span>
            </button>
          ))}
        </nav>

        <div className="mt-auto space-y-4 pt-8 border-t border-slate-200/50 dark:border-white/5">
          <button className="flex items-center gap-4 px-5 py-3 w-full text-slate-400 hover:text-emerald-500 text-[11px] font-black uppercase tracking-widest transition-colors">
            <ChatBubbleLeftRightIcon className="w-5 h-5" />
            Comms Hub
          </button>
          <button className="flex items-center gap-4 px-5 py-3 w-full text-slate-400 hover:text-emerald-500 text-[11px] font-black uppercase tracking-widest transition-colors">
            <Cog6ToothIcon className="w-5 h-5" />
            System Config
          </button>
        </div>
      </aside>

      {/* --- MAIN CONTENT AREA --- */}
      <div className="flex-grow flex flex-col h-screen relative z-10">
        
        {/* TOP BAR / SEARCH */}
        <header className="h-24 border-b border-slate-200/50 dark:border-white/5 px-12 flex items-center justify-between bg-white/20 dark:bg-transparent backdrop-blur-md">
          <div className="relative w-96 group">
            <MagnifyingGlassIcon className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 group-focus-within:text-emerald-500 transition-colors" />
            <input 
              type="text" 
              placeholder="SEARCH ASSETS, DRIVERS OR NODES..." 
              className="w-full bg-slate-100 dark:bg-white/5 border border-transparent focus:border-emerald-500/20 rounded-xl py-3 pl-12 pr-4 text-[10px] font-bold uppercase tracking-widest outline-none transition-all"
            />
          </div>
          
          <div className="flex items-center gap-6">
            <button className="relative p-2 text-slate-400 hover:text-emerald-500 transition-colors">
              <div className="absolute top-2 right-2 w-2 h-2 bg-emerald-500 rounded-full border-2 border-[#fafafa] dark:border-[#05010d]" />
              <BellIcon className="w-6 h-6" />
            </button>
            <div className="h-10 w-10 rounded-xl bg-gradient-to-tr from-emerald-500 to-teal-400 p-[1px]">
              <div className="h-full w-full rounded-[11px] bg-white dark:bg-slate-900 flex items-center justify-center font-black text-[10px]">
                JD
              </div>
            </div>
          </div>
        </header>

        {/* PAGE CONTENT */}
        <main className="flex-grow p-12 overflow-y-auto custom-scrollbar">
          <div className="max-w-[1500px] mx-auto">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeTab}
                initial={{ opacity: 0, y: 30, filter: "blur(20px)" }}
                animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                exit={{ opacity: 0, y: -30, filter: "blur(20px)" }}
                transition={{ duration: 0.5, ease: [0.19, 1, 0.22, 1] }}
              >
                {activeTab === "overview" && <OpsDashboard />}
                {activeTab === "fleet-radar" && <FleetRadar />}
                {activeTab === "checkpoints" && <Checkpoints />}
                
                {/* FALLBACK FOR WIP TABS */}
                {["verifications", "analytics"].includes(activeTab) && (
                  <div className="h-[60vh] flex flex-col items-center justify-center text-center">
                    <div className="h-20 w-20 rounded-3xl bg-emerald-500/10 flex items-center justify-center text-emerald-500 mb-6">
                      <ArchiveBoxIcon className="w-10 h-10 animate-pulse" />
                    </div>
                    <h2 className="text-3xl font-serif font-bold italic mb-2 uppercase tracking-tight">Node Syncing...</h2>
                    <p className="text-slate-500 text-sm max-w-xs">The {activeTab} module is currently optimizing data feeds from regional hubs.</p>
                  </div>
                )}
              </motion.div>
            </AnimatePresence>
          </div>
        </main>
      </div>
    </div>
  );
}