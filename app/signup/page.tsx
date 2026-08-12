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
  Phone,
  ShieldCheck,
  User,
  UserPlus
} from "lucide-react";

export default function SignupPage() {
  const router = useRouter();

  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [agreeTerms, setAgreeTerms] = useState(false);

  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const validateForm = () => {
    setError(null);
    if (!fullName.trim()) {
      setError("Please enter your full name.");
      return false;
    }
    if (!email.trim() || !email.includes("@")) {
      setError("Please enter a valid email address.");
      return false;
    }
    if (!phone.trim() || phone.length < 10) {
      setError("Please enter a valid 10-digit mobile number.");
      return false;
    }
    if (!password || password.length < 6) {
      setError("Password must be at least 6 characters long.");
      return false;
    }
    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return false;
    }
    if (!agreeTerms) {
      setError("You must agree to the Terms of Service & Privacy Policy.");
      return false;
    }
    return true;
  };

  const handleSignup = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;

    setIsLoading(true);

    setTimeout(() => {
      setIsLoading(false);
      setSuccess(true);

      const userSession = {
        fullName: fullName.trim(),
        email: email.trim(),
        phone: phone.trim(),
        createdTime: new Date().toISOString(),
      };

      sessionStorage.setItem("carebridge_user_session", JSON.stringify(userSession));

      setTimeout(() => {
        router.push("/login");
      }, 1500);
    }, 1000);
  };

  return (
    <PageShell>
      <div className="relative min-h-[85vh] bg-gradient-to-br from-[#062d23] via-[#0b4938] to-[#117153] py-16 px-4 sm:px-6 lg:px-8 flex items-center justify-center">
        {/* Decorative background glow */}
        <div className="absolute top-10 right-10 h-72 w-72 rounded-full bg-[#f4c542]/10 blur-3xl pointer-events-none" />

        <div className="relative w-full max-w-lg">
          <div className="overflow-hidden rounded-3xl border border-[#e8dfc5]/30 bg-white/95 p-8 shadow-2xl backdrop-blur-md">
            {/* Header */}
            <div className="text-center mb-8">
              <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-[#f4ebdd] text-[#0b4938] mb-3">
                <UserPlus size={30} />
              </div>
              <h1 className="text-2xl font-extrabold text-[#173f35] md:text-3xl">Create an Account</h1>
              <p className="mt-1.5 text-xs text-gray-500">Join CareBridge for easy family care sourcing</p>
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
                <h2 className="text-xl font-bold text-[#173f35]">Account Created!</h2>
                <p className="text-xs text-gray-600">Redirecting to login page...</p>
              </div>
            ) : (
              <form onSubmit={handleSignup} className="space-y-4 text-xs">
                {/* Full Name */}
                <div>
                  <label className="block font-bold text-[#173f35] mb-1">Full Name *</label>
                  <div className="relative">
                    <User size={16} className="absolute left-3.5 top-3 text-gray-400" />
                    <input
                      type="text"
                      required
                      placeholder="e.g. Ramesh Kumar"
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                      className="w-full rounded-xl border border-gray-300 bg-[#faf9f6] pl-10 pr-4 py-2.5 text-xs text-gray-800 focus:border-[#0b4938] focus:bg-white focus:outline-none"
                    />
                  </div>
                </div>

                {/* Email & Phone */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block font-bold text-[#173f35] mb-1">Email Address *</label>
                    <div className="relative">
                      <Mail size={16} className="absolute left-3.5 top-3 text-gray-400" />
                      <input
                        type="email"
                        required
                        placeholder="name@example.com"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full rounded-xl border border-gray-300 bg-[#faf9f6] pl-10 pr-3 py-2.5 text-xs text-gray-800 focus:border-[#0b4938] focus:bg-white focus:outline-none"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block font-bold text-[#173f35] mb-1">Mobile Number *</label>
                    <div className="relative">
                      <Phone size={16} className="absolute left-3.5 top-3 text-gray-400" />
                      <input
                        type="tel"
                        required
                        placeholder="9845012345"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        className="w-full rounded-xl border border-gray-300 bg-[#faf9f6] pl-10 pr-3 py-2.5 text-xs text-gray-800 focus:border-[#0b4938] focus:bg-white focus:outline-none"
                      />
                    </div>
                  </div>
                </div>

                {/* Password & Confirm Password */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block font-bold text-[#173f35] mb-1">Password *</label>
                    <div className="relative">
                      <Lock size={16} className="absolute left-3.5 top-3 text-gray-400" />
                      <input
                        type={showPassword ? "text" : "password"}
                        required
                        placeholder="Min 6 characters"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="w-full rounded-xl border border-gray-300 bg-[#faf9f6] pl-10 pr-9 py-2.5 text-xs text-gray-800 focus:border-[#0b4938] focus:bg-white focus:outline-none"
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-3 top-2.5 text-gray-400 hover:text-gray-600"
                      >
                        {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                      </button>
                    </div>
                  </div>

                  <div>
                    <label className="block font-bold text-[#173f35] mb-1">Confirm Password *</label>
                    <div className="relative">
                      <Lock size={16} className="absolute left-3.5 top-3 text-gray-400" />
                      <input
                        type={showPassword ? "text" : "password"}
                        required
                        placeholder="Re-enter password"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        className="w-full rounded-xl border border-gray-300 bg-[#faf9f6] pl-10 pr-3 py-2.5 text-xs text-gray-800 focus:border-[#0b4938] focus:bg-white focus:outline-none"
                      />
                    </div>
                  </div>
                </div>

                {/* Terms Agreement Checkbox */}
                <div className="pt-2">
                  <label className="flex items-start gap-2 text-gray-600 cursor-pointer select-none">
                    <input
                      type="checkbox"
                      checked={agreeTerms}
                      onChange={(e) => setAgreeTerms(e.target.checked)}
                      className="mt-0.5 h-4 w-4 rounded border-gray-300 text-[#0b4938] focus:ring-[#0b4938]"
                    />
                    <span>
                      I agree to the <span className="font-bold text-[#173f35]">Terms of Service</span> and <span className="font-bold text-[#173f35]">Privacy Policy</span>.
                    </span>
                  </label>
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-full flex items-center justify-center gap-2 rounded-xl bg-[#0b4938] py-3.5 px-4 text-xs font-extrabold text-white transition hover:bg-[#125c48] shadow-lg mt-2 disabled:opacity-75"
                >
                  {isLoading ? (
                    <div className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
                  ) : (
                    <>
                      Create Account <ArrowRight size={16} />
                    </>
                  )}
                </button>
              </form>
            )}

            {/* Footer */}
            <div className="mt-6 border-t border-gray-100 pt-5 text-center text-xs text-gray-600">
              <span>Already have an account? </span>
              <Link href="/login" className="font-bold text-[#0b4938] hover:underline">
                Log In Here
              </Link>
            </div>
          </div>
        </div>
      </div>
    </PageShell>
  );
}
