"use client";

import { useState, useEffect } from "react";
import { cn } from "@/lib/utils";
import { 
  CubeIcon, 
  PlusIcon, 
  XMarkIcon,
  ArrowPathIcon 
} from "@heroicons/react/24/outline";
import { motion, AnimatePresence } from "framer-motion";
import { toast } from "sonner";
import { SupplierLedgerForm } from "./SupplierLedgerForm";

// Type matches the payload schema managed by /api/admin/inventory
type InventoryBatch = {
  _id: string;
  name: string;
  weight: string;
  grade: string;
  status: string;
};

export function MyBatches({ userToken }: { userToken: string }) {
  const [batches, setBatches] = useState<InventoryBatch[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);

  // Read directly from the unified inventory endpoint
  useEffect(() => {
    async function syncWarehouseStock() {
      try {
        const res = await fetch("/api/admin/inventory", {
          headers: {
            "Authorization": `Bearer ${userToken}`,
            "Content-Type": "application/json"
          }
        });
        
        if (!res.ok) throw new Error("Failed to synchronize inventory");
        
        const data = await res.json();
        setBatches(data);
      } catch (err) {
        toast.error("Could not sync live warehouse batches.");
      } finally {
        setLoading(false);
      }
    }

    syncWarehouseStock();
  }, [userToken]);

  return (
    <div className="space-y-6">
      <div className="p-6 md:p-10 rounded-[3rem] bg-white dark:bg-white/5 border border-slate-200 dark:border-white/10 relative overflow-hidden shadow-xs">
        
        {/* --- HEADER --- */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-10">
          <div>
            <h3 className="text-xl font-bold italic font-serif text-slate-900 dark:text-white">Inventory Batches</h3>
            <p className="text-[10px] text-slate-400 font-black uppercase tracking-widest mt-1">Live Warehouse Sync</p>
          </div>
          <button 
            onClick={() => setShowForm(!showForm)}
            className={cn(
              "w-full md:w-auto text-[10px] font-black uppercase tracking-widest px-6 py-3 text-white rounded-xl flex items-center justify-center gap-2 hover:scale-105 transition-all shadow-md active:scale-95",
              showForm ? "bg-slate-800 hover:bg-slate-700" : "bg-emerald-600 hover:bg-emerald-500"
            )}
          >
            {showForm ? <XMarkIcon className="w-4 h-4 stroke-[3]" /> : <PlusIcon className="w-4 h-4 stroke-[3]" />}
            {showForm ? "Close Form" : "Create New Batch"}
          </button>
        </div>

        {/* --- OPTIONAL FORM SLOT --- */}
        <AnimatePresence>
          {showForm && (
            <motion.div 
              initial={{ opacity: 0, height: 0, marginBottom: 0 }}
              animate={{ opacity: 1, height: "auto", marginBottom: 32 }}
              exit={{ opacity: 0, height: 0, marginBottom: 0 }}
              className="overflow-hidden"
            >
              <div className="p-6 bg-slate-50 dark:bg-slate-900/50 rounded-3xl border border-dashed border-slate-200 dark:border-slate-800 flex items-center justify-center text-xs font-bold text-slate-400 uppercase tracking-widest">
                <SupplierLedgerForm userToken={userToken} />
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* --- BATCH LISTING --- */}
        <div className="space-y-4">
          {loading ? (
            <div className="py-20 flex flex-col items-center justify-center gap-4 text-emerald-600 dark:text-emerald-500">
              <ArrowPathIcon className="w-8 h-8 animate-spin" />
              <div className="text-slate-400 animate-pulse font-black uppercase tracking-tighter text-xs">Synchronizing Stock...</div>
            </div>
          ) : batches.length === 0 ? (
            <motion.div 
              initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
              className="py-20 text-center border-2 border-dashed border-slate-200 dark:border-white/5 rounded-3xl"
            >
               <p className="text-xs text-slate-400 font-bold uppercase tracking-wider">No batches recorded for this node.</p>
            </motion.div>
          ) : (
            <AnimatePresence mode="popLayout">
              {batches.map((batch) => (
                <motion.div 
                  layout
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  key={batch._id} 
                  className="flex flex-col md:flex-row items-start md:items-center justify-between p-6 rounded-3xl bg-slate-50 dark:bg-slate-900/40 border border-transparent hover:border-emerald-500/20 transition-all group"
                >
                  <div className="flex items-center gap-6 mb-4 md:mb-0">
                    <div className="h-14 w-14 rounded-2xl bg-white dark:bg-slate-800 flex items-center justify-center border border-slate-200 dark:border-slate-700 group-hover:rotate-6 transition-transform shadow-sm">
                      <CubeIcon className="w-6 h-6 text-emerald-500" />
                    </div>
                    <div>
                      <p className="font-bold text-slate-900 dark:text-white flex items-center gap-2">
                        {batch.name} 
                        <span className="text-[10px] px-2 py-0.5 bg-slate-200 dark:bg-slate-800 rounded text-slate-500 font-mono">
                          #{batch._id.slice(-6).toUpperCase()}
                        </span>
                      </p>
                      <p className="text-xs text-slate-500 mt-1 uppercase tracking-tighter font-medium">
                        Weight: <span className="text-slate-900 dark:text-white font-bold">{batch.weight}</span> • 
                        Grade: <span className="text-emerald-500 font-bold ml-1">{batch.grade}</span>
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between w-full md:w-auto gap-4">
                      <span className={cn(
                        "text-[9px] font-black uppercase tracking-widest px-4 py-2 rounded-full border",
                        batch.status === "Stored" 
                          ? "bg-blue-50 border-blue-100 text-blue-600 dark:bg-blue-500/10 dark:border-blue-500/20 dark:text-blue-400" 
                          : "bg-emerald-50 border-emerald-100 text-emerald-600 dark:bg-emerald-500/10 dark:border-emerald-500/20 dark:text-emerald-400"
                      )}>
                        {batch.status}
                      </span>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          )}
        </div>
      </div>
    </div>
  );
}