"use client";

import { useState, useEffect } from "react";
import { 
  CheckBadgeIcon, 
  ExclamationTriangleIcon, 
  CurrencyDollarIcon,
  MagnifyingGlassIcon 
} from "@heroicons/react/24/outline";
import { cn } from "@/lib/utils";

export default function AdminPaymentDashboard() {
  const [pendingPayouts, setPendingPayouts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fetch batches with status "Verification Completed" but not "Paid"
    fetch("/api/admin/batches?status=Verified")
      .then(res => res.json())
      .then(data => {
        setPendingPayouts(data);
        setLoading(false);
      });
  }, []);

  const handleApprove = async (payout: any) => {
    const res = await fetch("/api/admin/payouts", {
      method: "POST",
      body: JSON.stringify({
        batchId: payout.id,
        supplierId: payout.supplierId,
        amount: payout.verifiedWeight * 25, // KES 25 per kg
      }),
    });

    if (res.ok) {
      setPendingPayouts(prev => prev.filter((p: any) => p.id !== payout.id));
    }
  };

  return (
    <div className="p-8 lg:p-12 bg-[#fafafa] dark:bg-[#05010d] min-h-screen">
      <header className="mb-12 flex justify-between items-end">
        <div>
          <h2 className="text-4xl font-black italic font-serif tracking-tighter">Treasury Control</h2>
          <p className="text-[10px] font-black uppercase tracking-[0.4em] text-emerald-500 mt-2">
            Pending Fund Releases
          </p>
        </div>
        <div className="flex items-center gap-4 px-6 py-3 bg-white dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-2xl shadow-sm">
           <CurrencyDollarIcon className="w-5 h-5 text-amber-500" />
           <span className="text-xs font-bold uppercase tracking-widest">Total Liability: KES 1.2M</span>
        </div>
      </header>

      <div className="bg-white dark:bg-white/5 rounded-[3rem] border border-slate-200 dark:border-white/10 overflow-hidden shadow-2xl">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="border-b border-slate-100 dark:border-white/5">
              <th className="p-8 text-[10px] font-black uppercase tracking-widest text-slate-400">Supplier / Batch</th>
              <th className="p-8 text-[10px] font-black uppercase tracking-widest text-slate-400">Verified Weight</th>
              <th className="p-8 text-[10px] font-black uppercase tracking-widest text-slate-400">Calculated Payout</th>
              <th className="p-8 text-[10px] font-black uppercase tracking-widest text-slate-400 text-right">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-50 dark:divide-white/5">
            {pendingPayouts.map((payout: any) => (
              <tr key={payout.id} className="group hover:bg-slate-50 dark:hover:bg-white/[0.02] transition-colors">
                <td className="p-8">
                  <div className="flex items-center gap-4">
                    <div className="h-10 w-10 rounded-xl bg-slate-900 dark:bg-white flex items-center justify-center text-white dark:text-slate-900 font-black text-[10px]">
                      {payout.supplierId.substring(0, 2)}
                    </div>
                    <div>
                      <p className="font-bold text-sm uppercase tracking-tight">{payout.supplierName}</p>
                      <p className="text-[10px] text-slate-400 font-mono">ID: {payout.id}</p>
                    </div>
                  </div>
                </td>
                <td className="p-8">
                  <p className="font-bold text-sm">{payout.verifiedWeight} kg</p>
                  {payout.discrepancy && (
                    <span className="flex items-center gap-1 text-[9px] font-black text-amber-500 uppercase mt-1">
                      <ExclamationTriangleIcon className="w-3 h-3" /> -{payout.discrepancy}kg Varience
                    </span>
                  )}
                </td>
                <td className="p-8">
                  <p className="font-black text-emerald-500">KES {(payout.verifiedWeight * 25).toLocaleString()}</p>
                </td>
                <td className="p-8 text-right">
                  <button 
                    onClick={() => handleApprove(payout)}
                    className="px-6 py-3 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl text-[10px] font-black uppercase tracking-widest transition-all shadow-lg shadow-emerald-600/20 active:scale-95"
                  >
                    Release Funds
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {pendingPayouts.length === 0 && (
          <div className="p-20 text-center text-slate-400 font-bold uppercase italic text-xs">
            No pending payouts found. All ledgers are clear.
          </div>
        )}
      </div>
    </div>
  );
}