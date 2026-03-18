"use client";

import { motion } from "framer-motion";
import { 
  CheckBadgeIcon, 
  StarIcon,
  ChatBubbleBottomCenterTextIcon,
} from "@heroicons/react/24/solid";
import { cn } from "@/lib/utils";

const testimonials = [
  {
    name: "Samuel Otieno",
    role: "Lead Aggregator, Kamukunji Hub",
    content: "Since joining the Recyc cooperative, my team's daily collection volume has tripled. The digital weighing ensures we are paid fairly and instantly. It's the first time this work feels like a real business.",
    impact: "3x Income Growth",
    color: "emerald"
  },
  {
    name: "Sarah Chen",
    role: "Supply Chain Director, GPG",
    content: "Recyc is solving the purity problem. We now have a consistent stream of Grade-A PET flakes with full traceability data for our ESG reporting. They are the most reliable link in our circular supply chain.",
    impact: "99.9% Purity Verified",
    color: "purple"
  },
  {
    name: "Dr. Elena M. Njoroge",
    role: "Sustainability Consultant",
    content: "What makes this model stunning isn't just the tech—it's the formalization. They've successfully translated the dairy model into waste, creating a blueprint for the Kenya Vision 2030 green economy.",
    impact: "Policy Alignment",
    color: "emerald"
  }
];

export function PartnerTestimonials() {
  return (
    <section className="relative py-32 bg-white dark:bg-[#05010d] transition-colors duration-500 overflow-hidden">
      
      {/* Background Decorative Element: Pulse of the Network */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none opacity-40">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1000px] h-[1000px] border border-slate-100 dark:border-white/[0.03] rounded-full" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] border border-slate-100 dark:border-white/[0.03] rounded-full" />
      </div>

      <div className="container relative z-10 mx-auto px-6">
        
        {/* --- Section Header --- */}
        <div className="text-center max-w-3xl mx-auto mb-24">
          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-emerald-100 dark:bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 font-black uppercase tracking-[0.3em] text-[10px] mb-6"
          >
            <ChatBubbleBottomCenterTextIcon className="h-4 w-4" />
            <span>Ecosystem Voices</span>
          </motion.div>
          <h2 className="font-serif text-5xl md:text-7xl text-slate-900 dark:text-white leading-tight">
            Trusted by those <br />
            <span className="italic text-emerald-600 dark:text-emerald-400 font-light underline decoration-emerald-500/20 underline-offset-8">on the ground.</span>
          </h2>
        </div>

        {/* --- Testimonial Grid --- */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((t, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: i * 0.1 }}
              viewport={{ once: true }}
              whileHover={{ y: -10 }}
              className="relative group p-10 rounded-[2.5rem] bg-white dark:bg-white/5 border border-slate-200 dark:border-white/10 hover:border-emerald-500/30 transition-all duration-500 shadow-xl dark:shadow-none backdrop-blur-xl"
            >
              {/* Floating Impact Badge */}
              <div className="absolute -top-4 right-10 bg-emerald-500 dark:bg-emerald-400 text-white dark:text-slate-900 text-[10px] font-black uppercase tracking-widest px-4 py-1.5 rounded-full shadow-[0_5px_15px_rgba(16,185,129,0.3)] z-20">
                {t.impact}
              </div>

              {/* Huge Quote Mark Background */}
              <div className="absolute top-10 right-10 opacity-[0.03] dark:opacity-[0.07] group-hover:scale-125 transition-transform duration-700 pointer-events-none">
                <svg width="60" height="45" viewBox="0 0 60 45" fill="currentColor" className="text-slate-900 dark:text-white">
                  <path d="M13.5 0C6.04416 0 0 6.04416 0 13.5C0 20.9558 6.04416 27 13.5 27H18C18 36.9411 9.94112 45 0 45V45H13.5C28.4111 45 40.5 32.9111 40.5 18V0H13.5ZM54 0C46.5442 0 40.5 6.04416 40.5 13.5C40.5 20.9558 46.5442 27 54 27H58.5C58.5 36.9411 50.4411 45 40.5 45V45H54C68.9111 45 81 32.9111 81 18V0H54Z" />
                </svg>
              </div>

              <div className="relative z-10">
                <p className="text-slate-600 dark:text-purple-100/70 italic leading-relaxed text-lg mb-10 font-light">
                  &ldquo;{t.content}&rdquo;
                </p>

                <div className="flex items-center gap-5 pt-8 border-t border-slate-100 dark:border-white/5">
                  <div className="relative">
                    <div className="h-14 w-14 rounded-2xl bg-gradient-to-tr from-emerald-500 to-purple-500 p-[2px] rotate-3 group-hover:rotate-12 transition-transform duration-500">
                      <div className="h-full w-full rounded-2xl bg-white dark:bg-slate-900 flex items-center justify-center overflow-hidden">
                        <span className="text-lg font-bold text-slate-400 dark:text-white/40">{t.name[0]}</span>
                      </div>
                    </div>
                    {/* Verified Status Dot */}
                    <div className="absolute -bottom-1 -right-1 bg-white dark:bg-slate-900 p-0.5 rounded-full">
                       <CheckBadgeIcon className="h-5 w-5 text-emerald-500 shadow-sm" />
                    </div>
                  </div>

                  <div>
                    <h4 className="text-slate-900 dark:text-white font-bold text-base tracking-tight">{t.name}</h4>
                    <p className="text-[10px] font-black uppercase tracking-widest text-emerald-600 dark:text-emerald-400/50">
                      {t.role}
                    </p>
                  </div>
                </div>
              </div>

              {/* Gradient Bottom Flare */}
              <div className={cn(
                "absolute bottom-0 left-0 w-full h-1 opacity-0 group-hover:opacity-100 transition-opacity",
                t.color === "emerald" ? "bg-emerald-500 shadow-[0_0_20px_#10b981]" : "bg-purple-500 shadow-[0_0_20px_#a855f7]"
              )} />
            </motion.div>
          ))}
        </div>

        {/* --- Ecosystem Stats Bar --- */}
        <motion.div 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          className="mt-24 py-10 border-y border-slate-100 dark:border-white/5 flex flex-wrap justify-center md:justify-between items-center gap-10 opacity-60 grayscale hover:grayscale-0 transition-all duration-700"
        >
          <div className="flex flex-col items-center">
            <span className="text-3xl font-serif text-slate-900 dark:text-white">12k+</span>
            <span className="text-[10px] font-black uppercase tracking-widest text-slate-400">Collector Network</span>
          </div>
          <div className="hidden md:block w-px h-8 bg-slate-200 dark:bg-white/10" />
          <div className="flex flex-col items-center">
            <span className="text-3xl font-serif text-slate-900 dark:text-white">98%</span>
            <span className="text-[10px] font-black uppercase tracking-widest text-slate-400">Purity Rating</span>
          </div>
          <div className="hidden md:block w-px h-8 bg-slate-200 dark:bg-white/10" />
          <div className="flex flex-col items-center">
            <span className="text-3xl font-serif text-slate-900 dark:text-white">450+</span>
            <span className="text-[10px] font-black uppercase tracking-widest text-slate-400">Cooperative Hubs</span>
          </div>
        </motion.div>
      </div>
    </section>
  );
}