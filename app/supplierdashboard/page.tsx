"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { 
  CubeIcon, 
  TruckIcon,
  CircleStackIcon,
  Cog6ToothIcon,
  ChartBarIcon,
  Squares2X2Icon,
  ArrowPathRoundedSquareIcon,
  CurrencyDollarIcon,
  BellIcon,
  MagnifyingGlassIcon,
  SunIcon
} from "@heroicons/react/24/outline";
import { cn } from "@/lib/utils";

// Component Imports
import { SupplierOverview } from "./components/supplierOverview";
import { MyImpact } from "./components/impact";
import { RequestPickup } from "./components/requestPickup";
import { MyBatches } from "./components/batches";
import { FinancePortal } from "./components/finances";

export default function SupplierDashboard() {
  const [activeTab, setActiveTab] = useState("overview");

  const menuItems = [
    { id: "overview", label: "Command Center", icon: Squares2X2Icon },
    { id: "batches", label: "My Batches", icon: CubeIcon },
    { id: "finance", label: "Earnings", icon: CurrencyDollarIcon },
    { id: "pickup", label: "Request Pickup", icon: ArrowPathRoundedSquareIcon },
    { id: "impact", label: "My Impact", icon: ChartBarIcon },
  ];

  return (
    <div className="flex min-h-screen bg-[#fafafa] dark:bg-[#05010d] text-slate-900 dark:text-white font-sans antialiased selection:bg-emerald-500/30 overflow-hidden">
      
      {/* --- CINEMATIC BACKGROUND --- */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
        <motion.div 
          animate={{ 
            scale: [1, 1.1, 1],
            opacity: [0.05, 0.08, 0.05] 
          }}
          transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
          className="absolute -top-[10%] -left-[10%] w-[60%] h-[60%] bg-emerald-500 blur-[140px] rounded-full" 
        />
        <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-purple-500/5 blur-[120px] rounded-full" />
      </div>

      {/* --- PREMIUM SIDEBAR --- */}
      <aside className="w-80 border-r border-slate-200/50 dark:border-white/5 hidden lg:flex flex-col p-8 sticky top-0 h-screen bg-white/40 dark:bg-transparent backdrop-blur-3xl z-20 transition-colors">
        <div className="flex items-center gap-4 mb-16 px-2 group cursor-pointer">
          <div className="h-12 w-12 bg-emerald-600 rounded-2xl flex items-center justify-center shadow-2xl shadow-emerald-500/40 group-hover:rotate-12 transition-transform duration-500">
            <CircleStackIcon className="text-white w-7 h-7" />
          </div>
          <div>
            <span className="text-2xl font-black tracking-tighter uppercase italic font-serif leading-none block">
              RECYC<span className="text-emerald-500 not-italic font-sans">OP</span>
            </span>
            <span className="text-[9px] font-black text-slate-400 dark:text-white/20 uppercase tracking-[0.3em]">Supplier Portal</span>
          </div>
        </div>

        <nav className="flex-grow space-y-1.5">
          <p className="text-[10px] font-black uppercase tracking-[0.4em] text-slate-400/60 mb-6 px-4">Management</p>
          {menuItems.map((item) => (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={cn(
                "w-full flex items-center gap-4 px-5 py-4 rounded-2xl transition-all duration-500 font-bold text-[11px] uppercase tracking-widest group relative",
                activeTab === item.id ? "text-white" : "text-slate-500 dark:text-white/30 hover:text-emerald-500"
              )}
            >
              {activeTab === item.id && (
                <motion.div 
                  layoutId="activeTabGlow"
                  className="absolute inset-0 bg-emerald-600 shadow-2xl shadow-emerald-600/30 rounded-2xl z-0"
                  transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                />
              )}
              <item.icon className={cn("w-5 h-5 relative z-10 transition-transform group-hover:scale-110", activeTab === item.id ? "text-white" : "")} />
              <span className="relative z-10">{item.label}</span>
            </button>
          ))}
        </nav>

        <div className="mt-auto space-y-4 pt-8 border-t border-slate-200/50 dark:border-white/5">
          <div className="px-5 py-4 rounded-2xl bg-emerald-500/5 border border-emerald-500/10 mb-4">
             <p className="text-[9px] font-black text-emerald-500 uppercase tracking-widest mb-1">Impact Level</p>
             <p className="text-xs font-bold">Carbon Pioneer (Gold)</p>
          </div>
          <button className="flex items-center gap-4 px-5 py-3 w-full text-slate-400 hover:text-emerald-500 text-[11px] font-black uppercase tracking-widest transition-colors">
            <Cog6ToothIcon className="w-5 h-5" />
            Portal Settings
          </button>
        </div>
      </aside>

      {/* --- MAIN WORKSPACE --- */}
      <div className="flex-grow flex flex-col h-screen relative z-10">
        
        {/* TOP BAR */}
        <header className="h-24 border-b border-slate-200/50 dark:border-white/5 px-12 flex items-center justify-between bg-white/20 dark:bg-transparent backdrop-blur-md">
          <div className="flex items-center gap-8">
            <div className="relative w-80 group">
              <MagnifyingGlassIcon className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 group-focus-within:text-emerald-500 transition-colors" />
              <input 
                type="text" 
                placeholder="SEARCH BATCHES OR PAYOUTS..." 
                className="w-full bg-slate-100 dark:bg-white/5 border border-transparent focus:border-emerald-500/20 rounded-xl py-3 pl-12 pr-4 text-[10px] font-bold uppercase tracking-widest outline-none transition-all"
              />
            </div>
            <div className="hidden md:flex items-center gap-2 px-4 py-2 rounded-full bg-amber-500/5 text-amber-600 border border-amber-500/10">
               <SunIcon className="w-4 h-4" />
               <span className="text-[10px] font-black uppercase tracking-widest">Nairobi 24°C</span>
            </div>
          </div>
          
          <div className="flex items-center gap-6">
            <button className="relative p-2 text-slate-400 hover:text-emerald-500 transition-colors">
              <div className="absolute top-2 right-2 w-2 h-2 bg-emerald-500 rounded-full border-2 border-[#fafafa] dark:border-[#05010d]" />
              <BellIcon className="w-6 h-6" />
            </button>
            <div className="h-10 w-10 rounded-xl bg-slate-900 dark:bg-white flex items-center justify-center text-white dark:text-slate-900 font-black text-[10px] shadow-xl">
              AA
            </div>
          </div>
        </header>

        {/* PAGE CONTENT */}
        <main className="flex-grow p-8 lg:p-16 overflow-y-auto">
          <div className="max-w-[1400px] mx-auto">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeTab}
                initial={{ opacity: 0, y: 30, filter: "blur(20px)" }}
                animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                exit={{ opacity: 0, y: -30, filter: "blur(20px)" }}
                transition={{ duration: 0.5, ease: [0.19, 1, 0.22, 1] }}
              >
                {activeTab === "overview" && <SupplierOverview />}
                {activeTab === "impact" && <MyImpact />}
                {activeTab === "pickup" && <RequestPickup />}
                {activeTab === "batches" && <MyBatches />}
                {activeTab === "finance" && <FinancePortal />}
              </motion.div>
            </AnimatePresence>
          </div>
        </main>
      </div>
    </div>
  );
}