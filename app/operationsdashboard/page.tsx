"use client";

import { cn } from "@/lib/utils";
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
  MapIcon,
  Squares2X2Icon
} from "@heroicons/react/24/outline";
import { useState } from "react";

export default function OperationsDashboard() {
    const [activeTab, setActiveTab] = useState("overview");

  return (
    <div className="flex min-h-screen bg-white dark:bg-[#05010d] text-slate-900 dark:text-white font-sans antialiased selection:bg-emerald-500/30">
          
          {/* --- SIDEBAR NAVIGATION --- */}
          <aside className="w-72 border-r border-slate-100 dark:border-white/5 hidden lg:flex flex-col p-8 sticky top-0 h-screen bg-white/50 dark:bg-transparent backdrop-blur-xl">
            <div className="flex items-center gap-3 mb-12 group cursor-pointer">
              <div className="h-10 w-10 bg-emerald-600 rounded-xl flex items-center justify-center shadow-lg shadow-emerald-500/20 group-hover:rotate-6 transition-transform">
                <CircleStackIcon className="text-white w-6 h-6" />
              </div>
              <span className="text-2xl font-black tracking-tighter uppercase italic font-serif">
                RECYC<span className="text-emerald-500 not-italic font-sans">OP</span>
              </span>
            </div>
    
            <nav className="flex-grow space-y-2">
              <p className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-400 mb-4 px-4">System Console</p>
              {[
                { id: "overview", label: "Overview", href: "/ops", icon: Squares2X2Icon },
                { id: "fleet-radar", label: "Fleet Radar", href: "/ops/fleet", icon: TruckIcon },
                { id: "checkpoints", label: "Checkpoints", href: "/ops/checkpoints", icon: ShieldCheckIcon },
                { id: "verifications", label: "Verifications", href: "/ops/verify", icon: ArchiveBoxIcon },
                { id: "analytics", label: "Analytics", href: "/ops/analytics", icon: ChartBarIcon },
              ]
              .map((item) => (
                <button
                  key={item.id}
                  onClick={() => setActiveTab(item.id)}
                  className={cn(
                    "w-full flex items-center gap-4 px-4 py-3.5 rounded-2xl transition-all duration-300 font-bold text-[11px] uppercase tracking-widest group",
                    activeTab === item.id 
                      ? "bg-emerald-600 text-white shadow-xl shadow-emerald-600/20" 
                      : "text-slate-500 dark:text-white/40 hover:bg-slate-50 dark:hover:bg-white/5 hover:text-emerald-600"
                  )}
                >
                  <item.icon className={cn("w-5 h-5 transition-transform group-hover:scale-110", activeTab === item.id ? "text-white" : "")} />
                  {item.label}
                </button>
              ))}
            </nav>
    
            <div className="mt-auto pt-8 border-t border-slate-100 dark:border-white/5">
              <button className="flex items-center gap-4 px-4 py-3 text-slate-400 text-[11px] font-black uppercase tracking-widest hover:text-emerald-500 transition-colors">
                <Cog6ToothIcon className="w-5 h-5" />
                System Config
              </button>
            </div>
          </aside>
    
          {/* --- MAIN CONTENT AREA --- */}
          <main className="flex-grow p-8 lg:p-12 overflow-y-auto">
            <div className="space-y-10">
              {/* Fleet Telemetry Stats */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {[
                  { label: "Active Trucks", value: "14", sub: "8 Return-Leg Drivers", icon: TruckIcon },
                  { label: "Pending Verifications", value: "23", sub: "Requires Photo Review", icon: CameraIcon },
                  { label: "Security Alerts", value: "0", sub: "All Checkpoints Clear", icon: ShieldCheckIcon },
                ].map((stat, i) => (
                  <div key={i} className="p-8 rounded-[2rem] bg-white dark:bg-white/5 border border-slate-200 dark:border-white/10">
                    <stat.icon className="w-8 h-8 text-emerald-500 mb-4" />
                    <p className="text-[10px] font-black uppercase tracking-widest text-slate-400">{stat.label}</p>
                    <p className="text-3xl font-bold tracking-tighter">{stat.value}</p>
                    <p className="text-xs text-slate-500">{stat.sub}</p>
                  </div>
                ))}
              </div>

              {/* Verification Queue - Vertical Timeline Style */}
              <div className="p-10 rounded-[3rem] border border-slate-200 dark:border-white/10 bg-white dark:bg-white/5">
                <h3 className="text-xl font-bold mb-8">Verification Queue (Nairobi - Thika Corridor)</h3>
                <div className="space-y-6">
                  {[1, 2, 3].map((_, i) => (
                    <div key={i} className="flex flex-col md:flex-row items-center justify-between p-6 rounded-3xl bg-slate-50 dark:bg-white/5 border border-transparent hover:border-emerald-500/20 transition-all gap-6">
                      <div className="flex items-center gap-6">
                        <div className="w-20 h-20 rounded-2xl bg-slate-200 dark:bg-slate-800 overflow-hidden">
                          <div className="w-full h-full flex items-center justify-center text-[10px] uppercase font-black text-slate-500">Load Photo</div>
                        </div>
                        <div>
                          <p className="font-bold">TX-8829 — {i === 0 ? "HDPE Polymer" : "Aluminum UBCs"}</p>
                          <p className="text-xs text-slate-500">Origin: Kisumu Aggregator Hub</p>
                        </div>
                      </div>
                      <div className="flex gap-3">
                        <button className="px-6 py-3 rounded-xl bg-slate-200 dark:bg-white/10 text-[10px] font-black uppercase tracking-widest">Reject</button>
                        <button className="px-6 py-3 rounded-xl bg-emerald-500 text-slate-900 text-[10px] font-black uppercase tracking-widest shadow-lg shadow-emerald-500/20">Verify Load</button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </main>

        </div>
  );
}