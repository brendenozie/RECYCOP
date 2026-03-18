"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { 
  ChartBarIcon, 
  MapIcon, 
  UserGroupIcon, 
  BoltIcon,
  CircleStackIcon,
  ArrowUpRightIcon,
  AdjustmentsHorizontalIcon,
  FingerPrintIcon
} from "@heroicons/react/24/outline";

export function RecycOpShowcase() {
  const containerRef = useRef<HTMLDivElement>(null);
  
  // Subtle parallax for the dashboard mockup
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  const rotateX = useTransform(scrollYProgress, [0, 1], [10, -10]);
  const translateZ = useTransform(scrollYProgress, [0, 1], [0, 50]);

  return (
    <section ref={containerRef} className="relative py-32 bg-white dark:bg-[#05010d] transition-colors duration-500 overflow-hidden">
      
      {/* Background Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[500px] bg-emerald-500/10 dark:bg-emerald-500/5 blur-[120px] rounded-full pointer-events-none" />

      <div className="container relative z-10 mx-auto px-6">
        <div className="flex flex-col lg:flex-row items-center gap-20">
          
          {/* --- LEFT: The Narrative Hub --- */}
          <div className="lg:w-2/5 space-y-10">
            <div className="space-y-6">
              <motion.div 
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-emerald-100 dark:bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 font-black uppercase tracking-[0.3em] text-[10px]"
              >
                <BoltIcon className="h-4 w-4" />
                <span>Operating System</span>
              </motion.div>
              
              <h2 className="font-serif text-5xl md:text-7xl text-slate-900 dark:text-white leading-[1.1]">
                The Brain of the <br />
                <span className="text-emerald-600 dark:text-emerald-400 italic font-light underline decoration-emerald-500/20 underline-offset-8">Supply Chain.</span>
              </h2>
              
              <p className="text-slate-500 dark:text-purple-100/60 text-lg font-light leading-relaxed max-w-md">
                RecycOp is a logistics engine that coordinates thousands of collectors, 
                validates material purity, and provides the transparency global buyers demand.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {[
                { icon: CircleStackIcon, title: "Traceability", text: "Real-time KG tracking" },
                { icon: MapIcon, title: "Geospatial", text: "Logistics optimization" },
                { icon: UserGroupIcon, title: "Membership", text: "Co-op governance" },
                { icon: FingerPrintIcon, title: "Purity", text: "Material validation" },
              ].map((item, i) => (
                <motion.div 
                  key={i}
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.1 }}
                  className="group flex flex-col gap-3 p-4 rounded-2xl border border-slate-100 dark:border-white/5 bg-slate-50/50 dark:bg-white/5 hover:border-emerald-500/30 transition-all"
                >
                  <item.icon className="h-6 w-6 text-emerald-500 group-hover:scale-110 transition-transform" />
                  <div>
                    <p className="text-xs font-black uppercase tracking-widest text-slate-900 dark:text-white">{item.title}</p>
                    <p className="text-[11px] text-slate-500 dark:text-purple-100/40">{item.text}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* --- RIGHT: The Intelligent Dashboard --- */}
          <div className="lg:w-3/5 w-full perspective-2000">
            <motion.div 
              style={{ rotateX, translateZ }}
              className="relative rounded-[2.5rem] border border-slate-200 dark:border-white/10 bg-white/70 dark:bg-slate-950/40 p-3 shadow-2xl backdrop-blur-2xl overflow-hidden shadow-emerald-500/10"
            >
              {/* Internal Mockup Container */}
              <div className="rounded-[2rem] bg-slate-50 dark:bg-[#0a0a0b] overflow-hidden flex h-[600px] border border-slate-200 dark:border-white/5">
                
                {/* Side Dock */}
                <div className="w-20 border-r border-slate-200 dark:border-white/5 flex flex-col items-center py-8 space-y-10">
                  <div className="h-10 w-10 rounded-xl bg-emerald-500 shadow-[0_0_20px_rgba(16,185,129,0.4)] flex items-center justify-center">
                    <BoltIcon className="h-6 w-6 text-black" />
                  </div>
                  {[ChartBarIcon, MapIcon, UserGroupIcon, AdjustmentsHorizontalIcon].map((Icon, i) => (
                    <Icon key={i} className="h-6 w-6 text-slate-400 dark:text-white/20 hover:text-emerald-500 transition-colors cursor-pointer" />
                  ))}
                </div>

                {/* Main Viewport */}
                <div className="flex-1 p-10 flex flex-col gap-10">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="text-[10px] font-black text-slate-400 dark:text-white/30 uppercase tracking-[0.3em] mb-2">Network Node Status</h3>
                      <p className="text-3xl font-serif text-slate-900 dark:text-white tracking-tight">Nairobi Central Hub</p>
                    </div>
                    <div className="flex items-center gap-3 bg-emerald-50 dark:bg-emerald-500/10 px-4 py-2 rounded-xl border border-emerald-500/20">
                      <div className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse shadow-[0_0_10px_#10b981]" />
                      <span className="text-[10px] font-black uppercase text-emerald-600 dark:text-emerald-500 tracking-widest">Active Link</span>
                    </div>
                  </div>

                  {/* High-Contrast Data Tiles */}
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {[
                      { label: "Volume (KG)", val: "42,890", change: "+12.4%", color: "emerald" },
                      { label: "Supply Units", val: "184", change: "+5.1%", color: "purple" },
                      { label: "Ecosystem Yield", val: "KSh 2.4M", change: "+18.2%", color: "emerald" },
                    ].map((stat, i) => (
                      <div key={i} className="bg-white dark:bg-white/5 rounded-2xl p-6 border border-slate-100 dark:border-white/5 shadow-sm">
                        <p className="text-[10px] text-slate-400 dark:text-white/40 font-black uppercase tracking-widest mb-4">{stat.label}</p>
                        <p className="text-2xl font-bold text-slate-900 dark:text-white font-mono tracking-tighter">{stat.val}</p>
                        <div className="flex items-center text-emerald-500 text-[10px] mt-4 font-black">
                          <ArrowUpRightIcon className="h-3 w-3 mr-1 stroke-[3px]" /> {stat.change}
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Flow Visualization Area */}
                  <div className="flex-1 bg-white dark:bg-white/5 rounded-[2rem] p-8 border border-slate-100 dark:border-white/5 relative overflow-hidden group">
                    <div className="flex justify-between items-center mb-10">
                      <p className="text-[10px] text-slate-400 dark:text-white/40 font-black uppercase tracking-widest">Aggregation Flow (7D)</p>
                      <span className="text-[10px] font-mono text-emerald-500">Live Telemetry</span>
                    </div>
                    
                    <div className="flex items-end justify-between h-40 gap-3">
                      {[40, 70, 45, 90, 65, 80, 100, 55, 75, 85].map((h, i) => (
                        <motion.div 
                          key={i}
                          initial={{ height: 0 }}
                          whileInView={{ height: `${h}%` }}
                          transition={{ duration: 1.5, delay: i * 0.05, ease: "circOut" }}
                          className="flex-1 bg-gradient-to-t from-emerald-600/20 to-emerald-500 rounded-t-lg group-hover:from-emerald-500/40 transition-all"
                        />
                      ))}
                    </div>

                    {/* Technical Grid Overlay */}
                    <div className="absolute inset-0 grid grid-cols-6 grid-rows-4 pointer-events-none opacity-[0.03] dark:opacity-[0.05]">
                      {[...Array(24)].map((_, i) => <div key={i} className="border-[0.5px] border-slate-900 dark:border-white" />)}
                    </div>
                  </div>
                </div>
              </div>

              {/* Decorative Corner Labels */}
              <div className="absolute top-10 right-10 text-[8px] font-mono text-slate-400 dark:text-white/20 uppercase tracking-[0.5em] rotate-90 origin-right">
                RecycOp_v4.0.2
              </div>
            </motion.div>
          </div>

        </div>
      </div>
    </section>
  );
}