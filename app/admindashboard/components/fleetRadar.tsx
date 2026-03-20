"use client";

import { motion } from "framer-motion";
import { 
  TruckIcon, 
  MapPinIcon, 
  ClockIcon, 
  ShieldCheckIcon, 
  ArrowPathIcon,
  ExclamationTriangleIcon
} from "@heroicons/react/24/outline";
import { cn } from "@/lib/utils";

const fleetStats = [
  { label: "On Road", value: "24", sub: "Active Units", icon: TruckIcon, color: "emerald" },
  { label: "Avg Speed", value: "42 km/h", sub: "Urban Corridor", icon: ArrowPathIcon, color: "blue" },
  { label: "Safety Score", value: "98.2", sub: "Fleet-wide Avg", icon: ShieldCheckIcon, color: "purple" },
  { label: "Alerts", value: "3", sub: "Needs Attention", icon: ExclamationTriangleIcon, color: "amber" },
];

export function Logistics() {
  return (
    <div className="space-y-10">
      {/* --- HEADER --- */}
      <header className="mb-12">
        <h1 className="text-4xl font-serif font-bold tracking-tight italic">Fleet Radar</h1>
        <p className="text-slate-500 dark:text-white/40 text-sm font-medium">
          Real-time telemetry and logistics orchestration across the <span className="text-emerald-500 font-bold">LAPSSET Corridor</span>.
        </p>
      </header>

      {/* --- QUICK STATS --- */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {fleetStats.map((stat, i) => (
          <div key={i} className="p-6 rounded-3xl bg-white dark:bg-white/5 border border-slate-200 dark:border-white/10">
            <stat.icon className={cn("w-6 h-6 mb-4", 
              stat.color === "emerald" ? "text-emerald-500" : 
              stat.color === "purple" ? "text-purple-500" : "text-blue-500"
            )} />
            <p className="text-[10px] font-black uppercase text-slate-400 tracking-widest">{stat.label}</p>
            <p className="text-2xl font-black">{stat.value}</p>
            <p className="text-[10px] font-bold text-slate-500/60 dark:text-white/20">{stat.sub}</p>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-10">
        {/* Active Transits Ledger */}
        <div className="xl:col-span-2 rounded-[3rem] border border-slate-200 dark:border-white/10 bg-white dark:bg-white/5 p-8 shadow-sm">
          <h3 className="text-xl font-bold mb-8">Active Transits</h3>
          <div className="space-y-4">
            {[
              { id: "FL-202", route: "Nairobi → Mombasa", cargo: "Post-Consumer PET", progress: 75, eta: "2h 15m" },
              { id: "FL-188", route: "Thika → Nairobi", cargo: "Industrial Scrap", progress: 30, eta: "45m" },
              { id: "FL-205", route: "Nakuru → Nairobi", cargo: "Mixed Plastics", progress: 92, eta: "12m" },
            ].map((truck, i) => (
              <div key={i} className="group p-6 rounded-3xl bg-slate-50 dark:bg-white/5 border border-transparent hover:border-emerald-500/20 transition-all">
                <div className="flex justify-between items-start mb-4">
                  <div className="flex items-center gap-4">
                    <div className="h-10 w-10 rounded-xl bg-emerald-500/10 flex items-center justify-center text-emerald-500">
                      <TruckIcon className="w-5 h-5" />
                    </div>
                    <div>
                      <p className="font-bold text-sm">{truck.id} — <span className="text-slate-400">{truck.cargo}</span></p>
                      <p className="text-[10px] font-black uppercase text-emerald-500 tracking-widest">{truck.route}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-xs font-bold flex items-center gap-2">
                      <ClockIcon className="w-3 h-3" /> {truck.eta}
                    </p>
                  </div>
                </div>
                <div className="h-1.5 w-full bg-slate-200 dark:bg-white/10 rounded-full overflow-hidden">
                  <motion.div 
                    initial={{ width: 0 }}
                    animate={{ width: `${truck.progress}%` }}
                    className="h-full bg-emerald-500" 
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Fleet Health / Map Preview Card */}
        <div className="rounded-[3rem] bg-emerald-600 p-8 text-white flex flex-col justify-between relative overflow-hidden shadow-xl shadow-emerald-500/20">
          <div className="relative z-10">
            <MapPinIcon className="w-10 h-10 mb-6" />
            <h3 className="text-2xl font-black italic mb-2">Network Health</h3>
            <p className="text-emerald-100/60 text-xs font-medium leading-relaxed">
              All 6 Regional Hubs are currently reporting optimal turnaround times (avg. 18 mins).
            </p>
          </div>
          <button className="w-full py-4 bg-white text-emerald-600 rounded-2xl font-black uppercase tracking-widest text-[10px] mt-12 hover:scale-[1.02] transition-transform">
            View Live Map
          </button>
          <div className="absolute -bottom-12 -right-12 opacity-10">
            <TruckIcon className="w-64 h-64 rotate-12" />
          </div>
        </div>
      </div>
    </div>
  );
}