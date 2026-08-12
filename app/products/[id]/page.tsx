"use client";

import { use, useState } from "react";
import Link from "next/link";
import PageShell from "@/components/PageShell";
import ProductCard from "@/components/ProductCard";
import EnquiryModal from "@/components/EnquiryModal";
import { getProductById, getProductsByCategory, Product } from "@/data/products";
import {
  ArrowLeft,
  CheckCircle2,
  HeartHandshake,
  MessageCircle,
  MessageSquare,
  Minus,
  PackageCheck,
  Plus,
  ShieldCheck,
  Star,
  Truck
} from "lucide-react";

export default function ProductDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = use(params);
  const product = getProductById(resolvedParams.id);

  if (!product) {
    return (
      <PageShell>
        <div className="mx-auto max-w-4xl px-5 py-24 text-center">
          <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-red-100 text-red-600 mb-6">
            <PackageCheck size={40} />
          </div>
          <h1 className="text-3xl font-bold text-[#173f35]">Product Not Found</h1>
          <p className="mt-3 text-gray-600">The product you are looking for might have been removed or is temporarily unavailable.</p>
          <Link
            href="/categories"
            className="mt-8 inline-flex items-center gap-2 rounded-xl bg-[#0b4938] px-6 py-3 font-bold text-white transition hover:bg-[#125c48]"
          >
            <ArrowLeft size={18} /> Explore Product Catalog
          </Link>
        </div>
      </PageShell>
    );
  }

  return <ProductView product={product} />;
}

function ProductView({ product }: { product: Product }) {
  const [qty, setQty] = useState(1);
  const [imgSrc, setImgSrc] = useState(product.image);
  const [isEnquiryModalOpen, setIsEnquiryModalOpen] = useState(false);

  const whatsappMessage = encodeURIComponent(
    `Hello CareBridge, I would like to enquire about: ${product.name} (Category: ${product.categoryLabel}, Required Qty: ${qty}). Please share details.`
  );

  const relatedProducts = getProductsByCategory(product.category)
    .filter((p) => p.id !== product.id)
    .slice(0, 3);

  return (
    <PageShell>
      {/* Breadcrumb */}
      <div className="bg-[#faf9f6] border-b border-gray-200 py-3 text-sm">
        <div className="mx-auto max-w-7xl px-5 md:px-8 flex items-center gap-2 text-gray-600 flex-wrap">
          <Link href="/" className="hover:text-[#0b4938]">Home</Link>
          <span>/</span>
          <Link href="/categories" className="hover:text-[#0b4938]">Categories</Link>
          <span>/</span>
          <span className="text-[#0b4938] font-semibold">{product.categoryLabel}</span>
          <span>/</span>
          <span className="text-gray-400 truncate max-w-xs">{product.name}</span>
        </div>
      </div>

      <section className="bg-white py-12 md:py-16">
        <div className="mx-auto max-w-7xl px-5 md:px-8">
          <div className="grid gap-12 lg:grid-cols-2 lg:items-start">
            {/* Left: Product Image & Trust Badges */}
            <div className="space-y-4">
              <div className="relative overflow-hidden rounded-3xl border border-gray-200 bg-[#faf9f6] p-4 shadow-sm">
                <span className="absolute top-4 left-4 z-10 rounded-full bg-[#0b4938] px-3.5 py-1 text-xs font-bold text-[#f4c542]">
                  {product.categoryLabel}
                </span>

                <img
                  src={imgSrc}
                  alt={product.name}
                  onError={() => {
                    setImgSrc("https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?auto=format&fit=crop&w=600&q=80");
                  }}
                  className="h-96 w-full object-cover rounded-2xl md:h-[450px]"
                />
              </div>

              {/* Trust Badges under image */}
              <div className="grid grid-cols-3 gap-3">
                <div className="flex flex-col items-center rounded-2xl bg-[#faf9f6] p-3 text-center border border-gray-100">
                  <ShieldCheck className="h-6 w-6 text-[#0b4938] mb-1" />
                  <span className="text-xs font-bold text-[#173f35]">Verified Wholesale</span>
                  <span className="text-[10px] text-gray-500">Trusted Sourcing</span>
                </div>
                <div className="flex flex-col items-center rounded-2xl bg-[#faf9f6] p-3 text-center border border-gray-100">
                  <Truck className="h-6 w-6 text-[#0b4938] mb-1" />
                  <span className="text-xs font-bold text-[#173f35]">Doorstep Delivery</span>
                  <span className="text-[10px] text-gray-500">Bengaluru & Surrounds</span>
                </div>
                <div className="flex flex-col items-center rounded-2xl bg-[#faf9f6] p-3 text-center border border-gray-100">
                  <HeartHandshake className="h-6 w-6 text-[#0b4938] mb-1" />
                  <span className="text-xs font-bold text-[#173f35]">Assisted Support</span>
                  <span className="text-[10px] text-gray-500">Personal Assistance</span>
                </div>
              </div>
            </div>

            {/* Right: Product Details & Enquiry Actions (NO PRICE DISPLAYED) */}
            <div className="flex flex-col justify-between">
              <div>
                <h1 className="text-2xl md:text-4xl font-extrabold text-[#173f35] leading-tight">
                  {product.name}
                </h1>

                {/* Rating & Availability */}
                <div className="mt-4 flex items-center gap-4 flex-wrap text-sm">
                  <div className="flex items-center gap-1.5 rounded-lg bg-amber-50 px-2.5 py-1 text-amber-800 border border-amber-200">
                    <Star className="h-4 w-4 fill-amber-500 text-amber-500" />
                    <span className="font-extrabold">{product.rating}</span>
                    <span className="text-gray-500">({product.reviewsCount} customer reviews)</span>
                  </div>

                  <span className="inline-flex items-center gap-1.5 rounded-lg bg-emerald-50 px-3 py-1 font-semibold text-emerald-800 border border-emerald-200">
                    <CheckCircle2 size={16} /> Available on Enquiry
                  </span>
                </div>

                {/* Enquiry Highlight Box (NO PRICING) */}
                <div className="mt-6 rounded-2xl bg-[#faf9f6] p-5 border border-[#e8dfc5]">
                  <div className="flex items-center gap-3">
                    <MessageSquare className="h-6 w-6 text-[#0b4938] shrink-0" />
                    <div>
                      <h3 className="text-base font-bold text-[#173f35]">Wholesale & Custom Order Enquiry</h3>
                      <p className="text-xs text-gray-600 mt-0.5">
                        Submit an enquiry to receive availability details, custom wholesale quotes, and delivery timelines.
                      </p>
                    </div>
                  </div>
                  {product.unit && (
                    <p className="mt-3 text-xs font-semibold text-gray-600 pt-2 border-t border-gray-200/60">
                      Standard Unit: <span className="text-[#0b4938]">{product.unit}</span>
                    </p>
                  )}
                </div>

                {/* Description */}
                <div className="mt-6">
                  <h3 className="text-base font-bold text-[#173f35]">Product Overview</h3>
                  <p className="mt-2 leading-relaxed text-gray-600 text-sm md:text-base">
                    {product.description}
                  </p>
                </div>

                {/* Key Specifications */}
                {product.specifications && product.specifications.length > 0 && (
                  <div className="mt-6">
                    <h3 className="text-base font-bold text-[#173f35] mb-3">Key Highlights & Features</h3>
                    <div className="grid gap-2 sm:grid-cols-2">
                      {product.specifications.map((spec) => (
                        <div key={spec} className="flex items-start gap-2.5 text-sm text-gray-700 bg-white p-2.5 rounded-xl border border-gray-100">
                          <CheckCircle2 className="h-4 w-4 shrink-0 text-[#b68d40] mt-0.5" />
                          <span>{spec}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* Quantity Selector & ENQUIRE NOW Action Buttons */}
              <div className="mt-8 pt-6 border-t border-gray-200 space-y-4">
                <div className="flex items-center gap-4">
                  <span className="text-sm font-bold text-[#173f35]">Required Quantity:</span>
                  <div className="flex items-center rounded-xl border border-gray-300 bg-[#faf9f6]">
                    <button
                      onClick={() => setQty(Math.max(1, qty - 1))}
                      className="p-2.5 text-gray-600 hover:text-[#0b4938] transition"
                      aria-label="Decrease quantity"
                    >
                      <Minus size={16} />
                    </button>
                    <span className="w-12 text-center font-bold text-[#173f35] text-base">{qty}</span>
                    <button
                      onClick={() => setQty(qty + 1)}
                      className="p-2.5 text-gray-600 hover:text-[#0b4938] transition"
                      aria-label="Increase quantity"
                    >
                      <Plus size={16} />
                    </button>
                  </div>
                </div>

                {/* Primary CTA Buttons */}
                <div className="grid gap-3 sm:grid-cols-2">
                  <button
                    onClick={() => setIsEnquiryModalOpen(true)}
                    className="flex items-center justify-center gap-2 rounded-xl bg-[#0b4938] py-4 px-6 font-extrabold text-white transition hover:bg-[#125c48] shadow-lg text-sm"
                  >
                    <MessageSquare size={18} className="text-[#f4c542]" /> Enquire Now
                  </button>

                  <a
                    href={`https://wa.me/918904328298?text=${whatsappMessage}`}
                    target="_blank"
                    rel="noreferrer"
                    className="flex items-center justify-center gap-2 rounded-xl bg-[#25D366] py-4 px-6 font-extrabold text-white transition hover:bg-emerald-600 shadow-lg text-sm"
                  >
                    <MessageCircle size={18} /> Enquire on WhatsApp
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Related Products */}
          {relatedProducts.length > 0 && (
            <div className="mt-20 border-t border-gray-200 pt-14">
              <div className="flex items-center justify-between mb-8">
                <div>
                  <span className="text-xs font-bold uppercase tracking-wider text-[#b68d40]">Similar Products</span>
                  <h2 className="text-2xl font-bold text-[#173f35] mt-1">Related Items in {product.categoryLabel}</h2>
                </div>
                <Link href="/categories" className="text-sm font-bold text-[#0b4938] hover:underline">
                  View All Products &rarr;
                </Link>
              </div>

              <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {relatedProducts.map((rel) => (
                  <ProductCard key={rel.id} product={rel} />
                ))}
              </div>
            </div>
          )}
        </div>
      </section>

      {/* Enquiry Modal */}
      <EnquiryModal
        product={product}
        isOpen={isEnquiryModalOpen}
        onClose={() => setIsEnquiryModalOpen(false)}
      />
    </PageShell>
  );
}
