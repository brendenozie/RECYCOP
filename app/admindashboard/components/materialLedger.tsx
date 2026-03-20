"use client";

import { useState, useMemo, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  ArchiveBoxIcon, 
  PlusIcon,
  PencilSquareIcon,
  TrashIcon,
  XMarkIcon,
  UserIcon,
  TruckIcon,
  ExclamationCircleIcon,
  CheckCircleIcon,
  ArrowPathIcon,
  ScaleIcon,
  BeakerIcon,
  FunnelIcon,
  ArrowDownTrayIcon,
  ClockIcon,
  SunIcon,
  MoonIcon
} from "@heroicons/react/24/outline";
import { cn } from "@/lib/utils";

// --- TYPES ---
type Material = {
  id: string;
  name: string;
  grade: string;
  weight: string;
  supplier: string;
  driver: string;
};

const initialInventory: Material[] = [
  { id: "MAT-PET-01", name: "PET Flakes", grade: "Clear/Clean", weight: "12.4t", supplier: "Alpha Aggregators", driver: "John Kamau" },
  { id: "MAT-HDPE-04", name: "HDPE Regrind", grade: "Mixed Color", weight: "8.2t", supplier: "Coastal Plastics Ltd", driver: "" },
  { id: "MAT-ALU-09", name: "Aluminum Bale", grade: "UBC Standard", weight: "4.8t", supplier: "Eco-Metal Nairobi", driver: "" },
];

export function Inventory() {
  const [items, setItems] = useState<Material[]>(initialInventory);
  const [isPanelOpen, setIsPanelOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<Material | null>(null);
  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    const syncData = async () => {
      const response = await fetch('/api/admin/inventory');
      const data = await response.json();
      setItems(data);
    };
    syncData();
  }, []);

  // --- HELPER: COMPUTE STATUS ---
  const getStatus = (item: Material) => {
    const weightValue = parseFloat(item.weight.replace(/[^\d.-]/g, ''));
    if (item.driver && item.driver.trim() !== "") {
      return { 
        label: "In-Transit", 
        color: "text-blue-600 dark:text-blue-400 border-blue-200 dark:border-blue-400/20 bg-blue-50 dark:bg-blue-400/10", 
        glow: "shadow-sm dark:shadow-[0_0_15px_rgba(59,130,246,0.3)]", 
        icon: TruckIcon 
      };
    }
    if (weightValue > 10) {
      return { 
        label: "Pending Review", 
        color: "text-amber-600 dark:text-amber-400 border-amber-200 dark:border-amber-400/20 bg-amber-50 dark:bg-amber-400/10", 
        glow: "shadow-sm dark:shadow-[0_0_15px_rgba(245,158,11,0.3)]", 
        icon: ExclamationCircleIcon 
      };
    }
    return { 
      label: "In-Stock", 
      color: "text-emerald-600 dark:text-emerald-400 border-emerald-200 dark:border-emerald-400/20 bg-emerald-50 dark:bg-emerald-400/10", 
      glow: "shadow-sm dark:shadow-[0_0_15px_rgba(16,185,129,0.3)]", 
      icon: CheckCircleIcon 
    };
  };

  const handleSave = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const newItem: Material = {
      id: (formData.get("id") as string) || `MAT-${Math.random().toString(36).substr(2, 4).toUpperCase()}`,
      name: formData.get("name") as string,
      grade: formData.get("grade") as string,
      weight: formData.get("weight") as string,
      supplier: formData.get("supplier") as string,
      driver: formData.get("driver") as string,
    };

    const method = editingItem ? "PATCH" : "POST";
    const url = editingItem ? `/api/admin/inventory/${editingItem.id}` : "/api/admin/inventory";

    const response = await fetch(url, {
      method,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newItem),
    });

    if (response.ok) {
      // Refresh local state or re-fetch
      closePanel();
    }

    // if (editingItem) {
    //   setItems(items.map(i => i.id === editingItem.id ? newItem : i));
    // } else {
    //   setItems([newItem, ...items]);
    // }
    // closePanel();
  };

  const deleteItem = (id: string) => {
    if (confirm("Permanently remove this material?")) {
      setItems(items.filter(i => i.id !== id));
    }
  };

  const openPanel = (item?: Material) => {
    setEditingItem(item || null);
    setIsPanelOpen(true);
  };

  const closePanel = () => {
    setIsPanelOpen(false);
    setEditingItem(null);
  };

  return (
    <div className={cn(
        "min-h-screen transition-colors duration-500 font-sans selection:bg-emerald-500/30",
        isDarkMode ? "bg-[#050505] text-white" : "bg-slate-50 text-slate-900"
    )}>
      {/* Background Decor */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-emerald-500/10 blur-[120px] rounded-full" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-blue-500/10 blur-[120px] rounded-full" />
      </div>

      <AnimatePresence>
        {isPanelOpen && (
          <>
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={closePanel} className="fixed inset-0 bg-black/60 backdrop-blur-md z-[60]" />
            <motion.div 
              initial={{ x: "100%" }} animate={{ x: 0 }} exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 30, stiffness: 300 }}
              className={cn(
                "fixed right-0 top-0 h-full w-full max-w-lg border-l z-[70] p-12 shadow-2xl overflow-y-auto",
                isDarkMode ? "bg-[#0a0a0a] border-white/10" : "bg-white border-slate-200"
              )}
            >
              <div className="flex justify-between items-center mb-12">
                <div>
                  <h2 className="text-3xl font-black uppercase italic tracking-tighter">Manifest Entry</h2>
                  <p className="text-slate-500 dark:text-white/40 text-xs font-bold tracking-widest uppercase mt-1">Industrial Logistics Node v2.4</p>
                </div>
                <button onClick={closePanel} className="p-3 bg-slate-100 dark:bg-white/5 hover:bg-slate-200 dark:hover:bg-white/10 rounded-2xl transition-all">
                    <XMarkIcon className="w-6 h-6" />
                </button>
              </div>

              <form onSubmit={handleSave} className="space-y-8">
                <div className="space-y-4">
                  <div className="group">
                    <label className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 dark:text-white/30 mb-2 block group-focus-within:text-emerald-500 transition-colors">Core Information</label>
                    <input name="name" placeholder="Material Name" defaultValue={editingItem?.name} required className="w-full bg-slate-100 dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-2xl p-5 font-bold outline-none focus:border-emerald-500/50 transition-all placeholder:text-slate-400 dark:placeholder:text-white/10" />
                  </div>
                  <input name="grade" placeholder="Material Grade" defaultValue={editingItem?.grade} className="w-full bg-slate-100 dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-2xl p-5 font-bold outline-none focus:border-emerald-500/50 transition-all placeholder:text-slate-400 dark:placeholder:text-white/10" />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 dark:text-white/30">Net Weight (t)</label>
                    <input name="weight" defaultValue={editingItem?.weight} placeholder="0.0t" className="w-full bg-slate-100 dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-2xl p-5 font-black text-xl outline-none focus:border-emerald-500/50 text-emerald-600 dark:text-emerald-400" />
                  </div>
                  <div className="flex items-end pb-3 text-[10px] font-bold text-slate-400 dark:text-white/20 uppercase italic">* Automated status triggers over 10.0t</div>
                </div>

                <div className="space-y-4 pt-8 border-t border-slate-200 dark:border-white/5">
                  <div className="space-y-2">
                    <label className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 dark:text-white/30 flex items-center gap-2"><UserIcon className="w-3 h-3"/> Supplier Entity</label>
                    <select name="supplier" defaultValue={editingItem?.supplier} className="w-full bg-slate-100 dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-2xl p-5 font-bold outline-none appearance-none cursor-pointer hover:bg-slate-200 dark:hover:bg-white/10 transition-all">
                      <option value="" className="dark:bg-[#0a0a0a]">Select Supplier</option>
                      <option value="Alpha Aggregators" className="dark:bg-[#0a0a0a]">Alpha Aggregators</option>
                      <option value="Coastal Plastics Ltd" className="dark:bg-[#0a0a0a]">Coastal Plastics Ltd</option>
                    </select>
                  </div>
                </div>

                <button type="submit" className="w-full py-6 bg-emerald-600 text-white rounded-3xl font-black uppercase tracking-widest text-xs shadow-2xl shadow-emerald-900/20 hover:bg-emerald-500 hover:scale-[1.02] active:scale-95 transition-all">
                  Sync with Central Ledger
                </button>
              </form>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      <div className="max-w-7xl mx-auto space-y-12 p-6 md:p-12 relative z-10">
        {/* --- HEADER --- */}
        <header className="flex flex-col lg:flex-row lg:items-end justify-between gap-8">
          <div className="space-y-4">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-100 dark:bg-white/5 border border-slate-200 dark:border-white/10 text-[10px] font-black uppercase tracking-[0.2em] text-emerald-600 dark:text-emerald-500">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
              </span>
              Live Node: Nairobi-Central
            </div>
            <h1 className="text-6xl font-black italic tracking-tighter leading-none">
                MATERIAL <br/>
                <span className={cn(
                    "text-transparent bg-clip-text bg-gradient-to-r",
                    isDarkMode ? "from-white to-white/20" : "from-slate-900 to-slate-400"
                )}>LOGISTICS.</span>
            </h1>
          </div>

          <div className="flex flex-wrap gap-4">
            <button 
                onClick={() => setIsDarkMode(!isDarkMode)}
                className="p-4 bg-slate-100 dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-2xl hover:bg-slate-200 dark:hover:bg-white/10 transition-all"
            >
              {isDarkMode ? <SunIcon className="w-5 h-5" /> : <MoonIcon className="w-5 h-5" />}
            </button>
            <button className="flex items-center gap-3 px-6 py-4 bg-slate-100 dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-2xl text-[10px] font-black uppercase tracking-widest hover:bg-slate-200 dark:hover:bg-white/10 transition-all">
              <FunnelIcon className="w-4 h-4" /> Filter
            </button>
            <button onClick={() => openPanel()} className="flex items-center gap-3 px-8 py-4 bg-emerald-600 dark:bg-white text-white dark:text-black rounded-2xl font-black uppercase tracking-widest text-[10px] hover:scale-105 active:scale-95 transition-all shadow-lg">
              <PlusIcon className="w-5 h-5 stroke-[3px]" /> Add Load
            </button>
          </div>
        </header>

        {/* --- STATS BENTO --- */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {[
            { label: "Aggregate Volume", value: "27.5t", icon: ScaleIcon, color: "text-emerald-500", detail: "82% Load" },
            { label: "Active Hauls", value: "03", icon: TruckIcon, color: "text-blue-500", detail: "In Transit" },
            { label: "Quality Rating", value: "98.2%", icon: BeakerIcon, color: "text-purple-500", detail: "Passed" },
            { label: "Node Latency", value: "14ms", icon: ArrowPathIcon, color: "text-amber-500", detail: "Synchronized" },
          ].map((stat, i) => (
            <div key={i} className={cn(
                "p-8 border rounded-[2.5rem] relative overflow-hidden group transition-all",
                isDarkMode ? "bg-white/5 border-white/10 hover:border-white/20" : "bg-white border-slate-200 hover:border-emerald-200 shadow-sm"
            )}>
              <stat.icon className="absolute -right-4 -bottom-4 w-32 h-32 opacity-[0.05] group-hover:scale-110 transition-transform duration-700" />
              <p className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 dark:text-white/30 mb-6">{stat.label}</p>
              <div className="flex items-end gap-2">
                <span className="text-4xl font-black italic tracking-tighter leading-none">{stat.value}</span>
                <span className={cn("text-[10px] font-bold uppercase mb-1", stat.color)}>{stat.detail}</span>
              </div>
            </div>
          ))}
        </div>

        {/* --- TABLE AREA --- */}
        <div className={cn(
            "border rounded-[3rem] overflow-hidden backdrop-blur-sm",
            isDarkMode ? "bg-white/[0.02] border-white/10" : "bg-white border-slate-200 shadow-xl"
        )}>
          <div className="p-8 border-b border-slate-200 dark:border-white/5 flex items-center justify-between">
            <h3 className="text-xs font-black uppercase tracking-[0.3em] text-slate-400 dark:text-white/30">Master Material Manifest</h3>
            <div className="flex gap-4">
              <button className="p-2 text-slate-300 dark:text-white/20 hover:text-emerald-500 transition-colors"><ArrowDownTrayIcon className="w-5 h-5"/></button>
            </div>
          </div>
          
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className={cn(
                    "text-[9px] uppercase tracking-[0.25em] border-b",
                    isDarkMode ? "text-white/20 border-white/5 bg-white/[0.01]" : "text-slate-400 border-slate-100 bg-slate-50/50"
                )}>
                  <th className="px-10 py-6 font-black">Material Identifier</th>
                  <th className="px-10 py-6 font-black text-center">Protocol Status</th>
                  <th className="px-10 py-6 font-black">Supply Chain</th>
                  <th className="px-10 py-6 font-black text-right">Net Weight</th>
                  <th className="px-10 py-6 font-black text-center">Operations</th>
                </tr>
              </thead>
              <tbody className={cn("divide-y", isDarkMode ? "divide-white/5" : "divide-slate-100")}>
                {items.map((item) => {
                  const status = getStatus(item);
                  return (
                    <motion.tr layout key={item.id} className="group hover:bg-emerald-50/50 dark:hover:bg-white/[0.04] transition-all cursor-default">
                      <td className="px-10 py-8">
                        <div className="flex items-center gap-5">
                          <div className="h-12 w-12 rounded-2xl bg-slate-100 dark:bg-white/5 flex items-center justify-center text-slate-400 dark:text-white/20 group-hover:text-emerald-500 group-hover:bg-emerald-100 dark:group-hover:bg-emerald-400/10 border border-transparent transition-all duration-500">
                            <ArchiveBoxIcon className="w-6 h-6" />
                          </div>
                          <div>
                            <p className="font-black text-lg tracking-tight group-hover:translate-x-1 transition-transform">{item.name}</p>
                            <p className="text-[10px] font-mono text-slate-400 dark:text-white/20 uppercase tracking-widest">{item.id} • {item.grade}</p>
                          </div>
                        </div>
                      </td>
                      <td className="px-10 py-8 text-center">
                        <span className={cn(
                          "inline-flex items-center gap-2 px-5 py-2 rounded-full text-[9px] font-black uppercase tracking-[0.15em] border transition-all duration-500",
                          status.color,
                          status.glow
                        )}>
                          <status.icon className="w-3.5 h-3.5" />
                          {status.label}
                        </span>
                      </td>
                      <td className="px-10 py-8">
                        <div className="space-y-2">
                          <div className="flex items-center gap-3 text-[10px] font-bold text-slate-500 dark:text-white/50 group-hover:text-slate-900 dark:group-hover:text-white transition-colors">
                            <UserIcon className="w-3.5 h-3.5 text-emerald-500" /> {item.supplier || "ORPHANED_LOAD"}
                          </div>
                          <div className="flex items-center gap-3 text-[10px] font-bold text-slate-300 dark:text-white/20 uppercase">
                            <TruckIcon className="w-3.5 h-3.5 text-blue-500" /> {item.driver || "PENDING_DISPATCH"}
                          </div>
                        </div>
                      </td>
                      <td className="px-10 py-8 text-right">
                        <div className="flex flex-col items-end">
                          <span className="text-2xl font-black italic tracking-tighter group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors">{item.weight}</span>
                          <span className="text-[8px] font-bold text-slate-300 dark:text-white/10 uppercase tracking-widest leading-none">Metric Tons</span>
                        </div>
                      </td>
                      <td className="px-10 py-8">
                        <div className="flex items-center justify-center gap-3 opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0 transition-all duration-300">
                          <button onClick={() => openPanel(item)} className="h-10 w-10 bg-slate-100 dark:bg-white/5 hover:bg-emerald-600 hover:text-white rounded-xl flex items-center justify-center transition-all border border-slate-200 dark:border-white/5">
                            <PencilSquareIcon className="w-4 h-4" />
                          </button>
                          <button onClick={() => deleteItem(item.id)} className="h-10 w-10 bg-slate-100 dark:bg-white/5 hover:bg-red-500 hover:text-white rounded-xl flex items-center justify-center transition-all border border-slate-200 dark:border-white/5">
                            <TrashIcon className="w-4 h-4" />
                          </button>
                        </div>
                      </td>
                    </motion.tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>

        {/* --- FOOTER UTILIZATION --- */}
        <div className="p-1 gap-4 flex flex-col md:flex-row">
            <div className="flex-1 p-8 bg-emerald-600 rounded-[2.5rem] flex items-center justify-between group overflow-hidden relative">
                <div className="z-10">
                    <h4 className="text-2xl font-black uppercase italic leading-none mb-1 text-white dark:text-black">Hub Capacity</h4>
                    <p className="text-white/60 dark:text-black/60 text-[10px] font-bold uppercase tracking-widest leading-none">Aggregated Industrial Flow</p>
                </div>
                <div className="text-5xl font-black italic tracking-tighter text-white dark:text-black z-10">78.5%</div>
                <div className="absolute top-0 left-0 bottom-0 bg-white/10 w-[78.5%] group-hover:w-[82%] transition-all duration-1000 ease-out" />
            </div>
            <div className={cn(
                "p-8 border rounded-[2.5rem] flex items-center gap-4 transition-all",
                isDarkMode ? "bg-white/5 border-white/10" : "bg-white border-slate-200 shadow-sm"
            )}>
                <div className="h-12 w-12 rounded-2xl bg-emerald-500/10 flex items-center justify-center">
                    <ClockIcon className="w-6 h-6 text-emerald-500"/>
                </div>
                <div>
                    <p className="text-[10px] font-black uppercase tracking-widest text-slate-400 dark:text-white/30">Last Sync</p>
                    <p className="font-bold text-sm">MAR 20, 2026 - 18:52</p>
                </div>
            </div>
        </div>
      </div>
    </div>
  );
}