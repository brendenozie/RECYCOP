"use client";

import { motion } from "framer-motion";
import { 
  CurrencyDollarIcon, 
  CubeIcon, 
  TruckIcon, 
  ArrowUpRightIcon,
  CheckBadgeIcon,
  ArrowTrendingUpIcon,
  EllipsisHorizontalIcon,
  MapPinIcon,
  PlusIcon
} from "@heroicons/react/24/outline";
import { cn } from "@/lib/utils";

const recentTransactions = [
  { id: "TX-9921", type: "PET Clear Flakes", time: "5m ago", weight: "12.4t", status: "In Transit" },
  { id: "TX-9912", type: "HDPE Natural Pellets", time: "1h ago", weight: "8.7t", status: "In Transit" },
  { id: "TX-9901", type: "Clear PET Flakes", time: "22m ago", weight: "12.4t", status: "In Transit" },
];

export function SupplierOverview() {
  return (
    <div className="space-y-8">
      <div className="flex justify-between items-end">
        <div>
          <h2 className="text-3xl font-serif font-bold italic">Jambo, Alpha Aggregators</h2>
          <p className="text-slate-500 text-sm">Your collection center is performing <span className="text-emerald-500 font-bold">+12% better</span> than last month.</p>
        </div>
        <div className="h-12 w-12 rounded-2xl bg-emerald-500/10 flex items-center justify-center">
           <CheckBadgeIcon className="w-6 h-6 text-emerald-500" />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {[
          { label: "Total Earnings", value: "KES 142,500", sub: "Available for withdrawal", icon: CurrencyDollarIcon, color: "bg-emerald-500" },
          { label: "On-Site Inventory", value: "2.4 Tons", sub: "Ready for pickup", icon: CubeIcon, color: "bg-blue-500" },
          { label: "Active Requests", value: "2 Pickups", sub: "In transit to Nairobi Hub", icon: TruckIcon, color: "bg-purple-500" },
        ].map((stat, i) => (
          <motion.div 
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1 }}
            key={i} className="p-8 rounded-[2.5rem] bg-white dark:bg-white/5 border border-slate-200 dark:border-white/10 shadow-sm"
          >
            <div className={`h-12 w-12 rounded-2xl ${stat.color} flex items-center justify-center text-white mb-6 shadow-lg shadow-inherit/20`}>
              <stat.icon className="w-6 h-6" />
            </div>
            <p className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-1">{stat.label}</p>
            <p className="text-3xl font-bold tracking-tight mb-2">{stat.value}</p>
            <p className="text-xs text-slate-500 font-medium">{stat.sub}</p>
          </motion.div>
        ))}
      </div>

       
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
  );
}