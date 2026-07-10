"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  MapPinIcon, 
  TruckIcon,
  PlusIcon,
  XMarkIcon,
  UserIcon,
  CheckCircleIcon,
  BuildingOfficeIcon,
  ArchiveBoxIcon
} from "@heroicons/react/24/outline";
import { cn } from "@/lib/utils";

// --- CORE TYPES ---
type Checkpoint = {
  id: string;
  hubId: string;
  name: string;
  status: "Pending" | "Cleared";
  pendingLoad?: string; // Derived from the DB based on attached suppliers
};

type RouteManifest = {
  id: string;
  title: string;
  vehiclePlate: string;
  driverName: string;
  checkpoints: Checkpoint[];
};

// Represents the data structure returned from your DB query
type ActiveHub = {
  id: string;
  name: string;
  suppliersWithLoad: number;
  totalPendingLoad: string;
};

export function RouteManager() {
  const [routes, setRoutes] = useState<RouteManifest[]>([
    {
      id: "RT-1001",
      title: "Nairobi Central Collection",
      vehiclePlate: "KDK 442Z",
      driverName: "John Doe",
      checkpoints: [
        { id: "cp-1", hubId: "HUB-NBO-CEN", name: "Nairobi Central Hub", status: "Cleared", pendingLoad: "45 Tons" },
        { id: "cp-2", hubId: "HUB-NBO-IND", name: "Industrial Area Hub", status: "Pending", pendingLoad: "12 Tons" }
      ]
    }
  ]);
  
  const [isPanelOpen, setIsPanelOpen] = useState(false);
  const [isDeploying, setIsDeploying] = useState(false);

  // Form State
  const [routeTitle, setRouteTitle] = useState("");
  const [selectedPlate, setSelectedPlate] = useState("");
  const [selectedDriver, setSelectedDriver] = useState("");
  
  // Database-driven Data States
  const [availableVehicles, setAvailableVehicles] = useState<any[]>([]);
  const [availableDrivers, setAvailableDrivers] = useState<any[]>([]);
  const [activeHubs, setActiveHubs] = useState<ActiveHub[]>([]);
  const [selectedHubs, setSelectedHubs] = useState<ActiveHub[]>([]);

  // Fetch Database Information (Vehicles, Drivers, and Hubs WITH loads)
  useEffect(() => {
    if (!isPanelOpen) return;
    
    const loadSystemData = async () => {
      try {
        const [vRes, dRes, hRes] = await Promise.all([
          fetch('/api/admin/fleet?status=Available'),
          fetch('/api/admin/users?role=driver'),
          // Your specific DB query: Only get hubs with relevant suppliers who have inventory
          fetch('/api/admin/hubs?hasPendingLoads=true') 
        ]);
        
        if (vRes.ok) setAvailableVehicles(await vRes.json());
        if (dRes.ok) setAvailableDrivers(await dRes.json());
        if (hRes.ok) setActiveHubs(await hRes.json());
      } catch (err) {
        // Mocking the database response for immediate UI preview
        // setAvailableVehicles([
        //   { plate: "KDK 442Z", capacity: "25 Tons" }, 
        //   { plate: "KDM 204P", capacity: "12 Tons" }
        // ]);
        // setAvailableDrivers([
        //   { _id: "1", name: "John Doe" }, 
        //   { _id: "2", name: "Jane Smith" }
        // ]);
        // setActiveHubs([
        //   { id: "HUB-NBO-CEN", name: "Nairobi Central Hub", suppliersWithLoad: 3, totalPendingLoad: "45 Tons" },
        //   { id: "HUB-NBO-IND", name: "Industrial Area Hub", suppliersWithLoad: 1, totalPendingLoad: "12 Tons" },
        //   { id: "HUB-KSM-01", name: "Kisumu Transit Hub", suppliersWithLoad: 2, totalPendingLoad: "28 Tons" }
        // ]);
      }
    };
    loadSystemData();
  }, [isPanelOpen]);

  const toggleHubSelection = (hub: ActiveHub) => {
    if (selectedHubs.some(h => h.id === hub.id)) {
      setSelectedHubs(prev => prev.filter(h => h.id !== hub.id));
    } else {
      setSelectedHubs(prev => [...prev, hub]);
    }
  };

  const handleClearCheckpoint = async (manifestId: string, checkpointId: string) => {
    try {
      const res = await fetch('/api/driver/checkpoint', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ manifestId, checkpointId })
      });

      if (res.ok) {
        const data = await res.json();
        if (data.manifest) setRoutes(prev => prev.map(r => r.id === manifestId ? data.manifest : r));
      } else {
        throw new Error("API Fallback");
      }
    } catch (err) {
      // Local Fallback Simulation
      setRoutes(prev => prev.map(route => {
        if (route.id !== manifestId) return route;
        return {
          ...route,
          checkpoints: route.checkpoints.map(cp => cp.id === checkpointId ? { ...cp, status: "Cleared" as const } : cp)
        };
      }));
    }
  };

  const handleSave = async () => {
    if (!routeTitle || selectedHubs.length === 0) {
      alert("Please provide a route name and select at least one hub checkpoint.");
      return;
    }

    setIsDeploying(true);
    
    // Map selected DB hubs into route checkpoints
    const mappedCheckpoints: Checkpoint[] = selectedHubs.map((hub, index) => ({
      id: `cp-${Math.random().toString(36).substring(2, 9)}`,
      hubId: hub.id,
      name: hub.name,
      status: "Pending",
      pendingLoad: hub.totalPendingLoad
    }));

    const payloadInstance = {
      title: routeTitle,
      vehiclePlate: selectedPlate || "Pending Assignment",
      driverName: selectedDriver || "Pending Assignment",
      checkpoints: mappedCheckpoints
    };

    try {
      const res = await fetch('/api/admin/manifests', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payloadInstance)
      });

      if (res.ok) {
        const data = await (await fetch('/api/admin/manifests')).json();
        setRoutes(data);
        resetFormFields();
      } else {
        throw new Error("API Save Fallback Triggered");
      }
    } catch (error) {
      // Fallback local append execution
      const localMock: RouteManifest = { id: `RT-${Math.floor(1000 + Math.random() * 9000)}`, ...payloadInstance };
      setRoutes([...routes, localMock]);
      resetFormFields();
    } finally {
      setIsDeploying(false);
    }
  };

  const resetFormFields = () => {
    setIsPanelOpen(false);
    setRouteTitle("");
    setSelectedPlate("");
    setSelectedDriver("");
    setSelectedHubs([]);
  };

  return (
    <div className="space-y-8 max-w-7xl mx-auto px-1">
      
      {/* --- PANEL SIDE DRAWOUT --- */}
      <AnimatePresence>
        {isPanelOpen && (
          <>
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={resetFormFields} className="fixed inset-0 bg-slate-900/40 dark:bg-black/60 backdrop-blur-sm z-[80]" />
            <motion.div 
              initial={{ x: "100%" }} animate={{ x: 0 }} exit={{ x: "100%" }}
              className="fixed right-0 top-0 bottom-0 h-full w-full max-w-xl bg-white dark:bg-[#0c061a] z-[90] p-6 sm:p-8 border-l border-slate-200 dark:border-white/10 overflow-y-auto shadow-2xl flex flex-col"
            >
              <div className="flex justify-between items-center mb-8 shrink-0">
                <div>
                  <h2 className="text-xl font-bold text-slate-900 dark:text-white">Plan Transit Route</h2>
                  <p className="text-xs text-slate-400 dark:text-purple-100/40 mt-1">Select hubs with pending supplier loads to create a route.</p>
                </div>
                <button onClick={resetFormFields} className="p-2 bg-slate-50 hover:bg-slate-100 dark:bg-white/5 dark:hover:bg-white/10 rounded-xl text-slate-400 dark:text-purple-100/50">
                  <XMarkIcon className="w-5 h-5 stroke-[2px]" />
                </button>
              </div>

              <div className="space-y-8 text-sm flex-1">
                
                {/* 1. Route Basics */}
                <div className="space-y-3">
                  <label className="text-xs font-bold text-slate-500 dark:text-slate-400 flex items-center gap-1.5">
                    1. Route Details
                  </label>
                  <input 
                    value={routeTitle} 
                    onChange={(e) => setRouteTitle(e.target.value)} 
                    className="w-full bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-xl p-3.5 font-medium text-slate-900 dark:text-white outline-none focus:border-emerald-500 transition-all" 
                    placeholder="Route Name (e.g. Nairobi Central Run)" 
                  />
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <select value={selectedPlate} onChange={(e) => setSelectedPlate(e.target.value)} className="w-full bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-xl p-3.5 font-medium text-slate-900 dark:text-white outline-none focus:border-emerald-500">
                      <option value="">Assign Vehicle (Optional)</option>
                      {availableVehicles.map((v: any) => <option key={v.plate} value={v.plate}>{v.plate} ({v.capacity})</option>)}
                    </select>
                    <select value={selectedDriver} onChange={(e) => setSelectedDriver(e.target.value)} className="w-full bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-xl p-3.5 font-medium text-slate-900 dark:text-white outline-none focus:border-emerald-500">
                      <option value="">Assign Driver (Optional)</option>
                      {availableDrivers.map((d: any) => <option key={d._id} value={d.name}>{d.name}</option>)}
                    </select>
                  </div>
                </div>

                {/* 2. Database-Driven Hub Selection */}
                <div className="space-y-3">
                  <div className="flex justify-between items-end">
                    <label className="text-xs font-bold text-slate-500 dark:text-slate-400 flex items-center gap-1.5">
                      <MapPinIcon className="w-4 h-4 text-blue-500" /> 2. Delivery Stops & Points
                    </label>
                    <span className="text-[10px] font-bold text-slate-400">
                      Showing Hubs with Active Inventory
                    </span>
                  </div>
                  
                  <div className="space-y-2 max-h-96 overflow-y-auto pr-1">
                    {activeHubs.length === 0 ? (
                      <div className="p-6 text-center text-slate-400 border border-dashed border-slate-200 dark:border-white/10 rounded-xl">
                        No hubs currently have pending inventory.
                      </div>
                    ) : (
                      activeHubs.map((hub) => {
                        const isSelected = selectedHubs.some(h => h.id === hub.id);
                        return (
                          <div 
                            key={hub.id}
                            onClick={() => toggleHubSelection(hub)}
                            className={cn(
                              "flex items-center justify-between p-4 rounded-xl border cursor-pointer transition-all",
                              isSelected 
                                ? "bg-emerald-50 dark:bg-emerald-500/10 border-emerald-500 shadow-sm" 
                                : "bg-white dark:bg-white/5 border-slate-200 dark:border-white/10 hover:border-slate-300 dark:hover:border-white/20"
                            )}
                          >
                            <div className="flex items-center gap-3">
                              <div className={cn(
                                "w-5 h-5 rounded-md border flex items-center justify-center shrink-0 transition-colors",
                                isSelected ? "bg-emerald-500 border-emerald-500 text-white" : "border-slate-300 dark:border-slate-600 bg-transparent"
                              )}>
                                {isSelected && <CheckCircleIcon className="w-3.5 h-3.5 stroke-[3px]" />}
                              </div>
                              <div>
                                <p className={cn("text-sm font-bold", isSelected ? "text-emerald-900 dark:text-emerald-300" : "text-slate-900 dark:text-white")}>
                                  {hub.name}
                                </p>
                                <p className="text-[10px] text-slate-500 dark:text-slate-400 font-medium mt-0.5 flex items-center gap-2">
                                  <span>{hub.suppliersWithLoad} Suppliers ready</span>
                                  <span>•</span>
                                  <span className="flex items-center gap-1 text-emerald-600 dark:text-emerald-400">
                                    <ArchiveBoxIcon className="w-3 h-3" /> {hub.totalPendingLoad}
                                  </span>
                                </p>
                              </div>
                            </div>
                          </div>
                        );
                      })
                    )}
                  </div>
                </div>

              </div>
              
              <div className="pt-6 mt-auto">
                <button 
                  disabled={isDeploying || selectedHubs.length === 0}
                  onClick={handleSave} 
                  className={cn(
                    "w-full py-4 rounded-xl font-bold text-xs uppercase transition-all shadow-md",
                    isDeploying || selectedHubs.length === 0 
                      ? "bg-slate-300 dark:bg-white/10 text-slate-400 cursor-not-allowed" 
                      : "bg-emerald-600 hover:bg-emerald-500 text-white shadow-emerald-600/10"
                  )}
                >
                  {isDeploying ? "Deploying..." : `Activate Route with ${selectedHubs.length} Stops`}
                </button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* --- DASHBOARD HEADER --- */}
      <header className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-slate-50 dark:bg-white/[0.02] p-5 sm:p-6 border border-slate-200 dark:border-white/10 rounded-2xl">
        <div>
          <h1 className="text-2xl font-extrabold tracking-tight text-slate-900 dark:text-white">Active Transit Routes</h1>
          <p className="text-slate-500 dark:text-purple-100/50 text-xs font-medium mt-0.5">Track transit checkpoints tied directly to database inventory.</p>
        </div>
        <button onClick={() => setIsPanelOpen(true)} className="flex items-center justify-center gap-2 px-5 py-3 bg-slate-900 dark:bg-white text-white dark:text-slate-950 hover:bg-slate-800 dark:hover:bg-slate-100 rounded-xl font-bold text-xs transition-all shadow-sm">
          <PlusIcon className="w-4 h-4 stroke-[2.5px]" /> Plan New Transit Route
        </button>
      </header>

      {/* --- ROUTE CARDS --- */}
      <div className="space-y-4">
        {routes.map((route) => (
          <div key={route.id} className="rounded-2xl border border-slate-200 dark:border-white/10 bg-white dark:bg-white/[0.02] hover:border-slate-300 dark:hover:border-white/20 shadow-sm transition-all overflow-hidden p-5 sm:p-6">
            <div className="flex flex-col md:flex-row md:items-start justify-between gap-6">
              
              <div className="md:w-1/3 space-y-4">
                <div>
                  <div className="inline-flex px-2 py-0.5 rounded-md bg-slate-100 dark:bg-white/5 text-[10px] font-bold tracking-wider text-slate-500 dark:text-purple-100/60 uppercase mb-2">
                    Code: {route.id}
                  </div>
                  <h3 className="text-lg font-bold text-slate-900 dark:text-white tracking-tight leading-snug">
                    {route.title}
                  </h3>
                </div>
                <div className="grid grid-cols-2 gap-2">
                  <div className="p-3 rounded-xl bg-slate-50 dark:bg-white/[0.01] border border-slate-100 dark:border-white/5 flex items-center gap-2.5">
                    <TruckIcon className="w-4 h-4 text-slate-400 shrink-0" />
                    <div className="min-w-0">
                      <p className="text-[10px] text-slate-400 font-medium uppercase">Vehicle</p>
                      <p className="text-xs font-bold text-slate-800 dark:text-purple-100 truncate">{route.vehiclePlate}</p>
                    </div>
                  </div>
                  <div className="p-3 rounded-xl bg-slate-50 dark:bg-white/[0.01] border border-slate-100 dark:border-white/5 flex items-center gap-2.5">
                    <UserIcon className="w-4 h-4 text-slate-400 shrink-0" />
                    <div className="min-w-0">
                      <p className="text-[10px] text-slate-400 font-medium uppercase">Driver</p>
                      <p className="text-xs font-bold text-slate-800 dark:text-purple-100 truncate">{route.driverName}</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="md:w-2/3 flex flex-col justify-center">
                <div className="text-[11px] font-bold uppercase tracking-wider text-slate-400 dark:text-purple-100/40 mb-4">
                  Hub Checkpoints & Pending Loads
                </div>
                
                <div className="space-y-4 relative">
                  {route.checkpoints.map((cp, idx) => {
                    const isCleared = cp.status === "Cleared";
                    return (
                      <div key={cp.id} className="flex items-center justify-between group/cp relative">
                        <div className="flex items-center gap-3">
                          <button 
                            type="button"
                            onClick={() => handleClearCheckpoint(route.id, cp.id)}
                            disabled={isCleared}
                            className={cn(
                              "h-5 w-5 rounded-full border flex items-center justify-center shrink-0 transition-all z-10",
                              isCleared 
                                ? "bg-emerald-500 border-emerald-500 text-white cursor-default" 
                                : "border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-400 hover:border-emerald-500 dark:hover:border-emerald-400"
                            )}
                          >
                            {isCleared ? <CheckCircleIcon className="w-3.5 h-3.5 stroke-[2.5px]" /> : <span className="text-[9px] font-bold">{idx + 1}</span>}
                          </button>
                          <div>
                            <span className={cn(
                              "text-xs font-semibold transition-colors block", 
                              isCleared ? "text-slate-400 line-through decoration-slate-300 dark:decoration-slate-700" : "text-slate-700 dark:text-purple-100"
                            )}>
                              {cp.name}
                            </span>
                            {cp.pendingLoad && !isCleared && (
                              <span className="text-[10px] text-slate-400 font-medium flex items-center gap-1 mt-0.5">
                                <ArchiveBoxIcon className="w-3 h-3" /> Fetching {cp.pendingLoad}
                              </span>
                            )}
                          </div>
                        </div>

                        {!isCleared && (
                          <button 
                            onClick={() => handleClearCheckpoint(route.id, cp.id)}
                            className="text-[10px] font-bold text-emerald-600 dark:text-emerald-400 opacity-80 hover:opacity-100 md:opacity-0 group-hover/cp:opacity-100 transition-opacity"
                          >
                            Mark Hub Cleared
                          </button>
                        )}

                        {idx < route.checkpoints.length - 1 && (
                          <div className={cn(
                            "absolute h-8 w-[1.5px] left-[9px] top-[19px] z-0",
                            isCleared && route.checkpoints[idx + 1].status === "Cleared" ? "bg-emerald-500" : "bg-slate-200 dark:bg-white/10"
                          )} />
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>

            </div>
          </div>
        ))}
      </div>

    </div>
  );
}