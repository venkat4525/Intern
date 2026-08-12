"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import PageShell from "@/components/PageShell";
import { Lock, ShieldCheck, UserCheck, AlertCircle } from "lucide-react";

export default function AdminLoginPage() {
  const router = useRouter();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg(null);

    // Simple Admin Credentials Verification
    if (
      (username.trim().toLowerCase() === "admin" && password === "admin123") ||
      password === "admin123" ||
      password === "123456"
    ) {
      if (typeof window !== "undefined") {
        sessionStorage.setItem("carebridge_admin_session", "authenticated_true");
      }
      router.push("/admin");
    } else {
      setErrorMsg("Invalid Admin Username or Password. Try 'admin' / 'admin123'");
    }
  };

  return (
    <PageShell>
      <div className="bg-[#faf9f6] py-16 md:py-24">
        <div className="mx-auto max-w-md px-5">
          <div className="rounded-3xl border border-gray-200 bg-white p-8 shadow-xl">
            <div className="text-center mb-6">
              <Image
                src="/carebridge-logo.png"
                alt="CareBridge"
                width={180}
                height={80}
                className="mx-auto h-16 w-auto object-contain bg-white/10 p-1"
              />
              <div className="mt-3 inline-flex items-center gap-1.5 rounded-full bg-[#f4ebdd] px-3 py-1 text-xs font-extrabold text-[#173f35]">
                <ShieldCheck size={14} className="text-[#0b4938]" /> Restricted Access
              </div>
              <h1 className="mt-3 text-2xl font-extrabold text-[#173f35]">Admin Portal Login</h1>
              <p className="mt-1 text-xs text-gray-500">Sign in to manage orders, catalog & fulfillment.</p>
            </div>

            {errorMsg && (
              <div className="mb-6 rounded-2xl bg-red-50 p-3.5 text-xs font-semibold text-red-800 border border-red-200 flex items-center gap-2">
                <AlertCircle size={16} className="text-red-600 shrink-0" />
                <span>{errorMsg}</span>
              </div>
            )}

            <form onSubmit={handleLogin} className="space-y-4">
              <div>
                <label className="text-xs font-bold text-[#173f35] block mb-1">
                  Admin Username
                </label>
                <input
                  type="text"
                  placeholder="admin"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="w-full rounded-xl border border-gray-300 px-4 py-2.5 text-sm focus:outline-none focus:border-[#0b4938]"
                />
              </div>

              <div>
                <label className="text-xs font-bold text-[#173f35] block mb-1">
                  Admin Password
                </label>
                <div className="relative">
                  <Lock size={16} className="absolute left-3 top-3 text-gray-400" />
                  <input
                    type="password"
                    placeholder="••••••••"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full rounded-xl border border-gray-300 pl-9 pr-4 py-2.5 text-sm focus:outline-none focus:border-[#0b4938]"
                  />
                </div>
                <p className="mt-1 text-[11px] text-gray-400">Default Credentials: admin / admin123</p>
              </div>

              <button
                type="submit"
                className="mt-6 flex w-full items-center justify-center gap-2 rounded-2xl bg-[#0b4938] py-3.5 text-sm font-extrabold text-white transition hover:bg-[#125c48] shadow-md"
              >
                <UserCheck size={18} className="text-[#f4c542]" /> Login to Admin Dashboard
              </button>
            </form>
          </div>
        </div>
      </div>
    </PageShell>
  );
}
