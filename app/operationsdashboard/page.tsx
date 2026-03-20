"use client";

import { 
  TruckIcon, 
  ShieldCheckIcon, 
  CameraIcon, 
  MapPinIcon, 
  ExclamationTriangleIcon 
} from "@heroicons/react/24/outline";

export default function OperationsDashboard() {
  return (
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
  );
}