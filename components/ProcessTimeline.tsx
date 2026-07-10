"use client";

import { motion } from "framer-motion";
import { 
  TruckIcon, 
  MapPinIcon, 
  GlobeAltIcon, 
  ArrowsRightLeftIcon, 
  ChartBarIcon
} from "@heroicons/react/24/outline";
import { cn } from "@/lib/utils";
import { useRef } from "react";

// Stylized tracking map nodes for Nairobi neighborhoods
const nodes = [
  { id: 'agg1', x: 25, y: 30, type: 'aggregation', label: 'Westlands Drop-off Site' },
  { id: 'agg2', x: 20, y: 70, type: 'aggregation', label: 'Kibera Community Center' },
  { id: 'agg3', x: 45, y: 20, type: 'aggregation', label: 'Kasarani Group Point' },
  { id: 'hub1', x: 50, y: 55, type: 'hub', label: 'Central Nairobi Processing Center' },
  { id: 'export', x: 80, y: 65, type: 'gateway', label: 'Main Manufacturing Gateway' },
];

const paths = [
  { from: 'agg1', to: 'hub1', delay: 0 },
  { from: 'agg2', to: 'hub1', delay: 0.1 },
  { from: 'agg3', to: 'hub1', delay: 0.2 },
  { from: 'hub1', to: 'export', delay: 0.5 },
];

const liveData = [
  { label: "Active Group Members", value: "1,240", icon: MapPinIcon, color: "emerald" },
  { label: "Materials On the Move", value: "45.2 Tonnes", icon: TruckIcon, color: "purple" },
  { label: "Processed & Ready", value: "112.8 Tonnes", icon: ChartBarIcon, color: "emerald" },
  { label: "Shipped to Factories", value: "88%", icon: GlobeAltIcon, color: "purple" },
];

function Node({ x, y, type, label }: { x: number; y: number; type: string; label: string }) {
  const isAggregation = type === 'aggregation';
  const isHub = type === 'hub';
  const isGateway = type === 'gateway';

  return (
    <motion.div
      initial={{ scale: 0, opacity: 0 }}
      whileInView={{ scale: 1, opacity: 1 }}
      viewport={{ once: true }}
      className="absolute group"
      style={{ left: `${x}%`, top: `${y}%` }}
    >
      <div className={cn(
        "rounded-full border shadow-md flex items-center justify-center -translate-x-1/2 -translate-y-1/2 transition-transform duration-300 group-hover:scale-110 cursor-pointer",
        isAggregation && "h-5 w-5 bg-slate-900 dark:bg-slate-700 border-slate-700 dark:border-slate-500",
        isHub && "h-12 w-12 bg-white dark:bg-[#120326] border-emerald-500 dark:border-emerald-500/50 p-2",
        isGateway && "h-14 w-14 bg-white dark:bg-[#1a0433] border-purple-500 dark:border-purple-500/50 p-3"
      )}>
        {isAggregation && <MapPinIcon className="h-3 w-3 text-emerald-400" />}
        {isHub && (
          <div className="h-7 w-7 rounded-lg bg-emerald-100 dark:bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 p-1 flex items-center justify-center">
            <ArrowsRightLeftIcon className="h-4 w-4" />
          </div>
        )}
        {isGateway && (
          <div className="h-full w-full rounded-xl bg-purple-100 dark:bg-purple-500/10 text-purple-600 dark:text-purple-400 flex items-center justify-center p-1.5">
            <GlobeAltIcon className="h-6 w-6" />
          </div>
        )}
      </div>
      
      {/* Interactive Label Tooltip */}
      <div className="absolute top-full left-1/2 -translate-x-1/2 mt-2 whitespace-nowrap rounded-lg bg-slate-900 dark:bg-white px-2.5 py-1.5 text-[10px] text-white dark:text-slate-900 font-bold shadow-md opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none z-30">
        {label}
      </div>
    </motion.div>
  );
}

function CircuitPath({ fromX, fromY, toX, toY, delay }: { fromX: number; fromY: number; toX: number; toY: number; delay: number }) {
  return (
    <motion.path
      initial={{ pathLength: 0 }}
      whileInView={{ pathLength: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 1.2, delay: delay, ease: "easeInOut" }}
      d={`M ${fromX} ${fromY} L ${toX} ${toY}`}
      className="stroke-emerald-500/40 dark:stroke-emerald-400/30 transition-colors"
      strokeWidth="0.75"
      fill="none"
    />
  );
}

export function ProcessTimeline() {
  const mapRef = useRef<HTMLDivElement>(null);

  return (
    <section ref={mapRef} className="relative py-16 sm:py-24 md:py-32 bg-white dark:bg-[#0a0118] transition-colors duration-500 overflow-hidden">
      
      {/* Section Header */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 mb-12 md:mb-24 relative z-10 text-center lg:text-left">
        <motion.div 
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-emerald-100 dark:bg-emerald-500/10 text-emerald-700 dark:text-emerald-400 font-bold uppercase tracking-wide text-[10px] mb-4"
        >
          <MapPinIcon className="h-4 w-4" />
          <span>Real-Time Tracking Map</span>
        </motion.div>
        <h2 className="font-sans font-extrabold text-3xl sm:text-5xl md:text-6xl text-slate-900 dark:text-white tracking-tight leading-[1.15] max-w-4xl mx-auto lg:mx-0">
          See How Recycled Materials <br className="hidden sm:inline" />
          Move Through Our <span className="text-emerald-600 dark:text-emerald-400">Local Network.</span>
        </h2>
      </div>

      {/* Main Grid View */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
        
        {/* LEFT: Live Counters */}
        <div className="lg:col-span-4 order-2 lg:order-1 space-y-4">
          <div className="text-center lg:text-left mb-6 lg:mb-8 max-w-sm mx-auto lg:mx-0">
            <h3 className="text-xl font-bold text-slate-900 dark:text-white tracking-tight">Today&apos;s Activity Feed</h3>
            <p className="text-sm text-slate-600 dark:text-purple-100/60 font-normal leading-relaxed mt-1">
              Live collection stats updated from our smart collection apps and local weigh scales.
            </p>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-4">
            {liveData.map((data, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.05 }}
                viewport={{ once: true }}
                className="p-4 sm:p-5 rounded-2xl bg-slate-50 dark:bg-white/5 border border-slate-200/70 dark:border-white/10 backdrop-blur-md flex items-center gap-4 shadow-sm"
              >
                <div className={cn(
                  "p-3 rounded-xl flex-shrink-0",
                  data.color === 'emerald' ? "bg-emerald-100/70 dark:bg-emerald-500/10 text-emerald-700 dark:text-emerald-400" : "bg-purple-100/70 dark:bg-purple-500/10 text-purple-700 dark:text-purple-400"
                )}>
                  <data.icon className="h-5 w-5" />
                </div>
                <div>
                  <p className="text-[10px] font-bold uppercase tracking-wide text-slate-400 dark:text-white/40 mb-0.5">
                    {data.label}
                  </p>
                  <p className="text-xl sm:text-2xl font-extrabold text-slate-900 dark:text-white tracking-tight">
                    {data.value}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* RIGHT: Visual Map System */}
        <div className="lg:col-span-8 order-1 lg:order-2 relative w-full">
          <div className="aspect-[16/10] hidden sm:block w-full rounded-3xl bg-slate-100 dark:bg-[#05010d] p-3 border border-slate-200 dark:border-white/10 shadow-inner overflow-hidden relative">
              
              {/* Map Layout Blueprint Grid */}
              <div className="absolute inset-0 z-0 opacity-[0.08] dark:opacity-[0.15]">
                <div className="absolute inset-0 bg-[linear-gradient(to_right,#808080_1px,transparent_1px),linear-gradient(to_bottom,#808080_1px,transparent_1px)] bg-[size:40px_40px]" />
              </div>

              {/* Connecting Paths */}
              <svg width="100%" height="100%" viewBox="0 0 100 100" className="absolute inset-0 z-10 pointer-events-none">
                {paths.map((path, i) => {
                  const fromNode = nodes.find(n => n.id === path.from);
                  const toNode = nodes.find(n => n.id === path.to);
                  if (!fromNode || !toNode) return null;
                  return <CircuitPath key={i} fromX={fromNode.x} fromY={fromNode.y} toX={toNode.x} toY={toNode.y} delay={path.delay} />;
                })}
              </svg>

              {/* Operational Interactive Nodes */}
              <div className="absolute inset-0 z-20">
                {nodes.map((node) => <Node key={node.id} {...node} />)}
              </div>
              
              {/* Map Floating Footnote */}
              <div className="absolute bottom-4 left-1/2 -translate-x-1/2 rounded-full bg-slate-950 dark:bg-[#1a0433] px-5 py-2 border border-white/10 flex items-center gap-2.5 shadow-md">
                <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
                <span className="text-[9px] font-bold uppercase tracking-wider text-white/90">Hover on markers to explore centers</span>
              </div>
          </div>

          {/* Fallback Clean View List for Small Phone Screens */}
          <div className="block sm:hidden rounded-2xl bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/10 p-5 space-y-3">
            <h4 className="text-xs font-bold uppercase text-slate-400 tracking-wider">Our Connected Locations</h4>
            <ul className="space-y-2 text-sm text-slate-800 dark:text-purple-100/80 font-medium">
              <li className="flex items-center gap-2"><span className="h-1.5 w-1.5 rounded-full bg-slate-400" /> Westlands Collection Site</li>
              <li className="flex items-center gap-2"><span className="h-1.5 w-1.5 rounded-full bg-slate-400" /> Kibera Cooperative Unit</li>
              <li className="flex items-center gap-2"><span className="h-1.5 w-1.5 rounded-full bg-slate-400" /> Kasarani Collection Point</li>
              <li className="flex items-center gap-2 text-emerald-600 dark:text-emerald-400"><span className="h-1.5 w-1.5 rounded-full bg-emerald-500" /> Central Nairobi Processing Center</li>
              <li className="flex items-center gap-2 text-purple-600 dark:text-purple-400"><span className="h-1.5 w-1.5 rounded-full bg-purple-500" /> Main Factory Gateway</li>
            </ul>
          </div>
        </div>

      </div>
    </section>
  );
}