"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  MapIcon, 
  MapPinIcon, 
  TruckIcon,
  PlusIcon,
  XMarkIcon,
  ArchiveBoxIcon,
  ScaleIcon,
  UserIcon,
  ChevronRightIcon,
  CheckCircleIcon,
  TrashIcon
} from "@heroicons/react/24/outline";
import { cn } from "@/lib/utils";

type ManifestItem = {
  type: string;
  weight: string;
  unit: string;
};

type Checkpoint = {
  id: string;
  name: string;
  status: "Pending" | "Cleared";
  hubId?: string;
};

type RouteManifest = {
  id: string;
  title: string;
  vehiclePlate: string;
  driverName: string;
  inventory: ManifestItem[];
  checkpoints: Checkpoint[];
};

export function RouteManager() {
  const [routes, setRoutes] = useState<RouteManifest[]>([
    // {
    //   id: "RT-1001",
    //   title: "Northern Highway Route A1",
    //   vehiclePlate: "KDK 442Z",
    //   driverName: "John Doe",
    //   inventory: [{ type: "PET Plastic Bottles", weight: "20", unit: "Tons" }],
    //   checkpoints: [
    //     { id: "1", name: "Main Sorting Hub", status: "Cleared" },
    //     { id: "2", name: "Midway Weight Station", status: "Pending" }
    //   ]
    // },
    // {
    //   id: "RT-1002",
    //   title: "Southern Bypass Route B2",
    //   vehiclePlate: "KDL 889X",
    //   driverName: "Jane Smith",
    //   inventory: [{ type: "Industrial Metal Scrap", weight: "15", unit: "Tons" }],
    //   checkpoints: [
    //     { id: "1", name: "Recycling Processing Plant", status: "Cleared" }
    //   ]
    // }
  ]);
  
  const [isPanelOpen, setIsPanelOpen] = useState(false);
  const [availableVehicles, setAvailableVehicles] = useState<any[]>([]);
  const [availableDrivers, setAvailableDrivers] = useState<any[]>([]);
  const [isDeploying, setIsDeploying] = useState(false);

  // Form Individual Field States
  const [routeTitle, setRouteTitle] = useState("");
  const [selectedPlate, setSelectedPlate] = useState("");
  const [selectedDriver, setSelectedDriver] = useState("");
  const [materialType, setMaterialType] = useState("PET Plastic");
  const [materialWeight, setMaterialWeight] = useState("20");
  const [materialUnit, setMaterialUnit] = useState("Tons");
  const [formCheckpoints, setFormCheckpoints] = useState<Checkpoint[]>([
    { id: "1", name: "Departure Depot Location", status: "Cleared" }
  ]);

  useEffect(() => {
    if (!isPanelOpen) return;
    const loadFleet = async () => {
      try {
        const [vRes, dRes] = await Promise.all([
          fetch('/api/admin/fleet?status=Available'),
          fetch('/api/admin/drivers')
        ]);
        if (vRes.ok) setAvailableVehicles(await vRes.json());
        if (dRes.ok) setAvailableDrivers(await dRes.json());
      } catch (err) {
        // Fallback default options for preview if API mock missing
        setAvailableVehicles([]);//{ plate: "KDK 442Z", capacity: "25 Tons" }, { plate: "KDL 889X", capacity: "18 Tons" }]);
        setAvailableDrivers([]);//{ _id: "1", name: "John Doe", licenseNo: "DL-9923" }, { _id: "2", name: "Jane Smith", licenseNo: "DL-1102" }]);
      }
    };
    loadFleet();
  }, [isPanelOpen]);

  const addCheckpointField = () => {
    const cp: Checkpoint = { id: Math.random().toString(), name: "", status: "Pending" };
    setFormCheckpoints([...formCheckpoints, cp]);
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
        if (data.isRouteComplete) {
          alert("All delivery steps are cleared successfully!");
        }
      }
    } catch (err) {
      // Local fallback simulation if endpoint isn't alive yet
      setRoutes(prev => prev.map(route => {
        if (route.id !== manifestId) return route;
        return {
          ...route,
          checkpoints: route.checkpoints.map(cp => cp.id === checkpointId ? { ...cp, status: "Cleared" } : cp)
        };
      }));
    }
  };

  const handleSave = async () => {
    if (!routeTitle || !selectedPlate || !selectedDriver) {
      alert("Please fill in the route name, choose a truck, and select a driver.");
      return;
    }

    setIsDeploying(true);
    const payloadInstance = {
      title: routeTitle,
      vehiclePlate: selectedPlate,
      driverName: selectedDriver,
      inventory: [{ type: materialType, weight: materialWeight, unit: materialUnit }],
      checkpoints: formCheckpoints.filter(cp => cp.name.trim() !== "")
    };

    try {
      const res = await fetch('/api/admin/manifests', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payloadInstance)
      });

      if (res.ok) {
        const updatedRes = await fetch('/api/admin/manifests');
        const data = await updatedRes.json();
        setRoutes(data);
        resetFormFields();
      } else {
        throw new Error("API Save Fallback Triggered");
      }
    } catch (error) {
      // Direct local append simulation fallback so the UI remains active
      const localMock: RouteManifest = {
        id: `RT-${Math.floor(1000 + Math.random() * 9000)}`,
        ...payloadInstance
      };
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
    setMaterialType("PET Plastic");
    setMaterialWeight("20");
    setFormCheckpoints([{ id: "1", name: "Departure Depot Location", status: "Cleared" }]);
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
              className="fixed right-0 top-0 bottom-0 h-full w-full max-w-xl bg-white dark:bg-[#0c061a] z-[90] p-6 sm:p-8 border-l border-slate-200 dark:border-white/10 overflow-y-auto shadow-2xl"
            >
              <div className="flex justify-between items-center mb-8">
                <div>
                  <h2 className="text-xl font-bold text-slate-900 dark:text-white">Plan Shipment Route</h2>
                  <p className="text-xs text-slate-400 dark:text-purple-100/40">Assign a driver, vehicle, cargo types, and schedule delivery stops.</p>
                </div>
                <button onClick={resetFormFields} className="p-2 bg-slate-50 hover:bg-slate-100 dark:bg-white/5 dark:hover:bg-white/10 rounded-xl text-slate-400 dark:text-purple-100/50">
                  <XMarkIcon className="w-5 h-5 stroke-[2px]" />
                </button>
              </div>

              <div className="space-y-6 text-sm">
                
                {/* 1. Vehicle and Assignment Details */}
                <div className="space-y-3">
                  <label className="text-xs font-bold text-slate-500 dark:text-slate-400">1. Drivers & Vehicles</label>
                  <input value={routeTitle} onChange={(e) => setRouteTitle(e.target.value)} className="w-full bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-xl p-3.5 font-medium text-slate-900 dark:text-white outline-none focus:border-emerald-500 transition-all" placeholder="Route Name Description (e.g. Western Highway Express)" />
                  
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <select value={selectedPlate} onChange={(e) => setSelectedPlate(e.target.value)} className="w-full bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-xl p-3.5 font-medium text-slate-900 dark:text-white outline-none focus:border-emerald-500">
                      <option value="">Choose Available Truck</option>
                      {availableVehicles.map((v: any) => (
                        <option key={v.plate} value={v.plate}>{v.plate} ({v.capacity})</option>
                      ))}
                    </select>

                    <select value={selectedDriver} onChange={(e) => setSelectedDriver(e.target.value)} className="w-full bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-xl p-3.5 font-medium text-slate-900 dark:text-white outline-none focus:border-emerald-500">
                      <option value="">Select Verified Driver</option>
                      {availableDrivers.map((d: any) => (
                        <option key={d._id} value={d.name}>{d.name}</option>
                      ))}
                    </select>
                  </div>
                </div>

                {/* 2. Inventory Items */}
                <div className="space-y-3 p-4 rounded-xl bg-emerald-500/[0.02] border border-emerald-500/10">
                  <label className="text-xs font-bold text-emerald-600 dark:text-emerald-400 flex items-center gap-1.5">
                    <ArchiveBoxIcon className="w-4 h-4" /> 2. Cargo Description
                  </label>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    <input value={materialType} onChange={(e) => setMaterialType(e.target.value)} className="sm:col-span-1 bg-white dark:bg-white/5 p-3 rounded-xl border border-slate-200 dark:border-white/10 font-medium" placeholder="Material Type" />
                    <input value={materialWeight} onChange={(e) => setMaterialWeight(e.target.value)} type="number" className="bg-white dark:bg-white/5 p-3 rounded-xl border border-slate-200 dark:border-white/10 font-medium" placeholder="Weight Amount" />
                    <select value={materialUnit} onChange={(e) => setMaterialUnit(e.target.value)} className="bg-white dark:bg-white/5 p-3 rounded-xl border border-slate-200 dark:border-white/10 font-medium">
                      <option value="Tons">Tons</option>
                      <option value="KG">Kilograms (KG)</option>
                      <option value="Bales">Bales</option>
                    </select>
                  </div>
                </div>

                {/* 3. Stops / Checklist Progression */}
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <label className="text-xs font-bold text-slate-500 dark:text-slate-400 flex items-center gap-1.5">
                      <MapPinIcon className="w-4 h-4 text-blue-500" /> 3. Delivery Stops & Points
                    </label>
                    <button type="button" onClick={addCheckpointField} className="text-xs font-bold text-blue-600 dark:text-blue-400 hover:underline">
                      + Add Additional Stop
                    </button>
                  </div>
                  
                  <div className="space-y-2 max-h-48 overflow-y-auto pr-1">
                    {formCheckpoints.map((cp, idx) => (
                      <div key={cp.id} className="flex items-center gap-2">
                        <span className="h-7 w-7 rounded-lg bg-slate-100 dark:bg-white/5 text-slate-500 text-xs font-bold flex items-center justify-center shrink-0">
                          {idx + 1}
                        </span>
                        <input 
                          className="flex-1 bg-slate-50 dark:bg-white/5 p-3 rounded-xl border border-slate-200 dark:border-white/10 text-xs font-semibold" 
                          placeholder="Enter Stop or Processing Station Name"
                          value={cp.name}
                          required={idx === 0}
                          onChange={(e) => {
                            const updated = [...formCheckpoints];
                            updated[idx].name = e.target.value;
                            setFormCheckpoints(updated);
                          }}
                        />
                      </div>
                    ))}
                  </div>
                </div>

                <button 
                  disabled={isDeploying}
                  onClick={handleSave} 
                  className={cn(
                    "w-full py-3.5 rounded-xl font-bold text-xs uppercase transition-all shadow-md mt-4",
                    isDeploying ? "bg-slate-300 dark:bg-white/10 text-slate-400 cursor-not-allowed" : "bg-emerald-600 hover:bg-emerald-500 text-white shadow-emerald-600/10"
                  )}
                >
                  {isDeploying ? "Saving Route Details..." : "Activate & Dispatched Route"}
                </button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* --- DASHBOARD HEADER BLOCK --- */}
      <header className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-slate-50 dark:bg-white/[0.02] p-5 sm:p-6 border border-slate-200 dark:border-white/10 rounded-2xl">
        <div>
          <h1 className="text-2xl font-extrabold tracking-tight text-slate-900 dark:text-white">Active Transit Routes</h1>
          <p className="text-slate-500 dark:text-purple-100/50 text-xs font-medium mt-0.5">Monitor, manage, and confirm shipping items arriving at checkpoints.</p>
        </div>
        <button onClick={() => setIsPanelOpen(true)} className="flex items-center justify-center gap-2 px-5 py-3 bg-slate-900 dark:bg-white text-white dark:text-slate-950 hover:bg-slate-800 dark:hover:bg-slate-100 rounded-xl font-bold text-xs transition-all shadow-sm">
          <PlusIcon className="w-4. h-4 stroke-[2.5px]" /> Plan New Transit Route
        </button>
      </header>

      {/* --- RESPONSIVE STREAMLINED LIST CARDS --- */}
      <div className="space-y-4">
        {routes.map((route) => (
          <div key={route.id} className="rounded-2xl border border-slate-200 dark:border-white/10 bg-white dark:bg-white/[0.02] hover:border-slate-300 dark:hover:border-white/20 shadow-sm transition-all overflow-hidden">
            <div className="grid grid-cols-1 md:grid-cols-12 divide-y md:divide-y-0 md:divide-x divide-slate-100 dark:divide-white/5">
              
              {/* Box Info Part 1: Dispatch Identifier */}
              <div className="p-5 sm:p-6 md:col-span-4 flex flex-col justify-between space-y-4">
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
                      <p className="text-[10px] text-slate-400 font-medium uppercase">Truck Plate</p>
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

              {/* Box Info Part 2: Product Cargo Details */}
              <div className="p-5 sm:p-6 md:col-span-4 bg-slate-50/[0.2] dark:bg-white/[0.005]">
                <div className="flex items-center gap-1.5 text-slate-400 dark:text-purple-100/40 mb-3">
                  <ArchiveBoxIcon className="w-4 h-4" />
                  <span className="text-[11px] font-bold uppercase tracking-wider">Loaded Materials</span>
                </div>
                
                <div className="space-y-2">
                  {route.inventory.map((item, idx) => (
                    <div key={idx} className="flex justify-between items-center p-3 rounded-xl bg-white dark:bg-white/5 border border-slate-200 dark:border-white/10 shadow-xs">
                      <div>
                        <p className="text-xs font-bold text-slate-900 dark:text-white">{item.type}</p>
                        <p className="text-[10px] text-slate-400 font-semibold">{item.unit || "Tons Capacity"}</p>
                      </div>
                      <div className="flex items-center gap-1 text-emerald-600 dark:text-emerald-400 font-bold text-sm">
                        <ScaleIcon className="w-3.5 h-3.5 stroke-[2px]" />
                        <span>{item.weight}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Box Info Part 3: Transit Checkpoint Station Tracker */}
              <div className="p-5 sm:p-6 md:col-span-4 flex flex-col justify-center">
                <div className="text-[11px] font-bold uppercase tracking-wider text-slate-400 dark:text-purple-100/40 mb-4">
                  Delivery Stop Progress
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
                            title={isCleared ? "This stop is completed" : "Click to mark as cleared"}
                            className={cn(
                              "h-5 w-5 rounded-full border flex items-center justify-center shrink-0 transition-all",
                              isCleared 
                                ? "bg-emerald-500 border-emerald-500 text-white cursor-default" 
                                : "border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-400 hover:border-emerald-500 dark:hover:border-emerald-400"
                            )}
                          >
                            {isCleared ? (
                              <CheckCircleIcon className="w-3.5 h-3.5 stroke-[2.5px]" />
                            ) : (
                              <span className="text-[9px] font-bold">{idx + 1}</span>
                            )}
                          </button>
                          <span className={cn(
                            "text-xs font-semibold transition-colors", 
                            isCleared ? "text-slate-400 line-through decoration-slate-300 dark:decoration-slate-700" : "text-slate-700 dark:text-purple-100"
                          )}>
                            {cp.name}
                          </span>
                        </div>

                        {!isCleared && (
                          <button 
                            onClick={() => handleClearCheckpoint(route.id, cp.id)}
                            className="text-[10px] font-bold text-emerald-600 dark:text-emerald-400 opacity-80 hover:opacity-100 md:opacity-0 group-hover/cp:opacity-100 transition-opacity"
                          >
                            Mark Arrived
                          </button>
                        )}

                        {/* Connector Line linking individual stops */}
                        {idx < route.checkpoints.length - 1 && (
                          <div className={cn(
                            "absolute h-5 w-[1.5px] left-[9px] top-[19px] -z-10",
                            isCleared && route.checkpoints[idx + 1].status === "Cleared" ? "bg-emerald-500/50" : "bg-slate-200 dark:bg-white/10"
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