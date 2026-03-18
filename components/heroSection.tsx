"use client";

import { motion } from "framer-motion";
import { 
  ArrowRightIcon, 
  CpuChipIcon, 
  TruckIcon, 
  ChevronRightIcon,
  ChartBarIcon
} from "@heroicons/react/24/outline";
import Image from "next/image";

export default function HeroSection(){
  return (
    <section className="relative min-h-[95vh] w-full overflow-hidden bg-slate-50 transition-colors duration-500 dark:bg-[#0a0118] text-slate-900 dark:text-white">
      
      {/* Dynamic Background Elements */}
      <div className="absolute inset-0 z-0">
        <div className="absolute top-[-10%] left-[-10%] h-[500px] w-[500px] rounded-full bg-emerald-500/10 dark:bg-emerald-500/10 blur-[120px] animate-pulse" />
        <div className="absolute bottom-[-10%] right-[-10%] h-[600px] w-[600px] rounded-full bg-purple-200/40 dark:bg-[#3b0764]/20 blur-[150px]" />
        
        {/* Subtle Texture Overlay */}
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-10 dark:opacity-20 brightness-100 dark:brightness-50 contrast-150 pointer-events-none" />
        
        {/* Light Mode Grid (Optional extra detail) */}
        <div className="absolute inset-0 hidden dark:block bg-[linear-gradient(to_right,#ffffff05_1px,transparent_1px),linear-gradient(to_bottom,#ffffff05_1px,transparent_1px)] bg-[size:40px_40px]" />
      </div>

      <div className="container relative z-10 mx-auto px-6 pt-32 pb-20 lg:pt-40">
        <div className="grid grid-cols-1 items-center gap-16 lg:grid-cols-12">
          
          {/* Left Column: The Narrative */}
          <div className="lg:col-span-7">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
            >
              <span className="inline-flex items-center rounded-full bg-emerald-500/10 dark:bg-white/10 px-4 py-1.5 text-xs font-bold tracking-widest text-emerald-600 dark:text-emerald-400 ring-1 ring-inset ring-emerald-500/20 dark:ring-white/20 uppercase">
                Organizing Africa&apos;s Waste Economy
              </span>
              
              <h1 className="mt-8 font-serif text-5xl font-medium leading-[1.1] md:text-7xl lg:text-8xl">
                Bridging the Gap <br />
                <span className="text-emerald-600 dark:text-emerald-400 italic">Waste</span> & <span className="text-purple-600 dark:text-purple-300">Wealth</span>
              </h1>

              <p className="mt-8 max-w-xl text-lg leading-relaxed text-slate-600 dark:text-purple-100/70 font-light">
                Recyc provides the physical infrastructure while RecycOp delivers the digital intelligence. 
                Together, we are formalizing the recycling sector through cooperative-led innovation.
              </p>

              <div className="mt-10 flex flex-col space-y-4 sm:flex-row sm:space-y-0 sm:space-x-6">
                <button className="group relative flex items-center justify-center rounded-2xl bg-emerald-600 dark:bg-emerald-500 px-8 py-4 font-bold text-white dark:text-gray-900 transition-all hover:scale-[1.02] active:scale-95 shadow-lg shadow-emerald-500/20">
                  Join the Cooperative
                  <ArrowRightIcon className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
                </button>
                <button className="flex items-center justify-center rounded-2xl border border-slate-200 dark:border-white/10 bg-white/50 dark:bg-white/5 px-8 py-4 font-bold backdrop-blur-md transition-all hover:bg-slate-100 dark:hover:bg-white/10 text-slate-700 dark:text-white">
                  Explore RecycOp
                  <ChevronRightIcon className="ml-2 h-5 w-5 text-purple-500 dark:text-purple-300" />
                </button>
              </div>
            </motion.div>
          </div>

          {/* Right Column: The "Phygital" Visual Canvas */}
          <div className="relative lg:col-span-5">
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.2 }}
              className="relative aspect-[4/5] rounded-[3rem] border border-slate-200 dark:border-white/10 bg-white/30 dark:bg-gradient-to-b dark:from-white/5 dark:to-transparent p-3 shadow-2xl overflow-hidden backdrop-blur-sm"
            >
              {/* Image Layer */}
              <div className="absolute inset-0 z-0">
                <Image
                  src="https://images.unsplash.com/photo-1532996122724-e3c354a0b15b?auto=format&fit=crop&w=800&q=80" 
                  alt="Industrial Baling" 
                  className="h-full w-full object-cover opacity-80 dark:opacity-60 grayscale hover:grayscale-0 transition-all duration-1000"
                  fill
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-50 dark:from-[#0a0118] via-transparent to-transparent" />
              </div>

              {/* Data Overlay */}
              <div className="relative z-10 h-full w-full flex flex-col justify-end p-8 space-y-4">
                
                {/* Floating Intelligence Card */}
                <motion.div 
                  animate={{ y: [0, -12, 0] }}
                  transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
                  className="absolute top-10 -left-4 rounded-2xl bg-white/90 dark:bg-[#1a0433]/90 backdrop-blur-2xl border border-emerald-500/20 dark:border-emerald-500/30 p-5 shadow-2xl"
                >
                  <div className="flex items-center space-x-3 mb-3">
                    <div className="p-2 bg-emerald-100 dark:bg-emerald-500/20 rounded-lg text-emerald-600 dark:text-emerald-400">
                      <CpuChipIcon className="h-5 w-5" />
                    </div>
                    <span className="text-[10px] font-black uppercase tracking-widest text-slate-500 dark:text-white/70">RecycOp Live</span>
                  </div>
                  <div className="space-y-2">
                    <div className="h-1.5 w-32 rounded-full bg-slate-200 dark:bg-white/10 overflow-hidden">
                      <motion.div animate={{ width: ['20%', '85%', '20%'] }} transition={{ duration: 3, repeat: Infinity }} className="h-full bg-emerald-500" />
                    </div>
                    <div className="h-1.5 w-24 rounded-full bg-slate-200 dark:bg-white/10 overflow-hidden">
                      <motion.div animate={{ width: ['40%', '65%', '40%'] }} transition={{ duration: 4, repeat: Infinity }} className="h-full bg-purple-500" />
                    </div>
                  </div>
                </motion.div>

                {/* Logistics Feed */}
                <div className="rounded-[2rem] bg-white/80 dark:bg-white/5 backdrop-blur-md border border-slate-200 dark:border-white/10 p-6 space-y-4 shadow-xl">
                  <div className="flex justify-between items-center">
                    <div className="flex items-center gap-2">
                      <TruckIcon className="h-4 w-4 text-emerald-600 dark:text-emerald-400" />
                      <span className="text-[10px] font-bold uppercase tracking-widest text-slate-400 dark:text-white/60">Fleet Status</span>
                    </div>
                    <span className="text-[10px] font-bold text-emerald-600 dark:text-emerald-400">EN ROUTE</span>
                  </div>
                  <div className="flex items-end justify-between">
                    <div>
                      <p className="text-2xl font-serif italic text-slate-900 dark:text-white">Nairobi Hub</p>
                      <p className="text-[10px] text-slate-500 dark:text-white/40 font-medium">Baling Capacity: 84%</p>
                    </div>
                    <ChartBarIcon className="h-8 w-8 text-emerald-600 dark:text-emerald-500 opacity-50" />
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Decorative Orbitals - Hidden in light mode for a cleaner look or kept very subtle */}
            <div className="absolute -top-12 -right-12 h-64 w-64 border border-slate-200 dark:border-white/5 rounded-full animate-[spin_20s_linear_infinite]" />
            <div className="absolute top-1/2 -right-20 h-96 w-96 border border-emerald-500/10 dark:border-emerald-500/5 rounded-full animate-[spin_35s_linear_infinite]" />
          </div>

        </div>
      </div>
    </section>
  );
}