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
  pendingLoad?: string;
};

type RouteManifest = {
  id: string;
  title: string;
  vehiclePlate: string;
  driverName: string;
  checkpoints: Checkpoint[];
};

type ActiveHub = {
  id: string;
  name: string;
  suppliersWithLoad: number;
  totalPendingLoad: string;
};

export function RouteManager() {
  // Initial states pre-populated with high-fidelity live mock examples for immediate presentation
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
    },
    {
      id: "RT-1082",
      title: "Western Kenya Highway Run",
      vehiclePlate: "KDM 204P",
      driverName: "Jane Smith",
      checkpoints: [
        { id: "cp-3", hubId: "HUB-KSM-01", name: "Kisumu Transit Hub", status: "Pending", pendingLoad: "28 Tons" }
      ]
    }
  ]);
  
  const [isPanelOpen, setIsPanelOpen] = useState(false);
  const [isDeploying, setIsDeploying] = useState(false);

  // Form States
  const [routeTitle, setRouteTitle] = useState("");
  const [selectedPlate, setSelectedPlate] = useState("");
  const [selectedDriver, setSelectedDriver] = useState("");
  
  // Database-driven Data States
  const [availableVehicles, setAvailableVehicles] = useState<any[]>([
    { plate: "KDK 442Z", capacity: "25 Tons" }, 
    { plate: "KDM 204P", capacity: "12 Tons" },
    { plate: "KCD 881X", capacity: "30 Tons" }
  ]);
  const [availableDrivers, setAvailableDrivers] = useState<any[]>([
    { _id: "1", name: "John Doe" }, 
    { _id: "2", name: "Jane Smith" },
    { _id: "3", name: "David Kiprop" }
  ]);
  const [activeHubs, setActiveHubs] = useState<ActiveHub[]>([
    { id: "HUB-NBO-CEN", name: "Nairobi Central Hub", suppliersWithLoad: 3, totalPendingLoad: "45 Tons" },
    { id: "HUB-NBO-IND", name: "Industrial Area Hub", suppliersWithLoad: 1, totalPendingLoad: "12 Tons" },
    { id: "HUB-KSM-01", name: "Kisumu Transit Hub", suppliersWithLoad: 2, totalPendingLoad: "28 Tons" },
    { id: "HUB-MSA-04", name: "Mombasa Port Depot", suppliersWithLoad: 5, totalPendingLoad: "82 Tons" }
  ]);
  const [selectedHubs, setSelectedHubs] = useState<ActiveHub[]>([]);

  // Async API Integration Hook
  useEffect(() => {
    const loadSystemData = async () => {
      try {
        const [vRes, dRes, hRes, manifestRes] = await Promise.all([
          fetch('/api/admin/fleet?status=Available'),
          fetch('/api/admin/users?role=driver'),
          fetch('/api/admin/hubs?hasPendingLoads=true'),
          fetch('/api/admin/manifest')
        ]);
        
        if (vRes.ok) setAvailableVehicles(await vRes.json());
        if (dRes.ok) setAvailableDrivers(await dRes.json());
        if (hRes.ok) setActiveHubs(await hRes.json());
        if (manifestRes.ok) setRoutes(await manifestRes.json());
      } catch (err) {
        // Fallback to active mock states cleanly if endpoints are unmapped
        console.log("Using rich system fallbacks for presentation mapping.");
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
        throw new Error("Local Patch Override Triggered");
      }
    } catch (err) {
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
    if (!routeTitle.trim()) {
      alert("Please provide a recognizable Route Title descriptive name.");
      return;
    }
    if (selectedHubs.length === 0) {
      alert("Please select at least one hub target stop location.");
      return;
    }

    setIsDeploying(true);
    
    const mappedCheckpoints: Checkpoint[] = selectedHubs.map((hub) => ({
      id: `cp-${Math.random().toString(36).substring(2, 9)}`,
      hubId: hub.id,
      name: hub.name,
      status: "Pending",
      pendingLoad: hub.totalPendingLoad
    }));

    const payloadInstance = {
      title: routeTitle,
      vehiclePlate: selectedPlate || "Pending Assignment",
      driverName: selectedDriver || "Unassigned Operator",
      checkpoints: mappedCheckpoints
    };

    try {
      const res = await fetch('/api/admin/manifest', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payloadInstance)
      });

      if (res.ok) {
        const data = await (await fetch('/api/admin/manifest')).json();
        setRoutes(data);
        resetFormFields();
      } else {
        throw new Error("Local Push Fallback");
      }
    } catch (error) {
      const localMock: RouteManifest = { 
        id: `RT-${Math.floor(1000 + Math.random() * 9000)}`, 
        ...payloadInstance 
      };
      setRoutes([localMock, ...routes]);
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
    <div className="space-y-6 max-w-6xl mx-auto px-4 py-4">
      
      {/* --- DRAW PANEL --- */}
      <AnimatePresence>
        {isPanelOpen && (
          <>
            <motion.div 
              initial={{ opacity: 0 }} 
              animate={{ opacity: 1 }} 
              exit={{ opacity: 0 }} 
              onClick={resetFormFields} 
              className="fixed inset-0 bg-slate-900/40 dark:bg-black/60 backdrop-blur-xs z-50" 
            />
            <motion.div 
              initial={{ x: "100%" }} 
              animate={{ x: 0 }} 
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="fixed right-0 top-0 bottom-0 h-full w-full max-w-lg bg-white dark:bg-slate-900 z-50 p-6 sm:p-8 border-l border-slate-200 dark:border-slate-800 overflow-y-auto shadow-xl flex flex-col"
            >
              <div className="flex justify-between items-center mb-6 shrink-0">
                <div>
                  <h2 className="text-lg font-bold text-slate-900 dark:text-white">Plan Logistics Route</h2>
                  <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">Assign vehicles and consolidate active point-to-point transfers.</p>
                </div>
                <button onClick={resetFormFields} className="p-2 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg text-slate-400 transition-colors">
                  <XMarkIcon className="w-5 h-5" />
                </button>
              </div>

              <div className="space-y-6 text-sm flex-1">
                {/* Section 1: Descriptors */}
                <div className="space-y-3">
                  <label className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider">
                    1. Identity & Crew Setup
                  </label>
                  <input 
                    value={routeTitle} 
                    onChange={(e) => setRouteTitle(e.target.value)} 
                    className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl p-3 text-sm font-medium text-slate-900 dark:text-white outline-hidden focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 transition-all" 
                    placeholder="Route Assignment Name (e.g., Mombasa Express Line)" 
                  />
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <select value={selectedPlate} onChange={(e) => setSelectedPlate(e.target.value)} className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl p-3 text-sm text-slate-800 dark:text-slate-200 outline-hidden focus:border-emerald-500">
                      <option value="">Select Transport Vehicle</option>
                      {availableVehicles.map((v: any) => <option key={v.plate} value={v.plate}>{v.plate} ({v.capacity})</option>)}
                    </select>
                    <select value={selectedDriver} onChange={(e) => setSelectedDriver(e.target.value)} className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl p-3 text-sm text-slate-800 dark:text-slate-200 outline-hidden focus:border-emerald-500">
                      <option value="">Assign Logistics Driver</option>
                      {availableDrivers.map((d: any) => <option key={d._id} value={d.name}>{d.name}</option>)}
                    </select>
                  </div>
                </div>

                {/* Section 2: Interactive Stop Targets */}
                <div className="space-y-3">
                  <div className="flex justify-between items-end">
                    <label className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider flex items-center gap-1.5">
                      <MapPinIcon className="w-4 h-4 text-emerald-500" /> 2. Select Active Waypoints
                    </label>
                  </div>
                  
                  <div className="space-y-2 max-h-80 overflow-y-auto pr-1 divide-y-0">
                    {activeHubs.map((hub) => {
                      const isSelected = selectedHubs.some(h => h.id === hub.id);
                      return (
                        <div 
                          key={hub.id}
                          onClick={() => toggleHubSelection(hub)}
                          className={cn(
                            "flex items-center justify-between p-3.5 rounded-xl border cursor-pointer transition-all select-none",
                            isSelected 
                              ? "bg-emerald-50/60 dark:bg-emerald-950/20 border-emerald-500 shadow-xs" 
                              : "bg-slate-50/50 dark:bg-slate-950/40 border-slate-200 dark:border-slate-800/80 hover:border-slate-300 dark:hover:border-slate-700"
                          )}
                        >
                          <div className="flex items-center gap-3">
                            <div className={cn(
                              "w-4 h-4 rounded border flex items-center justify-center shrink-0 transition-all",
                              isSelected ? "bg-emerald-600 border-emerald-600 text-white" : "border-slate-300 dark:border-slate-600"
                            )}>
                              {isSelected && <div className="w-1.5 h-1.5 bg-white rounded-xs" />}
                            </div>
                            <div>
                              <p className={cn("text-sm font-medium", isSelected ? "text-emerald-950 dark:text-emerald-300" : "text-slate-900 dark:text-slate-200")}>
                                {hub.name}
                              </p>
                              <div className="text-xs text-slate-500 dark:text-slate-400 flex items-center gap-2 mt-0.5">
                                <span>{hub.suppliersWithLoad} Operators Loaded</span>
                                <span>•</span>
                                <span className="text-emerald-600 dark:text-emerald-400 font-medium">{hub.totalPendingLoad} Total</span>
                              </div>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
              
              <div className="pt-4 border-t border-slate-100 dark:border-slate-800 mt-auto">
                <button 
                  disabled={isDeploying || selectedHubs.length === 0}
                  onClick={handleSave} 
                  className={cn(
                    "w-full py-3 rounded-xl font-medium text-sm transition-colors shadow-xs",
                    selectedHubs.length === 0 
                      ? "bg-slate-100 dark:bg-slate-800 text-slate-400 cursor-not-allowed" 
                      : "bg-emerald-600 hover:bg-emerald-700 text-white"
                  )}
                >
                  {isDeploying ? "Activating Fleet Line..." : `Launch Route Route (${selectedHubs.length} Stops)`}
                </button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* --- DASHBOARD HEADER --- */}
      <header className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white dark:bg-slate-900 p-6 border border-slate-200 dark:border-slate-800 rounded-2xl shadow-xs">
        <div>
          <h1 className="text-xl font-bold tracking-tight text-slate-900 dark:text-white">Active Transit Pipelines</h1>
          <p className="text-slate-500 dark:text-slate-400 text-xs mt-0.5">Track fleet distribution schedules and freight handoffs down the supply chain.</p>
        </div>
        <button 
          onClick={() => setIsPanelOpen(true)} 
          className="inline-flex items-center justify-center gap-2 px-4 py-2.5 bg-slate-900 hover:bg-slate-800 dark:bg-white dark:hover:bg-slate-100 text-white dark:text-slate-950 rounded-xl font-medium text-xs transition-colors shadow-xs"
        >
          <PlusIcon className="w-4 h-4" /> Create Transport Run
        </button>
      </header>

      {/* --- PIPELINE CARD MATRIX --- */}
      <div className="space-y-4">
        {routes.map((route) => (
          <div key={route.id} className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-2xs overflow-hidden p-5 sm:p-6">
            <div className="flex flex-col lg:flex-row lg:items-start justify-between gap-6">
              
              {/* Card Manifest Block */}
              <div className="lg:w-80 space-y-3 shrink-0">
                <div>
                  <span className="inline-flex px-1.5 py-0.5 rounded text-[11px] font-mono bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 border border-slate-200/50 dark:border-slate-700/60 mb-2">
                    {route.id}
                  </span>
                  <h3 className="text-base font-semibold text-slate-900 dark:text-white tracking-tight leading-tight">
                    {route.title}
                  </h3>
                </div>
                
                <div className="grid grid-cols-2 gap-2 pt-1">
                  <div className="p-2.5 rounded-xl bg-slate-50 dark:bg-slate-950/60 border border-slate-100 dark:border-slate-800/80 flex items-center gap-2">
                    <TruckIcon className="w-4 h-4 text-slate-400 shrink-0" />
                    <div className="min-w-0">
                      <p className="text-[10px] text-slate-400 uppercase tracking-tight">Vehicle</p>
                      <p className="text-xs font-medium text-slate-800 dark:text-slate-200 truncate">{route.vehiclePlate}</p>
                    </div>
                  </div>
                  <div className="p-2.5 rounded-xl bg-slate-50 dark:bg-slate-950/60 border border-slate-100 dark:border-slate-800/80 flex items-center gap-2">
                    <UserIcon className="w-4 h-4 text-slate-400 shrink-0" />
                    <div className="min-w-0">
                      <p className="text-[10px] text-slate-400 uppercase tracking-tight">Driver</p>
                      <p className="text-xs font-medium text-slate-800 dark:text-slate-200 truncate">{route.driverName}</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Waypoint Timeline Path Segment */}
              <div className="flex-1 flex flex-col justify-start">
                <div className="text-[11px] font-semibold uppercase tracking-wider text-slate-400 dark:text-slate-500 mb-3">
                  Waypoint Manifest Progress
                </div>
                
                <div className="space-y-4 relative pl-1">
                  {route.checkpoints.map((cp, idx) => {
                    const isCleared = cp.status === "Cleared";
                    // Color the trailing connection lines dynamically
                    const isNextCleared = route.checkpoints[idx + 1]?.status === "Cleared";

                    return (
                      <div key={cp.id} className="flex items-center justify-between group/item relative">
                        <div className="flex items-center gap-3.5 z-10">
                          <button 
                            type="button"
                            onClick={() => handleClearCheckpoint(route.id, cp.id)}
                            disabled={isCleared}
                            className={cn(
                              "h-6 w-6 rounded-full border flex items-center justify-center shrink-0 transition-all text-xs font-semibold",
                              isCleared 
                                ? "bg-emerald-600 border-emerald-600 text-white cursor-default shadow-xs" 
                                : "border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-500 hover:border-emerald-500 dark:hover:border-emerald-400"
                            )}
                          >
                            {isCleared ? (
                              <CheckCircleIcon className="w-4 h-4" />
                            ) : (
                              <span>{idx + 1}</span>
                            )}
                          </button>
                          
                          <div>
                            <span className={cn(
                              "text-sm transition-colors font-medium block", 
                              isCleared ? "text-slate-400 line-through decoration-slate-300 dark:decoration-slate-700" : "text-slate-800 dark:text-slate-200"
                            )}>
                              {cp.name}
                            </span>
                            {cp.pendingLoad && !isCleared && (
                              <span className="text-xs text-slate-500 dark:text-slate-400 flex items-center gap-1 mt-0.5">
                                <ArchiveBoxIcon className="w-3.5 h-3.5 text-slate-400" /> Transferring {cp.pendingLoad}
                              </span>
                            )}
                          </div>
                        </div>

                        {!isCleared && (
                          <button 
                            onClick={() => handleClearCheckpoint(route.id, cp.id)}
                            className="text-xs font-medium text-emerald-600 dark:text-emerald-400 hover:text-emerald-700 dark:hover:text-emerald-300 md:opacity-0 group-hover/item:opacity-100 transition-opacity"
                          >
                            Clear Waypoint
                          </button>
                        )}

                        {/* Connector Tracking Line */}
                        {idx < route.checkpoints.length - 1 && (
                          <div className={cn(
                            "absolute w-[2px] left-[11px] top-[24px] h-[22px] -z-10 transition-colors",
                            isCleared && isNextCleared ? "bg-emerald-600" : "bg-slate-200 dark:bg-slate-800"
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