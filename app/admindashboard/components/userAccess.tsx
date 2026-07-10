"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";
import { 
  UserPlusIcon, 
  FingerPrintIcon, 
  KeyIcon, 
  CheckBadgeIcon,
  TrashIcon, 
  XMarkIcon,
  MapPinIcon,
  ShieldCheckIcon
} from "@heroicons/react/24/outline";

export type UserRole = "admin" | "operations" | "supplier" | "driver";

type AppUser = {
  _id?: string;
  firstName: string;
  lastName: string;
  role: UserRole | string;
  area: string;
  status: string;
  verified: boolean;
};

export function UserAccess() {
  const [users, setUsers] = useState<AppUser[]>([]);
  const [isPanelOpen, setIsPanelOpen] = useState(false);
  const [formData, setFormData] = useState({ firstName: "", lastName: "", role: "Hub Manager", area: "Nairobi Central" });

  const fetchUsers = async () => {
    try {
      const res = await fetch("/api/admin/users");
      const data = await res.json();
      setUsers(data);
    } catch (err) {
      // Fallback local mock data for direct design alignment if API isn't ready
      setUsers([
        { _id: "1", firstName: "Samuel", lastName: "Mwangi", role: "Hub Manager", area: "Nairobi Central", status: "Active", verified: true },
        { _id: "2", firstName: "Grace", lastName: "Omondi", role: "Operations", area: "Mombasa Kilindini", status: "Active", verified: true },
        { _id: "3", firstName: "David", lastName: "Kiplagat", role: "Driver", area: "Kisumu West", status: "Reviewing", verified: false }
      ]);
    }
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
    if (!confirm("Revoke all application access permissions for this team member?")) return;
    await fetch(`/api/admin/users?id=${id}`, { method: "DELETE" });
    fetchUsers();
  };

  return (
    <div className="space-y-8 max-w-7xl mx-auto p-2 sm:p-4 relative">
      
      {/* --- DASHBOARD HEADER --- */}
      <header className="flex flex-col sm:flex-row sm:items-center justify-between gap-6 bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-xs">
        <div className="space-y-1">
          <div className="flex items-center gap-2 text-xs font-bold text-emerald-600 dark:text-emerald-400 uppercase tracking-widest">
            <ShieldCheckIcon className="w-4 h-4 text-emerald-500" />
            Security & Roles Management
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight">Team Access Control</h1>
          <p className="text-slate-500 dark:text-slate-400 text-xs sm:text-sm">
            Manage system entry credentials, assign regional coverage zones, and track active platform permissions.
          </p>
        </div>
        <button 
          onClick={() => setIsPanelOpen(true)}
          className="flex items-center justify-center gap-2 px-5 py-3.5 bg-slate-900 hover:bg-slate-800 dark:bg-emerald-500 dark:hover:bg-emerald-400 text-white dark:text-slate-950 rounded-xl font-bold uppercase tracking-wider text-xs transition-all active:scale-[0.98] shadow-md shrink-0"
        >
          <UserPlusIcon className="w-4 h-4 stroke-[2.5]" />
          Add Team Member
        </button>
      </header>

      {/* --- USER TEAM LEDGER TABLE CARD --- */}
      <div className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 overflow-hidden shadow-xs">
        <div className="p-6 border-b border-slate-100 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-900/50 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h3 className="text-sm font-bold text-slate-800 dark:text-slate-200">System Permission Logs</h3>
            <p className="text-xs text-slate-400 dark:text-slate-500 mt-0.5">Currently authenticated mobile operators and dispatch handlers.</p>
          </div>
          <span className="self-start sm:self-auto text-xs font-bold text-emerald-600 dark:text-emerald-400 bg-emerald-500/10 px-3 py-1 rounded-lg">
            {users.length} Active Accounts
          </span>
        </div>
        
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-slate-100 dark:border-slate-800 text-[11px] font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500 bg-slate-50/20 dark:bg-transparent">
                <th className="px-6 py-4">User Details</th>
                <th className="px-6 py-4">Coverage Zone</th>
                <th className="px-6 py-4">Network Status</th>
                <th className="px-6 py-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
              {users.map((user) => (
                <tr key={user._id} className="group hover:bg-slate-50/60 dark:hover:bg-slate-800/20 transition-colors">
                  <td className="px-6 py-4.5">
                    <div className="flex items-center gap-4">
                      <div className="h-11 w-11 rounded-xl bg-slate-100 dark:bg-slate-800 flex items-center justify-center border border-slate-200/40 dark:border-slate-700/40 shrink-0">
                        <FingerPrintIcon className="w-5 h-5 text-slate-400 group-hover:text-emerald-500 transition-colors" />
                      </div>
                      <div>
                        <div className="flex items-center gap-1.5">
                          <p className="font-bold text-sm text-slate-900 dark:text-white">{user.firstName} {user.lastName}</p>
                          {user.verified && <CheckBadgeIcon className="w-4 h-4 text-emerald-500 shrink-0" />}
                        </div>
                        <p className="text-[11px] text-slate-400 dark:text-slate-500 font-bold uppercase tracking-wider mt-0.5">{user.role}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4.5">
                    <div className="flex items-center gap-1.5 text-xs font-semibold text-slate-600 dark:text-slate-400">
                      <MapPinIcon className="w-4 h-4 text-slate-400 dark:text-slate-500" />
                      {user.area}
                    </div>
                  </td>
                  <td className="px-6 py-4.5">
                    <span className={cn(
                      "inline-flex items-center px-2.5 py-1 rounded-md text-[10px] font-bold uppercase tracking-wider border",
                      user.status === "Active" 
                        ? "bg-emerald-50 dark:bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-100 dark:border-emerald-500/20" 
                        : "bg-amber-50 dark:bg-amber-500/10 text-amber-600 dark:text-amber-400 border-amber-100 dark:border-amber-500/20"
                    )}>
                      <span className={cn("w-1.5 h-1.5 rounded-full mr-1.5", user.status === "Active" ? "bg-emerald-500" : "bg-amber-400")} />
                      {user.status}
                    </span>
                  </td>
                  <td className="px-6 py-4.5 text-right">
                    <button 
                      onClick={() => deleteUser(user._id!)} 
                      className="p-2 text-slate-400 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-500/10 rounded-lg transition-all inline-flex items-center"
                      title="Revoke Access"
                    >
                      <TrashIcon className="w-4 h-4" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* --- SIDE-OVER ACCESS CREATION DRAWER --- */}
      <AnimatePresence>
        {isPanelOpen && (
          <div className="fixed inset-0 z-50 flex justify-end">
            {/* Backdrop Blur Overlay */}
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 bg-slate-900/40 backdrop-blur-xs" 
              onClick={() => setIsPanelOpen(false)} 
            />
            
            {/* Slide-out Menu Panel */}
            <motion.div 
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 26, stiffness: 220 }}
              className="relative w-full max-w-md bg-white dark:bg-slate-900 p-6 sm:p-8 shadow-2xl h-full border-l border-slate-200 dark:border-slate-800 flex flex-col justify-between"
            >
              <div className="space-y-6">
                <div className="flex items-center justify-between pb-4 border-b border-slate-100 dark:border-slate-800">
                  <div>
                    <h2 className="text-xl font-extrabold text-slate-900 dark:text-white">Grant App Access</h2>
                    <p className="text-xs text-slate-400 dark:text-slate-500 mt-0.5">Setup device credentials for new operations staff.</p>
                  </div>
                  <button 
                    onClick={() => setIsPanelOpen(false)}
                    className="p-2 rounded-lg text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition-all"
                  >
                    <XMarkIcon className="w-5 h-5" />
                  </button>
                </div>

                <form id="access-form" onSubmit={handleProvision} className="space-y-4">
                  <div className="space-y-1.5">
                    <label className="text-[11px] font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500">First Name</label>
                    <input 
                      required
                      placeholder="e.g. Samuel" 
                      className="w-full p-3.5 rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 focus:border-emerald-500 dark:focus:border-emerald-500 text-sm outline-hidden transition-all text-slate-900 dark:text-white font-medium"
                      onChange={(e) => setFormData({...formData, firstName: e.target.value})}
                    />
                  </div>
                  
                  <div className="space-y-1.5">
                    <label className="text-[11px] font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500">Last Name</label>
                    <input 
                      required
                      placeholder="e.g. Mwangi" 
                      className="w-full p-3.5 rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 focus:border-emerald-500 dark:focus:border-emerald-500 text-sm outline-hidden transition-all text-slate-900 dark:text-white font-medium"
                      onChange={(e) => setFormData({...formData, lastName: e.target.value})}
                    />
                  </div>
                  
                  <div className="space-y-1.5">
                    <label className="text-[11px] font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500">Workforce Role</label>
                    <select 
                      className="w-full p-3.5 rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 text-sm outline-hidden transition-all text-slate-900 dark:text-white font-medium appearance-none cursor-pointer"
                      onChange={(e) => setFormData({...formData, role: e.target.value})}
                    >
                      <option value="Hub Manager">Hub Manager</option>
                      <option value="Operations">Operations Assistant</option>
                      <option value="Supplier">Registered Supplier</option>
                      <option value="Driver">Logistics Driver</option>
                    </select>
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-[11px] font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500">Assigned Branch Base</label>
                    <input 
                      required
                      placeholder="e.g. Nairobi Central" 
                      className="w-full p-3.5 rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 focus:border-emerald-500 dark:focus:border-emerald-500 text-sm outline-hidden transition-all text-slate-900 dark:text-white font-medium"
                      defaultValue="Nairobi Central"
                      onChange={(e) => setFormData({...formData, area: e.target.value})}
                    />
                  </div>
                </form>
              </div>

              <div className="pt-4 border-t border-slate-100 dark:border-slate-800 space-y-2">
                <button 
                  type="submit"
                  form="access-form"
                  className="w-full py-3.5 bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold uppercase tracking-wider text-xs rounded-xl transition-all shadow-md active:scale-[0.99]"
                >
                  Activate Access Device
                </button>
                <button 
                  type="button"
                  onClick={() => setIsPanelOpen(false)}
                  className="w-full py-3 bg-slate-100 dark:bg-slate-800 text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 font-bold uppercase tracking-wider text-xs rounded-xl transition-all"
                >
                  Cancel
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}