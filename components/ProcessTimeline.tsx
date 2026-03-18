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

// Stylized topological nodes for Nairobi
const nodes = [
  { id: 'agg1', x: 25, y: 35, type: 'aggregation', label: 'Westlands Collector Node' },
  { id: 'agg2', x: 20, y: 70, type: 'aggregation', label: 'Kibera Cooperative Unit' },
  { id: 'agg3', x: 45, y: 25, type: 'aggregation', label: 'Kasaranai aggregation' },
  { id: 'hub1', x: 50, y: 55, type: 'hub', label: 'Central Nairobi Processing Hub', phase: 3 },
  { id: 'export', x: 80, y: 65, type: 'gateway', label: 'Jomo Kenyatta Int’l Airport (JKIA) Gateway', phase: 5 },
];

const paths = [
  { from: 'agg1', to: 'hub1', delay: 0 },
  { from: 'agg2', to: 'hub1', delay: 0.1 },
  { from: 'agg3', to: 'hub1', delay: 0.2 },
  { from: 'hub1', to: 'export', delay: 0.5 },
];

const liveData = [
  { label: "Active Collectors", value: "1,240", icon: MapPinIcon, color: "emerald" },
  { label: "Material in Transit", value: "45.2 Tonnes", icon: TruckIcon, color: "purple" },
  { label: "Processed Inventory", value: "112.8 Tonnes", icon: ChartBarIcon, color: "emerald" },
  { label: "Export Ready (PET)", value: "88%", icon: GlobeAltIcon, color: "purple" },
];

function Node({ x, y, type, label }: { x: number; y: number; type: string; label: string }) {
  const isAggregation = type === 'aggregation';
  const isHub = type === 'hub';
  const isGateway = type === 'gateway';

  return (
    <motion.div
      initial={{ scale: 0, opacity: 0 }}
      whileInView={{ scale: 1, opacity: 1 }}
      className="absolute group"
      style={{ left: `${x}%`, top: `${y}%` }}
    >
      <div className={cn(
        "rounded-full border shadow-lg flex items-center justify-center -translate-x-1/2 -translate-y-1/2 transition-transform duration-500 group-hover:scale-110",
        isAggregation && "h-4 w-4 bg-slate-900 dark:bg-slate-700 border-slate-700 dark:border-slate-500",
        isHub && "h-12 w-12 bg-white dark:bg-[#120326] border-emerald-500 dark:border-emerald-500/50 p-2",
        isGateway && "h-16 w-16 bg-white dark:bg-[#1a0433] border-purple-500 dark:border-purple-500/50 p-3"
      )}>
        {isAggregation && <MapPinIcon className="h-2 w-2 text-emerald-500" />}
        {isHub && <div className="h-6 w-6 rounded-lg bg-emerald-500/10 text-emerald-400 p-1 flex items-center justify-center"> <ArrowsRightLeftIcon className="h-4 w-4" /> </div>}
        {isGateway && <div className="h-full w-full rounded-2xl bg-purple-500/10 text-purple-400 flex items-center justify-center p-2"><GlobeAltIcon className="h-8 w-8" /></div>}
      
      </div>
      
      {/* Dynamic Tooltip on Hover */}
      <div className="absolute top-full left-1/2 -translate-x-1/2 mt-3 whitespace-nowrap rounded-lg bg-black/80 dark:bg-white p-2 px-3 text-[10px] text-white dark:text-black font-bold opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
          {label}
      </div>
    </motion.div>
  );
}

function CircuitPath({ fromX, fromY, toX, toY, delay }: { fromX: number; fromY: number; toX: number; toY: number; delay: number }) {
  // SVG viewbox is 100x100 for percentage coordinate mapping
  return (
    <motion.path
      initial={{ pathLength: 0 }}
      whileInView={{ pathLength: 1 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 1.5, delay: delay, ease: [0.22, 1, 0.36, 1] }}
      d={`M ${fromX} ${fromY} L ${toX} ${toY}`}
      className="stroke-emerald-600/30 dark:stroke-emerald-400/30 hover:stroke-emerald-400 transition-colors"
      strokeWidth="0.5"
      fill="none"
    />
  );
}

export function ProcessTimeline() {
  const mapRef = useRef<HTMLDivElement>(null);

  return (
    <section ref={mapRef} className="relative py-32 bg-white dark:bg-[#0a0118] transition-colors duration-500 overflow-hidden">
      
      {/* --- Section Header (Serif Style) --- */}
      <div className="container mx-auto px-6 mb-24 relative z-10 text-center lg:text-left">
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-emerald-100 dark:bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 font-black uppercase tracking-[0.2em] text-[10px] mb-6"
          >
            <MapPinIcon className="h-4 w-4" />
            <span>Operational Visualization</span>
          </motion.div>
          <h2 className="font-serif text-5xl md:text-7xl text-slate-900 dark:text-white leading-[1.1] max-w-4xl mx-auto lg:mx-0">
            Nairobi <span className="italic text-emerald-600 dark:text-emerald-400">Logistics Hub</span> &amp; Market Gateway.
          </h2>
      </div>

      {/* --- THE MAIN VISUALIZATION HUB --- */}
      <div className="container mx-auto px-6 relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
        
        {/* LEFT: Live Data Feed (Glass Cards) */}
        <div className="lg:col-span-3 space-y-4">
          <div className="max-w-xs mb-8">
            <h3 className="text-xl font-serif text-slate-900 dark:text-white mb-2">Live Node Status</h3>
            <p className="text-sm text-slate-500 dark:text-purple-100/60 font-light leading-relaxed">
                RecycOp’s localized intelligence data, mapped to regional operational flows.
            </p>
          </div>
          
          {liveData.map((data, i) => (
            <motion.div 
              key={i}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.1 }}
              className="p-5 rounded-3xl bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/10 backdrop-blur-md flex items-center gap-4 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
            >
              <div className={cn(
                "p-3 rounded-2xl",
                data.color === 'emerald' ? "bg-emerald-50 dark:bg-emerald-500/10 text-emerald-600 dark:text-emerald-400" : "bg-purple-50 dark:bg-purple-500/10 text-purple-600 dark:text-purple-400"
              )}>
                <data.icon className="h-5 w-5" />
              </div>
              <div>
                <p className="text-[10px] font-black uppercase tracking-widest text-slate-400 dark:text-white/30 mb-1">
                  {data.label}
                </p>
                <p className="text-2xl font-bold text-slate-900 dark:text-white tracking-tighter">
                  {data.value}
                </p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* RIGHT: The Topological Route Map (Nairobi Centered) */}
        <div className="lg:col-span-9 relative">
          <div className="aspect-[16/10] w-full rounded-[3rem] bg-slate-100 dark:bg-[#05010d] p-3 border-2 border-slate-200 dark:border-white/10 shadow-inner overflow-hidden relative">
              
              {/* The Map "blueprint" Grid */}
              <div className="absolute inset-0 z-0 opacity-[0.1] dark:opacity-[0.2]">
                <div className="absolute inset-0 bg-[linear-gradient(to_right,#808080_1px,transparent_1px),linear-gradient(to_bottom,#808080_1px,transparent_1px)] bg-[size:50px_50px]" />
              </div>

              {/* Central Map SVG for Routes */}
              <svg width="100%" height="100%" viewBox="0 0 100 100" className="absolute inset-0 z-10 pointer-events-none">
                {paths.map((path, i) => {
                  const fromNode = nodes.find(n => n.id === path.from);
                  const toNode = nodes.find(n => n.id === path.to);
                  if (!fromNode || !toNode) return null;
                  return <CircuitPath key={i} fromX={fromNode.x} fromY={fromNode.y} toX={toNode.x} toY={toNode.y} delay={path.delay} />;
                })}
              </svg>

              {/* Operational Nodes */}
              <div className="absolute inset-0 z-20">
                {nodes.map((node) => <Node key={node.id} {...node} />)}
              </div>
              
              {/* Map Footer Label */}
              <div className="absolute bottom-6 left-1/2 -translate-x-1/2 rounded-full bg-slate-900 dark:bg-[#1a0433] px-6 py-2.5 border border-white/10 flex items-center gap-3 shadow-xl">
                  <div className="h-2.5 w-2.5 rounded-full bg-emerald-500 animate-pulse shadow-[0_0_10px_#10b981]" />
                  <span className="text-[10px] font-black uppercase tracking-[0.3em] text-white">RecycOp Local Stream [NBO Node 112]</span>
              </div>
          </div>
        </div>

      </div>
    </section>
  );
}