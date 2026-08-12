import Image from "next/image";
import Link from "next/link";
import { Mail, MapPin, Phone, ShieldCheck, MessageSquare, Truck, UserCheck } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-[#062d23] text-white border-t border-white/10">
      <div className="mx-auto grid max-w-7xl gap-10 px-5 py-14 md:grid-cols-4 md:px-8">
        <div>
          <Image
            src="/carebridge-logo.png"
            alt="CareBridge"
            width={220}
            height={120}
            className="h-20 w-auto rounded-xl object-contain bg-white/10 p-2"
          />
          <p className="mt-4 text-sm leading-6 text-white/75">
            CareBridge is a category-organized family care platform providing wholesale sourcing for groceries, medicines, medical equipment, daily pooja essentials, and festival care boxes with personal assistance.
          </p>
        </div>

        <div>
          <h3 className="text-lg font-bold text-[#f4c542]">Product Categories</h3>
          <div className="mt-4 flex flex-col gap-2.5 text-sm text-white/80">
            <Link href="/groceries" className="hover:text-white transition">Groceries & Pantry</Link>
            <Link href="/medicines" className="hover:text-white transition">Medicines & Supplements</Link>
            <Link href="/medical-equipment" className="hover:text-white transition">Medical Devices & Equipment</Link>
            <Link href="/pooja" className="hover:text-white transition">Daily Pooja Essentials</Link>
            <Link href="/care-box" className="hover:text-white transition">Festival Care Boxes</Link>
            <Link href="/wellness" className="hover:text-white transition">Health & Wellness</Link>
            <Link href="/home-care" className="hover:text-white transition">Home Care & Safety</Link>
          </div>
        </div>

        <div>
          <h3 className="text-lg font-bold text-[#f4c542]">Assisted Support & Tools</h3>
          <div className="mt-4 flex flex-col gap-2.5 text-sm text-white/80">
            <a href="https://wa.me/918904328298" target="_blank" rel="noreferrer" className="hover:text-white transition flex items-center gap-1.5">
              <MessageSquare size={15} className="text-[#f4c542]" /> WhatsApp Enquiry Desk
            </a>
            <Link href="/orders" className="hover:text-white transition flex items-center gap-1.5">
              <Truck size={15} className="text-[#f4c542]" /> Track Your Orders
            </Link>
            <Link href="/admin" className="hover:text-white transition flex items-center gap-1.5">
              <UserCheck size={15} className="text-[#f4c542]" /> Admin Dashboard
            </Link>
            <Link href="/about" className="hover:text-white transition">About CareBridge</Link>
            <Link href="/contact" className="hover:text-white transition">Contact Support</Link>
          </div>
        </div>

        <div>
          <h3 className="text-lg font-bold text-[#f4c542]">Contact & Delivery</h3>
          <div className="mt-4 space-y-3 text-sm text-white/80">
            <p className="flex items-center gap-2">
              <Phone size={16} className="text-[#f4c542]" /> +91 89043 28298
            </p>
            <p className="flex items-center gap-2">
              <Mail size={16} className="text-[#f4c542]" /> care@thecarebridge.co.in
            </p>
            <p className="flex items-center gap-2">
              <MapPin size={16} className="text-[#f4c542]" /> Bengaluru, Karnataka, India
            </p>
            <div className="pt-2 text-xs text-emerald-300 flex items-center gap-1">
              <ShieldCheck size={16} /> 100% Verified Wholesale Partners
            </div>
          </div>
        </div>
      </div>

      <div className="border-t border-white/10 py-5 text-center text-xs text-white/60">
        © {new Date().getFullYear()} CareBridge Family Care Category Marketplace. All rights reserved.
      </div>
    </footer>
  );
}
