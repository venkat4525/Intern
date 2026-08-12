"use client";

import { useState } from "react";
import PageShell from "./PageShell";
import ProductCard from "./ProductCard";
import { getProductsByCategory, products as allProducts } from "@/data/products";
import { Search, ShoppingBag, ArrowRight, Filter } from "lucide-react";

interface SectionPageProps {
  eyebrow: string;
  title: string;
  intro: string;
  categorySlug: string;
  subGroups?: string[];
}

export default function SectionPage({
  eyebrow,
  title,
  intro,
  categorySlug,
  subGroups = []
}: SectionPageProps) {
  const categoryProducts = getProductsByCategory(categorySlug);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedGroup, setSelectedGroup] = useState<string>("All");

  const filteredProducts = categoryProducts.filter((product) => {
    const matchesSearch =
      product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.description.toLowerCase().includes(searchQuery.toLowerCase());
    
    return matchesSearch;
  });

  return (
    <PageShell>
      {/* Category Hero */}
      <section className="bg-gradient-to-br from-[#062d23] via-[#0b4938] to-[#117153] py-16 text-white">
        <div className="mx-auto max-w-7xl px-5 md:px-8">
          <p className="font-bold uppercase tracking-[.2em] text-[#f4c542] text-xs md:text-sm">
            {eyebrow}
          </p>
          <h1 className="mt-3 text-3xl font-extrabold md:text-5xl">{title}</h1>
          <p className="mt-4 max-w-3xl text-base md:text-lg leading-relaxed text-white/80">
            {intro}
          </p>

          {/* Search bar inside hero */}
          <div className="mt-8 max-w-xl relative">
            <div className="flex items-center rounded-2xl bg-white/10 p-2 backdrop-blur border border-white/20">
              <Search className="ml-3 h-5 w-5 text-gray-300 shrink-0" />
              <input
                type="text"
                placeholder={`Search ${title.toLowerCase()}...`}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-transparent px-3 py-2 text-white placeholder-gray-300 focus:outline-none text-sm md:text-base"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery("")}
                  className="mr-2 text-xs text-gray-300 hover:text-white"
                >
                  Clear
                </button>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Subgroups & Products Catalog */}
      <section className="bg-[#faf9f6] py-14">
        <div className="mx-auto max-w-7xl px-5 md:px-8">
          {/* Subgroups pills */}
          {subGroups.length > 0 && (
            <div className="mb-8">
              <h3 className="text-xs font-bold uppercase tracking-wider text-gray-500 mb-3 flex items-center gap-1.5">
                <Filter size={14} /> Popular Categories in {title}
              </h3>
              <div className="flex flex-wrap gap-2">
                <button
                  onClick={() => setSelectedGroup("All")}
                  className={`rounded-full px-4 py-2 text-xs font-bold transition-all ${
                    selectedGroup === "All"
                      ? "bg-[#0b4938] text-white shadow"
                      : "bg-white text-gray-700 hover:bg-gray-100 border border-gray-200"
                  }`}
                >
                  All Items ({categoryProducts.length})
                </button>
                {subGroups.map((group) => (
                  <span
                    key={group}
                    className="rounded-full bg-white px-4 py-2 text-xs font-semibold text-gray-700 border border-gray-200"
                  >
                    {group}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Product Cards Grid */}
          {filteredProducts.length > 0 ? (
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {filteredProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          ) : (
            <div className="rounded-3xl border border-gray-200 bg-white p-12 text-center">
              <ShoppingBag className="mx-auto h-12 w-12 text-gray-300 mb-4" />
              <h3 className="text-xl font-bold text-[#173f35]">No products found matching "{searchQuery}"</h3>
              <p className="mt-2 text-sm text-gray-500">Try searching for other items or browse all categories.</p>
              <button
                onClick={() => setSearchQuery("")}
                className="mt-6 inline-flex items-center gap-2 rounded-xl bg-[#0b4938] px-5 py-2.5 text-xs font-bold text-white"
              >
                Clear Search Filter
              </button>
            </div>
          )}
        </div>
      </section>

      {/* Assisted ordering banner */}
      <section className="bg-[#f4ebdd] py-14">
        <div className="mx-auto max-w-7xl px-5 md:px-8">
          <div className="rounded-3xl bg-white p-8 md:p-10 shadow-sm flex flex-col md:flex-row items-center justify-between gap-6">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-[#b68d40]">Need Wholesale Support?</span>
              <h2 className="text-2xl font-bold text-[#173f35] mt-1">Can't find a specific item?</h2>
              <p className="mt-2 text-sm text-gray-600 max-w-2xl">
                We work directly with verified wholesale dealers. Contact our team for customized bulk orders, recurring household lists, or emergency healthcare items.
              </p>
            </div>
            <a
              href="https://wa.me/918904328298"
              target="_blank"
              rel="noreferrer"
              className="inline-flex shrink-0 items-center gap-2 rounded-xl bg-[#173f35] px-6 py-3.5 text-sm font-bold text-white transition hover:bg-[#245b4c]"
            >
              WhatsApp Assistance <ArrowRight size={16} />
            </a>
          </div>
        </div>
      </section>
    </PageShell>
  );
}
