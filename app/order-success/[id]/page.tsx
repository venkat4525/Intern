"use client";

import { use } from "react";
import Link from "next/link";
import PageShell from "@/components/PageShell";
import { getOrderById } from "@/lib/db";
import {
  ArrowRight,
  CheckCircle2,
  Clock3,
  MapPin,
  PackageCheck,
  Phone,
  Printer,
  ShieldCheck,
  Truck
} from "lucide-react";

export default function OrderSuccessPage({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = use(params);
  const order = getOrderById(resolvedParams.id);

  if (!order) {
    return (
      <PageShell>
        <div className="mx-auto max-w-3xl px-5 py-24 text-center">
          <CheckCircle2 size={60} className="mx-auto text-emerald-600 mb-4" />
          <h1 className="text-3xl font-extrabold text-[#173f35]">Order Received!</h1>
          <p className="mt-2 text-gray-600">Your order has been recorded. Reference ID: {resolvedParams.id}</p>
          <div className="mt-8 flex justify-center gap-4">
            <Link href="/orders" className="rounded-xl bg-[#0b4938] px-6 py-3 font-bold text-white">
              View Order History
            </Link>
          </div>
        </div>
      </PageShell>
    );
  }

  return (
    <PageShell>
      <div className="bg-[#faf9f6] py-14 md:py-20">
        <div className="mx-auto max-w-4xl px-5 md:px-8">
          {/* Header Banner */}
          <div className="rounded-3xl bg-gradient-to-br from-[#062d23] via-[#0b4938] to-[#117153] p-8 md:p-12 text-white shadow-xl text-center">
            <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-[#e2c98a] text-[#173f35] mb-6 shadow-lg">
              <CheckCircle2 size={44} />
            </div>

            <span className="rounded-full bg-white/20 px-4 py-1 text-xs font-bold uppercase tracking-wider text-[#e2c98a]">
              Order Placed Successfully
            </span>

            <h1 className="mt-3 text-3xl md:text-4xl font-extrabold">Thank You for Your Order!</h1>
            <p className="mt-3 text-base text-white/80 max-w-lg mx-auto">
              We have received your order and our fulfillment team is preparing it for doorstep delivery.
            </p>

            <div className="mt-6 inline-flex items-center gap-2 rounded-2xl bg-white/10 px-5 py-3 text-sm font-bold border border-white/20">
              <span>Order Number:</span>
              <span className="text-[#f4c542] text-base">{order.id}</span>
            </div>
          </div>

          {/* Actions Bar */}
          <div className="mt-8 flex flex-wrap items-center justify-between gap-4 rounded-2xl bg-white p-4 border border-gray-200 shadow-sm">
            <div className="flex items-center gap-2 text-sm font-bold text-[#173f35]">
              <Truck className="h-5 w-5 text-[#0b4938]" />
              <span>Tracking Number: {order.trackingNumber}</span>
            </div>

            <div className="flex gap-3">
              <Link
                href={`/track/${order.id}`}
                className="inline-flex items-center gap-2 rounded-xl bg-[#0b4938] px-5 py-2.5 text-xs font-bold text-white hover:bg-[#125c48]"
              >
                Track Live Order Status <ArrowRight size={14} />
              </Link>
            </div>
          </div>

          {/* Details Card */}
          <div className="mt-8 grid gap-8 md:grid-cols-2">
            {/* Delivery & Customer Info */}
            <div className="rounded-3xl border border-gray-200 bg-white p-6 shadow-sm space-y-4">
              <h2 className="text-lg font-bold text-[#173f35] border-b border-gray-100 pb-3 flex items-center gap-2">
                <MapPin className="h-5 w-5 text-[#0b4938]" /> Shipping Details
              </h2>

              <div className="text-sm space-y-2 text-gray-700">
                <p className="font-bold text-base text-[#173f35]">{order.customer.fullName}</p>
                <p>{order.customer.address}</p>
                <p>{order.customer.city}, {order.customer.state} - {order.customer.pincode}</p>
                <p className="pt-2 text-xs text-gray-500">Phone: {order.customer.phone}</p>
                <p className="text-xs text-gray-500">Email: {order.customer.email}</p>
              </div>

              <div className="pt-4 border-t border-gray-100 flex items-center gap-2 text-xs font-semibold text-emerald-800">
                <Clock3 size={16} /> Estimated Delivery: 24 - 48 Hours in Bengaluru
              </div>
            </div>

            {/* Payment Summary */}
            <div className="rounded-3xl border border-gray-200 bg-white p-6 shadow-sm space-y-4">
              <h2 className="text-lg font-bold text-[#173f35] border-b border-gray-100 pb-3 flex items-center gap-2">
                <ShieldCheck className="h-5 w-5 text-[#0b4938]" /> Payment Summary
              </h2>

              <div className="text-sm space-y-2.5">
                <div className="flex justify-between">
                  <span className="text-gray-600">Payment Method</span>
                  <span className="font-bold uppercase text-[#173f35]">
                    {order.paymentMethod === "razorpay" ? "Razorpay Online" : "Cash on Delivery"}
                  </span>
                </div>

                <div className="flex justify-between">
                  <span className="text-gray-600">Payment Status</span>
                  <span className="font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded text-xs">
                    {order.paymentStatus}
                  </span>
                </div>

                {order.razorpayPaymentId && (
                  <div className="flex justify-between text-xs text-gray-500">
                    <span>Transaction ID</span>
                    <span className="font-mono">{order.razorpayPaymentId}</span>
                  </div>
                )}

                <div className="border-t border-gray-100 pt-3 space-y-2 text-xs text-gray-600">
                  <div className="flex justify-between">
                    <span>Subtotal</span>
                    <span className="font-bold">₹{order.subtotal.toLocaleString("en-IN")}</span>
                  </div>
                  {order.discount > 0 && (
                    <div className="flex justify-between text-emerald-700 font-bold">
                      <span>Discount</span>
                      <span>- ₹{order.discount.toLocaleString("en-IN")}</span>
                    </div>
                  )}
                  <div className="flex justify-between">
                    <span>GST Tax</span>
                    <span className="font-bold">₹{order.tax.toLocaleString("en-IN")}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Delivery</span>
                    <span className="font-bold text-emerald-700">{order.shipping === 0 ? "FREE" : `₹${order.shipping}`}</span>
                  </div>
                  <div className="border-t border-gray-200 pt-2 flex justify-between items-baseline text-sm">
                    <span className="font-extrabold text-[#173f35]">Grand Total</span>
                    <span className="text-xl font-black text-[#0b4938]">₹{order.total.toLocaleString("en-IN")}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Purchased Items Table */}
          <div className="mt-8 rounded-3xl border border-gray-200 bg-white p-6 shadow-sm">
            <h2 className="text-lg font-bold text-[#173f35] mb-4">Ordered Items ({order.items.length})</h2>

            <div className="divide-y divide-gray-100">
              {order.items.map((item) => (
                <div key={item.id} className="flex items-center justify-between py-3 text-sm">
                  <div className="flex items-center gap-3">
                    <img src={item.image} alt={item.name} className="h-12 w-12 rounded-xl object-cover bg-gray-50" />
                    <div>
                      <p className="font-bold text-[#173f35]">{item.name}</p>
                      <p className="text-xs text-gray-500">Qty: {item.qty} {item.unit ? `(${item.unit})` : ""}</p>
                    </div>
                  </div>
                  <span className="font-extrabold text-[#173f35]">
                    ₹{(item.price * item.qty).toLocaleString("en-IN")}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </PageShell>
  );
}
