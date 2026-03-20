"use client";

import { motion } from "framer-motion";
import { 
  ArrowTrendingUpIcon, 
  GlobeAmericasIcon, 
  BanknotesIcon, 
  SunIcon,
  ArrowUpRightIcon,
  PresentationChartLineIcon,
  CloudIcon
} from "@heroicons/react/24/outline";
import { cn } from "@/lib/utils";

const impactMetrics = [
  { label: "Carbon Offset", value: "128.5 MT", sub: "Equiv. 5,840 Trees", icon: CloudIcon, color: "emerald" },
  { label: "Net Revenue", value: "$42.1k", sub: "+12% vs last month", icon: BanknotesIcon, color: "blue" },
  { label: "Circular Yield", value: "92.4%", sub: "Material Recovery Rate", icon: ArrowTrendingUpIcon, color: "purple" },
  { label: "Energy Saved", value: "18.2 MWh", sub: "Recycling vs Virgin", icon: SunIcon, color: "amber" },
];

export function FinancePortal() {
  return (
    <div className="space-y-8">
      <div className="p-10 rounded-[3rem] bg-slate-900 text-white flex flex-col md:flex-row justify-between items-center gap-8">
        <div>
          <p className="text-[10px] font-black uppercase tracking-[0.3em] text-white/40 mb-2">Withdrawable Balance</p>
          <h2 className="text-5xl font-black tracking-tighter italic">KES 48,200.<span className="text-emerald-500 font-sans not-italic text-2xl">00</span></h2>
        </div>
        <button className="px-10 py-5 bg-emerald-600 rounded-2xl font-black uppercase tracking-widest text-[11px] shadow-lg shadow-emerald-500/20 hover:scale-[1.05] transition-all">
          Withdraw to M-Pesa
        </button>
      </div>

      <div className="p-8 rounded-[3rem] border border-slate-200 dark:border-white/10 bg-white dark:bg-white/5">
        <h4 className="text-sm font-black uppercase tracking-widest text-slate-400 mb-8">Payout History</h4>
        <div className="space-y-4">
          {[1, 2, 3].map((i) => (
            <div key={i} className="flex items-center justify-between py-4 border-b border-slate-100 dark:border-white/5 last:border-0">
               <div className="flex items-center gap-4">
                 <div className="h-10 w-10 rounded-full bg-slate-100 dark:bg-white/5 flex items-center justify-center"><ArrowUpRightIcon className="w-4 h-4 text-slate-400" /></div>
                 <div>
                   <p className="text-sm font-bold">Batch Release Payout #{1020 + i}</p>
                   <p className="text-[10px] text-slate-400 uppercase font-black">March {20 + i}, 2026</p>
                 </div>
               </div>
               <p className="font-bold text-emerald-500">+ KES 12,400</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}