"use client";

import { motion } from "framer-motion";
import { 
  BeakerIcon, 
  Square3Stack3DIcon, 
  CubeIcon,
  ChartBarIcon,
  CheckBadgeIcon
} from "@heroicons/react/24/outline";

const materials = [
  {
    name: "PET (Grade A)",
    fullName: "Polyethylene Terephthalate",
    description: "Post-consumer clear bottles, sorted and de-labeled for food-grade applications.",
    icon: BeakerIcon,
    stats: { demand: "High", purity: "98%", yield: "85%" },
    color: "from-blue-500/20 to-emerald-500/20",
    border: "border-emerald-500/30",
  },
  {
    name: "HDPE",
    fullName: "High-Density Polyethylene",
    description: "Industrial-grade flakes from crates and detergent containers. High tensile strength.",
    icon: Square3Stack3DIcon,
    stats: { demand: "Stable", purity: "95%", yield: "92%" },
    color: "from-purple-500/20 to-pink-500/20",
    border: "border-purple-500/30",
  },
  {
    name: "Aluminum",
    fullName: "UBC (Used Beverage Cans)",
    description: "Baled and compressed aluminum. Infinite recyclability with 95% energy savings.",
    icon: CubeIcon,
    stats: { demand: "Extreme", purity: "99%", yield: "95%" },
    color: "from-emerald-500/20 to-teal-500/20",
    border: "border-emerald-500/30",
  },
];

export function MaterialGrid() {
  return (
    <section className="py-24 bg-[#3b0764] relative">
      <div className="container mx-auto px-6">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div className="max-w-2xl">
            <h2 className="font-serif text-4xl md:text-5xl mb-4 text-white">
              The <span className="text-emerald-400 italic">Asset</span> Catalog
            </h2>
            <p className="text-purple-100/60 text-lg">
              We process and formalize fragmented waste into high-purity, industrial-grade commodities for global manufacturing.
            </p>
          </div>
          <button className="flex items-center space-x-2 text-emerald-400 font-bold hover:text-emerald-300 transition-colors">
            <ChartBarIcon className="h-5 w-5" />
            <span>View Market Prices</span>
          </button>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {materials.map((item, index) => (
            <motion.div
              key={index}
              whileHover={{ y: -10 }}
              className={`relative group overflow-hidden rounded-3xl border ${item.border} bg-white/5 p-8 backdrop-blur-sm transition-all hover:bg-white/10`}
            >
              {/* Material Icon & Badge */}
              <div className="flex justify-between items-start mb-8">
                <div className={`p-4 rounded-2xl bg-gradient-to-br ${item.color} text-white ring-1 ring-white/10`}>
                  <item.icon className="h-8 w-8" />
                </div>
                <div className="flex items-center space-x-1 rounded-full bg-emerald-500/10 px-3 py-1 text-[10px] font-bold uppercase tracking-widest text-emerald-400 ring-1 ring-emerald-500/20">
                  <CheckBadgeIcon className="h-3 w-3" />
                  <span>Certified</span>
                </div>
              </div>

              {/* Title Content */}
              <div className="mb-8">
                <h3 className="text-2xl font-bold text-white mb-1">{item.name}</h3>
                <p className="text-xs font-medium text-purple-300/60 uppercase tracking-widest">{item.fullName}</p>
              </div>

              <p className="text-purple-100/70 text-sm leading-relaxed mb-8">
                {item.description}
              </p>

              {/* Technical Specs Table */}
              <div className="grid grid-cols-3 gap-4 border-t border-white/10 pt-6">
                {Object.entries(item.stats).map(([label, value]) => (
                  <div key={label}>
                    <p className="text-[10px] uppercase font-bold text-white/40 mb-1">{label}</p>
                    <p className="text-sm font-bold text-emerald-400">{value}</p>
                  </div>
                ))}
              </div>

              {/* Decorative Background Glow */}
              <div className={`absolute -right-8 -bottom-8 h-32 w-32 rounded-full bg-gradient-to-br ${item.color} blur-3xl opacity-0 group-hover:opacity-40 transition-opacity`} />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}