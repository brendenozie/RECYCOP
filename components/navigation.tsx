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
  Squares2X2Icon,
  UserIcon,
  ArrowRightOnRectangleIcon,
  ArrowRightIcon
} from "@heroicons/react/24/outline";
import { cn } from "@/lib/utils";
import { useAuth } from "./auth-context";

const NAV_LINKS = [
  { name: "The Model", href: "#insight", icon: CircleStackIcon },
  { name: "Materials", href: "#materials", icon: Squares2X2Icon },
  { name: "RecycWorks", href: "#RecycWorks", icon: BoltIcon },
  { name: "Impact", href: "#impact", icon: GlobeAltIcon },
];

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { user, loading: authLoading, logout } = useAuth();

  const navigate = (url: string) => {
    setMobileMenuOpen(false);
    window.location.href = url;
  }

  // Helper to determine the correct dashboard based on RecycOp Role
  const getDashboardUrl = () => {
    if (!user) return "/login";
    switch (user.role) {
      case "admin": return "/admin/stats";
      case "driver": return "/mobile/transit";
      case "operations": return "/ops/verification";
      case "supplier": return "/coop/ledger";
      default: return "/dashboard";
    }
  };

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
        isScrolled ? "py-3" : "py-6"
      )}
    >
      <div className={cn(
        "container mx-auto max-w-7xl rounded-[2rem] transition-all duration-500 flex items-center justify-between px-6 py-2.5",
        isScrolled 
          ? "bg-white/70 dark:bg-[#1a0433]/80 backdrop-blur-2xl border border-slate-200 dark:border-white/10 shadow-xl dark:shadow-black/40" 
          : "bg-transparent border border-transparent"
      )}>
        
        {/* --- LOGO --- */}
        <div onClick={() => navigate("/")} className="flex items-center gap-3 cursor-pointer group">
          <div className="p-2 rounded-xl bg-emerald-600 dark:bg-emerald-500 text-white dark:text-black group-hover:scale-110 group-hover:rotate-6 transition-all duration-300 shadow-lg shadow-emerald-500/20">
            <CpuChipIcon className="w-5 h-5" />
          </div>
          <span className="text-xl font-black tracking-tighter text-slate-900 dark:text-white uppercase italic font-serif">
            RECYC<span className="text-emerald-600 dark:text-emerald-400 not-italic font-sans">WORKS</span>
          </span>
        </div>

        {/* --- DESKTOP NAVIGATION --- */}
        <div className="hidden lg:flex items-center gap-8">
          {NAV_LINKS.map((link) => (
            <a
              key={link.name}
              href={link.href}
              className="group relative flex items-center gap-1 text-[11px] font-black uppercase tracking-[0.15em] text-slate-500 dark:text-purple-100/60 hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors"
            >
              {link.name}
              <span className="absolute -bottom-1 left-1/2 w-0 h-[2px] bg-emerald-500 transition-all duration-300 group-hover:w-full group-hover:left-0" />
            </a>
          ))}
        </div>

        {/* --- DYNAMIC ACTION BUTTONS --- */}
        <div className="hidden lg:flex items-center gap-3">
          {authLoading ? (
            <div className="h-10 w-24 animate-pulse bg-slate-200 dark:bg-white/10 rounded-2xl" />
          ) : user ? (
            <>
              <button
                onClick={() => navigate(getDashboardUrl())}
                className="flex items-center gap-2 text-[11px] font-black uppercase tracking-widest text-slate-600 dark:text-purple-100/80 px-4 py-2 hover:text-emerald-600 dark:hover:text-white transition-all">
                <UserIcon className="w-4 h-4" />
                {user.firstName}&apos;s Portal
              </button>
              <button 
                onClick={logout}
                className="bg-slate-100 dark:bg-white/5 text-slate-600 dark:text-red-400 p-3 rounded-2xl hover:bg-red-50 dark:hover:bg-red-500/10 transition-all">
                <ArrowRightOnRectangleIcon className="w-4 h-4" />
              </button>
            </>
          ) : (
            <>
              <button
                onClick={() => navigate("/login")}
                className="flex items-center gap-2 text-[11px] font-black uppercase tracking-widest text-slate-600 dark:text-purple-100/80 px-4 py-2 hover:text-emerald-600 dark:hover:text-white transition-all">
                Sign In
              </button>
              <button 
                onClick={() => navigate("/register")}
                className="bg-slate-900 dark:bg-emerald-500 text-white dark:text-black px-7 py-3 rounded-2xl font-bold text-[11px] uppercase tracking-widest hover:scale-[1.03] active:scale-95 transition-all shadow-lg dark:shadow-emerald-500/20 flex items-center gap-2">
                Join the Model
                <ArrowRightIcon className="w-3 h-3" />
              </button>
            </>
          )}
        </div>

        {/* --- MOBILE TOGGLE --- */}
        <button 
          className="lg:hidden p-2.5 text-slate-900 dark:text-emerald-400 bg-slate-100 dark:bg-white/5 rounded-xl transition-all"
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
              className="fixed inset-0 bg-slate-900/40 dark:bg-black/80 backdrop-blur-md z-[110] lg:hidden"
            />
            
            <motion.div 
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="fixed top-0 right-0 bottom-0 w-[85%] max-w-[380px] bg-white dark:bg-[#0a0118] border-l border-slate-200 dark:border-white/10 z-[120] shadow-2xl p-8 lg:hidden"
            >
              <div className="flex flex-col h-full">
                <div className="flex items-center justify-between mb-12">
                  <span className="font-serif italic text-2xl dark:text-emerald-400">RecycOp</span>
                  <button 
                    onClick={() => setMobileMenuOpen(false)}
                    className="p-3 bg-slate-100 dark:bg-white/5 rounded-2xl text-slate-900 dark:text-purple-200"
                  >
                    <XMarkIcon className="w-6 h-6" />
                  </button>
                </div>

                <div className="space-y-3 flex-grow">
                  {NAV_LINKS.map((link, i) => (
                    <motion.a
                      key={link.name}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: i * 0.05 }}
                      href={link.href}
                      className="flex items-center justify-between p-5 rounded-2xl bg-slate-50 dark:bg-white/5 border border-slate-100 dark:border-white/5 text-slate-900 dark:text-purple-100 font-bold hover:bg-emerald-500 hover:text-white dark:hover:text-black transition-all group"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      <div className="flex items-center gap-4">
                        <link.icon className="w-5 h-5 text-emerald-600 dark:text-emerald-400 group-hover:text-inherit" />
                        <span className="uppercase tracking-[0.2em] text-xs">{link.name}</span>
                      </div>
                      <ChevronDownIcon className="w-4 h-4 -rotate-90 opacity-40" />
                    </motion.a>
                  ))}
                </div>

                <div className="space-y-4 pt-8 border-t border-slate-200 dark:border-white/10">
                   {user ? (
                     <>
                        <button
                          onClick={() => navigate(getDashboardUrl())} 
                          className="w-full h-14 rounded-2xl bg-emerald-600 dark:bg-emerald-500 text-white dark:text-black font-black uppercase tracking-widest text-[10px] shadow-lg shadow-emerald-500/20">
                          My Portal
                        </button>
                        <button 
                          onClick={logout}
                          className="w-full py-4 text-center text-red-500 font-bold text-[10px] uppercase tracking-widest">
                          Logout Account
                        </button>
                     </>
                   ) : (
                     <>
                        <button
                          onClick={() => navigate("/login")}  
                          className="w-full h-14 rounded-2xl border border-slate-200 dark:border-white/20 text-slate-900 dark:text-white font-black uppercase tracking-widest text-[10px]">
                          Sign In
                        </button>
                        <button 
                          onClick={() => navigate("/register")}
                          className="w-full h-14 rounded-2xl bg-emerald-600 dark:bg-emerald-500 text-white dark:text-black font-black uppercase tracking-widest text-[10px] shadow-lg shadow-emerald-500/20">
                          Join the Model
                        </button>
                     </>
                   )}
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </nav>
  );
}