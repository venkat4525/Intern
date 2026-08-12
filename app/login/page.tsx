"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import PageShell from "@/components/PageShell";
import {
  AlertCircle,
  ArrowRight,
  CheckCircle2,
  Eye,
  EyeOff,
  Lock,
  Mail,
  ShieldCheck,
  Sparkles,
  UserCheck
} from "lucide-react";

export default function LoginPage() {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);

  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const [forgotModalOpen, setForgotModalOpen] = useState(false);
  const [forgotEmail, setForgotEmail] = useState("");
  const [forgotSent, setForgotSent] = useState(false);

  const validateForm = () => {
    setError(null);
    if (!email.trim()) {
      setError("Please enter your email or username.");
      return false;
    }
    // Basic email format check if @ is included
    if (email.includes("@")) {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email.trim())) {
        setError("Please enter a valid email address.");
        return false;
      }
    }
    if (!password) {
      setError("Please enter your password.");
      return false;
    }
    if (password.length < 4) {
      setError("Password must be at least 4 characters long.");
      return false;
    }
    return true;
  };

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;

    setIsLoading(true);

    // Simulate secure login verification
    setTimeout(() => {
      setIsLoading(false);
      setSuccess(true);

      const userSession = {
        email: email.trim(),
        name: email.split("@")[0] || "CareBridge User",
        loginTime: new Date().toISOString(),
      };

      if (rememberMe) {
        localStorage.setItem("carebridge_user_session", JSON.stringify(userSession));
      } else {
        sessionStorage.setItem("carebridge_user_session", JSON.stringify(userSession));
      }

      setTimeout(() => {
        router.push("/");
      }, 1200);
    }, 1000);
  };

  const handleForgotPasswordSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!forgotEmail.trim() || !forgotEmail.includes("@")) {
      return;
    }
    setForgotSent(true);
  };

  return (
    <PageShell>
      <div className="relative min-h-[80vh] bg-gradient-to-br from-[#062d23] via-[#0b4938] to-[#117153] py-16 px-4 sm:px-6 lg:px-8 flex items-center justify-center">
        {/* Subtle decorative background circles */}
        <div className="absolute top-10 left-10 h-72 w-72 rounded-full bg-[#f4c542]/10 blur-3xl pointer-events-none" />
        <div className="absolute bottom-10 right-10 h-80 w-80 rounded-full bg-emerald-500/10 blur-3xl pointer-events-none" />

        <div className="relative w-full max-w-md">
          {/* Centered Login Card */}
          <div className="overflow-hidden rounded-3xl border border-[#e8dfc5]/30 bg-white/95 p-8 shadow-2xl backdrop-blur-md">
            {/* Header / Brand Logo */}
            <div className="text-center mb-8">
              <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-[#f4ebdd] text-[#0b4938] mb-3">
                <UserCheck size={30} />
              </div>
              <h1 className="text-2xl font-extrabold text-[#173f35] md:text-3xl">Welcome Back</h1>
              <p className="mt-1.5 text-xs text-gray-500">Log in to your CareBridge family account</p>
            </div>

            {/* Error Banner */}
            {error && (
              <div className="mb-6 flex items-center gap-2.5 rounded-2xl bg-red-50 p-3.5 text-xs font-semibold text-red-800 border border-red-200 animate-in fade-in">
                <AlertCircle size={18} className="text-red-600 shrink-0" />
                <span>{error}</span>
              </div>
            )}

            {/* Success Banner */}
            {success ? (
              <div className="py-8 text-center space-y-4 animate-in fade-in">
                <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-emerald-100 text-emerald-700">
                  <CheckCircle2 size={40} />
                </div>
                <h2 className="text-xl font-bold text-[#173f35]">Login Successful!</h2>
                <p className="text-xs text-gray-600">Redirecting you to CareBridge home...</p>
              </div>
            ) : (
              <form onSubmit={handleLogin} className="space-y-5">
                {/* Email / Username Field */}
                <div>
                  <label className="block text-xs font-bold text-[#173f35] mb-1.5">
                    Email Address or Username
                  </label>
                  <div className="relative">
                    <Mail size={18} className="absolute left-3.5 top-3 text-gray-400" />
                    <input
                      type="text"
                      required
                      placeholder="e.g. user@example.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full rounded-xl border border-gray-300 bg-[#faf9f6] pl-10 pr-4 py-2.5 text-xs text-gray-800 transition focus:border-[#0b4938] focus:bg-white focus:outline-none"
                    />
                  </div>
                </div>

                {/* Password Field with Masking & Toggle */}
                <div>
                  <div className="flex items-center justify-between mb-1.5">
                    <label className="block text-xs font-bold text-[#173f35]">Password</label>
                    <button
                      type="button"
                      onClick={() => setForgotModalOpen(true)}
                      className="text-[11px] font-bold text-[#0b4938] hover:underline"
                    >
                      Forgot Password?
                    </button>
                  </div>
                  <div className="relative">
                    <Lock size={18} className="absolute left-3.5 top-3 text-gray-400" />
                    <input
                      type={showPassword ? "text" : "password"}
                      required
                      placeholder="Enter your password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="w-full rounded-xl border border-gray-300 bg-[#faf9f6] pl-10 pr-10 py-2.5 text-xs text-gray-800 transition focus:border-[#0b4938] focus:bg-white focus:outline-none"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-2.5 text-gray-400 hover:text-gray-600 focus:outline-none"
                      aria-label={showPassword ? "Hide password" : "Show password"}
                    >
                      {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                    </button>
                  </div>
                </div>

                {/* Remember Me Checkbox */}
                <div className="flex items-center justify-between text-xs pt-1">
                  <label className="flex items-center gap-2 text-gray-600 cursor-pointer select-none">
                    <input
                      type="checkbox"
                      checked={rememberMe}
                      onChange={(e) => setRememberMe(e.target.checked)}
                      className="h-4 w-4 rounded border-gray-300 text-[#0b4938] focus:ring-[#0b4938]"
                    />
                    <span>Remember me on this device</span>
                  </label>
                </div>

                {/* Primary Log In Button */}
                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-full flex items-center justify-center gap-2 rounded-xl bg-[#0b4938] py-3.5 px-4 text-xs font-extrabold text-white transition duration-200 hover:bg-[#125c48] shadow-lg hover:shadow-xl disabled:opacity-75"
                >
                  {isLoading ? (
                    <div className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
                  ) : (
                    <>
                      Log In <ArrowRight size={16} />
                    </>
                  )}
                </button>
              </form>
            )}

            {/* Footer / Create Account Link */}
            <div className="mt-8 border-t border-gray-100 pt-6 text-center text-xs text-gray-600">
              <span>Don't have an account yet? </span>
              <Link href="/signup" className="font-bold text-[#0b4938] hover:underline">
                Sign Up / Create Account
              </Link>
            </div>

            {/* Security Badge */}
            <div className="mt-6 flex items-center justify-center gap-1.5 text-[11px] font-semibold text-emerald-800 bg-emerald-50 py-2 rounded-xl border border-emerald-100">
              <ShieldCheck size={14} className="text-emerald-700" />
              <span>256-bit Encrypted Secure Login</span>
            </div>
          </div>
        </div>
      </div>

      {/* Forgot Password Modal */}
      {forgotModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 backdrop-blur-sm animate-in fade-in">
          <div className="relative w-full max-w-sm rounded-3xl bg-white p-6 shadow-2xl">
            <h3 className="text-lg font-extrabold text-[#173f35] mb-2">Reset Password</h3>
            {forgotSent ? (
              <div className="space-y-4 py-4 text-center">
                <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-emerald-100 text-emerald-700">
                  <CheckCircle2 size={32} />
                </div>
                <p className="text-xs text-gray-600">
                  Password reset link has been sent to <span className="font-bold text-[#173f35]">{forgotEmail}</span>.
                </p>
                <button
                  onClick={() => {
                    setForgotModalOpen(false);
                    setForgotSent(false);
                    setForgotEmail("");
                  }}
                  className="w-full rounded-xl bg-[#0b4938] py-2.5 text-xs font-bold text-white hover:bg-[#125c48]"
                >
                  Back to Login
                </button>
              </div>
            ) : (
              <form onSubmit={handleForgotPasswordSubmit} className="space-y-4">
                <p className="text-xs text-gray-600">
                  Enter your registered email address and we'll send you a password reset link.
                </p>
                <div>
                  <input
                    type="email"
                    required
                    placeholder="Enter your email"
                    value={forgotEmail}
                    onChange={(e) => setForgotEmail(e.target.value)}
                    className="w-full rounded-xl border border-gray-300 p-2.5 text-xs focus:border-[#0b4938] focus:outline-none"
                  />
                </div>
                <div className="flex gap-2">
                  <button
                    type="button"
                    onClick={() => setForgotModalOpen(false)}
                    className="w-1/2 rounded-xl border border-gray-300 py-2.5 text-xs font-bold text-gray-600 hover:bg-gray-50"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="w-1/2 rounded-xl bg-[#0b4938] py-2.5 text-xs font-bold text-white hover:bg-[#125c48]"
                  >
                    Send Link
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}
    </PageShell>
  );
}
