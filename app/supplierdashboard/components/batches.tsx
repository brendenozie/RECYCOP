import { cn } from "@/lib/utils";
import { CubeIcon } from "@heroicons/react/24/outline";

export function MyBatches() {
  const batches = [
    { id: "B-9901", material: "PET Clear", weight: "850kg", grade: "A", status: "Stored" },
    { id: "B-9905", material: "HDPE Opaque", weight: "1,200kg", grade: "B+", status: "In Transit" },
  ];

  return (
    <div className="p-10 rounded-[3rem] bg-white dark:bg-white/5 border border-slate-200 dark:border-white/10">
      <div className="flex justify-between items-center mb-10">
        <h3 className="text-xl font-bold italic font-serif">Inventory Batches</h3>
        <button className="text-[10px] font-black uppercase tracking-widest px-6 py-3 bg-slate-900 text-white dark:bg-white dark:text-slate-900 rounded-xl">Create New Batch</button>
      </div>
      <div className="space-y-4">
        {batches.map((batch) => (
          <div key={batch.id} className="flex items-center justify-between p-6 rounded-3xl bg-slate-50 dark:bg-white/5 border border-transparent hover:border-emerald-500/20 transition-all">
            <div className="flex items-center gap-6">
              <div className="h-14 w-14 rounded-2xl bg-white dark:bg-slate-800 flex items-center justify-center border border-slate-200 dark:border-white/5">
                <CubeIcon className="w-6 h-6 text-emerald-500" />
              </div>
              <div>
                <p className="font-bold">{batch.material} <span className="text-[10px] text-slate-400 ml-2">#{batch.id}</span></p>
                <p className="text-xs text-slate-500">Weight: {batch.weight} • Grade: {batch.grade}</p>
              </div>
            </div>
            <span className={cn(
              "text-[9px] font-black uppercase tracking-widest px-4 py-2 rounded-full",
              batch.status === "Stored" ? "bg-blue-100 text-blue-600" : "bg-emerald-100 text-emerald-600"
            )}>{batch.status}</span>
          </div>
        ))}
      </div>
    </div>
  );
}