import Link from "next/link";
import { ArrowRight } from "lucide-react";
import PageShell from "@/components/PageShell";

const categories = [
  {
    name: "Groceries & Pantry",
    description: "Rice, pulses, cooking oils, spices, dry fruits and everyday household provisions.",
    href: "/groceries",
    image: "https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&w=600&q=80",
    items: ["Rice & grains", "Pulses & Dals", "Cold pressed oils", "Dry fruits combo"],
  },
  {
    name: "Medicines & OTC",
    description: "Prescription support, OTC products, vitamins, Ayurveda and regular medicine requirements.",
    href: "/medicines",
    image: "https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?auto=format&fit=crop&w=600&q=80",
    items: ["Senior multivitamins", "OTC medicines", "Vitamins & Minerals", "Ayurvedic care"],
  },
  {
    name: "Medical Equipment",
    description: "Digital BP monitors, pulse oximeters, glucometers, nebulizers and wheelchairs.",
    href: "/medical-equipment",
    image: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&w=600&q=80",
    items: ["Digital BP monitors", "Pulse oximeters", "Glucometer kits", "Mesh nebulizers"],
  },
  {
    name: "Daily Pooja Essentials",
    description: "Pure Bhimseni camphor, organic cotton wicks, kumkum, turmeric and traditional items.",
    href: "/pooja",
    image: "https://images.unsplash.com/photo-1609840114035-3c981b782dfe?auto=format&fit=crop&w=600&q=80",
    items: ["Pure Bhimseni Camphor", "Cotton wicks", "Kumkum & Turmeric", "Agarbatti & Diyas"],
  },
  {
    name: "Festival Care Boxes",
    description: "Thoughtfully assembled festival and vratha care boxes delivered directly to your family.",
    href: "/care-box",
    image: "https://images.unsplash.com/photo-1607344645866-009c320b5ab8?auto=format&fit=crop&w=600&q=80",
    items: ["Ganesha Chaturthi Box", "Varalakshmi Vratham Box", "Deepavali Box", "Navaratri Box"],
  },
  {
    name: "Health & Wellness",
    description: "Nutrition supplements, joint pain relief oils, personal care and senior wellness.",
    href: "/wellness",
    image: "https://images.unsplash.com/photo-1608571423902-eed4a5ad8108?auto=format&fit=crop&w=600&q=80",
    items: ["Ayurvedic ortho oil", "Senior nutrition", "Personal care", "Recovery support"],
  },
  {
    name: "Home Care & Safety",
    description: "Adult diapers, anti-slip bathroom rubber mats, hygiene and daily-living products.",
    href: "/home-care",
    image: "https://images.unsplash.com/photo-1584515979956-d9f6e5d09982?auto=format&fit=crop&w=600&q=80",
    items: ["Adult Diapers", "Anti-slip Bath Mats", "Daily living aids", "Comfort products"],
  },
];

export default function CategoriesPage() {
  return (
    <PageShell>
      <section className="bg-gradient-to-br from-[#062d23] via-[#0b4938] to-[#117153] text-white">
        <div className="mx-auto max-w-7xl px-5 py-16 md:px-8 md:py-20">
          <p className="font-semibold uppercase tracking-[0.18em] text-[#e2c98a]">
            CareBridge Marketplace
          </p>

          <h1 className="mt-4 max-w-4xl text-4xl font-bold leading-tight md:text-5xl">
            Essential product categories for family care
          </h1>

          <p className="mt-5 max-w-3xl text-lg leading-8 text-white/80">
            Browse high-resolution categories for groceries, medicines, medical equipment, daily pooja essentials, festival care boxes, and home-care support.
          </p>
        </div>
      </section>

      <section className="bg-[#faf9f6] py-16 md:py-20">
        <div className="mx-auto max-w-7xl px-5 md:px-8">
          <div className="grid gap-8 md:grid-cols-2">
            {categories.map((category) => {
              return (
                <article
                  key={category.name}
                  className="group flex flex-col overflow-hidden rounded-3xl border border-gray-200 bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-xl"
                >
                  <div className="relative h-48 w-full overflow-hidden bg-gray-100">
                    <img
                      src={category.image}
                      alt={category.name}
                      className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                    <h2 className="absolute bottom-4 left-6 text-2xl font-extrabold text-white">
                      {category.name}
                    </h2>
                  </div>

                  <div className="flex flex-1 flex-col justify-between p-6 md:p-8">
                    <p className="leading-relaxed text-gray-600 text-sm md:text-base">
                      {category.description}
                    </p>

                    <div className="mt-6 grid gap-2 sm:grid-cols-2">
                      {category.items.map((item) => (
                        <div
                          key={item}
                          className="rounded-xl bg-[#f4f7ef] px-4 py-2.5 text-xs font-semibold text-[#173f35]"
                        >
                          {item}
                        </div>
                      ))}
                    </div>

                    <Link
                      href={category.href}
                      className="mt-6 inline-flex items-center gap-2 font-extrabold text-[#0b4938] hover:underline text-sm"
                    >
                      Explore {category.name} <ArrowRight size={17} />
                    </Link>
                  </div>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      <section className="bg-[#f4ebdd] py-16">
        <div className="mx-auto max-w-7xl px-5 md:px-8">
          <div className="rounded-3xl bg-white p-8 shadow-sm md:p-12">
            <p className="font-semibold uppercase tracking-[0.18em] text-[#b68d40]">
              Assisted Sourcing
            </p>

            <h2 className="mt-3 text-3xl font-bold text-[#173f35]">
              Need assistance selecting items?
            </h2>

            <p className="mt-4 max-w-3xl text-lg leading-8 text-gray-600">
              Tell us what you need. Our CareBridge team can guide you through wholesale pricing options, festival boxes, and repeat monthly orders.
            </p>

            <div className="mt-7 flex flex-wrap gap-4">
              <a
                href="https://wa.me/918904328298"
                target="_blank"
                rel="noreferrer"
                className="rounded-xl bg-[#0b4938] px-6 py-3 font-semibold text-white hover:bg-[#125c48]"
              >
                WhatsApp CareBridge Support
              </a>
            </div>
          </div>
        </div>
      </section>
    </PageShell>
  );
}
