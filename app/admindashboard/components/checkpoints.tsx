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

// --- TYPES ---
type ManifestItem = {
  type: string;
  weight: string; // e.g., "20 Tons"
  unit: string;   // e.g., "Bales", "Pallets"
};

type Checkpoint = {
  id: string;
  name: string;
  status: "Pending" | "Cleared";
  hubId?: string; // If linked to a specific physical Hub
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
    {
      id: "RT-1001",
      title: "Northern Corridor A1",
      vehiclePlate: "KDK 442Z",
      driverName: "John Doe",
      inventory: [{ type: "PET Plastic", weight: "20", unit: "Tons" }],
      checkpoints: [{ id: "1", name: "Departure Point", status: "Cleared" }]
    },
    {
      id: "RT-1002",
      title: "Southern Route B2",
      vehiclePlate: "KDL 889X",
      driverName: "Jane Smith",
      inventory: [{ type: "Industrial Scrap", weight: "15", unit: "Tons" }],
      checkpoints: [{ id: "1", name: "Departure Point", status: "Cleared" }]
    }
  ]);
  const [isPanelOpen, setIsPanelOpen] = useState(false);
  // Inside your RouteManager Component
  const [availableVehicles, setAvailableVehicles] = useState([]);
  const [availableDrivers, setAvailableDrivers] = useState([]);
  const [isDeploying, setIsDeploying] = useState(false);

  useEffect(() => {
    // Load assets when the panel opens
    const loadFleet = async () => {
      const [vRes, dRes] = await Promise.all([
        fetch('/api/admin/fleet?status=Available'),
        fetch('/api/admin/drivers')
      ]);
      setAvailableVehicles(await vRes.json());
      setAvailableDrivers(await dRes.json());
    };
    loadFleet();
  }, [isPanelOpen]);
  
  // Form State for new Route
  const [newRoute, setNewRoute] = useState<Partial<RouteManifest>>({
    inventory: [{ type: "PET Plastic", weight: "20", unit: "Tons" }],
    checkpoints: [{ id: "1", name: "Departure Point", status: "Cleared" }]
  });

  const addCheckpoint = () => {
    const cp = { id: Math.random().toString(), name: "", status: "Pending" as const };
    setNewRoute({ ...newRoute, checkpoints: [...(newRoute.checkpoints || []), cp] });
  };

  const handleClearCheckpoint = async (manifestId: string, checkpointId: string) => {
    const res = await fetch('/api/driver/checkpoint', {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ manifestId, checkpointId })
    });

    if (res.ok) {
      const data = await res.json();
      if (data.isRouteComplete) {
        alert("Manifest fully cleared. Returning to Hub.");
      }
      // Refresh the local route state to show the emerald CheckCircleIcon
      // refreshRoutes();
    }
  };

  // const handleSave = () => {
  //   const finalRoute = {
  //     ...newRoute,
  //     id: `RT-${Math.floor(1000 + Math.random() * 9000)}`,
  //   } as RouteManifest;
  //   setRoutes([...routes, finalRoute]);
  //   setIsPanelOpen(false);
  // };

  // 2. Update the handleSave to talk to your MongoDB API
  const handleSave = async () => {
    try {
      const res = await fetch('/api/admin/manifests', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newRoute)
      });

      if (res.ok) {
        // Refresh the list from the DB to ensure we have the real Mongo IDs
        const updatedRes = await fetch('/api/admin/manifests');
        const data = await updatedRes.json();
        setRoutes(data);
        setIsPanelOpen(false);
        // Reset form
        setNewRoute({
          inventory: [{ type: "PET Plastic", weight: "20", unit: "Tons" }],
          checkpoints: [{ id: "1", name: "Departure Point", status: "Cleared" }]
        });
      }
    } catch (error) {
      console.error("Deployment Error:", error);
    }
  };

  return (
    <div className="space-y-10">
      {/* --- PANEL: CONFIGURE ROUTE & MANIFEST --- */}
      <AnimatePresence>
        {isPanelOpen && (
          <>
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setIsPanelOpen(false)} className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-[80]" />
            <motion.div initial={{ x: "100%" }} animate={{ x: 0 }} exit={{ x: "100%" }} className="fixed right-0 top-0 h-full w-full max-w-2xl bg-white dark:bg-[#0a0a0a] z-[90] p-10 shadow-2xl overflow-y-auto">
              <div className="flex justify-between items-center mb-10">
                <h2 className="text-2xl font-black italic uppercase tracking-tighter">Route & Manifest Config</h2>
                <button onClick={() => setIsPanelOpen(false)} className="p-2 hover:bg-slate-100 dark:hover:bg-white/5 rounded-full"><XMarkIcon className="w-6 h-6" /></button>
              </div>

              <div className="space-y-10">
                {/* 1. Basic Assignment */}
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="text-[10px] font-black uppercase text-slate-400">Route Title</label>
                    <input onChange={(e) => setNewRoute({...newRoute, title: e.target.value})} className="w-full bg-slate-50 dark:bg-white/5 p-4 rounded-2xl border border-slate-200 dark:border-white/10 font-bold" placeholder="e.g. Northern Corridor A1" />
                  </div>

                  <div className="space-y-2">
                    <label className="text-[10px] font-black uppercase text-slate-400">Vehicle Plate</label>
                    <select 
                      onChange={(e) => setNewRoute({...newRoute, vehiclePlate: e.target.value})}
                      className="w-full bg-slate-50 dark:bg-white/5 p-4 rounded-2xl border border-slate-200 dark:border-white/10 font-bold"
                    >
                      <option value="">Select Available Truck</option>
                      {availableVehicles.map((v: any) => (
                        <option key={v.plate} value={v.plate}>{v.plate} ({v.capacity})</option>
                      ))}
                    </select>
                    {/* <input onChange={(e) => setNewRoute({...newRoute, vehiclePlate: e.target.value})} className="w-full bg-slate-50 dark:bg-white/5 p-4 rounded-2xl border border-slate-200 dark:border-white/10 font-bold uppercase" placeholder="KDK 442Z" /> */}
                  </div>
                  
                  {/* // 1. Add a specific selector for Drivers in the Basic Assignment grid */}
                  <div className="space-y-2">
                    <label className="text-[10px] font-black uppercase text-slate-400">Assigned Driver</label>
                    <select 
                      onChange={(e) => setNewRoute({...newRoute, driverName: e.target.value})}
                      className="w-full bg-slate-50 dark:bg-white/5 p-4 rounded-2xl border border-slate-200 dark:border-white/10 font-bold"
                    >
                      <option value="">Select Verified Driver</option>
                      {availableDrivers.map((d: any) => (
                        <option key={d._id} value={d.name}>{d.name} (License: {d.licenseNo})</option>
                      ))}
                    </select>
                  </div>
                  
                </div>

                {/* 2. Manifest Summary (Inventory) */}
                <div className="space-y-4 p-6 rounded-[2rem] bg-emerald-500/5 border border-emerald-500/10">
                  <div className="flex items-center gap-2 mb-2">
                    <ArchiveBoxIcon className="w-5 h-5 text-emerald-500" />
                    <h3 className="text-sm font-black uppercase">Manifest Summary</h3>
                  </div>
                  <div className="grid grid-cols-3 gap-3">
                    <input className="col-span-1 bg-white dark:bg-black p-3 rounded-xl border border-slate-200 dark:border-white/10 text-xs font-bold" placeholder="Material (PET)" />
                    <input className="col-span-1 bg-white dark:bg-black p-3 rounded-xl border border-slate-200 dark:border-white/10 text-xs font-bold" placeholder="Weight" />
                    <select className="col-span-1 bg-white dark:bg-black p-3 rounded-xl border border-slate-200 dark:border-white/10 text-xs font-bold">
                       <option>Tons</option>
                       <option>KG</option>
                       <option>Units</option>
                    </select>
                  </div>
                </div>

                {/* 3. Checkpoint Sequencer */}
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <div className="flex items-center gap-2">
                      <MapPinIcon className="w-5 h-5 text-blue-500" />
                      <h3 className="text-sm font-black uppercase">Tactical Waypoints</h3>
                    </div>
                    <button onClick={addCheckpoint} className="text-[10px] font-black uppercase text-blue-500 hover:underline">+ Add Checkpoint</button>
                  </div>
                  
                  <div className="space-y-3">
                    {newRoute.checkpoints?.map((cp, i) => (
                      <div key={cp.id} className="flex items-center gap-4">
                        <div className="h-8 w-8 rounded-full bg-slate-900 text-white text-[10px] font-black flex items-center justify-center shrink-0">{i + 1}</div>
                        <input 
                          className="flex-1 bg-slate-50 dark:bg-white/5 p-3 rounded-xl border border-slate-200 dark:border-white/10 text-xs font-bold" 
                          placeholder="Checkpoint Name or Hub" 
                          onChange={(e) => {
                             const updated = [...(newRoute.checkpoints || [])];
                             updated[i].name = e.target.value;
                             setNewRoute({...newRoute, checkpoints: updated});
                          }}
                        />
                      </div>
                    ))}
                  </div>
                </div>

                {/* <button onClick={handleSave} className="w-full py-5 bg-emerald-600 text-white rounded-2xl font-black uppercase tracking-widest text-xs shadow-xl shadow-emerald-500/20">
                  Deploy Route to Driver
                </button> */}
                <button 
                    disabled={isDeploying}
                    onClick={handleSave} 
                    className={cn(
                      "w-full py-5 rounded-2xl font-black uppercase transition-all",
                      isDeploying ? "bg-slate-400 cursor-not-allowed" : "bg-emerald-600 hover:bg-emerald-500 text-white shadow-xl"
                    )}
                  >
                    {isDeploying ? "Synchronizing with Grid..." : "Deploy Route to Driver"}
                  </button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* --- HEADER --- */}
      <header className="flex justify-between items-center">
        <div>
          <h1 className="text-4xl font-serif font-bold italic tracking-tight">Route Control</h1>
          <p className="text-slate-500 text-sm font-medium">Syncing manifest data with corridor checkpoints.</p>
        </div>
        <button onClick={() => setIsPanelOpen(true)} className="flex items-center gap-3 px-8 py-4 bg-slate-900 text-white dark:bg-white dark:text-black rounded-2xl font-black uppercase tracking-widest text-[10px]">
          <PlusIcon className="w-4 h-4 stroke-[3px]" /> Create New Manifest
        </button>
      </header>

      {/* --- ROUTES GRID --- */}
      <div className="grid grid-cols-1 gap-10">
        {routes.map((route) => (
          <div key={route.id} className="group overflow-hidden rounded-[3.5rem] border border-slate-200 dark:border-white/10 bg-white dark:bg-white/5 shadow-sm">
            <div className="grid grid-cols-1 lg:grid-cols-3">
              {/* Info Section */}
              <div className="p-10 border-r border-slate-100 dark:border-white/5 space-y-8">
                <div>
                   <p className="text-[10px] font-black text-emerald-500 uppercase tracking-[0.2em] mb-2">{route.id}</p>
                   <h3 className="text-2xl font-black tracking-tighter leading-none">{route.title}</h3>
                </div>

                <div className="space-y-4">
                  <div className="flex items-center gap-4 p-4 rounded-2xl bg-slate-50 dark:bg-white/5 border border-slate-100 dark:border-white/5">
                    <TruckIcon className="w-5 h-5 text-slate-400" />
                    <div>
                      <p className="text-[9px] font-black uppercase text-slate-400">Assigned Asset</p>
                      <p className="text-xs font-bold">{route.vehiclePlate}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4 p-4 rounded-2xl bg-slate-50 dark:bg-white/5 border border-slate-100 dark:border-white/5">
                    <UserIcon className="w-5 h-5 text-slate-400" />
                    <div>
                      <p className="text-[9px] font-black uppercase text-slate-400">Driver</p>
                      <p className="text-xs font-bold">{route.driverName || "Not Assigned"}</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Manifest Summary */}
              <div className="p-10 bg-slate-50/50 dark:bg-black/20 border-r border-slate-100 dark:border-white/5">
                <div className="flex items-center gap-2 mb-6">
                  <ArchiveBoxIcon className="w-5 h-5 text-emerald-500" />
                  <h4 className="text-[11px] font-black uppercase tracking-widest">Manifest Summary</h4>
                </div>
                <div className="space-y-4">
                  {route.inventory.map((item, idx) => (
                    <div key={idx} className="flex justify-between items-center p-4 rounded-2xl bg-white dark:bg-white/5 border border-slate-200 dark:border-white/10">
                      <div>
                        <p className="text-xs font-black">{item.type}</p>
                        <p className="text-[10px] text-slate-400 font-bold">{item.unit}</p>
                      </div>
                      <div className="flex items-center gap-2 text-emerald-600">
                        <ScaleIcon className="w-4 h-4" />
                        <span className="text-sm font-black">{item.weight}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Route Progress */}
              <div className="p-10 space-y-6">
                <h4 className="text-[11px] font-black uppercase tracking-widest text-slate-400 mb-4">Tactical Flow</h4>
                <div className="space-y-6 relative">
                  {route.checkpoints.map((cp, idx) => (
                    <div key={cp.id} className="flex items-center gap-4 group/cp">
                      <div className={cn(
                        "h-6 w-6 rounded-full border-2 flex items-center justify-center shrink-0 transition-colors",
                        cp.status === "Cleared" ? "bg-emerald-500 border-emerald-500 text-white" : "border-slate-300 text-slate-300"
                      )}>
                        {cp.status === "Cleared" ? <CheckCircleIcon className="w-4 h-4" /> : <span className="text-[10px]">{idx + 1}</span>}
                      </div>
                      <span className={cn("text-xs font-bold", cp.status === "Cleared" ? "text-slate-900 dark:text-white" : "text-slate-400")}>{cp.name}</span>
                      {idx < route.checkpoints.length - 1 && (
                        <div className="absolute h-6 w-[2px] bg-slate-200 dark:bg-white/10 left-[11px] top-[24px]" />
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}