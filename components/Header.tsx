"use client";

import Image from "next/image";
import Link from "next/link";
import { useState, useEffect, useRef } from "react";
import { usePathname } from "next/navigation";
import { searchProducts } from "@/data/products";
import {
  ChevronDown,
  Menu,
  Phone,
  Truck,
  UserCheck,
  X,
  Search,
  MessageSquare,
  HeartPulse,
  PackageCheck,
  Stethoscope,
  Pill,
  ShoppingBasket,
  Sun,
  Home,
  Gift,
  ArrowRight,
  User
} from "lucide-react";

const categoryMenuItems = [
  { name: "Groceries & Pantry", href: "/groceries", icon: ShoppingBasket, desc: "Rice, pulses, oils & staples" },
  { name: "Medicines & OTC", href: "/medicines", icon: Pill, desc: "Prescription support & vitamins" },
  { name: "Medical Equipment", href: "/medical-equipment", icon: Stethoscope, desc: "BP Monitors, oximeters & devices" },
  { name: "Daily Pooja Essentials", href: "/pooja", icon: Sun, desc: "Camphor, wicks, kumkum & diyas" },
  { name: "Festival Care Boxes", href: "/care-box", icon: Gift, desc: "21+ items curated pooja boxes" },
  { name: "Health & Wellness", href: "/wellness", icon: HeartPulse, desc: "Nutrition & joint pain oils" },
  { name: "Home Care & Safety", href: "/home-care", icon: Home, desc: "Adult diapers & bath safety" },
];

export default function Header() {
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [categoriesDropdownOpen, setCategoriesDropdownOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [mobileCategoryExpand, setMobileCategoryExpand] = useState(false);

  const dropdownRef = useRef<HTMLDivElement>(null);
  const searchRef = useRef<HTMLDivElement>(null);

  // Close dropdown on outside click
  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setCategoriesDropdownOpen(false);
      }
      if (searchRef.current && !searchRef.current.contains(e.target as Node)) {
        setSearchOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Close mobile drawer on route change
  useEffect(() => {
    setMobileMenuOpen(false);
    setCategoriesDropdownOpen(false);
    setSearchOpen(false);
  }, [pathname]);

  const searchResults = searchQuery.trim() ? searchProducts(searchQuery) : [];

  const isActive = (path: string) => {
    if (path === "/" && pathname === "/") return true;
    if (path !== "/" && pathname.startsWith(path)) return true;
    return false;
  };

  return (
    <>
      {/* 1. TOP ANNOUNCEMENT BAR */}
      <div className="w-full bg-[#041f18] text-white border-b border-emerald-900/50">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-1.5 text-xs md:px-8">
          <div className="flex items-center gap-2 font-medium text-emerald-300">
            <span className="inline-flex h-2 w-2 rounded-full bg-emerald-400 animate-ping"></span>
            <span className="hidden sm:inline">✨ Category-Based Assisted Sourcing • Same-Day Bengaluru Support</span>
            <span className="sm:hidden">✨ Category-First Family Care Platform</span>
          </div>

          <div className="flex items-center gap-4 text-xs font-semibold text-white/90">
            <Link
              href="/orders"
              className="flex items-center gap-1.5 transition hover:text-[#f4c542]"
            >
              <Truck size={13} className="text-[#f4c542]" />
              <span>Track Orders</span>
            </Link>
            <span className="text-white/30">|</span>
            <Link
              href="/login"
              className="flex items-center gap-1.5 transition hover:text-[#f4c542]"
            >
              <User size={13} className="text-[#f4c542]" />
              <span>Login / Sign Up</span>
            </Link>
            <span className="text-white/30">|</span>
            <Link
              href="/admin"
              className="flex items-center gap-1.5 transition hover:text-[#f4c542]"
            >
              <UserCheck size={13} className="text-[#f4c542]" />
              <span>Admin Portal</span>
            </Link>
          </div>
        </div>
      </div>

      {/* 2. MAIN STICKY NAVIGATION BAR */}
      <header className="sticky top-0 z-50 w-full border-b border-[#f4c542]/20 bg-[#0b4938]/95 backdrop-blur-md shadow-lg transition-all duration-300">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 md:px-8">
          {/* Logo & Brand Name */}
          <Link href="/" className="flex items-center gap-3 shrink-0 group">
            <Image
              src="/carebridge-logo.png"
              alt="CareBridge Logo"
              width={240}
              height={90}
              priority
              className="h-14 sm:h-16 md:h-20 w-auto rounded-xl object-contain bg-white/10 p-1.5 transition duration-300 group-hover:bg-white/20 group-hover:scale-105"
            />
            <div className="flex flex-col justify-center">
              <span className="text-2xl sm:text-3xl md:text-4xl font-extrabold tracking-tight text-white group-hover:text-[#f4c542] transition duration-300 drop-shadow-md">
                Care<span className="text-[#f4c542]">Bridge</span>
              </span>
              <span className="text-[10px] sm:text-xs font-bold tracking-widest text-emerald-200 uppercase -mt-1 hidden sm:inline-block">
                Family Care Marketplace
              </span>
            </div>
          </Link>

          {/* Desktop Navigation Items */}
          <nav className="hidden items-center gap-1 lg:flex xl:gap-2">
            <Link
              href="/"
              className={`rounded-xl px-3 py-2 text-sm font-bold transition-all ${
                isActive("/")
                  ? "bg-white/15 text-[#f4c542] shadow-inner"
                  : "text-white/90 hover:bg-white/10 hover:text-white"
              }`}
            >
              Home
            </Link>

            {/* Categories Dropdown */}
            <div className="relative" ref={dropdownRef}>
              <button
                onClick={() => setCategoriesDropdownOpen(!categoriesDropdownOpen)}
                onMouseEnter={() => setCategoriesDropdownOpen(true)}
                className={`flex items-center gap-1.5 rounded-xl px-3 py-2 text-sm font-bold transition-all ${
                  categoriesDropdownOpen || pathname.startsWith("/categories") || categoryMenuItems.some(c => isActive(c.href))
                    ? "bg-white/15 text-[#f4c542]"
                    : "text-white/90 hover:bg-white/10 hover:text-white"
                }`}
              >
                <span>Categories</span>
                <ChevronDown
                  size={15}
                  className={`transition-transform duration-300 ${
                    categoriesDropdownOpen ? "rotate-180 text-[#f4c542]" : ""
                  }`}
                />
              </button>

              {/* Mega Dropdown Menu */}
              {categoriesDropdownOpen && (
                <div
                  onMouseLeave={() => setCategoriesDropdownOpen(false)}
                  className="absolute left-0 top-full mt-2 w-[520px] rounded-3xl border border-[#e8dfc5] bg-white p-5 shadow-2xl animate-in fade-in slide-in-from-top-3 duration-200 text-gray-800"
                >
                  <div className="flex items-center justify-between border-b border-gray-100 pb-3 mb-3">
                    <span className="text-xs font-extrabold uppercase tracking-wider text-[#b68d40]">
                      CareBridge Categories
                    </span>
                    <Link
                      href="/categories"
                      onClick={() => setCategoriesDropdownOpen(false)}
                      className="text-xs font-bold text-[#0b4938] hover:underline flex items-center gap-1"
                    >
                      View All ({categoryMenuItems.length}) <ArrowRight size={12} />
                    </Link>
                  </div>

                  <div className="grid grid-cols-2 gap-2">
                    {categoryMenuItems.map((item) => {
                      const Icon = item.icon;
                      return (
                        <Link
                          key={item.href}
                          href={item.href}
                          onClick={() => setCategoriesDropdownOpen(false)}
                          className="flex items-start gap-3 rounded-2xl p-2.5 transition hover:bg-[#f4f7ef] group"
                        >
                          <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-[#f4ebdd] text-[#0b4938] transition group-hover:bg-[#0b4938] group-hover:text-white">
                            <Icon size={18} />
                          </div>
                          <div>
                            <p className="text-xs font-bold text-[#173f35] group-hover:text-[#0b4938]">
                              {item.name}
                            </p>
                            <p className="text-[10px] text-gray-500 line-clamp-1">{item.desc}</p>
                          </div>
                        </Link>
                      );
                    })}
                  </div>
                </div>
              )}
            </div>

            <Link
              href="/care-box"
              className={`rounded-xl px-3 py-2 text-sm font-bold transition-all ${
                isActive("/care-box")
                  ? "bg-white/15 text-[#f4c542]"
                  : "text-white/90 hover:bg-white/10 hover:text-white"
              }`}
            >
              Festival Boxes
            </Link>

            <Link
              href="/about"
              className={`rounded-xl px-3 py-2 text-sm font-bold transition-all ${
                isActive("/about")
                  ? "bg-white/15 text-[#f4c542]"
                  : "text-white/90 hover:bg-white/10 hover:text-white"
              }`}
            >
              About
            </Link>

            <Link
              href="/contact"
              className={`rounded-xl px-3 py-2 text-sm font-bold transition-all ${
                isActive("/contact")
                  ? "bg-white/15 text-[#f4c542]"
                  : "text-white/90 hover:bg-white/10 hover:text-white"
              }`}
            >
              Contact
            </Link>
          </nav>

          {/* Right Action Icons & Search */}
          <div className="flex items-center gap-2.5">
            {/* Quick Search */}
            <div className="relative" ref={searchRef}>
              <button
                onClick={() => setSearchOpen(!searchOpen)}
                className="flex h-10 w-10 items-center justify-center rounded-xl bg-white/10 text-white transition hover:bg-white/20 border border-white/15"
                aria-label="Search"
              >
                <Search size={18} className="text-[#f4c542]" />
              </button>

              {/* Quick Search Overlay Popup */}
              {searchOpen && (
                <div className="absolute right-0 top-full mt-2 w-80 sm:w-96 rounded-3xl border border-gray-200 bg-white p-3 shadow-2xl z-50 text-gray-800 animate-in fade-in slide-in-from-top-2">
                  <div className="flex items-center rounded-xl bg-[#faf9f6] p-2 border border-gray-200">
                    <Search size={18} className="ml-2 text-gray-400 shrink-0" />
                    <input
                      type="text"
                      placeholder="Search items, BP monitor, rice..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      autoFocus
                      className="w-full bg-transparent px-2.5 py-1 text-xs text-gray-800 focus:outline-none"
                    />
                    {searchQuery && (
                      <button
                        onClick={() => setSearchQuery("")}
                        className="mr-1 text-[10px] font-bold text-gray-400 hover:text-gray-600"
                      >
                        Clear
                      </button>
                    )}
                  </div>

                  {/* Results preview */}
                  {searchQuery.trim() !== "" && (
                    <div className="mt-2 max-h-64 overflow-y-auto space-y-1.5 divide-y divide-gray-100">
                      {searchResults.length > 0 ? (
                        searchResults.map((item) => (
                          <Link
                            key={item.id}
                            href={`/products/${item.id}`}
                            onClick={() => setSearchOpen(false)}
                            className="flex items-center justify-between gap-3 p-2 hover:bg-[#f4f7ef] rounded-xl transition pt-2"
                          >
                            <div className="flex items-center gap-2.5 overflow-hidden">
                              <img src={item.image} alt={item.name} className="h-8 w-8 rounded-lg object-cover bg-gray-50 shrink-0" />
                              <div className="truncate">
                                <p className="text-xs font-bold text-[#173f35] truncate">{item.name}</p>
                                <span className="text-[10px] text-gray-400">{item.categoryLabel}</span>
                              </div>
                            </div>
                            <span className="text-xs font-bold text-[#0b4938] bg-emerald-50 px-2 py-0.5 rounded shrink-0">
                              Enquire
                            </span>
                          </Link>
                        ))
                      ) : (
                        <p className="p-3 text-center text-xs text-gray-500">No items found</p>
                      )}
                    </div>
                  )}
                </div>
              )}
            </div>

            {/* Direct Phone Call Button */}
            <a
              href="tel:+918904328298"
              className="hidden items-center gap-2 rounded-xl bg-gradient-to-r from-[#f4c542] to-[#e4b532] px-3.5 py-2 text-xs font-extrabold text-[#12372c] transition duration-200 hover:scale-105 hover:shadow-md md:flex"
            >
              <Phone size={15} />
              <span>Call Us</span>
            </a>

            {/* Login Account Button */}
            <Link
              href="/login"
              className="hidden sm:flex items-center gap-1.5 rounded-xl bg-white/15 px-3 py-2 text-xs font-bold text-white transition hover:bg-white/25 border border-white/20"
            >
              <User size={15} className="text-[#f4c542]" />
              <span>Log In</span>
            </Link>

            {/* Enquiry Desk Button */}
            <a
              href="https://wa.me/918904328298"
              target="_blank"
              rel="noreferrer"
              className="flex items-center gap-1.5 rounded-xl bg-white/15 px-3.5 py-2 text-xs font-bold text-white transition hover:bg-white/25 border border-white/20"
              aria-label="Enquire Desk"
            >
              <MessageSquare size={16} className="text-[#f4c542]" />
              <span className="hidden sm:inline">Enquire Desk</span>
            </a>

            {/* Mobile Drawer Toggle */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="rounded-xl p-2 text-[#f4c542] hover:bg-white/10 lg:hidden"
              aria-label="Toggle Navigation Menu"
            >
              {mobileMenuOpen ? <X size={26} /> : <Menu size={26} />}
            </button>
          </div>
        </div>

        {/* 3. MOBILE NAVIGATION DRAWER */}
        {mobileMenuOpen && (
          <nav className="border-t border-white/10 bg-[#041f18] px-5 py-6 lg:hidden animate-in fade-in slide-in-from-top-3 max-h-[85vh] overflow-y-auto">
            {/* Search inside drawer */}
            <div className="mb-5 relative">
              <div className="flex items-center rounded-xl bg-white/10 p-2.5 text-white border border-white/20">
                <Search size={18} className="text-[#f4c542] mr-2 shrink-0" />
                <input
                  type="text"
                  placeholder="Search products in CareBridge..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full bg-transparent text-xs text-white placeholder-white/50 focus:outline-none"
                />
              </div>

              {searchQuery.trim() !== "" && (
                <div className="mt-2 rounded-2xl bg-white p-3 text-gray-800 space-y-2 max-h-48 overflow-y-auto">
                  {searchResults.slice(0, 4).map((item) => (
                    <Link
                      key={item.id}
                      href={`/products/${item.id}`}
                      onClick={() => setMobileMenuOpen(false)}
                      className="flex items-center justify-between text-xs p-1.5 hover:bg-gray-50 rounded-lg"
                    >
                      <span className="font-bold text-[#173f35] line-clamp-1">{item.name}</span>
                      <span className="font-bold text-[#0b4938]">Enquire &rarr;</span>
                    </Link>
                  ))}
                </div>
              )}
            </div>

            {/* Main Links */}
            <div className="flex flex-col gap-2 text-sm font-semibold text-white">
              <Link
                href="/"
                onClick={() => setMobileMenuOpen(false)}
                className={`py-2 px-3 rounded-xl transition ${isActive("/") ? "bg-white/15 text-[#f4c542]" : ""}`}
              >
                Home
              </Link>

              {/* Categories Accordion */}
              <div>
                <button
                  onClick={() => setMobileCategoryExpand(!mobileCategoryExpand)}
                  className="flex w-full items-center justify-between py-2 px-3 rounded-xl transition hover:bg-white/10 text-white"
                >
                  <span>Shop Categories</span>
                  <ChevronDown
                    size={16}
                    className={`transition-transform ${mobileCategoryExpand ? "rotate-180 text-[#f4c542]" : ""}`}
                  />
                </button>

                {mobileCategoryExpand && (
                  <div className="ml-3 mt-1 space-y-1.5 border-l-2 border-[#f4c542]/30 pl-3 py-1">
                    {categoryMenuItems.map((item) => (
                      <Link
                        key={item.href}
                        href={item.href}
                        onClick={() => setMobileMenuOpen(false)}
                        className="block py-1.5 text-xs text-white/80 hover:text-[#f4c542]"
                      >
                        {item.name}
                      </Link>
                    ))}
                  </div>
                )}
              </div>

              <Link
                href="/care-box"
                onClick={() => setMobileMenuOpen(false)}
                className={`py-2 px-3 rounded-xl transition ${isActive("/care-box") ? "bg-white/15 text-[#f4c542]" : ""}`}
              >
                Festival Care Boxes
              </Link>

              <Link
                href="/about"
                onClick={() => setMobileMenuOpen(false)}
                className={`py-2 px-3 rounded-xl transition ${isActive("/about") ? "bg-white/15 text-[#f4c542]" : ""}`}
              >
                About Us
              </Link>

              <Link
                href="/contact"
                onClick={() => setMobileMenuOpen(false)}
                className={`py-2 px-3 rounded-xl transition ${isActive("/contact") ? "bg-white/15 text-[#f4c542]" : ""}`}
              >
                Contact
              </Link>

              <hr className="border-white/10 my-3" />

              <div className="flex flex-col gap-2.5">
                <Link
                  href="/login"
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex items-center gap-2 rounded-xl bg-white/10 px-4 py-2.5 text-xs text-white font-bold"
                >
                  <User size={16} className="text-[#f4c542]" /> User Login / Sign Up
                </Link>

                <Link
                  href="/orders"
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex items-center gap-2 rounded-xl bg-white/10 px-4 py-2.5 text-xs text-[#f4c542] font-bold"
                >
                  <Truck size={16} /> Track Order Status
                </Link>

                <Link
                  href="/admin"
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex items-center gap-2 rounded-xl bg-[#0b4938] px-4 py-2.5 text-xs text-emerald-300 font-bold border border-emerald-800"
                >
                  <UserCheck size={16} /> Admin Portal
                </Link>

                <a
                  href="tel:+918904328298"
                  className="flex items-center justify-center gap-2 rounded-xl bg-[#f4c542] px-4 py-3 font-extrabold text-[#12372c] mt-2 shadow-md text-xs"
                >
                  <Phone size={16} /> Call Support (+91 89043 28298)
                </a>
              </div>
            </div>
          </nav>
        )}
      </header>
    </>
  );
}
