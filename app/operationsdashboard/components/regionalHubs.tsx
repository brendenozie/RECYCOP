"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  MapIcon, 
  MapPinIcon, 
  CpuChipIcon, 
  SignalIcon, 
  CubeTransparentIcon,
  ChevronRightIcon,
  ExclamationCircleIcon
} from "@heroicons/react/24/outline";
import { cn } from "@/lib/utils";

const hubs = [
  { id: "NB-01", name: "Nairobi Central", region: "Plateau", load: 82, status: "Optimal", coords: { x: "35%", y: "40%" } },
  { id: "MS-02", name: "Mombasa Gateway", region: "Coastal", load: 45, status: "Optimal", coords: { x: "75%", y: "80%" } },
  { id: "KS-03", name: "Kisumu North", region: "Lake Basin", load: 28, status: "Maintenance", coords: { x: "15%", y: "35%" } },
  { id: "TH-04", name: "Thika Industrial", region: "Central", load: 91, status: "Near Capacity", coords: { x: "42%", y: "38%" } },
];

export function Hubs() {
  const [selectedHub, setSelectedHub] = useState(hubs[0]);

  return (
    <div className="space-y-10">
      {/* --- HEADER --- */}
      <header className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-12">
        <div className="space-y-1">
          <h1 className="text-4xl font-serif font-bold tracking-tight italic">Regional Hubs</h1>
          <p className="text-slate-500 dark:text-white/40 text-sm font-medium">
            Geospatial orchestration of <span className="text-emerald-500 font-bold">Node Infrastructure</span> across the corridor.
          </p>
        </div>
        
        <div className="flex items-center gap-4 bg-slate-50 dark:bg-white/5 p-4 rounded-[2rem] border border-slate-200 dark:border-white/10">
          <SignalIcon className="w-5 h-5 text-emerald-500 animate-pulse" />
          <span className="text-[10px] font-black uppercase tracking-widest text-slate-400">All Systems Operational</span>
        </div>
      </header>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-10">
        
        {/* --- INTERACTIVE RADAR MAP --- */}
        <div className="xl:col-span-2 relative aspect-[16/10] bg-slate-50 dark:bg-[#0a0515] rounded-[4rem] border border-slate-200 dark:border-white/10 overflow-hidden shadow-inner">
          {/* Decorative Grid Lines */}
          <div className="absolute inset-0 opacity-10 dark:opacity-20 pointer-events-none" 
               style={{ backgroundImage: 'linear-gradient(#10b981 1px, transparent 1px), linear-gradient(90deg, #10b981 1px, transparent 1px)', backgroundSize: '40px 40px' }} />
          
          <div className="absolute top-10 left-10">
            <h3 className="text-xs font-black uppercase tracking-[0.3em] text-emerald-500/50">Tactical Map Overlay</h3>
          </div>

          {/* Hub Pins */}
          {hubs.map((hub) => (
            <motion.button
              key={hub.id}
              onClick={() => setSelectedHub(hub)}
              className="absolute group z-20"
              style={{ left: hub.coords.x, top: hub.coords.y }}
              whileHover={{ scale: 1.2 }}
            >
              <div className="relative">
                <div className={cn(
                  "h-4 w-4 rounded-full border-4 border-white dark:border-[#05010d] shadow-lg transition-colors duration-500",
                  selectedHub.id === hub.id ? "bg-emerald-500 scale-125" : "bg-slate-400 dark:bg-white/20"
                )} />
                {selectedHub.id === hub.id && (
                  <span className="absolute inset-0 h-4 w-4 bg-emerald-500 rounded-full animate-ping opacity-75" />
                )}
                
                {/* Tooltip on Hover */}
                <div className="absolute top-6 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity bg-slate-900 text-white text-[10px] font-black px-3 py-1.5 rounded-lg whitespace-nowrap uppercase tracking-tighter">
                  {hub.name}
                </div>
              </div>
            </motion.button>
          ))}

          {/* Decorative Path Line (Nairobi to Mombasa) */}
          <svg className="absolute inset-0 w-full h-full pointer-events-none">
            <motion.path
              d="M 36% 41% L 74% 79%"
              stroke="currentColor"
              strokeWidth="2"
              strokeDasharray="8 8"
              className="text-emerald-500/30"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 2 }}
            />
          </svg>
        </div>

        {/* --- HUB INTELLIGENCE CARD --- */}
        <div className="space-y-6">
          <AnimatePresence mode="wait">
            <motion.div
              key={selectedHub.id}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="p-10 rounded-[3rem] border border-slate-200 dark:border-white/10 bg-white dark:bg-white/5 shadow-xl"
            >
              <div className="flex justify-between items-start mb-10">
                <div>
                  <p className="text-[10px] font-black text-emerald-500 uppercase tracking-widest mb-1">{selectedHub.id}</p>
                  <h3 className="text-3xl font-black tracking-tighter leading-none">{selectedHub.name}</h3>
                </div>
                <div className={cn(
                  "p-3 rounded-2xl",
                  selectedHub.status === "Optimal" ? "bg-emerald-500/10 text-emerald-500" : "bg-amber-500/10 text-amber-500"
                )}>
                  <CpuChipIcon className="w-6 h-6" />
                </div>
              </div>

              <div className="space-y-8">
                <div>
                  <div className="flex justify-between text-[11px] font-black uppercase tracking-widest mb-3">
                    <span className="text-slate-400">Current Load</span>
                    <span className="text-slate-900 dark:text-white">{selectedHub.load}%</span>
                  </div>
                  <div className="h-2 w-full bg-slate-100 dark:bg-white/10 rounded-full overflow-hidden">
                    <motion.div 
                      initial={{ width: 0 }}
                      animate={{ width: `${selectedHub.load}%` }}
                      className={cn("h-full rounded-full", selectedHub.load > 85 ? "bg-amber-500" : "bg-emerald-500")}
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="p-5 rounded-2xl bg-slate-50 dark:bg-white/5 border border-slate-100 dark:border-white/5">
                    <p className="text-[10px] font-black uppercase text-slate-400 mb-1">Region</p>
                    <p className="font-bold text-xs">{selectedHub.region}</p>
                  </div>
                  <div className="p-5 rounded-2xl bg-slate-50 dark:bg-white/5 border border-slate-100 dark:border-white/5">
                    <p className="text-[10px] font-black uppercase text-slate-400 mb-1">Status</p>
                    <p className="font-bold text-xs">{selectedHub.status}</p>
                  </div>
                </div>

                <div className="pt-8 border-t border-slate-100 dark:border-white/5">
                   <h4 className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-4">Core Assets</h4>
                   <div className="flex gap-3">
                     {[1, 2, 3].map(i => (
                       <div key={i} className="h-10 w-10 rounded-xl bg-slate-900 flex items-center justify-center text-white/40">
                         <CubeTransparentIcon className="w-5 h-5" />
                       </div>
                     ))}
                     <div className="h-10 w-10 rounded-xl border border-dashed border-slate-200 dark:border-white/10 flex items-center justify-center text-slate-300">
                       <ChevronRightIcon className="w-4 h-4" />
                     </div>
                   </div>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Maintenance / Alerts Box */}
          {selectedHub.status === "Maintenance" && (
            <motion.div 
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="p-8 rounded-[2.5rem] bg-amber-500/10 border border-amber-500/20 flex gap-5 items-start"
            >
              <ExclamationCircleIcon className="w-6 h-6 text-amber-500 flex-shrink-0" />
              <div>
                <p className="text-amber-500 font-black text-[11px] uppercase tracking-widest mb-1">Active Alert</p>
                <p className="text-amber-900/70 dark:text-amber-200/50 text-xs leading-relaxed">
                  Scheduled sorting line calibration in progress. Estimated completion: 14:00 EAT.
                </p>
              </div>
            </motion.div>
          )}
        </div>
      </div>
    </div>
  );
}