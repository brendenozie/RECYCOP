import { TruckIcon } from "lucide-react";

export function RequestPickup() {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
      <div className="p-10 rounded-[3rem] bg-emerald-600 text-white shadow-xl relative overflow-hidden">
        <TruckIcon className="w-12 h-12 mb-6" />
        <h3 className="text-3xl font-black italic mb-4">Request a Carrier</h3>
        <p className="text-emerald-100 text-sm mb-10 leading-relaxed">
          Ready to move your materials? We&apos;ll dispatch the nearest logistics unit to your collection center within 24 hours.
        </p>
        <div className="space-y-4">
          <button className="w-full py-5 bg-slate-900 rounded-2xl font-black uppercase tracking-widest text-[11px] hover:bg-slate-800 transition-all">
            Confirm Pickup Request
          </button>
        </div>
      </div>
      
      <div className="p-10 rounded-[3rem] border border-slate-200 dark:border-white/10 bg-white dark:bg-white/5">
        <h4 className="text-lg font-bold mb-6">Schedule Details</h4>
        <div className="space-y-6">
          <div className="space-y-2">
            <label className="text-[10px] font-black uppercase text-slate-400 tracking-widest">Select Hub Destination</label>
            <select className="w-full bg-slate-50 dark:bg-white/5 border-none rounded-2xl p-4 text-sm outline-none font-bold">
              <option>Nairobi Central Hub</option>
              <option>Thika Regional Node</option>
            </select>
          </div>
          <div className="space-y-2">
            <label className="text-[10px] font-black uppercase text-slate-400 tracking-widest">Estimated Load Size</label>
            <input type="text" placeholder="e.g. 5.5 Tons" className="w-full bg-slate-50 dark:bg-white/5 border-none rounded-2xl p-4 text-sm outline-none font-bold" />
          </div>
        </div>
      </div>
    </div>
  );
}