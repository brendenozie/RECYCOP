"use client";

import { motion } from "framer-motion";
import { 
  ArrowRightIcon, 
  CpuChipIcon, 
  TruckIcon, 
  ChevronRightIcon 
} from "@heroicons/react/24/outline";

export default function HeroSection() {
  return (
    <section className="relative min-h-screen w-full overflow-hidden bg-[#3b0764] text-white">
      {/* Background Decorative Element */}
      <div className="absolute inset-0 z-0 opacity-20">
        <div className="absolute -top-24 -left-24 h-96 w-96 rounded-full bg-purple-500 blur-[120px]" />
        <div className="absolute top-1/2 -right-24 h-96 w-96 rounded-full bg-emerald-500 blur-[120px]" />
      </div>

      <div className="container relative z-10 mx-auto px-6 pt-32 pb-20 lg:pt-48">
        <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-12">
          
          {/* Left Column: Copy & CTAs */}
          <div className="lg:col-span-7">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <span className="inline-flex items-center rounded-full bg-white/10 px-3 py-1 text-sm font-medium tracking-wide text-emerald-400 ring-1 ring-inset ring-white/20">
                Organizing Africa&apos;s Waste Economy
              </span>
              
              <h1 className="mt-8 font-serif text-5xl font-medium leading-tight md:text-7xl lg:leading-[1.1]">
                Bridging the Gap Between <br />
                <span className="text-emerald-400 italic">Waste</span> & <span className="text-purple-300">Wealth</span>
              </h1>

              <p className="mt-6 max-w-xl text-lg leading-relaxed text-purple-100/80">
                Recyc provides the physical infrastructure while RecycOp delivers the digital intelligence. 
                Together, we are formalizing the recycling sector through cooperative-led innovation.
              </p>

              <div className="mt-10 flex flex-col space-y-4 sm:flex-row sm:space-y-0 sm:space-x-6">
                <button className="group relative flex items-center justify-center rounded-xl bg-emerald-500 px-8 py-4 font-bold text-gray-900 transition-all hover:bg-emerald-400">
                  Join the Cooperative
                  <ArrowRightIcon className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
                </button>
                <button className="flex items-center justify-center rounded-xl border border-white/20 bg-white/5 px-8 py-4 font-bold backdrop-blur-sm transition-all hover:bg-white/10">
                  Explore RecycOp
                  <ChevronRightIcon className="ml-2 h-5 w-5 text-purple-300" />
                </button>
              </div>
            </motion.div>
          </div>

          {/* Right Column: Visual Concept */}
          <div className="relative lg:col-span-5">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="relative aspect-square rounded-3xl border border-white/10 bg-gradient-to-br from-white/10 to-transparent p-4 backdrop-blur-2xl"
            >
              {/* Abstract Visual Representing Recyc (Physical) and RecycOp (Digital) */}
              <div className="flex h-full w-full flex-col items-center justify-center space-y-8 rounded-2xl bg-gray-950/50">
                
                {/* Recyc Logic (Physical) */}
                <div className="flex w-full items-center justify-between px-8">
                  <div className="flex items-center space-x-4">
                    <div className="rounded-lg bg-purple-600/20 p-3 text-purple-400 ring-1 ring-purple-500/50">
                      <TruckIcon className="h-8 w-8" />
                    </div>
                    <div>
                      <p className="text-sm font-bold uppercase tracking-widest text-purple-300">Recyc</p>
                      <p className="text-xs text-purple-100/50">Physical Aggregation</p>
                    </div>
                  </div>
                  <div className="h-[1px] flex-grow bg-gradient-to-r from-purple-500/50 to-emerald-500/50 mx-4" />
                  <div className="text-right">
                    <p className="text-xl font-bold text-emerald-400">84%</p>
                    <p className="text-[10px] uppercase text-emerald-400/50 font-bold">Yield Rate</p>
                  </div>
                </div>

                {/* RecycOp Logic (Digital) */}
                <div className="w-full px-8">
                  <div className="rounded-xl bg-white/5 p-6 ring-1 ring-white/10">
                    <div className="flex items-center space-x-3 mb-4">
                      <CpuChipIcon className="h-5 w-5 text-emerald-400" />
                      <span className="text-sm font-semibold">RecycOp Intelligence</span>
                    </div>
                    <div className="space-y-3">
                      <div className="h-2 w-full rounded-full bg-white/5">
                        <motion.div 
                          initial={{ width: 0 }}
                          animate={{ width: "70%" }}
                          transition={{ duration: 2, delay: 1 }}
                          className="h-full rounded-full bg-emerald-500 shadow-[0_0_10px_#10b981]" 
                        />
                      </div>
                      <div className="h-2 w-full rounded-full bg-white/5">
                        <motion.div 
                          initial={{ width: 0 }}
                          animate={{ width: "45%" }}
                          transition={{ duration: 2, delay: 1.2 }}
                          className="h-full rounded-full bg-purple-500" 
                        />
                      </div>
                    </div>
                  </div>
                </div>

                <div className="absolute -bottom-6 -right-6 h-32 w-32 rounded-2xl bg-emerald-500/10 backdrop-blur-xl border border-emerald-500/20 flex items-center justify-center flex-col">
                   <p className="text-3xl font-bold text-emerald-400">12k</p>
                   <p className="text-[10px] uppercase font-bold text-white/60">Tons Baled</p>
                </div>
              </div>
            </motion.div>
          </div>

        </div>
      </div>
    </section>
  );
}