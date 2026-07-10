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
    label: "Bringing It Together",
    dairy: "Morning milk collection",
    recyc: "Daily plastic & glass drop-offs",
    icon: UserGroupIcon
  },
  {
    label: "Fair Quality Checks",
    dairy: "Testing milk purity at the dairy",
    recyc: "Instant smart grading & clear rates",
    icon: BeakerIcon
  },
  {
    label: "Adding Real Value",
    dairy: "Making fresh milk into yogurt",
    recyc: "Baling and processing for big buyers",
    icon: LightBulbIcon
  },
  {
    label: "Better Pricing Power",
    dairy: "Guaranteed cooperative milk prices",
    recyc: "Direct contracts with massive factories",
    icon: BanknotesIcon
  }
];

export function InsightSection() {
  return (
    <section className="relative py-16 sm:py-24 md:py-32 bg-white dark:bg-[#0a0118] transition-colors duration-500 overflow-hidden">
      
      {/* Background Blueprint Grid */}
      <div className="absolute inset-0 z-0 opacity-[0.03] dark:opacity-[0.05] pointer-events-none">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#808080_1px,transparent_1px),linear-gradient(to_bottom,#808080_1px,transparent_1px)] bg-[size:100px_100px]" />
      </div>

      <div className="container relative z-10 mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="max-w-5xl mx-auto mb-12 sm:mb-16 md:mb-24 text-center lg:text-left">
          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-purple-100 dark:bg-purple-500/10 text-purple-700 dark:text-purple-400 font-bold uppercase tracking-wider text-[10px] mb-6"
          >
            <CheckBadgeIcon className="h-4 w-4" />
            <span>A Familiar, Proven Idea</span>
          </motion.div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-10 items-center lg:items-end">
            <h2 className="font-sans font-extrabold text-3xl sm:text-5xl md:text-6xl text-slate-900 dark:text-white leading-[1.15] tracking-tight">
              If it worked for <span className="text-emerald-600 dark:text-emerald-400">Milk</span>, <br className="hidden sm:inline" />
              it works for <span className="text-purple-600 dark:text-purple-400">Recycling.</span>
            </h2>
            <p className="text-slate-600 dark:text-purple-100/70 text-base sm:text-lg font-normal leading-relaxed lg:border-l lg:border-slate-200 lg:dark:border-white/10 lg:pl-8 max-w-xl mx-auto lg:mx-0">
              Local dairy cooperatives completely transformed our rural farming income. We are using that exact same community-focused blueprint to organize neighborhood recycling and lift up thousands of families.
            </p>
          </div>
        </div>

        {/* Content Section Split */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-center">
          
          {/* LEFT: The Comparison Engine */}
          <div className="lg:col-span-7 space-y-4">
            {ComparisonPoints.map((point, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                viewport={{ once: true }}
                className="group relative flex flex-col sm:flex-row items-start sm:items-center gap-4 sm:gap-6 p-5 sm:p-6 rounded-2xl bg-slate-50 dark:bg-white/5 border border-slate-200/60 dark:border-white/5 hover:border-emerald-500/30 transition-all duration-300 shadow-sm"
              >
                <div className="flex-shrink-0 p-3 rounded-xl bg-white dark:bg-white/5 shadow-sm text-slate-500 dark:text-emerald-400 group-hover:scale-105 transition-transform">
                  <point.icon className="h-5 w-5" />
                </div>
                
                <div className="flex-grow grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-4 items-center w-full">
                  <div>
                    <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400 dark:text-white/40 mb-0.5">{point.label}</p>
                    <p className="text-sm text-slate-400 dark:text-purple-100/40 line-through decoration-slate-300 dark:decoration-purple-500/30">
                      {point.dairy}
                    </p>
                  </div>
                  <div className="flex items-center gap-2 sm:gap-3">
                    <ArrowRightIcon className="hidden sm:block h-4 w-4 text-emerald-500 flex-shrink-0" />
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
            initial={{ opacity: 0, scale: 0.98 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="lg:col-span-5 w-full max-w-md mx-auto lg:max-w-none"
          >
            <div className="relative p-6 sm:p-8 rounded-[2.5rem] bg-slate-950 dark:bg-[#1a0433] text-white shadow-xl overflow-hidden border border-white/10">
              {/* Decorative Glow */}
              <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-500/10 blur-[80px] -mr-32 -mt-32 pointer-events-none" />
              
              <h3 className="font-sans font-extrabold text-xl sm:text-2xl mb-8 tracking-tight">Strength in Numbers</h3>
              
              <div className="space-y-8">
                <div className="space-y-2">
                  <div className="flex justify-between items-end">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-white/50">Selling on Your Own</span>
                    <span className="text-xs font-bold text-purple-300">Lower Prices Taken</span>
                  </div>
                  <div className="h-1.5 w-full bg-white/5 rounded-full overflow-hidden">
                    <div className="h-full w-1/3 bg-purple-500/40" />
                  </div>
                  <p className="text-[11px] text-white/40 leading-normal">Small, fragmented loads give middle-men all the leverage.</p>
                </div>

                <div className="space-y-2">
                  <div className="flex justify-between items-end">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-400">Joining Hands With Recyc</span>
                    <span className="text-xs font-bold text-emerald-400 uppercase tracking-wide">Higher Payouts Earned</span>
                  </div>
                  <div className="h-1.5 w-full bg-white/5 rounded-full overflow-hidden">
                    <motion.div 
                      initial={{ width: 0 }}
                      whileInView={{ width: "95%" }}
                      transition={{ duration: 1.2, ease: "easeOut" }}
                      className="h-full bg-emerald-500 shadow-[0_0_15px_rgba(16,185,129,0.4)]" 
                    />
                  </div>
                  <p className="text-[11px] text-white/40 leading-normal">Bulk collections allow neighborhoods to command top commercial rates.</p>
                </div>

                <blockquote className="pt-6 border-t border-white/10 mt-2">
                  <p className="text-sm text-purple-100/70 italic leading-relaxed font-normal">
                    &quot;When we pull our resources together as a group, we stop accepting whatever low price is thrown at us, and we start setting fair rates that reward our hard work.&quot;
                  </p>
                  <footer className="mt-4 flex items-center gap-3">
                    <div className="h-6 w-6 rounded-full bg-emerald-500/20 border border-emerald-500/40" />
                    <span className="text-[10px] font-bold uppercase tracking-wider text-white/60">The Collective Approach</span>
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