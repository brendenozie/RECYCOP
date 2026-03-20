"use client";

import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";
import { 
  UserPlusIcon, FingerPrintIcon, KeyIcon, CheckBadgeIcon,
  EllipsisVerticalIcon, TrashIcon, PencilIcon, XMarkIcon
} from "@heroicons/react/24/outline";

export type UserRole = "admin" | "operations" | "supplier" | "driver";

type AppUser = {
  _id?: string;
  firstName: string;
  lastName: string;
  role: UserRole;
  area: string;
  status: string;
  verified: boolean;
};

export function UserAccess() {
  const [users, setUsers] = useState<AppUser[]>([]);
  const [isPanelOpen, setIsPanelOpen] = useState(false);
  const [formData, setFormData] = useState({ firstName: "", lastName: "", role: "Hub Manager", area: "Nairobi Central" });

  // Load users from API
  const fetchUsers = async () => {
    const res = await fetch("/api/admin/users");
    const data = await res.json();
    setUsers(data);
  };

  useEffect(() => { fetchUsers(); }, []);

  const handleProvision = async (e: React.FormEvent) => {
    e.preventDefault();
    const res = await fetch("/api/admin/users", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    });
    if (res.ok) {
      setIsPanelOpen(false);
      fetchUsers();
    }
  };

  const deleteUser = async (id: string) => {
    if (!confirm("Revoke all access for this user?")) return;
    await fetch(`/api/admin/users?id=${id}`, { method: "DELETE" });
    fetchUsers();
  };

  return (
    <div className="space-y-10 relative">
      {/* Provisioning Slide-over */}
      {isPanelOpen && (
        <div className="fixed inset-0 z-[100] flex justify-end">
          <div className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm" onClick={() => setIsPanelOpen(false)} />
          <div className="relative w-full max-w-md bg-white dark:bg-[#0a0a0a] p-10 shadow-2xl h-full border-l border-white/10">
            <h2 className="text-2xl font-black uppercase italic mb-8">New Node Access</h2>
            <form onSubmit={handleProvision} className="space-y-6">
              <input 
                placeholder="First Name" 
                className="w-full p-4 rounded-xl bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/10"
                onChange={(e) => setFormData({...formData, firstName: e.target.value})}
              />
              <input 
                placeholder="Last Name" 
                className="w-full p-4 rounded-xl bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/10"
                onChange={(e) => setFormData({...formData, lastName: e.target.value})}
              />
              <select 
                className="w-full p-4 rounded-xl bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/10"
                onChange={(e) => setFormData({...formData, role: e.target.value})}
              >
                <option value="Hub Manager">Hub Manager</option>
                <option value="Operations">Operations</option>
                <option value="Supplier">Supplier</option>
                <option value="Driver">Driver</option>
              </select>
              <button className="w-full py-4 bg-emerald-500 text-slate-950 font-black uppercase rounded-xl">Initialize Identity</button>
            </form>
          </div>
        </div>
      )}

      <header className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-12">
        <div className="space-y-1">
          <h1 className="text-4xl font-serif font-bold tracking-tight italic">Identity Management</h1>
          <p className="text-slate-500 dark:text-white/40 text-sm font-medium">
            Authorized personnel and secure <span className="text-emerald-500 font-bold">Node Access</span>.
          </p>
        </div>
        <button 
          onClick={() => setIsPanelOpen(true)}
          className="flex items-center gap-2 px-6 py-3.5 bg-slate-900 dark:bg-emerald-500 text-white dark:text-slate-950 rounded-2xl font-black uppercase tracking-widest text-[10px] shadow-lg hover:scale-105 transition-all"
        >
          <UserPlusIcon className="w-4 h-4" />
          Provision Access
        </button>
      </header>

      {/* Security Ledger Table */}
      <div className="rounded-[3rem] border border-slate-200 dark:border-white/10 bg-white dark:bg-white/5 overflow-hidden shadow-sm">
        <div className="p-8 border-b border-slate-100 dark:border-white/5 bg-slate-50/50 dark:bg-transparent flex justify-between">
          <h3 className="text-sm font-black uppercase tracking-[0.2em] text-slate-400">Security Ledger</h3>
          <span className="text-[10px] font-bold text-emerald-500 bg-emerald-500/10 px-3 py-1 rounded-full uppercase">
            {users.length} Active Nodes
          </span>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <tbody className="divide-y divide-slate-100 dark:divide-white/5">
              {users.map((user) => (
                <tr key={user._id} className="group hover:bg-slate-50 dark:hover:bg-white/[0.02] transition-colors">
                  <td className="px-8 py-6">
                    <div className="flex items-center gap-4">
                      <div className="h-12 w-12 rounded-2xl bg-slate-100 dark:bg-white/5 flex items-center justify-center">
                        <FingerPrintIcon className="w-6 h-6 text-slate-400 group-hover:text-emerald-500 transition-colors" />
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <p className="font-bold text-slate-900 dark:text-white">{user.firstName} {user.lastName}</p>
                          {user.verified && <CheckBadgeIcon className="w-4 h-4 text-emerald-500" />}
                        </div>
                        <p className="text-[10px] text-slate-400 font-black uppercase tracking-widest">{user.role}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-8 py-6">
                    <div className="flex items-center gap-2 text-xs font-bold text-slate-500 dark:text-white/40">
                      <KeyIcon className="w-4 h-4 text-emerald-500/50" />
                      {user.area}
                    </div>
                  </td>
                  <td className="px-8 py-6">
                    <span className={cn(
                      "inline-block px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest border",
                      user.status === "Active" 
                        ? "bg-emerald-500/10 text-emerald-500 border-emerald-500/20" 
                        : "bg-amber-500/10 text-amber-500 border-amber-500/20"
                    )}>
                      {user.status}
                    </span>
                  </td>
                  <td className="px-8 py-6 text-right">
                    <div className="flex justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                      <button onClick={() => deleteUser(user._id!)} className="p-2 text-slate-400 hover:text-red-500">
                        <TrashIcon className="w-5 h-5" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}