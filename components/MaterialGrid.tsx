"use client";

import { motion } from "framer-motion";
import { 
  BeakerIcon, 
  Square3Stack3DIcon, 
  CubeIcon,
  ChartBarIcon,
  CheckBadgeIcon,
  ArrowUpRightIcon
} from "@heroicons/react/24/outline";

const materials = [
  {
    name: "PET (Grade A)",
    fullName: "Polyethylene Terephthalate",
    description: "Post-consumer clear bottles, sorted and de-labeled for food-grade applications.",
    icon: BeakerIcon,
    stats: { demand: 92, purity: 98, yield: 85 },
    color: "emerald",
    marketTrend: "+4.2%"
  },
  {
    name: "HDPE",
    fullName: "High-Density Polyethylene",
    description: "Industrial-grade flakes from crates and detergent containers. High tensile strength.",
    icon: Square3Stack3DIcon,
    stats: { demand: 75, purity: 95, yield: 92 },
    color: "purple",
    marketTrend: "+2.8%"
  },
  {
    name: "Aluminum",
    fullName: "UBC (Used Beverage Cans)",
    description: "Baled and compressed aluminum. Infinite recyclability with 95% energy savings.",
    icon: CubeIcon,
    stats: { demand: 98, purity: 99, yield: 95 },
    color: "emerald",
    marketTrend: "+1.5%"
  },
];

export function MaterialGrid() {
  return (
    <section className="relative py-32 bg-slate-50 dark:bg-[#05010d] transition-colors duration-500 overflow-hidden">
      
      {/* Background Decorative Asset Label */}
      <div className="absolute top-0 right-0 p-12 opacity-5 pointer-events-none hidden lg:block">
        <span className="text-[12vw] font-black uppercase tracking-tighter leading-none select-none">
          Commodity
        </span>
      </div>

      <div className="container relative z-10 mx-auto px-6">
        
        {/* Header Section */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between mb-20 gap-10">
          <div className="max-w-2xl">
            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              className="flex items-center gap-2 text-emerald-600 dark:text-emerald-400 font-black uppercase tracking-[0.3em] text-[10px] mb-4"
            >
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
              </span>
              Market Asset Catalog
            </motion.div>
            <h2 className="font-serif text-5xl md:text-7xl text-slate-900 dark:text-white leading-tight">
              The <span className="italic text-purple-600 dark:text-purple-400 font-light">Yield</span> Engine.
            </h2>
          </div>
          
          <motion.button 
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="group flex items-center gap-3 bg-white dark:bg-white/5 border border-slate-200 dark:border-white/10 px-6 py-4 rounded-2xl shadow-xl transition-all"
          >
            <ChartBarIcon className="h-5 w-5 text-emerald-500" />
            <span className="text-sm font-bold text-slate-900 dark:text-white tracking-tight">Access Live Market Desk</span>
            <ArrowUpRightIcon className="h-4 w-4 text-slate-400 group-hover:text-emerald-500 transition-colors" />
          </motion.button>
        </div>

        {/* Grid Section */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {materials.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ y: -8, rotateX: 2, rotateY: -2 }}
              className="perspective-1000 group relative rounded-[2.5rem] bg-white dark:bg-[#120326]/40 border border-slate-200 dark:border-white/10 p-10 backdrop-blur-xl shadow-sm hover:shadow-2xl transition-all duration-500 overflow-hidden"
            >
              {/* Top Row: Icon & Market Trend */}
              <div className="flex justify-between items-start mb-10">
                <div className={`p-4 rounded-2xl ${
                  item.color === 'emerald' ? 'bg-emerald-50 dark:bg-emerald-500/10 text-emerald-600 dark:text-emerald-400' : 'bg-purple-50 dark:bg-purple-500/10 text-purple-600 dark:text-purple-400'
                }`}>
                  <item.icon className="h-8 w-8" />
                </div>
                <div className="flex flex-col items-end">
                   <div className="flex items-center gap-1.5 rounded-full bg-emerald-500/10 px-3 py-1 text-[10px] font-black uppercase tracking-widest text-emerald-500 border border-emerald-500/20 mb-2">
                    <CheckBadgeIcon className="h-3 w-3" />
                    <span>Verified</span>
                  </div>
                  <span className="text-[10px] font-bold text-slate-400 dark:text-white/20 uppercase tracking-widest">Growth</span>
                  <span className="text-sm font-mono font-bold text-emerald-500">{item.marketTrend}</span>
                </div>
              </div>

              {/* Identity */}
              <div className="mb-8">
                <h3 className="text-3xl font-bold text-slate-900 dark:text-white tracking-tighter mb-1">{item.name}</h3>
                <p className="text-[10px] font-black text-purple-600 dark:text-purple-400 uppercase tracking-[0.2em]">{item.fullName}</p>
              </div>

              <p className="text-slate-500 dark:text-purple-100/50 text-sm leading-relaxed mb-10 font-light">
                {item.description}
              </p>

              {/* Animated Technical Bars */}
              <div className="space-y-6 border-t border-slate-100 dark:border-white/10 pt-8">
                {Object.entries(item.stats).map(([label, value]) => (
                  <div key={label} className="space-y-2">
                    <div className="flex justify-between items-center">
                      <span className="text-[10px] uppercase font-black tracking-widest text-slate-400 dark:text-white/30">{label}</span>
                      <span className="text-xs font-mono font-bold text-slate-900 dark:text-white">{value}%</span>
                    </div>
                    <div className="h-1 w-full bg-slate-100 dark:bg-white/5 rounded-full overflow-hidden">
                      <motion.div 
                        initial={{ width: 0 }}
                        whileInView={{ width: `${value}%` }}
                        transition={{ duration: 1, delay: 0.5 + (index * 0.1) }}
                        className={`h-full ${item.color === 'emerald' ? 'bg-emerald-500' : 'bg-purple-500'}`}
                      />
                    </div>
                  </div>
                ))}
              </div>

              {/* Background Glow */}
              <div className={`absolute -right-20 -bottom-20 h-64 w-64 rounded-full blur-[100px] opacity-0 group-hover:opacity-20 transition-opacity duration-700 ${
                item.color === 'emerald' ? 'bg-emerald-500' : 'bg-purple-600'
              }`} />
            </motion.div>
          ))}
        </div>

        {/* Floating Catalog Context */}
        <div className="mt-20 text-center">
          <p className="text-slate-400 dark:text-white/20 text-[10px] font-black uppercase tracking-[0.5em]">
            International Standard ISO 14001 Compliant Sorting
          </p>
        </div>
      </div>
    </section>
  );
}