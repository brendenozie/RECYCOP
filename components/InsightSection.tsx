"use client";

import { motion } from "framer-motion";
import { 
  LightBulbIcon, 
  ArrowRightIcon,
  BeakerIcon,
  UserGroupIcon,
  BanknotesIcon
} from "@heroicons/react/24/outline";

const ComparisonPoints = [
  {
    label: "Collection",
    dairy: "Morning milk delivery to local centers",
    recyc: "Daily material drop-offs at Recyc hubs",
    icon: UserGroupIcon
  },
  {
    label: "Quality Control",
    dairy: "Lactometer & purity testing",
    recyc: "Material grading & contamination checks",
    icon: BeakerIcon
  },
  {
    label: "Value Add",
    dairy: "Processing into yogurt/butter/ghee",
    recyc: "Industrial-grade baling & shredding",
    icon: LightBulbIcon
  },
  {
    label: "Market Power",
    dairy: "Fixed prices through KCC/Cooperatives",
    recyc: "Direct-to-manufacturer supply contracts",
    icon: BanknotesIcon
  }
];

export function InsightSection() {
  return (
    <section className="py-24 bg-[#2e0550] relative overflow-hidden">
      {/* Background radial glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-[radial-gradient(circle_at_center,rgba(16,185,129,0.05)_0%,transparent_70%)]" />

      <div className="container mx-auto px-6 relative z-10">
        <div className="max-w-4xl mx-auto text-center mb-20">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center space-x-2 text-emerald-400 font-bold tracking-[0.2em] uppercase text-xs mb-4"
          >
            <LightBulbIcon className="h-5 w-5" />
            <span>The Proven Model</span>
          </motion.div>
          
          <h2 className="font-serif text-4xl md:text-6xl text-white mb-6">
            If it worked for <span className="text-emerald-400">Milk</span>,<br /> 
            it will work for <span className="text-purple-300">Materials.</span>
          </h2>
          
          <p className="text-purple-100/60 text-lg md:text-xl leading-relaxed">
            The Kenyan Dairy Cooperative model revolutionized rural economies by formalizing 
            fragmented production. We are applying this exact blueprint to the 12 million tonnes 
            of waste generated annually.
          </p>
        </div>

        {/* Comparison Table/Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          
          {/* Visual Metaphor: The Logic Bridge */}
          <div className="space-y-6">
            {ComparisonPoints.map((point, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.1 }}
                viewport={{ once: true }}
                className="group flex items-start space-x-4 p-4 rounded-xl hover:bg-white/5 transition-colors border border-transparent hover:border-white/10"
              >
                <div className="mt-1 p-2 rounded-lg bg-emerald-500/10 text-emerald-400">
                  <point.icon className="h-6 w-6" />
                </div>
                <div className="flex-1">
                  <p className="text-[10px] uppercase font-bold text-emerald-500 mb-1 tracking-widest">{point.label}</p>
                  <div className="flex flex-col sm:flex-row sm:items-center space-y-2 sm:space-y-0 sm:space-x-4">
                    <span className="text-sm text-purple-200/50 line-through decoration-purple-500/50 italic">{point.dairy}</span>
                    <ArrowRightIcon className="hidden sm:block h-3 w-3 text-emerald-500" />
                    <span className="text-sm font-bold text-white group-hover:text-emerald-400 transition-colors">{point.recyc}</span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* The "Result" Card */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="relative p-1 rounded-3xl bg-gradient-to-br from-emerald-500/40 via-purple-500/40 to-transparent"
          >
            <div className="bg-[#1a0433] rounded-[22px] p-8 md:p-12 h-full flex flex-col justify-center border border-white/10">
              <h3 className="font-serif text-3xl text-white mb-6">The Outcome?</h3>
              <div className="space-y-8">
                <div>
                  <div className="flex justify-between mb-2">
                    <span className="text-xs uppercase font-bold text-purple-300">Traditional Waste Economy</span>
                    <span className="text-xs font-bold text-purple-300">Fragmented</span>
                  </div>
                  <div className="h-2 w-full bg-white/5 rounded-full overflow-hidden">
                    <div className="h-full w-1/3 bg-purple-500/50" />
                  </div>
                </div>

                <div>
                  <div className="flex justify-between mb-2">
                    <span className="text-xs uppercase font-bold text-emerald-400">Recyc Formalized Ecosystem</span>
                    <span className="text-xs font-bold text-emerald-400">High Yield</span>
                  </div>
                  <div className="h-2 w-full bg-white/5 rounded-full overflow-hidden shadow-[0_0_15px_rgba(16,185,129,0.3)]">
                    <motion.div 
                      initial={{ width: 0 }}
                      whileInView={{ width: "92%" }}
                      transition={{ duration: 1.5, delay: 0.5 }}
                      className="h-full bg-emerald-500" 
                    />
                  </div>
                </div>

                <p className="text-sm text-purple-100/60 italic border-l-2 border-emerald-500 pl-4 py-1">
                  &quot;By aggregating supply, we move from price-takers to price-makers, mirroring the 
                  transformation of the Kenyan dairy sector in the 1990s.&quot;
                </p>
              </div>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}