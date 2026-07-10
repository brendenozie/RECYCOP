"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  CpuChipIcon, 
  Bars3Icon, 
  XMarkIcon, 
  ChevronRightIcon, 
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
  { name: "How It Works", href: "#insight", icon: CircleStackIcon },
  { name: "Materials Handled", href: "#materials", icon: Squares2X2Icon },
  { name: "Our Programs", href: "#RecycWorks", icon: BoltIcon },
  { name: "Our Impact", href: "#impact", icon: GlobeAltIcon },
];

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { user, loading: authLoading, logout } = useAuth();

  const navigate = (url: string) => {
    setMobileMenuOpen(false);
    window.location.href = url;
  };

  const getDashboardUrl = () => {
    if (!user) return "/login";
    switch (user.role) {
      case "admin": return "/admindashboard";
      case "driver": return "/driverdashboard";
      case "operations": return "/operationsdashboard";
      case "supplier": return "/supplierdashboard";
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
        "fixed top-0 left-0 right-0 z-[100] transition-all duration-300 px-4 sm:px-6",
        isScrolled ? "py-3" : "py-4 sm:py-6"
      )}
    >
      <div className={cn(
        "container mx-auto max-w-7xl rounded-2xl sm:rounded-[2rem] transition-all duration-300 flex items-center justify-between px-4 sm:px-8 py-3",
        isScrolled 
          ? "bg-white/80 dark:bg-[#1a0433]/80 backdrop-blur-xl border border-slate-200/80 dark:border-white/10 shadow-lg dark:shadow-black/40" 
          : "bg-transparent border border-transparent"
      )}>
        
        {/* BRAND LOGO */}
        <div onClick={() => navigate("/")} className="flex items-center gap-2.5 cursor-pointer group">
          <div className="p-2 rounded-xl bg-emerald-600 dark:bg-emerald-500 text-white dark:text-slate-950 group-hover:scale-105 transition-transform duration-200 shadow-sm">
            <CpuChipIcon className="w-5 h-5 stroke-[2px]" />
          </div>
          <span className="text-lg sm:text-xl font-black tracking-tight text-slate-900 dark:text-white uppercase font-sans">
            Recyc<span className="text-emerald-600 dark:text-emerald-400">Works</span>
          </span>
        </div>

        {/* DESKTOP LINKS */}
        <div className="hidden lg:flex items-center gap-8">
          {NAV_LINKS.map((link) => (
            <a
              key={link.name}
              href={link.href}
              className="group relative py-1 text-sm font-semibold text-slate-600 dark:text-purple-100/70 hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors duration-200"
            >
              {link.name}
              <span className="absolute bottom-0 left-0 w-0 h-[2px] bg-emerald-500 dark:bg-emerald-400 transition-all duration-200 group-hover:w-full" />
            </a>
          ))}
        </div>

        {/* AUTHENTICATION ACTION BUTTONS */}
        <div className="hidden lg:flex items-center gap-2">
          {authLoading ? (
            <div className="h-10 w-24 animate-pulse bg-slate-200 dark:bg-white/10 rounded-xl" />
          ) : user ? (
            <>
              <button
                onClick={() => navigate(getDashboardUrl())}
                className="flex items-center gap-2 text-sm font-bold text-slate-700 dark:text-purple-100/90 px-4 py-2 hover:text-emerald-600 dark:hover:text-white transition-colors"
              >
                <UserIcon className="w-4 h-4 stroke-[2px]" />
                <span>Dashboard</span>
              </button>
              <button 
                onClick={logout}
                title="Log Out"
                className="bg-slate-100 dark:bg-white/5 text-slate-500 dark:text-red-400 p-2.5 rounded-xl hover:bg-red-50 dark:hover:bg-red-500/10 transition-colors"
              >
                <ArrowRightOnRectangleIcon className="w-4 h-4 stroke-[2px]" />
              </button>
            </>
          ) : (
            <>
              <button
                onClick={() => navigate("/login")}
                className="text-sm font-bold text-slate-700 dark:text-purple-100/90 px-4 py-2 hover:text-emerald-600 dark:hover:text-white transition-colors"
              >
                Sign In
              </button>
              <button 
                onClick={() => navigate("/register")}
                className="bg-slate-900 dark:bg-emerald-500 text-white dark:text-slate-950 px-5 py-2.5 rounded-xl font-bold text-sm hover:bg-emerald-600 dark:hover:bg-emerald-400 hover:scale-[1.01] active:scale-95 transition-all flex items-center gap-1.5 shadow-sm"
              >
                <span>Get Started</span>
                <ArrowRightIcon className="w-3.5 h-3.5 stroke-[2.5px]" />
              </button>
            </>
          )}
        </div>

        {/* MOBILE MENU TOGGLE */}
        <button 
          className="lg:hidden p-2 text-slate-700 dark:text-emerald-400 bg-slate-100 dark:bg-white/5 rounded-xl transition-colors"
          onClick={() => setMobileMenuOpen(true)}
        >
          <Bars3Icon className="w-6 h-6 stroke-[2px]" />
        </button>
      </div>

      {/* MOBILE DRAWER */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <>
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setMobileMenuOpen(false)}
              className="fixed inset-0 bg-slate-900/40 dark:bg-black/60 backdrop-blur-sm z-[110]"
            />
            
            <motion.div 
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 28, stiffness: 220 }}
              className="fixed top-0 right-0 bottom-0 w-[85%] max-w-[360px] bg-white dark:bg-[#0c0517] border-l border-slate-200 dark:border-white/10 z-[120] shadow-2xl p-6 flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-8">
                  <span className="font-sans font-black text-xl text-slate-900 dark:text-white uppercase tracking-tight">
                    Recyc<span className="text-emerald-600 dark:text-emerald-400">Works</span>
                  </span>
                  <button 
                    onClick={() => setMobileMenuOpen(false)}
                    className="p-2 bg-slate-100 dark:bg-white/5 rounded-xl text-slate-700 dark:text-purple-200"
                  >
                    <XMarkIcon className="w-6 h-6 stroke-[2px]" />
                  </button>
                </div>

                <div className="space-y-2">
                  {NAV_LINKS.map((link) => (
                    <a
                      key={link.name}
                      href={link.href}
                      className="flex items-center justify-between p-4 rounded-xl bg-slate-50 dark:bg-white/[0.02] border border-slate-100 dark:border-white/5 text-slate-700 dark:text-purple-100 font-semibold text-sm hover:bg-emerald-500 hover:text-white dark:hover:text-slate-950 transition-all group"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      <div className="flex items-center gap-3.5">
                        <link.icon className="w-5 h-5 text-emerald-600 dark:text-emerald-400 group-hover:text-inherit stroke-[2px]" />
                        <span>{link.name}</span>
                      </div>
                      <ChevronRightIcon className="w-4 h-4 opacity-40 group-hover:opacity-100 stroke-[2px]" />
                    </a>
                  ))}
                </div>
              </div>

              <div className="pt-6 border-t border-slate-200 dark:border-white/10 space-y-3">
                {user ? (
                  <>
                    <button
                      onClick={() => navigate(getDashboardUrl())} 
                      className="w-full py-3.5 rounded-xl bg-emerald-600 dark:bg-emerald-500 text-white dark:text-slate-950 font-bold text-sm shadow-sm"
                    >
                      RecycWorks Portal
                    </button>
                    <button 
                      onClick={logout}
                      className="w-full py-2.5 text-center text-red-500 dark:text-red-400 font-semibold text-sm"
                    >
                      Log Out Account
                    </button>
                  </>
                ) : (
                  <>
                    <button
                      onClick={() => navigate("/login")}  
                      className="w-full py-3.5 rounded-xl border border-slate-200 dark:border-white/20 text-slate-800 dark:text-white font-bold text-sm"
                    >
                      Sign In
                    </button>
                    <button 
                      onClick={() => navigate("/register")}
                      className="w-full py-3.5 rounded-xl bg-emerald-600 dark:bg-emerald-500 text-white dark:text-slate-950 font-bold text-sm shadow-sm"
                    >
                      Get Started
                    </button>
                  </>
                )}
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </nav>
  );
}