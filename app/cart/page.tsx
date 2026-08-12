"use client";

import { useState } from "react";
import Link from "next/link";
import PageShell from "@/components/PageShell";
import { useCart } from "@/components/CartContext";
import {
  ArrowLeft,
  ArrowRight,
  CheckCircle2,
  Minus,
  Plus,
  ShieldCheck,
  ShoppingBag,
  Tag,
  Trash2,
  Truck,
  Zap
} from "lucide-react";

export default function CartPage() {
  const {
    items,
    count,
    subtotal,
    discount,
    appliedCoupon,
    change,
    setQty,
    remove,
    clear,
    applyCoupon,
    removeCoupon,
  } = useCart();

  const [couponInput, setCouponInput] = useState("");
  const [couponMsg, setCouponMsg] = useState<{ success: boolean; text: string } | null>(null);

  const freeShippingThreshold = 999;
  const shippingFee = subtotal >= freeShippingThreshold || subtotal === 0 ? 0 : 99;
  const tax = Math.round(subtotal * 0.05); // 5% tax
  const total = Math.max(0, subtotal + tax + shippingFee - discount);
  const amountForFreeShipping = Math.max(0, freeShippingThreshold - subtotal);

  const handleApplyCoupon = (e: React.FormEvent) => {
    e.preventDefault();
    if (!couponInput.trim()) return;
    const res = applyCoupon(couponInput);
    setCouponMsg({ success: res.success, text: res.message });
  };

  if (items.length === 0) {
    return (
      <PageShell>
        <div className="mx-auto max-w-4xl px-5 py-24 text-center">
          <div className="mx-auto flex h-24 w-24 items-center justify-center rounded-full bg-[#f4ebdd] text-[#0b4938] mb-6">
            <ShoppingBag size={48} />
          </div>
          <h1 className="text-3xl font-extrabold text-[#173f35]">Your Shopping Cart is Empty</h1>
          <p className="mt-3 text-base text-gray-600 max-w-md mx-auto">
            Looks like you haven't added any essentials to your cart yet. Explore our wide range of groceries, medical equipment, and daily pooja items.
          </p>
          <div className="mt-8 flex justify-center gap-4">
            <Link
              href="/categories"
              className="inline-flex items-center gap-2 rounded-xl bg-[#0b4938] px-6 py-3.5 font-bold text-white transition hover:bg-[#125c48]"
            >
              Explore Products <ArrowRight size={18} />
            </Link>
          </div>
        </div>
      </PageShell>
    );
  }

  return (
    <PageShell>
      <div className="bg-[#faf9f6] py-12 md:py-16">
        <div className="mx-auto max-w-7xl px-5 md:px-8">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
            <div>
              <h1 className="text-3xl font-extrabold text-[#173f35]">Shopping Cart</h1>
              <p className="mt-1 text-sm text-gray-600">
                You have <span className="font-bold text-[#0b4938]">{count} item(s)</span> in your cart.
              </p>
            </div>
            <button
              onClick={clear}
              className="inline-flex items-center gap-1.5 text-xs font-bold text-red-600 hover:text-red-800"
            >
              <Trash2 size={14} /> Clear Entire Cart
            </button>
          </div>

          {/* Free shipping progress banner */}
          <div className="mb-8 rounded-2xl bg-white p-4 border border-[#e8dfc5] shadow-sm">
            {amountForFreeShipping > 0 ? (
              <div className="space-y-2">
                <div className="flex justify-between text-xs font-bold text-[#173f35]">
                  <span>Free Delivery Qualification</span>
                  <span>Add ₹{amountForFreeShipping.toLocaleString("en-IN")} more for FREE Delivery!</span>
                </div>
                <div className="h-2 w-full overflow-hidden rounded-full bg-gray-200">
                  <div
                    className="h-full bg-[#0b4938] transition-all duration-500"
                    style={{ width: `${Math.min(100, (subtotal / freeShippingThreshold) * 100)}%` }}
                  />
                </div>
              </div>
            ) : (
              <div className="flex items-center gap-2 text-xs font-bold text-emerald-700">
                <Truck className="h-4 w-4" /> Congratulations! You qualified for FREE Doorstep Delivery.
              </div>
            )}
          </div>

          <div className="grid gap-8 lg:grid-cols-3">
            {/* Left: Cart Items List */}
            <div className="lg:col-span-2 space-y-4">
              {items.map((item) => (
                <div
                  key={item.id}
                  className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 rounded-3xl border border-gray-200 bg-white p-5 shadow-sm transition hover:shadow-md"
                >
                  <div className="flex items-center gap-4">
                    <img
                      src={item.image || "https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?auto=format&fit=crop&w=600&q=80"}
                      alt={item.name}
                      className="h-20 w-20 rounded-2xl object-cover border border-gray-100 bg-[#faf9f6]"
                    />
                    <div>
                      <Link
                        href={`/products/${item.id}`}
                        className="font-bold text-[#173f35] hover:text-[#0b4938] transition text-base line-clamp-1"
                      >
                        {item.name}
                      </Link>
                      {item.unit && <p className="text-xs text-gray-500">Unit: {item.unit}</p>}
                      <p className="mt-1 text-sm font-extrabold text-[#0b4938]">
                        ₹{item.price.toLocaleString("en-IN")}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center justify-between sm:justify-end gap-6 border-t sm:border-t-0 pt-3 sm:pt-0 border-gray-100">
                    {/* Qty controls */}
                    <div className="flex items-center rounded-xl border border-gray-300 bg-[#faf9f6]">
                      <button
                        onClick={() => change(item.id, -1)}
                        className="p-2 text-gray-600 hover:text-[#0b4938]"
                        aria-label="Decrease quantity"
                      >
                        <Minus size={14} />
                      </button>
                      <span className="w-8 text-center font-bold text-xs text-[#173f35]">{item.qty}</span>
                      <button
                        onClick={() => change(item.id, 1)}
                        className="p-2 text-gray-600 hover:text-[#0b4938]"
                        aria-label="Increase quantity"
                      >
                        <Plus size={14} />
                      </button>
                    </div>

                    {/* Total item cost */}
                    <div className="text-right">
                      <span className="text-base font-black text-[#173f35]">
                        ₹{(item.price * item.qty).toLocaleString("en-IN")}
                      </span>
                    </div>

                    {/* Remove item button */}
                    <button
                      onClick={() => remove(item.id)}
                      className="text-gray-400 hover:text-red-600 transition"
                      aria-label="Remove item"
                    >
                      <Trash2 size={18} />
                    </button>
                  </div>
                </div>
              ))}

              <div className="pt-4">
                <Link
                  href="/categories"
                  className="inline-flex items-center gap-2 text-sm font-bold text-[#0b4938] hover:underline"
                >
                  <ArrowLeft size={16} /> Continue Shopping
                </Link>
              </div>
            </div>

            {/* Right: Order Summary Sidebar */}
            <div>
              <div className="rounded-3xl border border-gray-200 bg-white p-6 shadow-sm sticky top-24">
                <h2 className="text-xl font-bold text-[#173f35] border-b border-gray-100 pb-4">
                  Order Summary
                </h2>

                {/* Coupon Code Section */}
                <form onSubmit={handleApplyCoupon} className="mt-5 space-y-2">
                  <label className="text-xs font-bold uppercase tracking-wider text-gray-500 block">
                    Have a promo coupon?
                  </label>
                  <div className="flex gap-2">
                    <input
                      type="text"
                      placeholder="e.g. CARE10"
                      value={couponInput}
                      onChange={(e) => setCouponInput(e.target.value)}
                      className="w-full rounded-xl border border-gray-300 px-3 py-2 text-xs uppercase font-bold focus:outline-none focus:border-[#0b4938]"
                    />
                    <button
                      type="submit"
                      className="rounded-xl bg-[#0b4938] px-4 py-2 text-xs font-bold text-white hover:bg-[#125c48]"
                    >
                      Apply
                    </button>
                  </div>
                  {couponMsg && (
                    <p className={`text-xs font-semibold ${couponMsg.success ? "text-emerald-700" : "text-red-600"}`}>
                      {couponMsg.text}
                    </p>
                  )}
                  {appliedCoupon && (
                    <div className="flex items-center justify-between rounded-lg bg-emerald-50 p-2 text-xs text-emerald-800">
                      <span className="flex items-center gap-1 font-bold">
                        <Tag size={14} /> Coupon {appliedCoupon} Applied
                      </span>
                      <button onClick={removeCoupon} className="font-bold underline text-red-600">Remove</button>
                    </div>
                  )}
                </form>

                {/* Cost lines */}
                <div className="mt-6 space-y-3 border-t border-gray-100 pt-4 text-sm">
                  <div className="flex justify-between text-gray-600">
                    <span>Subtotal ({count} items)</span>
                    <span className="font-bold text-gray-800">₹{subtotal.toLocaleString("en-IN")}</span>
                  </div>

                  {discount > 0 && (
                    <div className="flex justify-between text-emerald-700 font-semibold">
                      <span>Discount</span>
                      <span>- ₹{discount.toLocaleString("en-IN")}</span>
                    </div>
                  )}

                  <div className="flex justify-between text-gray-600">
                    <span>Estimated Tax (5% GST)</span>
                    <span className="font-bold text-gray-800">₹{tax.toLocaleString("en-IN")}</span>
                  </div>

                  <div className="flex justify-between text-gray-600">
                    <span>Delivery Fee</span>
                    {shippingFee === 0 ? (
                      <span className="font-bold text-emerald-700">FREE</span>
                    ) : (
                      <span className="font-bold text-gray-800">₹{shippingFee}</span>
                    )}
                  </div>

                  <div className="border-t border-gray-200 pt-4 flex justify-between items-baseline">
                    <span className="text-base font-extrabold text-[#173f35]">Total Amount</span>
                    <span className="text-2xl font-black text-[#0b4938]">₹{total.toLocaleString("en-IN")}</span>
                  </div>
                </div>

                {/* Checkout Trigger Button */}
                <Link
                  href="/checkout"
                  className="mt-6 flex w-full items-center justify-center gap-2 rounded-2xl bg-[#0b4938] py-4 text-center font-extrabold text-white transition hover:bg-[#125c48] shadow-lg"
                >
                  <Zap size={18} className="text-[#f4c542]" /> Proceed to Checkout
                </Link>

                <div className="mt-4 flex items-center justify-center gap-2 text-xs text-gray-500">
                  <ShieldCheck size={16} className="text-emerald-600" />
                  <span>Razorpay 256-bit Encrypted Payment</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </PageShell>
  );
}
