"use client";

import { motion } from "framer-motion";
import { 
  TruckIcon, 
  ArrowsPointingInIcon, // For Baling
  ScissorsIcon,        // For Shredding
  ShieldCheckIcon,
  BoltIcon
} from "@heroicons/react/24/outline";

const services = [
  {
    title: "High-Density Baling",
    description: "Compression technology that reduces material volume by up to 80%, optimizing transport and meeting international export standards.",
    icon: ArrowsPointingInIcon,
    stats: "2,000kg/hr Capacity",
    className: "md:col-span-2 bg-gradient-to-br from-white/10 to-transparent",
  },
  {
    title: "Industrial Shredding",
    description: "Precision shredding for HDPE and PET into uniform flakes, ready for direct manufacturing input.",
    icon: ScissorsIcon,
    stats: "99.9% Purity",
    className: "md:col-span-1 bg-white/5",
  },
  {
    title: "Smart Logistics",
    description: "Fleet coordination powered by RecycOp, ensuring timely material aggregation from informal sectors to industrial hubs.",
    icon: TruckIcon,
    stats: "Real-time Tracking",
    className: "md:col-span-1 bg-white/5",
  },
  {
    title: "Market Access & Offtake",
    description: "Formalized supply contracts with global manufacturers, ensuring a consistent and reliable market for all cooperative members.",
    icon: ShieldCheckIcon,
    stats: "Guaranteed Pricing",
    className: "md:col-span-2 bg-gradient-to-bl from-emerald-500/10 to-transparent border-emerald-500/20",
  },
];

export function ServicePortfolio() {
  return (
    <section className="py-24 bg-[#3b0764] relative">
      <div className="container mx-auto px-6">
        
        {/* Header Area */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16">
          <div className="max-w-2xl">
            <div className="flex items-center space-x-2 text-emerald-400 mb-4">
              <BoltIcon className="h-5 w-5" />
              <span className="text-xs font-bold uppercase tracking-widest">Industrial Capabilities</span>
            </div>
            <h2 className="font-serif text-4xl md:text-5xl text-white">
              Physical Infrastructure, <br />
              <span className="text-emerald-400 italic">Digitally Optimized.</span>
            </h2>
          </div>
          <p className="mt-4 md:mt-0 md:max-w-xs text-purple-100/50 text-sm">
            Our hubs are equipped with world-class machinery to transform raw waste into industrial commodities.
          </p>
        </div>

        {/* Bento Grid Layout */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {services.map((service, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              viewport={{ once: true }}
              className={`group relative rounded-3xl border border-white/10 p-8 transition-all hover:border-emerald-500/50 ${service.className}`}
            >
              <div className="flex flex-col h-full justify-between">
                <div>
                  <div className="mb-6 inline-flex p-3 rounded-2xl bg-white/5 text-emerald-400 group-hover:bg-emerald-500 group-hover:text-black transition-all">
                    <service.icon className="h-7 w-7" />
                  </div>
                  <h3 className="text-2xl font-bold text-white mb-3 tracking-tight">
                    {service.title}
                  </h3>
                  <p className="text-purple-100/60 leading-relaxed text-sm">
                    {service.description}
                  </p>
                </div>

                <div className="mt-8 flex items-center justify-between">
                  <span className="text-xs font-bold uppercase tracking-widest text-emerald-400/80">
                    {service.stats}
                  </span>
                  <div className="h-px flex-grow mx-4 bg-white/10" />
                  <motion.div
                    whileHover={{ x: 3 }}
                    className="text-white/40 cursor-pointer"
                  >
                    {/* Placeholder for "Learn More" or similar */}
                  </motion.div>
                </div>
              </div>

              {/* Decorative hover glow */}
              <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-emerald-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}