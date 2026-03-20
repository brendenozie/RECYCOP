"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { 
  CubeIcon, 
  ArrowTrendingUpIcon, 
  BanknotesIcon, 
  TruckIcon,
  MapPinIcon,
  ArrowUpRightIcon,
  EllipsisHorizontalIcon,
  PlusIcon,
  CircleStackIcon,
  Cog6ToothIcon,
  ArchiveBoxIcon,
  ChartBarIcon,
  MapIcon,
  Squares2X2Icon
} from "@heroicons/react/24/outline";
import { cn } from "@/lib/utils";

export default function SupplierDashboard() {
  const [activeTab, setActiveTab] = useState("overview");

  const stats = [
    { label: "Total Collected", value: "142.8", unit: "TONNES", icon: CubeIcon, trend: "+12.5%", color: "text-emerald-600 dark:text-emerald-400" },
    { label: "Pending Payout", value: "84,200", unit: "KES", icon: BanknotesIcon, trend: "Active", color: "text-purple-600 dark:text-purple-400" },
    { label: "Active Pickups", value: "12", unit: "UNITS", icon: TruckIcon, trend: "3 Delayed", color: "text-amber-600 dark:text-amber-400" },
  ];

  const recentTransactions = [
    { id: "RC-9021", type: "Plastic (PET)", weight: "2.4t", status: "Verified", time: "2h ago" },
    { id: "RC-8944", type: "Aluminum", weight: "0.8t", status: "In-Transit", time: "5h ago" },
    { id: "RC-8812", type: "Paper/Board", weight: "1.2t", status: "Processing", time: "Yesterday" },
  ];

  return (
    <div className="flex min-h-screen bg-slate-50 dark:bg-[#05010d] text-slate-900 dark:text-white font-sans antialiased selection:bg-emerald-500/30 transition-colors duration-500">
      
      {/* --- BACKGROUND AMBIENT ELEMENTS --- */}
      <div className="fixed top-0 left-0 w-full h-full overflow-hidden pointer-events-none -z-10">
        <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-emerald-500/10 dark:bg-emerald-500/5 blur-[120px] rounded-full" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-purple-600/10 dark:bg-purple-600/5 blur-[120px] rounded-full" />
      </div>

      {/* --- SIDEBAR NAVIGATION --- */}
      <aside className="w-72 border-r border-slate-200 dark:border-white/5 hidden lg:flex flex-col p-8 sticky top-0 h-screen bg-white/80 dark:bg-transparent backdrop-blur-xl transition-colors">
        <div className="flex items-center gap-3 mb-12 group cursor-pointer">
          <div className="h-10 w-10 bg-emerald-600 rounded-xl flex items-center justify-center shadow-lg shadow-emerald-500/20 group-hover:rotate-6 transition-transform">
            <CircleStackIcon className="text-white w-6 h-6" />
          </div>
          <span className="text-2xl font-black tracking-tighter uppercase italic font-serif">
            RECYC<span className="text-emerald-500 not-italic font-sans">OP</span>
          </span>
        </div>

        <nav className="flex-grow space-y-2">
          <p className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-400 dark:text-slate-500 mb-4 px-4">System Console</p>
          {[
            { id: "overview", label: "Command Center", icon: Squares2X2Icon },
            { id: "logistics", label: "Fleet Radar", icon: TruckIcon },
            { id: "hubs", label: "Regional Hubs", icon: MapIcon },
            { id: "inventory", label: "Material Ledger", icon: ArchiveBoxIcon },
            { id: "analytics", label: "Impact Reports", icon: ChartBarIcon },
          ].map((item) => (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={cn(
                "w-full flex items-center gap-4 px-4 py-3.5 rounded-2xl transition-all duration-300 font-bold text-[11px] uppercase tracking-widest group",
                activeTab === item.id 
                  ? "bg-emerald-600 text-white shadow-xl shadow-emerald-600/20" 
                  : "text-slate-500 dark:text-white/40 hover:bg-slate-100 dark:hover:bg-white/5 hover:text-emerald-600"
              )}
            >
              <item.icon className={cn("w-5 h-5 transition-transform group-hover:scale-110", activeTab === item.id ? "text-white" : "")} />
              {item.label}
            </button>
          ))}
        </nav>

        <div className="mt-auto pt-8 border-t border-slate-200 dark:border-white/5">
          <button className="flex items-center gap-4 px-4 py-3 text-slate-400 dark:text-slate-500 text-[11px] font-black uppercase tracking-widest hover:text-emerald-500 transition-colors">
            <Cog6ToothIcon className="w-5 h-5" />
            System Config
          </button>
        </div>
      </aside>

      {/* --- MAIN CONTENT AREA --- */}
      <main className="flex-grow p-8 lg:p-12 overflow-y-auto">
        <div className="max-w-7xl mx-auto space-y-8">
          
          {/* Header */}
          <header className="flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div>
              <h1 className="text-3xl font-serif italic mb-1 text-slate-900 dark:text-white">
                Supplier <span className="text-emerald-600 dark:text-emerald-400 font-sans font-black uppercase tracking-tighter not-italic">Console</span>
              </h1>
              <div className="flex items-center gap-2 text-[10px] text-slate-500 dark:text-purple-200/40 uppercase tracking-[0.2em] font-black">
                <MapPinIcon className="w-3 h-3 text-emerald-500" />
                Nairobi Central Hub • Unit 04
              </div>
            </div>
            
            <div className="flex items-center gap-3">
              <button className="p-3 rounded-2xl bg-white dark:bg-white/5 border border-slate-200 dark:border-white/10 hover:bg-slate-50 dark:hover:bg-white/10 transition-all shadow-sm">
                <EllipsisHorizontalIcon className="w-5 h-5 text-slate-600 dark:text-white" />
              </button>
              <button className="flex items-center gap-2 px-6 py-3 bg-emerald-600 text-white dark:text-[#0a0118] dark:bg-emerald-500 rounded-2xl font-black uppercase tracking-widest text-[10px] shadow-lg shadow-emerald-500/20 hover:scale-[1.02] transition-all">
                <PlusIcon className="w-4 h-4" />
                New Log
              </button>
            </div>
          </header>

          {/* Stats Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {stats.map((stat, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                className="bg-white dark:bg-white/5 backdrop-blur-3xl border border-slate-200 dark:border-white/10 rounded-[2.5rem] p-8 relative overflow-hidden group shadow-sm dark:shadow-none"
              >
                <div className="absolute top-0 right-0 p-6 text-slate-200 dark:text-white opacity-20 dark:opacity-10 group-hover:opacity-30 dark:group-hover:opacity-20 transition-opacity">
                  <stat.icon className="w-16 h-16" />
                </div>
                <p className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 dark:text-purple-200/40 mb-4">{stat.label}</p>
                <div className="flex items-baseline gap-2">
                  <span className="text-4xl font-black tracking-tighter text-slate-900 dark:text-white">{stat.value}</span>
                  <span className="text-[10px] font-bold text-slate-400 dark:text-purple-200/30">{stat.unit}</span>
                </div>
                <div className={`mt-4 text-[10px] font-black flex items-center gap-1 ${stat.color}`}>
                  <ArrowTrendingUpIcon className="w-3 h-3" />
                  {stat.trend}
                </div>
              </motion.div>
            ))}
          </div>

          {/* Bento Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            
            {/* Recent Activity Table */}
            <div className="lg:col-span-8 bg-white dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-[2.5rem] overflow-hidden shadow-sm dark:shadow-none">
              <div className="p-8 border-b border-slate-100 dark:border-white/5 flex items-center justify-between">
                <h2 className="text-xs font-black uppercase tracking-widest text-slate-900 dark:text-white">Collection Ledger</h2>
                <button className="text-[10px] font-black text-emerald-600 dark:text-emerald-400 uppercase tracking-widest hover:underline">View History</button>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full text-left">
                  <thead>
                    <tr className="text-[10px] uppercase tracking-widest text-slate-400 dark:text-purple-200/20 border-b border-slate-100 dark:border-white/5">
                      <th className="px-8 py-4 font-black">ID</th>
                      <th className="px-8 py-4 font-black">Material</th>
                      <th className="px-8 py-4 font-black text-right">Net Weight</th>
                      <th className="px-8 py-4 font-black text-center">Status</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 dark:divide-white/5 text-sm">
                    {recentTransactions.map((tx, i) => (
                      <tr key={i} className="hover:bg-slate-50 dark:hover:bg-white/[0.02] transition-colors group">
                        <td className="px-8 py-6 font-mono text-slate-400 dark:text-purple-200/40 text-xs">{tx.id}</td>
                        <td className="px-8 py-6">
                          <div className="font-bold text-slate-900 dark:text-white">{tx.type}</div>
                          <div className="text-[10px] text-slate-400 dark:text-purple-200/30">{tx.time}</div>
                        </td>
                        <td className="px-8 py-6 text-right font-black text-emerald-600 dark:text-emerald-400">{tx.weight}</td>
                        <td className="px-8 py-6 text-center">
                          <span className="inline-block px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 text-[10px] font-black uppercase tracking-widest border border-emerald-500/20">
                            {tx.status}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Quick Actions & Logistics */}
            <div className="lg:col-span-4 space-y-6">
              <div className="bg-gradient-to-br from-purple-500/5 to-emerald-500/5 dark:from-purple-600/20 dark:to-emerald-500/10 border border-slate-200 dark:border-white/10 rounded-[2.5rem] p-8 shadow-sm dark:shadow-none">
                <h3 className="text-xs font-black uppercase tracking-widest mb-6 text-slate-900 dark:text-white">Logistics Hub</h3>
                <div className="space-y-4">
                  {[
                    { name: "Fleet Alpha", time: "ETA: 14:00", active: true, color: "text-emerald-500" },
                    { name: "Fleet Beta", time: "At Depot", active: false, color: "text-purple-500" }
                  ].map((fleet, i) => (
                    <div key={i} className={cn(
                      "p-4 rounded-2xl bg-white dark:bg-black/40 border border-slate-100 dark:border-white/5 flex items-center justify-between shadow-sm dark:shadow-none",
                      !fleet.active && "opacity-60"
                    )}>
                      <div className="flex items-center gap-3">
                        <TruckIcon className={cn("w-5 h-5", fleet.color)} />
                        <div>
                          <p className="text-[10px] font-black uppercase text-slate-900 dark:text-white">{fleet.name}</p>
                          <p className="text-[10px] text-slate-400 dark:text-purple-200/30">{fleet.time}</p>
                        </div>
                      </div>
                      <ArrowUpRightIcon className="w-4 h-4 text-slate-300 dark:text-purple-200/20" />
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-white dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-[2.5rem] p-8 shadow-sm dark:shadow-none">
                <h3 className="text-xs font-black uppercase tracking-widest mb-2 text-slate-900 dark:text-white">System Health</h3>
                <p className="text-[10px] text-slate-400 dark:text-purple-200/30 mb-6 font-bold leading-relaxed">Synchronization active with RecycOp Mainframe.</p>
                <div className="flex gap-1 h-1">
                  {[...Array(12)].map((_, i) => (
                    <div key={i} className={`flex-1 rounded-full ${i < 9 ? 'bg-emerald-500/40' : 'bg-slate-100 dark:bg-white/5'}`} />
                  ))}
                </div>
              </div>
            </div>

          </div>
        </div>
      </main>
    </div>
  );
}