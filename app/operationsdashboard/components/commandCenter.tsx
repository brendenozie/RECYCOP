"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Squares2X2Icon, 
  TruckIcon, 
  UserGroupIcon, 
  ArchiveBoxIcon, 
  Cog6ToothIcon, 
  BellIcon, 
  MagnifyingGlassIcon,
  ArrowUpRightIcon,
  ChartBarIcon,
  CircleStackIcon,
  SparklesIcon,
  MapIcon
} from "@heroicons/react/24/outline";
import { cn } from "@/lib/utils";
import { UsersIcon } from "lucide-react";
// --- Custom Components ---

const ProgressGauge = ({ current, target }: { current: number; target: number }) => {
  const percentage = Math.min((current / target) * 100, 100);
  return (
    <div className="relative h-4 w-full bg-slate-100 dark:bg-white/5 rounded-full overflow-hidden">
      <motion.div 
        initial={{ width: 0 }}
        animate={{ width: `${percentage}%` }}
        transition={{ duration: 1.5, ease: "easeOut" }}
        className="absolute inset-y-0 left-0 bg-gradient-to-r from-emerald-600 to-emerald-400 shadow-[0_0_20px_rgba(16,185,129,0.4)]"
      />
    </div>
  );
};

// --- Mock Data ---
const stats = [
  { label: "Monthly Tonnage", value: "64.2 Tons", sub: "Goal: 100T", icon: CircleStackIcon, color: "emerald" },
  { label: "Active Hubs", value: "6 Nodes", sub: "Nairobi - Mombasa", icon: MapIcon, color: "purple" },
  { label: "CO2 Offset", value: "128.5 MT", sub: "+14.2 this week", icon: SparklesIcon, color: "emerald" },
  { label: "Coop Members", value: "412", sub: "16-Product Network", icon: UserGroupIcon, color: "blue" },
];


export function CommandCenter() {

  return (
    <div>
      {/* --- HEADER --- */}
        <header className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-16">
          <div className="space-y-1">
            <h1 className="text-4xl font-serif font-bold tracking-tight italic">Operations Control</h1>
            <p className="text-slate-500 dark:text-white/40 text-sm font-medium tracking-wide">
              Monitoring the <span className="text-emerald-500 font-bold">Kenya Industrial Corridor</span> value chain.
            </p>
          </div>

          <div className="flex items-center gap-4">
            <div className="relative group">
              <MagnifyingGlassIcon className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 group-hover:text-emerald-500 transition-colors" />
              <input 
                type="text" 
                placeholder="Search Chain of Custody..." 
                className="bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-2xl pl-12 pr-6 py-3.5 text-xs font-bold uppercase tracking-widest focus:outline-none focus:border-emerald-500 focus:ring-4 focus:ring-emerald-500/10 transition-all w-72"
              />
            </div>
            <button className="h-12 w-12 rounded-2xl border border-slate-200 dark:border-white/10 flex items-center justify-center relative hover:bg-slate-50 dark:hover:bg-white/5 transition-all">
              <BellIcon className="w-6 h-6 text-slate-500" />
              <span className="absolute top-3 right-3 h-2.5 w-2.5 bg-emerald-500 rounded-full border-2 border-white dark:border-[#05010d]" />
            </button>
          </div>
        </header>

        {/* --- STATS GRID --- */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-8 mb-16">
          {stats.map((stat, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1, duration: 0.8 }}
              className="p-8 rounded-[2.5rem] bg-white dark:bg-white/5 border border-slate-200 dark:border-white/10 hover:border-emerald-500/30 transition-all shadow-sm hover:shadow-2xl dark:shadow-none"
            >
              <div className="flex justify-between items-start mb-8">
                <div className={cn(
                  "p-3.5 rounded-2xl shadow-inner",
                  stat.color === "emerald" ? "bg-emerald-50 dark:bg-emerald-500/10 text-emerald-600 dark:text-emerald-400" : "bg-purple-50 dark:bg-purple-500/10 text-purple-600 dark:text-purple-400"
                )}>
                  <stat.icon className="w-6 h-6" />
                </div>
                <div className="text-[10px] font-black text-emerald-500 bg-emerald-500/10 px-3 py-1.5 rounded-full uppercase tracking-tighter">
                  Live Sync
                </div>
              </div>
              <p className="text-slate-400 dark:text-white/30 text-[10px] font-black uppercase tracking-[0.2em] mb-1">{stat.label}</p>
              <p className="text-4xl font-black tracking-tighter mb-1">{stat.value}</p>
              <p className="text-xs font-bold text-slate-500 dark:text-white/40 tracking-tight">{stat.sub}</p>
            </motion.div>
          ))}
        </div>

        {/* --- ROADMAP PROGRESS & RECENT ACTIVITY --- */}
        <div className="grid grid-cols-1 xl:grid-cols-3 gap-10">
          
          <div className="xl:col-span-2 space-y-10">
            {/* 100 Ton Progress Tracker */}
            <div className="p-10 rounded-[3rem] border border-slate-200 dark:border-white/10 bg-white dark:bg-white/5 shadow-sm">
              <div className="flex justify-between items-end mb-8">
                <div>
                  <h3 className="text-2xl font-bold tracking-tight mb-2">Expansion Progress</h3>
                  <p className="text-slate-500 text-sm">Scaling toward 100 tonnes monthly throughput.</p>
                </div>
                <div className="text-right">
                  <span className="text-3xl font-black text-emerald-600 dark:text-emerald-400">64%</span>
                </div>
              </div>
              <ProgressGauge current={64.2} target={100} />
              <div className="grid grid-cols-3 mt-8 pt-8 border-t border-slate-100 dark:border-white/5">
                 <div>
                   <p className="text-[10px] font-black uppercase text-slate-400 tracking-widest mb-1">Baseline</p>
                   <p className="font-bold">15 Tons</p>
                 </div>
                 <div className="text-center">
                   <p className="text-[10px] font-black uppercase text-slate-400 tracking-widest mb-1">Current</p>
                   <p className="font-bold text-emerald-500">64.2 Tons</p>
                 </div>
                 <div className="text-right">
                   <p className="text-[10px] font-black uppercase text-slate-400 tracking-widest mb-1">Target</p>
                   <p className="font-bold">100 Tons</p>
                 </div>
              </div>
            </div>

            {/* Hub Activity Table (The "Chain of Custody") */}
            <div className="rounded-[3rem] border border-slate-200 dark:border-white/10 bg-white dark:bg-white/5 p-10 overflow-hidden">
               <div className="flex items-center justify-between mb-10">
                 <h3 className="text-xl font-bold tracking-tight">Chain of Custody Tracking</h3>
                 <button className="text-[11px] font-black uppercase tracking-widest text-emerald-500 flex items-center gap-2 hover:gap-4 transition-all group">
                   Full Ledger <ArrowUpRightIcon className="w-5 h-5 group-hover:scale-125 transition-transform" />
                 </button>
               </div>
               <div className="space-y-4">
                 {[
                   { hub: "Mombasa Gateway", mat: "HDPE", qty: "4.2 Tons", status: "Verified" },
                   { hub: "Nairobi Central", mat: "Aluminum", qty: "1.8 Tons", status: "In Transit" },
                   { hub: "Kisumu North", mat: "PP Caps", qty: "0.9 Tons", status: "Verified" }
                 ].map((row, i) => (
                   <div key={i} className="flex items-center justify-between p-6 rounded-3xl bg-slate-50 dark:bg-white/5 border border-transparent hover:border-emerald-500/20 transition-all">
                      <div className="flex items-center gap-4">
                        <div className="h-10 w-10 rounded-full bg-emerald-500/10 flex items-center justify-center text-emerald-500 font-bold text-xs">
                          {row.hub[0]}
                        </div>
                        <div>
                          <p className="font-bold text-sm tracking-tight">{row.hub}</p>
                          <p className="text-[10px] text-slate-400 font-black uppercase tracking-widest">{row.mat}</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="font-black text-sm text-emerald-600 dark:text-emerald-400">{row.qty}</p>
                        <p className={cn("text-[10px] font-black uppercase tracking-tighter", row.status === "Verified" ? "text-emerald-500" : "text-amber-500")}>
                          {row.status}
                        </p>
                      </div>
                   </div>
                 ))}
               </div>
            </div>
          </div>

          {/* RIGHT COLUMN: ACTION & HEALTH */}
          <div className="space-y-8">
             <div className="p-10 rounded-[3rem] bg-slate-950 text-white relative overflow-hidden group">
                <div className="absolute top-0 right-0 p-6 opacity-10 group-hover:scale-110 transition-transform duration-1000">
                   <TruckIcon className="w-48 h-48 -mr-16 -mt-16" />
                </div>
                <h3 className="text-2xl font-bold mb-3 relative z-10 italic">Return Truck Dispatch</h3>
                <p className="text-white/40 text-xs mb-10 relative z-10 leading-relaxed font-medium">
                  8 independent drivers currently traveling empty on return legs in the <span className="text-white">Thika - Nairobi</span> corridor.
                </p>
                <button className="w-full py-5 rounded-2xl bg-emerald-500 text-slate-900 font-black uppercase tracking-widest text-[11px] hover:bg-emerald-400 transition-all relative z-10 shadow-lg shadow-emerald-500/20">
                   Analyze Efficiency
                </button>
             </div>

             <div className="p-10 rounded-[3rem] border border-slate-200 dark:border-white/10 bg-white dark:bg-white/5">
                <h3 className="text-lg font-bold mb-8 tracking-tight flex items-center gap-3">
                  <ChartBarIcon className="w-5 h-5 text-emerald-500" />
                  Regional Capacity
                </h3>
                <div className="space-y-6">
                   {[
                     { name: "Nairobi", cap: 85 },
                     { name: "Mombasa", cap: 42 },
                     { name: "Kisumu", cap: 28 },
                   ].map((hub) => (
                     <div key={hub.name} className="space-y-2">
                       <div className="flex justify-between text-[10px] font-black uppercase tracking-widest">
                         <span className="text-slate-400">{hub.name}</span>
                         <span className="text-emerald-500">{hub.cap}%</span>
                       </div>
                       <div className="h-1.5 w-full bg-slate-100 dark:bg-white/10 rounded-full overflow-hidden">
                         <div className="h-full bg-emerald-500 rounded-full" style={{ width: `${hub.cap}%` }} />
                       </div>
                     </div>
                   ))}
                </div>
             </div>
          </div>

        </div>
    </div>
  );
}