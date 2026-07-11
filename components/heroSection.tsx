"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  ArrowRightIcon, 
  CpuChipIcon, 
  TruckIcon, 
  ChevronRightIcon,
  ChevronLeftIcon,
  ChartBarIcon
} from "@heroicons/react/24/outline";
import Image from "next/image";

const SLIDES = [
  {
    id: 1,
    image: "https://images.unsplash.com/photo-1532996122724-e3c354a0b15b?auto=format&fit=crop&w=1920&q=80",
    alt: "Recycling pickup activity"
  },
  {
    id: 2,
    image: "https://images.unsplash.com/photo-1611284446314-60a58ac0deb9?auto=format&fit=crop&w=1920&q=80",
    alt: "Community environmental effort"
  },
  {
    id: 3,
    image: "https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?auto=format&fit=crop&w=1920&q=80",
    alt: "Green lush nature"
  }
];

export default function HeroSection() {
  const [currentSlide, setCurrentSlide] = useState(0);

  // Auto-play functionality
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev === SLIDES.length - 1 ? 0 : prev + 1));
    }, 6000);
    return () => clearInterval(timer);
  }, []);

  const nextSlide = () => setCurrentSlide((prev) => (prev === SLIDES.length - 1 ? 0 : prev + 1));
  const prevSlide = () => setCurrentSlide((prev) => (prev === 0 ? SLIDES.length - 1 : prev - 1));

  return (
    <section className="relative min-h-[100vh] w-full overflow-hidden bg-slate-900 flex items-center">
      
      {/* Background Image Slider */}
      <div className="absolute inset-0 z-0">
        <AnimatePresence initial={false}>
          <motion.div
            key={currentSlide}
            initial={{ opacity: 0, scale: 1.05 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.2, ease: "easeInOut" }}
            className="absolute inset-0"
          >
            <Image
              src={SLIDES[currentSlide].image}
              alt={SLIDES[currentSlide].alt}
              fill
              priority
              className="object-cover"
            />
          </motion.div>
        </AnimatePresence>

        {/* Gradient Overlays for readability */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#0a0118]/90 via-[#0a0118]/60 to-transparent z-10" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0a0118] via-transparent to-transparent z-10 opacity-80" />
        
        {/* Subtle Texture */}
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 mix-blend-overlay z-10 pointer-events-none" />
      </div>

      {/* Main Content */}
      <div className="container relative z-20 mx-auto px-4 sm:px-6 lg:px-8 pt-32 pb-24 h-full flex flex-col justify-center">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Column: The Narrative */}
          <div className="lg:col-span-7 text-left">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
            >
              <div className="inline-flex items-center rounded-full bg-emerald-500/20 backdrop-blur-md px-4 py-1.5 text-xs font-bold tracking-wider text-emerald-300 ring-1 ring-inset ring-emerald-500/30 uppercase mb-6">
                <span className="relative flex h-2 w-2 mr-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                </span>
                A Greener, Wealthier Africa
              </div>
              
              <h1 className="font-sans font-extrabold tracking-tight text-5xl sm:text-6xl xl:text-7xl leading-[1.1] text-white">
                Turning Everyday <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-emerald-200">Waste</span> into Community <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-purple-200">Wealth</span>
              </h1>

              <p className="mt-6 max-w-xl text-lg sm:text-xl leading-relaxed text-slate-300 font-light">
                Recyc connects local recycling centers with smart digital tools. We help neighborhood collectors earn more, work together seamlessly, and build a cleaner environment for everyone.
              </p>

              <div className="mt-10 flex flex-col sm:flex-row gap-4">
                <button className="group relative flex items-center justify-center rounded-xl bg-emerald-500 px-8 py-4 font-bold text-slate-900 transition-all hover:bg-emerald-400 hover:scale-[1.02] active:scale-95 shadow-[0_0_20px_rgba(16,185,129,0.3)] hover:shadow-[0_0_30px_rgba(16,185,129,0.5)]">
                  Join Your Local Center
                  <ArrowRightIcon className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
                </button>
                <button className="flex items-center justify-center rounded-xl border border-white/20 bg-white/10 px-8 py-4 font-bold text-white backdrop-blur-md transition-all hover:bg-white/20 hover:border-white/30">
                  See Our Tools
                  <ChevronRightIcon className="ml-2 h-5 w-5 text-purple-400" />
                </button>
              </div>
            </motion.div>
          </div>

          {/* Right Column: Glassmorphism Data Cards */}
          <div className="lg:col-span-5 relative w-full max-w-md mx-auto lg:ml-auto lg:mr-0 flex flex-col gap-6">
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 1, delay: 0.4 }}
              className="rounded-2xl bg-white/10 backdrop-blur-xl border border-white/10 p-6 shadow-2xl relative overflow-hidden"
            >
              <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-500/20 rounded-full blur-3xl -mr-10 -mt-10" />
              
              <div className="relative z-10 flex items-center space-x-4 mb-6">
                <div className="p-3 bg-emerald-500/20 rounded-xl text-emerald-300">
                  <CpuChipIcon className="h-6 w-6" />
                </div>
                <div>
                  <span className="block text-xs font-bold uppercase tracking-wider text-emerald-400">System Status</span>
                  <span className="block text-lg font-bold text-white">Recyc App Live</span>
                </div>
              </div>
              
              <div className="space-y-4 relative z-10">
                <div>
                  <div className="flex justify-between text-xs text-slate-300 mb-1.5 font-medium">
                    <span>Network Efficiency</span>
                    <span>92%</span>
                  </div>
                  <div className="h-2 w-full rounded-full bg-white/10 overflow-hidden">
                    <motion.div animate={{ width: ['40%', '92%', '85%'] }} transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }} className="h-full bg-emerald-400 rounded-full" />
                  </div>
                </div>
                <div>
                  <div className="flex justify-between text-xs text-slate-300 mb-1.5 font-medium">
                    <span>Processing Load</span>
                    <span>68%</span>
                  </div>
                  <div className="h-2 w-full rounded-full bg-white/10 overflow-hidden">
                    <motion.div animate={{ width: ['60%', '68%', '60%'] }} transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }} className="h-full bg-purple-400 rounded-full" />
                  </div>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 1, delay: 0.6 }}
              className="rounded-2xl bg-white/5 backdrop-blur-md border border-white/10 p-5 shadow-xl"
            >
              <div className="flex justify-between items-center mb-4">
                <div className="flex items-center gap-2">
                  <div className="p-2 bg-purple-500/20 rounded-lg">
                    <TruckIcon className="h-4 w-4 text-purple-300" />
                  </div>
                  <span className="text-xs font-bold uppercase tracking-wider text-slate-300">Active Logistics</span>
                </div>
                <span className="px-2 py-1 rounded bg-emerald-500/20 text-[10px] font-extrabold tracking-wide text-emerald-300 border border-emerald-500/20">
                  EN ROUTE
                </span>
              </div>
              <div className="flex items-end justify-between">
                <div>
                  <p className="text-xl font-bold tracking-tight text-white">Nairobi Hub #4</p>
                  <p className="text-sm text-slate-400 mt-1">Collection Progress: 84%</p>
                </div>
                <ChartBarIcon className="h-8 w-8 text-white/20" />
              </div>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Slider Controls */}
      <div className="absolute bottom-8 left-0 right-0 z-30 flex justify-between items-center container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex gap-2">
          {SLIDES.map((_, idx) => (
            <button
              key={idx}
              onClick={() => setCurrentSlide(idx)}
              className={`h-1.5 rounded-full transition-all duration-300 ${
                currentSlide === idx ? "w-8 bg-emerald-400" : "w-2 bg-white/30 hover:bg-white/50"
              }`}
              aria-label={`Go to slide ${idx + 1}`}
            />
          ))}
        </div>
        
        <div className="flex gap-3">
          <button 
            onClick={prevSlide}
            className="p-3 rounded-full border border-white/10 bg-white/5 backdrop-blur-md text-white hover:bg-white/20 transition-colors"
          >
            <ChevronLeftIcon className="h-5 w-5" />
          </button>
          <button 
            onClick={nextSlide}
            className="p-3 rounded-full border border-white/10 bg-white/5 backdrop-blur-md text-white hover:bg-white/20 transition-colors"
          >
            <ChevronRightIcon className="h-5 w-5" />
          </button>
        </div>
      </div>

    </section>
  );
}