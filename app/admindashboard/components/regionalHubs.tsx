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
  CircleStackIcon,
  UserGroupIcon,
  ArrowPathIcon
} from "@heroicons/react/24/outline";
import { cn } from "@/lib/utils";

type HubLocation = {
  country: string;
  city: string;
  neighborhood: string;
  phase: string;
};

type SupplierNode = {
  _id: string;
  name: string;
  email: string;
};

type Hub = {
  id: string;
  name: string;
  location: HubLocation;
  load: number;
  status: "Optimal" | "Maintenance" | "Near Capacity";
  coords: { x: string; y: string };
  supplierIds?: string[];
};

export function Hubs() {
  const [hubs, setHubs] = useState<Hub[]>([]);
  const [suppliers, setSuppliers] = useState<SupplierNode[]>([]);
  const [selectedHub, setSelectedHub] = useState<Hub | null>(null);
  const [selectedSupplierIds, setSelectedSupplierIds] = useState<string[]>([]);
  const [isPanelOpen, setIsPanelOpen] = useState(false);
  const [editingHub, setEditingHub] = useState<Hub | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);

  // --- Fetch Core Data ---
  async function fetchNetworkData() {
    try {
      const [hubsRes, suppliersRes] = await Promise.all([
        fetch('/api/admin/hubs'),
        fetch('/api/admin/users?role=supplier')
      ]);
      
      const hubsData = await hubsRes.json();
      const suppliersData = await suppliersRes.json();

      if (Array.isArray(hubsData)) {
        setHubs(hubsData);
        if (hubsData.length > 0) {
          // Keep current selection if refreshing, otherwise default to first item
          setSelectedHub(prev => hubsData.find(h => h.id === prev?.id) || hubsData[0]);
        } else {
          setSelectedHub(null);
        }
      }
      if (Array.isArray(suppliersData)) {
        setSuppliers(suppliersData);
      }
    } catch (err) {
      console.error("Failed to load hub or supplier data", err);
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    fetchNetworkData();
  }, []);

  // --- Synchronize Form State ---
  useEffect(() => {
    if (editingHub) {
      setSelectedSupplierIds(editingHub.supplierIds || []);
    } else {
      setSelectedSupplierIds([]);
    }
  }, [editingHub, isPanelOpen]);

  const toggleSupplierSelection = (id: string) => {
    setSelectedSupplierIds(prev => 
      prev.includes(id) ? prev.filter(item => item !== id) : [...prev, id]
    );
  };

  const handleSaveHub = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSaving(true);
    const formData = new FormData(e.currentTarget);
    
    const hubPayload = {
      name: formData.get("name"),
      status: formData.get("status"),
      load: Number(formData.get("load")),
      country: formData.get("country"),
      city: formData.get("city"),
      neighborhood: formData.get("neighborhood"),
      phase: formData.get("phase"),
      supplierIds: selectedSupplierIds,
      coords: editingHub?.coords || null // API handles automatic creation coordinates if null
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
        await fetchNetworkData();
        closePanel();
      } else {
        alert("Could not update hub information. Please double check values.");
      }
    } catch (err) {
      alert("Something went wrong connecting to the database.");
    } finally {
      setIsSaving(false);
    }
  };

  const deleteHub = async (id: string) => {
    if (!confirm("Are you sure you want to shut down and completely remove this distribution center?")) return;

    try {
      const res = await fetch(`/api/admin/hubs/${id}`, { method: 'DELETE' });
      if (res.ok) {
        const filtered = hubs.filter(h => h.id !== id);
        setHubs(filtered);
        if (selectedHub?.id === id) {
          setSelectedHub(filtered[0] || null);
        }
      } else {
        alert("Failed to delete the chosen hub.");
      }
    } catch (err) {
      console.error("Delete request failed:", err);
    }
  };

  const openPanel = (hub?: Hub) => {
    setEditingHub(hub || null);
    setIsPanelOpen(true);
  };

  const closePanel = () => {
    setIsPanelOpen(false);
    setEditingHub(null);
    setSelectedSupplierIds([]);
  };

  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[400px] p-12 space-y-4">
        <div className="h-10 w-10 animate-spin rounded-full border-4 border-emerald-500 border-t-transparent" />
        <div className="text-xs font-bold tracking-widest text-slate-400 dark:text-slate-500 animate-pulse">
          LOADING YOUR HUB NETWORK...
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
      
      {/* --- FORM PANEL SIDE SHEET --- */}
      <AnimatePresence>
        {isPanelOpen && (
          <>
            <motion.div 
              initial={{ opacity: 0 }} 
              animate={{ opacity: 1 }} 
              exit={{ opacity: 0 }} 
              onClick={closePanel} 
              className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm z-[80]" 
            />
            <motion.div 
              initial={{ x: "100%" }} 
              animate={{ x: 0 }} 
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 28, stiffness: 240 }}
              className="fixed right-0 top-0 bottom-0 h-full w-full max-w-md bg-white dark:bg-slate-900 z-[90] p-6 sm:p-8 shadow-2xl border-l border-slate-200 dark:border-slate-800 overflow-y-auto"
            >
              <div className="flex justify-between items-center mb-6">
                <div>
                  <h2 className="text-xl font-bold text-slate-900 dark:text-white">
                    {editingHub ? "Update Hub Details" : "Register New Hub"}
                  </h2>
                  <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                    Set location parameters and link production suppliers.
                  </p>
                </div>
                <button onClick={closePanel} className="p-2 bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-500 dark:text-slate-400 rounded-xl transition-colors">
                  <XMarkIcon className="w-5 h-5" />
                </button>
              </div>

              <form onSubmit={handleSaveHub} className="space-y-6 text-sm">
                <div className="space-y-3">
                  <label className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider">
                    General Information
                  </label>
                  <input 
                    name="name" 
                    placeholder="Hub Name (e.g., Nairobi Central)" 
                    defaultValue={editingHub?.name} 
                    required 
                    className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl p-3 font-medium text-slate-800 dark:text-white placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all" 
                  />
                  
                  <div className="grid grid-cols-2 gap-3">
                    <input name="country" placeholder="Country" defaultValue={editingHub?.location.country} required className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl p-3 font-medium text-slate-800 dark:text-white placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all" />
                    <input name="city" placeholder="City" defaultValue={editingHub?.location.city} required className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl p-3 font-medium text-slate-800 dark:text-white placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all" />
                    <input name="neighborhood" placeholder="Neighborhood / Area" defaultValue={editingHub?.location.neighborhood} className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl p-3 font-medium text-slate-800 dark:text-white placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all" />
                    <input name="phase" placeholder="Street / Phase / Building" defaultValue={editingHub?.location.phase} className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl p-3 font-medium text-slate-800 dark:text-white placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all" />
                  </div>
                </div>

                <div className="space-y-3">
                  <label className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider">
                    Current Capacity & Status
                  </label>
                  <div className="relative">
                    <input 
                      name="load" 
                      type="number" 
                      min="0" 
                      max="100" 
                      placeholder="Storage Capacity Used" 
                      defaultValue={editingHub?.load} 
                      className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl p-3 pr-8 font-medium text-slate-800 dark:text-white placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all" 
                    />
                    <span className="absolute right-3 top-3 text-slate-400 font-bold">%</span>
                  </div>
                  <select 
                    name="status" 
                    defaultValue={editingHub?.status || "Optimal"} 
                    className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl p-3 font-medium text-slate-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all"
                  >
                    <option value="Optimal">Optimal (Working Great)</option>
                    <option value="Maintenance">Maintenance (Under Repair)</option>
                    <option value="Near Capacity">Near Capacity (Almost Full)</option>
                  </select>
                </div>

                {/* --- ASSIGN SUPPLIERS CHECKLIST --- */}
                <div className="space-y-3">
                  <label className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider flex items-center gap-1.5">
                    <UserGroupIcon className="w-4 h-4 text-emerald-500" /> Link Production Suppliers
                  </label>
                  <div className="max-h-40 overflow-y-auto rounded-xl border border-slate-200 dark:border-slate-800 p-2 space-y-1 bg-slate-50/50 dark:bg-slate-950/50">
                    {suppliers.length === 0 ? (
                      <p className="text-xs text-slate-400 p-3 italic text-center">No active suppliers found in system.</p>
                    ) : (
                      suppliers.map((sup) => {
                        const isChecked = selectedSupplierIds.includes(sup._id);
                        return (
                          <div 
                            key={sup._id}
                            onClick={() => toggleSupplierSelection(sup._id)}
                            className={cn(
                              "flex items-center gap-3 p-2 rounded-lg cursor-pointer transition-all border text-xs font-medium",
                              isChecked 
                                ? "bg-emerald-50 dark:bg-emerald-500/10 text-emerald-900 dark:text-emerald-300 border-emerald-200 dark:border-emerald-500/30" 
                                : "hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-300 border-transparent"
                            )}
                          >
                            <input 
                              type="checkbox"
                              checked={isChecked}
                              onChange={() => {}} // Event handled by click bubble wrapper
                              className="rounded border-slate-300 text-emerald-600 focus:ring-emerald-500 h-4 w-4 cursor-pointer accent-emerald-500"
                            />
                            <div className="truncate">
                              <p className="font-bold text-slate-800 dark:text-slate-100 truncate">{sup.name}</p>
                              <p className="text-[11px] text-slate-400 dark:text-slate-500 truncate">{sup.email}</p>
                            </div>
                          </div>
                        );
                      })
                    )}
                  </div>
                </div>

                <button 
                  type="submit" 
                  disabled={isSaving}
                  className="w-full py-3 bg-emerald-600 hover:bg-emerald-500 disabled:bg-slate-300 text-white rounded-xl font-bold transition-all shadow-md shadow-emerald-600/10 flex items-center justify-center gap-2"
                >
                  {isSaving && <ArrowPathIcon className="w-4 h-4 animate-spin" />}
                  {editingHub ? "Save Operational Changes" : "Deploy Distribution Hub"}
                </button>
              </form>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* --- DASHBOARD HEADER --- */}
      <header className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm">
        <div className="space-y-1">
          <h1 className="text-2xl sm:text-3xl font-black tracking-tight text-slate-900 dark:text-white">
            Distribution Network Map
          </h1>
          <p className="text-slate-500 dark:text-slate-400 text-sm font-medium flex items-center gap-2">
            <GlobeAltIcon className="w-4 h-4 text-emerald-500 shrink-0" />
            Currently supervising <span className="text-slate-900 dark:text-white font-bold">{hubs.length} active warehouses</span>.
          </p>
        </div>
        
        <button 
          onClick={() => openPanel()}
          className="flex items-center justify-center gap-2 px-5 py-3 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl font-bold text-sm transition-all shadow-md shadow-emerald-600/10 self-start sm:self-auto"
        >
          <PlusIcon className="w-5 h-5 stroke-[2.5]" /> Add Storage Hub
        </button>
      </header>

      {/* --- MAIN MAIN DISPLAY PLATFORM --- */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* --- LEFT: VISUAL MAP TARGET REFERENCE --- */}
        <div className="lg:col-span-2 relative aspect-[4/3] sm:aspect-[16/10] bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-2xl overflow-hidden shadow-inner flex items-center justify-center">
          {/* Map Dot grid Background */}
          <div 
            className="absolute inset-0 opacity-[0.25] dark:opacity-[0.15] pointer-events-none" 
            style={{ backgroundImage: 'radial-gradient(#64748b 1.5px, transparent 1.5px)', backgroundSize: '24px 24px' }} 
          />
          
          {hubs.length === 0 ? (
            <div className="text-center p-6 max-w-sm text-slate-400">
              <MapPinIcon className="w-8 h-8 mx-auto mb-2 opacity-50 text-slate-400" />
              <p className="text-sm font-semibold">No operational nodes active inside system. Register one above!</p>
            </div>
          ) : (
            hubs.map((hub) => {
              const isSelected = selectedHub?.id === hub.id;
              
              // Select color badges based on state parameters 
              let statusBg = "bg-emerald-500";
              if (hub.status === "Near Capacity") statusBg = "bg-amber-500";
              if (hub.status === "Maintenance") statusBg = "bg-blue-500";

              return (
                <button
                  key={hub.id}
                  onClick={() => setSelectedHub(hub)}
                  className="absolute z-20 -translate-x-1/2 -translate-y-1/2 group p-2 focus:outline-none"
                  style={{ left: hub.coords?.x || "50%", top: hub.coords?.y || "50%" }}
                >
                  <div className="relative flex items-center justify-center">
                    {/* Pulsing ring indicator */}
                    <span className={cn(
                      "absolute inline-flex h-10 w-10 rounded-full opacity-30 animate-ping duration-1000",
                      isSelected ? statusBg : "bg-transparent pointer-events-none"
                    )} />
                    
                    {/* Main Inner Node */}
                    <div className={cn(
                      "h-6 w-6 rounded-full border-2 flex items-center justify-center shadow-md transition-all duration-300",
                      isSelected 
                        ? "bg-white dark:bg-slate-900 scale-120 border-slate-900 dark:border-white shadow-xl" 
                        : "bg-white dark:bg-slate-800 border-slate-300 dark:border-slate-700 hover:border-slate-500"
                    )}>
                      <div className={cn("h-2 w-2 rounded-full", statusBg)} />
                    </div>

                    {/* Quick Floating Tooltip title label */}
                    <div className={cn(
                      "absolute top-8 bg-slate-900 text-white dark:bg-white dark:text-slate-950 text-[10px] font-bold px-2 py-0.5 rounded shadow-md whitespace-nowrap z-30 transition-opacity",
                      isSelected ? "opacity-100" : "opacity-0 group-hover:opacity-100"
                    )}>
                      {hub.name} ({hub.load}%)
                    </div>
                  </div>
                </button>
              );
            })
          )}
          
          <div className="absolute bottom-4 left-4 bg-white/90 dark:bg-slate-900/90 backdrop-blur px-3 py-1.5 rounded-xl border border-slate-200 dark:border-slate-800 text-[11px] font-bold text-slate-500 dark:text-slate-400 shadow-sm">
            Interactive Network Coordinates
          </div>
        </div>

        {/* --- RIGHT: SIDE-BAR DETAILED MANAGER READOUT --- */}
        <div className="flex flex-col">
          {selectedHub ? (
            <AnimatePresence mode="wait">
              <motion.div
                key={selectedHub.id}
                initial={{ opacity: 0, y: 8 }} 
                animate={{ opacity: 1, y: 0 }} 
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.15 }}
                className="p-6 sm:p-8 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-sm flex-1 flex flex-col justify-between"
              >
                <div>
                  {/* Structural Breadcrumbs route */}
                  <div className="flex items-center gap-1 text-[11px] font-bold uppercase tracking-wider text-emerald-600 dark:text-emerald-400 mb-3">
                    <span>{selectedHub.location.country}</span>
                    <ChevronRightIcon className="w-2 h-2 stroke-[3.5]" />
                    <span>{selectedHub.location.city}</span>
                    <ChevronRightIcon className="w-2 h-2 stroke-[3.5]" />
                    <span className="text-slate-400 dark:text-slate-500 truncate">{selectedHub.location.neighborhood}</span>
                  </div>

                  {/* Main Title Head */}
                  <div className="flex justify-between items-start gap-4 mb-6">
                    <div>
                      <h3 className="text-2xl font-black text-slate-900 dark:text-white tracking-tight leading-tight">
                        {selectedHub.name}
                      </h3>
                      <div className="flex items-center gap-1.5 text-slate-400 dark:text-slate-500 mt-1">
                        <MapPinIcon className="w-4 h-4 shrink-0" />
                        <span className="text-xs font-semibold">{selectedHub.location.phase || "Main Office"}</span>
                      </div>
                    </div>
                    
                    {/* Management Actions Group */}
                    <div className="flex gap-2 shrink-0">
                      <button 
                        onClick={() => openPanel(selectedHub)} 
                        className="p-2.5 bg-slate-50 hover:bg-slate-100 dark:bg-slate-800 dark:hover:bg-slate-700 rounded-xl text-slate-500 dark:text-slate-400 hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors border border-slate-100 dark:border-transparent"
                        title="Edit parameters"
                      >
                        <PencilSquareIcon className="w-4 h-4 stroke-[2]" />
                      </button>
                      <button 
                        onClick={() => deleteHub(selectedHub.id)} 
                        className="p-2.5 bg-slate-50 hover:bg-slate-100 dark:bg-slate-800 dark:hover:bg-slate-700 rounded-xl text-slate-500 dark:text-slate-400 hover:text-red-500 dark:hover:text-red-400 transition-colors border border-slate-100 dark:border-transparent"
                        title="Decommission hub"
                      >
                        <TrashIcon className="w-4 h-4 stroke-[2]" />
                      </button>
                    </div>
                  </div>

                  {/* Progress Load Meter Layout */}
                  <div className="space-y-2 p-4 bg-slate-50 dark:bg-slate-950 border border-slate-100 dark:border-slate-800 rounded-xl mb-6">
                    <div className="flex justify-between items-center text-xs font-bold">
                      <span className="text-slate-500 dark:text-slate-400 flex items-center gap-1.5">
                        <CircleStackIcon className="w-4 h-4 text-slate-400" /> Space Used
                      </span>
                      <span className={cn(
                        "font-bold",
                        selectedHub.load > 85 ? "text-amber-500" : "text-emerald-500"
                      )}>{selectedHub.load}% Filled</span>
                    </div>
                    <div className="h-2 w-full bg-slate-200 dark:bg-slate-800 rounded-full overflow-hidden">
                      <motion.div 
                        initial={{ width: 0 }} 
                        animate={{ width: `${selectedHub.load}%` }}
                        transition={{ duration: 0.5, ease: "easeOut" }}
                        className={cn(
                          "h-full rounded-full", 
                          selectedHub.load > 85 ? "bg-amber-500" : "bg-emerald-500"
                        )} 
                      />
                    </div>
                  </div>

                  {/* Linked Suppliers Section */}
                  <div className="space-y-2.5 mb-6">
                    <h4 className="text-[11px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider flex items-center gap-1.5">
                      <UserGroupIcon className="w-4 h-4 text-slate-400" /> Assigned Suppliers ({selectedHub.supplierIds?.length || 0})
                    </h4>
                    <div className="flex flex-wrap gap-1.5 max-h-28 overflow-y-auto pr-1">
                      {!selectedHub.supplierIds || selectedHub.supplierIds.length === 0 ? (
                        <span className="text-xs text-slate-400 dark:text-slate-500 italic bg-slate-50 dark:bg-slate-950 border border-dashed border-slate-200 dark:border-slate-800 rounded-xl p-3 w-full text-center">
                          No production partners assigned here yet.
                        </span>
                      ) : (
                        selectedHub.supplierIds.map((id) => {
                          const matchingSup = suppliers.find(s => s._id === id);
                          return (
                            <span 
                              key={id} 
                              className="inline-flex flex-col text-xs px-3 py-1.5 rounded-xl bg-slate-50 dark:bg-slate-950 text-slate-700 dark:text-slate-300 border border-slate-200/60 dark:border-slate-800 max-w-full truncate"
                              title={matchingSup?.email}
                            >
                              <span className="font-bold text-slate-800 dark:text-slate-200 truncate">
                                {matchingSup?.name || "Independent Supplier"}
                              </span>
                              {matchingSup?.email && (
                                <span className="text-[10px] text-slate-400 dark:text-slate-500 font-medium truncate">
                                  {matchingSup.email}
                                </span>
                              )}
                            </span>
                          );
                        })
                      )}
                    </div>
                  </div>

                  {/* Status Badges Info Grid */}
                  <div className="grid grid-cols-2 gap-3">
                     <div className="p-3 bg-slate-50 dark:bg-slate-950 border border-slate-100 dark:border-slate-800 rounded-xl">
                        <p className="text-[10px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider mb-0.5">Health Status</p>
                        <p className={cn(
                          "font-bold text-xs uppercase tracking-tight",
                          selectedHub.status === "Optimal" && "text-emerald-600 dark:text-emerald-400",
                          selectedHub.status === "Maintenance" && "text-blue-500",
                          selectedHub.status === "Near Capacity" && "text-amber-500"
                        )}>{selectedHub.status}</p>
                     </div>
                     <div className="p-3 bg-slate-50 dark:bg-slate-950 border border-slate-100 dark:border-slate-800 rounded-xl">
                        <p className="text-[10px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider mb-0.5">Reference ID</p>
                        <p className="font-mono text-xs font-bold text-slate-600 dark:text-slate-400 truncate">{selectedHub.id}</p>
                     </div>
                  </div>
                </div>

                <div className="mt-6 pt-4 border-t border-slate-100 dark:border-slate-800 text-[11px] text-slate-400 dark:text-slate-500 font-medium text-center">
                  Click alternative pinpoints on the map canvas to view alternative hubs.
                </div>
              </motion.div>
            </AnimatePresence>
          ) : (
            <div className="h-full min-h-[300px] rounded-2xl border-2 border-dashed border-slate-200 dark:border-slate-800 flex flex-col items-center justify-center p-8 text-center text-slate-400 dark:text-slate-500 text-sm font-medium bg-slate-50/20 dark:bg-slate-950/10">
              <MapPinIcon className="w-6 h-6 mb-2 text-slate-300 dark:text-slate-700 stroke-[2.5]" />
              Choose a pin location on the left grid map graph to display metrics.
            </div>
          )}
        </div>

      </div>
    </div>
  );
}