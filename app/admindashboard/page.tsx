"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { 
  LayoutDashboard, 
  Truck, 
  Users, 
  Database, 
  Settings, 
  Bell, 
  Search,
  ArrowUpRight,
  TrendingUp,
  Activity,
  Box,
  CreditCard
} from "lucide-react";
import { cn } from "@/lib/utils";

// --- Mock Data for the Dashboard ---
const stats = [
  { label: "Total Aggregated", value: "124.5 Tons", change: "+12%", icon: Database, color: "emerald" },
  { label: "Active Collectors", value: "1,842", change: "+5.4%", icon: Users, color: "purple" },
  { label: "Material Value", value: "$42,105", change: "+8.2%", icon: CreditCard, color: "emerald" },
  { label: "Logistics Uptime", value: "99.2%", change: "Stable", icon: Activity, color: "blue" },
];

const recentTransactions = [
  { id: "TX-9021", hub: "Kamukunji Hub", material: "PET-A", weight: "450kg", status: "Verified", time: "2 mins ago" },
  { id: "TX-9022", hub: "Mombasa Port", material: "HDPE", weight: "1,200kg", status: "Processing", time: "15 mins ago" },
  { id: "TX-9023", hub: "Kisumu North", material: "PET-B", weight: "820kg", status: "Verified", time: "1 hour ago" },
];

export default function AdminDashboard() {
  const [activeTab, setActiveTab] = useState("overview");

  return (
    <div className="flex min-h-screen bg-white dark:bg-[#05010d] text-slate-900 dark:text-white font-sans antialiased">
      
      {/* --- SIDEBAR NAVIGATION --- */}
      <aside className="w-72 border-r border-slate-100 dark:border-white/5 hidden lg:flex flex-col p-8 sticky top-0 h-screen">
        <div className="flex items-center gap-3 mb-12">
          <div className="h-10 w-10 bg-emerald-500 rounded-xl flex items-center justify-center shadow-lg shadow-emerald-500/20">
            <Database className="text-white w-6 h-6" />
          </div>
          <span className="font-serif text-2xl font-bold tracking-tighter">Recyc<span className="text-emerald-500 italic">Op</span></span>
        </div>

        <nav className="flex-grow space-y-2">
          {[
            { id: "overview", label: "Command Center", icon: LayoutDashboard },
            { id: "logistics", label: "Logistics Fleet", icon: Truck },
            { id: "aggregators", label: "Cooperative Hubs", icon: Users },
            { id: "inventory", label: "Material Ledger", icon: Box },
          ].map((item) => (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={cn(
                "w-full flex items-center gap-4 px-4 py-3 rounded-2xl transition-all font-bold text-xs uppercase tracking-widest",
                activeTab === item.id 
                  ? "bg-emerald-500 dark:bg-emerald-400 text-white dark:text-slate-900 shadow-lg shadow-emerald-500/20" 
                  : "text-slate-400 hover:bg-slate-50 dark:hover:bg-white/5"
              )}
            >
              <item.icon className="w-4 h-4" />
              {item.label}
            </button>
          ))}
        </nav>

        <div className="mt-auto pt-8 border-t border-slate-100 dark:border-white/5">
          <button className="flex items-center gap-4 px-4 py-3 text-slate-400 text-xs font-bold uppercase tracking-widest hover:text-emerald-500 transition-colors">
            <Settings className="w-4 h-4" />
            System Settings
          </button>
        </div>
      </aside>

      {/* --- MAIN CONTENT AREA --- */}
      <main className="flex-grow p-8 lg:p-12 overflow-y-auto">
        
        {/* --- TOP BAR --- */}
        <header className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-12">
          <div>
            <h1 className="text-3xl font-serif font-bold tracking-tight">System Overview</h1>
            <p className="text-slate-500 dark:text-white/40 text-sm">Real-time telemetry for the Kenya Hub Network.</p>
          </div>

          <div className="flex items-center gap-4">
            <div className="relative group">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 group-hover:text-emerald-500 transition-colors" />
              <input 
                type="text" 
                placeholder="Search TxID or Hub..." 
                className="bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-2xl pl-12 pr-6 py-3 text-sm focus:outline-none focus:border-emerald-500 transition-all w-64"
              />
            </div>
            <button className="h-12 w-12 rounded-2xl border border-slate-200 dark:border-white/10 flex items-center justify-center relative hover:bg-slate-50 dark:hover:bg-white/5 transition-all">
              <Bell className="w-5 h-5 text-slate-500" />
              <span className="absolute top-3 right-3 h-2 w-2 bg-emerald-500 rounded-full border-2 border-white dark:border-[#05010d]" />
            </button>
          </div>
        </header>

        {/* --- STATS GRID --- */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6 mb-12">
          {stats.map((stat, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              className="p-8 rounded-[2rem] bg-white dark:bg-white/5 border border-slate-200 dark:border-white/10 group hover:border-emerald-500/30 transition-all shadow-sm hover:shadow-xl dark:shadow-none"
            >
              <div className="flex justify-between items-start mb-6">
                <div className={cn(
                  "p-3 rounded-xl",
                  stat.color === "emerald" ? "bg-emerald-50 dark:bg-emerald-500/10 text-emerald-600 dark:text-emerald-400" : "bg-purple-50 dark:bg-purple-500/10 text-purple-600 dark:text-purple-400"
                )}>
                  <stat.icon className="w-6 h-6" />
                </div>
                <div className="flex items-center gap-1 text-[10px] font-black text-emerald-500 bg-emerald-500/10 px-2 py-1 rounded-full uppercase tracking-widest">
                  <TrendingUp className="w-3 h-3" />
                  {stat.change}
                </div>
              </div>
              <p className="text-slate-500 dark:text-white/40 text-[10px] font-black uppercase tracking-[0.2em] mb-1">{stat.label}</p>
              <p className="text-3xl font-bold tracking-tighter">{stat.value}</p>
            </motion.div>
          ))}
        </div>

        {/* --- BOTTOM SECTION: TABLE & CHART PLACEHOLDER --- */}
        <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
          
          {/* Recent Inflow Table */}
          <div className="xl:col-span-2 rounded-[2.5rem] border border-slate-200 dark:border-white/10 bg-white dark:bg-white/5 p-8 overflow-hidden shadow-sm">
            <div className="flex items-center justify-between mb-8 px-2">
              <h3 className="text-xl font-bold tracking-tight">Recent Material Inflow</h3>
              <button className="text-xs font-black uppercase tracking-widest text-emerald-500 flex items-center gap-2 hover:gap-3 transition-all">
                View Full Ledger <ArrowUpRight className="w-4 h-4" />
              </button>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead>
                  <tr className="border-b border-slate-100 dark:border-white/5 text-[10px] font-black uppercase tracking-[0.3em] text-slate-400">
                    <th className="pb-4 px-4 font-black">Transaction ID</th>
                    <th className="pb-4 px-4 font-black">Aggregator Hub</th>
                    <th className="pb-4 px-4 font-black">Material</th>
                    <th className="pb-4 px-4 font-black">Net Weight</th>
                    <th className="pb-4 px-4 font-black">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 dark:divide-white/5">
                  {recentTransactions.map((tx, i) => (
                    <tr key={i} className="group hover:bg-slate-50 dark:hover:bg-white/[0.02] transition-colors">
                      <td className="py-5 px-4 font-mono text-xs text-slate-400 dark:text-white/30">{tx.id}</td>
                      <td className="py-5 px-4 font-bold text-sm">{tx.hub}</td>
                      <td className="py-5 px-4">
                        <span className="px-3 py-1 rounded-lg bg-slate-100 dark:bg-white/5 text-[10px] font-bold uppercase tracking-widest">
                          {tx.material}
                        </span>
                      </td>
                      <td className="py-5 px-4 font-bold text-sm text-emerald-600 dark:text-emerald-400">{tx.weight}</td>
                      <td className="py-5 px-4">
                        <div className="flex items-center gap-2">
                          <div className={cn(
                            "h-1.5 w-1.5 rounded-full",
                            tx.status === "Verified" ? "bg-emerald-500 animate-pulse" : "bg-orange-400"
                          )} />
                          <span className="text-xs font-bold">{tx.status}</span>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Quick Actions / Hub Status */}
          <div className="space-y-6">
            <div className="p-8 rounded-[2.5rem] bg-slate-900 text-white relative overflow-hidden group">
               <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:scale-125 transition-transform duration-700">
                  <Truck className="w-32 h-32 -mr-12 -mt-12" />
               </div>
               <h3 className="text-xl font-bold mb-2 relative z-10">Dispatch Fleet</h3>
               <p className="text-white/40 text-sm mb-8 relative z-10 font-light">4 vehicles pending task assignment at Nakuru Central.</p>
               <button className="w-full py-4 rounded-xl bg-emerald-500 text-slate-900 font-black uppercase tracking-widest text-[10px] hover:bg-emerald-400 transition-all relative z-10">
                 Manage Logistics
               </button>
            </div>

            <div className="p-8 rounded-[2.5rem] border border-slate-200 dark:border-white/10 bg-white dark:bg-white/5 shadow-sm">
               <h3 className="text-lg font-bold mb-6 tracking-tight">System Health</h3>
               <div className="space-y-6">
                 {['Data Sync', 'Hardware Labs', 'Payment Rails'].map((sys) => (
                   <div key={sys} className="flex items-center justify-between">
                     <span className="text-xs font-bold text-slate-500 dark:text-white/40 uppercase tracking-widest">{sys}</span>
                     <span className="text-[10px] font-black text-emerald-500 bg-emerald-500/10 px-2 py-0.5 rounded-md uppercase tracking-[0.2em]">Operational</span>
                   </div>
                 ))}
               </div>
            </div>
          </div>

        </div>

      </main>
    </div>
  );
}