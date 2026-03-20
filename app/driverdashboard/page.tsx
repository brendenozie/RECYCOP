"use client";

import { 
  IdentificationIcon, 
  PhotoIcon, 
  MapIcon, 
  QrCodeIcon 
} from "@heroicons/react/24/outline";

export default function DriverMobileDashboard() {
  return (
    <div className="min-h-screen bg-[#05010d] p-4 pb-24 space-y-4">
      {/* The Transit Pass - For Police Verification */}
      <div className="p-8 rounded-[2.5rem] bg-gradient-to-br from-emerald-600 to-emerald-800 text-white shadow-2xl relative overflow-hidden">
        <div className="flex justify-between items-start mb-6">
          <div>
            <p className="text-[10px] font-black uppercase tracking-widest opacity-60">Digital Transit Pass</p>
            <h3 className="text-2xl font-bold tracking-tight">KDM 482C</h3>
          </div>
          <QrCodeIcon className="w-12 h-12" />
        </div>
        <div className="space-y-2 mb-6">
           <div className="flex justify-between text-xs font-bold">
             <span className="opacity-60 uppercase">Driver</span>
             <span>John Kamau</span>
           </div>
           <div className="flex justify-between text-xs font-bold">
             <span className="opacity-60 uppercase">Load</span>
             <span>3.2 Tons — PET B</span>
           </div>
        </div>
        <div className="bg-white/20 backdrop-blur-md rounded-2xl p-4 text-center text-[10px] font-black uppercase tracking-[0.2em]">
          Verified by Operations — Nairobi Hub
        </div>
      </div>

      {/* Primary Actions - Large Touch Targets */}
      <div className="grid grid-cols-2 gap-4">
        <button className="flex flex-col items-center justify-center gap-3 p-8 rounded-[2rem] bg-white/5 border border-white/10 text-white active:scale-95 transition-all">
          <PhotoIcon className="w-8 h-8 text-emerald-400" />
          <span className="text-[10px] font-black uppercase tracking-widest">Update Photo</span>
        </button>
        <button className="flex flex-col items-center justify-center gap-3 p-8 rounded-[2rem] bg-white/5 border border-white/10 text-white active:scale-95 transition-all">
          <MapIcon className="w-8 h-8 text-emerald-400" />
          <span className="text-[10px] font-black uppercase tracking-widest">Route Info</span>
        </button>
      </div>

      {/* Bottom Floating Navigation (Mobile Only) */}
      <div className="fixed bottom-6 left-6 right-6 h-20 rounded-[2.5rem] bg-white/10 backdrop-blur-2xl border border-white/20 flex items-center justify-around px-8">
        <IdentificationIcon className="w-7 h-7 text-emerald-500" />
        <div className="w-12 h-12 bg-emerald-500 rounded-2xl flex items-center justify-center shadow-lg shadow-emerald-500/40">
           <PhotoIcon className="w-6 h-6 text-slate-900" />
        </div>
        <MapIcon className="w-7 h-7 text-white/40" />
      </div>
    </div>
  );
}