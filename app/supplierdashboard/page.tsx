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
  PlusIcon
} from "@heroicons/react/24/outline";

export default function SupplierDashboard() {
  const [activeTab, setActiveTab] = useState("overview");

  // Mock data for the cinematic UI
  const stats = [
    { label: "Total Collected", value: "142.8", unit: "TONNES", icon: CubeIcon, trend: "+12.5%", color: "text-emerald-400" },
    { label: "Pending Payout", value: "84,200", unit: "KES", icon: BanknotesIcon, trend: "Active", color: "text-purple-400" },
    { label: "Active Pickups", value: "12", unit: "UNITS", icon: TruckIcon, trend: "3 Delayed", color: "text-amber-400" },
  ];

  const recentTransactions = [
    { id: "RC-9021", type: "Plastic (PET)", weight: "2.4t", status: "Verified", time: "2h ago" },
    { id: "RC-8944", type: "Aluminum", weight: "0.8t", status: "In-Transit", time: "5h ago" },
    { id: "RC-8812", type: "Paper/Board", weight: "1.2t", status: "Processing", time: "Yesterday" },
  ];

  return (
    <div className="min-h-screen bg-[#060110] text-white p-4 md:p-8 font-sans">
      {/* Background Ambient Elements */}
      <div className="fixed top-0 left-0 w-full h-full overflow-hidden pointer-events-none -z-10">
        <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-emerald-500/5 blur-[120px] rounded-full" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-purple-600/5 blur-[120px] rounded-full" />
      </div>

      <main className="max-w-7xl mx-auto space-y-8">
        {/* Top Navigation / Header */}
        <header className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div>
            <h1 className="text-3xl font-serif italic mb-1">Supplier <span className="text-emerald-400 font-sans font-black uppercase tracking-tighter not-italic">Console</span></h1>
            <div className="flex items-center gap-2 text-[10px] text-purple-200/40 uppercase tracking-[0.2em] font-black">
              <MapPinIcon className="w-3 h-3 text-emerald-500" />
              Nairobi Central Hub • Unit 04
            </div>
          </div>
          
          <div className="flex items-center gap-3">
            <button className="p-3 rounded-2xl bg-white/5 border border-white/10 hover:bg-white/10 transition-all">
              <EllipsisHorizontalIcon className="w-5 h-5" />
            </button>
            <button className="flex items-center gap-2 px-6 py-3 bg-emerald-500 text-[#0a0118] rounded-2xl font-black uppercase tracking-widest text-[10px] shadow-lg shadow-emerald-500/20 hover:scale-[1.02] transition-all">
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
              className="bg-white/5 backdrop-blur-3xl border border-white/10 rounded-[2.5rem] p-8 relative overflow-hidden group"
            >
              <div className="absolute top-0 right-0 p-6 opacity-10 group-hover:opacity-20 transition-opacity">
                <stat.icon className="w-16 h-16" />
              </div>
              <p className="text-[10px] font-black uppercase tracking-[0.2em] text-purple-200/40 mb-4">{stat.label}</p>
              <div className="flex items-baseline gap-2">
                <span className="text-4xl font-black tracking-tighter">{stat.value}</span>
                <span className="text-[10px] font-bold text-purple-200/30">{stat.unit}</span>
              </div>
              <div className={`mt-4 text-[10px] font-black flex items-center gap-1 ${stat.color}`}>
                <ArrowTrendingUpIcon className="w-3 h-3" />
                {stat.trend}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Main Dashboard Layout (Bento) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          
          {/* Recent Activity Table (8 cols) */}
          <div className="lg:col-span-8 bg-white/5 border border-white/10 rounded-[2.5rem] overflow-hidden">
            <div className="p-8 border-b border-white/5 flex items-center justify-between">
              <h2 className="text-xs font-black uppercase tracking-widest text-white">Collection Ledger</h2>
              <button className="text-[10px] font-black text-emerald-400 uppercase tracking-widest hover:underline">View History</button>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead>
                  <tr className="text-[10px] uppercase tracking-widest text-purple-200/20 border-b border-white/5">
                    <th className="px-8 py-4 font-black">ID</th>
                    <th className="px-8 py-4 font-black">Material</th>
                    <th className="px-8 py-4 font-black text-right">Net Weight</th>
                    <th className="px-8 py-4 font-black text-center">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/5 text-sm">
                  {recentTransactions.map((tx, i) => (
                    <tr key={i} className="hover:bg-white/[0.02] transition-colors group">
                      <td className="px-8 py-6 font-mono text-purple-200/40 text-xs">{tx.id}</td>
                      <td className="px-8 py-6">
                        <div className="font-bold text-white">{tx.type}</div>
                        <div className="text-[10px] text-purple-200/30">{tx.time}</div>
                      </td>
                      <td className="px-8 py-6 text-right font-black text-emerald-400">{tx.weight}</td>
                      <td className="px-8 py-6 text-center">
                        <span className="inline-block px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-400 text-[10px] font-black uppercase tracking-widest border border-emerald-500/20">
                          {tx.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Quick Actions & Logistics (4 cols) */}
          <div className="lg:col-span-4 space-y-6">
            <div className="bg-gradient-to-br from-purple-600/20 to-emerald-500/10 border border-white/10 rounded-[2.5rem] p-8">
              <h3 className="text-xs font-black uppercase tracking-widest mb-6">Logistics Hub</h3>
              <div className="space-y-4">
                <div className="p-4 rounded-2xl bg-black/40 border border-white/5 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <TruckIcon className="w-5 h-5 text-emerald-400" />
                    <div>
                      <p className="text-[10px] font-black uppercase">Fleet Alpha</p>
                      <p className="text-[10px] text-purple-200/30">ETA: 14:00</p>
                    </div>
                  </div>
                  <ArrowUpRightIcon className="w-4 h-4 text-purple-200/20" />
                </div>
                <div className="p-4 rounded-2xl bg-black/40 border border-white/5 flex items-center justify-between opacity-50">
                  <div className="flex items-center gap-3">
                    <TruckIcon className="w-5 h-5 text-purple-400" />
                    <div>
                      <p className="text-[10px] font-black uppercase">Fleet Beta</p>
                      <p className="text-[10px] text-purple-200/30">At Depot</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white/5 border border-white/10 rounded-[2.5rem] p-8">
              <h3 className="text-xs font-black uppercase tracking-widest mb-2">System Health</h3>
              <p className="text-[10px] text-purple-200/30 mb-6 font-bold leading-relaxed">Synchronization active with RecycOp Mainframe.</p>
              <div className="flex gap-1 h-1">
                {[...Array(12)].map((_, i) => (
                  <div key={i} className={`flex-1 rounded-full ${i < 9 ? 'bg-emerald-500/40' : 'bg-white/5'}`} />
                ))}
              </div>
            </div>
          </div>

        </div>
      </main>
    </div>
  );
}