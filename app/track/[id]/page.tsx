"use client";

import { use } from "react";
import Link from "next/link";
import PageShell from "@/components/PageShell";
import { getOrderById } from "@/lib/db";
import {
  ArrowLeft,
  CheckCircle2,
  Clock,
  MapPin,
  MessageCircle,
  Package,
  PackageCheck,
  Phone,
  ShieldCheck,
  Truck
} from "lucide-react";

export default function OrderTrackingPage({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = use(params);
  const order = getOrderById(resolvedParams.id);

  if (!order) {
    return (
      <PageShell>
        <div className="mx-auto max-w-3xl px-5 py-24 text-center">
          <Truck size={48} className="mx-auto text-gray-400 mb-4" />
          <h1 className="text-2xl font-bold text-[#173f35]">Order Not Found</h1>
          <p className="mt-2 text-gray-600">No order details found for ID: {resolvedParams.id}</p>
          <Link href="/orders" className="mt-6 inline-flex items-center gap-2 rounded-xl bg-[#0b4938] px-6 py-3 font-bold text-white">
            <ArrowLeft size={16} /> View All Orders
          </Link>
        </div>
      </PageShell>
    );
  }

  // Tracking steps definition
  const steps = [
    { title: "Order Placed", desc: "Order details received", key: "Pending" },
    { title: "Processing & Packed", desc: "Warehouse preparing package", key: "Processing" },
    { title: "Shipped", desc: "In transit with courier delivery partner", key: "Shipped" },
    { title: "Delivered", desc: "Handed over at doorstep", key: "Delivered" },
  ];

  const getStepIndex = (status: string) => {
    switch (status) {
      case "Pending":
        return 0;
      case "Processing":
        return 1;
      case "Shipped":
        return 2;
      case "Delivered":
        return 3;
      default:
        return 0;
    }
  };

  const currentStepIdx = getStepIndex(order.status);

  return (
    <PageShell>
      <div className="bg-[#faf9f6] py-12 md:py-16">
        <div className="mx-auto max-w-4xl px-5 md:px-8">
          <Link href="/orders" className="inline-flex items-center gap-1.5 text-xs font-bold text-[#0b4938] hover:underline mb-6">
            <ArrowLeft size={14} /> Back to Order History
          </Link>

          {/* Top Header */}
          <div className="rounded-3xl bg-white p-6 md:p-8 border border-gray-200 shadow-sm mb-8">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-gray-100 pb-6 mb-6">
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-[#b68d40]">Live Order Status</span>
                <h1 className="text-2xl font-extrabold text-[#173f35] mt-0.5">Order {order.id}</h1>
                <p className="text-xs text-gray-500 mt-1">Tracking Number: <span className="font-mono font-bold text-gray-700">{order.trackingNumber}</span></p>
              </div>

              <div className="text-right">
                <span className="inline-flex items-center gap-1.5 rounded-full bg-[#f4ebdd] px-4 py-1.5 text-xs font-extrabold text-[#173f35]">
                  Status: {order.status}
                </span>
                <p className="text-xs text-gray-500 mt-2">Placed on {new Date(order.date).toLocaleDateString("en-IN", { month: "short", day: "numeric" })}</p>
              </div>
            </div>

            {/* Stepper timeline */}
            <div className="py-4">
              <div className="grid grid-cols-4 gap-2 relative">
                {/* Connecting line */}
                <div className="absolute top-5 left-[12%] right-[12%] h-1 bg-gray-200 z-0">
                  <div
                    className="h-full bg-[#0b4938] transition-all duration-500"
                    style={{ width: `${(currentStepIdx / (steps.length - 1)) * 100}%` }}
                  />
                </div>

                {steps.map((step, idx) => {
                  const isCompleted = idx <= currentStepIdx;
                  const isCurrent = idx === currentStepIdx;

                  return (
                    <div key={step.title} className="relative z-10 flex flex-col items-center text-center">
                      <div
                        className={`flex h-10 w-10 items-center justify-center rounded-full border-2 font-bold text-xs transition-all ${
                          isCompleted
                            ? "border-[#0b4938] bg-[#0b4938] text-white shadow-md"
                            : "border-gray-300 bg-white text-gray-400"
                        } ${isCurrent ? "ring-4 ring-emerald-100 scale-110" : ""}`}
                      >
                        {isCompleted ? <CheckCircle2 size={18} /> : idx + 1}
                      </div>

                      <h4 className={`mt-3 text-xs md:text-sm font-bold ${isCompleted ? "text-[#173f35]" : "text-gray-400"}`}>
                        {step.title}
                      </h4>
                      <p className="mt-1 text-[10px] text-gray-500 hidden md:block max-w-[120px]">{step.desc}</p>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Status Updates Log */}
          <div className="grid gap-8 md:grid-cols-3">
            <div className="md:col-span-2 space-y-6">
              <div className="rounded-3xl border border-gray-200 bg-white p-6 shadow-sm">
                <h3 className="text-base font-bold text-[#173f35] mb-4">Shipment Progress Log</h3>

                <div className="space-y-4">
                  {order.statusHistory && order.statusHistory.length > 0 ? (
                    order.statusHistory.map((h, i) => (
                      <div key={i} className="flex items-start gap-3 border-l-2 border-[#0b4938] pl-4 py-1">
                        <div className="shrink-0 pt-0.5">
                          <CheckCircle2 size={16} className="text-[#0b4938]" />
                        </div>
                        <div>
                          <span className="text-xs font-bold text-[#173f35]">{h.status}</span>
                          <span className="ml-2 text-[10px] text-gray-400">
                            {new Date(h.timestamp).toLocaleString("en-IN", { month: "short", day: "numeric", hour: "2-digit", minute: "2-digit" })}
                          </span>
                          <p className="text-xs text-gray-600 mt-1">{h.note}</p>
                        </div>
                      </div>
                    ))
                  ) : (
                    <p className="text-xs text-gray-500">Order recorded and processing.</p>
                  )}
                </div>
              </div>

              {/* Items in order */}
              <div className="rounded-3xl border border-gray-200 bg-white p-6 shadow-sm">
                <h3 className="text-base font-bold text-[#173f35] mb-4">Package Contents</h3>

                <div className="divide-y divide-gray-100">
                  {order.items.map((item) => (
                    <div key={item.id} className="flex items-center justify-between py-2.5 text-xs">
                      <div className="flex items-center gap-3">
                        <img src={item.image} alt={item.name} className="h-10 w-10 rounded-lg object-cover bg-gray-50" />
                        <div>
                          <p className="font-bold text-[#173f35]">{item.name}</p>
                          <p className="text-gray-500">Qty: {item.qty}</p>
                        </div>
                      </div>
                      <span className="font-bold text-gray-800">₹{item.price * item.qty}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Sidebar Support */}
            <div className="space-y-6">
              <div className="rounded-3xl border border-gray-200 bg-white p-6 shadow-sm text-center">
                <MapPin className="mx-auto h-8 w-8 text-[#0b4938] mb-2" />
                <h3 className="text-sm font-bold text-[#173f35]">Delivery Location</h3>
                <p className="text-xs text-gray-600 mt-2 font-medium">{order.customer.fullName}</p>
                <p className="text-xs text-gray-500 mt-1">{order.customer.address}, {order.customer.city}</p>
              </div>

              <div className="rounded-3xl bg-[#f4ebdd] p-6 shadow-sm text-center space-y-3">
                <h3 className="text-sm font-bold text-[#173f35]">Need Delivery Assistance?</h3>
                <p className="text-xs text-gray-600">Contact our CareBridge dispatch desk for real-time delivery updates.</p>
                <a
                  href="tel:+918904328298"
                  className="flex items-center justify-center gap-2 rounded-xl bg-[#0b4938] py-2.5 px-4 text-xs font-bold text-white hover:bg-[#125c48]"
                >
                  <Phone size={14} /> Call Dispatch Desk
                </a>
                <a
                  href="https://wa.me/918904328298"
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center justify-center gap-2 rounded-xl border border-[#0b4938] py-2.5 px-4 text-xs font-bold text-[#0b4938] hover:bg-white"
                >
                  <MessageCircle size={14} /> WhatsApp Support
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </PageShell>
  );
}
