"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  TruckIcon, 
  MapPinIcon, 
  ClockIcon, 
  ShieldCheckIcon, 
  ArrowPathIcon,
  ExclamationTriangleIcon,
  PlusIcon,
  PencilSquareIcon,
  TrashIcon,
  XMarkIcon,
  ArchiveBoxIcon,
  IdentificationIcon,
  KeyIcon,
  UserCircleIcon
} from "@heroicons/react/24/outline";
import { cn } from "@/lib/utils";

// --- TYPES ---
type VehicleStatus = "In Transit" | "Idle" | "Maintenance";


type Vehicle = {
  id: string; // Internal ID (e.g., FL-202)
  plate: string; // License Plate
  makeModel: string; // e.g., Isuzu FSR / Mercedes Actros
  driver: {
    name: string;
    id: string; // Driver License / Staff ID
    phone: string;
  };
  assignedHub: string;
  cargoType: string;
  progress: number;
  eta: string;
  status: VehicleStatus;
  healthScore: number;
};

const availableHubs = ["Nairobi Central", "Mombasa Gateway", "Thika Industrial", "Kisumu North"];
const cargoCategories = ["Post-Consumer PET", "Industrial Scrap", "Mixed Plastics", "Electronic Waste"];

const initialVehicles: Vehicle[] = [
  { 
    id: "FL-202", 
    plate: "KDK 442Z",
    makeModel: "Isuzu FSR Forward",
    driver: { name: "Samuel Kamau", id: "DL-99201", phone: "+254 712 345 678" },
    assignedHub: "Nairobi Central", 
    cargoType: "Post-Consumer PET", 
    progress: 75, 
    eta: "2h 15m", 
    status: "In Transit", 
    healthScore: 98 
  },
];


export function Logistics() {
  const [vehicles, setVehicles] = useState<Vehicle[]>(initialVehicles);
  const [isPanelOpen, setIsPanelOpen] = useState(false);
  const [editingVehicle, setEditingVehicle] = useState<Vehicle | null>(null);
  const activeUnits = vehicles.filter(v => v.status === "In Transit").length;
  const avgHealth = Math.round(vehicles.reduce((sum, v) => sum + v.healthScore, 0) / vehicles.length);

  const handleSaveVehicle = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    
    const vehicleData: Vehicle = {
      id: editingVehicle?.id || `FL-${Math.floor(100 + Math.random() * 900)}`,
      plate: formData.get("plate") as string,
      makeModel: formData.get("makeModel") as string,
      driver: {
        name: formData.get("driverName") as string,
        id: formData.get("driverId") as string,
        phone: formData.get("driverPhone") as string,
      },
      assignedHub: formData.get("hub") as string,
      cargoType: formData.get("cargo") as string,
      status: formData.get("status") as VehicleStatus,
      progress: editingVehicle?.progress || 0,
      eta: formData.get("status") === "In Transit" ? "Calculating..." : "N/A",
      healthScore: editingVehicle?.healthScore || 100,
    };

    if (editingVehicle) {
      setVehicles(vehicles.map(v => v.id === editingVehicle.id ? vehicleData : v));
    } else {
      setVehicles([...vehicles, vehicleData]);
    }
    closePanel();
  };

  const deleteVehicle = (id: string) => {
    if (confirm("Decommission this vehicle and unassign driver?")) {
      setVehicles(vehicles.filter(v => v.id !== id));
    }
  };

  const openPanel = (vehicle?: Vehicle) => {
    setEditingVehicle(vehicle || null);
    setIsPanelOpen(true);
  };

  const closePanel = () => {
    setIsPanelOpen(false);
    setEditingVehicle(null);
  };

  return (
    <div className="space-y-10 relative">
      {/* --- SLIDE-OVER PANEL --- */}
      {/* --- PROVISIONING PANEL --- */}
      <AnimatePresence>
        {isPanelOpen && (
          <>
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={closePanel} className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-[80]" />
            <motion.div 
              initial={{ x: "100%" }} animate={{ x: 0 }} exit={{ x: "100%" }}
              className="fixed right-0 top-0 h-full w-full max-w-lg bg-white dark:bg-[#0a0a0a] z-[90] p-10 shadow-2xl border-l border-slate-200 dark:border-white/10 overflow-y-auto"
            >
              <div className="flex justify-between items-center mb-10">
                <h2 className="text-2xl font-black italic tracking-tighter uppercase">Asset Provisioning</h2>
                <button onClick={closePanel} className="p-2 hover:bg-slate-100 dark:hover:bg-white/5 rounded-full"><XMarkIcon className="w-6 h-6" /></button>
              </div>

              <form onSubmit={handleSaveVehicle} className="space-y-8 pb-10">
                {/* Section: Vehicle Specs */}
                <div className="space-y-4">
                  <div className="flex items-center gap-2 border-b border-slate-100 dark:border-white/5 pb-2">
                    <KeyIcon className="w-4 h-4 text-emerald-500" />
                    <label className="text-[10px] font-black uppercase tracking-widest text-slate-400">Vehicle Specifications</label>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <input name="plate" placeholder="Plate Number (e.g. KDK 442Z)" defaultValue={editingVehicle?.plate} required className="bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-2xl p-4 text-sm font-bold outline-none" />
                    <input name="makeModel" placeholder="Make & Model" defaultValue={editingVehicle?.makeModel} required className="bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-2xl p-4 text-sm font-bold outline-none" />
                  </div>
                </div>

                {/* Section: Driver Details */}
                <div className="space-y-4">
                  <div className="flex items-center gap-2 border-b border-slate-100 dark:border-white/5 pb-2">
                    <IdentificationIcon className="w-4 h-4 text-blue-500" />
                    <label className="text-[10px] font-black uppercase tracking-widest text-slate-400">Driver Assignment</label>
                  </div>
                  <input name="driverName" placeholder="Full Name" defaultValue={editingVehicle?.driver.name} required className="w-full bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-2xl p-4 text-sm font-bold outline-none" />
                  <div className="grid grid-cols-2 gap-4">
                    <input name="driverId" placeholder="License/Staff ID" defaultValue={editingVehicle?.driver.id} required className="bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-2xl p-4 text-xs outline-none" />
                    <input name="driverPhone" placeholder="Phone Number" defaultValue={editingVehicle?.driver.phone} required className="bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-2xl p-4 text-xs outline-none" />
                  </div>
                </div>

                {/* Section: Logistics */}
                <div className="space-y-4">
                  <div className="flex items-center gap-2 border-b border-slate-100 dark:border-white/5 pb-2">
                    <MapPinIcon className="w-4 h-4 text-purple-500" />
                    <label className="text-[10px] font-black uppercase tracking-widest text-slate-400">Operational Logic</label>
                  </div>
                  <select name="hub" defaultValue={editingVehicle?.assignedHub} className="w-full bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-2xl p-4 text-sm font-bold outline-none">
                    {availableHubs.map(hub => <option key={hub} value={hub}>{hub}</option>)}
                  </select>
                  <select name="cargo" defaultValue={editingVehicle?.cargoType} className="w-full bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-2xl p-4 text-sm font-bold outline-none">
                    {cargoCategories.map(cat => <option key={cat} value={cat}>{cat}</option>)}
                  </select>
                </div>

                <button type="submit" className="w-full py-5 bg-slate-900 dark:bg-white text-white dark:text-black rounded-2xl font-black uppercase tracking-widest text-xs hover:scale-[1.02] transition-all">
                  Confirm Assignment
                </button>
              </form>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* --- HEADER --- */}
      <header className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-12">
        <div>
          <h1 className="text-4xl font-serif font-bold tracking-tight italic">Fleet Radar</h1>
          <p className="text-slate-500 dark:text-white/40 text-sm font-medium">
            Logistics orchestration across the <span className="text-emerald-500 font-bold">LAPSSET Corridor</span>.
          </p>
        </div>
        <button 
          onClick={() => openPanel()}
          className="flex items-center gap-3 px-8 py-4 bg-emerald-600 text-white rounded-2xl font-black uppercase tracking-widest text-[10px] hover:scale-105 active:scale-95 transition-all"
        >
          <PlusIcon className="w-4 h-4 stroke-[3px]" /> Provision Vehicle
        </button>
      </header>

      {/* --- QUICK STATS --- */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {[
          { label: "On Road", value: activeUnits, sub: "Active Units", icon: TruckIcon, color: "text-emerald-500" },
          { label: "Avg Speed", value: "42 km/h", sub: "Urban Corridor", icon: ArrowPathIcon, color: "text-blue-500" },
          { label: "Safety Score", value: avgHealth, sub: "Fleet-wide Avg", icon: ShieldCheckIcon, color: "text-purple-500" },
          { label: "Fleet Size", value: vehicles.length, sub: "Total Assets", icon: ArchiveBoxIcon, color: "text-amber-500" },
        ].map((stat, i) => (
          <div key={i} className="p-6 rounded-3xl bg-white dark:bg-white/5 border border-slate-200 dark:border-white/10">
            <stat.icon className={cn("w-6 h-6 mb-4", stat.color)} />
            <p className="text-[10px] font-black uppercase text-slate-400 tracking-widest">{stat.label}</p>
            <p className="text-2xl font-black">{stat.value}</p>
            <p className="text-[10px] font-bold text-slate-500/60 dark:text-white/20">{stat.sub}</p>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-10">
        {/* --- ACTIVE TRANSITS LEDGER --- */}
        {/* --- FLEET LIST --- */}
      <div className="xl:col-span-2 rounded-[3.5rem] border border-slate-200 dark:border-white/10 bg-white dark:bg-white/5 p-10 shadow-sm">
        <div className="flex justify-between items-center mb-10">
          <h3 className="text-2xl font-black italic tracking-tighter">Corridor Active Fleet</h3>
          <button onClick={() => openPanel()} className="p-3 bg-emerald-500 text-white rounded-2xl hover:scale-110 transition-transform">
            <PlusIcon className="w-5 h-5 stroke-[3px]" />
          </button>
        </div>

        <div className="grid grid-cols-1 gap-6">
          {vehicles.map((v) => (
            <div key={v.id} className="group p-8 rounded-[2.5rem] bg-slate-50 dark:bg-white/5 border border-transparent hover:border-emerald-500/20 transition-all flex flex-col md:flex-row gap-8">
              {/* Asset Identity */}
              <div className="flex-1 space-y-4">
                <div className="flex items-center gap-4">
                  <div className="h-14 w-14 rounded-2xl bg-white dark:bg-white/10 border border-slate-200 dark:border-white/10 flex items-center justify-center text-slate-900 dark:text-white shadow-sm">
                    <TruckIcon className="w-7 h-7" />
                  </div>
                  <div>
                    <h4 className="text-xl font-black tracking-tight">{v.plate}</h4>
                    <p className="text-[10px] font-black uppercase text-emerald-500 tracking-widest">{v.makeModel}</p>
                  </div>
                </div>
                
                <div className="flex flex-wrap gap-4">
                  <div className="flex items-center gap-2 px-4 py-2 bg-white dark:bg-white/5 rounded-xl border border-slate-100 dark:border-white/5">
                    <UserCircleIcon className="w-4 h-4 text-slate-400" />
                    <span className="text-[11px] font-bold">{v.driver.name}</span>
                  </div>
                  <div className="flex items-center gap-2 px-4 py-2 bg-white dark:bg-white/5 rounded-xl border border-slate-100 dark:border-white/5">
                    <MapPinIcon className="w-4 h-4 text-slate-400" />
                    <span className="text-[11px] font-bold">{v.assignedHub}</span>
                  </div>
                </div>
              </div>

              {/* Progress & Actions */}
              <div className="w-full md:w-64 space-y-4">
                <div className="flex justify-between items-center">
                  <span className={cn(
                    "text-[9px] font-black uppercase px-2 py-1 rounded-md",
                    v.status === "In Transit" ? "bg-emerald-500/10 text-emerald-500" : "bg-slate-500/10 text-slate-500"
                  )}>{v.status}</span>
                  <div className="flex gap-2">
                    <button onClick={() => openPanel(v)} className="p-2 hover:text-emerald-500 transition-colors"><PencilSquareIcon className="w-5 h-5"/></button>
                    <button onClick={() => deleteVehicle(v.id)} className="p-2 hover:text-red-500 transition-colors"><TrashIcon className="w-5 h-5"/></button>
                  </div>
                </div>
                
                {v.status === "In Transit" ? (
                  <div className="space-y-2">
                    <div className="flex justify-between text-[10px] font-bold">
                      <span className="text-slate-400">ETA: {v.eta}</span>
                      <span className="text-emerald-500">{v.progress}%</span>
                    </div>
                    <div className="h-1.5 w-full bg-slate-200 dark:bg-white/10 rounded-full overflow-hidden">
                      <motion.div initial={{ width: 0 }} animate={{ width: `${v.progress}%` }} className="h-full bg-emerald-500" />
                    </div>
                  </div>
                ) : (
                  <div className="h-10 flex items-center justify-center border border-dashed border-slate-200 dark:border-white/10 rounded-xl">
                    <span className="text-[10px] font-black uppercase text-slate-400 tracking-tighter">Telemetry on Standby</span>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
        

        {/* --- NETWORK HEALTH CARD --- */}
        <div className="rounded-[3rem] bg-slate-900 p-8 text-white flex flex-col justify-between relative overflow-hidden shadow-xl">
          <div className="relative z-10">
            <div className="h-12 w-12 rounded-2xl bg-emerald-500 flex items-center justify-center mb-6">
              <ShieldCheckIcon className="w-6 h-6 text-white" />
            </div>
            <h3 className="text-2xl font-black italic mb-2">Fleet Security</h3>
            <p className="text-slate-400 text-xs font-medium leading-relaxed">
              All vehicles are equipped with <span className="text-emerald-500 font-bold">Grade-A Telemetry</span> and auto-inventory tagging for real-time corridor monitoring.
            </p>
            
            <div className="mt-8 space-y-4">
               <div className="flex justify-between items-center p-4 bg-white/5 rounded-2xl border border-white/10">
                  <span className="text-[10px] font-black uppercase tracking-widest text-slate-400">Inventory Sync</span>
                  <span className="text-[10px] font-bold text-emerald-500">Active</span>
               </div>
            </div>
          </div>
          
          <button className="w-full py-4 bg-emerald-600 text-white rounded-2xl font-black uppercase tracking-widest text-[10px] mt-12 hover:bg-emerald-500 transition-colors">
            Audit Logistics Ledger
          </button>
          
          <div className="absolute -bottom-12 -right-12 opacity-5 pointer-events-none">
            <TruckIcon className="w-64 h-64 rotate-12" />
          </div>
        </div>
      </div>
    </div>
  );
}