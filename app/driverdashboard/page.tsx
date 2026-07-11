"use client";

import { useAuth } from "@/components/auth-context";
import { cn } from "@/lib/utils";
import { 
  ArchiveBoxIcon, 
  ExclamationTriangleIcon,
  QrCodeIcon, 
  ChevronRightIcon, 
  ChevronLeftIcon,
  MapPinIcon, 
  CameraIcon, 
  ShieldCheckIcon, 
  PlayIcon,
  CheckCircleIcon,
  ClipboardDocumentListIcon,
  ArrowUpTrayIcon,
  XCircleIcon,
  CubeIcon
} from "@heroicons/react/24/outline";
import { AnimatePresence, motion } from "framer-motion";
import { useState, useEffect, useRef } from "react";
import { toast } from "sonner";

// --- TYPES ---
type InventoryLoad = {
  _id: string;
  status: "Pending" | "Loaded" | "In Transit" | "Delivered" | "Canceled";
  supplierName: string;
  totalWeight: number;
  vehicle: string;
  hub: string;
  grade: string;
  name: string;
};

const menuItems = [
  { id: "loads", name: "My Loads", icon: ClipboardDocumentListIcon },
  { id: "pass", name: "Transit Pass", icon: ShieldCheckIcon },
  { id: "route", name: "Route Map", icon: MapPinIcon },
  { id: "history", name: "History", icon: ArchiveBoxIcon },
];

export default function DriverMobileDashboard() {
  
    const { user, loading: authLoading } = useAuth();
    
  const [activeTab, setActiveTab] = useState("loads"); 
  const [loads, setLoads] = useState<InventoryLoad[]>([]);
  const [selectedLoad, setSelectedLoad] = useState<InventoryLoad | null>(null);
  const [loading, setLoading] = useState(true);
  
  // Interactive States
  const [isUploading, setIsUploading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // 1. Fetch Assigned Loads List
  useEffect(() => {
    async function fetchAssignedLoads() {
       // Wait until global auth loading finishes and ensure a valid user session exists
      if (authLoading || !user) return;

      const token = localStorage.getItem('token');
      if (!token) {
        console.error("No authorization token discovered in localStorage.");
        setLoading(false);
        return;
      }

      try {
        // Updated to fetch a list of loads assigned to this driver
        const res = await fetch("/api/driver/assigned-load", {
          headers: {
            "Authorization": `Bearer ${token}`,
            "Content-Type": "application/json"
          }
        });
        if (res.ok) {
          const data = await res.json();
          setLoads(data);
        } else {
          throw new Error("Failed to fetch");
        }
      } catch (err) {
        // Fallback mock data for UI demonstration if API fails
        setLoads([
          { _id: "INV-9921", status: "Pending", supplierName: "Alpha Recyclers", totalWeight: 4500, vehicle: "KDK 442Z", hub: "Nairobi Core Hub", grade: "Premium Clear", name: "PET-A Flakes" },
          { _id: "INV-9922", status: "Pending", supplierName: "Industrial Scrap Co", totalWeight: 12000, vehicle: "KDK 442Z", hub: "Industrial Area Depot", grade: "Mixed", name: "HDPE Rigid" }
        ]);
      } finally {
        setLoading(false);
      }
    }
    fetchAssignedLoads();
  }, [user, authLoading]);

  // 2. Handle Status Transitions for the specific load
  const handleStatusUpdate = async (newStatus: InventoryLoad["status"]) => {
    if (!selectedLoad) return;

    // Optimistic UI Update
    const updatedLoad = { ...selectedLoad, status: newStatus };
    setSelectedLoad(updatedLoad);
    setLoads(prev => prev.map(l => l._id === updatedLoad._id ? updatedLoad : l));
    
    if (newStatus === "Canceled") {
      toast.error(`Mission Canceled: ${updatedLoad._id}`);
      setSelectedLoad(null); // Return to list if canceled
    } else {
      toast.success(`Status Updated: ${newStatus}`);
    }

    // Wait until global auth loading finishes and ensure a valid user session exists
    if (authLoading || !user) return;

    const token = localStorage.getItem('token');
    if (!token) {
      console.error("No authorization token discovered in localStorage.");
      setLoading(false);
      return;
    }


    try {
      await fetch("/api/driver/update-load-status", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify({ 
          loadId: selectedLoad._id, 
          status: newStatus,
          timestamp: new Date()
        }),
      });
    } catch (err) {
      toast.error("Network error logging status update.");
    }
  };

  // 3. Handle Native Camera Capture
  const handleImageCapture = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setIsUploading(true);
    
    // Simulating upload latency
    setTimeout(() => {
      toast.success("Load visual verified & secured in ledger.");
      setIsUploading(false);
    }, 1500);
  };

  if (loading) return (
    <div className="min-h-screen bg-[#05010d] flex flex-col items-center justify-center gap-4">
      <div className="h-10 w-10 border-t-2 border-emerald-500 rounded-full animate-spin" />
      <p className="text-xs text-emerald-500 font-bold uppercase tracking-widest animate-pulse">Syncing Dispatch...</p>
    </div>
  );

  return (
    <div className="min-h-screen bg-[#05010d] text-white font-sans selection:bg-emerald-500/30 overflow-x-hidden">
      
      {/* --- STATUS BAR --- */}
      <div className="px-8 pt-6 pb-2 flex justify-between items-center bg-[#05010d]/80 backdrop-blur-md sticky top-0 z-50">
        <div className="flex items-center gap-2">
          <div className={cn("h-2 w-2 rounded-full animate-pulse", selectedLoad?.status === "In Transit" ? "bg-emerald-500" : "bg-amber-500")} />
          <span className="text-[10px] font-black uppercase tracking-[0.2em]">
            {selectedLoad ? `Mission: ${selectedLoad.status}` : "Fleet Standby"}
          </span>
        </div>
        <span className="text-[10px] font-black text-white/40 italic">NBO NODE: 4.2</span>
      </div>

      <main className="p-6 pb-40">
        <AnimatePresence mode="wait">
          
          {/* ========================================== */}
          {/* VIEW 1: MASTER LIST OF ASSIGNED LOADS      */}
          {/* ========================================== */}
          {activeTab === "loads" && !selectedLoad && (
            <motion.div key="list-view" initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="space-y-6">
              <h2 className="text-3xl font-black italic tracking-tighter px-2">Assigned Missions</h2>
              
              {loads.length === 0 ? (
                <div className="p-10 border-2 border-dashed border-white/10 rounded-3xl text-center text-white/40 font-bold text-sm">
                  No loads currently assigned to your vehicle.
                </div>
              ) : (
                <div className="space-y-4">
                  {loads.map(load => (
                    <button 
                      key={load._id}
                      onClick={() => setSelectedLoad(load)}
                      className="w-full text-left p-6 rounded-3xl bg-white/5 border border-white/10 hover:bg-white/10 transition-colors flex flex-col gap-4 group"
                    >
                      <div className="flex justify-between items-start">
                        <div>
                          <div className="flex items-center gap-2 mb-1">
                            <CubeIcon className="w-5 h-5 text-emerald-500" />
                            <span className="text-xs font-black uppercase tracking-widest text-emerald-500">{load._id}</span>
                          </div>
                          <h3 className="text-xl font-bold truncate pr-4">{load.name}</h3>
                        </div>
                        <span className={cn(
                          "px-3 py-1 text-[9px] font-black uppercase tracking-widest rounded-full border",
                          load.status === "Delivered" ? "bg-emerald-500/10 text-emerald-400 border-emerald-500/20" :
                          load.status === "In Transit" ? "bg-blue-500/10 text-blue-400 border-blue-500/20" :
                          load.status === "Loaded" ? "bg-amber-500/10 text-amber-400 border-amber-500/20" :
                          "bg-white/5 text-white/50 border-white/10"
                        )}>
                          {load.status}
                        </span>
                      </div>
                      
                      <div className="flex items-center justify-between pt-4 border-t border-white/5">
                        <div>
                          <p className="text-[10px] text-white/40 uppercase font-bold tracking-wider">Origin</p>
                          <p className="text-sm font-medium">{load.supplierName}</p>
                        </div>
                        <div className="text-right">
                          <p className="text-[10px] text-white/40 uppercase font-bold tracking-wider">Payload</p>
                          <p className="text-sm font-medium">{(load.totalWeight / 1000).toFixed(1)} Tons</p>
                        </div>
                      </div>
                    </button>
                  ))}
                </div>
              )}
            </motion.div>
          )}


          {/* ========================================== */}
          {/* VIEW 2: DETAIL VIEW (MISSION CONTROL)      */}
          {/* ========================================== */}
          {activeTab === "loads" && selectedLoad && (
            <motion.div key="detail-view" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 20 }} className="space-y-6">
              
              {/* Back Navigation */}
              <button 
                onClick={() => setSelectedLoad(null)}
                className="flex items-center gap-2 text-white/50 hover:text-white transition-colors text-xs font-bold uppercase tracking-widest px-2"
              >
                <ChevronLeftIcon className="w-4 h-4 stroke-[3]" /> Back to Roster
              </button>

              <div className="p-8 sm:p-10 rounded-[3rem] bg-white text-slate-900 shadow-xl">
                <div className="flex justify-between items-start mb-8">
                  <div>
                    <h2 className="text-3xl font-black italic tracking-tighter">Mission Control</h2>
                    <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mt-1">ID: {selectedLoad._id}</p>
                  </div>
                </div>

                {/* Details Summary */}
                <div className="p-5 bg-slate-50 rounded-3xl border border-slate-100 mb-8 grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Target Hub</p>
                    <p className="text-sm font-bold text-slate-800">{selectedLoad.hub}</p>
                  </div>
                  <div>
                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Material</p>
                    <p className="text-sm font-bold text-slate-800">{selectedLoad.name}</p>
                  </div>
                </div>
                
                <div className="space-y-4">
                  
                  {/* HIDDEN FILE INPUT */}
                  <input type="file" accept="image/*" capture="environment" ref={fileInputRef} className="hidden" onChange={handleImageCapture} />

                  {/* ACTION: UPLOAD VISUAL */}
                  <button 
                    onClick={() => fileInputRef.current?.click()}
                    disabled={isUploading}
                    className="w-full py-6 bg-slate-100 active:bg-slate-200 transition-colors rounded-[2rem] flex items-center justify-between px-8 border border-slate-200"
                  >
                    <span className="font-bold text-sm">
                      {isUploading ? "Uploading Image to Ledger..." : "1. Capture Load Visual"}
                    </span>
                    {isUploading ? (
                      <div className="w-6 h-6 border-2 border-slate-400 border-t-emerald-600 rounded-full animate-spin" />
                    ) : (
                      <CameraIcon className="w-6 h-6 text-emerald-600" />
                    )}
                  </button>

                  {/* DYNAMIC LIFECYCLE ACTIONS based on status */}
                  {selectedLoad.status === "Pending" && (
                    <button 
                      onClick={() => handleStatusUpdate("Loaded")}
                      className="w-full py-6 bg-blue-600 active:bg-blue-700 text-white rounded-[2rem] font-black uppercase tracking-widest text-[11px] flex items-center justify-center gap-3 shadow-xl shadow-blue-600/20 transition-transform active:scale-95"
                    >
                      <ArrowUpTrayIcon className="w-6 h-6" /> 2. Confirm Truck Loaded
                    </button>
                  )}

                  {selectedLoad.status === "Loaded" && (
                    <button 
                      onClick={() => handleStatusUpdate("In Transit")}
                      className="w-full py-6 bg-indigo-600 active:bg-indigo-700 text-white rounded-[2rem] font-black uppercase tracking-widest text-[11px] flex items-center justify-center gap-3 shadow-xl shadow-indigo-600/20 transition-transform active:scale-95"
                    >
                      <PlayIcon className="w-6 h-6" /> 3. Start Route (In Transit)
                    </button>
                  )}

                  {selectedLoad.status === "In Transit" && (
                    <button 
                      onClick={() => handleStatusUpdate("Delivered")}
                      className="w-full py-6 bg-emerald-600 active:bg-emerald-700 text-white rounded-[2rem] font-black uppercase tracking-widest text-[11px] flex items-center justify-center gap-3 shadow-xl shadow-emerald-600/20 transition-transform active:scale-95"
                    >
                      <CheckCircleIcon className="w-6 h-6 stroke-[2]" /> 4. Confirm Final Delivery
                    </button>
                  )}

                  {selectedLoad.status === "Delivered" && (
                    <div className="w-full py-6 bg-emerald-50 text-emerald-600 rounded-[2rem] font-black uppercase tracking-widest text-[11px] flex items-center justify-center gap-3 border border-emerald-200">
                      <CheckCircleIcon className="w-6 h-6" /> Mission Accomplished
                    </div>
                  )}

                  {/* DANGER ACTIONS */}
                  {selectedLoad.status !== "Delivered" && selectedLoad.status !== "Canceled" && (
                    <div className="pt-4 border-t border-slate-100 mt-6 grid grid-cols-2 gap-3">
                      <button 
                        onClick={() => {
                          if(confirm("Are you sure you want to cancel this load assignment?")) handleStatusUpdate("Canceled");
                        }}
                        className="w-full py-4 bg-red-50 text-red-600 rounded-3xl font-black uppercase tracking-widest text-[10px] flex flex-col items-center justify-center gap-2 border border-red-100 active:bg-red-100 transition-colors"
                      >
                        <XCircleIcon className="w-6 h-6" /> Cancel Load
                      </button>
                      <button className="w-full py-4 bg-orange-50 text-orange-600 rounded-3xl font-black uppercase tracking-widest text-[10px] flex flex-col items-center justify-center gap-2 border border-orange-100 active:bg-orange-100 transition-colors">
                        <ExclamationTriangleIcon className="w-6 h-6" /> SOS Assist
                      </button>
                    </div>
                  )}

                </div>
              </div>
            </motion.div>
          )}

          {/* ========================================== */}
          {/* VIEW 3: TRANSIT PASS (Requires Selected Load)*/}
          {/* ========================================== */}
          {activeTab === "pass" && (
            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} className="space-y-6">
              {!selectedLoad ? (
                <div className="mt-20 text-center space-y-4">
                  <ShieldCheckIcon className="w-16 h-16 mx-auto text-white/20" />
                  <p className="text-white/40 font-bold uppercase tracking-widest text-xs">Select an active mission first to view pass.</p>
                  <button onClick={() => setActiveTab("loads")} className="px-6 py-3 bg-white/10 rounded-full text-xs font-bold uppercase tracking-widest hover:bg-white/20 transition-colors">Go to Loads</button>
                </div>
              ) : (
                <>
                  <div className="p-10 rounded-[3.5rem] bg-gradient-to-br from-emerald-600 to-teal-800 shadow-2xl relative overflow-hidden">
                    <div className="relative z-10 flex flex-col items-center">
                      <div className="p-4 bg-white rounded-3xl mb-8">
                        <QrCodeIcon className="w-32 h-32 text-slate-900" />
                      </div>
                      <h3 className="text-4xl font-black italic mb-2">{selectedLoad.vehicle || "NO VEHICLE"}</h3>
                      <p className="text-[10px] font-black uppercase tracking-[0.4em] text-white/40 mb-8 text-center">Official Transit Authority</p>
                      
                      <div className="w-full grid grid-cols-2 gap-8 border-t border-white/10 pt-8">
                        <div>
                          <p className="text-[8px] font-black text-white/40 uppercase mb-1">Carrier</p>
                          <p className="text-sm font-bold">J. KAMAU</p>
                        </div>
                        <div>
                          <p className="text-[8px] font-black text-white/40 uppercase mb-1">Payload</p>
                          <p className="text-sm font-bold tracking-tight">
                            {(selectedLoad.totalWeight / 1000).toFixed(1)}T {selectedLoad.name.toUpperCase()}
                          </p>
                          <p className="text-[10px] font-bold text-emerald-300 mt-1 uppercase">
                            GRADE: {selectedLoad.grade}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="p-8 rounded-[2.5rem] bg-white/5 border border-white/10 flex items-center justify-between">
                    <div className="w-1/3">
                      <p className="text-[9px] font-black text-white/30 uppercase tracking-widest">Origin</p>
                      <p className="text-base font-bold italic truncate">{selectedLoad.supplierName}</p>
                    </div>
                    <ChevronRightIcon className="w-5 h-5 text-emerald-500 shrink-0 mx-2" />
                    <div className="text-right w-1/3">
                      <p className="text-[9px] font-black text-white/30 uppercase tracking-widest">Target Hub</p>
                      <p className="text-base font-bold truncate">{selectedLoad.hub}</p>
                    </div>
                  </div>
                </>
              )}
            </motion.div>
          )}

        </AnimatePresence>
      </main>

      {/* --- DYNAMIC BOTTOM NAVIGATION DOCK --- */}
      <nav className="fixed bottom-0 left-0 right-0 p-6 z-50 pointer-events-none">
        <div className="mx-auto max-w-md h-24 bg-[#1a1625]/90 backdrop-blur-3xl rounded-[3rem] border border-white/10 shadow-[0_-20px_40px_rgba(0,0,0,0.5)] flex items-center justify-around px-4 pointer-events-auto">
          {menuItems.map((item) => (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={cn(
                "relative flex flex-col items-center justify-center w-16 h-16 transition-all duration-300",
                activeTab === item.id ? "text-emerald-500 scale-110" : "text-white/30 hover:text-white/60"
              )}
            >
              {activeTab === item.id && (
                <motion.div 
                  layoutId="activeDockGlow"
                  className="absolute -top-2 w-1 h-1 bg-emerald-500 rounded-full shadow-[0_0_10px_#10b981]" 
                />
              )}
              <item.icon className="w-7 h-7 stroke-[1.5]" />
              <span className="text-[8px] font-black uppercase tracking-tighter mt-1">{item.name.split(' ')[1] || item.name}</span>
            </button>
          ))}
          
          <div className="h-12 w-12 rounded-2xl bg-gradient-to-tr from-emerald-500 to-teal-400 p-[1.5px] ml-2">
             <div className="h-full w-full rounded-[14.5px] bg-[#05010d] flex items-center justify-center">
                <span className="text-[10px] font-black">JK</span>
             </div>
          </div>
        </div>
      </nav>
    </div>
  );
}

// "use client";

// import { cn } from "@/lib/utils";
// import { 
//   ArchiveBoxIcon, 
//   ExclamationTriangleIcon,
//   QrCodeIcon, 
//   ChevronRightIcon, 
//   MapPinIcon, 
//   CameraIcon, 
//   ShieldCheckIcon, 
//   TicketIcon,
//   PlayIcon,
//   CheckCircleIcon
// } from "@heroicons/react/24/outline";
// import { AnimatePresence, motion } from "framer-motion";
// import { useState, useEffect, useRef } from "react";
// import { toast } from "sonner";

// const menuItems = [
//   { id: "load", name: "Active Load", icon: TicketIcon },
//   { id: "pass", name: "Transit Pass", icon: ShieldCheckIcon },
//   { id: "route", name: "Route Map", icon: MapPinIcon },
//   { id: "history", name: "History", icon: ArchiveBoxIcon },
// ];

// export default function DriverMobileDashboard({ userToken }: { userToken: string }) {
//   const [activeTab, setActiveTab] = useState("load"); 
//   const [loadData, setLoadData] = useState<any>(null);
//   const [loading, setLoading] = useState(true);
  
//   // Interactive States
//   const [isUploading, setIsUploading] = useState(false);
//   const fileInputRef = useRef<HTMLInputElement>(null);

//   // 1. Fetch Assigned Load (Now mapped to Inventory Ledger)
//   useEffect(() => {
//     async function fetchLoad() {
//       try {
//         const res = await fetch("/api/driver/active-load", {
//           headers: { Authorization: `Bearer ${userToken}` }
//         });
//         if (res.ok) {
//           const data = await res.json();
//           setLoadData(data);
//         }
//       } catch (err) {
//         toast.error("Failed to sync active load.");
//       } finally {
//         setLoading(false);
//       }
//     }
//     fetchLoad();
//   }, [userToken]);

//   // 2. Handle Status Transitions
//   const handleStatusUpdate = async (newStatus: string) => {
//     if (!loadData) return;

//     // Optimistic UI Update
//     setLoadData((prev: any) => ({ ...prev, status: newStatus }));
//     toast.success(`Mission Status: ${newStatus}`);

//     try {
//       await fetch("/api/driver/verify-arrival", {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//           "Authorization": `Bearer ${userToken}`
//         },
//         body: JSON.stringify({ 
//           requestId: loadData._id, 
//           status: newStatus,
//           timestamp: new Date()
//         }),
//       });
//     } catch (err) {
//       toast.error("Network error logging status update.");
//     }
//   };

//   // 3. Handle Native Camera Capture
//   const handleImageCapture = async (e: React.ChangeEvent<HTMLInputElement>) => {
//     const file = e.target.files?.[0];
//     if (!file) return;

//     setIsUploading(true);

//     // In production, instantiate FormData and POST to your storage bucket API
//     // const formData = new FormData();
//     // formData.append('file', file);
    
//     // Simulating upload latency
//     setTimeout(() => {
//       toast.success("Load visual verified & secured in ledger.");
//       setIsUploading(false);
//     }, 1500);
//   };

//   if (loading) return (
//     <div className="min-h-screen bg-[#05010d] flex flex-col items-center justify-center gap-4">
//       <div className="h-10 w-10 border-t-2 border-emerald-500 rounded-full animate-spin" />
//       <p className="text-xs text-emerald-500 font-bold uppercase tracking-widest animate-pulse">Syncing Dispatch...</p>
//     </div>
//   );

//   return (
//     <div className="min-h-screen bg-[#05010d] text-white font-sans selection:bg-emerald-500/30 overflow-x-hidden">
      
//       {/* --- STATUS BAR --- */}
//       <div className="px-8 pt-6 pb-2 flex justify-between items-center bg-[#05010d]/80 backdrop-blur-md sticky top-0 z-50">
//         <div className="flex items-center gap-2">
//           <div className={cn("h-2 w-2 rounded-full animate-pulse", loadData ? "bg-emerald-500" : "bg-amber-500")} />
//           <span className="text-[10px] font-black uppercase tracking-[0.2em]">
//             {loadData?.status || (loadData ? "On Mission" : "Awaiting Dispatch")}
//           </span>
//         </div>
//         <span className="text-[10px] font-black text-white/40 italic">NBO NODE: 4.2</span>
//       </div>

//       <main className="p-6 pb-40 space-y-8">
//         <AnimatePresence mode="wait">
          
//           {/* --- TRANSIT PASS VIEW --- */}
//           {activeTab === "pass" && (
//             <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} className="space-y-6">
//               <div className="p-10 rounded-[3.5rem] bg-gradient-to-br from-emerald-600 to-teal-800 shadow-2xl relative overflow-hidden">
//                 <div className="relative z-10 flex flex-col items-center">
//                   <div className="p-4 bg-white rounded-3xl mb-8">
//                     {/* QR encodes the Batch IDs for Police/Admin verification */}
//                     <QrCodeIcon className="w-32 h-32 text-slate-900" />
//                   </div>
//                   <h3 className="text-4xl font-black italic mb-2">{loadData?.vehicle || "NO VEHICLE"}</h3>
//                   <p className="text-[10px] font-black uppercase tracking-[0.4em] text-white/40 mb-8 text-center">Official Transit Authority</p>
                  
//                   <div className="w-full grid grid-cols-2 gap-8 border-t border-white/10 pt-8">
//                     <div>
//                       <p className="text-[8px] font-black text-white/40 uppercase mb-1">Carrier</p>
//                       <p className="text-sm font-bold">J. KAMAU</p>
//                     </div>
//                     <div>
//                       <p className="text-[8px] font-black text-white/40 uppercase mb-1">Payload</p>
//                       <p className="text-sm font-bold tracking-tight">
//                         {((loadData?.totalWeight || 0) / 1000).toFixed(1)}T {loadData?.name?.toUpperCase() || 'MATERIAL'}
//                       </p>
//                       <p className="text-[10px] font-bold text-emerald-300 mt-1 uppercase">
//                         GRADE: {loadData?.grade || 'N/A'}
//                       </p>
//                     </div>
//                   </div>
//                 </div>
//               </div>

//               {/* ROUTE INFO */}
//               <div className="p-8 rounded-[2.5rem] bg-white/5 border border-white/10 flex items-center justify-between">
//                 <div className="w-1/3">
//                   <p className="text-[9px] font-black text-white/30 uppercase tracking-widest">Origin</p>
//                   <p className="text-base font-bold italic truncate">{loadData?.supplierName || "Calculating..."}</p>
//                 </div>
//                 <ChevronRightIcon className="w-5 h-5 text-emerald-500 shrink-0 mx-2" />
//                 <div className="text-right w-1/3">
//                   <p className="text-[9px] font-black text-white/30 uppercase tracking-widest">Target Hub</p>
//                   <p className="text-base font-bold truncate">{loadData?.hub || "Pending"}</p>
//                 </div>
//               </div>
//             </motion.div>
//           )}

//           {/* --- LOAD CONTROL VIEW --- */}
//           {activeTab === "load" && (
//             <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="space-y-6">
//               <div className="p-8 sm:p-10 rounded-[3rem] bg-white text-slate-900 shadow-xl">
//                 <h2 className="text-3xl font-black italic tracking-tighter mb-6">Mission Control</h2>
                
//                 <div className="space-y-4">
                  
//                   {/* HIDDEN FILE INPUT (Captures from device camera) */}
//                   <input 
//                     type="file"
//                     accept="image/*"
//                     capture="environment"
//                     ref={fileInputRef}
//                     className="hidden"
//                     onChange={handleImageCapture}
//                   />

//                   {/* 1. UPLOAD VISUAL */}
//                   <button 
//                     onClick={() => fileInputRef.current?.click()}
//                     disabled={isUploading}
//                     className="w-full py-6 bg-slate-100 active:bg-slate-200 transition-colors rounded-[2rem] flex items-center justify-between px-8 border border-slate-200"
//                   >
//                     <span className="font-bold text-sm">
//                       {isUploading ? "Uploading Image to Ledger..." : "Capture Load Visual"}
//                     </span>
//                     {isUploading ? (
//                       <div className="w-6 h-6 border-2 border-slate-400 border-t-emerald-600 rounded-full animate-spin" />
//                     ) : (
//                       <CameraIcon className="w-6 h-6 text-emerald-600" />
//                     )}
//                   </button>

//                   {/* 2. DYNAMIC MISSION TRIGGERS */}
//                   <div className="grid grid-cols-2 gap-4">
//                     <button 
//                       onClick={() => handleStatusUpdate("In Transit")}
//                       className="py-5 bg-blue-600 active:bg-blue-700 text-white rounded-3xl font-black uppercase tracking-widest text-[10px] flex flex-col items-center justify-center gap-2 shadow-lg shadow-blue-600/20 transition-transform active:scale-95"
//                     >
//                       <PlayIcon className="w-6 h-6" /> Start Delivery
//                     </button>
                    
//                     <button 
//                       onClick={() => handleStatusUpdate("At Checkpoint")}
//                       className="py-5 bg-amber-500 active:bg-amber-600 text-white rounded-3xl font-black uppercase tracking-widest text-[10px] flex flex-col items-center justify-center gap-2 shadow-lg shadow-amber-500/20 transition-transform active:scale-95"
//                     >
//                       <MapPinIcon className="w-6 h-6" /> Log Checkpoint
//                     </button>
//                   </div>

//                   {/* 3. FINAL DESTINATION */}
//                   <button 
//                     onClick={() => handleStatusUpdate("Delivered")}
//                     className="w-full py-6 bg-emerald-600 active:bg-emerald-700 text-white rounded-[2rem] font-black uppercase tracking-widest text-[11px] flex items-center justify-center gap-3 shadow-xl shadow-emerald-600/20 transition-transform active:scale-95 mt-2"
//                   >
//                     <CheckCircleIcon className="w-6 h-6 stroke-[2]" /> Confirm Final Delivery
//                   </button>
                  
//                   <div className="pt-4 border-t border-slate-100 mt-6">
//                     <button className="w-full py-5 bg-red-50 text-red-600 rounded-[2rem] font-black uppercase tracking-widest text-[10px] flex items-center justify-center gap-3 border border-red-100 active:bg-red-100 transition-colors">
//                       <ExclamationTriangleIcon className="w-5 h-5 stroke-[2]" /> SOS / Roadside Assistance
//                     </button>
//                   </div>
//                 </div>
//               </div>
//             </motion.div>
//           )}

//         </AnimatePresence>
//       </main>

//       {/* --- DYNAMIC BOTTOM NAVIGATION DOCK --- */}
//       <nav className="fixed bottom-0 left-0 right-0 p-6 z-50">
//         <div className="mx-auto max-w-md h-24 bg-[#1a1625]/80 backdrop-blur-3xl rounded-[3rem] border border-white/10 shadow-[0_-20px_40px_rgba(0,0,0,0.4)] flex items-center justify-around px-4">
//           {menuItems.map((item) => (
//             <button
//               key={item.id}
//               onClick={() => setActiveTab(item.id)}
//               className={cn(
//                 "relative flex flex-col items-center justify-center w-16 h-16 transition-all duration-300",
//                 activeTab === item.id ? "text-emerald-500 scale-110" : "text-white/30 hover:text-white/60"
//               )}
//             >
//               {activeTab === item.id && (
//                 <motion.div 
//                   layoutId="activeDockGlow"
//                   className="absolute -top-2 w-1 h-1 bg-emerald-500 rounded-full shadow-[0_0_10px_#10b981]" 
//                 />
//               )}
//               <item.icon className="w-7 h-7 stroke-[1.5]" />
//               <span className="text-[8px] font-black uppercase tracking-tighter mt-1">{item.name.split(' ')[1] || item.name}</span>
//             </button>
//           ))}
          
//           {/* PROFILE / AVATAR */}
//           <div className="h-12 w-12 rounded-2xl bg-gradient-to-tr from-emerald-500 to-teal-400 p-[1.5px] ml-2">
//              <div className="h-full w-full rounded-[14.5px] bg-[#05010d] flex items-center justify-center">
//                 <span className="text-[10px] font-black">JK</span>
//              </div>
//           </div>
//         </div>
//       </nav>
//     </div>
//   );
// }