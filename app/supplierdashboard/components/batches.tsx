"use client";

import { useState, useEffect } from "react";
import { cn } from "@/lib/utils";
import { CubeIcon, PlusIcon, XMarkIcon } from "@heroicons/react/24/outline";

export function MyBatches() {
  const [batches, setBatches] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);

  // Fetch logic
  useEffect(() => {
    fetch("/api/supplier/batches?supplierId=ALPHA_01")
      .then((res) => res.json())
      .then((data) => {
        setBatches(data);
        setLoading(false);
      });
  }, []);

  return (
    <div className="space-y-6">
      <div className="p-6 md:p-10 rounded-[3rem] bg-white dark:bg-white/5 border border-slate-200 dark:border-white/10 relative overflow-hidden">
        
        {/* HEADER */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-10">
          <div>
            <h3 className="text-xl font-bold italic font-serif">Inventory Batches</h3>
            <p className="text-[10px] text-slate-400 font-black uppercase tracking-widest mt-1">Live Warehouse Sync</p>
          </div>
          <button 
            onClick={() => setShowForm(!showForm)}
            className="w-full md:w-auto text-[10px] font-black uppercase tracking-widest px-6 py-3 bg-emerald-600 text-white rounded-xl flex items-center justify-center gap-2 hover:scale-105 transition-transform"
          >
            {showForm ? <XMarkIcon className="w-4 h-4" /> : <PlusIcon className="w-4 h-4" />}
            {showForm ? "Cancel" : "Create New Batch"}
          </button>
        </div>

        {/* LISTING */}
        <div className="space-y-4">
          {loading ? (
            <div className="py-20 text-center text-slate-400 animate-pulse font-black uppercase tracking-tighter text-xs">Synchronizing Stock...</div>
          ) : batches.length === 0 ? (
            <div className="py-20 text-center border-2 border-dashed border-slate-200 dark:border-white/5 rounded-3xl">
               <p className="text-xs text-slate-400 font-bold">No batches recorded for this node.</p>
            </div>
          ) : (
            batches.map((batch: any) => (
              <div key={batch.id} className="flex flex-col md:flex-row items-start md:items-center justify-between p-6 rounded-3xl bg-slate-50 dark:bg-white/5 border border-transparent hover:border-emerald-500/20 transition-all group">
                <div className="flex items-center gap-6 mb-4 md:mb-0">
                  <div className="h-14 w-14 rounded-2xl bg-white dark:bg-slate-800 flex items-center justify-center border border-slate-200 dark:border-white/5 group-hover:rotate-6 transition-transform">
                    <CubeIcon className="w-6 h-6 text-emerald-500" />
                  </div>
                  <div>
                    <p className="font-bold flex items-center gap-2">
                      {batch.material} 
                      <span className="text-[10px] px-2 py-0.5 bg-slate-200 dark:bg-white/10 rounded text-slate-500 font-mono">#{batch.id}</span>
                    </p>
                    <p className="text-xs text-slate-500 mt-1 uppercase tracking-tighter font-medium">
                      Weight: <span className="text-slate-900 dark:text-white font-bold">{batch.weight}kg</span> • 
                      Grade: <span className="text-emerald-500 font-bold">{batch.grade}</span>
                    </p>
                  </div>
                </div>
                
                <div className="flex items-center justify-between w-full md:w-auto gap-4">
                    <span className={cn(
                      "text-[9px] font-black uppercase tracking-widest px-4 py-2 rounded-full",
                      batch.status === "Stored" ? "bg-blue-100 text-blue-600 dark:bg-blue-500/10 dark:text-blue-400" : "bg-emerald-100 text-emerald-600 dark:bg-emerald-500/10 dark:text-emerald-400"
                    )}>
                      {batch.status}
                    </span>
                    <button className="p-2 hover:bg-slate-200 dark:hover:bg-white/10 rounded-lg transition-colors">
                        <PlusIcon className="w-4 h-4 text-slate-400" />
                    </button>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}