"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  MapPinIcon, 
  CpuChipIcon, 
  SignalIcon, 
  CubeTransparentIcon,
  ChevronRightIcon,
  ExclamationCircleIcon,
  PlusIcon,
  TrashIcon,
  PencilSquareIcon,
  XMarkIcon,
  GlobeAltIcon
} from "@heroicons/react/24/outline";
import { cn } from "@/lib/utils";

// --- TYPES ---
type HubLocation = {
  country: string;
  city: string;
  neighborhood: string;
  phase: string;
};

type Hub = {
  id: string;
  name: string;
  location: HubLocation;
  load: number;
  status: "Optimal" | "Maintenance" | "Near Capacity";
  coords: { x: string; y: string };
};

const initialHubs: Hub[] = [
  { 
    id: "NB-01", 
    name: "Nairobi Central", 
    location: { country: "Kenya", city: "Nairobi", neighborhood: "Donholm", phase: "Phase 8" },
    load: 82, 
    status: "Optimal", 
    coords: { x: "35%", y: "40%" } 
  },
  { 
    id: "MS-02", 
    name: "Mombasa Gateway", 
    location: { country: "Kenya", city: "Mombasa", neighborhood: "Nyali", phase: "Block A" },
    load: 45, 
    status: "Optimal", 
    coords: { x: "75%", y: "80%" } 
  },
];

export function Hubs() {
  const [hubs, setHubs] = useState<Hub[]>(initialHubs);
  const [selectedHub, setSelectedHub] = useState<Hub>(hubs[0]);
  const [isPanelOpen, setIsPanelOpen] = useState(false);
  const [editingHub, setEditingHub] = useState<Hub | null>(null);

  const [isLoading, setIsLoading] = useState(true);

  // --- 1. INITIAL FETCH ---
  useEffect(() => {
    async function fetchHubs() {
      const res = await fetch('/api/admin/hubs');
      const data = await res.json();
      setHubs(data);
      if (data.length > 0) setSelectedHub(data[0]);
      setIsLoading(false);
    }
    fetchHubs();
  }, []);

  // --- 2. PERSISTENT SAVE ---
  const handleSaveHub = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    
    const hubPayload = {
      name: formData.get("name"),
      status: formData.get("status"),
      load: formData.get("load"),
      country: formData.get("country"),
      city: formData.get("city"),
      neighborhood: formData.get("neighborhood"),
      phase: formData.get("phase"),
      // Preserve coords if editing, else API generates random
      coords: editingHub?.coords 
    };

    const method = editingHub ? "PATCH" : "POST";
    const url = editingHub ? `/api/admin/hubs/${editingHub.id}` : '/api/admin/hubs';

    const res = await fetch(url, {
      method,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(hubPayload)
    });

    if (res.ok) {
      // Refresh local list
      const updatedRes = await fetch('/api/admin/hubs');
      const updatedData = await updatedRes.json();
      setHubs(updatedData);
      closePanel();
    }
  };

  // --- 3. PERSISTENT DELETE ---
  const deleteHub = async (id: string) => {
    if (!confirm("Decommission this hub?")) return;

    const res = await fetch(`/api/hubs/${id}`, { method: 'DELETE' });
    if (res.ok) {
      const filtered = hubs.filter(h => h.id !== id);
      setHubs(filtered);
      if (selectedHub?.id === id) setSelectedHub(filtered[0] || null);
    }
  };

  if (isLoading) return <div className="p-20 text-center font-black animate-pulse">SYNCHRONIZING GRID...</div>;

  // --- CRUD OPERATIONS ---
  // const handleSaveHub = (e: React.FormEvent<HTMLFormElement>) => {
  //   e.preventDefault();
  //   const formData = new FormData(e.currentTarget);
    
  //   const hubData: Hub = {
  //     id: editingHub?.id || `HB-${Math.random().toString(36).substr(2, 4).toUpperCase()}`,
  //     name: formData.get("name") as string,
  //     load: Number(formData.get("load")),
  //     status: formData.get("status") as Hub["status"],
  //     coords: editingHub?.coords || { x: `${Math.random() * 80 + 10}%`, y: `${Math.random() * 80 + 10}%` },
  //     location: {
  //       country: formData.get("country") as string,
  //       city: formData.get("city") as string,
  //       neighborhood: formData.get("neighborhood") as string,
  //       phase: formData.get("phase") as string,
  //     }
  //   };

  //   if (editingHub) {
  //     setHubs(hubs.map(h => h.id === editingHub.id ? hubData : h));
  //     setSelectedHub(hubData);
  //   } else {
  //     setHubs([...hubs, hubData]);
  //   }
  //   closePanel();
  // };

  // const deleteHub = (id: string) => {
  //   if (confirm("Decommission this hub? This action is irreversible.")) {
  //     const filtered = hubs.filter(h => h.id !== id);
  //     setHubs(filtered);
  //     if (selectedHub.id === id) setSelectedHub(filtered[0]);
  //   }
  // };

  const openPanel = (hub?: Hub) => {
    setEditingHub(hub || null);
    setIsPanelOpen(true);
  };

  const closePanel = () => {
    setIsPanelOpen(false);
    setEditingHub(null);
  };

  return (
    <div className="space-y-10 relative">
      {/* --- CRUD PANEL --- */}
      <AnimatePresence>
        {isPanelOpen && (
          <>
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={closePanel} className="fixed inset-0 bg-black/60 backdrop-blur-md z-[80]" />
            <motion.div 
              initial={{ x: "100%" }} animate={{ x: 0 }} exit={{ x: "100%" }}
              className="fixed right-0 top-0 h-full w-full max-w-md bg-white dark:bg-[#0a0a0a] z-[90] p-10 shadow-2xl overflow-y-auto border-l border-slate-200 dark:border-white/10"
            >
              <div className="flex justify-between items-center mb-8">
                <h2 className="text-2xl font-black italic tracking-tighter uppercase">Hub Configuration</h2>
                <button onClick={closePanel} className="p-2 hover:bg-slate-100 dark:hover:bg-white/5 rounded-full"><XMarkIcon className="w-6 h-6" /></button>
              </div>

              <form onSubmit={handleSaveHub} className="space-y-6">
                <div className="space-y-4">
                  <label className="text-[10px] font-black uppercase tracking-widest text-slate-400">Identity</label>
                  <input name="name" placeholder="Hub Name" defaultValue={editingHub?.name} required className="w-full bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-2xl p-4 font-bold outline-none focus:border-emerald-500" />
                  
                  <div className="grid grid-cols-2 gap-4">
                    <input name="country" placeholder="Country" defaultValue={editingHub?.location.country} required className="bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-2xl p-4 text-sm outline-none" />
                    <input name="city" placeholder="City" defaultValue={editingHub?.location.city} required className="bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-2xl p-4 text-sm outline-none" />
                    <input name="neighborhood" placeholder="Neighborhood" defaultValue={editingHub?.location.neighborhood} className="bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-2xl p-4 text-sm outline-none" />
                    <input name="phase" placeholder="Phase/Sector" defaultValue={editingHub?.location.phase} className="bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-2xl p-4 text-sm outline-none" />
                  </div>
                </div>

                <div className="space-y-4">
                  <label className="text-[10px] font-black uppercase tracking-widest text-slate-400">Metrics & Status</label>
                  <input name="load" type="number" placeholder="Load %" defaultValue={editingHub?.load} className="w-full bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-2xl p-4 font-bold outline-none" />
                  <select name="status" defaultValue={editingHub?.status || "Optimal"} className="w-full bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-2xl p-4 font-bold outline-none">
                    <option value="Optimal">Optimal</option>
                    <option value="Maintenance">Maintenance</option>
                    <option value="Near Capacity">Near Capacity</option>
                  </select>
                </div>

                <button type="submit" className="w-full py-5 bg-emerald-600 text-white rounded-2xl font-black uppercase tracking-widest text-xs hover:bg-emerald-500 transition-all">
                  Commit Node to Grid
                </button>
              </form>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* --- HEADER --- */}
      <header className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-12">
        <div className="space-y-1">
          <h1 className="text-4xl font-serif font-bold tracking-tight italic">Regional Hubs</h1>
          <p className="text-slate-500 dark:text-white/40 text-sm font-medium flex items-center gap-2">
            <GlobeAltIcon className="w-4 h-4 text-emerald-500" />
            Managing <span className="text-slate-900 dark:text-white font-bold">{hubs.length} Nodes</span> across the network.
          </p>
        </div>
        
        <button 
          onClick={() => openPanel()}
          className="flex items-center gap-3 px-8 py-4 bg-slate-900 dark:bg-white text-white dark:text-black rounded-2xl font-black uppercase tracking-widest text-[10px] hover:scale-105 active:scale-95 transition-all"
        >
          <PlusIcon className="w-4 h-4 stroke-[3px]" /> Provision New Hub
        </button>
      </header>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-10">
        
        {/* --- TACTICAL MAP --- */}
        <div className="xl:col-span-2 relative aspect-[16/10] bg-slate-100 dark:bg-[#0a0515] rounded-[4rem] border border-slate-200 dark:border-white/10 overflow-hidden">
          <div className="absolute inset-0 opacity-10 pointer-events-none" 
               style={{ backgroundImage: 'radial-gradient(#10b981 1px, transparent 1px)', backgroundSize: '30px 30px' }} />
          
          {hubs.map((hub) => (
            <motion.button
              key={hub.id}
              onClick={() => setSelectedHub(hub)}
              className="absolute group z-20"
              style={{ left: hub.coords.x, top: hub.coords.y }}
              whileHover={{ scale: 1.2 }}
            >
              <div className={cn(
                "h-5 w-5 rounded-full border-4 border-white dark:border-[#05010d] transition-all duration-500 shadow-xl",
                selectedHub.id === hub.id ? "bg-emerald-500 scale-125" : "bg-slate-400 dark:bg-slate-700"
              )} />
            </motion.button>
          ))}
        </div>

        {/* --- HUB INTELLIGENCE --- */}
        <div className="space-y-6">
          <AnimatePresence mode="wait">
            <motion.div
              key={selectedHub.id}
              initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}
              className="p-10 rounded-[3rem] border border-slate-200 dark:border-white/10 bg-white dark:bg-white/5 shadow-xl relative overflow-hidden"
            >
              {/* Hierarchical Breadcrumb */}
              <div className="flex items-center gap-1 text-[9px] font-black uppercase tracking-[0.2em] text-emerald-500 mb-6">
                <span>{selectedHub.location.country}</span>
                <ChevronRightIcon className="w-2 h-2" />
                <span>{selectedHub.location.city}</span>
                <ChevronRightIcon className="w-2 h-2" />
                <span className="text-slate-400">{selectedHub.location.neighborhood}</span>
              </div>

              <div className="flex justify-between items-start mb-8">
                <div>
                  <h3 className="text-3xl font-black tracking-tighter leading-none mb-2">{selectedHub.name}</h3>
                  <div className="flex items-center gap-2 text-slate-400">
                    <MapPinIcon className="w-4 h-4" />
                    <span className="text-xs font-bold">{selectedHub.location.phase}</span>
                  </div>
                </div>
                <div className="flex gap-2">
                  <button onClick={() => openPanel(selectedHub)} className="p-3 bg-slate-50 dark:bg-white/5 rounded-xl hover:text-emerald-500 transition-colors"><PencilSquareIcon className="w-5 h-5"/></button>
                  <button onClick={() => deleteHub(selectedHub.id)} className="p-3 bg-slate-50 dark:bg-white/5 rounded-xl hover:text-red-500 transition-colors"><TrashIcon className="w-5 h-5"/></button>
                </div>
              </div>

              {/* Progress Bar */}
              <div className="space-y-4 mb-8">
                <div className="flex justify-between text-[10px] font-black uppercase tracking-widest">
                  <span className="text-slate-400">Node Load</span>
                  <span>{selectedHub.load}%</span>
                </div>
                <div className="h-2 w-full bg-slate-100 dark:bg-white/10 rounded-full overflow-hidden">
                  <motion.div 
                    initial={{ width: 0 }} animate={{ width: `${selectedHub.load}%` }}
                    className={cn("h-full transition-colors", selectedHub.load > 90 ? "bg-red-500" : "bg-emerald-500")} 
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                 <div className="p-5 rounded-2xl bg-slate-50 dark:bg-white/5 border border-slate-100 dark:border-white/5 text-center">
                    <p className="text-[9px] font-black uppercase text-slate-400 mb-1">Status</p>
                    <p className="font-bold text-xs uppercase tracking-tight">{selectedHub.status}</p>
                 </div>
                 <div className="p-5 rounded-2xl bg-slate-50 dark:bg-white/5 border border-slate-100 dark:border-white/5 text-center">
                    <p className="text-[9px] font-black uppercase text-slate-400 mb-1">ID</p>
                    <p className="font-bold text-xs">{selectedHub.id}</p>
                 </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}