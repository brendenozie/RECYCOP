"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { toast } from "sonner";
import { useAuth } from "@/components/auth-context";
import { cn } from "@/lib/utils";
import {
  PlusIcon,
  ScaleIcon,
  CameraIcon,
  MapPinIcon,
  ArrowPathIcon,
  ClipboardDocumentCheckIcon,
  CloudArrowUpIcon,
  ExclamationCircleIcon
} from "@heroicons/react/24/outline";

// --- Types ---
interface Hub {
  id: string;
  name: string;
  location: { city: string; country: string };
}

interface CollectionJob {
  _id: string; // Database ID
  jobId: string; // UI friendly ID like JOB-402
  material: string;
  targetWeight: string;
  hubId: string;
  hubName: string;
  status: "pending" | "weighed" | "photo_uploaded" | "submitted";
  actualWeight?: string;
  image?: string;
}

export default function FieldOfficerDashboard() {
  const { user, loading: authLoading } = useAuth();

  // --- Core State ---
  const [jobs, setJobs] = useState<CollectionJob[]>([]);
  const [hubs, setHubs] = useState<Hub[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedJobId, setSelectedJobId] = useState<string | null>(null);

  // --- Form State ---
  const [newMaterial, setNewMaterial] = useState("HDPE Polymer");
  const [newHubId, setNewHubId] = useState("");
  const [newWeight, setNewWeight] = useState("");
  const [isSubmittingForm, setIsSubmittingForm] = useState(false);
  const [isProcessingAction, setIsProcessingAction] = useState(false);

  const activeJob = jobs.find((j) => j._id === selectedJobId) || jobs[0];

  // --- Data Fetching ---
  async function fetchDashboardData() {
    if (authLoading || !user) return;

    const token = localStorage.getItem("token");
    if (!token) {
      toast.error("Authentication error. Please log in again.");
      setIsLoading(false);
      return;
    }

    try {
      // Fetch both active field jobs and available hubs in parallel
      const [jobsRes, hubsRes] = await Promise.all([
        fetch("/api/field/jobs", {
          headers: { Authorization: `Bearer ${token}`, "Content-Type": "application/json" },
        }),
        fetch("/api/admin/hubs", {
          headers: { Authorization: `Bearer ${token}`, "Content-Type": "application/json" },
        })
      ]);

      if (!jobsRes.ok || !hubsRes.ok) throw new Error("Failed to fetch dashboard data");

      const jobsData = await jobsRes.json();
      const hubsData = await hubsRes.json();

      setJobs(jobsData);
      setHubs(hubsData);

      if (hubsData.length > 0) setNewHubId(hubsData[0].id);
      if (jobsData.length > 0 && !selectedJobId) setSelectedJobId(jobsData[0]._id);
      
    } catch (err) {
      toast.error("Could not sync active ground shifts.");
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    fetchDashboardData();
  }, [user, authLoading]);

  // --- Action: Register New Load ---
  const handleCreateLoad = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newWeight || !newHubId) return;
    setIsSubmittingForm(true);

    const token = localStorage.getItem("token");
    const selectedHub = hubs.find(h => h.id === newHubId);

    const payload = {
      material: newMaterial,
      targetWeight: `${newWeight}t`,
      hubId: newHubId,
      hubName: selectedHub?.name || "Unknown Hub",
      status: "pending",
    };

    try {
      const res = await fetch("/api/field/jobs", {
        method: "POST",
        headers: { Authorization: `Bearer ${token}`, "Content-Type": "application/json" },
        body: JSON.stringify(payload)
      });

      if (!res.ok) throw new Error("Failed to register load");

      const createdJob = await res.json();
      setJobs((prev) => [createdJob, ...prev]);
      setSelectedJobId(createdJob._id);
      setNewWeight("");
      toast.success("New dispatch track initialized.");
    } catch (err) {
      toast.error("Failed to initialize dispatch track.");
    } finally {
      setIsSubmittingForm(false);
    }
  };

  // --- Generic Update Helper for Workflow Steps ---
  const updateJobStatus = async (jobId: string, updates: Partial<CollectionJob>, successMsg: string) => {
    setIsProcessingAction(true);
    const token = localStorage.getItem("token");

    try {
      const res = await fetch(`/api/field/jobs/${jobId}`, {
        method: "PATCH",
        headers: { Authorization: `Bearer ${token}`, "Content-Type": "application/json" },
        body: JSON.stringify(updates)
      });

      if (!res.ok) throw new Error("Failed to update job");

      const updatedJob = await res.json();
      setJobs((prev) => prev.map((job) => (job._id === jobId ? updatedJob : job)));
      toast.success(successMsg);
      return true;
    } catch (err) {
      toast.error("Action failed to sync with Mission Control.");
      return false;
    } finally {
      setIsProcessingAction(false);
    }
  };

  // --- Action: Simulate Weight Scale Reading ---
  const handleWeighScale = async (job: CollectionJob) => {
    const numericTarget = parseFloat(job.targetWeight);
    const randomizedVariance = (numericTarget + (Math.random() * 0.6 - 0.3)).toFixed(1);
    const actualWeight = `${randomizedVariance}t`;

    await updateJobStatus(
      job._id, 
      { status: "weighed", actualWeight }, 
      `Scale calibrated: Logged ${actualWeight}`
    );
  };

  // --- Action: Simulate Quick Camera Snapshot ---
  const handleCapturePhoto = async (job: CollectionJob) => {
    const mockCargoImages = [
      "https://images.unsplash.com/photo-1591871937573-74dbba515c4c?auto=format&fit=crop&q=80&w=400",
      "https://images.unsplash.com/photo-1532996122724-e3c354a0b15b?auto=format&fit=crop&q=80&w=400",
      "https://images.unsplash.com/photo-1611284446314-60a58ac0deb9?auto=format&fit=crop&q=80&w=400"
    ];
    const randomImg = mockCargoImages[Math.floor(Math.random() * mockCargoImages.length)];

    await updateJobStatus(
      job._id,
      { status: "photo_uploaded", image: randomImg },
      "Visual telemetry snapshot uploaded."
    );
  };

  // --- Action: Submit to Mission Control Queue ---
  const handleSubmitToMissionControl = async (job: CollectionJob) => {
    const success = await updateJobStatus(
      job._id,
      { status: "submitted" },
      "Load dispatched to Mission Control."
    );

    if (success) {
      setTimeout(() => {
        setJobs((prev) => prev.filter((j) => j._id !== job._id));
        setSelectedJobId(null);
      }, 500); // Small delay to let user read the toast before it vanishes from active list
    }
  };

  if (authLoading || isLoading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-slate-50 dark:bg-slate-950 space-y-4">
        <ArrowPathIcon className="w-10 h-10 text-emerald-500 animate-spin" />
        <div className="text-xs font-bold tracking-widest text-slate-400 animate-pulse">
          SYNCING FIELD REGISTRY...
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-white p-6 md:p-12">
      
      {/* HEADER */}
      <header className="mb-12 flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div>
          <span className="text-[10px] font-black uppercase tracking-[0.25em] text-emerald-500">
            Field Unit Node-04
          </span>
          <h1 className="text-4xl font-serif font-bold italic tracking-tight mt-1">Field Registry</h1>
          <p className="text-slate-500 text-sm font-medium mt-1">
            Logged in as <span className="text-slate-800 dark:text-slate-300 font-semibold">{user?.firstName || "Officer"}</span> • Active State
          </p>
        </div>
        
        <div className="flex gap-4">
          <div className="px-6 py-3 rounded-2xl bg-white dark:bg-white/5 border border-slate-200 dark:border-white/10 flex items-center gap-3 shadow-sm">
            <MapPinIcon className="w-5 h-5 text-emerald-500" />
            <span className="text-xs font-bold">Nairobi-Mombasa Corridor</span>
          </div>
        </div>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* LEFT COLUMN: REGISTRATION & LIST */}
        <div className="lg:col-span-5 space-y-8">
          
          {/* QUICK LOG LOAD FORM */}
          <section className="p-8 rounded-[2.5rem] bg-white dark:bg-white/5 border border-slate-200 dark:border-white/10 shadow-sm">
            <h3 className="text-lg font-black tracking-tight mb-4 flex items-center gap-2">
              <PlusIcon className="w-5 h-5 text-emerald-500 stroke-[2]" /> Register Dispatch Load
            </h3>
            
            <form onSubmit={handleCreateLoad} className="space-y-4">
              <div>
                <label className="text-[10px] font-black uppercase tracking-wider text-slate-400 block mb-2">
                  Material Stream
                </label>
                <select 
                  value={newMaterial}
                  onChange={(e) => setNewMaterial(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-sm font-semibold focus:outline-none focus:border-emerald-500 transition-colors"
                >
                  <option value="HDPE Polymer">HDPE Polymer</option>
                  <option value="Aluminum UBCs">Aluminum UBCs</option>
                  <option value="Clear PET Flakes">Clear PET Flakes</option>
                  <option value="Mixed Paper">Mixed Paper Waste</option>
                </select>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-[10px] font-black uppercase tracking-wider text-slate-400 block mb-2">
                    Target (Tons)
                  </label>
                  <input 
                    type="number" 
                    step="0.1"
                    placeholder="e.g. 5.8" 
                    value={newWeight}
                    onChange={(e) => setNewWeight(e.target.value)}
                    className="w-full px-4 py-3 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-sm font-semibold focus:outline-none focus:border-emerald-500 transition-colors"
                    required
                  />
                </div>
                <div>
                  <label className="text-[10px] font-black uppercase tracking-wider text-slate-400 block mb-2">
                    Destination Hub
                  </label>
                  <select 
                    value={newHubId}
                    onChange={(e) => setNewHubId(e.target.value)}
                    className="w-full px-4 py-3 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-sm font-semibold focus:outline-none focus:border-emerald-500 transition-colors"
                    required
                  >
                    {hubs.map(hub => (
                      <option key={hub.id} value={hub.id}>{hub.name}</option>
                    ))}
                  </select>
                </div>
              </div>

              <button 
                type="submit"
                disabled={isSubmittingForm}
                className="w-full py-4 rounded-xl bg-emerald-600 text-white text-[10px] font-black uppercase tracking-widest hover:bg-emerald-500 disabled:bg-slate-400 transition-all flex items-center justify-center gap-2 shadow-md shadow-emerald-600/10"
              >
                {isSubmittingForm ? (
                  <ArrowPathIcon className="w-4 h-4 animate-spin" />
                ) : (
                  <PlusIcon className="w-4 h-4 stroke-[2]" />
                )}
                Initialize Dispatch Track
              </button>
            </form>
          </section>

          {/* ON-GOING DISPATCHES LIST */}
          <section className="p-8 rounded-[2.5rem] bg-white dark:bg-white/5 border border-slate-200 dark:border-white/10 shadow-sm">
            <h3 className="text-lg font-black tracking-tight mb-4">Active Ground Shifts</h3>
            <div className="space-y-3 max-h-[400px] overflow-y-auto pr-2">
              {jobs.map((job) => {
                const isSelected = selectedJobId === job._id;
                return (
                  <button
                    key={job._id}
                    onClick={() => setSelectedJobId(job._id)}
                    className={cn(
                      "w-full text-left p-5 rounded-2xl border transition-all flex items-center justify-between",
                      isSelected 
                        ? "bg-emerald-50 dark:bg-emerald-500/10 border-emerald-500/30" 
                        : "bg-slate-50 dark:bg-slate-900/50 border-transparent hover:border-slate-200 dark:hover:border-slate-800"
                    )}
                  >
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <span className="text-[9px] font-black uppercase bg-slate-800 dark:bg-slate-200 text-white dark:text-slate-900 px-2 py-0.5 rounded">
                          {job.jobId || job._id.slice(-6).toUpperCase()}
                        </span>
                        <span className="text-xs font-semibold text-slate-500">{job.hubName}</span>
                      </div>
                      <h4 className="font-bold text-sm text-slate-900 dark:text-white">{job.material}</h4>
                    </div>

                    <div className="text-right">
                      <span className={cn(
                        "text-[9px] font-bold uppercase tracking-wider px-2 py-1 rounded-lg border",
                        job.status === "submitted" && "bg-blue-50/50 border-blue-200 text-blue-600 dark:bg-blue-500/10 dark:border-blue-500/20 dark:text-blue-400",
                        job.status === "photo_uploaded" && "bg-orange-50/50 border-orange-200 text-orange-600 dark:bg-orange-500/10 dark:border-orange-500/20 dark:text-orange-400",
                        job.status === "weighed" && "bg-purple-50/50 border-purple-200 text-purple-600 dark:bg-purple-500/10 dark:border-purple-500/20 dark:text-purple-400",
                        job.status === "pending" && "bg-slate-100 border-slate-200 text-slate-500 dark:bg-slate-800 dark:border-slate-700 dark:text-slate-400"
                      )}>
                        {job.status.replace("_", " ")}
                      </span>
                      <p className="text-xs font-bold text-slate-500 mt-1">{job.actualWeight || job.targetWeight}</p>
                    </div>
                  </button>
                );
              })}
              {jobs.length === 0 && (
                <div className="text-center py-8 flex flex-col items-center">
                  <ClipboardDocumentCheckIcon className="w-8 h-8 text-slate-300 dark:text-slate-700 mb-2" />
                  <p className="text-slate-400 text-sm font-medium">No ongoing ground dispatches.</p>
                </div>
              )}
            </div>
          </section>
        </div>

        {/* RIGHT COLUMN: INTERACTIVE WORKSPACE */}
        <div className="lg:col-span-7">
          <AnimatePresence mode="wait">
            {activeJob ? (
              <motion.section 
                key={activeJob._id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="p-10 rounded-[3rem] bg-white dark:bg-white/5 border border-slate-200 dark:border-white/10 h-full flex flex-col justify-between shadow-sm"
              >
                <div>
                  {/* WORKSPACE HEADER */}
                  <div className="flex justify-between items-start border-b border-slate-100 dark:border-white/10 pb-6 mb-8">
                    <div>
                      <div className="flex items-center gap-2 mb-2">
                        <span className="text-[10px] font-black bg-slate-900 dark:bg-white dark:text-slate-900 text-white px-3 py-1 rounded-full uppercase tracking-widest">
                          {activeJob.jobId || activeJob._id.slice(-6).toUpperCase()}
                        </span>
                        <span className="text-xs font-bold text-emerald-600 dark:text-emerald-500 flex items-center gap-1">
                          <MapPinIcon className="w-3.5 h-3.5" /> {activeJob.hubName}
                        </span>
                      </div>
                      <h2 className="text-3xl font-black tracking-tight text-slate-900 dark:text-white">
                        {activeJob.material}
                      </h2>
                    </div>
                    <div className="text-right">
                      <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Expected Target</p>
                      <p className="text-2xl font-black text-emerald-600 dark:text-emerald-500">{activeJob.targetWeight}</p>
                    </div>
                  </div>

                  {/* FIELD WORKFLOW INTERACTIVE STEPPERS */}
                  <div className="space-y-6">
                    <h3 className="text-xs font-black uppercase tracking-[0.2em] text-slate-400 mb-4">Verification Checkpoints</h3>

                    {/* STEP 1: WEIGHT BRIDGE SCALES */}
                    <div className={cn(
                      "p-6 rounded-2xl border transition-all flex flex-col md:flex-row md:items-center justify-between gap-4",
                      activeJob.actualWeight ? "bg-emerald-50 dark:bg-emerald-500/5 border-emerald-200 dark:border-emerald-500/20" : "bg-slate-50 dark:bg-slate-900/40 border-slate-200 dark:border-slate-800"
                    )}>
                      <div className="flex items-start gap-4">
                        <div className={cn(
                          "p-3 rounded-xl", 
                          activeJob.actualWeight ? "bg-emerald-100 text-emerald-600 dark:bg-emerald-500/10 dark:text-emerald-400" : "bg-slate-200 dark:bg-slate-800 text-slate-500"
                        )}>
                          <ScaleIcon className="w-6 h-6 stroke-[1.5]" />
                        </div>
                        <div>
                          <h4 className="font-bold text-base text-slate-900 dark:text-white">Integrated Weighbridge Log</h4>
                          <p className="text-xs text-slate-500 dark:text-slate-400">Calibrate & scale actual load metrics.</p>
                          {activeJob.actualWeight && (
                            <p className="text-sm font-bold text-emerald-600 dark:text-emerald-400 mt-1">
                              Logged: {activeJob.actualWeight}
                            </p>
                          )}
                        </div>
                      </div>
                      <button 
                        onClick={() => handleWeighScale(activeJob)}
                        disabled={isProcessingAction}
                        className={cn(
                          "px-5 py-3 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all",
                          activeJob.actualWeight 
                            ? "bg-emerald-100 text-emerald-700 hover:bg-emerald-200 dark:bg-emerald-500/10 dark:text-emerald-400 dark:hover:bg-emerald-500/20" 
                            : "bg-slate-900 text-white dark:bg-white dark:text-slate-900 hover:bg-slate-800"
                        )}
                      >
                        {activeJob.actualWeight ? "Recalibrate Scale" : "Request Scale Metric"}
                      </button>
                    </div>

                    {/* STEP 2: FIELD VISUAL TELEMETRY CAMERA */}
                    <div className={cn(
                      "p-6 rounded-2xl border transition-all flex flex-col md:flex-row md:items-center justify-between gap-4",
                      activeJob.image ? "bg-emerald-50 dark:bg-emerald-500/5 border-emerald-200 dark:border-emerald-500/20" : "bg-slate-50 dark:bg-slate-900/40 border-slate-200 dark:border-slate-800"
                    )}>
                      <div className="flex items-start gap-4">
                        <div className={cn(
                          "p-3 rounded-xl", 
                          activeJob.image ? "bg-emerald-100 text-emerald-600 dark:bg-emerald-500/10 dark:text-emerald-400" : "bg-slate-200 dark:bg-slate-800 text-slate-500"
                        )}>
                          <CameraIcon className="w-6 h-6 stroke-[1.5]" />
                        </div>
                        <div className="flex-1">
                          <h4 className="font-bold text-base text-slate-900 dark:text-white">Load Inspection Photo</h4>
                          <p className="text-xs text-slate-500 dark:text-slate-400">Upload cargo configuration snap for HQ sign off.</p>
                          
                          {activeJob.image && (
                            <div className="relative h-16 w-24 mt-3 rounded-lg overflow-hidden border border-emerald-200 dark:border-emerald-500/30">
                              <img src={activeJob.image} alt="Cargo Snapshot" className="object-cover h-full w-full" />
                            </div>
                          )}
                        </div>
                      </div>
                      <button 
                        onClick={() => handleCapturePhoto(activeJob)}
                        disabled={!activeJob.actualWeight || isProcessingAction}
                        className={cn(
                          "px-5 py-3 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all",
                          !activeJob.actualWeight 
                            ? "bg-slate-200 dark:bg-white/5 text-slate-400 cursor-not-allowed" 
                            : "bg-slate-900 text-white dark:bg-white dark:text-slate-900 hover:bg-slate-800"
                        )}
                      >
                        {activeJob.image ? "Retake Snapshot" : "Capture Load Camera"}
                      </button>
                    </div>
                  </div>
                </div>

                {/* WORKSPACE FOOTER - ACTION CONTROL */}
                <div className="border-t border-slate-100 dark:border-white/10 pt-8 mt-12 flex flex-col md:flex-row justify-between items-center gap-4">
                  <div className="flex items-center gap-2 text-slate-500 dark:text-slate-400 text-xs font-semibold">
                    <ExclamationCircleIcon className="w-4 h-4 stroke-[2]" /> Verify both steps before dispatch.
                  </div>

                  <button
                    onClick={() => handleSubmitToMissionControl(activeJob)}
                    disabled={activeJob.status !== "photo_uploaded" || isProcessingAction}
                    className={cn(
                      "w-full md:w-auto px-10 py-4 rounded-2xl text-[10px] font-black uppercase tracking-widest transition-all flex items-center justify-center gap-2 shadow-xl",
                      activeJob.status === "photo_uploaded" && !isProcessingAction
                        ? "bg-emerald-600 text-white hover:scale-[1.02] shadow-emerald-600/20"
                        : "bg-slate-200 dark:bg-slate-800 text-slate-400 cursor-not-allowed shadow-none"
                    )}
                  >
                    {isProcessingAction ? (
                      <>
                        <ArrowPathIcon className="w-4 h-4 animate-spin" /> Dispatching...
                      </>
                    ) : (
                      <>
                        <CloudArrowUpIcon className="w-4 h-4 stroke-[2]" /> Send to Mission Control
                      </>
                    )}
                  </button>
                </div>
              </motion.section>
            ) : (
              <div className="h-full flex flex-col items-center justify-center text-center p-12 rounded-[3rem] border border-dashed border-slate-300 dark:border-slate-800">
                <div className="p-4 bg-slate-100 dark:bg-slate-900 rounded-full mb-4">
                  <ClipboardDocumentCheckIcon className="w-12 h-12 text-slate-400" />
                </div>
                <h3 className="text-xl font-bold text-slate-900 dark:text-white">Shift All Cleaned</h3>
                <p className="text-sm text-slate-500 dark:text-slate-400 max-w-xs mt-2">
                  Log an active dispatch from the left panel to begin verification and weigh scale operations.
                </p>
              </div>
            )}
          </AnimatePresence>
        </div>

      </div>
    </div>
  );
}