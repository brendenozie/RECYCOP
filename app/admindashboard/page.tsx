"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Squares2X2Icon, 
  TruckIcon, 
  UserGroupIcon, 
  ArchiveBoxIcon, 
  Cog6ToothIcon, 
  MapIcon,
  ChartBarIcon,
  CircleStackIcon,
  Bars3BottomLeftIcon,
  XMarkIcon
} from "@heroicons/react/24/outline";
import { cn } from "@/lib/utils";

// --- Components ---
import { UserAccess } from "./components/userAccess";
import { Logistics } from "./components/fleetRadar";
import { Hubs } from "./components/regionalHubs";
import { Inventory } from "./components/materialLedger";
import { Analytics } from "./components/impactReports";
import { CommandCenter } from "./components/commandCenter";
import { SystemConfig } from "./components/systemConfig";

const navItems = [
  { id: "overview", label: "Command Center", icon: Squares2X2Icon },
  { id: "logistics", label: "Fleet Radar", icon: TruckIcon },
  { id: "hubs", label: "Regional Hubs", icon: MapIcon },
  { id: "inventory", label: "Material Ledger", icon: ArchiveBoxIcon },
  { id: "analytics", label: "Impact Reports", icon: ChartBarIcon },
  { id: "users", label: "User Access", icon: UserGroupIcon },
];

export default function AdminDashboard() {
  const [activeTab, setActiveTab] = useState("overview");
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Close mobile menu on tab change
  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [activeTab]);

  return (
    <div className="flex min-h-screen bg-white dark:bg-[#05010d] text-slate-900 dark:text-white font-sans antialiased selection:bg-emerald-500/30 overflow-hidden">
      
      {/* --- DYNAMIC BACKGROUND GLOW --- */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-emerald-500/10 blur-[120px] rounded-full animate-pulse" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-purple-500/10 blur-[120px] rounded-full" />
      </div>

      {/* --- MOBILE NAVIGATION HEADER --- */}
      <header className="lg:hidden fixed top-0 left-0 right-0 z-50 p-4 bg-white/80 dark:bg-[#05010d]/80 backdrop-blur-xl border-b border-slate-100 dark:border-white/5 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <CircleStackIcon className="w-6 h-6 text-emerald-500" />
          <span className="font-serif font-black italic tracking-tighter uppercase">RecycOp</span>
        </div>
        <button 
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className="p-2 rounded-xl bg-slate-50 dark:bg-white/5"
        >
          {isMobileMenuOpen ? <XMarkIcon className="w-6 h-6" /> : <Bars3BottomLeftIcon className="w-6 h-6" />}
        </button>
      </header>

      {/* --- DESKTOP SIDEBAR --- */}
      <aside className="w-80 border-r border-slate-100 dark:border-white/5 hidden lg:flex flex-col p-8 sticky top-0 h-screen bg-white/50 dark:bg-transparent backdrop-blur-xl z-40">
        <div className="flex items-center gap-3 mb-16 group cursor-pointer">
          <motion.div 
            whileHover={{ rotate: 15 }}
            className="h-12 w-12 bg-emerald-600 rounded-2xl flex items-center justify-center shadow-2xl shadow-emerald-500/40"
          >
            <CircleStackIcon className="text-white w-7 h-7" />
          </motion.div>
          <span className="text-2xl font-black tracking-tighter uppercase italic font-serif">
            RECYC<span className="text-emerald-500 not-italic font-sans">OP</span>
          </span>
        </div>

        <nav className="flex-grow space-y-2">
          <p className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-400 mb-6 px-4">Core Systems</p>
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={cn(
                "w-full flex items-center gap-4 px-5 py-4 rounded-2xl transition-all duration-500 font-bold text-[11px] uppercase tracking-widest group relative overflow-hidden",
                activeTab === item.id 
                  ? "text-white" 
                  : "text-slate-500 dark:text-white/40 hover:bg-slate-50 dark:hover:bg-white/5"
              )}
            >
              {activeTab === item.id && (
                <motion.div 
                  layoutId="activeNav"
                  className="absolute inset-0 bg-emerald-600 shadow-xl shadow-emerald-600/20"
                  transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                />
              )}
              <item.icon className={cn("w-5 h-5 relative z-10 transition-transform group-hover:scale-110", activeTab === item.id ? "text-white" : "group-hover:text-emerald-500")} />
              <span className="relative z-10">{item.label}</span>
            </button>
          ))}
        </nav>

        <div className="mt-auto pt-8 border-t border-slate-100 dark:border-white/5">
          <button 
            onClick={() => setActiveTab("config")}
            className={cn(
              "w-full flex items-center gap-4 px-5 py-4 rounded-2xl transition-colors font-black text-[11px] uppercase tracking-widest",
              activeTab === "config" ? "text-emerald-500" : "text-slate-400 hover:text-emerald-500"
            )}
          >
            <Cog6ToothIcon className="w-5 h-5" />
            System Config
          </button>
        </div>
      </aside>

      {/* --- MOBILE MENU OVERLAY --- */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, x: -100 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -100 }}
            className="fixed inset-0 z-[60] lg:hidden bg-white dark:bg-[#05010d] p-8 flex flex-col"
          >
            <div className="flex justify-between items-center mb-12">
              <span className="text-2xl font-black italic tracking-tighter uppercase font-serif">RecycOp</span>
              <button onClick={() => setIsMobileMenuOpen(false)} className="p-2"><XMarkIcon className="w-8 h-8" /></button>
            </div>
            <div className="space-y-4">
              {navItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => setActiveTab(item.id)}
                  className={cn(
                    "w-full flex items-center gap-6 p-6 rounded-3xl text-sm font-black uppercase tracking-widest",
                    activeTab === item.id ? "bg-emerald-600 text-white" : "bg-slate-50 dark:bg-white/5 text-slate-400"
                  )}
                >
                  <item.icon className="w-6 h-6" />
                  {item.label}
                </button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* --- MAIN CONTENT AREA --- */}
      <main className="flex-grow pt-24 lg:pt-12 p-6 lg:p-16 overflow-y-auto custom-scrollbar">
        <div className="max-w-[1600px] mx-auto">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 20, filter: "blur(10px)" }}
              animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              exit={{ opacity: 0, y: -20, filter: "blur(10px)" }}
              transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
            >
              {activeTab === "overview" && <CommandCenter />}
              {activeTab === "logistics" && <Logistics />}
              {activeTab === "hubs" && <Hubs />}
              {activeTab === "inventory" && <Inventory />}
              {activeTab === "analytics" && <Analytics />}
              {activeTab === "users" && <UserAccess />}
              {activeTab === "config" && <SystemConfig />}
            </motion.div>
          </AnimatePresence>
        </div>
      </main>
    </div>
  );
}