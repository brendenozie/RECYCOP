"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  TruckIcon, 
  ShieldCheckIcon, 
  CameraIcon, 
  MapPinIcon, 
  ExclamationTriangleIcon,
  ArchiveBoxIcon,
  ChartBarIcon,
  CircleStackIcon,
  Cog6ToothIcon,
  Squares2X2Icon,
  CheckBadgeIcon,
  NoSymbolIcon,
  EyeIcon,
  ClockIcon
} from "@heroicons/react/24/outline";
import { cn } from "@/lib/utils";

const verificationQueue = [
  { id: "TX-8829", material: "HDPE Polymer", origin: "Kisumu Hub", weight: "4.2t", time: "2m ago", image: "https://images.unsplash.com/photo-1591871937573-74dbba515c4c?auto=format&fit=crop&q=80&w=200" },
  { id: "TX-9012", material: "Aluminum UBCs", origin: "Thika Node", weight: "1.8t", time: "14m ago", image: "https://images.unsplash.com/photo-1532996122724-e3c354a0b15b?auto=format&fit=crop&q=80&w=200" },
  { id: "TX-7741", material: "Clear PET Flakes", origin: "Nairobi Central", weight: "12.4t", time: "22m ago", image: "https://images.unsplash.com/photo-1611284446314-60a58ac0deb9?auto=format&fit=crop&q=80&w=200" },
];

export default function OpsDashboard() {

  return (
    <div>
      <header className="mb-12 flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div>
            <h1 className="text-4xl font-serif font-bold italic tracking-tight">Mission Control</h1>
            <p className="text-slate-500 text-sm font-medium">Monitoring <span className="text-emerald-500 font-bold">14 active units</span> across the Nairobi-Mombasa corridor.</p>
          </div>
          <div className="flex gap-4">
             <div className="px-6 py-3 rounded-2xl bg-slate-100 dark:bg-white/5 border border-slate-200 dark:border-white/10 flex items-center gap-3">
                <div className="h-2 w-2 rounded-full bg-emerald-500 animate-ping" />
                <span className="text-[10px] font-black uppercase tracking-widest">Live Feed</span>
             </div>
          </div>
        </header>

        {/* TELEMETRY CARDS */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          {[
            { label: "Active Fleet", value: "14", trend: "8 Return-Leg", icon: TruckIcon, color: "text-emerald-500" },
            { label: "Pending Photos", value: "23", trend: "Requires Action", icon: CameraIcon, color: "text-blue-500" },
            { label: "System Health", value: "99.8%", trend: "All Nodes Green", icon: ShieldCheckIcon, color: "text-purple-500" },
          ].map((stat, i) => (
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              key={i} 
              className="p-10 rounded-[3rem] bg-white dark:bg-white/5 border border-slate-200 dark:border-white/10 hover:border-emerald-500/20 transition-all shadow-sm"
            >
              <stat.icon className={cn("w-10 h-10 mb-6", stat.color)} />
              <p className="text-[11px] font-black uppercase tracking-[0.2em] text-slate-400 mb-2">{stat.label}</p>
              <p className="text-4xl font-black tracking-tighter mb-1">{stat.value}</p>
              <p className="text-xs font-bold text-slate-500/60 dark:text-white/20">{stat.trend}</p>
            </motion.div>
          ))}
        </div>

        {/* VERIFICATION QUEUE */}
        <section className="p-10 rounded-[3rem] border border-slate-200 dark:border-white/10 bg-white dark:bg-white/5 relative overflow-hidden">
          <div className="flex items-center justify-between mb-10">
            <div>
              <h3 className="text-2xl font-bold tracking-tight mb-1">Visual Verification Queue</h3>
              <p className="text-sm text-slate-500 font-medium">Review and sign off on material cargo photos from the field.</p>
            </div>
            <button className="text-[10px] font-black uppercase tracking-widest text-emerald-500 hover:bg-emerald-500/5 px-4 py-2 rounded-xl transition-all">View All Queue</button>
          </div>

          <div className="space-y-4">
            <AnimatePresence>
              {verificationQueue.map((item, i) => (
                <motion.div 
                  key={item.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.1 }}
                  className="group flex flex-col xl:flex-row items-center justify-between p-6 rounded-[2.5rem] bg-slate-50 dark:bg-white/[0.02] border border-transparent hover:border-emerald-500/10 hover:bg-white dark:hover:bg-white/5 transition-all gap-8"
                >
                  <div className="flex items-center gap-8 w-full xl:w-auto">
                    <div className="relative h-24 w-32 shrink-0 rounded-3xl overflow-hidden shadow-lg">
                      <img src={item.image} alt="Cargo" className="h-full w-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700" />
                      <div className="absolute inset-0 bg-black/20 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                        <EyeIcon className="w-6 h-6 text-white" />
                      </div>
                    </div>
                    <div>
                      <div className="flex items-center gap-3 mb-2">
                        <span className="text-[10px] font-black bg-slate-900 text-white px-3 py-1 rounded-full uppercase tracking-widest">{item.id}</span>
                        <span className="text-[10px] font-black text-emerald-500 uppercase tracking-widest flex items-center gap-1">
                          <ClockIcon className="w-3 h-3" /> {item.time}
                        </span>
                      </div>
                      <h4 className="text-xl font-black tracking-tight">{item.material}</h4>
                      <p className="text-xs font-bold text-slate-400 uppercase tracking-tighter">Origin: <span className="text-slate-600 dark:text-white/60">{item.origin}</span> • Weight: <span className="text-slate-600 dark:text-white/60">{item.weight}</span></p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3 w-full xl:w-auto">
                    <button className="flex-1 xl:flex-none flex items-center justify-center gap-2 px-8 py-4 rounded-2xl bg-slate-200 dark:bg-white/5 text-slate-600 dark:text-white/40 text-[10px] font-black uppercase tracking-widest hover:bg-red-500/10 hover:text-red-500 transition-all">
                      <NoSymbolIcon className="w-4 h-4" /> Flag
                    </button>
                    <button className="flex-1 xl:flex-none flex items-center justify-center gap-2 px-10 py-4 rounded-2xl bg-emerald-600 text-white text-[10px] font-black uppercase tracking-widest shadow-xl shadow-emerald-600/20 hover:scale-[1.02] transition-all">
                      <CheckBadgeIcon className="w-4 h-4" /> Approve Load
                    </button>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        </section>
    </div>
  );
}