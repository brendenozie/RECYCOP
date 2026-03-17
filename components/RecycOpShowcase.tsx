"use client";

import { motion } from "framer-motion";
import { 
  ChartBarIcon, 
  MapIcon, 
  UserGroupIcon, 
  BoltIcon,
  CircleStackIcon,
  ArrowUpRightIcon
} from "@heroicons/react/24/outline";

export function RecycOpShowcase() {
  return (
    <section className="py-24 bg-[#3b0764] overflow-hidden">
      <div className="container mx-auto px-6">
        <div className="flex flex-col lg:flex-row items-center gap-16">
          
          {/* Left: The Value Prop */}
          <div className="lg:w-1/3 space-y-8">
            <div className="inline-flex items-center space-x-2 rounded-full bg-emerald-500/10 px-4 py-1 text-emerald-400 ring-1 ring-emerald-500/20">
              <BoltIcon className="h-4 w-4" />
              <span className="text-xs font-bold uppercase tracking-widest">Live Intelligence</span>
            </div>
            
            <h2 className="font-serif text-4xl md:text-5xl leading-tight">
              The Brain of the <br />
              <span className="text-emerald-400 italic">Value Chain</span>
            </h2>
            
            <p className="text-purple-100/70 text-lg leading-relaxed">
              RecycOp is more than a dashboard. It’s a logistics engine that coordinates thousands of collectors, 
              validates material quality, and provides the transparency global buyers demand.
            </p>

            <ul className="space-y-4">
              {[
                { icon: CircleStackIcon, text: "Real-time Kilogram Tracking" },
                { icon: MapIcon, text: "Geospatial Logistics Optimization" },
                { icon: UserGroupIcon, text: "Cooperative Member Management" },
              ].map((item, i) => (
                <li key={i} className="flex items-center space-x-3 text-purple-200">
                  <item.icon className="h-5 w-5 text-emerald-500" />
                  <span className="font-medium">{item.text}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Right: The Stunning Dashboard Mockup */}
          <div className="lg:w-2/3 w-full">
            <motion.div 
              initial={{ opacity: 0, y: 40, rotateX: 5 }}
              whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
              viewport={{ once: true }}
              className="relative rounded-2xl border border-white/10 bg-gray-950/40 p-2 shadow-2xl backdrop-blur-xl"
            >
              {/* Dashboard Internal Layout */}
              <div className="rounded-xl bg-[#0a0a0b] overflow-hidden flex h-[500px] shadow-inner">
                
                {/* Sidebar Mockup */}
                <div className="w-16 border-r border-white/5 flex flex-col items-center py-6 space-y-8">
                  <div className="h-8 w-8 rounded bg-emerald-500 flex items-center justify-center">
                    <BoltIcon className="h-5 w-5 text-black" />
                  </div>
                  <ChartBarIcon className="h-6 w-6 text-white/40 hover:text-white transition-colors cursor-pointer" />
                  <MapIcon className="h-6 w-6 text-white/40 hover:text-white transition-colors cursor-pointer" />
                  <UserGroupIcon className="h-6 w-6 text-white/40 hover:text-white transition-colors cursor-pointer" />
                </div>

                {/* Main Content Area */}
                <div className="flex-1 p-8 space-y-8 overflow-hidden">
                  <div className="flex justify-between items-end">
                    <div>
                      <h3 className="text-sm font-medium text-white/40 uppercase tracking-tighter">System Overview</h3>
                      <p className="text-2xl font-bold">Nairobi Central Hub</p>
                    </div>
                    <div className="flex space-x-2">
                      <div className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
                      <span className="text-[10px] uppercase font-bold text-emerald-500">Live Connection</span>
                    </div>
                  </div>

                  {/* Stats Grid */}
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {[
                      { label: "Total KGs", val: "42,890", change: "+12%" },
                      { label: "Active Co-ops", val: "184", change: "+5%" },
                      { label: "Revenue Disbursed", val: "KSh 2.4M", change: "+18%" },
                    ].map((stat, i) => (
                      <div key={i} className="bg-white/5 rounded-lg p-4 border border-white/5">
                        <p className="text-[10px] text-white/40 font-bold uppercase">{stat.label}</p>
                        <p className="text-xl font-bold mt-1 tracking-tight">{stat.val}</p>
                        <div className="flex items-center text-emerald-400 text-[10px] mt-2 font-bold">
                          <ArrowUpRightIcon className="h-3 w-3 mr-1" /> {stat.change}
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Chart Simulation */}
                  <div className="bg-white/5 rounded-xl p-6 border border-white/5 flex-1 h-48 relative overflow-hidden">
                    <p className="text-[10px] text-white/40 font-bold uppercase mb-4">Volume Over Time (Weekly)</p>
                    <div className="flex items-end justify-between h-24 space-x-2">
                      {[40, 70, 45, 90, 65, 80, 100].map((h, i) => (
                        <motion.div 
                          key={i}
                          initial={{ height: 0 }}
                          whileInView={{ height: `${h}%` }}
                          transition={{ duration: 1, delay: i * 0.1 }}
                          className="flex-1 bg-gradient-to-t from-emerald-600 to-emerald-400 rounded-t-sm"
                        />
                      ))}
                    </div>
                    {/* Background Grid Lines */}
                    <div className="absolute inset-x-6 top-12 bottom-6 flex flex-col justify-between pointer-events-none opacity-10">
                      {[...Array(4)].map((_, i) => <div key={i} className="w-full h-[1px] bg-white" />)}
                    </div>
                  </div>
                </div>

              </div>
              
              {/* Floating Decorative Elements */}
              <div className="absolute -top-6 -right-6 h-24 w-24 bg-emerald-500/20 rounded-full blur-2xl" />
              <div className="absolute -bottom-10 -left-10 h-32 w-32 bg-purple-500/20 rounded-full blur-3xl" />
            </motion.div>
          </div>

        </div>
      </div>
    </section>
  );
}