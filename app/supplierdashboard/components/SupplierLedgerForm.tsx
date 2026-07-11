"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  ArchiveBoxIcon, 
  PlusIcon,
  XMarkIcon,
  ArrowPathIcon
} from "@heroicons/react/24/outline";
import { toast } from "sonner";

// Explicit structure pulled from your feedstock architecture matrix
type FeedstockOption = {
  _id: string;
  name: string;
  group: string;
  grade: string;
};

export function SupplierLedgerForm({ userToken }: { userToken: string }) {
  const [isPanelOpen, setIsPanelOpen] = useState(false);
  const [drivers, setDrivers] = useState<{ _id: string; name: string }[]>([]);
  const [feedstockStreams, setFeedstockStreams] = useState<FeedstockOption[]>([]);
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isLoadingStreams, setIsLoadingStreams] = useState(false);

  // Form Fields State
  const [formName, setFormName] = useState("");
  const [formGrade, setFormGrade] = useState("");
  const [formWeight, setFormWeight] = useState("");
  const [formDriver, setFormDriver] = useState("");

  // --- Sync contextual selections dynamically when the drawer mounts ---
  useEffect(() => {
    async function initializeFormContexts() {
      if (!isPanelOpen) return;
      setIsLoadingStreams(true);
      
      try {
        const [driversRes, feedstockRes] = await Promise.all([
          fetch("/api/admin/users?role=driver", {
            headers: { Authorization: `Bearer ${userToken}` }
          }),
          fetch("/api/admin/feedstock", {
            headers: { Authorization: `Bearer ${userToken}` }
          })
        ]);

        if (driversRes.ok) {
          setDrivers(await driversRes.json());
        }
        
        if (feedstockRes.ok) {
          const streams: FeedstockOption[] = await feedstockRes.json();
          setFeedstockStreams(streams);
        }
      } catch (err) {
        toast.error("Failed to fetch operational parameters.");
      } finally {
        setIsLoadingStreams(false);
      }
    }

    initializeFormContexts();
  }, [isPanelOpen, userToken]);

  // When a user selects a dynamic stream, auto-populate the recommended grade field
  const handleStreamChange = (streamName: string) => {
    setFormName(streamName);
    const matchedStream = feedstockStreams.find(s => s.name === streamName);
    if (matchedStream) {
      setFormGrade(matchedStream.grade);
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Format parameter to match your standard architecture backend formatting (e.g., "12.4t")
    const formattedWeight = `${formWeight.replace(/[^\d.-]/g, "")}t`;

    const payload = {
      name: formName,
      grade: formGrade,
      weight: formattedWeight,
      driver: formDriver,
      supplier: "" // Backend JWT identity gracefully overrides this field securely
    };

    try {
      const response = await fetch("/api/admin/inventory", {
        method: "POST",
        headers: { 
          "Content-Type": "application/json",
          "Authorization": `Bearer ${userToken}`
        },
        body: JSON.stringify(payload),
      });

      if (!response.ok) throw new Error("Manifest creation rejected");

      toast.success("Shipment manifest logged into central ledger!");
      setIsPanelOpen(false);
      
      // Clean state keys
      setFormName("");
      setFormGrade("");
      setFormWeight("");
      setFormDriver("");
    } catch (err) {
      toast.error("Failed to commit manifest parameters.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="p-6 max-w-xl mx-auto bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl shadow-xs">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <div className="h-10 w-10 rounded-xl bg-emerald-500/10 flex items-center justify-center text-emerald-600">
            <ArchiveBoxIcon className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-lg font-bold">Delivery Manifest</h2>
            <p className="text-xs text-slate-400">Log new batch shipments bound for central processing.</p>
          </div>
        </div>
        <button 
          onClick={() => setIsPanelOpen(true)}
          className="flex items-center gap-2 px-4 py-2 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl text-xs font-bold transition-all shadow-xs cursor-pointer"
        >
          <PlusIcon className="w-4 h-4 stroke-[2.5px]" /> Create Manifest
        </button>
      </div>

      <AnimatePresence>
        {isPanelOpen && (
          <>
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => !isSubmitting && setIsPanelOpen(false)} className="fixed inset-0 bg-slate-950/40 backdrop-blur-xs z-50" />
            <motion.div 
              initial={{ x: "100%" }} animate={{ x: 0 }} exit={{ x: "100%" }}
              transition={{ type: "tween", duration: 0.2 }}
              className="fixed right-0 top-0 bottom-0 h-full w-full max-w-md bg-white dark:bg-slate-900 border-l border-slate-200 dark:border-slate-800 z-50 p-6 sm:p-8 overflow-y-auto shadow-xl"
            >
              <div className="flex justify-between items-center mb-8">
                <div>
                  <h3 className="text-xl font-bold">New Delivery Manifest</h3>
                  <p className="text-xs text-slate-400 mt-1">Declare cargo attributes matched to live feedstock stream indices.</p>
                </div>
                <button onClick={() => setIsPanelOpen(false)} className="p-2 hover:bg-slate-100 dark:hover:bg-white/5 rounded-xl cursor-pointer">
                  <XMarkIcon className="w-5 h-5" />
                </button>
              </div>

              {isLoadingStreams ? (
                <div className="flex flex-col items-center justify-center py-20 gap-3">
                  <ArrowPathIcon className="w-6 h-6 text-emerald-500 animate-spin" />
                  <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">Loading Live Stream Parameters...</p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-5 text-sm text-slate-900 dark:text-white">
                  <div>
                    <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-1.5">Material Stream Class</label>
                    <select 
                      required 
                      value={formName} 
                      onChange={(e) => handleStreamChange(e.target.value)} 
                      className="w-full bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-xl p-3 font-semibold focus:border-emerald-500 outline-hidden text-slate-900 dark:text-white"
                    >
                      <option value="">Select active stream category...</option>
                      {feedstockStreams.map((stream) => (
                        <option key={stream._id} value={stream.name}>
                          {stream.name} ({stream.group})
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-1.5">Cargo Sort Quality / Grade</label>
                    <input 
                      required 
                      value={formGrade} 
                      onChange={(e) => setFormGrade(e.target.value)} 
                      placeholder="e.g. Clean Premium Sorted" 
                      className="w-full bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-xl p-3 font-semibold focus:border-emerald-500 outline-hidden" 
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-1.5">Net Cargo Weight (Tons)</label>
                    <div className="relative">
                      <input required type="number" step="0.01" value={formWeight} onChange={(e) => setFormWeight(e.target.value)} placeholder="e.g. 12.4" className="w-full bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-xl p-3 pr-12 font-bold text-emerald-600 dark:text-emerald-400 focus:border-emerald-500 outline-hidden" />
                      <span className="absolute right-4 top-3.5 text-slate-400 font-bold text-xs uppercase">Tons</span>
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-1.5">Assigned Courier Driver</label>
                    <select 
                      value={formDriver} 
                      onChange={(e) => setFormDriver(e.target.value)} 
                      className="w-full bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-xl p-3 font-semibold focus:border-emerald-500 outline-hidden text-slate-900 dark:text-white"
                    >
                      <option value="">No Driver (Drop-off / Self-delivery)</option>
                      {drivers.map((drv) => (
                        <option key={drv._id} value={drv.name}>{drv.name}</option>
                      ))}
                    </select>
                  </div>

                  <button 
                    type="submit" 
                    disabled={isSubmitting}
                    className="w-full py-4 bg-emerald-600 hover:bg-emerald-500 disabled:bg-emerald-700 text-white rounded-xl font-bold uppercase tracking-wider text-xs transition-all shadow-md flex items-center justify-center gap-2 cursor-pointer"
                  >
                    {isSubmitting ? (
                      <>
                        <ArrowPathIcon className="w-4 h-4 animate-spin" /> Submitting Manifest...
                      </>
                    ) : (
                      "Submit Manifest"
                    )}
                  </button>
                </form>
              )}
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}