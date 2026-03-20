"use client";

import { motion } from "framer-motion";
import { 
  ArchiveBoxIcon, 
  ArrowPathIcon, 
  BeakerIcon, 
  ScaleIcon, 
  ArrowsRightLeftIcon,
  FunnelIcon,
  ArrowDownTrayIcon
} from "@heroicons/react/24/outline";
import { cn } from "@/lib/utils";

const inventoryData = [
  { id: "MAT-PET-01", name: "PET Flakes", grade: "Clear/Clean", weight: "12.4t", change: "+2.1t", status: "In-Stock", color: "text-emerald-500" },
  { id: "MAT-HDPE-04", name: "HDPE Regrind", grade: "Mixed Color", weight: "8.2t", change: "-0.5t", status: "Low Stock", color: "text-amber-500" },
  { id: "MAT-ALU-09", name: "Aluminum Bale", grade: "UBC Standard", weight: "4.8t", change: "Stable", status: "In-Stock", color: "text-purple-500" },
  { id: "MAT-PP-02", name: "PP Caps", grade: "Unwashed", weight: "2.1t", change: "+0.8t", status: "Incoming", color: "text-blue-500" },
];

export function Inventory() {
  return (
    <div className="space-y-10">
      {/* --- HEADER --- */}
      <header className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-12">
        <div className="space-y-1">
          <h1 className="text-4xl font-serif font-bold tracking-tight italic text-slate-900 dark:text-white">Material Ledger</h1>
          <p className="text-slate-500 dark:text-white/40 text-sm font-medium">
            Real-time aggregate of <span className="text-emerald-500 font-bold">Resin & Metal</span> stockpiles across all nodes.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button className="flex items-center gap-2 px-5 py-3 border border-slate-200 dark:border-white/10 rounded-2xl text-[10px] font-black uppercase tracking-widest text-slate-500 dark:text-white/60 hover:bg-slate-50 dark:hover:bg-white/5 transition-all">
            <FunnelIcon className="w-4 h-4" />
            Filter
          </button>
          <button className="flex items-center gap-2 px-6 py-3 bg-emerald-600 dark:bg-emerald-500 text-white dark:text-slate-950 rounded-2xl font-black uppercase tracking-widest text-[10px] shadow-lg shadow-emerald-500/20 hover:scale-[1.02] transition-all">
            <ArrowDownTrayIcon className="w-4 h-4" />
            Export CSV
          </button>
        </div>
      </header>

      {/* --- INVENTORY GRID --- */}
      <div className="grid grid-cols-1 xl:grid-cols-4 gap-6 mb-10">
        {[
          { label: "Total Stockpile", value: "27.5t", icon: ScaleIcon, trend: "82% Capacity" },
          { label: "Processing", value: "4.2t", icon: ArrowPathIcon, trend: "3 Batch Active" },
          { label: "Quality Pass", value: "94%", icon: BeakerIcon, trend: "+2% MoM" },
          { label: "Dispatched", value: "112t", icon: ArrowsRightLeftIcon, trend: "LTD Volume" },
        ].map((item, i) => (
          <div key={i} className="p-8 rounded-[2.5rem] bg-white dark:bg-white/5 border border-slate-200 dark:border-white/10 relative overflow-hidden group shadow-sm dark:shadow-none">
            <item.icon className="absolute -right-4 -top-4 w-24 h-24 text-slate-100 dark:text-white/5 group-hover:scale-110 transition-transform duration-700" />
            <p className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 dark:text-white/20 mb-4">{item.label}</p>
            <p className="text-3xl font-black tracking-tighter text-slate-900 dark:text-white mb-1">{item.value}</p>
            <p className="text-[10px] font-bold text-emerald-500 uppercase tracking-tight">{item.trend}</p>
          </div>
        ))}
      </div>

      {/* --- LEDGER TABLE --- */}
      <div className="rounded-[3rem] border border-slate-200 dark:border-white/10 bg-white dark:bg-white/5 overflow-hidden shadow-sm dark:shadow-none">
        <div className="p-8 border-b border-slate-100 dark:border-white/5 flex items-center justify-between">
          <h3 className="text-sm font-black uppercase tracking-[0.2em] text-slate-400">Master Stock List</h3>
          <span className="text-[10px] font-bold text-slate-400">Last Synced: Just now</span>
        </div>
        
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="text-[10px] uppercase tracking-[0.2em] text-slate-400 dark:text-white/20 border-b border-slate-100 dark:border-white/5">
                <th className="px-8 py-5 font-black">Material SKU</th>
                <th className="px-8 py-5 font-black">Grade/Type</th>
                <th className="px-8 py-5 font-black text-right">Net Weight</th>
                <th className="px-8 py-5 font-black text-center">Status</th>
                <th className="px-8 py-5 font-black">Velocity</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-white/5">
              {inventoryData.map((item, i) => (
                <tr key={i} className="group hover:bg-slate-50 dark:hover:bg-white/[0.02] transition-colors">
                  <td className="px-8 py-7">
                    <div className="flex items-center gap-4">
                      <div className="h-10 w-10 rounded-xl bg-slate-100 dark:bg-white/5 flex items-center justify-center text-slate-400 dark:text-white/30 group-hover:text-emerald-500 transition-colors">
                        <ArchiveBoxIcon className="w-5 h-5" />
                      </div>
                      <div>
                        <p className="font-bold text-slate-900 dark:text-white">{item.name}</p>
                        <p className="text-[10px] font-mono text-slate-400">{item.id}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-8 py-7">
                    <p className="text-xs font-bold text-slate-600 dark:text-white/50">{item.grade}</p>
                  </td>
                  <td className="px-8 py-7 text-right">
                    <p className="text-lg font-black tracking-tight text-slate-900 dark:text-white">{item.weight}</p>
                  </td>
                  <td className="px-8 py-7 text-center">
                    <span className={cn(
                      "px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest border",
                      item.status === "Low Stock" 
                        ? "bg-amber-500/10 text-amber-500 border-amber-500/20" 
                        : "bg-emerald-500/10 text-emerald-500 border-emerald-500/20"
                    )}>
                      {item.status}
                    </span>
                  </td>
                  <td className="px-8 py-7">
                    <div className={cn("text-xs font-black flex items-center gap-1", item.color)}>
                      {item.change}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* --- FOOTER CAPACITY BAR --- */}
      <div className="p-10 rounded-[3rem] bg-slate-900 dark:bg-white/5 border border-transparent dark:border-white/10 text-white shadow-2xl">
        <div className="flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex items-center gap-6">
            <div className="h-16 w-16 rounded-2xl bg-emerald-500 flex items-center justify-center shadow-lg shadow-emerald-500/40">
              <ScaleIcon className="w-8 h-8 text-slate-900" />
            </div>
            <div>
              <h4 className="text-xl font-bold tracking-tight">Total Hub Utilization</h4>
              <p className="text-white/40 text-xs font-medium uppercase tracking-widest">Aggregate Across 6 Industrial Nodes</p>
            </div>
          </div>
          <div className="flex-grow max-w-md w-full">
            <div className="flex justify-between text-[10px] font-black uppercase mb-2 tracking-widest">
              <span>Current Load: 27.5t</span>
              <span className="text-emerald-400">Limit: 35.0t</span>
            </div>
            <div className="h-2 w-full bg-white/10 rounded-full overflow-hidden">
              <motion.div 
                initial={{ width: 0 }}
                animate={{ width: "78.5%" }}
                transition={{ duration: 2, ease: "easeOut" }}
                className="h-full bg-gradient-to-r from-emerald-500 to-emerald-300"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}