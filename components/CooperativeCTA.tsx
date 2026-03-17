"use client";

import { motion } from "framer-motion";
import { 
  ArrowRightIcon, 
  UserGroupIcon, 
  BuildingOfficeIcon,
  CheckCircleIcon,
  SparklesIcon
} from "@heroicons/react/24/outline";

export function CooperativeCTA() {
  return (
    <section className="py-24 bg-[#3b0764] relative overflow-hidden">
      {/* High-Energy Background Accents */}
      <div className="absolute top-0 right-0 -mr-24 -mt-24 h-96 w-96 rounded-full bg-emerald-500/10 blur-[100px]" />
      <div className="absolute bottom-0 left-0 -ml-24 -mb-24 h-96 w-96 rounded-full bg-purple-500/10 blur-[100px]" />

      <div className="container mx-auto px-6 relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            className="inline-flex items-center space-x-2 rounded-full bg-emerald-500 px-4 py-1 text-black font-bold text-xs uppercase tracking-widest mb-6"
          >
            <SparklesIcon className="h-4 w-4" />
            <span>Scale With Us</span>
          </motion.div>
          
          <h2 className="font-serif text-4xl md:text-6xl text-white mb-6">
            Ready to <span className="italic text-emerald-400">Formalize</span> the Future?
          </h2>
          <p className="text-purple-100/60 text-lg">
            Whether you&apos;re an aggregator on the ground or a partner looking for sustainable supply chains, 
            Recyc provides the infrastructure to grow.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          
          {/* Card 1: Aggregators */}
          <motion.div 
            whileHover={{ y: -5 }}
            className="relative group p-8 rounded-3xl bg-white/5 border border-white/10 backdrop-blur-md overflow-hidden"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
            
            <div className="relative z-10">
              <div className="h-14 w-14 rounded-2xl bg-emerald-500 flex items-center justify-center text-black mb-6">
                <UserGroupIcon className="h-8 w-8" />
              </div>
              <h3 className="text-2xl font-bold text-white mb-4">For Aggregators</h3>
              <p className="text-purple-100/60 mb-8">
                Join our cooperative network to access better pricing, digital weighing, and instant logistics support.
              </p>
              
              <ul className="space-y-3 mb-10">
                {['Guaranteed Offtake', 'Digital Payment Rails', 'Logistics Fleet Access'].map((feat) => (
                  <li key={feat} className="flex items-center space-x-3 text-sm text-purple-100">
                    <CheckCircleIcon className="h-5 w-5 text-emerald-400" />
                    <span>{feat}</span>
                  </li>
                ))}
              </ul>

              <button className="w-full py-4 rounded-xl bg-emerald-500 text-black font-bold flex items-center justify-center group/btn hover:bg-emerald-400 transition-all">
                Enroll as Aggregator
                <ArrowRightIcon className="ml-2 h-5 w-5 transition-transform group-hover/btn:translate-x-1" />
              </button>
            </div>
          </motion.div>

          {/* Card 2: Strategic Partners */}
          <motion.div 
            whileHover={{ y: -5 }}
            className="relative group p-8 rounded-3xl bg-gray-950/40 border border-white/5 backdrop-blur-md overflow-hidden"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-purple-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />

            <div className="relative z-10">
              <div className="h-14 w-14 rounded-2xl bg-white/10 border border-white/20 flex items-center justify-center text-purple-400 mb-6">
                <BuildingOfficeIcon className="h-8 w-8" />
              </div>
              <h3 className="text-2xl font-bold text-white mb-4">Strategic Partners</h3>
              <p className="text-purple-100/60 mb-8">
                Secure high-purity raw materials and meet your ESG targets through our transparent, tracked supply chain.
              </p>

              <ul className="space-y-3 mb-10">
                {['Direct Manufacturer Supply', 'ESG Traceability Data', 'Vision 2030 Alignment'].map((feat) => (
                  <li key={feat} className="flex items-center space-x-3 text-sm text-purple-100">
                    <CheckCircleIcon className="h-5 w-5 text-purple-400" />
                    <span>{feat}</span>
                  </li>
                ))}
              </ul>

              <button className="w-full py-4 rounded-xl bg-white/5 border border-white/20 text-white font-bold flex items-center justify-center hover:bg-white/10 transition-all">
                Inquire for Partnership
              </button>
            </div>
          </motion.div>

        </div>

        {/* Bottom Trust Badge */}
        <div className="mt-16 flex flex-col items-center justify-center">
          <div className="h-[1px] w-24 bg-white/10 mb-8" />
          <p className="text-[10px] uppercase tracking-[0.3em] font-bold text-white/30">
            Aligning with Kenya Vision 2030
          </p>
        </div>
      </div>
    </section>
  );
}