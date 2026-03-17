"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { 
  CubeIcon, 
  UserGroupIcon, 
  WrenchScrewdriverIcon, 
  SignalIcon, 
  CurrencyDollarIcon 
} from "@heroicons/react/24/outline";

const steps = [
  {
    title: "Material Aggregation",
    description: "Gathering fragmented streams of PET, HDPE, and Aluminum from informal collectors into high-volume hubs.",
    icon: CubeIcon,
    color: "text-purple-400",
  },
  {
    title: "Cooperative Formation",
    description: "Organizing individual actors into formal cooperatives to ensure reliable supply chains and collective bargaining power.",
    icon: UserGroupIcon,
    color: "text-emerald-400",
  },
  {
    title: "Industrial Processing",
    description: "Physical value-addition through high-density baling and shredding, meeting international manufacturing standards.",
    icon: WrenchScrewdriverIcon,
    color: "text-purple-400",
  },
  {
    title: "Digital Intelligence",
    description: "RecycOp tracks every kilogram, providing real-time logistics coordination and end-to-end material traceability.",
    icon: SignalIcon,
    color: "text-emerald-400",
  },
  {
    title: "Market Realization",
    description: "Connecting formalized waste streams to global industrial buyers, maximizing income for every player in the chain.",
    icon: CurrencyDollarIcon,
    color: "text-purple-400",
  },
];

export function ProcessTimeline() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start center", "end center"],
  });

  // Animates the line height as the user scrolls
  const scaleY = useTransform(scrollYProgress, [0, 1], [0, 1]);

  return (
    <section ref={containerRef} className="py-24 bg-[#3b0764] relative overflow-hidden">
      <div className="max-w-4xl mx-auto px-6">
        
        {/* Header */}
        <div className="mb-20 text-center">
          <h2 className="font-serif text-4xl md:text-5xl mb-6">The Path to Formalization</h2>
          <p className="text-purple-200/70 max-w-xl mx-auto text-lg">
            We’ve taken the successful dairy cooperative model and engineered it for the recycling revolution.
          </p>
        </div>

        <div className="relative">
          {/* Background Track Line */}
          <div className="absolute left-6 top-0 bottom-0 w-[2px] bg-white/10 md:left-1/2 md:-ml-[1px]" />
          
          {/* Animated Progress Line */}
          <motion.div 
            style={{ scaleY }}
            className="absolute left-6 top-0 bottom-0 w-[2px] bg-gradient-to-b from-emerald-500 to-purple-500 origin-top md:left-1/2 md:-ml-[1px] z-10 shadow-[0_0_15px_rgba(16,185,129,0.5)]"
          />

          {/* Steps */}
          <div className="space-y-24">
            {steps.map((step, index) => {
              const isEven = index % 2 === 0;
              return (
                <motion.div 
                  key={index}
                  initial={{ opacity: 0, x: isEven ? -50 : 50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{ duration: 0.6, delay: 0.1 }}
                  className={`relative flex items-center justify-between md:flex-row ${
                    isEven ? "md:flex-row-reverse" : ""
                  }`}
                >
                  {/* Content Card */}
                  <div className="flex-1 ml-16 md:ml-0 md:w-5/12">
                    <div className="p-6 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-sm hover:border-emerald-500/30 transition-colors group">
                      <step.icon className={`h-8 w-8 mb-4 ${step.color} group-hover:scale-110 transition-transform`} />
                      <h3 className="text-xl font-bold mb-2">{step.title}</h3>
                      <p className="text-purple-100/60 leading-relaxed text-sm">
                        {step.description}
                      </p>
                    </div>
                  </div>

                  {/* Central Node */}
                  <div className="absolute left-6 -ml-3 w-6 h-6 rounded-full border-4 border-[#3b0764] bg-emerald-500 z-20 md:left-1/2 md:-ml-3" />

                  {/* Spacer for Desktop Layout */}
                  <div className="hidden md:block md:w-5/12" />
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}