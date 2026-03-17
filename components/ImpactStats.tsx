"use client";

import { motion, useInView, useMotionValue, useSpring } from "framer-motion";
import { useEffect, useRef } from "react";
import { 
  CurrencyDollarIcon, 
  GlobeAmericasIcon, 
  UserPlusIcon, 
  ArrowTrendingUpIcon 
} from "@heroicons/react/24/outline";

// Animated Counter Sub-component
function Counter({ value, direction = "up", suffix = "" }: { value: number; direction?: "up" | "down"; suffix?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const motionValue = useMotionValue(direction === "down" ? value : 0);
  const springValue = useSpring(motionValue, { damping: 30, stiffness: 100 });
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  useEffect(() => {
    if (isInView) {
      motionValue.set(value);
    }
  }, [motionValue, value, isInView]);

  useEffect(() => {
    springValue.on("change", (latest) => {
      if (ref.current) {
        ref.current.textContent = Intl.NumberFormat("en-US").format(Math.floor(latest)) + suffix;
      }
    });
  }, [springValue, suffix]);

  return <span ref={ref} />;
}

const stats = [
  {
    label: "Global Waste Crisis",
    value: 2,
    suffix: "B+",
    prefix: "$",
    description: "Annual economic leakage due to unmanaged waste.",
    icon: GlobeAmericasIcon,
    color: "text-purple-400",
  },
  {
    label: "Recycling Rate",
    value: 20,
    suffix: "%",
    prefix: "",
    description: "Current average in developing markets. We aim to double this.",
    icon: ArrowTrendingUpIcon,
    color: "text-emerald-400",
  },
  {
    label: "Target Informal Actors",
    value: 50000,
    suffix: "",
    prefix: "",
    description: "Integrating individual collectors into the formal economy.",
    icon: UserPlusIcon,
    color: "text-purple-400",
  },
  {
    label: "Local Value Potential",
    value: 150,
    suffix: "M",
    prefix: "KSh ",
    description: "Recoverable value per major regional hub annually.",
    icon: CurrencyDollarIcon,
    color: "text-emerald-400",
  },
];

export function ImpactStats() {
  return (
    <section className="py-24 bg-[#3b0764] border-y border-white/5">
      <div className="container mx-auto px-6">
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8">
          {stats.map((stat, i) => (
            <motion.div 
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              viewport={{ once: true }}
              className="relative flex flex-col items-center text-center group"
            >
              {/* Icon with background glow */}
              <div className="mb-6 relative">
                <div className={`absolute inset-0 blur-2xl opacity-20 bg-current ${stat.color}`} />
                <stat.icon className={`h-12 w-12 relative z-10 ${stat.color} transition-transform group-hover:scale-110`} />
              </div>

              <div className="space-y-2">
                <p className="text-[10px] uppercase font-bold tracking-[0.2em] text-white/40">
                  {stat.label}
                </p>
                <h3 className="text-4xl md:text-5xl font-bold text-white tracking-tighter">
                  {stat.prefix}
                  <Counter value={stat.value} suffix={stat.suffix} />
                </h3>
                <p className="text-sm text-purple-200/50 max-w-[200px] leading-relaxed">
                  {stat.description}
                </p>
              </div>

              {/* Decorative separator for desktop */}
              {i !== stats.length - 1 && (
                <div className="hidden lg:block absolute -right-4 top-1/2 -translate-y-1/2 w-[1px] h-12 bg-white/10" />
              )}
            </motion.div>
          ))}
        </div>

        {/* The "Call to Action" context */}
        <motion.div 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="mt-20 p-8 rounded-2xl bg-white/5 border border-white/10 flex flex-col md:flex-row items-center justify-between gap-6"
        >
          <p className="text-purple-100/80 text-center md:text-left max-w-2xl">
            <span className="text-emerald-400 font-bold italic">Kenya Vision 2030</span> aims for a clean, secure, and sustainable environment. Recyc delivers the data-driven infrastructure to make this a reality.
          </p>
          <button className="whitespace-nowrap rounded-xl bg-white/10 px-6 py-3 text-sm font-bold text-white hover:bg-white/20 transition-all border border-white/20">
            Download Impact Report
          </button>
        </motion.div>
      </div>
    </section>
  );
}