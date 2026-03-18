"use client";

import { motion } from "framer-motion";
import { 
  ArrowRightIcon, 
  UserGroupIcon, 
  BuildingOfficeIcon,
  CheckCircleIcon,
  SparklesIcon,
  GlobeAltIcon
} from "@heroicons/react/24/outline";
import { cn } from "@/lib/utils";

export function CooperativeCTA() {
  return (
    <section className="relative py-32 bg-white dark:bg-[#05010d] transition-colors duration-500 overflow-hidden">
      
      {/* Dynamic Background Elements */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full pointer-events-none z-0">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-emerald-500/10 dark:bg-emerald-500/5 blur-[120px] rounded-full animate-pulse" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-purple-500/10 dark:bg-purple-500/5 blur-[120px] rounded-full" />
      </div>

      <div className="container relative z-10 mx-auto px-6">
        
        {/* --- Central Header --- */}
        <div className="text-center max-w-4xl mx-auto mb-24">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-emerald-500 dark:bg-emerald-400 text-white dark:text-slate-900 font-black uppercase tracking-[0.3em] text-[10px] mb-8 shadow-lg shadow-emerald-500/20"
          >
            <SparklesIcon className="h-4 w-4" />
            <span>Join the Scale-Up</span>
          </motion.div>
          
          <h2 className="font-serif text-5xl md:text-8xl text-slate-900 dark:text-white mb-8 tracking-tight leading-[1.05]">
            Ready to <span className="italic text-emerald-600 dark:text-emerald-400 font-light underline decoration-emerald-500/20 underline-offset-[12px]">Formalize</span> <br className="hidden md:block" />
            the Future?
          </h2>
          <p className="text-slate-500 dark:text-purple-100/60 text-lg md:text-xl font-light max-w-2xl mx-auto leading-relaxed">
            Recyc provides the digital and physical infrastructure to turn fragmented waste collection into a high-growth, high-purity industrial engine.
          </p>
        </div>

        {/* --- Split Path Layout --- */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-6xl mx-auto">
          
          {/* PATH A: AGGREGATORS */}
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            whileHover={{ y: -8 }}
            className="group relative p-12 rounded-[3rem] bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/10 overflow-hidden transition-all duration-500 shadow-2xl dark:shadow-none"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/[0.07] to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
            
            <div className="relative z-10 h-full flex flex-col">
              <div className="flex justify-between items-start mb-12">
                <div className="h-16 w-16 rounded-2xl bg-emerald-500 shadow-xl shadow-emerald-500/20 flex items-center justify-center text-white transition-transform group-hover:rotate-6">
                  <UserGroupIcon className="h-8 w-8 stroke-[2px]" />
                </div>
                <span className="text-[10px] font-mono font-bold text-slate-400 dark:text-white/20 uppercase tracking-[0.3em]">Module_01 / Field</span>
              </div>

              <h3 className="text-4xl font-bold text-slate-900 dark:text-white mb-4 tracking-tighter">For Aggregators</h3>
              <p className="text-slate-500 dark:text-purple-100/60 mb-10 text-lg font-light leading-relaxed">
                Unlock instant digital payments, guaranteed offtake, and optimized logistics for your collection team.
              </p>
              
              <ul className="space-y-4 mb-12">
                {['Premium Pricing Rails', 'Logistics Fleet Dispatch', 'Digital Weight Verification'].map((feat) => (
                  <li key={feat} className="flex items-center gap-3 text-sm font-bold text-slate-700 dark:text-purple-100 uppercase tracking-tight">
                    <CheckCircleIcon className="h-5 w-5 text-emerald-500" />
                    <span>{feat}</span>
                  </li>
                ))}
              </ul>

              <button className="mt-auto w-full py-5 rounded-2xl bg-emerald-500 text-white font-black uppercase tracking-widest text-xs flex items-center justify-center gap-3 shadow-lg shadow-emerald-500/30 hover:bg-emerald-400 transition-all active:scale-95 group/btn">
                Enroll as Aggregator
                <ArrowRightIcon className="h-4 w-4 transition-transform group-hover/btn:translate-x-2" />
              </button>
            </div>
          </motion.div>

          {/* PATH B: PARTNERS */}
          <motion.div 
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            whileHover={{ y: -8 }}
            className="group relative p-12 rounded-[3rem] bg-slate-900 dark:bg-black border border-white/5 overflow-hidden transition-all duration-500 shadow-2xl"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-purple-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />

            <div className="relative z-10 h-full flex flex-col">
              <div className="flex justify-between items-start mb-12">
                <div className="h-16 w-16 rounded-2xl bg-white/5 border border-white/20 flex items-center justify-center text-purple-400 shadow-inner group-hover:rotate-[-6deg] transition-transform">
                  <BuildingOfficeIcon className="h-8 w-8" />
                </div>
                <span className="text-[10px] font-mono font-bold text-white/20 uppercase tracking-[0.3em]">Module_02 / Capital</span>
              </div>

              <h3 className="text-4xl font-bold text-white mb-4 tracking-tighter">Strategic Partners</h3>
              <p className="text-white/50 mb-10 text-lg font-light leading-relaxed">
                Meet ESG mandates with 100% traceable, high-purity recycled flakes directly from the source.
              </p>

              <ul className="space-y-4 mb-12">
                {['ESG Data API Access', 'Verified Plastic Credits', 'Direct Manufacturer Port'].map((feat) => (
                  <li key={feat} className="flex items-center gap-3 text-sm font-bold text-white uppercase tracking-tight">
                    <CheckCircleIcon className="h-5 w-5 text-purple-500" />
                    <span>{feat}</span>
                  </li>
                ))}
              </ul>

              <button className="mt-auto w-full py-5 rounded-2xl bg-white/5 border border-white/10 text-white font-black uppercase tracking-widest text-xs flex items-center justify-center gap-3 hover:bg-white/10 transition-all active:scale-95 group/btn">
                Inquire for Partnership
                <GlobeAltIcon className="h-4 w-4 transition-transform group-hover/btn:scale-125 text-purple-400" />
              </button>
            </div>
          </motion.div>

        </div>

        {/* --- Final Global Alignment Footer --- */}
        <div className="mt-32 pt-16 border-t border-slate-100 dark:border-white/5 flex flex-col items-center">
          <div className="flex items-center gap-10 opacity-30 grayscale hover:grayscale-0 transition-all duration-700 mb-10">
            {/* These would be small partner/policy logos */}
            <div className="h-6 w-24 bg-slate-400 rounded-full" />
            <div className="h-6 w-32 bg-slate-400 rounded-full" />
            <div className="h-6 w-20 bg-slate-400 rounded-full" />
          </div>
          <p className="text-[10px] font-black uppercase tracking-[0.6em] text-slate-400 dark:text-white/20 text-center leading-loose">
            A Circular Economy Operating System <br />
            Aligned with Kenya Vision 2030 &amp; Global ESG Standards
          </p>
        </div>
      </div>
    </section>
  );
}