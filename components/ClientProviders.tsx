"use client";

import React from "react";
import { CartProvider, useCart } from "./CartContext";
import { CheckCircle2, X } from "lucide-react";

function ToastNotification() {
  const { notification, setNotification } = useCart();

  if (!notification) return null;

  return (
    <div className="fixed bottom-6 right-6 z-[100] flex items-center gap-3 rounded-2xl bg-[#0b4938] px-5 py-4 text-white shadow-2xl transition-all duration-300 animate-in fade-in slide-in-from-bottom-5">
      <CheckCircle2 className="h-6 w-6 text-[#f4c542]" />
      <span className="font-semibold text-sm md:text-base">{notification}</span>
      <button
        onClick={() => setNotification(null)}
        className="ml-2 text-white/70 hover:text-white"
        aria-label="Close notification"
      >
        <X size={18} />
      </button>
    </div>
  );
}

export default function ClientProviders({ children }: { children: React.ReactNode }) {
  return (
    <CartProvider>
      {children}
      <ToastNotification />
    </CartProvider>
  );
}
