"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Plus, 
  Minus, 
  Truck, 
  GraduationCap, 
  Terminal, 
  HelpCircle,
  MessageSquare,
  ChevronRight
} from "lucide-react";
import { cn } from "@/lib/utils";

const FAQS = [
  {
    category: "Logistics",
    question: "How does hardware shipping work across Africa?",
    answer: "We partner with local logistics hubs in 15+ countries. Once enrolled in a hardware-lab, your kit is dispatched within 48 hours. Tracking is provided via your RecycWorks dashboard.",
    icon: Truck
  },
  {
    category: "Scholarship",
    question: "What are the criteria for the Merit Scholarship?",
    answer: "We prioritize three pillars: demonstrated interest in circular economy, a community-focused project idea, and a commitment to the 4-phase mastery path. No prior degree is required.",
    icon: GraduationCap
  },
  {
    category: "Infrastructure",
    question: "Do I need my own computer to access the labs?",
    answer: "Yes, you'll need a laptop for basic coordination. For heavy processing and geospatial tasks, RecycWorks provides cloud-compute credits so you don't need high-end local hardware.",
    icon: Terminal
  },
  {
    category: "Enrollment",
    question: "When are scholarship applications reviewed?",
    answer: "Applications are reviewed on a rolling basis at the start of every quarter. You will receive a system decision within 14 days of the window closing.",
    icon: HelpCircle
  }
];

export function SupportSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section className="relative py-32 bg-white dark:bg-[#05010d] transition-colors duration-500 overflow-hidden">
      
      {/* Background Subtle Gradient */}
      <div className="absolute top-0 left-0 w-full h-full pointer-events-none opacity-20">
        <div className="absolute top-[20%] right-[-5%] w-[400px] h-[400px] bg-emerald-500/10 blur-[100px] rounded-full" />
      </div>

      <div className="container relative z-10 mx-auto px-6">
        <div className="flex flex-col lg:flex-row gap-20">
          
          {/* --- LEFT SIDE: THE TERMINAL NAVIGATOR --- */}
          <div className="lg:w-2/5 space-y-12">
            <div className="space-y-6">
              <motion.div 
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-emerald-50 dark:bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 font-black uppercase tracking-[0.3em] text-[10px]"
              >
                <HelpCircle className="w-3 h-3" />
                Knowledge Base
              </motion.div>
              
              <h2 className="font-serif text-5xl md:text-7xl text-slate-900 dark:text-white leading-[1.1]">
                System <br />
                <span className="text-emerald-600 dark:text-emerald-400 italic font-light underline decoration-emerald-500/20 underline-offset-8">Guidance.</span>
              </h2>
              
              <p className="text-slate-500 dark:text-purple-100/50 text-lg font-light leading-relaxed max-w-sm">
                Navigating the Recyc ecosystem—from hardware logistics to scholarship governance.
              </p>
            </div>

            {/* Engineer Support Card */}
            <motion.div 
              whileHover={{ y: -5 }}
              className="p-10 rounded-[2.5rem] bg-slate-900 dark:bg-white/5 border border-slate-800 dark:border-white/10 text-white space-y-8 shadow-2xl relative overflow-hidden group"
            >
              <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                <MessageSquare className="w-24 h-24 -mr-8 -mt-8" />
              </div>
              
              <div className="relative z-10 flex items-center gap-5">
                <div className="p-4 rounded-2xl bg-emerald-500 text-slate-900 shadow-lg shadow-emerald-500/20">
                  <MessageSquare className="w-6 h-6" />
                </div>
                <div>
                  <p className="font-bold text-xl tracking-tight">Technical Support</p>
                  <div className="flex items-center gap-2">
                    <div className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse" />
                    <p className="text-[10px] font-black uppercase tracking-widest text-emerald-500">Engineers Online</p>
                  </div>
                </div>
              </div>

              <button className="relative z-10 w-full py-4 rounded-xl bg-white text-slate-900 font-black text-xs uppercase tracking-widest hover:bg-emerald-500 hover:text-white transition-all flex items-center justify-center gap-2 group/btn">
                Open Support Ticket
                <ChevronRight className="w-4 h-4 transition-transform group-hover/btn:translate-x-1" />
              </button>
            </motion.div>
          </div>

          {/* --- RIGHT SIDE: THE INTELLIGENT ACCORDION --- */}
          <div className="lg:w-3/5 space-y-6">
            {FAQS.map((faq, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                className={cn(
                  "group rounded-[2rem] border transition-all duration-500 overflow-hidden backdrop-blur-sm",
                  openIndex === i 
                    ? "border-emerald-500/30 bg-emerald-50/30 dark:bg-emerald-500/[0.03] shadow-lg shadow-emerald-500/5" 
                    : "border-slate-200 dark:border-white/5 bg-white dark:bg-white/[0.02] hover:border-slate-300 dark:hover:border-white/10"
                )}
              >
                <button
                  onClick={() => setOpenIndex(openIndex === i ? null : i)}
                  className="w-full flex items-center justify-between p-8 text-left"
                >
                  <div className="flex items-center gap-6">
                    <div className={cn(
                      "h-12 w-12 rounded-xl flex items-center justify-center transition-all duration-500",
                      openIndex === i 
                        ? "bg-emerald-500 text-white rotate-[10deg]" 
                        : "bg-slate-100 dark:bg-white/5 text-slate-400 dark:text-white/20 group-hover:scale-110"
                    )}>
                      <faq.icon className="w-5 h-5" />
                    </div>
                    <div>
                      <span className="text-[9px] font-black uppercase tracking-[0.2em] text-emerald-600 dark:text-emerald-500/50 mb-1.5 block">
                        {faq.category}
                      </span>
                      <h4 className={cn(
                        "text-lg font-bold transition-colors duration-300 tracking-tight",
                        openIndex === i ? "text-slate-900 dark:text-white" : "text-slate-600 dark:text-white/60"
                      )}>
                        {faq.question}
                      </h4>
                    </div>
                  </div>
                  
                  <div className={cn(
                    "h-10 w-10 rounded-full border flex items-center justify-center transition-all duration-500",
                    openIndex === i 
                      ? "bg-emerald-500 border-emerald-500 text-white rotate-180 shadow-lg shadow-emerald-500/20" 
                      : "border-slate-200 dark:border-white/10 text-slate-400"
                  )}>
                    {openIndex === i ? <Minus className="w-4 h-4" /> : <Plus className="w-4 h-4" />}
                  </div>
                </button>

                <AnimatePresence>
                  {openIndex === i && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                    >
                      <div className="px-8 pb-8 pt-0 ml-[4.5rem]">
                        <div className="p-6 rounded-2xl bg-white dark:bg-white/5 border-l-4 border-emerald-500 shadow-inner">
                          <p className="text-slate-600 dark:text-purple-100/60 text-base leading-relaxed font-light">
                            {faq.answer}
                          </p>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}