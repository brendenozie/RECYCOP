"use client";

import { motion, useInView, useMotionValue, useSpring } from "framer-motion";
import { useEffect, useRef } from "react";
import { 
  CurrencyDollarIcon, 
  GlobeAmericasIcon, 
  UserPlusIcon, 
  ArrowTrendingUpIcon,
  DocumentArrowDownIcon,
  MapPinIcon
} from "@heroicons/react/24/outline";

function Counter({ value, suffix = "" }: { value: number; suffix?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const motionValue = useMotionValue(0);
  const springValue = useSpring(motionValue, { damping: 40, stiffness: 80 });
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  useEffect(() => {
    if (isInView) motionValue.set(value);
  }, [motionValue, value, isInView]);

  useEffect(() => {
    springValue.on("change", (latest) => {
      if (ref.current) {
        ref.current.textContent = Intl.NumberFormat("en-US").format(Math.floor(latest)) + suffix;
      }
    });
  }, [springValue, suffix]);

  return <span ref={ref} className="font-serif italic" />;
}

const stats = [
  {
    label: "Global Waste Crisis",
    value: 2,
    suffix: "B+",
    prefix: "$",
    description: "Annual economic leakage due to unmanaged waste.",
    icon: GlobeAmericasIcon,
    color: "emerald",
  },
  {
    label: "Recycling Rate",
    value: 20,
    suffix: "%",
    prefix: "",
    description: "Current average in developing markets. We aim to double this.",
    icon: ArrowTrendingUpIcon,
    color: "purple",
  },
  {
    label: "Target Informal Actors",
    value: 50000,
    suffix: "",
    prefix: "",
    description: "Integrating individual collectors into the formal economy.",
    icon: UserPlusIcon,
    color: "emerald",
  },
  {
    label: "Local Value Potential",
    value: 150,
    suffix: "M",
    prefix: "KSh ",
    description: "Recoverable value per major regional hub annually.",
    icon: CurrencyDollarIcon,
    color: "purple",
  },
];

export function ImpactStats() {
  return (
    <section className="relative py-32 bg-slate-50 dark:bg-[#05010d] transition-colors duration-500 overflow-hidden">
      
      {/* 1. LAYERED LOGISTICS BACKGROUND */}
      <div className="absolute inset-0 z-0 pointer-events-none opacity-20 dark:opacity-[0.15]">
        {/* World Map Line-Art (using pseudo-element for performance) */}
        <div className="absolute inset-0 bg-[url('/world-map-lines.svg')] bg-center bg-no-repeat bg-cover filter invert dark:invert-0" />
        
        {/* Localized Nairobi topological mesh overlay */}
        <svg width="100%" height="100%" className="absolute inset-0">
          <defs>
            <pattern id="nairobi-mesh" width="80" height="80" patternUnits="userSpaceOnUse" x="50%" y="50%">
              <circle cx="1" cy="1" r="1" className="fill-slate-900 dark:fill-emerald-400 opacity-30" />
              <path d="M80 0 L0 0 0 80" className="stroke-slate-900/10 dark:stroke-emerald-400/10" strokeWidth="0.5" fill="none"/>
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#nairobi-mesh)" />
          
          {/* Nairobi "Active Node" Marker */}
          <motion.circle 
            cx="50%" 
            cy="50%" 
            r="10" 
            className="fill-emerald-500/20 stroke-emerald-500" 
            strokeWidth="1"
            animate={{ r: [10, 25, 10], opacity: [0.5, 0.2, 0.5] }}
            transition={{ duration: 4, repeat: Infinity }}
          />
          <circle cx="50%" cy="50%" r="2" className="fill-emerald-400" />
        </svg>

        {/* Depth Mask */}
        <div className="absolute inset-0 bg-gradient-to-b from-slate-50 dark:from-[#05010d] via-transparent to-slate-50 dark:to-[#05010d]" />
      </div>

      <div className="container relative z-10 mx-auto px-6">
        <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="max-w-2xl mb-20 flex items-center gap-6"
        >
            <MapPinIcon className="hidden md:block h-16 w-16 text-emerald-600 dark:text-emerald-400/40 opacity-50" strokeWidth={0.5} />
            <div>
                <h2 className="text-xs font-black uppercase tracking-[0.3em] text-emerald-600 dark:text-emerald-400 mb-4">
                    Network Intelligence
                </h2>
                <p className="text-3xl md:text-4xl font-serif text-slate-900 dark:text-white leading-tight">
                    Turning environmental pressure into <span className="italic text-purple-600 dark:text-purple-400">economic yield.</span>
                </p>
            </div>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat, i) => (
            <motion.div 
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: i * 0.1 }}
              viewport={{ once: true }}
              className="group relative p-8 rounded-[2.5rem] bg-white/70 dark:bg-[#120326]/60 border border-slate-200 dark:border-white/10 shadow-sm hover:shadow-2xl hover:-translate-y-2 transition-all duration-500 overflow-hidden backdrop-blur-md"
            >
              {/* Card Glow Effect */}
              <div className={`absolute -right-10 -top-10 h-32 w-32 blur-[80px] opacity-20 transition-opacity group-hover:opacity-40 ${stat.color === 'emerald' ? 'bg-emerald-500' : 'bg-purple-600'}`} />

              <div className="relative z-10">
                <div className={`inline-flex p-3 rounded-2xl mb-8 ${stat.color === 'emerald' ? 'bg-emerald-50 dark:bg-emerald-500/10 text-emerald-600 dark:text-emerald-400' : 'bg-purple-50 dark:bg-purple-500/10 text-purple-600 dark:text-purple-400'}`}>
                  <stat.icon className="h-6 w-6" />
                </div>

                <div className="space-y-4">
                  <h3 className="text-5xl font-bold tracking-tighter text-slate-900 dark:text-white flex items-baseline gap-1">
                    <span className="text-xl font-sans font-light text-slate-400 dark:text-white/40">{stat.prefix}</span>
                    <Counter value={stat.value} suffix={stat.suffix} />
                  </h3>
                  
                  <div>
                    <p className="text-[10px] uppercase font-black tracking-widest text-emerald-600 dark:text-emerald-400 mb-2">
                      {stat.label}
                    </p>
                    <p className="text-sm text-slate-500 dark:text-purple-100/50 leading-relaxed font-light">
                      {stat.description}
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* CTA Banner */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          className="mt-16 relative overflow-hidden rounded-[2rem] bg-slate-900 dark:bg-[#1a0433] p-8 md:p-12 shadow-2xl"
        >
          {/* Subtle noise and pattern for the CTA box */}
          <div className="absolute inset-0 opacity-[0.03] bg-[url('https://grainy-gradients.vercel.app/noise.svg')] pointer-events-none" />
          
          <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-8">
            <div className="space-y-4 text-center md:text-left">
              <div className="flex items-center gap-2 justify-center md:justify-start">
                <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
                <span className="text-[10px] font-bold text-emerald-400 uppercase tracking-widest">Vision 2030 Aligned</span>
              </div>
              <p className="text-xl md:text-2xl font-serif text-white max-w-xl leading-snug">
                Building the <span className="italic text-emerald-400">digital heartbeat</span> of Kenya&apos;s circular economy.
              </p>
            </div>
            
            <button className="group flex items-center gap-3 bg-white text-slate-900 px-8 py-4 rounded-2xl font-bold text-sm hover:bg-emerald-400 transition-all active:scale-95 shadow-xl">
              <DocumentArrowDownIcon className="h-5 w-5 text-slate-400 group-hover:text-slate-900" />
              Download Impact Report
            </button>
          </div>
        </motion.div>
      </div>
    </section>
  );
}