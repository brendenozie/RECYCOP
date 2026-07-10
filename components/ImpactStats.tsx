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
  const springValue = useSpring(motionValue, { damping: 30, stiffness: 70 });
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

  return <span ref={ref} className="font-extrabold tracking-tight" />;
}

const stats = [
  {
    label: "Money Lost to Waste",
    value: 2,
    suffix: "B+",
    prefix: "$",
    description: "Value lost globally every single year from dumped or buried trash.",
    icon: GlobeAmericasIcon,
    color: "emerald",
  },
  {
    label: "Local Recycling Rate",
    value: 20,
    suffix: "%",
    prefix: "",
    description: "The current average nearby. Our goal is to double this number.",
    icon: ArrowTrendingUpIcon,
    color: "purple",
  },
  {
    label: "Local Collectors Supported",
    value: 50000,
    suffix: "+",
    prefix: "",
    description: "Helping hard-working neighborhood pickers earn a steady, safe income.",
    icon: UserPlusIcon,
    color: "emerald",
  },
  {
    label: "Value Kept in Communities",
    value: 150,
    suffix: "M",
    prefix: "KSh ",
    description: "Extra money brought back into local regional towns each year.",
    icon: CurrencyDollarIcon,
    color: "purple",
  },
];

export function ImpactStats() {
  return (
    <section className="relative py-16 sm:py-24 md:py-32 bg-gradient-to-b from-slate-50 to-white dark:from-[#05010d] dark:to-[#0a0118] transition-colors duration-500 overflow-hidden">
      
      {/* 1. LAYERED LOGISTICS BACKGROUND */}
      <div className="absolute inset-0 z-0 pointer-events-none opacity-20 dark:opacity-[0.15]">
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
          
          {/* Active Node Marker */}
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
        <div className="absolute inset-0 bg-gradient-to-b from-slate-50 dark:from-[#05010d] via-transparent to-white dark:to-[#0a0118]" />
      </div>

      <div className="container relative z-10 mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Heading */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-3xl mb-12 md:mb-20 text-center md:text-left flex flex-col md:flex-row items-center gap-4 md:gap-6"
        >
          <div className="p-4 bg-emerald-600/10 dark:bg-emerald-500/10 rounded-2xl text-emerald-600 dark:text-emerald-400 hidden md:block">
            <MapPinIcon className="h-8 w-8" strokeWidth={1.5} />
          </div>
          <div>
            <h2 className="text-xs font-bold uppercase tracking-widest text-emerald-600 dark:text-emerald-400 mb-2">
              Our Real-World Impact
            </h2>
            <p className="text-2xl sm:text-3xl md:text-4xl font-extrabold tracking-tight text-slate-900 dark:text-white leading-tight">
              Changing how we treat our environment while <span className="text-purple-600 dark:text-purple-400">growing local income.</span>
            </p>
          </div>
        </motion.div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
          {stats.map((stat, i) => (
            <motion.div 
              key={i}
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: i * 0.1 }}
              viewport={{ once: true }}
              className="group relative p-6 sm:p-8 rounded-3xl bg-white/80 dark:bg-[#120326]/60 border border-slate-200 dark:border-white/10 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 overflow-hidden backdrop-blur-md"
            >
              {/* Decorative Corner Glow */}
              <div className={`absolute -right-10 -top-10 h-32 w-32 blur-[60px] opacity-10 transition-opacity group-hover:opacity-20 ${stat.color === 'emerald' ? 'bg-emerald-500' : 'bg-purple-600'}`} />

              <div className="relative z-10 flex flex-col h-full justify-between">
                <div>
                  <div className={`inline-flex p-3 rounded-xl mb-6 ${stat.color === 'emerald' ? 'bg-emerald-100/70 dark:bg-emerald-500/10 text-emerald-700 dark:text-emerald-400' : 'bg-purple-100/70 dark:bg-purple-500/10 text-purple-700 dark:text-purple-400'}`}>
                    <stat.icon className="h-6 w-6" />
                  </div>

                  <h3 className="text-4xl sm:text-5xl font-extrabold tracking-tight text-slate-900 dark:text-white flex items-baseline gap-0.5">
                    {stat.prefix && <span className="text-lg sm:text-xl font-medium text-slate-400 dark:text-white/40 mr-0.5">{stat.prefix}</span>}
                    <Counter value={stat.value} suffix={stat.suffix} />
                  </h3>
                </div>
                
                <div className="mt-4">
                  <p className="text-xs font-bold tracking-wide text-slate-800 dark:text-white mb-1.5">
                    {stat.label}
                  </p>
                  <p className="text-sm text-slate-600 dark:text-purple-100/60 leading-relaxed font-normal">
                    {stat.description}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* CTA Action Banner */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.98 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="mt-12 sm:mt-16 relative overflow-hidden rounded-3xl bg-slate-950 dark:bg-[#1a0433] p-8 md:p-10 shadow-xl"
        >
          <div className="absolute inset-0 opacity-[0.02] bg-[url('https://grainy-gradients.vercel.app/noise.svg')] pointer-events-none" />
          
          <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-6 text-center md:text-left">
            <div className="space-y-2">
              <div className="flex items-center gap-2 justify-center md:justify-start">
                <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
                <span className="text-[10px] font-bold text-emerald-400 uppercase tracking-widest">Built For Community Action</span>
              </div>
              <p className="text-lg sm:text-xl md:text-2xl font-bold text-white max-w-xl leading-snug">
                Creating clean neighborhoods and sustainable paths to financial freedom.
              </p>
            </div>
            
            <button className="group w-full md:w-auto flex items-center justify-center gap-2.5 bg-emerald-600 hover:bg-emerald-500 text-white dark:bg-white dark:text-slate-900 px-6 py-4 rounded-xl font-bold text-sm transition-all active:scale-95 shadow-md">
              <DocumentArrowDownIcon className="h-5 w-5 opacity-80" />
              See Our Progress Report
            </button>
          </div>
        </motion.div>
      </div>
    </section>
  );
}