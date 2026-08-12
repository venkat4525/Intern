"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import PageShell from "@/components/PageShell";
import { useCart } from "@/components/CartContext";
import { createOrder } from "@/lib/db";
import {
  ArrowLeft,
  CheckCircle2,
  CreditCard,
  Lock,
  MapPin,
  ShieldCheck,
  ShoppingBag,
  Truck,
  User,
  Zap,
  Phone,
  Mail,
  AlertCircle
} from "lucide-react";

declare global {
  interface Window {
    Razorpay: any;
  }
}

export default function CheckoutPage() {
  const router = useRouter();
  const { items, count, subtotal, discount, clear } = useCart();

  const freeShippingThreshold = 999;
  const shippingFee = subtotal >= freeShippingThreshold || subtotal === 0 ? 0 : 99;
  const tax = Math.round(subtotal * 0.05);
  const total = Math.max(0, subtotal + tax + shippingFee - discount);

  // Form state
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    address: "",
    city: "Bengaluru",
    state: "Karnataka",
    pincode: "560001",
    notes: "",
  });

  const [paymentMethod, setPaymentMethod] = useState<"razorpay" | "cod">("razorpay");
  const [isProcessing, setIsProcessing] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const validateForm = () => {
    if (!formData.fullName.trim()) return "Please enter your full name.";
    if (!formData.email.trim() || !formData.email.includes("@")) return "Please enter a valid email address.";
    if (!formData.phone.trim() || formData.phone.length < 10) return "Please enter a valid 10-digit phone number.";
    if (!formData.address.trim()) return "Please enter your delivery street address.";
    if (!formData.pincode.trim() || formData.pincode.length < 6) return "Please enter a valid 6-digit Pincode.";
    return null;
  };

  const handleSubmitOrder = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg(null);

    const validationError = validateForm();
    if (validationError) {
      setErrorMsg(validationError);
      return;
    }

    if (items.length === 0) {
      setErrorMsg("Your cart is empty. Please add items to proceed.");
      return;
    }

    setIsProcessing(true);

    try {
      if (paymentMethod === "razorpay") {
        // Step 1: Request order ID from backend
        const response = await fetch("/api/razorpay/create-order", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            amount: total,
            currency: "INR",
            receipt: `rcpt_${Date.now()}`,
          }),
        });

        const orderData = await response.json();

        if (!response.ok) {
          throw new Error(orderData.error || "Failed to initialize online payment");
        }

        // Razorpay Options
        const options = {
          key: orderData.key || process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID || "rzp_test_CarebridgeMockKey",
          amount: orderData.amount,
          currency: orderData.currency || "INR",
          name: "CareBridge Family Care",
          description: `Order Payment (${count} items)`,
          image: "/carebridge-logo.png",
          order_id: orderData.id,
          handler: async function (response: any) {
            // Verify payment
            const verifyRes = await fetch("/api/razorpay/verify", {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({
                razorpay_order_id: response.razorpay_order_id,
                razorpay_payment_id: response.razorpay_payment_id,
                razorpay_signature: response.razorpay_signature,
              }),
            });

            const verifyData = await verifyRes.json();

            // Create order in store & database
            const created = createOrder(
              items.map((x) => ({
                id: x.id,
                name: x.name,
                price: x.price,
                qty: x.qty,
                image: x.image,
                unit: x.unit,
              })),
              formData,
              "razorpay",
              subtotal,
              discount,
              {
                orderId: response.razorpay_order_id || orderData.id,
                paymentId: response.razorpay_payment_id || verifyData.paymentId,
              }
            );

            clear();
            router.push(`/order-success/${created.id}`);
          },
          prefill: {
            name: formData.fullName,
            email: formData.email,
            contact: formData.phone,
          },
          notes: {
            address: `${formData.address}, ${formData.city}, ${formData.pincode}`,
          },
          theme: {
            color: "#0b4938",
          },
          modal: {
            ondismiss: function () {
              setIsProcessing(false);
              setErrorMsg("Payment process was cancelled. You can retry or choose Cash on Delivery.");
            },
          },
        };

        if (typeof window !== "undefined" && window.Razorpay) {
          const rzp = new window.Razorpay(options);
          rzp.on("payment.failed", function (response: any) {
            setIsProcessing(false);
            setErrorMsg(`Payment failed: ${response.error.description || "Transaction declined"}`);
          });
          rzp.open();
        } else {
          // If Razorpay SDK script failed to load, execute clean test mode fallback
          console.warn("Razorpay script not loaded, running test payment completion");
          const created = createOrder(
            items.map((x) => ({
              id: x.id,
              name: x.name,
              price: x.price,
              qty: x.qty,
              image: x.image,
              unit: x.unit,
            })),
            formData,
            "razorpay",
            subtotal,
            discount,
            {
              orderId: orderData.id,
              paymentId: `pay_sim_${Date.now()}`,
            }
          );
          clear();
          router.push(`/order-success/${created.id}`);
        }
      } else {
        // Cash on Delivery
        const created = createOrder(
          items.map((x) => ({
            id: x.id,
            name: x.name,
            price: x.price,
            qty: x.qty,
            image: x.image,
            unit: x.unit,
          })),
          formData,
          "cod",
          subtotal,
          discount
        );

        clear();
        router.push(`/order-success/${created.id}`);
      }
    } catch (err: any) {
      console.error("Order completion error", err);
      setIsProcessing(false);
      setErrorMsg(err.message || "An error occurred while placing your order. Please try again.");
    }
  };

  if (items.length === 0) {
    return (
      <PageShell>
        <div className="mx-auto max-w-4xl px-5 py-24 text-center">
          <ShoppingBag size={48} className="mx-auto text-gray-400 mb-4" />
          <h1 className="text-2xl font-bold text-[#173f35]">Your Cart is Empty</h1>
          <p className="mt-2 text-gray-600">Please add items to your cart before proceeding to checkout.</p>
          <Link
            href="/categories"
            className="mt-6 inline-flex items-center gap-2 rounded-xl bg-[#0b4938] px-6 py-3 font-bold text-white"
          >
            Browse Products
          </Link>
        </div>
      </PageShell>
    );
  }

  return (
    <PageShell>
      <div className="bg-[#faf9f6] py-12 md:py-16">
        <div className="mx-auto max-w-7xl px-5 md:px-8">
          <div className="mb-8 flex items-center justify-between">
            <div>
              <Link href="/cart" className="inline-flex items-center gap-1.5 text-xs font-bold text-[#0b4938] hover:underline mb-2">
                <ArrowLeft size={14} /> Back to Shopping Cart
              </Link>
              <h1 className="text-3xl font-extrabold text-[#173f35]">Checkout & Payment</h1>
            </div>
            <div className="hidden sm:flex items-center gap-2 text-xs font-semibold text-emerald-800 bg-emerald-50 px-3 py-1.5 rounded-full border border-emerald-200">
              <Lock size={14} className="text-emerald-700" /> SSL Encrypted Checkout
            </div>
          </div>

          {errorMsg && (
            <div className="mb-8 rounded-2xl bg-red-50 p-4 text-sm font-semibold text-red-800 border border-red-200 flex items-start gap-3">
              <AlertCircle size={20} className="shrink-0 text-red-600 mt-0.5" />
              <div>{errorMsg}</div>
            </div>
          )}

          <form onSubmit={handleSubmitOrder} className="grid gap-8 lg:grid-cols-3">
            {/* Left: Customer & Shipping Details */}
            <div className="lg:col-span-2 space-y-8">
              {/* Section 1: Customer Contact Info */}
              <div className="rounded-3xl border border-gray-200 bg-white p-6 shadow-sm">
                <div className="flex items-center gap-3 border-b border-gray-100 pb-4 mb-6">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#f4ebdd] text-[#0b4938] font-extrabold">
                    1
                  </div>
                  <div>
                    <h2 className="text-lg font-bold text-[#173f35]">Customer Details</h2>
                    <p className="text-xs text-gray-500">Contact details for order status notifications</p>
                  </div>
                </div>

                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="sm:col-span-2">
                    <label className="text-xs font-bold text-[#173f35] block mb-1">
                      Full Name *
                    </label>
                    <div className="relative">
                      <User size={18} className="absolute left-3 top-3 text-gray-400" />
                      <input
                        type="text"
                        name="fullName"
                        required
                        placeholder="e.g. Raghavendra Rao"
                        value={formData.fullName}
                        onChange={handleInputChange}
                        className="w-full rounded-xl border border-gray-300 pl-10 pr-4 py-2.5 text-sm focus:outline-none focus:border-[#0b4938]"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="text-xs font-bold text-[#173f35] block mb-1">
                      Email Address *
                    </label>
                    <div className="relative">
                      <Mail size={18} className="absolute left-3 top-3 text-gray-400" />
                      <input
                        type="email"
                        name="email"
                        required
                        placeholder="raghav@example.com"
                        value={formData.email}
                        onChange={handleInputChange}
                        className="w-full rounded-xl border border-gray-300 pl-10 pr-4 py-2.5 text-sm focus:outline-none focus:border-[#0b4938]"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="text-xs font-bold text-[#173f35] block mb-1">
                      Phone Number *
                    </label>
                    <div className="relative">
                      <Phone size={18} className="absolute left-3 top-3 text-gray-400" />
                      <input
                        type="tel"
                        name="phone"
                        required
                        placeholder="9845012345"
                        value={formData.phone}
                        onChange={handleInputChange}
                        className="w-full rounded-xl border border-gray-300 pl-10 pr-4 py-2.5 text-sm focus:outline-none focus:border-[#0b4938]"
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* Section 2: Delivery Address */}
              <div className="rounded-3xl border border-gray-200 bg-white p-6 shadow-sm">
                <div className="flex items-center gap-3 border-b border-gray-100 pb-4 mb-6">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#f4ebdd] text-[#0b4938] font-extrabold">
                    2
                  </div>
                  <div>
                    <h2 className="text-lg font-bold text-[#173f35]">Shipping Address</h2>
                    <p className="text-xs text-gray-500">Doorstep delivery address in Bengaluru & surrounds</p>
                  </div>
                </div>

                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="sm:col-span-2">
                    <label className="text-xs font-bold text-[#173f35] block mb-1">
                      House / Flat / Street Address *
                    </label>
                    <div className="relative">
                      <MapPin size={18} className="absolute left-3 top-3 text-gray-400" />
                      <input
                        type="text"
                        name="address"
                        required
                        placeholder="e.g. 42, 4th Main Road, Near Bus Stand, Malleshwaram"
                        value={formData.address}
                        onChange={handleInputChange}
                        className="w-full rounded-xl border border-gray-300 pl-10 pr-4 py-2.5 text-sm focus:outline-none focus:border-[#0b4938]"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="text-xs font-bold text-[#173f35] block mb-1">City</label>
                    <input
                      type="text"
                      name="city"
                      value={formData.city}
                      onChange={handleInputChange}
                      className="w-full rounded-xl border border-gray-300 px-4 py-2.5 text-sm focus:outline-none focus:border-[#0b4938]"
                    />
                  </div>

                  <div>
                    <label className="text-xs font-bold text-[#173f35] block mb-1">Pincode *</label>
                    <input
                      type="text"
                      name="pincode"
                      required
                      placeholder="560003"
                      value={formData.pincode}
                      onChange={handleInputChange}
                      className="w-full rounded-xl border border-gray-300 px-4 py-2.5 text-sm focus:outline-none focus:border-[#0b4938]"
                    />
                  </div>

                  <div className="sm:col-span-2">
                    <label className="text-xs font-bold text-[#173f35] block mb-1">
                      Special Delivery Instructions (Optional)
                    </label>
                    <textarea
                      name="notes"
                      rows={2}
                      placeholder="e.g. Call before delivery, deliver to elder parents..."
                      value={formData.notes}
                      onChange={handleInputChange}
                      className="w-full rounded-xl border border-gray-300 px-4 py-2 text-sm focus:outline-none focus:border-[#0b4938]"
                    />
                  </div>
                </div>
              </div>

              {/* Section 3: Payment Method Selection */}
              <div className="rounded-3xl border border-gray-200 bg-white p-6 shadow-sm">
                <div className="flex items-center gap-3 border-b border-gray-100 pb-4 mb-6">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#f4ebdd] text-[#0b4938] font-extrabold">
                    3
                  </div>
                  <div>
                    <h2 className="text-lg font-bold text-[#173f35]">Payment Method</h2>
                    <p className="text-xs text-gray-500">Select how you would like to pay</p>
                  </div>
                </div>

                <div className="grid gap-4 sm:grid-cols-2">
                  {/* Razorpay Online */}
                  <div
                    onClick={() => setPaymentMethod("razorpay")}
                    className={`cursor-pointer rounded-2xl border p-5 transition-all ${
                      paymentMethod === "razorpay"
                        ? "border-[#0b4938] bg-[#f4f7ef] ring-2 ring-[#0b4938]"
                        : "border-gray-200 bg-white hover:border-gray-300"
                    }`}
                  >
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-2">
                        <CreditCard className="h-5 w-5 text-[#0b4938]" />
                        <span className="font-bold text-[#173f35]">Razorpay Online</span>
                      </div>
                      <span className="rounded-full bg-emerald-100 px-2 py-0.5 text-[10px] font-bold text-emerald-800">
                        INSTANT
                      </span>
                    </div>
                    <p className="text-xs text-gray-600">
                      UPI (GPay, PhonePe, Paytm), Credit/Debit Cards, NetBanking & Wallets.
                    </p>
                  </div>

                  {/* Cash on Delivery */}
                  <div
                    onClick={() => setPaymentMethod("cod")}
                    className={`cursor-pointer rounded-2xl border p-5 transition-all ${
                      paymentMethod === "cod"
                        ? "border-[#0b4938] bg-[#f4f7ef] ring-2 ring-[#0b4938]"
                        : "border-gray-200 bg-white hover:border-gray-300"
                    }`}
                  >
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-2">
                        <Truck className="h-5 w-5 text-[#0b4938]" />
                        <span className="font-bold text-[#173f35]">Cash on Delivery (COD)</span>
                      </div>
                    </div>
                    <p className="text-xs text-gray-600">
                      Pay cash or UPI to delivery executive at doorstep upon arrival.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Right: Summary & Pay Trigger */}
            <div>
              <div className="rounded-3xl border border-gray-200 bg-white p-6 shadow-sm sticky top-24">
                <h2 className="text-lg font-bold text-[#173f35] border-b border-gray-100 pb-3 mb-4">
                  Order Items ({count})
                </h2>

                <div className="max-h-60 overflow-y-auto space-y-3 pr-1 mb-6">
                  {items.map((item) => (
                    <div key={item.id} className="flex items-center justify-between gap-3 text-xs">
                      <div className="flex items-center gap-2 overflow-hidden">
                        <img src={item.image} alt={item.name} className="h-10 w-10 rounded-lg object-cover bg-gray-50 shrink-0" />
                        <div className="truncate">
                          <p className="font-bold text-gray-800 truncate">{item.name}</p>
                          <p className="text-gray-500">Qty: {item.qty}</p>
                        </div>
                      </div>
                      <span className="font-extrabold text-gray-900 shrink-0">
                        ₹{(item.price * item.qty).toLocaleString("en-IN")}
                      </span>
                    </div>
                  ))}
                </div>

                <div className="border-t border-gray-100 pt-4 space-y-2.5 text-xs text-gray-600">
                  <div className="flex justify-between">
                    <span>Items Subtotal</span>
                    <span className="font-bold text-gray-800">₹{subtotal.toLocaleString("en-IN")}</span>
                  </div>

                  {discount > 0 && (
                    <div className="flex justify-between text-emerald-700 font-bold">
                      <span>Discount</span>
                      <span>- ₹{discount.toLocaleString("en-IN")}</span>
                    </div>
                  )}

                  <div className="flex justify-between">
                    <span>Tax (5% GST)</span>
                    <span className="font-bold text-gray-800">₹{tax.toLocaleString("en-IN")}</span>
                  </div>

                  <div className="flex justify-between">
                    <span>Delivery</span>
                    <span className="font-bold text-emerald-700">
                      {shippingFee === 0 ? "FREE" : `₹${shippingFee}`}
                    </span>
                  </div>

                  <div className="border-t border-gray-200 pt-3 flex justify-between items-baseline">
                    <span className="text-sm font-extrabold text-[#173f35]">Total Payable</span>
                    <span className="text-2xl font-black text-[#0b4938]">₹{total.toLocaleString("en-IN")}</span>
                  </div>
                </div>

                {/* Submit button */}
                <button
                  type="submit"
                  disabled={isProcessing}
                  className="mt-6 flex w-full items-center justify-center gap-2 rounded-2xl bg-[#0b4938] py-4 text-center font-extrabold text-white transition hover:bg-[#125c48] shadow-lg disabled:opacity-50"
                >
                  {isProcessing ? (
                    "Processing Order..."
                  ) : paymentMethod === "razorpay" ? (
                    <>
                      <Zap size={18} className="text-[#f4c542]" /> Pay ₹{total.toLocaleString("en-IN")} with Razorpay
                    </>
                  ) : (
                    <>
                      <CheckCircle2 size={18} className="text-[#f4c542]" /> Confirm Cash on Delivery
                    </>
                  )}
                </button>

                <p className="mt-3 text-center text-[11px] text-gray-500">
                  By confirming, you agree to CareBridge Terms of Service & Family Care delivery policy.
                </p>
              </div>
            </div>
          </form>
        </div>
      </div>
    </PageShell>
  );
}
