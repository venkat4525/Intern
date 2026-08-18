"use client";

import Link from "next/link";
import { useState } from "react";
import {
  ArrowRight,
  BadgeIndianRupee,
  CheckCircle2,
  Clock3,
  Gift,
  HeartHandshake,
  HeartPulse,
  Home,
  MessageCircle,
  PackageCheck,
  Phone,
  Pill,
  Search,
  ShieldCheck,
  ShoppingBasket,
  Sparkles,
  Stethoscope,
  Sun,
  Truck,
} from "lucide-react";

import PageShell from "@/components/PageShell";
import ProductCard from "@/components/ProductCard";
import { products, searchProducts } from "@/data/products";

const categories = [
  {
    name: "Medicines & OTC",
    description: "Prescription support, OTC products, daily vitamins and regular medicine needs.",
    href: "/medicines",
    badge: "Verified Quality",
    image: "https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?auto=format&fit=crop&w=600&q=80",
    itemsCount: "300+ Products",
  },
  {
    name: "Medical Equipment",
    description: "BP Monitors, fingertip oximeters, glucometers, wheelchairs and recovery devices.",
    href: "/medical-equipment",
    badge: "Home Devices",
    image: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&w=600&q=80",
    itemsCount: "100+ Devices",
  },
  {
    name: "Daily Pooja Essentials",
    description: "Pure Bhimseni camphor, organic cotton wicks, kumkum, turmeric and agarbatti.",
    href: "/pooja",
    badge: "Pure & Traditional",
    image: "/images/pure-bhimseni-camphor.png",
    itemsCount: "Pooja Samagri",
  },
  {
    name: "Festival Care Boxes",
    description: "Thoughtfully assembled festival and vratha care boxes with 21+ essential items.",
    href: "/care-box",
    badge: "Complete Bundles",
    image: "/images/ganesha-pooja-box.png",
    itemsCount: "Vratha Boxes",
  },
  {
    name: "Health & Wellness",
    description: "Nutrition supplements, joint pain relief oils, personal care and senior wellness.",
    href: "/wellness",
    badge: "Senior Care",
    image: "https://images.unsplash.com/photo-1608571423902-eed4a5ad8108?auto=format&fit=crop&w=600&q=80",
    itemsCount: "Wellness Packs",
  },
  {
    name: "Home Care & Safety",
    description: "Adult diapers, anti-slip bathroom mats, hygiene and daily-living support.",
    href: "/home-care",
    badge: "Safety & Hygiene",
    image: "https://images.unsplash.com/photo-1584515979956-d9f6e5d09982?auto=format&fit=crop&w=600&q=80",
    itemsCount: "Home Aids",
  },
];

const advantages = [
  {
    title: "Competitive Wholesale Sourcing",
    description: "We work directly with verified wholesale dealers and authorized distributors.",
    icon: BadgeIndianRupee,
  },
  {
    title: "Personal Ordering Assistance",
    description: "Call or WhatsApp our team for guidance, repeat monthly lists, or family orders.",
    icon: HeartHandshake,
  },
  {
    title: "Category-Organized Catalog",
    description: "Medicines, medical equipment, pooja items and festival boxes in one place.",
    icon: PackageCheck,
  },
  {
    title: "Doorstep Delivery to Loved Ones",
    description: "Arrange essential products delivered directly to your parents or family in Bengaluru.",
    icon: Truck,
  },
];

export default function HomePage() {
  const [searchQuery, setSearchQuery] = useState("");
  const featuredProducts = products.filter((p) => p.featured).slice(0, 8);
  const searchResults = searchQuery.trim() ? searchProducts(searchQuery) : [];

  return (
    <PageShell>
      {/* 1. Hero Section */}
      <section className="overflow-hidden bg-gradient-to-br from-[#062d23] via-[#0b4938] to-[#117153] text-white">
        <div className="mx-auto grid max-w-7xl items-center gap-10 px-5 py-16 md:px-8 md:py-20 lg:grid-cols-2 lg:py-24">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full bg-[#e2c98a]/20 px-4 py-1.5 text-xs font-bold uppercase tracking-wider text-[#e2c98a] border border-[#e2c98a]/30">
              <Sparkles size={14} /> Category-Based Enquiry Platform
            </div>

            <h1 className="mt-4 max-w-3xl text-3xl font-extrabold leading-tight md:text-5xl lg:text-6xl">
              Everything your family needs, organized by category
            </h1>

            <p className="mt-5 max-w-2xl text-base md:text-lg leading-relaxed text-white/80">
              Browse categories for medicines, medical equipment, daily pooja items, and festival boxes. Submit enquiries directly for wholesale pricing and personal assistance.
            </p>

            {/* Quick Hero Search Input */}
            <div className="mt-8 relative max-w-lg">
              <div className="flex items-center rounded-2xl bg-white p-2 shadow-xl text-gray-800">
                <Search size={22} className="ml-3 shrink-0 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search categories or products..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full bg-transparent px-3 py-2 text-sm md:text-base focus:outline-none text-gray-800 placeholder-gray-400"
                />
                {searchQuery && (
                  <button
                    onClick={() => setSearchQuery("")}
                    className="mr-2 text-xs font-bold text-gray-400 hover:text-gray-600"
                  >
                    Clear
                  </button>
                )}
              </div>

              {/* Search Results Dropdown Preview */}
              {searchQuery.trim() !== "" && (
                <div className="absolute top-full left-0 right-0 z-30 mt-2 max-h-80 overflow-y-auto rounded-2xl bg-white p-3 shadow-2xl border border-gray-200 text-gray-800">
                  {searchResults.length > 0 ? (
                    <div className="space-y-2">
                      <p className="text-xs font-bold uppercase tracking-wider text-gray-400 px-2">
                        Matching Items ({searchResults.length})
                      </p>
                      {searchResults.map((item) => (
                        <Link
                          key={item.id}
                          href={`/products/${item.id}`}
                          className="flex items-center justify-between gap-3 rounded-xl p-2.5 hover:bg-[#faf9f6] transition"
                        >
                          <div className="flex items-center gap-3">
                            <img src={item.image} alt={item.name} className="h-10 w-10 rounded-lg object-cover" />
                            <div>
                              <p className="text-sm font-bold text-[#173f35] line-clamp-1">{item.name}</p>
                              <span className="text-xs text-gray-500">{item.categoryLabel}</span>
                            </div>
                          </div>
                          <span className="text-xs font-bold text-[#0b4938] bg-emerald-50 px-2.5 py-1 rounded-md">
                            Enquire &rarr;
                          </span>
                        </Link>
                      ))}
                    </div>
                  ) : (
                    <p className="p-4 text-center text-sm text-gray-500">No items found matching "{searchQuery}"</p>
                  )}
                </div>
              )}
            </div>

            <div className="mt-8 flex flex-wrap gap-4">
              <a
                href="#categories-section"
                className="inline-flex items-center gap-2 rounded-xl bg-[#e2c98a] px-6 py-3.5 font-extrabold text-[#173f35] transition hover:bg-[#ead7a7] shadow-lg"
              >
                Browse Categories <ArrowRight size={18} />
              </a>

              <a
                href="https://wa.me/918904328298"
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 rounded-xl border border-white/40 px-6 py-3.5 font-bold text-white transition hover:bg-white/10"
              >
                <MessageCircle size={18} /> WhatsApp Assistance
              </a>
            </div>
          </div>

          {/* Right Hero Feature Card */}
          <div className="rounded-3xl border border-white/15 bg-white/10 p-5 shadow-2xl backdrop-blur md:p-7">
            <div className="rounded-2xl bg-white p-6 text-[#173f35]">
              <div className="flex items-center justify-between border-b border-gray-100 pb-4">
                <div>
                  <span className="text-xs font-bold uppercase tracking-wider text-[#b68d40]">Assisted Sourcing Desk</span>
                  <h3 className="text-lg font-bold text-[#173f35]">Need help finding items?</h3>
                </div>
                <HeartHandshake className="h-8 w-8 text-[#0b4938] shrink-0" />
              </div>

              <p className="mt-3 text-sm leading-relaxed text-gray-600">
                Call or WhatsApp our team. Tell us your product requirements or recurring monthly lists, and we will check availability and coordinate doorstep fulfillment.
              </p>

              <div className="mt-5 grid grid-cols-2 gap-3">
                <a
                  href="tel:+918904328298"
                  className="flex items-center justify-center gap-2 rounded-xl bg-[#0b4938] py-3 text-xs font-bold text-white transition hover:bg-[#125c48]"
                >
                  <Phone size={15} /> Call Desk
                </a>
                <a
                  href="https://wa.me/918904328298"
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center justify-center gap-2 rounded-xl border border-[#0b4938] py-3 text-xs font-bold text-[#0b4938] transition hover:bg-[#f4f7ef]"
                >
                  <MessageCircle size={15} /> WhatsApp
                </a>
              </div>

              <div className="mt-4 rounded-xl bg-[#f4ebdd] p-3 text-xs font-semibold text-[#173f35] flex items-center gap-2">
                <Clock3 size={16} className="text-[#b68d40] shrink-0" />
                Support Available: 9 AM to 7 PM (Mon - Sat)
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. CATEGORY-FIRST LAYOUT STRUCTURE WITH REALISTIC PRODUCT IMAGERY */}
      <section id="categories-section" className="bg-white py-16 md:py-24">
        <div className="mx-auto max-w-7xl px-5 md:px-8">
          <div className="text-center max-w-3xl mx-auto mb-14">
            <span className="inline-flex items-center gap-1.5 rounded-full bg-[#f4ebdd] px-4 py-1 text-xs font-extrabold uppercase tracking-wider text-[#173f35]">
              <PackageCheck size={14} /> Category-First Browsing
            </span>
            <h2 className="mt-3 text-3xl font-extrabold text-[#173f35] md:text-5xl leading-tight">
              Explore Product Categories
            </h2>
            <p className="mt-3 text-base md:text-lg text-gray-600">
              Select a category below to browse curated healthcare, everyday pantry, and pooja items. Click any category to view items filtered for that category.
            </p>
          </div>

          {/* Grid of Product Categories with Realistic Imagery */}
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {categories.map((cat) => {
              return (
                <Link
                  key={cat.name}
                  href={cat.href}
                  className="group relative flex flex-col justify-between overflow-hidden rounded-3xl border border-gray-200 bg-[#faf9f6] shadow-sm transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl hover:bg-white hover:border-[#0b4938]"
                >
                  {/* High-Resolution Category Product Image Header */}
                  <div className="relative h-48 w-full overflow-hidden bg-gray-100">
                    <img
                      src={cat.image}
                      alt={cat.name}
                      className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent" />
                    
                    <span className="absolute top-3 right-3 rounded-full bg-white/90 backdrop-blur-md px-3 py-1 text-[11px] font-extrabold text-[#0b4938] shadow-md border border-white">
                      {cat.badge}
                    </span>

                    <span className="absolute bottom-3 left-3 text-xs font-bold text-white bg-[#0b4938]/80 backdrop-blur-sm px-2.5 py-0.5 rounded-lg">
                      {cat.itemsCount}
                    </span>
                  </div>

                  <div className="flex flex-1 flex-col justify-between p-6">
                    <div>
                      <h3 className="text-xl font-extrabold text-[#173f35] group-hover:text-[#0b4938] transition-colors">
                        {cat.name}
                      </h3>

                      <p className="mt-2.5 text-xs leading-relaxed text-gray-600 min-h-[44px]">
                        {cat.description}
                      </p>
                    </div>

                    <div className="mt-6 pt-4 border-t border-gray-200/60 flex items-center justify-between text-xs font-bold text-[#0b4938]">
                      <span>View Products</span>
                      <span className="inline-flex items-center gap-1.5 group-hover:translate-x-1 transition-transform">
                        Explore Items <ArrowRight size={15} />
                      </span>
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* 3. FEATURED PRODUCTS (WITH ENQUIRE NOW CTAs & ZERO PRICES) */}
      <section className="bg-[#faf9f6] py-16 md:py-20 border-t border-gray-200/60">
        <div className="mx-auto max-w-7xl px-5 md:px-8">
          <div className="flex flex-col justify-between gap-4 md:flex-row md:items-end mb-10">
            <div>
              <span className="font-semibold uppercase tracking-[0.18em] text-[#b68d40] text-xs">
                Available Products
              </span>
              <h2 className="mt-1 text-3xl font-extrabold text-[#173f35] md:text-4xl">
                Featured Family Care Items
              </h2>
              <p className="mt-2 text-base text-gray-600">
                Click "Enquire Now" on any item to submit an inquiry or speak directly on WhatsApp.
              </p>
            </div>

            <Link
              href="/categories"
              className="inline-flex items-center gap-2 font-bold text-[#0b4938] hover:underline text-sm"
            >
              View Full Category Catalog <ArrowRight size={17} />
            </Link>
          </div>

          {/* Interactive Product Grid */}
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {featuredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </section>

      {/* 4. ADVANTAGES SECTION */}
      <section className="bg-white py-16 md:py-20 border-t border-gray-100">
        <div className="mx-auto max-w-7xl px-5 md:px-8">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <span className="font-semibold uppercase tracking-[0.18em] text-[#b68d40] text-xs">
              Why CareBridge
            </span>
            <h2 className="mt-1 text-3xl font-extrabold text-[#173f35] md:text-4xl">
              Trusted wholesale quality & personal care
            </h2>
          </div>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {advantages.map((item) => {
              const Icon = item.icon;

              return (
                <div
                  key={item.title}
                  className="rounded-3xl border border-gray-200 bg-[#faf9f6] p-7 shadow-sm transition hover:shadow-md"
                >
                  <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#f4ebdd] text-[#173f35]">
                    <Icon size={24} />
                  </div>

                  <h3 className="mt-4 text-lg font-bold text-[#173f35]">
                    {item.title}
                  </h3>

                  <p className="mt-2 text-xs leading-relaxed text-gray-600">
                    {item.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* 5. CONTACT CTA */}
      <section className="bg-[#0b4938] py-16 text-white">
        <div className="mx-auto max-w-7xl px-5 text-center md:px-8">
          <span className="font-bold uppercase tracking-[0.18em] text-[#e2c98a] text-xs">
            We Are Here To Help
          </span>
          <h2 className="mt-2 text-3xl font-extrabold md:text-4xl">
            Let us help you arrange your family essentials
          </h2>
          <p className="mx-auto mt-3 max-w-2xl text-base text-white/80">
            Contact the CareBridge desk for medicines, medical equipment, festival boxes or custom family care orders.
          </p>

          <div className="mt-8 flex flex-wrap justify-center gap-4">
            <a
              href="tel:+918904328298"
              className="inline-flex items-center gap-2 rounded-xl bg-[#e2c98a] px-6 py-3.5 font-extrabold text-[#173f35] transition hover:bg-[#ead7a7]"
            >
              <Phone size={18} /> Call +91 89043 28298
            </a>

            <a
              href="https://wa.me/918904328298"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 rounded-xl border border-white/40 px-6 py-3.5 font-bold text-white transition hover:bg-white/10"
            >
              <MessageCircle size={18} /> WhatsApp Assistance
            </a>
          </div>
        </div>
      </section>
    </PageShell>
  );
}
