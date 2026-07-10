"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  MapPinIcon, 
  ChevronRightIcon,
  PlusIcon,
  TrashIcon,
  PencilSquareIcon,
  XMarkIcon,
  GlobeAltIcon,
  CircleStackIcon
} from "@heroicons/react/24/outline";
import { cn } from "@/lib/utils";

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
    coords: { x: "75%", y: "65%" } 
  },
];

export function Hubs() {
  const [hubs, setHubs] = useState<Hub[]>(initialHubs);
  const [selectedHub, setSelectedHub] = useState<Hub>(initialHubs[0]);
  const [isPanelOpen, setIsPanelOpen] = useState(false);
  const [editingHub, setEditingHub] = useState<Hub | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function fetchHubs() {
      try {
        const res = await fetch('/api/admin/hubs');
        const data = await res.json();
        if (Array.isArray(data) && data.length > 0) {
          setHubs(data);
          setSelectedHub(data[0]);
        }
      } catch (err) {
        console.error("Failed to load hubs", err);
      } finally {
        setIsLoading(false);
      }
    }
    fetchHubs();
  }, []);

  const handleSaveHub = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    
    const hubPayload = {
      name: formData.get("name"),
      status: formData.get("status"),
      load: Number(formData.get("load")),
      country: formData.get("country"),
      city: formData.get("city"),
      neighborhood: formData.get("neighborhood"),
      phase: formData.get("phase"),
      coords: editingHub?.coords || { x: `${Math.random() * 70 + 15}%`, y: `${Math.random() * 60 + 20}%` }
    };

    try {
      const method = editingHub ? "PATCH" : "POST";
      const url = editingHub ? `/api/admin/hubs/${editingHub.id}` : '/api/admin/hubs';

      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(hubPayload)
      });

      if (res.ok) {
        const updatedRes = await fetch('/api/admin/hubs');
        const updatedData = await updatedRes.json();
        if (Array.isArray(updatedData)) {
          setHubs(updatedData);
          const current = updatedData.find(h => h.name === hubPayload.name) || updatedData[0];
          setSelectedHub(current);
        }
        closePanel();
      }
    } catch (err) {
      alert("Failed to save hub location details.");
    }
  };

  const deleteHub = async (id: string) => {
    if (!confirm("Are you sure you want to close down and delete this hub location?")) return;

    try {
      const res = await fetch(`/api/hubs/${id}`, { method: 'DELETE' });
      if (res.ok) {
        const filtered = hubs.filter(h => h.id !== id);
        setHubs(filtered);
        if (selectedHub?.id === id) setSelectedHub(filtered[0] || null);
      }
    } catch (err) {
      console.error("Delete request failed");
    }
  };

  const openPanel = (hub?: Hub) => {
    setEditingHub(hub || null);
    setIsPanelOpen(true);
  };

  const closePanel = () => {
    setIsPanelOpen(false);
    setEditingHub(null);
  };

  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center p-24 space-y-4">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-emerald-500 border-t-transparent" />
        <div className="text-sm font-bold tracking-wide text-slate-400 animate-pulse">LOADING MAP NETWORK...</div>
      </div>
    );
  }

  return (
    <div className="space-y-10 relative">
      
      {/* --- SLIDE PANELS --- */}
      <AnimatePresence>
        {isPanelOpen && (
          <>
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={closePanel} className="fixed inset-0 bg-slate-900/40 dark:bg-black/60 backdrop-blur-sm z-[80]" />
            <motion.div 
              initial={{ x: "100%" }} animate={{ x: 0 }} exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 220 }}
              className="fixed right-0 top-0 bottom-0 h-full w-full max-w-md bg-white dark:bg-[#0c0517] z-[90] p-6 sm:p-8 shadow-2xl border-l border-slate-200 dark:border-white/10 overflow-y-auto"
            >
              <div className="flex justify-between items-center mb-8">
                <h2 className="text-xl font-bold tracking-tight text-slate-900 dark:text-white">
                  {editingHub ? "Edit Hub Details" : "Register New Hub"}
                </h2>
                <button onClick={closePanel} className="p-2 bg-slate-100 dark:bg-white/5 text-slate-500 dark:text-purple-100/70 hover:text-slate-800 dark:hover:text-white rounded-xl">
                  <XMarkIcon className="w-5 h-5 stroke-[2px]" />
                </button>
              </div>

              <form onSubmit={handleSaveHub} className="space-y-6 text-sm">
                <div className="space-y-3">
                  <label className="text-xs font-bold text-slate-400 dark:text-slate-500">Hub Identity & Address</label>
                  <input name="name" placeholder="Hub Name (e.g. Nairobi Central)" defaultValue={editingHub?.name} required className="w-full bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-xl p-3.5 font-semibold text-slate-800 dark:text-white placeholder:text-slate-400 outline-none focus:border-emerald-500 transition-colors" />
                  
                  <div className="grid grid-cols-2 gap-3">
                    <input name="country" placeholder="Country" defaultValue={editingHub?.location.country} required className="w-full bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-xl p-3.5 font-semibold text-slate-800 dark:text-white placeholder:text-slate-400 outline-none focus:border-emerald-500 transition-colors" />
                    <input name="city" placeholder="City" defaultValue={editingHub?.location.city} required className="w-full bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-xl p-3.5 font-semibold text-slate-800 dark:text-white placeholder:text-slate-400 outline-none focus:border-emerald-500 transition-colors" />
                    <input name="neighborhood" placeholder="Area / Street" defaultValue={editingHub?.location.neighborhood} className="w-full bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-xl p-3.5 font-semibold text-slate-800 dark:text-white placeholder:text-slate-400 outline-none focus:border-emerald-500 transition-colors" />
                    <input name="phase" placeholder="Building / Suite" defaultValue={editingHub?.location.phase} className="w-full bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-xl p-3.5 font-semibold text-slate-800 dark:text-white placeholder:text-slate-400 outline-none focus:border-emerald-500 transition-colors" />
                  </div>
                </div>

                <div className="space-y-3">
                  <label className="text-xs font-bold text-slate-400 dark:text-slate-500">Operation Metrics</label>
                  <input name="load" type="number" min="0" max="100" placeholder="Storage Capacity Used (%)" defaultValue={editingHub?.load} className="w-full bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-xl p-3.5 font-semibold text-slate-800 dark:text-white placeholder:text-slate-400 outline-none focus:border-emerald-500 transition-colors" />
                  <select name="status" defaultValue={editingHub?.status || "Optimal"} className="w-full bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-xl p-3.5 font-semibold text-slate-800 dark:text-white outline-none focus:border-emerald-500 transition-colors">
                    <option value="Optimal" className="dark:bg-[#0c0517]">Optimal (Working Great)</option>
                    <option value="Maintenance" className="dark:bg-[#0c0517]">Maintenance (Under Repair)</option>
                    <option value="Near Capacity" className="dark:bg-[#0c0517]">Near Capacity (Almost Full)</option>
                  </select>
                </div>

                <button type="submit" className="w-full py-3.5 bg-emerald-600 hover:bg-emerald-500 dark:bg-emerald-500 dark:hover:bg-emerald-400 text-white dark:text-slate-950 rounded-xl font-bold text-xs transition-all shadow-md shadow-emerald-500/10">
                  Save Hub Location
                </button>
              </form>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* --- HEADER --- */}
      <header className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="space-y-1">
          <h1 className="text-3xl font-extrabold tracking-tight text-slate-900 dark:text-white font-sans">Regional Hubs</h1>
          <p className="text-slate-500 dark:text-purple-100/60 text-sm font-medium flex items-center gap-2">
            <GlobeAltIcon className="w-4 h-4 text-emerald-500" />
            Managing <span className="text-slate-900 dark:text-white font-bold">{hubs.length} Active Centers</span> across the network.
          </p>
        </div>
        
        <button 
          onClick={() => openPanel()}
          className="flex items-center justify-center gap-2 px-5 py-3 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl font-bold text-xs transition-all shadow-sm"
        >
          <PlusIcon className="w-4 h-4 stroke-[2px]" /> Add New Hub
        </button>
      </header>

      {/* --- MAIN INTERACTIVE VIEWGRID --- */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* --- TACTICAL INTERACTIVE MAP --- */}
        <div className="lg:col-span-2 relative aspect-[4/3] sm:aspect-[16/10] bg-slate-100 dark:bg-white/[0.02] border border-slate-200 dark:border-white/10 rounded-2xl overflow-hidden shadow-inner flex items-center justify-center">
          {/* Subtle Grid Background */}
          <div className="absolute inset-0 opacity-[0.15] dark:opacity-[0.07] pointer-events-none" 
               style={{ backgroundImage: 'radial-gradient(#10b981 1.2px, transparent 1.2px)', backgroundSize: '24px 24px' }} />
          
          <div className="absolute bottom-4 left-4 bg-white/80 dark:bg-slate-950/80 backdrop-blur-md px-3 py-1.5 rounded-lg border border-slate-200 dark:border-white/10 text-[10px] font-semibold text-slate-400 dark:text-purple-100/40 uppercase tracking-wider">
            Network Location Grid View
          </div>
          
          {hubs.map((hub) => {
            const isSelected = selectedHub?.id === hub.id;
            const isFull = hub.load > 80;
            
            return (
              <motion.button
                key={hub.id}
                onClick={() => setSelectedHub(hub)}
                className="absolute z-20 -translate-x-1/2 -translate-y-1/2 group"
                style={{ left: hub.coords.x, top: hub.coords.y }}
                whileHover={{ scale: 1.15 }}
              >
                <div className="relative flex items-center justify-center">
                  {/* Outer Rippling Pulsed Ring */}
                  <span className={cn(
                    "absolute inline-flex h-10 w-10 rounded-full opacity-20 dark:opacity-30 animate-ping duration-1000",
                    isSelected ? (isFull ? "bg-amber-400" : "bg-emerald-400") : "bg-slate-400/0"
                  )} />
                  
                  {/* Interactive Button Node Pin */}
                  <div className={cn(
                    "h-6 w-6 rounded-full border-2 flex items-center justify-center shadow-lg transition-all duration-300",
                    isSelected 
                      ? "bg-white dark:bg-slate-950 scale-110 border-emerald-500 shadow-emerald-500/20" 
                      : "bg-slate-300 dark:bg-slate-800 border-slate-400 dark:border-slate-600"
                  )}>
                    <div className={cn(
                      "h-2 w-2 rounded-full",
                      hub.status === "Near Capacity" ? "bg-amber-500" : hub.status === "Maintenance" ? "bg-blue-500" : "bg-emerald-500"
                    )} />
                  </div>

                  {/* Tiny Floating Clean Label pops up on selection */}
                  {isSelected && (
                    <div className="absolute top-8 bg-slate-900 dark:bg-white text-white dark:text-slate-950 px-2 py-1 rounded text-[10px] font-bold shadow-md whitespace-nowrap z-30">
                      {hub.name}
                    </div>
                  )}
                </div>
              </motion.button>
            );
          })}
        </div>

        {/* --- HUB DATA CARDS INFO --- */}
        <div className="flex flex-col">
          {selectedHub ? (
            <AnimatePresence mode="wait">
              <motion.div
                key={selectedHub.id}
                initial={{ opacity: 0, y: 10 }} 
                animate={{ opacity: 1, y: 0 }} 
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.2 }}
                className="p-6 sm:p-8 rounded-2xl border border-slate-200 dark:border-white/10 bg-white dark:bg-white/[0.03] shadow-sm flex-1 flex flex-col justify-between"
              >
                <div>
                  {/* Breadcrumb Path Info */}
                  <div className="flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-wider text-emerald-600 dark:text-emerald-400 mb-4">
                    <span>{selectedHub.location.country}</span>
                    <ChevronRightIcon className="w-2 h-2 stroke-[3px]" />
                    <span>{selectedHub.location.city}</span>
                    <ChevronRightIcon className="w-2 h-2 stroke-[3px]" />
                    <span className="text-slate-400 dark:text-purple-100/40">{selectedHub.location.neighborhood}</span>
                  </div>

                  {/* Main Header Row */}
                  <div className="flex justify-between items-start gap-4 mb-6">
                    <div>
                      <h3 className="text-2xl font-black text-slate-900 dark:text-white tracking-tight mb-1">{selectedHub.name}</h3>
                      <div className="flex items-center gap-1.5 text-slate-400 dark:text-purple-100/50">
                        <MapPinIcon className="w-4 h-4" />
                        <span className="text-xs font-semibold">{selectedHub.location.phase}</span>
                      </div>
                    </div>
                    
                    {/* Action Panel Buttons */}
                    <div className="flex gap-1.5 shrink-0">
                      <button onClick={() => openPanel(selectedHub)} className="p-2 bg-slate-50 hover:bg-slate-100 dark:bg-white/5 dark:hover:bg-white/10 rounded-xl text-slate-500 dark:text-purple-100/60 hover:text-emerald-600 transition-colors">
                        <PencilSquareIcon className="w-4 h-4 stroke-[2px]"/>
                      </button>
                      <button onClick={() => deleteHub(selectedHub.id)} className="p-2 bg-slate-50 hover:bg-slate-100 dark:bg-white/5 dark:hover:bg-white/10 rounded-xl text-slate-500 dark:text-purple-100/60 hover:text-red-500 transition-colors">
                        <TrashIcon className="w-4 h-4 stroke-[2px]"/>
                      </button>
                    </div>
                  </div>

                  {/* Load / Metrics Meter section */}
                  <div className="space-y-2 p-4 bg-slate-50 dark:bg-white/[0.01] border border-slate-100 dark:border-white/5 rounded-xl mb-4">
                    <div className="flex justify-between items-center text-xs font-semibold">
                      <span className="text-slate-400 dark:text-purple-100/40 flex items-center gap-1.5">
                        <CircleStackIcon className="w-4 h-4" /> Storage Space Used
                      </span>
                      <span className="text-slate-900 dark:text-white font-bold">{selectedHub.load}%</span>
                    </div>
                    <div className="h-2 w-full bg-slate-200 dark:bg-white/10 rounded-full overflow-hidden">
                      <motion.div 
                        initial={{ width: 0 }} 
                        animate={{ width: `${selectedHub.load}%` }}
                        transition={{ duration: 0.8, ease: "easeOut" }}
                        className={cn(
                          "h-full rounded-full", 
                          selectedHub.load > 85 ? "bg-amber-500" : "bg-emerald-500"
                        )} 
                      />
                    </div>
                  </div>

                  {/* Secondary Details Information Boxes */}
                  <div className="grid grid-cols-2 gap-3">
                     <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-white/[0.01] border border-slate-100 dark:border-white/5">
                        <p className="text-[10px] font-bold text-slate-400 dark:text-purple-100/30 uppercase tracking-wider mb-0.5">Operating Status</p>
                        <p className={cn(
                          "font-bold text-xs uppercase tracking-tight",
                          selectedHub.status === "Optimal" ? "text-emerald-600 dark:text-emerald-400" : "text-amber-500"
                        )}>{selectedHub.status}</p>
                     </div>
                     <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-white/[0.01] border border-slate-100 dark:border-white/5">
                        <p className="text-[10px] font-bold text-slate-400 dark:text-purple-100/30 uppercase tracking-wider mb-0.5">System ID Code</p>
                        <p className="font-bold text-xs text-slate-700 dark:text-purple-100/80">{selectedHub.id}</p>
                     </div>
                  </div>
                </div>

                <div className="mt-6 pt-4 border-t border-slate-100 dark:border-white/5 text-[11px] text-slate-400 dark:text-purple-100/40 font-medium">
                  Select any other coordinate point marker on the reference grid map to inspect alternative logistics hubs.
                </div>
              </motion.div>
            </AnimatePresence>
          ) : (
            <div className="h-full rounded-2xl border border-dashed border-slate-200 dark:border-white/10 flex items-center justify-center p-8 text-center text-slate-400 dark:text-purple-100/30 text-sm font-semibold">
              Select a location hub pinpoint on the network map graph to inspect details.
            </div>
          )}
        </div>

      </div>
    </div>
  );
}