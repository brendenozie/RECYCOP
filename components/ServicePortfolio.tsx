"use client";

import { motion } from "framer-motion";
import { 
  TruckIcon, 
  ArrowsPointingInIcon, 
  ScissorsIcon,        
  ShieldCheckIcon,
  BoltIcon,
  ArrowUpRightIcon
} from "@heroicons/react/24/outline";
import { cn } from "@/lib/utils";

const services = [
  {
    title: "High-Density Baling",
    subtitle: "Module 01 / Physical",
    description: "Our proprietary compression technology reduces material volume by up to 80%, optimizing sea-freight logistics and meeting rigorous export standards.",
    icon: ArrowsPointingInIcon,
    stats: "2,000kg/hr Capacity",
    className: "md:col-span-2 md:row-span-1 bg-white/[0.03] dark:bg-emerald-500/[0.02]",
    color: "emerald"
  },
  {
    title: "Industrial Shredding",
    subtitle: "Module 02 / Precision",
    description: "Precision-engineered shredding lines for HDPE and PET, producing uniform, contamination-free flakes.",
    icon: ScissorsIcon,
    stats: "99.9% Purity",
    className: "md:col-span-1 md:row-span-1 bg-white/[0.03]",
    color: "purple"
  },
  {
    title: "Smart Logistics",
    subtitle: "Module 03 / Network",
    description: "Dynamic fleet coordination ensuring seamless material aggregation from thousands of informal touchpoints.",
    icon: TruckIcon,
    stats: "Real-time Telemetry",
    className: "md:col-span-1 md:row-span-1 bg-white/[0.03]",
    color: "emerald"
  },
  {
    title: "Market Access & Offtake",
    subtitle: "Module 04 / Capital",
    description: "We bridge the gap between local cooperatives and global manufacturing, securing long-term contracts and floor-price guarantees.",
    icon: ShieldCheckIcon,
    stats: "Guaranteed Offtake",
    className: "md:col-span-2 md:row-span-1 bg-emerald-500/[0.05] dark:bg-emerald-500/[0.08] border-emerald-500/20",
    color: "emerald"
  },
];

export function ServicePortfolio() {
  return (
    <section className="relative py-32 bg-slate-50 dark:bg-[#05010d] transition-colors duration-500 overflow-hidden">
      
      {/* Decorative Grid Background */}
      <div className="absolute inset-0 z-0 opacity-[0.03] dark:opacity-[0.05] pointer-events-none">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#808080_1px,transparent_1px),linear-gradient(to_bottom,#808080_1px,transparent_1px)] bg-[size:40px_40px]" />
      </div>

      <div className="container relative z-10 mx-auto px-6">
        
        {/* --- Dynamic Header --- */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between mb-20 gap-8">
          <div className="max-w-3xl">
            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              className="flex items-center gap-3 text-emerald-600 dark:text-emerald-400 font-black uppercase tracking-[0.3em] text-[10px] mb-6"
            >
              <BoltIcon className="h-4 w-4 animate-pulse" />
              <span>Industrial Infrastructure</span>
            </motion.div>
            <h2 className="font-serif text-5xl md:text-7xl text-slate-900 dark:text-white leading-[1.1]">
              Physical Power, <br />
              <span className="text-emerald-600 dark:text-emerald-400 italic font-light">Digitally Synchronized.</span>
            </h2>
          </div>
          <p className="lg:max-w-xs text-slate-500 dark:text-purple-100/40 text-sm leading-relaxed font-light">
            Our processing hubs are the heavy-duty engine of the value chain, turning raw waste into high-value industrial feedstocks.
          </p>
        </div>

        {/* --- Bento Grid --- */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 auto-rows-[minmax(320px,auto)]">
          {services.map((service, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ 
                duration: 0.8, 
                delay: index * 0.1,
                ease: [0.16, 1, 0.3, 1] 
              }}
              viewport={{ once: true, margin: "-50px" }}
              className={cn(
                "group relative rounded-[2.5rem] border border-slate-200 dark:border-white/10 p-10 overflow-hidden transition-all duration-500 backdrop-blur-xl",
                "hover:shadow-2xl hover:border-emerald-500/30",
                service.className
              )}
            >
              {/* Card Background Graphics */}
              <div className="absolute top-0 right-0 p-8 opacity-[0.02] dark:opacity-[0.05] group-hover:scale-110 transition-transform duration-700">
                <service.icon className="h-48 w-48 -mr-16 -mt-16" />
              </div>

              <div className="relative z-10 flex flex-col h-full justify-between">
                <div>
                  <div className="flex justify-between items-start mb-8">
                    <div className={cn(
                      "p-4 rounded-2xl transition-all duration-500 group-hover:rotate-6 shadow-lg",
                      service.color === "emerald" 
                        ? "bg-emerald-50 dark:bg-emerald-500/10 text-emerald-600 dark:text-emerald-400" 
                        : "bg-purple-50 dark:bg-purple-500/10 text-purple-600 dark:text-purple-400"
                    )}>
                      <service.icon className="h-7 w-7" />
                    </div>
                    <span className="text-[10px] font-mono font-bold text-slate-400 dark:text-white/20 uppercase tracking-widest border border-slate-200 dark:border-white/10 px-3 py-1 rounded-full">
                      {service.subtitle}
                    </span>
                  </div>

                  <h3 className="text-3xl font-bold text-slate-900 dark:text-white mb-4 tracking-tighter">
                    {service.title}
                  </h3>
                  <p className="text-slate-500 dark:text-purple-100/50 leading-relaxed text-base font-light max-w-sm">
                    {service.description}
                  </p>
                </div>

                <div className="mt-12 flex items-center justify-between">
                  <div className="flex flex-col">
                    <span className="text-[10px] font-black uppercase tracking-widest text-slate-400 dark:text-white/30 mb-1">
                      Live Metric
                    </span>
                    <span className="text-sm font-bold text-emerald-600 dark:text-emerald-400">
                      {service.stats}
                    </span>
                  </div>
                  
                  <motion.div
                    whileHover={{ scale: 1.1, x: 5 }}
                    className="h-12 w-12 rounded-full border border-slate-200 dark:border-white/10 flex items-center justify-center text-slate-400 dark:text-white group-hover:border-emerald-500 group-hover:text-emerald-500 transition-colors cursor-pointer"
                  >
                    <ArrowUpRightIcon className="h-5 w-5" />
                  </motion.div>
                </div>
              </div>

              {/* Decorative Linear Gradient Shine */}
              <div className="absolute inset-0 rounded-[2.5rem] bg-gradient-to-br from-emerald-500/[0.05] via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />
            </motion.div>
          ))}
        </div>

        {/* --- Global Call-to-Action --- */}
        <motion.div 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          className="mt-20 flex flex-col md:flex-row items-center justify-center gap-6 p-8 rounded-[2rem] border border-dashed border-slate-200 dark:border-white/10"
        >
          <p className="text-sm text-slate-500 dark:text-purple-100/40 text-center md:text-left">
            Interested in the technical specifications of our processing lines?
          </p>
          <button className="bg-slate-900 dark:bg-white text-white dark:text-slate-900 px-8 py-3 rounded-full text-sm font-bold hover:bg-emerald-500 dark:hover:bg-emerald-400 hover:text-white transition-all">
            Download Tech Sheets
          </button>
        </motion.div>
      </div>
    </section>
  );
}