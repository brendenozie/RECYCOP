"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  PlusIcon,
  ScaleIcon,
  CameraIcon,
  MapPinIcon,
  ArrowPathIcon,
  CheckCircleIcon,
  ClipboardDocumentCheckIcon,
  CloudArrowUpIcon,
  ExclamationCircleIcon
} from "@heroicons/react/24/outline";

// Simple helper for class merging
function cn(...classes: (string | boolean | undefined)[]) {
  return classes.filter(Boolean).join(" ");
}

interface CollectionJob {
  id: string;
  material: string;
  targetWeight: string;
  hub: string;
  status: "pending" | "weighed" | "photo_uploaded" | "submitted";
  actualWeight?: string;
  image?: string;
}

export default function FieldOfficerDashboard() {
  // Active dynamic operations state
  const [jobs, setJobs] = useState<CollectionJob[]>([
    { id: "JOB-402", material: "HDPE Polymer", targetWeight: "4.5t", hub: "Kisumu Hub", status: "pending" },
    { id: "JOB-403", material: "Clear PET Flakes", targetWeight: "12.0t", hub: "Nairobi Central", status: "weighed", actualWeight: "12.4t" },
    { id: "JOB-404", material: "Aluminum UBCs", targetWeight: "2.0t", hub: "Thika Node", status: "pending" }
  ]);

  // Form State for creating a new load dispatch
  const [newMaterial, setNewMaterial] = useState("HDPE Polymer");
  const [newHub, setNewHub] = useState("Nairobi Central");
  const [newWeight, setNewWeight] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Active workspace item
  const [selectedJobId, setSelectedJobId] = useState<string | null>("JOB-402");
  const activeJob = jobs.find(j => j.id === selectedJobId) || jobs[0];

  // Action: Register New Load
  const handleCreateLoad = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newWeight) return;

    const newId = `JOB-${Math.floor(100 + Math.random() * 900)}`;
    const newJob: CollectionJob = {
      id: newId,
      material: newMaterial,
      targetWeight: `${newWeight}t`,
      hub: newHub,
      status: "pending"
    };

    setJobs([newJob, ...jobs]);
    setSelectedJobId(newId);
    setNewWeight("");
  };

  // Action: Simulate Weight Scale Reading
  const handleWeighScale = (id: string) => {
    setJobs(prev => prev.map(job => {
      if (job.id === id) {
        // Simulating scale calibration read
        const numericTarget = parseFloat(job.targetWeight);
        const randomizedVariance = (numericTarget + (Math.random() * 0.6 - 0.3)).toFixed(1);
        return {
          ...job,
          status: "weighed",
          actualWeight: `${randomizedVariance}t`
        };
      }
      return job;
    }));
  };

  // Action: Simulate Quick Camera Snapshot
  const handleCapturePhoto = (id: string) => {
    const mockCargoImages = [
      "https://images.unsplash.com/photo-1591871937573-74dbba515c4c?auto=format&fit=crop&q=80&w=400",
      "https://images.unsplash.com/photo-1532996122724-e3c354a0b15b?auto=format&fit=crop&q=80&w=400",
      "https://images.unsplash.com/photo-1611284446314-60a58ac0deb9?auto=format&fit=crop&q=80&w=400"
    ];
    const randomImg = mockCargoImages[Math.floor(Math.random() * mockCargoImages.length)];

    setJobs(prev => prev.map(job => {
      if (job.id === id) {
        return {
          ...job,
          status: "photo_uploaded",
          image: randomImg
        };
      }
      return job;
    }));
  };

  // Action: Submit to Mission Control Queue
  const handleSubmitToMissionControl = (id: string) => {
    setIsSubmitting(true);
    setTimeout(() => {
      setJobs(prev => prev.filter(job => job.id !== id));
      setSelectedJobId(null);
      setIsSubmitting(false);
    }, 1200);
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-white p-6 md:p-12">
      
      {/* HEADER */}
      <header className="mb-12 flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div>
          <span className="text-[10px] font-black uppercase tracking-[0.25em] text-emerald-500">Field Unit Node-04</span>
          <h1 className="text-4xl font-serif font-bold italic tracking-tight mt-1">Field Registry</h1>
          <p className="text-slate-500 text-sm font-medium mt-1">
            Logged in at <span className="text-slate-800 dark:text-slate-300 font-semibold">Athiriver Depot</span> • Hub Status Active
          </p>
        </div>
        
        <div className="flex gap-4">
          <div className="px-6 py-3 rounded-2xl bg-white dark:bg-white/5 border border-slate-200 dark:border-white/10 flex items-center gap-3">
            <MapPinIcon className="w-5 h-5 text-emerald-500" />
            <span className="text-xs font-bold">Nairobi-Mombasa Corridor</span>
          </div>
        </div>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* LEFT COLUMN: REGISTRATION & LIST */}
        <div className="lg:col-span-5 space-y-8">
          
          {/* QUICK LOG LOAD FORM */}
          <section className="p-8 rounded-[2.5rem] bg-white dark:bg-white/5 border border-slate-200 dark:border-white/10">
            <h3 className="text-lg font-black tracking-tight mb-4 flex items-center gap-2">
              <PlusIcon className="w-5 h-5 text-emerald-500" /> Register Dispatch Load
            </h3>
            
            <form onSubmit={handleCreateLoad} className="space-y-4">
              <div>
                <label className="text-[10px] font-black uppercase tracking-wider text-slate-400 block mb-2">Material Stream</label>
                <select 
                  value={newMaterial}
                  onChange={(e) => setNewMaterial(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/10 text-sm font-semibold focus:outline-none focus:border-emerald-500 transition-colors"
                >
                  <option value="HDPE Polymer">HDPE Polymer</option>
                  <option value="Aluminum UBCs">Aluminum UBCs</option>
                  <option value="Clear PET Flakes">Clear PET Flakes</option>
                </select>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-[10px] font-black uppercase tracking-wider text-slate-400 block mb-2">Target Weight (Tons)</label>
                  <input 
                    type="number" 
                    step="0.1"
                    placeholder="e.g. 5.8" 
                    value={newWeight}
                    onChange={(e) => setNewWeight(e.target.value)}
                    className="w-full px-4 py-3 rounded-xl bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/10 text-sm font-semibold focus:outline-none focus:border-emerald-500 transition-colors"
                    required
                  />
                </div>
                <div>
                  <label className="text-[10px] font-black uppercase tracking-wider text-slate-400 block mb-2">Destination Hub</label>
                  <select 
                    value={newHub}
                    onChange={(e) => setNewHub(e.target.value)}
                    className="w-full px-4 py-3 rounded-xl bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/10 text-sm font-semibold focus:outline-none focus:border-emerald-500 transition-colors"
                  >
                    <option value="Nairobi Central">Nairobi Central</option>
                    <option value="Kisumu Hub">Kisumu Hub</option>
                    <option value="Thika Node">Thika Node</option>
                  </select>
                </div>
              </div>

              <button 
                type="submit"
                className="w-full py-4 rounded-xl bg-emerald-600 text-white text-[10px] font-black uppercase tracking-widest hover:bg-emerald-500 transition-all flex items-center justify-center gap-2"
              >
                <PlusIcon className="w-4 h-4" /> Initialize Dispatch Track
              </button>
            </form>
          </section>

          {/* ON-GOING DISPATCHES LIST */}
          <section className="p-8 rounded-[2.5rem] bg-white dark:bg-white/5 border border-slate-200 dark:border-white/10">
            <h3 className="text-lg font-black tracking-tight mb-4">Active Ground Shifts</h3>
            <div className="space-y-3">
              {jobs.map((job) => {
                const isSelected = selectedJobId === job.id;
                return (
                  <button
                    key={job.id}
                    onClick={() => setSelectedJobId(job.id)}
                    className={cn(
                      "w-full text-left p-5 rounded-2xl border transition-all flex items-center justify-between",
                      isSelected 
                        ? "bg-emerald-500/10 border-emerald-500/30" 
                        : "bg-slate-50 dark:bg-white/[0.02] border-transparent hover:border-slate-200 dark:hover:border-white/10"
                    )}
                  >
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <span className="text-[9px] font-black uppercase bg-slate-800 dark:bg-slate-200 text-white dark:text-slate-900 px-2 py-0.5 rounded">
                          {job.id}
                        </span>
                        <span className="text-xs font-semibold text-slate-500">{job.hub}</span>
                      </div>
                      <h4 className="font-bold text-sm">{job.material}</h4>
                    </div>

                    <div className="text-right">
                      <span className={cn(
                        "text-[9px] font-bold uppercase tracking-wider px-2 py-1 rounded-lg",
                        job.status === "submitted" && "bg-blue-500/10 text-blue-500",
                        job.status === "photo_uploaded" && "bg-orange-500/10 text-orange-500",
                        job.status === "weighed" && "bg-purple-500/10 text-purple-500",
                        job.status === "pending" && "bg-slate-500/10 text-slate-500"
                      )}>
                        {job.status.replace("_", " ")}
                      </span>
                      <p className="text-xs font-bold text-slate-400 mt-1">{job.actualWeight || job.targetWeight}</p>
                    </div>
                  </button>
                );
              })}
              {jobs.length === 0 && (
                <div className="text-center py-6 text-slate-400 text-sm">No ongoing ground dispatches.</div>
              )}
            </div>
          </section>

        </div>

        {/* RIGHT COLUMN: INTERACTIVE WORKSPACE */}
        <div className="lg:col-span-7">
          <AnimatePresence mode="wait">
            {activeJob ? (
              <motion.section 
                key={activeJob.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="p-10 rounded-[3rem] bg-white dark:bg-white/5 border border-slate-200 dark:border-white/10 h-full flex flex-col justify-between"
              >
                <div>
                  {/* WORKSPACE HEADER */}
                  <div className="flex justify-between items-start border-b border-slate-100 dark:border-white/10 pb-6 mb-8">
                    <div>
                      <div className="flex items-center gap-2 mb-2">
                        <span className="text-[10px] font-black bg-slate-900 dark:bg-white dark:text-slate-900 text-white px-3 py-1 rounded-full uppercase tracking-widest">
                          {activeJob.id}
                        </span>
                        <span className="text-xs font-bold text-emerald-500 flex items-center gap-1">
                          <MapPinIcon className="w-3.5 h-3.5" /> {activeJob.hub}
                        </span>
                      </div>
                      <h2 className="text-3xl font-black tracking-tight">{activeJob.material}</h2>
                    </div>
                    <div className="text-right">
                      <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Expected Target</p>
                      <p className="text-2xl font-black text-emerald-500">{activeJob.targetWeight}</p>
                    </div>
                  </div>

                  {/* FIELD WORKFLOW INTERACTIVE STEPPERS */}
                  <div className="space-y-6">
                    <h3 className="text-xs font-black uppercase tracking-[0.2em] text-slate-400 mb-4">Verification Checkpoints</h3>

                    {/* STEP 1: WEIGHT BRIDGE SCALES */}
                    <div className={cn(
                      "p-6 rounded-2xl border transition-all flex flex-col md:flex-row md:items-center justify-between gap-4",
                      activeJob.actualWeight ? "bg-emerald-500/5 border-emerald-500/20" : "bg-slate-50 dark:bg-white/[0.02] border-transparent"
                    )}>
                      <div className="flex items-start gap-4">
                        <div className={cn(
                          "p-3 rounded-xl", 
                          activeJob.actualWeight ? "bg-emerald-500/10 text-emerald-500" : "bg-slate-200 dark:bg-white/10 text-slate-500"
                        )}>
                          <ScaleIcon className="w-6 h-6" />
                        </div>
                        <div>
                          <h4 className="font-bold text-base">Integrated Weighbridge Log</h4>
                          <p className="text-xs text-slate-400">Calibrate & scale actual load metrics.</p>
                          {activeJob.actualWeight && (
                            <p className="text-sm font-bold text-emerald-500 mt-1">Logged: {activeJob.actualWeight}</p>
                          )}
                        </div>
                      </div>
                      <button 
                        onClick={() => handleWeighScale(activeJob.id)}
                        className={cn(
                          "px-5 py-3 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all",
                          activeJob.actualWeight 
                            ? "bg-emerald-500/10 text-emerald-500 hover:bg-emerald-500/20" 
                            : "bg-slate-900 text-white dark:bg-white dark:text-slate-900"
                        )}
                      >
                        {activeJob.actualWeight ? "Recalibrate Scale" : "Request Scale Metric"}
                      </button>
                    </div>

                    {/* STEP 2: FIELD VISUAL TELEMETRY CAMERA */}
                    <div className={cn(
                      "p-6 rounded-2xl border transition-all flex flex-col md:flex-row md:items-center justify-between gap-4",
                      activeJob.image ? "bg-emerald-500/5 border-emerald-500/20" : "bg-slate-50 dark:bg-white/[0.02] border-transparent"
                    )}>
                      <div className="flex items-start gap-4">
                        <div className={cn(
                          "p-3 rounded-xl", 
                          activeJob.image ? "bg-emerald-500/10 text-emerald-500" : "bg-slate-200 dark:bg-white/10 text-slate-500"
                        )}>
                          <CameraIcon className="w-6 h-6" />
                        </div>
                        <div className="flex-1">
                          <h4 className="font-bold text-base">Load Inspection Photo</h4>
                          <p className="text-xs text-slate-400">Upload cargo configuration snap for HQ sign off.</p>
                          
                          {activeJob.image && (
                            <div className="relative h-16 w-24 mt-2 rounded-lg overflow-hidden border border-emerald-500/30">
                              <img src={activeJob.image} alt="Cargo Snapshot" className="object-cover h-full w-full" />
                            </div>
                          )}
                        </div>
                      </div>
                      <button 
                        onClick={() => handleCapturePhoto(activeJob.id)}
                        disabled={!activeJob.actualWeight}
                        className={cn(
                          "px-5 py-3 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all",
                          !activeJob.actualWeight 
                            ? "bg-slate-200 dark:bg-white/5 text-slate-400 cursor-not-allowed" 
                            : "bg-slate-900 text-white dark:bg-white dark:text-slate-900"
                        )}
                      >
                        {activeJob.image ? "Retake Snapshot" : "Capture Load Camera"}
                      </button>
                    </div>
                  </div>
                </div>

                {/* WORKSPACE FOOTER - ACTION CONTROL */}
                <div className="border-t border-slate-100 dark:border-white/10 pt-8 mt-12 flex flex-col md:flex-row justify-between items-center gap-4">
                  <div className="flex items-center gap-2 text-slate-400 text-xs font-semibold">
                    <ExclamationCircleIcon className="w-4 h-4" /> Verify both steps before dispatch.
                  </div>

                  <button
                    onClick={() => handleSubmitToMissionControl(activeJob.id)}
                    disabled={activeJob.status !== "photo_uploaded" || isSubmitting}
                    className={cn(
                      "w-full md:w-auto px-10 py-4 rounded-2xl text-[10px] font-black uppercase tracking-widest transition-all flex items-center justify-center gap-2 shadow-xl",
                      activeJob.status === "photo_uploaded" && !isSubmitting
                        ? "bg-emerald-600 text-white hover:scale-[1.02] shadow-emerald-600/20"
                        : "bg-slate-200 dark:bg-white/5 text-slate-400 cursor-not-allowed shadow-none"
                    )}
                  >
                    {isSubmitting ? (
                      <>
                        <ArrowPathIcon className="w-4 h-4 animate-spin" /> Dispatching...
                      </>
                    ) : (
                      <>
                        <CloudArrowUpIcon className="w-4 h-4" /> Send to Mission Control
                      </>
                    )}
                  </button>
                </div>
              </motion.section>
            ) : (
              <div className="h-full flex flex-col items-center justify-center text-center p-12 rounded-[3rem] border border-dashed border-slate-200 dark:border-white/10">
                <ClipboardDocumentCheckIcon className="w-16 h-16 text-slate-300 dark:text-white/10 mb-4" />
                <h3 className="text-xl font-bold">Shift All Cleaned</h3>
                <p className="text-sm text-slate-400 max-w-xs mt-1">Log an active dispatch above to begin verification and weigh scale operations.</p>
              </div>
            )}
          </AnimatePresence>
        </div>

      </div>
    </div>
  );
}