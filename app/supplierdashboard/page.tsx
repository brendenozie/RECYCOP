"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { 
  CubeIcon, CircleStackIcon, Cog6ToothIcon, ChartBarIcon,
  Squares2X2Icon, ArrowPathRoundedSquareIcon, CurrencyDollarIcon,
  BellIcon, MagnifyingGlassIcon, Bars3Icon, PlusIcon
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
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const menuItems = [
    { id: "overview", label: "Command", icon: Squares2X2Icon },
    { id: "batches", label: "Batches", icon: CubeIcon },
    { id: "finance", label: "Earnings", icon: CurrencyDollarIcon },
    // { id: "pickup", label: "Request Pickup", icon: ArrowPathRoundedSquareIcon },
    { id: "impact", label: "Impact", icon: ChartBarIcon },
  ];

  return (
    <div className="flex min-h-screen bg-[#fafafa] dark:bg-[#05010d] text-slate-900 dark:text-white font-sans antialiased overflow-hidden">
      
      {/* --- BACKGROUND BLOOM --- */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute top-[-10%] left-[-10%] w-[60%] h-[60%] bg-emerald-500/5 blur-[120px] rounded-full" />
      </div>

      {/* --- DESKTOP SIDEBAR --- */}
      <aside className="w-80 border-r border-slate-200/50 dark:border-white/5 hidden lg:flex flex-col p-8 sticky top-0 h-screen bg-white/40 dark:bg-transparent backdrop-blur-3xl z-20">
        <div className="flex items-center gap-4 mb-16 px-2">
          <div className="h-10 w-10 bg-emerald-600 rounded-xl flex items-center justify-center shadow-lg shadow-emerald-500/20">
            <CircleStackIcon className="text-white w-6 h-6" />
          </div>
          <span className="text-xl font-black tracking-tighter uppercase italic font-serif">RECYC<span className="text-emerald-500 not-italic">OP</span></span>
        </div>

        <nav className="flex-grow space-y-1">
          {menuItems.map((item) => (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={cn(
                "w-full flex items-center gap-4 px-5 py-4 rounded-2xl transition-all font-bold text-[11px] uppercase tracking-widest relative group",
                activeTab === item.id ? "text-white" : "text-slate-500 dark:text-white/30"
              )}
            >
              {activeTab === item.id && (
                <motion.div layoutId="activeTabGlow" className="absolute inset-0 bg-emerald-600 rounded-2xl z-0" />
              )}
              <item.icon className="w-5 h-5 relative z-10" />
              <span className="relative z-10">{item.label}</span>
            </button>
          ))}
          <button 
            onClick={() => setActiveTab("pickup")}
            className={cn(
                "w-full flex items-center gap-4 px-5 py-4 rounded-2xl transition-all font-bold text-[11px] uppercase tracking-widest mt-4 border border-emerald-500/20 text-emerald-500 bg-emerald-500/5",
                activeTab === "pickup" && "bg-emerald-500 text-white"
            )}
          >
            <ArrowPathRoundedSquareIcon className="w-5 h-5" />
            Request Pickup
          </button>
        </nav>
      </aside>

      {/* --- MAIN WORKSPACE --- */}
      <div className="flex-grow flex flex-col h-screen relative z-10">
        
        {/* TOP BAR: Optimized for density */}
        <header className="h-20 lg:h-24 border-b border-slate-200/50 dark:border-white/5 px-6 lg:px-12 flex items-center justify-between bg-white/40 dark:bg-transparent backdrop-blur-md">
          <div className="flex items-center gap-4 lg:gap-8">
            <button className="lg:hidden p-2 bg-slate-100 dark:bg-white/5 rounded-xl" onClick={() => setIsSidebarOpen(true)}>
              <Bars3Icon className="w-6 h-6" />
            </button>
            <div className="hidden md:relative md:block w-64 lg:w-80 group">
              <MagnifyingGlassIcon className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
              <input type="text" placeholder="SEARCH..." className="w-full bg-slate-100 dark:bg-white/5 rounded-xl py-2.5 pl-12 text-[10px] outline-none" />
            </div>
          </div>
          
          <div className="flex items-center gap-4 lg:gap-6">
            <button className="relative p-2 text-slate-400 hover:text-emerald-500"><BellIcon className="w-6 h-6" /></button>
            <div className="h-10 w-10 rounded-xl bg-slate-900 dark:bg-white flex items-center justify-center text-white dark:text-slate-900 font-black text-[10px]">AA</div>
          </div>
        </header>

        {/* MOBILE BOTTOM NAV */}
        <nav className="lg:hidden fixed bottom-0 left-0 right-0 bg-white/90 dark:bg-slate-950/90 backdrop-blur-xl border-t border-slate-200 dark:border-white/5 px-6 pb-8 pt-3 flex justify-between items-center z-50">
          {menuItems.map((item) => (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={cn(
                "flex flex-col items-center gap-1 transition-all",
                activeTab === item.id ? "text-emerald-500" : "text-slate-400"
              )}
            >
              <item.icon className="w-6 h-6" />
              <span className="text-[8px] font-black uppercase tracking-tighter">{item.label}</span>
            </button>
          ))}
        </nav>

        {/* FLOATING ACTION BUTTON (Mobile Only) */}
        <button 
          onClick={() => setActiveTab("pickup")}
          className="lg:hidden fixed bottom-24 right-6 h-14 w-14 bg-emerald-500 rounded-full shadow-2xl shadow-emerald-500/40 flex items-center justify-center text-white z-40 animate-bounce"
        >
          <PlusIcon className="w-7 h-7" />
        </button>

        {/* PAGE CONTENT */}
        <main className="flex-grow p-4 md:p-8 lg:p-16 overflow-y-auto pb-32 lg:pb-16">
          <div className="max-w-[1400px] mx-auto">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeTab}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                transition={{ duration: 0.3 }}
              >
                {activeTab === "overview" && <SupplierOverview />}
                {activeTab === "impact" && <MyImpact />}
                {activeTab === "batches" && <MyBatches />}
                {activeTab === "pickup" && <RequestPickup />}
                {activeTab === "finance" && <FinancePortal />}
              </motion.div>
            </AnimatePresence>
          </div>
        </main>
      </div>
    </div>
  );
}