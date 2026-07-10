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

export default function HeroSection() {
  return (
    <section className="relative min-h-[100vh] sm:min-h-[95vh] w-full overflow-hidden bg-gradient-to-b from-slate-50 to-emerald-50/30 transition-colors duration-500 dark:bg-[#0a0118] text-slate-900 dark:text-white flex items-center">
      
      {/* Dynamic Background Elements */}
      <div className="absolute inset-0 z-0">
        <div className="absolute top-[-10%] left-[-10%] h-[300px] w-[300px] sm:h-[500px] sm:w-[500px] rounded-full bg-emerald-500/10 dark:bg-emerald-500/10 blur-[80px] sm:blur-[120px] animate-pulse" />
        <div className="absolute bottom-[-10%] right-[-10%] h-[400px] w-[400px] sm:h-[600px] sm:w-[600px] rounded-full bg-purple-200/40 dark:bg-[#3b0764]/20 blur-[100px] sm:blur-[150px]" />
        
        {/* Subtle Texture Overlay */}
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-5 dark:opacity-20 brightness-100 dark:brightness-50 contrast-150 pointer-events-none" />
        
        {/* Dark Mode Grid Overlay */}
        <div className="absolute inset-0 hidden dark:block bg-[linear-gradient(to_right,#ffffff05_1px,transparent_1px),linear-gradient(to_bottom,#ffffff05_1px,transparent_1px)] bg-[size:40px_40px]" />
      </div>

      <div className="container relative z-10 mx-auto px-4 sm:px-6 lg:px-8 pt-28 pb-16 lg:pt-36 lg:pb-24">
        <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-12 md:gap-16">
          
          {/* Left Column: The Narrative */}
          <div className="lg:col-span-7 text-center lg:text-left">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
            >
              <span className="inline-flex items-center rounded-full bg-emerald-600/10 dark:bg-white/10 px-4 py-1.5 text-xs font-bold tracking-wider text-emerald-700 dark:text-emerald-400 ring-1 ring-inset ring-emerald-600/20 dark:ring-white/20 uppercase">
                A Greener, Wealthier Africa
              </span>
              
              <h1 className="mt-6 font-sans font-extrabold tracking-tight text-4xl sm:text-6xl xl:text-7xl leading-[1.15] text-slate-900 dark:text-white">
                Turning Everyday <br />
                <span className="text-emerald-600 dark:text-emerald-400">Waste</span> into Community <span className="text-purple-600 dark:text-purple-400">Wealth</span>
              </h1>

              <p className="mt-6 max-w-xl mx-auto lg:mx-0 text-base sm:text-lg lg:text-xl leading-relaxed text-slate-600 dark:text-purple-100/80 font-normal">
                Recyc connects local recycling centers with smart digital tools. We help neighborhood collectors earn more, work together seamlessly, and build a cleaner environment for everyone.
              </p>

              <div className="mt-8 flex flex-col space-y-4 sm:flex-row sm:space-y-0 sm:space-x-4 justify-center lg:justify-start">
                <button className="group relative flex items-center justify-center rounded-xl bg-emerald-600 dark:bg-emerald-500 px-6 py-4 font-bold text-white dark:text-gray-900 transition-all hover:bg-emerald-700 dark:hover:bg-emerald-400 hover:scale-[1.02] active:scale-95 shadow-md hover:shadow-lg shadow-emerald-600/20 dark:shadow-emerald-500/20">
                  Join Your Local Center
                  <ArrowRightIcon className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
                </button>
                <button className="flex items-center justify-center rounded-xl border border-slate-300 dark:border-white/10 bg-white/80 dark:bg-white/5 px-6 py-4 font-bold backdrop-blur-md transition-all hover:bg-slate-100 dark:hover:bg-white/10 text-slate-700 dark:text-white shadow-sm">
                  See Our Tools
                  <ChevronRightIcon className="ml-2 h-5 w-5 text-purple-600 dark:text-purple-400" />
                </button>
              </div>
            </motion.div>
          </div>

          {/* Right Column: Visual Showcase */}
          <div className="relative lg:col-span-5 w-full max-w-md mx-auto lg:max-w-none">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1, delay: 0.2 }}
              className="relative aspect-[4/5] rounded-[2.5rem] border border-slate-200 dark:border-white/10 bg-white/40 dark:bg-gradient-to-b dark:from-white/5 dark:to-transparent p-3 shadow-xl overflow-hidden backdrop-blur-sm"
            >
              {/* Image Layer */}
              <div className="absolute inset-0 z-0">
                <Image
                  src="https://images.unsplash.com/photo-1532996122724-e3c354a0b15b?auto=format&fit=crop&w=800&q=80" 
                  alt="Recycling Pickup Activity" 
                  className="h-full w-full object-cover opacity-90 dark:opacity-60 transition-all duration-1000"
                  fill
                  priority
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-50 dark:from-[#0a0118] via-transparent to-transparent" />
              </div>

              {/* Data Overlay */}
              <div className="relative z-10 h-full w-full flex flex-col justify-end p-4 sm:p-6 space-y-4">
                
                {/* Floating Intelligence Card */}
                <motion.div 
                  animate={{ y: [0, -10, 0] }}
                  transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
                  className="absolute top-6 left-4 sm:-left-4 rounded-xl bg-white/95 dark:bg-[#1a0433]/90 backdrop-blur-xl border border-emerald-500/20 dark:border-emerald-500/30 p-4 shadow-xl"
                >
                  <div className="flex items-center space-x-3 mb-2">
                    <div className="p-1.5 bg-emerald-100 dark:bg-emerald-500/20 rounded-lg text-emerald-600 dark:text-emerald-400">
                      <CpuChipIcon className="h-4 w-4" />
                    </div>
                    <span className="text-[10px] font-bold uppercase tracking-wider text-slate-600 dark:text-white/80">Recyc App Live</span>
                  </div>
                  <div className="space-y-1.5">
                    <div className="h-1.5 w-24 rounded-full bg-slate-200 dark:bg-white/10 overflow-hidden">
                      <motion.div animate={{ width: ['20%', '90%', '20%'] }} transition={{ duration: 4, repeat: Infinity }} className="h-full bg-emerald-500" />
                    </div>
                    <div className="h-1.5 w-20 rounded-full bg-slate-200 dark:bg-white/10 overflow-hidden">
                      <motion.div animate={{ width: ['40%', '70%', '40%'] }} transition={{ duration: 5, repeat: Infinity }} className="h-full bg-purple-500" />
                    </div>
                  </div>
                </motion.div>

                {/* Logistics Feed */}
                <div className="rounded-2xl bg-white/90 dark:bg-white/5 backdrop-blur-md border border-slate-200 dark:border-white/10 p-4 sm:p-5 space-y-3 shadow-lg">
                  <div className="flex justify-between items-center">
                    <div className="flex items-center gap-1.5">
                      <TruckIcon className="h-4 w-4 text-emerald-600 dark:text-emerald-400" />
                      <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500 dark:text-white/60">Collection Van</span>
                    </div>
                    <span className="text-[10px] font-extrabold tracking-wide text-emerald-600 dark:text-emerald-400">ON THE WAY</span>
                  </div>
                  <div className="flex items-end justify-between">
                    <div>
                      <p className="text-lg sm:text-xl font-bold tracking-tight text-slate-900 dark:text-white">Nairobi Hub</p>
                      <p className="text-[10px] text-slate-500 dark:text-white/50 font-semibold">Today&apos;s Progress: 84%</p>
                    </div>
                    <ChartBarIcon className="h-7 w-7 text-emerald-600 dark:text-emerald-400 opacity-70" />
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Decorative Orbitals */}
            <div className="absolute -top-6 -right-6 h-48 w-48 border border-slate-300/30 dark:border-white/5 rounded-full animate-[spin_25s_linear_infinite] pointer-events-none" />
            <div className="absolute top-1/2 -right-12 h-72 w-72 border border-emerald-500/10 dark:border-emerald-500/5 rounded-full animate-[spin_40s_linear_infinite] pointer-events-none" />
          </div>

        </div>
      </div>
    </section>
  );
}