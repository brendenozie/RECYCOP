"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  TicketIcon, 
  ShieldCheckIcon, 
  MapPinIcon, 
  ArchiveBoxIcon,
  QrCodeIcon,
  CameraIcon,
  ExclamationTriangleIcon,
  ChevronRightIcon,
  SignalIcon
} from "@heroicons/react/24/outline";
import { cn } from "@/lib/utils";

const menuItems = [
  { id: "load", name: "Active Load", icon: TicketIcon },
  { id: "pass", name: "Transit Pass", icon: ShieldCheckIcon },
  { id: "route", name: "Route Map", icon: MapPinIcon },
  { id: "history", name: "History", icon: ArchiveBoxIcon },
];

export default function DriverMobileDashboard() {
  const [activeTab, setActiveTab] = useState("pass");

  return (
    <div className="min-h-screen bg-[#05010d] text-white font-sans selection:bg-emerald-500/30 overflow-x-hidden">
      
      {/* --- STATUS BAR SIMULATION --- */}
      <div className="px-8 pt-6 pb-2 flex justify-between items-center">
        <div className="flex items-center gap-2">
          <div className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
          <span className="text-[10px] font-black uppercase tracking-[0.2em] text-emerald-500">System Online</span>
        </div>
        <div className="flex gap-4">
          <SignalIcon className="w-4 h-4 text-white/20" />
          <span className="text-[10px] font-black text-white/40 italic">15:50 EAT</span>
        </div>
      </div>

      <main className="p-6 pb-32 space-y-8">
        
        {/* --- DYNAMIC CONTENT AREA --- */}
        <AnimatePresence mode="wait">
          {activeTab === "pass" && (
            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 1.1 }}
              className="space-y-6"
            >
              {/* THE TRANSIT PASS (POLICE/OFFICER VIEW) */}
              <div className="relative p-10 rounded-[3rem] bg-gradient-to-br from-emerald-500 to-teal-700 shadow-[0_20px_50px_rgba(16,185,129,0.3)] overflow-hidden">
                <div className="absolute -top-20 -right-20 w-64 h-64 bg-white/10 rounded-full blur-3xl" />
                
                <div className="relative z-10 flex flex-col items-center text-center">
                  <div className="p-4 bg-white rounded-[2rem] mb-6 shadow-2xl">
                    <QrCodeIcon className="w-24 h-24 text-slate-900" />
                  </div>
                  
                  <p className="text-[10px] font-black uppercase tracking-[0.4em] text-white/60 mb-1">Vehicle Authorization</p>
                  <h3 className="text-4xl font-black tracking-tighter italic mb-8">KDM 482C</h3>
                  
                  <div className="w-full grid grid-cols-2 gap-4 text-left border-t border-white/10 pt-8 mb-8">
                    <div>
                      <p className="text-[8px] font-black uppercase text-white/50 tracking-widest mb-1">Driver ID</p>
                      <p className="text-sm font-bold">J. KAMAU</p>
                    </div>
                    <div>
                      <p className="text-[8px] font-black uppercase text-white/50 tracking-widest mb-1">Manifest</p>
                      <p className="text-sm font-bold">3.2T PET-B</p>
                    </div>
                  </div>

                  <div className="w-full py-4 bg-black/20 backdrop-blur-md rounded-2xl border border-white/10">
                     <span className="text-[9px] font-black uppercase tracking-[0.2em] flex items-center justify-center gap-2">
                       <ShieldCheckIcon className="w-4 h-4 text-emerald-300" /> Verified Authority
                     </span>
                  </div>
                </div>
              </div>

              {/* QUICK STATUS CARD */}
              <div className="p-8 rounded-[2.5rem] bg-white/5 border border-white/10 flex items-center justify-between">
                <div>
                  <p className="text-[9px] font-black text-white/30 uppercase tracking-widest">Next Checkpoint</p>
                  <p className="text-lg font-bold italic">Mtito Andei Hub</p>
                </div>
                <div className="text-right">
                  <p className="text-[9px] font-black text-white/30 uppercase tracking-widest">ETA</p>
                  <p className="text-lg font-bold text-emerald-500">42m</p>
                </div>
              </div>
            </motion.div>
          )}

          {activeTab === "load" && (
            <motion.div 
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="p-10 rounded-[3rem] bg-white text-slate-900"
            >
              <TicketIcon className="w-12 h-12 text-emerald-600 mb-6" />
              <h2 className="text-3xl font-black italic tracking-tighter mb-2">Active Load</h2>
              <p className="text-slate-500 text-sm font-medium mb-10">Verification required at arrival.</p>
              
              <div className="space-y-6">
                 <button className="w-full py-6 bg-slate-100 rounded-3xl flex items-center justify-between px-8 group">
                    <span className="font-bold text-sm">Upload Bill of Lading</span>
                    <CameraIcon className="w-6 h-6 text-emerald-600" />
                 </button>
                 <button className="w-full py-6 bg-red-500 text-white rounded-3xl flex items-center justify-center gap-3 font-black uppercase tracking-widest text-[11px]">
                    <ExclamationTriangleIcon className="w-5 h-5" /> Report Incident
                 </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      {/* --- DYNAMIC BOTTOM NAVIGATION DOCK --- */}
      <nav className="fixed bottom-0 left-0 right-0 p-6 z-50">
        <div className="mx-auto max-w-md h-24 bg-[#1a1625]/80 backdrop-blur-3xl rounded-[3rem] border border-white/10 shadow-[0_-20px_40px_rgba(0,0,0,0.4)] flex items-center justify-around px-4">
          {menuItems.map((item) => (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={cn(
                "relative flex flex-col items-center justify-center w-16 h-16 transition-all duration-300",
                activeTab === item.id ? "text-emerald-500 scale-110" : "text-white/30 hover:text-white/60"
              )}
            >
              {activeTab === item.id && (
                <motion.div 
                  layoutId="activeDockGlow"
                  className="absolute -top-2 w-1 h-1 bg-emerald-500 rounded-full shadow-[0_0_10px_#10b981]" 
                />
              )}
              <item.icon className="w-7 h-7" />
              <span className="text-[8px] font-black uppercase tracking-tighter mt-1">{item.name.split(' ')[1] || item.name}</span>
            </button>
          ))}
          
          {/* PROFILE / AVATAR */}
          <div className="h-12 w-12 rounded-2xl bg-gradient-to-tr from-emerald-500 to-teal-400 p-[1.5px]">
             <div className="h-full w-full rounded-[14.5px] bg-[#05010d] flex items-center justify-center">
                <span className="text-[10px] font-black">JK</span>
             </div>
          </div>
        </div>
      </nav>

      {/* --- AMBIENT BG --- */}
      <div className="fixed bottom-0 left-0 w-full h-1/2 bg-gradient-to-t from-emerald-500/10 to-transparent pointer-events-none -z-10" />
    </div>
  );
}