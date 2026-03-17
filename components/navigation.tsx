"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  CpuChipIcon, 
  Bars3Icon, 
  XMarkIcon, 
  ChevronDownIcon, 
  CircleStackIcon, 
  BoltIcon, 
  GlobeAltIcon, 
  Squares2X2Icon 
} from "@heroicons/react/24/outline";
import { cn } from "@/lib/utils";

const NAV_LINKS = [
  { name: "The Model", href: "#insight", icon: CircleStackIcon },
  { name: "Materials", href: "#materials", icon: Squares2X2Icon },
  { name: "RecycOp", href: "#recycop", icon: BoltIcon },
  { name: "Impact", href: "#impact", icon: GlobeAltIcon },
];

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav 
      className={cn(
        "fixed top-0 left-0 right-0 z-[100] transition-all duration-500 px-6",
        isScrolled ? "py-4" : "py-8"
      )}
    >
      <div className={cn(
        "container mx-auto max-w-7xl rounded-2xl transition-all duration-500 flex items-center justify-between px-6 py-3",
        isScrolled 
          ? "bg-[#3b0764]/80 backdrop-blur-xl border border-white/10 shadow-2xl shadow-black/20" 
          : "bg-transparent border border-transparent"
      )}>
        
        {/* --- LOGO --- */}
        <div className="flex items-center gap-3 cursor-pointer group">
          <div className="p-2 rounded-lg bg-emerald-500 text-black group-hover:scale-110 group-hover:rotate-3 transition-all duration-300 shadow-[0_0_15px_rgba(16,185,129,0.4)]">
            <CpuChipIcon className="w-5 h-5" />
          </div>
          <span className="text-xl font-bold tracking-tight text-white uppercase">
            RECYC<span className="text-emerald-400">OP</span>
          </span>
        </div>

        {/* --- DESKTOP NAVIGATION --- */}
        <div className="hidden lg:flex items-center gap-10">
          {NAV_LINKS.map((link) => (
            <a
              key={link.name}
              href={link.href}
              className="group relative flex items-center gap-1.5 text-xs font-bold uppercase tracking-widest text-purple-100/70 hover:text-emerald-400 transition-colors"
            >
              {link.name}
              <ChevronDownIcon className="w-3 h-3 opacity-0 -translate-y-1 group-hover:opacity-100 group-hover:translate-y-0 transition-all" />
              {/* Animated underline */}
              <span className="absolute -bottom-1 left-0 w-0 h-px bg-emerald-400 transition-all group-hover:w-full" />
            </a>
          ))}
        </div>

        {/* --- ACTION BUTTONS --- */}
        <div className="hidden lg:flex items-center gap-4">
          <button className="text-xs font-bold uppercase tracking-widest text-purple-100/80 px-4 py-2 hover:text-white transition-all">
            Login
          </button>
          <button className="bg-emerald-500 text-black px-6 py-2.5 rounded-xl font-bold text-xs uppercase tracking-widest hover:bg-emerald-400 shadow-[0_0_20px_rgba(16,185,129,0.2)] hover:shadow-emerald-500/40 transition-all active:scale-95">
            Partner Portal
          </button>
        </div>

        {/* --- MOBILE TOGGLE --- */}
        <button 
          className="lg:hidden p-2 text-emerald-400 hover:bg-white/5 rounded-xl transition-all"
          onClick={() => setMobileMenuOpen(true)}
        >
          <Bars3Icon className="w-6 h-6" />
        </button>
      </div>

      {/* --- MOBILE OVERLAY MENU --- */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <>
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setMobileMenuOpen(false)}
              className="fixed inset-0 bg-black/60 backdrop-blur-md z-[110] lg:hidden"
            />
            
            <motion.div 
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 30, stiffness: 250 }}
              className="fixed top-0 right-0 bottom-0 w-[85%] max-w-[400px] bg-[#1a0433] border-l border-white/10 z-[120] shadow-2xl p-8 lg:hidden"
            >
              <div className="flex flex-col h-full">
                <div className="flex items-center justify-between mb-12">
                  <span className="font-bold text-lg tracking-widest uppercase text-emerald-400">Navigation</span>
                  <button 
                    onClick={() => setMobileMenuOpen(false)}
                    className="p-2 bg-white/5 rounded-full text-purple-200"
                  >
                    <XMarkIcon className="w-6 h-6" />
                  </button>
                </div>

                <div className="space-y-4 flex-grow">
                  {NAV_LINKS.map((link, i) => (
                    <motion.a
                      key={link.name}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.1 }}
                      href={link.href}
                      className="flex items-center gap-4 p-5 rounded-2xl bg-white/5 border border-white/5 text-purple-100 font-bold hover:bg-emerald-500 hover:text-black transition-all group"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      <link.icon className="w-6 h-6 text-emerald-500 group-hover:text-black" />
                      <span className="uppercase tracking-widest text-sm">{link.name}</span>
                    </motion.a>
                  ))}
                </div>

                <div className="space-y-4 pt-8 border-t border-white/10">
                   <button className="w-full h-14 rounded-2xl border border-white/20 text-white font-bold uppercase tracking-widest text-xs">
                     Aggregator Login
                   </button>
                   <button className="w-full h-14 rounded-2xl bg-emerald-500 text-black font-bold uppercase tracking-widest text-xs shadow-lg shadow-emerald-500/20">
                     Join Cooperative
                   </button>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </nav>
  );
}