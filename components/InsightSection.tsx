"use client";

import { motion } from "framer-motion";
import { 
  LightBulbIcon, 
  ArrowRightIcon,
  BeakerIcon,
  UserGroupIcon,
  BanknotesIcon,
  CheckBadgeIcon
} from "@heroicons/react/24/outline";

const ComparisonPoints = [
  {
    label: "Collection",
    dairy: "Morning milk delivery",
    recyc: "Daily material drop-offs",
    icon: UserGroupIcon
  },
  {
    label: "Quality Control",
    dairy: "Lactometer purity testing",
    recyc: "Digital grading & AI checks",
    icon: BeakerIcon
  },
  {
    label: "Value Add",
    dairy: "Processing into Yogurt",
    recyc: "Industrial-grade Baling",
    icon: LightBulbIcon
  },
  {
    label: "Market Power",
    dairy: "KCC Cooperative prices",
    recyc: "Direct Manufacturer contracts",
    icon: BanknotesIcon
  }
];

export function InsightSection() {
  return (
    <section className="relative py-32 bg-white dark:bg-[#0a0118] transition-colors duration-500 overflow-hidden">
      
      {/* Background Blueprint Grid */}
      <div className="absolute inset-0 z-0 opacity-[0.03] dark:opacity-[0.05] pointer-events-none">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#808080_1px,transparent_1px),linear-gradient(to_bottom,#808080_1px,transparent_1px)] bg-[size:100px_100px]" />
      </div>

      <div className="container relative z-10 mx-auto px-6">
        <div className="max-w-5xl mx-auto mb-24 text-center lg:text-left">
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-purple-100 dark:bg-purple-500/10 text-purple-600 dark:text-purple-400 font-black uppercase tracking-[0.2em] text-[10px] mb-6"
          >
            <CheckBadgeIcon className="h-4 w-4" />
            <span>The Proven Blueprint</span>
          </motion.div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-end">
            <h2 className="font-serif text-5xl md:text-7xl text-slate-900 dark:text-white leading-[1.1]">
              If it worked for <span className="text-emerald-600 dark:text-emerald-400 italic">Milk</span>, 
              it works for <span className="text-purple-600 dark:text-purple-400">Materials.</span>
            </h2>
            <p className="text-slate-500 dark:text-purple-100/60 text-lg font-light leading-relaxed border-l border-slate-200 dark:border-white/10 pl-8">
              Kenya’s Dairy Cooperative model revolutionized rural economies. We are applying this exact logic to formalize the 12M tonnes of waste generated annually.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-start">
          
          {/* LEFT: The Comparison Engine */}
          <div className="lg:col-span-7 space-y-4">
            {ComparisonPoints.map((point, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                className="group relative flex items-center gap-6 p-6 rounded-[2rem] bg-slate-50 dark:bg-white/5 border border-slate-100 dark:border-white/5 hover:border-emerald-500/30 transition-all duration-500"
              >
                <div className="flex-shrink-0 p-4 rounded-2xl bg-white dark:bg-white/5 shadow-sm text-slate-400 dark:text-emerald-400 group-hover:scale-110 transition-transform">
                  <point.icon className="h-6 w-6" />
                </div>
                
                <div className="flex-grow grid grid-cols-1 sm:grid-cols-2 gap-4 items-center">
                  <div>
                    <p className="text-[10px] font-black uppercase tracking-widest text-slate-400 dark:text-white/30 mb-1">{point.label}</p>
                    <p className="text-sm text-slate-400 dark:text-purple-100/40 line-through italic decoration-slate-300 dark:decoration-purple-500/30">
                      {point.dairy}
                    </p>
                  </div>
                  <div className="flex items-center gap-3">
                    <ArrowRightIcon className="hidden sm:block h-4 w-4 text-emerald-500" />
                    <p className="text-base font-bold text-slate-900 dark:text-white group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors">
                      {point.recyc}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* RIGHT: The Visual Outcome Hub */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            className="lg:col-span-5 relative"
          >
            <div className="relative p-8 rounded-[3rem] bg-slate-900 dark:bg-[#1a0433] text-white shadow-2xl overflow-hidden border border-white/10">
              {/* Decorative Glow */}
              <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-500/10 blur-[100px] -mr-32 -mt-32" />
              
              <h3 className="font-serif text-3xl mb-12">Systemic Transformation</h3>
              
              <div className="space-y-12">
                <div className="space-y-4">
                  <div className="flex justify-between items-end">
                    <span className="text-[10px] font-black uppercase tracking-[0.2em] text-white/40">Market Positioning</span>
                    <span className="text-xs font-bold text-purple-300">Price-Takers</span>
                  </div>
                  <div className="h-1.5 w-full bg-white/5 rounded-full overflow-hidden">
                    <div className="h-full w-1/3 bg-purple-500/40" />
                  </div>
                  <p className="text-[11px] text-white/40">Fragmented individual collection</p>
                </div>

                <div className="space-y-4">
                  <div className="flex justify-between items-end">
                    <span className="text-[10px] font-black uppercase tracking-[0.2em] text-emerald-400">Recyc Cooperative</span>
                    <span className="text-xs font-bold text-emerald-400 uppercase">Price-Makers</span>
                  </div>
                  <div className="h-1.5 w-full bg-white/5 rounded-full overflow-hidden">
                    <motion.div 
                      initial={{ width: 0 }}
                      whileInView={{ width: "95%" }}
                      transition={{ duration: 1.5, ease: "easeOut" }}
                      className="h-full bg-emerald-500 shadow-[0_0_15px_rgba(16,185,129,0.5)]" 
                    />
                  </div>
                  <p className="text-[11px] text-white/40">Aggregated supply, industrial scale</p>
                </div>

                <blockquote className="pt-8 border-t border-white/10">
                  <p className="text-sm text-purple-100/70 italic leading-relaxed">
                    &quot;By aggregating supply, we move from price-takers to price-makers, mirroring the transformation of the Kenyan dairy sector.&quot;
                  </p>
                  <footer className="mt-4 flex items-center gap-3">
                    <div className="h-8 w-8 rounded-full bg-emerald-500/20 border border-emerald-500/40" />
                    <span className="text-[10px] font-black uppercase tracking-widest text-white">The Model Logic</span>
                  </footer>
                </blockquote>
              </div>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}