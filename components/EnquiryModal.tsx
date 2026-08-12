"use client";

import { useState } from "react";
import { Product } from "@/data/products";
import {
  CheckCircle2,
  MessageCircle,
  PackageCheck,
  Send,
  User,
  Phone,
  Mail,
  MapPin,
  X,
  AlertCircle
} from "lucide-react";

interface EnquiryModalProps {
  product: Product | null;
  isOpen: boolean;
  onClose: () => void;
}

export default function EnquiryModal({ product, isOpen, onClose }: EnquiryModalProps) {
  if (!isOpen || !product) return null;

  const [formData, setFormData] = useState({
    fullName: "",
    phone: "",
    email: "",
    location: "Bengaluru",
    quantity: 1,
    notes: "",
  });

  const [isSubmitted, setIsSubmitted] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmitEnquiry = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.fullName.trim()) {
      setErrorMsg("Please enter your name.");
      return;
    }
    if (!formData.phone.trim() || formData.phone.length < 10) {
      setErrorMsg("Please enter a valid phone number.");
      return;
    }

    // Save enquiry details to localStorage store for admin/fulfillment
    try {
      const existingEnquiries = JSON.parse(localStorage.getItem("carebridge_enquiries_store") || "[]");
      const newEnquiry = {
        id: `ENQ-${Math.floor(100000 + Math.random() * 900000)}`,
        date: new Date().toISOString(),
        productName: product.name,
        productId: product.id,
        category: product.categoryLabel,
        customerName: formData.fullName,
        phone: formData.phone,
        email: formData.email,
        location: formData.location,
        quantity: formData.quantity,
        notes: formData.notes,
        status: "Pending Enquiry"
      };
      localStorage.setItem("carebridge_enquiries_store", JSON.stringify([newEnquiry, ...existingEnquiries]));
    } catch (e) {
      console.error("Failed to save enquiry", e);
    }

    setIsSubmitted(true);
  };

  const whatsappMessage = encodeURIComponent(
    `Hello CareBridge,

I would like to enquire about:
• Product: ${product.name}
• Category: ${product.categoryLabel}
• Quantity: ${formData.quantity}
• Customer Name: ${formData.fullName || "Customer"}
• Location: ${formData.location || "Bengaluru"}
• Contact: ${formData.phone || "Not specified"}
${formData.notes ? `• Notes: ${formData.notes}` : ""}`
  );

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/65 p-4 animate-in fade-in backdrop-blur-sm">
      <div className="relative w-full max-w-lg overflow-hidden rounded-3xl bg-white p-6 md:p-8 shadow-2xl">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute right-4 top-4 rounded-full p-2 text-gray-400 hover:bg-gray-100 hover:text-gray-700 transition"
          aria-label="Close modal"
        >
          <X size={22} />
        </button>

        {isSubmitted ? (
          <div className="py-8 text-center space-y-4">
            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-emerald-100 text-emerald-700">
              <CheckCircle2 size={40} />
            </div>
            <h2 className="text-2xl font-extrabold text-[#173f35]">Enquiry Submitted!</h2>
            <p className="text-sm text-gray-600 max-w-xs mx-auto">
              Thank you, <span className="font-bold text-[#173f35]">{formData.fullName}</span>. Our CareBridge team will contact you shortly regarding <span className="font-semibold">{product.name}</span>.
            </p>

            <div className="pt-4 flex flex-col gap-3">
              <a
                href={`https://wa.me/918904328298?text=${whatsappMessage}`}
                target="_blank"
                rel="noreferrer"
                className="flex items-center justify-center gap-2 rounded-2xl bg-[#0b4938] py-3.5 px-6 font-extrabold text-white hover:bg-[#125c48] shadow-md text-sm"
              >
                <MessageCircle size={18} className="text-[#f4c542]" /> Follow Up on WhatsApp
              </a>
              <button
                onClick={() => {
                  setIsSubmitted(false);
                  onClose();
                }}
                className="text-xs font-bold text-gray-500 hover:underline"
              >
                Close Window
              </button>
            </div>
          </div>
        ) : (
          <div>
            {/* Header / Product summary */}
            <div className="flex items-center gap-4 border-b border-gray-100 pb-4 mb-6">
              <img
                src={product.image}
                alt={product.name}
                className="h-16 w-16 rounded-2xl object-cover bg-[#faf9f6] border border-gray-100 shrink-0"
              />
              <div className="truncate">
                <span className="rounded-full bg-[#f4ebdd] px-2.5 py-0.5 text-[10px] font-extrabold text-[#173f35]">
                  {product.categoryLabel}
                </span>
                <h3 className="mt-1 text-base font-extrabold text-[#173f35] truncate">{product.name}</h3>
                <p className="text-xs text-emerald-700 font-semibold flex items-center gap-1 mt-0.5">
                  <CheckCircle2 size={13} /> Available for Enquiry & Assisted Sourcing
                </p>
              </div>
            </div>

            {errorMsg && (
              <div className="mb-4 rounded-xl bg-red-50 p-3 text-xs font-semibold text-red-800 border border-red-200 flex items-center gap-2">
                <AlertCircle size={16} className="text-red-600 shrink-0" />
                <span>{errorMsg}</span>
              </div>
            )}

            {/* Enquiry Form */}
            <form onSubmit={handleSubmitEnquiry} className="space-y-4 text-xs">
              <div>
                <label className="font-bold text-[#173f35] block mb-1">Your Full Name *</label>
                <div className="relative">
                  <User size={16} className="absolute left-3 top-2.5 text-gray-400" />
                  <input
                    type="text"
                    name="fullName"
                    required
                    placeholder="e.g. Ananya Sharma"
                    value={formData.fullName}
                    onChange={handleInputChange}
                    className="w-full rounded-xl border border-gray-300 pl-9 pr-3 py-2 text-xs focus:outline-none focus:border-[#0b4938]"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="font-bold text-[#173f35] block mb-1">Phone Number *</label>
                  <div className="relative">
                    <Phone size={16} className="absolute left-3 top-2.5 text-gray-400" />
                    <input
                      type="tel"
                      name="phone"
                      required
                      placeholder="9845012345"
                      value={formData.phone}
                      onChange={handleInputChange}
                      className="w-full rounded-xl border border-gray-300 pl-9 pr-3 py-2 text-xs focus:outline-none focus:border-[#0b4938]"
                    />
                  </div>
                </div>

                <div>
                  <label className="font-bold text-[#173f35] block mb-1">Required Quantity</label>
                  <input
                    type="number"
                    min={1}
                    name="quantity"
                    value={formData.quantity}
                    onChange={(e) => setFormData({ ...formData, quantity: Math.max(1, parseInt(e.target.value) || 1) })}
                    className="w-full rounded-xl border border-gray-300 px-3 py-2 text-xs focus:outline-none focus:border-[#0b4938]"
                  />
                </div>
              </div>

              <div>
                <label className="font-bold text-[#173f35] block mb-1">Delivery City / Area</label>
                <div className="relative">
                  <MapPin size={16} className="absolute left-3 top-2.5 text-gray-400" />
                  <input
                    type="text"
                    name="location"
                    placeholder="e.g. Malleshwaram, Bengaluru"
                    value={formData.location}
                    onChange={handleInputChange}
                    className="w-full rounded-xl border border-gray-300 pl-9 pr-3 py-2 text-xs focus:outline-none focus:border-[#0b4938]"
                  />
                </div>
              </div>

              <div>
                <label className="font-bold text-[#173f35] block mb-1">Notes / Specifications (Optional)</label>
                <textarea
                  name="notes"
                  rows={2}
                  placeholder="e.g. Preferred brand, rental duration, delivery timeline..."
                  value={formData.notes}
                  onChange={handleInputChange}
                  className="w-full rounded-xl border border-gray-300 p-2.5 text-xs focus:outline-none focus:border-[#0b4938]"
                />
              </div>

              {/* Action Buttons */}
              <div className="pt-2 grid grid-cols-2 gap-3">
                <button
                  type="submit"
                  className="flex items-center justify-center gap-1.5 rounded-xl bg-[#0b4938] py-3 text-xs font-bold text-white transition hover:bg-[#125c48] shadow-md"
                >
                  <Send size={14} /> Submit Enquiry
                </button>

                <a
                  href={`https://wa.me/918904328298?text=${whatsappMessage}`}
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center justify-center gap-1.5 rounded-xl border-2 border-emerald-600 bg-emerald-50 py-3 text-xs font-bold text-emerald-800 transition hover:bg-emerald-100"
                >
                  <MessageCircle size={15} className="text-emerald-700" /> WhatsApp
                </a>
              </div>
            </form>
          </div>
        )}
      </div>
    </div>
  );
}
