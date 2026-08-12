"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import PageShell from "@/components/PageShell";
import { getLocalOrders, Order } from "@/lib/db";
import {
  ArrowRight,
  Clock,
  PackageCheck,
  Search,
  ShoppingBag,
  Truck,
  CheckCircle2,
  AlertCircle
} from "lucide-react";

export default function CustomerOrdersPage() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    setOrders(getLocalOrders());
    setIsLoaded(true);
  }, []);

  const filteredOrders = orders.filter(
    (o) =>
      o.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      o.customer.fullName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      o.items.some((i) => i.name.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  const getStatusBadge = (status: Order["status"]) => {
    switch (status) {
      case "Delivered":
        return "bg-emerald-100 text-emerald-800 border-emerald-300";
      case "Shipped":
        return "bg-blue-100 text-blue-800 border-blue-300";
      case "Processing":
        return "bg-amber-100 text-amber-800 border-amber-300";
      case "Cancelled":
        return "bg-red-100 text-red-800 border-red-300";
      default:
        return "bg-gray-100 text-gray-800 border-gray-300";
    }
  };

  return (
    <PageShell>
      <div className="bg-[#faf9f6] py-12 md:py-16">
        <div className="mx-auto max-w-6xl px-5 md:px-8">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
            <div>
              <h1 className="text-3xl font-extrabold text-[#173f35]">Order History & Tracking</h1>
              <p className="mt-1 text-sm text-gray-600">
                Track your ongoing family orders and view past receipts.
              </p>
            </div>

            {/* Search input */}
            <div className="relative max-w-sm">
              <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
              <input
                type="text"
                placeholder="Search by Order ID (e.g. CB-908231)..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full rounded-xl border border-gray-300 pl-9 pr-4 py-2 text-xs focus:outline-none focus:border-[#0b4938]"
              />
            </div>
          </div>

          {!isLoaded ? (
            <div className="py-16 text-center text-gray-500">Loading orders...</div>
          ) : filteredOrders.length === 0 ? (
            <div className="rounded-3xl border border-gray-200 bg-white p-12 text-center">
              <Truck size={48} className="mx-auto text-gray-300 mb-4" />
              <h3 className="text-xl font-bold text-[#173f35]">No orders found</h3>
              <p className="mt-2 text-sm text-gray-500">
                {searchQuery ? `No orders matched "${searchQuery}".` : "You haven't placed any orders yet."}
              </p>
              <Link
                href="/categories"
                className="mt-6 inline-flex items-center gap-2 rounded-xl bg-[#0b4938] px-6 py-3 font-bold text-white text-xs"
              >
                Browse Products <ArrowRight size={16} />
              </Link>
            </div>
          ) : (
            <div className="space-y-6">
              {filteredOrders.map((order) => (
                <div
                  key={order.id}
                  className="rounded-3xl border border-gray-200 bg-white p-6 shadow-sm transition hover:shadow-md"
                >
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-gray-100 pb-4 mb-4">
                    <div>
                      <div className="flex items-center gap-3 flex-wrap">
                        <span className="text-lg font-extrabold text-[#173f35]">{order.id}</span>
                        <span
                          className={`rounded-full px-3 py-0.5 text-xs font-bold border ${getStatusBadge(
                            order.status
                          )}`}
                        >
                          {order.status}
                        </span>
                      </div>
                      <p className="mt-1 text-xs text-gray-500">
                        Placed on: {new Date(order.date).toLocaleDateString("en-IN", { month: "short", day: "numeric", year: "numeric" })}
                      </p>
                    </div>

                    <div className="flex items-center gap-3">
                      <span className="text-lg font-black text-[#0b4938]">
                        ₹{order.total.toLocaleString("en-IN")}
                      </span>
                      <Link
                        href={`/track/${order.id}`}
                        className="inline-flex items-center gap-1.5 rounded-xl bg-[#0b4938] px-4 py-2 text-xs font-bold text-white hover:bg-[#125c48]"
                      >
                        <Truck size={14} /> Track Order
                      </Link>
                    </div>
                  </div>

                  {/* Items preview */}
                  <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                    {order.items.map((item) => (
                      <div key={item.id} className="flex items-center gap-3 rounded-xl bg-[#faf9f6] p-2.5 border border-gray-100">
                        <img src={item.image} alt={item.name} className="h-10 w-10 rounded-lg object-cover bg-white shrink-0" />
                        <div className="truncate">
                          <p className="text-xs font-bold text-[#173f35] truncate">{item.name}</p>
                          <p className="text-[11px] text-gray-500">Qty: {item.qty} × ₹{item.price}</p>
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="mt-4 pt-3 border-t border-gray-100 flex items-center justify-between text-xs text-gray-500">
                    <span>Recipient: {order.customer.fullName} ({order.customer.city})</span>
                    <span>Payment: {order.paymentMethod === "razorpay" ? "Razorpay Online" : "COD"} ({order.paymentStatus})</span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </PageShell>
  );
}
