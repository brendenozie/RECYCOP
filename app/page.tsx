"use client";

import { motion, AnimatePresence } from "framer-motion";
import { Navbar } from "@/components/navigation";
import { useAuth } from "@/components/auth-context";
import { Footer } from "@/components/Footer";

// Recyc & RecycOp Optimized Components
import  HeroSection  from "@/components/heroSection";
import { ImpactStats } from "@/components/ImpactStats"; 
import { InsightSection } from "@/components/InsightSection";
import { ProcessTimeline } from "@/components/ProcessTimeline"; 
import { MaterialGrid } from "@/components/MaterialGrid"; 
import { RecycOpShowcase } from "@/components/RecycOpShowcase";
import { ServicePortfolio } from "@/components/ServicePortfolio";
import { PartnerTestimonials } from "@/components/PartnerTestimonials";
import { CooperativeCTA } from "@/components/CooperativeCTA";
import { SupportSection } from "@/components/SupportSection";

export default function HomePage() {
  const { user, loading: authLoading } = useAuth();

  return (
    <div className="min-h-screen bg-white dark:bg-[#05010d] text-slate-900 dark:text-white font-sans antialiased selection:bg-emerald-500/30 selection:text-emerald-900">
      
      {/* GLOBAL OVERLAYS 
          Subtle scanlines or grain can be added here for the industrial feel 
      */}
      <div className="fixed inset-0 pointer-events-none z-50 border-[12px] border-white/5 dark:border-white/[0.02]" />
      
      <Navbar />

      <AnimatePresence mode="wait">
        <motion.main
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          {/* 1. THE HOOK: High-energy industrial entry */}
          <section id="hero">
            <HeroSection />
          </section>

          {/* 2. THE CONTEXT: Rapid-fire impact metrics */}
          <ImpactStats />

          {/* 3. THE LOGIC: The "Dairy-to-Waste" paradigm shift */}
          <InsightSection />

          {/* 4. THE WORKFLOW: Interactive process mapping */}
          <div className="relative">
             {/* Subtle bridge transition between Logic and Workflow */}
             <div className="absolute top-0 left-0 w-full h-32 bg-gradient-to-b from-transparent to-slate-50 dark:to-[#05010d]/50" />
             <ProcessTimeline />
          </div>

          {/* 5. THE OUTPUT: High-definition material catalog */}
          <MaterialGrid />

          {/* 6. THE PLATFORM: The SaaS / Intelligence layer (Dark Mode Focus) */}
          <section className="bg-slate-950">
            <RecycOpShowcase />
          </section>

          {/* 7. THE SERVICES: Physical infrastructure Bento Grid */}
          <ServicePortfolio />

          {/* 8. THE TRUST: Social proof & Verified testimonials */}
          <PartnerTestimonials />

          {/* 9. THE ENROLLMENT: High-conversion monoliths */}
          <CooperativeCTA />

          {/* 10. SECONDARY INFO: The Knowledge Base terminal */}
          <SupportSection />
          
        </motion.main>
      </AnimatePresence>

      <Footer />

      {/* PROGRESS TRACKER (Optional Enhancement)
          A thin emerald line that tracks scroll progress on the right edge
      */}
      {/* <motion.div 
        className="fixed top-0 right-0 w-1 h-full bg-emerald-500/20 z-[60] origin-top"
        style={{ scaleY: "var(--scroll-percentage)" }} 
      /> */}
    </div>
  );
}