"use client";

import { useState, useEffect } from "react";
import { TruckIcon, MapPinIcon, ChevronRightIcon, CheckCircleIcon } from "lucide-react";
import { cn } from "@/lib/utils";

export function RequestPickup() {
  const [storedBatches, setStoredBatches] = useState([]);
  const [selectedHub, setSelectedHub] = useState("Nairobi Central Hub");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  // 1. Fetch only "Stored" batches for this supplier
  useEffect(() => {
    fetch("/api/supplier/batches?supplierId=ALPHA_01")
      .then(res => res.json())
      .then(data => setStoredBatches(data.filter((b: any) => b.status === "Stored")));
  }, []);

  const totalWeight = storedBatches.reduce((acc, curr: any) => acc + curr.weight, 0);
  const batchIds = storedBatches.map((b: any) => b.id);

  const handleRequest = async () => {
    if (totalWeight === 0) return alert("No batches available for pickup.");
    setIsSubmitting(true);

    const res = await fetch("/api/supplier/pickup", {
      method: "POST",
      body: JSON.stringify({
        supplierId: "ALPHA_01",
        batchIds,
        hub: selectedHub,
        totalWeight,
      }),
    });

    if (res.ok) {
      setIsSuccess(true);
      setStoredBatches([]); // Clear local state
    }
    setIsSubmitting(false);
  };

  if (isSuccess) return (
    <div className="h-64 flex flex-col items-center justify-center text-center p-10 bg-emerald-500/10 rounded-[3rem] border border-emerald-500/20">
      <CheckCircleIcon className="w-16 h-16 text-emerald-500 mb-4" />
      <h3 className="text-2xl font-black italic">Logistics Dispatched</h3>
      <p className="text-sm text-slate-500 max-w-xs mt-2">The fleet controller has been notified. Check &apos;Fleet Radar&apos; for truck arrival time.</p>
    </div>
  );

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
      {/* ACTION CARD */}
      <div className="p-10 rounded-[3.5rem] bg-emerald-600 text-white shadow-2xl relative overflow-hidden group">
        <TruckIcon className="w-14 h-14 mb-8 group-hover:translate-x-4 transition-transform duration-700" />
        <h3 className="text-4xl font-black italic tracking-tighter mb-4">Request a Carrier</h3>
        <p className="text-emerald-100 text-sm mb-12 leading-relaxed opacity-80">
          Sync your local inventory with the regional transport hub. Dispatch units arrive within 24hrs for verified loads.
        </p>
        
        <div className="space-y-4 relative z-10">
          <button 
            onClick={handleRequest}
            disabled={totalWeight === 0 || isSubmitting}
            className="w-full py-6 bg-slate-900 rounded-[2rem] font-black uppercase tracking-[0.2em] text-[11px] hover:bg-black transition-all disabled:opacity-50 flex items-center justify-center gap-3"
          >
            {isSubmitting ? "Coordinating Fleet..." : "Confirm Pickup Request"}
            <ChevronRightIcon className="w-4 h-4" />
          </button>
        </div>
        
        {/* Visual Decoration */}
        <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-white/10 rounded-full blur-3xl pointer-events-none" />
      </div>
      
      {/* DETAILS CARD */}
      <div className="p-10 rounded-[3.5rem] border border-slate-200 dark:border-white/10 bg-white dark:bg-white/5 backdrop-blur-md">
        <h4 className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-400 mb-8">Manifest Details</h4>
        
        <div className="space-y-8">
          <div className="space-y-3">
            <label className="flex items-center gap-2 text-[10px] font-black uppercase text-emerald-500 tracking-widest">
              <MapPinIcon className="w-3 h-3" /> Target Destination Node
            </label>
            <select 
              value={selectedHub}
              onChange={(e) => setSelectedHub(e.target.value)}
              className="w-full bg-slate-100 dark:bg-white/5 border-none rounded-2xl p-5 text-sm outline-none font-bold appearance-none transition-colors focus:ring-2 ring-emerald-500/20"
            >
              <option>Nairobi Central Hub</option>
              <option>Thika Regional Node</option>
              <option>Mombasa Export Yard</option>
            </select>
          </div>

          <div className="p-6 rounded-3xl bg-slate-50 dark:bg-white/5 border border-dashed border-slate-200 dark:border-white/10">
            <div className="flex justify-between items-end">
              <div>
                <p className="text-[10px] font-black uppercase text-slate-400 mb-1">Total Payload</p>
                <p className="text-4xl font-black italic tracking-tighter">
                  {(totalWeight / 1000).toFixed(2)} <span className="text-xl not-italic font-sans text-slate-400">Tons</span>
                </p>
              </div>
              <div className="text-right">
                <p className="text-[10px] font-black uppercase text-slate-400 mb-1">Active Batches</p>
                <p className="text-xl font-bold">{storedBatches.length}</p>
              </div>
            </div>
          </div>
          
          <p className="text-[10px] text-slate-400 italic">
            * Pickup includes automatic CO2 offset validation upon delivery.
          </p>
        </div>
      </div>
    </div>
  );
}