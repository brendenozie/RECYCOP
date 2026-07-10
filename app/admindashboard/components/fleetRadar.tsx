"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  TruckIcon, 
  MapPinIcon, 
  ClockIcon, 
  ShieldCheckIcon, 
  ArrowPathIcon,
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
  id: string;
  plate: string;
  makeModel: string;
  driver: { name: string; id: string; phone: string; };
  assignedHub: string;
  cargoType: string;
  progress: number;
  eta: string;
  status: VehicleStatus;
  healthScore: number;
};

export function Fleet() {
  const [vehicles, setVehicles] = useState<Vehicle[]>([]);
  const [isPanelOpen, setIsPanelOpen] = useState(false);
  const [editingVehicle, setEditingVehicle] = useState<Vehicle | null>(null);
  const [loading, setLoading] = useState(true);
  
  // --- DYNAMIC DATA STATES ---
  const [drivers, setDrivers] = useState<any[]>([]);

  const fetchFleetData = async () => {
    setLoading(true);
    try {
      // Fetch vehicles, drivers, and hubs concurrently
      const [resVehicles, resDrivers] = await Promise.all([
        fetch('/api/admin/fleet'),
        fetch('/api/admin/users?role=driver'),
      ]);

      if (resVehicles.ok) setVehicles(await resVehicles.json());
      if (resDrivers.ok) setDrivers(await resDrivers.json());
    } catch (error) {
      console.error("Fleet sync failed", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchFleetData();
  }, []);

  const handleSaveVehicle = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    
    const payload = {
      plate: formData.get("plate"),
      makeModel: formData.get("makeModel"),
      driverName: formData.get("driverName"),
      driverId: formData.get("driverId"),
      driverPhone: formData.get("driverPhone"),
      cargoType: formData.get("cargo"),
    };

    try {
      const method = editingVehicle ? "PATCH" : "POST";
      const url = editingVehicle ? `/api/admin/fleet/${editingVehicle.id}` : '/api/admin/fleet';

      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(editingVehicle ? { ...payload, id: editingVehicle.id } : payload)
      });

      if (res.ok) {
        await fetchFleetData();
        closePanel();
      }
    } catch (error) {
      alert("Failed to update vehicle record.");
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

  // --- UI COMPONENTS ---
  return (
    <div className="space-y-10 relative">
      <header className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="space-y-1">
          <h1 className="text-3xl font-extrabold tracking-tight text-slate-900 dark:text-white">Fleet Radar</h1>
          <p className="text-slate-500 text-sm">Managing {vehicles.length} assets across the national network.</p>
        </div>
        <button 
          onClick={() => openPanel()}
          className="flex items-center gap-2 px-5 py-3 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl font-bold text-xs shadow-sm"
        >
          <PlusIcon className="w-4 h-4" /> Register Vehicle
        </button>
      </header>

      {/* --- FORM PANEL --- */}
      <AnimatePresence>
        {isPanelOpen && (
          <motion.div 
            initial={{ x: "100%" }} animate={{ x: 0 }} exit={{ x: "100%" }}
            className="fixed right-0 top-0 h-full w-full max-w-md bg-white dark:bg-[#0c0517] z-[90] p-8 shadow-2xl border-l border-slate-200 overflow-y-auto"
          >
            <form onSubmit={handleSaveVehicle} className="space-y-6">
              <h2 className="text-xl font-bold">{editingVehicle ? "Update Vehicle" : "Register Vehicle"}</h2>
              
              <input name="plate" placeholder="License Plate" defaultValue={editingVehicle?.plate} required className="w-full bg-slate-50 p-3 rounded-xl border" />
              <input name="makeModel" placeholder="Vehicle Model" defaultValue={editingVehicle?.makeModel} required className="w-full bg-slate-50 p-3 rounded-xl border" />
              
              {/* Dynamic Driver Selection from DB */}
              <select name="driverName" className="w-full bg-slate-50 p-3 rounded-xl border">
                <option value="">Select Driver</option>
                {drivers.map(d => <option key={d._id} value={d.name}>{d.name}</option>)}
              </select>

              <button type="submit" className="w-full py-3 bg-emerald-600 text-white rounded-xl font-bold">
                Save Record
              </button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>

      {/* --- FLEET GRID --- */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {vehicles.map(v => (
          <div key={v.id} className="p-5 border rounded-2xl bg-white shadow-sm flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-slate-100 rounded-xl"><TruckIcon className="w-6 h-6 text-emerald-600" /></div>
              <div>
                <p className="font-bold">{v.plate}</p>
                <p className="text-xs text-slate-500">{v.driver.name} • {v.assignedHub}</p>
              </div>
            </div>
            <span className="text-xs font-bold text-emerald-600 bg-emerald-50 px-3 py-1 rounded-full">{v.status}</span>
          </div>
        ))}
      </div>
    </div>
  );
}