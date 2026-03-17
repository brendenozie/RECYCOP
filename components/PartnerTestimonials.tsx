"use client";

import { motion } from "framer-motion";
import { 
  CheckBadgeIcon, 
  StarIcon,
  ChatBubbleBottomCenterTextIcon
} from "@heroicons/react/24/solid";

const testimonials = [
  {
    name: "Samuel Otieno",
    role: "Lead Aggregator, Kamukunji Hub",
    content: "Since joining the Recyc cooperative, my team's daily collection volume has tripled. The digital weighing through RecycOp ensures we are paid fairly and instantly. It's the first time this work feels like a real business.",
    image: "/avatars/samuel.jpg", // Placeholder
    impact: "3x Income Growth",
  },
  {
    name: "Sarah Chen",
    role: "Supply Chain Director, Global Polymer Group",
    content: "Recyc is solving the purity problem. We now have a consistent stream of Grade-A PET flakes with full traceability data for our ESG reporting. They are the most reliable link in our circular supply chain.",
    image: "/avatars/sarah.jpg",
    impact: "99.9% Purity Verified",
  },
  {
    name: "Dr. Elena M. Njoroge",
    role: "Sustainability Consultant",
    content: "What makes this model 'stunning' isn't just the tech—it's the formalization. They've successfully translated the dairy model into waste, creating a blueprint for the Kenya Vision 2030 green economy.",
    image: "/avatars/elena.jpg",
    impact: "Policy Alignment",
  }
];

export function PartnerTestimonials() {
  return (
    <section className="py-24 bg-[#3b0764] relative">
      <div className="container mx-auto px-6">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-20">
          <div className="inline-flex items-center space-x-2 text-emerald-400 mb-4">
            <ChatBubbleBottomCenterTextIcon className="h-5 w-5" />
            <span className="text-xs font-bold uppercase tracking-widest">Voice of the Ecosystem</span>
          </div>
          <h2 className="font-serif text-4xl md:text-5xl text-white mb-6">
            Trusted by those <span className="text-emerald-400 italic">on the ground.</span>
          </h2>
        </div>

        {/* Testimonial Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((t, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              viewport={{ once: true }}
              className="relative group p-8 rounded-3xl bg-white/5 border border-white/10 hover:border-emerald-500/30 transition-all duration-500"
            >
              {/* Impact Badge */}
              <div className="absolute -top-4 right-8 bg-emerald-500 text-black text-[10px] font-black uppercase px-3 py-1 rounded-full shadow-lg shadow-emerald-500/20">
                {t.impact}
              </div>

              {/* Quote Icon Background */}
              <div className="mb-6 text-emerald-500/20">
                <StarIcon className="h-8 w-8" />
              </div>

              <p className="text-purple-100/70 italic leading-relaxed mb-8 text-sm">
                &quot;{t.content}&quot;
              </p>

              <div className="flex items-center space-x-4">
                <div className="h-12 w-12 rounded-full bg-gradient-to-tr from-purple-500 to-emerald-500 p-[2px]">
                  <div className="h-full w-full rounded-full bg-[#3b0764] flex items-center justify-center overflow-hidden">
                    {/* If using images, replace icon below */}
                    <span className="text-xs font-bold text-white">{t.name[0]}</span>
                  </div>
                </div>
                <div>
                  <div className="flex items-center space-x-1">
                    <h4 className="text-white font-bold text-sm">{t.name}</h4>
                    <CheckBadgeIcon className="h-4 w-4 text-emerald-400" />
                  </div>
                  <p className="text-xs text-purple-300/50">{t.role}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}