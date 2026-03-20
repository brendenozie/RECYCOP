"use client";

import { motion } from "framer-motion";
import { 
  GlobeAltIcon, 
  EnvelopeIcon, 
  PhoneIcon,
  MapPinIcon
} from "@heroicons/react/24/outline";

// Mocking social icons since Heroicons doesn't have brand-specific ones
// You can replace these with your preferred SVG icons (X, LinkedIn, etc.)
const SocialIcon = ({ label }: { label: string }) => (
  <div className="h-8 w-8 rounded-full border border-white/10 flex items-center justify-center hover:bg-emerald-500 hover:text-black transition-all cursor-pointer">
    <span className="text-[10px] font-bold uppercase">{label[0]}</span>
  </div>
);

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-[#1a0433] pt-24 pb-12 border-t border-white/5 overflow-hidden relative">
      {/* Subtle Background Glow */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-full h-px bg-gradient-to-r from-transparent via-emerald-500/50 to-transparent" />
      
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 mb-20">
          
          {/* Brand & Mission */}
          <div className="md:col-span-4 space-y-6">
            <div className="flex items-center space-x-2">
              <div className="h-8 w-8 bg-emerald-500 rounded-lg shadow-[0_0_15px_#10b981]" />
              <span className="text-2xl font-serif tracking-tight font-bold text-white">Recyc<span className="text-emerald-400">Works</span></span>
            </div>
            <p className="text-purple-100/50 text-sm leading-relaxed max-w-xs">
              Building the digital and physical infrastructure for Africa&apos;s formalized recycling economy. 
              Efficiency. Transparency. Sustainability.
            </p>
            <div className="flex space-x-4">
              {['X', 'In', 'Fb'].map((social) => (
                <SocialIcon key={social} label={social} />
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div className="md:col-span-2 space-y-6">
            <h4 className="text-xs font-bold uppercase tracking-[0.2em] text-emerald-400">Platform</h4>
            <ul className="space-y-4 text-sm text-purple-100/60 font-medium">
              <li className="hover:text-white transition-colors cursor-pointer">Materials</li>
              <li className="hover:text-white transition-colors cursor-pointer">RecycWorks UI</li>
              <li className="hover:text-white transition-colors cursor-pointer">Logistics</li>
              <li className="hover:text-white transition-colors cursor-pointer">Privacy</li>
            </ul>
          </div>

          {/* Contact */}
          <div className="md:col-span-3 space-y-6">
            <h4 className="text-xs font-bold uppercase tracking-[0.2em] text-emerald-400">Contact Us</h4>
            <ul className="space-y-4 text-sm text-purple-100/60 font-medium">
              <li className="flex items-center space-x-3">
                <MapPinIcon className="h-4 w-4 text-emerald-500" />
                <span>Industrial Area, Nairobi, Kenya</span>
              </li>
              <li className="flex items-center space-x-3">
                <EnvelopeIcon className="h-4 w-4 text-emerald-400" />
                <span>ops@RecycWorks.com</span>
              </li>
              <li className="flex items-center space-x-3">
                <PhoneIcon className="h-4 w-4 text-emerald-500" />
                <span>+254 7XX XXX XXX</span>
              </li>
            </ul>
          </div>

          {/* Vision 2030 Badge Area */}
          <div className="md:col-span-3">
            <div className="bg-white/5 border border-white/10 rounded-2xl p-6 flex flex-col items-center text-center">
              <div className="w-20 h-20 mb-4 bg-white/10 rounded-full flex items-center justify-center border border-white/10 p-2">
                {/* Replace with your Kenya Vision 2030 logo SVG or Image */}
                <GlobeAltIcon className="h-10 w-10 text-emerald-500 opacity-50" />
              </div>
              <p className="text-[10px] font-bold uppercase tracking-widest text-white mb-1">Proudly Aligning with</p>
              <p className="text-sm font-serif italic text-emerald-400">Kenya Vision 2030</p>
              <p className="text-[9px] text-white/30 mt-4 leading-tight uppercase">
                Contributing to the Social & Economic <br /> Pillars of National Development
              </p>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0 text-[11px] font-bold uppercase tracking-widest text-white/30">
          <p>© {currentYear} RecycWorks Africa. All rights reserved.</p>
          <div className="flex space-x-8">
            <span className="hover:text-emerald-400 cursor-pointer transition-colors">Terms of Service</span>
            <span className="hover:text-emerald-400 cursor-pointer transition-colors">Environmental Compliance</span>
          </div>
        </div>
      </div>
    </footer>
  );
}