"use client";

import { Navbar } from "@/components/navigation";
import { useAuth } from "@/components/auth-context";
import { Footer } from "@/components/Footer";

// Recyc & RecycOp Specific Components
import  HeroSection  from "@/components/HeroSection";
import { ImpactStats } from "@/components/ImpactStats"; 
import { InsightSection } from "@/components/InsightSection";
import { ProcessTimeline } from "@/components/ProcessTimeline"; // Moved Up
import { MaterialGrid } from "@/components/MaterialGrid"; // Moved Down
import { RecycOpShowcase } from "@/components/RecycOpShowcase";
import { ServicePortfolio } from "@/components/ServicePortfolio";
import { PartnerTestimonials }  from "@/components/PartnerTestimonials";
import { CooperativeCTA } from "@/components/CooperativeCTA";
import { SupportSection } from "@/components/SupportSection";

export default function HomePage() {
  const { user, loading: authLoading } = useAuth();

  return (
    <div className="min-h-screen bg-[#3b0764] text-white font-sans selection:bg-emerald-500/30">
      <Navbar />

      <main>
        {/* 1. The Hook */}
        <HeroSection />

        {/* 2. The Context & Market Gap */}
        <ImpactStats />

        {/* 3. The Logic (The Bridge from Dairy to Waste) */}
        <InsightSection />

        {/* 4. The Workflow (Organizing the Fragmentation) */}
        <ProcessTimeline />

        {/* 5. The Output (High-Value Asset Catalog) */}
        <MaterialGrid />

        {/* 6. The Platform (The Intelligence Layer) */}
        <RecycOpShowcase />

        {/* 7. The Services (Physical Value-Add) */}
        <ServicePortfolio />

        {/* 8. The Trust (Social Proof) */}
        <PartnerTestimonials />

        {/* 9. The Enrollment (Conversion) */}
        <CooperativeCTA />

        {/* 10. Secondary Info */}
        <SupportSection />
      </main>

      <Footer />
    </div>
  );
}