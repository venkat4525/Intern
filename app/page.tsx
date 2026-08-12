"use client";

import Link from "next/link";
import { useState } from "react";
import {
  ArrowRight,
  BadgeIndianRupee,
  CheckCircle2,
  CircleHelp,
  Clock3,
  HeartHandshake,
  HeartPulse,
  Home,
  Mail,
  MessageCircle,
  PackageCheck,
  PackageOpen,
  Phone,
  Pill,
  Search,
  ShieldCheck,
  ShoppingBasket,
  Sparkles,
  Stethoscope,
  Truck,
  Users,
  Zap,
} from "lucide-react";

import PageShell from "@/components/PageShell";
import ProductCard from "@/components/ProductCard";
import { products, searchProducts } from "@/data/products";

const categories = [
  {
    name: "Groceries",
    description: "Rice, pulses, oils, spices, dry fruits and everyday household essentials.",
    href: "/groceries",
    icon: ShoppingBasket,
    badge: "Wholesale Rates",
  },
  {
    name: "Medicines",
    description: "Prescription support, OTC products, vitamins and regular medicine needs.",
    href: "/medicines",
    icon: Pill,
    badge: "100% Genuine",
  },
  {
    name: "Medical Equipment",
    description: "BP Monitors, oximeters, glucometers, wheelchairs and recovery equipment.",
    href: "/medical-equipment",
    icon: Stethoscope,
    badge: "Warranty Included",
  },
  {
    name: "Equipment Rentals",
    description: "Hospital beds, oxygen concentrators, air mattresses and patient-care rentals.",
    href: "/rentals",
    icon: PackageCheck,
    badge: "Monthly Terms",
  },
  {
    name: "Daily Pooja Essentials",
    description: "Bhimseni camphor, cotton wicks, kumkum, turmeric, agarbatti and traditional items.",
    href: "/pooja",
    icon: Sparkles,
    badge: "Purity Assured",
  },
  {
    name: "Festival Care Boxes",
    description: "Complete festival and vratha essentials thoughtfully packed together.",
    href: "/care-box",
    icon: PackageOpen,
    badge: "21+ Items Pack",
  },
  {
    name: "Health & Wellness",
    description: "Nutrition, joint pain oils, monitoring and recovery-support products.",
    href: "/wellness",
    icon: HeartPulse,
    badge: "Senior Special",
  },
  {
    name: "Home Care",
    description: "Adult diapers, anti-slip bath mats, daily-living and home-safety essentials.",
    href: "/home-care",
    icon: Home,
    badge: "Hygiene Certified",
  },
];

const advantages = [
  {
    title: "Competitive Wholesale Sourcing",
    description: "We work directly with verified wholesale dealers and authorized distributors, passing real value to families.",
    icon: BadgeIndianRupee,
  },
  {
    title: "Personal Ordering Assistance",
    description: "Call or WhatsApp our team for personalized guidance, recurring monthly orders, or urgent family requirements.",
    icon: HeartHandshake,
  },
  {
    title: "Everything In One Place",
    description: "Groceries, medicines, medical equipment, rentals, daily pooja items and festival care boxes under one roof.",
    icon: PackageCheck,
  },
  {
    title: "Doorstep Delivery to Loved Ones",
    description: "Arrange essential products and medical gear delivered straight to your parents' home in Bengaluru.",
    icon: Truck,
  },
];

export default function HomePage() {
  const [searchQuery, setSearchQuery] = useState("");
  const featuredProducts = products.filter((p) => p.featured).slice(0, 8);
  const searchResults = searchQuery.trim() ? searchProducts(searchQuery) : [];

  return (
    <PageShell>
      {/* Hero Section */}
      <section className="overflow-hidden bg-gradient-to-br from-[#062d23] via-[#0b4938] to-[#117153] text-white">
        <div className="mx-auto grid max-w-7xl items-center gap-10 px-5 py-16 md:px-8 md:py-20 lg:grid-cols-2 lg:py-24">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full bg-[#e2c98a]/20 px-4 py-1.5 text-xs font-bold uppercase tracking-wider text-[#e2c98a] border border-[#e2c98a]/30">
              <Sparkles size={14} /> The CareBridge Marketplace
            </div>

            <h1 className="mt-4 max-w-3xl text-3xl font-extrabold leading-tight md:text-5xl lg:text-6xl">
              Everything your family needs, delivered with care
            </h1>

            <p className="mt-5 max-w-2xl text-base md:text-lg leading-relaxed text-white/80">
              Quality groceries, medicines, medical equipment, rentals, and daily pooja essentials sourced from trusted wholesale partners at competitive prices.
            </p>

            {/* Quick Hero Search Input */}
            <div className="mt-8 relative max-w-lg">
              <div className="flex items-center rounded-2xl bg-white p-2 shadow-xl text-gray-800">
                <Search size={22} className="ml-3 shrink-0 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search groceries, BP monitors, rice, oxygen..."
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
                        Products Found ({searchResults.length})
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
                          <span className="text-sm font-extrabold text-[#0b4938]">₹{item.price}</span>
                        </Link>
                      ))}
                    </div>
                  ) : (
                    <p className="p-4 text-center text-sm text-gray-500">No products found matching "{searchQuery}"</p>
                  )}
                </div>
              )}
            </div>

            <div className="mt-8 flex flex-wrap gap-4">
              <Link
                href="/categories"
                className="inline-flex items-center gap-2 rounded-xl bg-[#e2c98a] px-6 py-3.5 font-extrabold text-[#173f35] transition hover:bg-[#ead7a7] shadow-lg"
              >
                Explore All Products <ArrowRight size={18} />
              </Link>

              <a
                href="https://wa.me/918904328298"
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 rounded-xl border border-white/40 px-6 py-3.5 font-bold text-white transition hover:bg-white/10"
              >
                <MessageCircle size={18} /> WhatsApp Support
              </a>
            </div>
          </div>

          {/* Right Hero Feature Card */}
          <div className="rounded-3xl border border-white/15 bg-white/10 p-5 shadow-2xl backdrop-blur md:p-7">
            <div className="rounded-2xl bg-white p-6 text-[#173f35]">
              <div className="flex items-center justify-between border-b border-gray-100 pb-4">
                <div>
                  <span className="text-xs font-bold uppercase tracking-wider text-[#b68d40]">Direct Assisted Order</span>
                  <h3 className="text-lg font-bold text-[#173f35]">Not comfortable ordering online?</h3>
                </div>
                <HeartHandshake className="h-8 w-8 text-[#0b4938] shrink-0" />
              </div>

              <p className="mt-3 text-sm leading-relaxed text-gray-600">
                Call or WhatsApp our dedicated support desk. Share your monthly grocery list or medical equipment requirement, and we will place the order for you.
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
                  <MessageCircle size={15} /> WhatsApp Us
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

      {/* Featured Products Section (DYNAMIC PRODUCT CARDS) */}
      <section className="bg-[#faf9f6] py-16 md:py-20">
        <div className="mx-auto max-w-7xl px-5 md:px-8">
          <div className="flex flex-col justify-between gap-4 md:flex-row md:items-end mb-10">
            <div>
              <span className="font-semibold uppercase tracking-[0.18em] text-[#b68d40] text-xs">
                Handpicked Products
              </span>
              <h2 className="mt-1 text-3xl font-extrabold text-[#173f35] md:text-4xl">
                Featured Family Care Products
              </h2>
              <p className="mt-2 text-base text-gray-600">
                Click any product card to view specifications, availability, and instant add-to-cart.
              </p>
            </div>

            <Link
              href="/categories"
              className="inline-flex items-center gap-2 font-bold text-[#0b4938] hover:underline"
            >
              View Full Catalog <ArrowRight size={17} />
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

      {/* Shop By Category */}
      <section className="bg-white py-16 md:py-20 border-t border-gray-100">
        <div className="mx-auto max-w-7xl px-5 md:px-8">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <span className="font-semibold uppercase tracking-[0.18em] text-[#b68d40] text-xs">
              Explore Everything
            </span>
            <h2 className="mt-1 text-3xl font-extrabold text-[#173f35] md:text-4xl">
              Shop by Category
            </h2>
            <p className="mt-3 text-base text-gray-600">
              Find everyday provisions, healthcare products, pooja supplies and festival boxes through one trusted platform.
            </p>
          </div>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {categories.map((category) => {
              const Icon = category.icon;

              return (
                <Link
                  key={category.name}
                  href={category.href}
                  className="group relative rounded-3xl border border-gray-200 bg-[#faf9f6] p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:bg-white"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-[#f4ebdd] text-[#173f35] transition group-hover:bg-[#0b4938] group-hover:text-white">
                      <Icon size={26} />
                    </div>
                    <span className="rounded-full bg-white px-2.5 py-1 text-[11px] font-bold text-[#b68d40] border border-amber-200">
                      {category.badge}
                    </span>
                  </div>

                  <h3 className="mt-5 text-xl font-bold text-[#173f35]">
                    {category.name}
                  </h3>

                  <p className="mt-2 text-xs leading-relaxed text-gray-600 min-h-[40px]">
                    {category.description}
                  </p>

                  <span className="mt-4 inline-flex items-center gap-2 text-xs font-extrabold text-[#0b4938]">
                    Explore Category <ArrowRight size={14} className="transition group-hover:translate-x-1" />
                  </span>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* Why Choose CareBridge */}
      <section className="bg-[#f4ebdd]/60 py-16 md:py-20">
        <div className="mx-auto max-w-7xl px-5 md:px-8">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <span className="font-semibold uppercase tracking-[0.18em] text-[#b68d40] text-xs">
              The CareBridge Advantage
            </span>
            <h2 className="mt-1 text-3xl font-extrabold text-[#173f35] md:text-4xl">
              Better value, trusted quality and personal care
            </h2>
          </div>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {advantages.map((item) => {
              const Icon = item.icon;

              return (
                <div
                  key={item.title}
                  className="rounded-3xl border border-gray-200 bg-white p-7 shadow-sm transition hover:shadow-md"
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

      {/* Contact CTA */}
      <section className="bg-[#0b4938] py-16 text-white">
        <div className="mx-auto max-w-7xl px-5 text-center md:px-8">
          <span className="font-bold uppercase tracking-[0.18em] text-[#e2c98a] text-xs">
            We Are Here To Help
          </span>
          <h2 className="mt-2 text-3xl font-extrabold md:text-4xl">
            Let us help you arrange your family essentials
          </h2>
          <p className="mx-auto mt-3 max-w-2xl text-base text-white/80">
            Contact the CareBridge team for groceries, medicines, medical equipment, festival boxes or custom family care orders.
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
