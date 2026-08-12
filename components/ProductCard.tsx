"use client";

import Link from "next/link";
import { useState } from "react";
import { Product } from "@/data/products";
import EnquiryModal from "./EnquiryModal";
import { MessageSquare, Star, CheckCircle, PackageCheck, ArrowRight } from "lucide-react";

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  const [imgSrc, setImgSrc] = useState(product.image);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleEnquireClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsModalOpen(true);
  };

  return (
    <>
      <div className="group relative flex h-full flex-col overflow-hidden rounded-3xl border border-[#e8dfc5] bg-white shadow-sm transition-all duration-300 hover:-translate-y-1.5 hover:shadow-xl">
        {/* Clickable Card Link wrapper */}
        <Link href={`/products/${product.id}`} className="flex flex-1 flex-col p-5">
          {/* Category Badge (NO PRICING OR DISCOUNT TAGS) */}
          <div className="flex items-center justify-between gap-2 mb-3">
            <span className="rounded-full bg-[#f4ebdd] px-3 py-1 text-xs font-semibold text-[#173f35]">
              {product.categoryLabel}
            </span>
            <span className="rounded-full bg-emerald-50 px-2.5 py-0.5 text-xs font-bold text-emerald-800 border border-emerald-200">
              Enquiry Available
            </span>
          </div>

          {/* Product Image */}
          <div className="relative mb-4 flex h-48 w-full items-center justify-center overflow-hidden rounded-2xl bg-[#faf9f6]">
            <img
              src={imgSrc}
              alt={product.name}
              onError={() => {
                setImgSrc("https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?auto=format&fit=crop&w=600&q=80");
              }}
              className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
              loading="lazy"
            />
            {product.enquiryType === "rental" && (
              <span className="absolute bottom-2 left-2 rounded-lg bg-[#0b4938] px-2.5 py-1 text-xs font-bold text-[#f4c542]">
                Rental Available
              </span>
            )}
          </div>

          {/* Rating & Availability */}
          <div className="flex items-center justify-between text-xs text-gray-500 mb-2">
            <div className="flex items-center gap-1">
              <Star className="h-4 w-4 fill-amber-400 text-amber-400" />
              <span className="font-bold text-gray-800">{product.rating}</span>
              <span>({product.reviewsCount})</span>
            </div>
            <span className="flex items-center gap-1 font-medium text-emerald-700">
              <CheckCircle className="h-3.5 w-3.5" /> In Stock
            </span>
          </div>

          {/* Title */}
          <h3 className="line-clamp-2 text-lg font-bold text-[#173f35] group-hover:text-[#0b4938] transition-colors">
            {product.name}
          </h3>

          {/* Short description */}
          <p className="mt-2 line-clamp-2 text-xs leading-relaxed text-gray-600">
            {product.description}
          </p>

          {/* Action Area with ENQUIRE NOW Button (NO PRICES DISPLAYED) */}
          <div className="mt-auto pt-4 border-t border-gray-100 flex items-center justify-between gap-3">
            <span className="text-xs font-bold text-gray-500 group-hover:text-[#0b4938] transition-colors flex items-center gap-1">
              View Details <ArrowRight size={13} />
            </span>

            <button
              onClick={handleEnquireClick}
              className="inline-flex items-center gap-1.5 rounded-xl bg-[#0b4938] px-4 py-2.5 text-xs font-extrabold text-white transition-all duration-200 hover:bg-[#125c48] hover:shadow-md"
            >
              <MessageSquare className="h-4 w-4 text-[#f4c542]" /> Enquire Now
            </button>
          </div>
        </Link>
      </div>

      {/* Enquiry Modal */}
      <EnquiryModal
        product={product}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </>
  );
}
