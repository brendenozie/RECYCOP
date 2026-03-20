"use client";

import { cn } from "@/lib/utils";
import { ArchiveBoxIcon, ExclamationTriangleIcon } from "@heroicons/react/24/outline";
import { AnimatePresence, motion } from "framer-motion";
import { QrCodeIcon, ChevronRightIcon, MapPinIcon, CameraIcon, ShieldCheckIcon, TicketIcon } from "lucide-react";
import { useState, useEffect } from "react";

const menuItems = [
  { id: "load", name: "Active Load", icon: TicketIcon },
  { id: "pass", name: "Transit Pass", icon: ShieldCheckIcon },
  { id: "route", name: "Route Map", icon: MapPinIcon },
  { id: "history", name: "History", icon: ArchiveBoxIcon },
];

export default function DriverMobileDashboard() {
  const [activeTab, setActiveTab] = useState("pass");
  const [loadData, setLoadData] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  // 1. Fetch Assigned Load
  useEffect(() => {
    async function fetchLoad() {
      // In production, driverId comes from Auth/Session
      const res = await fetch("/api/driver/active-load?driverId=D-01");
      const data = await res.json();
      setLoadData(data);
      setLoading(false);
    }
    fetchLoad();
  }, []);

  const handleStatusUpdate = async (newStatus: string) => {
    await fetch("/api/driver/verify-arrival", {
      method: "POST",
      body: JSON.stringify({ 
        requestId: loadData._id, 
        status: newStatus,
        timestamp: new Date()
      }),
    });
    // Refresh local state to show updated UI
  };

  if (loading) return (
    <div className="min-h-screen bg-[#05010d] flex items-center justify-center">
      <div className="h-12 w-12 border-t-2 border-emerald-500 rounded-full animate-spin" />
    </div>
  );

  return (
    <div className="min-h-screen bg-[#05010d] text-white font-sans selection:bg-emerald-500/30 overflow-x-hidden">
      
      {/* --- STATUS BAR --- */}
      <div className="px-8 pt-6 pb-2 flex justify-between items-center bg-[#05010d]/80 backdrop-blur-md sticky top-0 z-50">
        <div className="flex items-center gap-2">
          <div className={cn("h-2 w-2 rounded-full animate-pulse", loadData ? "bg-emerald-500" : "bg-amber-500")} />
          <span className="text-[10px] font-black uppercase tracking-[0.2em]">
            {loadData ? "On Mission" : "Awaiting Dispatch"}
          </span>
        </div>
        <span className="text-[10px] font-black text-white/40 italic">NBO NODE: 4.2</span>
      </div>

      <main className="p-6 pb-32 space-y-8">
        <AnimatePresence mode="wait">
          
          {/* --- TRANSIT PASS VIEW --- */}
          {activeTab === "pass" && (
            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
              <div className="p-10 rounded-[3.5rem] bg-gradient-to-br from-emerald-600 to-teal-800 shadow-2xl relative overflow-hidden">
                <div className="relative z-10 flex flex-col items-center">
                  <div className="p-4 bg-white rounded-3xl mb-8">
                    {/* QR encodes the Batch IDs for Police/Admin verification */}
                    <QrCodeIcon className="w-32 h-32 text-slate-900" />
                  </div>
                  <h3 className="text-4xl font-black italic mb-2">{loadData?.vehicle || "NO VEHICLE"}</h3>
                  <p className="text-[10px] font-black uppercase tracking-[0.4em] text-white/40 mb-8">Official Transit Authority</p>
                  
                  <div className="w-full grid grid-cols-2 gap-8 border-t border-white/10 pt-8">
                    <div>
                      <p className="text-[8px] font-black text-white/40 uppercase mb-1">Carrier</p>
                      <p className="text-sm font-bold">J. KAMAU</p>
                    </div>
                    <div>
                      <p className="text-[8px] font-black text-white/40 uppercase mb-1">Payload</p>
                      <p className="text-sm font-bold">{(loadData?.totalWeight / 1000).toFixed(1)}T RECYCLABLES</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* ROUTE INFO */}
              <div className="p-8 rounded-[2.5rem] bg-white/5 border border-white/10 flex items-center justify-between">
                <div>
                  <p className="text-[9px] font-black text-white/30 uppercase tracking-widest">Origin</p>
                  <p className="text-lg font-bold italic">{loadData?.supplierName || "Calculating..."}</p>
                </div>
                <ChevronRightIcon className="w-5 h-5 text-emerald-500" />
                <div className="text-right">
                  <p className="text-[9px] font-black text-white/30 uppercase tracking-widest">Target Hub</p>
                  <p className="text-lg font-bold">{loadData?.hub || "Pending"}</p>
                </div>
              </div>
            </motion.div>
          )}

          {/* --- LOAD CONTROL VIEW --- */}
          {activeTab === "load" && (
            <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="space-y-6">
              <div className="p-10 rounded-[3rem] bg-white text-slate-900">
                <h2 className="text-3xl font-black italic tracking-tighter mb-6">Mission Control</h2>
                
                <div className="space-y-4">
                  {/* ARRIVAL TRIGGER */}
                  <button 
                    onClick={() => handleStatusUpdate("Arrived")}
                    className="w-full py-6 bg-emerald-600 text-white rounded-[2rem] font-black uppercase tracking-widest text-[11px] flex items-center justify-center gap-3 shadow-xl shadow-emerald-600/20"
                  >
                    <MapPinIcon className="w-5 h-5" /> Confirm Arrival at Node
                  </button>

                  <button className="w-full py-6 bg-slate-100 rounded-[2rem] flex items-center justify-between px-8 border border-slate-200">
                    <span className="font-bold text-sm">Upload Weighbridge Ticket</span>
                    <CameraIcon className="w-6 h-6 text-slate-400" />
                  </button>
                  
                  <button className="w-full py-6 bg-red-500/10 text-red-500 rounded-[2rem] font-black uppercase tracking-widest text-[11px] flex items-center justify-center gap-3 border border-red-500/20">
                    <ExclamationTriangleIcon className="w-5 h-5" /> SOS / Roadside Assistance
                  </button>
                </div>
              </div>
            </motion.div>
          )}

        </AnimatePresence>
      </main>

      {/* --- DOCK NAV --- */}
      {/* --- DYNAMIC BOTTOM NAVIGATION DOCK --- */}
      <nav className="fixed bottm-0 left-0 right-0 p-6 z-50">
        <div className="mx-auto max-w-md h-24 bg-[#1a1625]/80 backdrop-blur-3xl rounded-[3rem] border border-white/10 shadow-[0_-20px_40px_rgba(0,0,0,0.4)] flex items-center justify-around px-4">
          {menuItems.map((item) => (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={cn(
                "relative flex flex-col items-center justify-center w-16 h-16 transition-all duration-300",
                activeTab === item.id ? "text-emerald-500 scale-110" : "text-white/30 hover:text-white/60"
              )}
            >
              {activeTab === item.id && (
                <motion.div 
                  layoutId="activeDockGlow"
                  className="absolute -top-2 w-1 h-1 bg-emerald-500 rounded-full shadow-[0_0_10px_#10b981]" 
                />
              )}
              <item.icon className="w-7 h-7" />
              <span className="text-[8px] font-black uppercase tracking-tighter mt-1">{item.name.split(' ')[1] || item.name}</span>
            </button>
          ))}
          
          {/* PROFILE / AVATAR */}
          <div className="h-12 w-12 rounded-2xl bg-gradient-to-tr from-emerald-500 to-teal-400 p-[1.5px]">
             <div className="h-full w-full rounded-[14.5px] bg-[#05010d] flex items-center justify-center">
                <span className="text-[10px] font-black">JK</span>
             </div>
          </div>
        </div>
      </nav>
    </div>
  );
}