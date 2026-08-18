import Link from "next/link";
import {
  ArrowRight,
  CheckCircle2,
  CircleHelp,
  Clock3,
  HeartHandshake,
  MessageCircle,
  PackageCheck,
  Phone,
  ShoppingBasket,
  Stethoscope,
  Users,
} from "lucide-react";

import PageShell from "@/components/PageShell";

const helpOptions = [
  {
    title: "Order by Phone",
    description:
      "Call our team and tell us what you need. We will guide you through the order.",
    icon: Phone,
  },
  {
    title: "Order through WhatsApp",
    description:
      "Send your product list, prescription details or requirements through WhatsApp.",
    icon: MessageCircle,
  },
  {
    title: "Order for Loved Ones",
    description:
      "Arrange medicines or care products for parents and family members.",
    icon: Users,
  },
  {
    title: "Medical Equipment Support",
    description:
      "Get help choosing suitable medical equipment and patient-care essentials.",
    icon: Stethoscope,
  },
  {
    title: "Recurring Monthly Orders",
    description:
      "Receive help arranging repeat household, medicine and care requirements.",
    icon: Clock3,
  },
  {
    title: "Complete Order Assistance",
    description:
      "Our team supports you from product selection until your order is confirmed.",
    icon: HeartHandshake,
  },
];

const orderSteps = [
  "Contact us by phone or WhatsApp.",
  "Share your product list and delivery details.",
  "Our team checks availability and confirms the order.",
  "Your products are arranged for delivery.",
];

export default function HelpOrderingPage() {
  return (
    <PageShell>
      <section className="bg-gradient-to-br from-[#062d23] via-[#0b4938] to-[#117153] py-16 text-white md:py-20">
        <div className="mx-auto max-w-7xl px-5 md:px-8">
          <div className="max-w-3xl">
            <p className="font-semibold uppercase tracking-[0.18em] text-[#e2c98a]">
              Personal Ordering Assistance
            </p>

            <h1 className="mt-4 text-4xl font-bold leading-tight md:text-6xl">
              We make ordering simple
            </h1>

            <p className="mt-6 text-lg leading-8 text-white/80">
              Not comfortable placing an online order? Contact the CareBridge
              team by phone or WhatsApp. We will help you arrange
              medicines, medical equipment and family-care essentials.
            </p>

            <div className="mt-8 flex flex-wrap gap-4">
              <a
                href="tel:+918904328298"
                className="inline-flex items-center gap-2 rounded-xl bg-[#e2c98a] px-6 py-3 font-semibold text-[#173f35]"
              >
                <Phone size={18} />
                Call Us
              </a>

              <a
                href="https://wa.me/918904328298"
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 rounded-xl border border-white/40 px-6 py-3 font-semibold text-white hover:bg-white/10"
              >
                <MessageCircle size={18} />
                WhatsApp Us
              </a>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-white py-16 md:py-20">
        <div className="mx-auto max-w-7xl px-5 md:px-8">
          <div className="text-center">
            <p className="font-semibold uppercase tracking-[0.18em] text-[#b68d40]">
              How We Can Help
            </p>

            <h2 className="mt-3 text-3xl font-bold text-[#173f35] md:text-4xl">
              Choose the support you need
            </h2>
          </div>

          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {helpOptions.map((item) => {
              const Icon = item.icon;

              return (
                <article
                  key={item.title}
                  className="rounded-3xl border border-gray-200 bg-[#faf9f6] p-7 shadow-sm"
                >
                  <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-[#f4ebdd] text-[#173f35]">
                    <Icon size={26} />
                  </div>

                  <h3 className="mt-5 text-xl font-bold text-[#173f35]">
                    {item.title}
                  </h3>

                  <p className="mt-3 leading-7 text-gray-600">
                    {item.description}
                  </p>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      <section className="bg-[#faf9f6] py-16 md:py-20">
        <div className="mx-auto grid max-w-7xl gap-10 px-5 md:px-8 lg:grid-cols-2">
          <div>
            <p className="font-semibold uppercase tracking-[0.18em] text-[#b68d40]">
              Simple Process
            </p>

            <h2 className="mt-3 text-3xl font-bold text-[#173f35] md:text-4xl">
              How assisted ordering works
            </h2>

            <div className="mt-8 space-y-4">
              {orderSteps.map((step, index) => (
                <div
                  key={step}
                  className="flex gap-4 rounded-2xl border border-gray-200 bg-white p-5"
                >
                  <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[#173f35] text-sm font-bold text-white">
                    {index + 1}
                  </span>

                  <p className="pt-1 leading-7 text-gray-700">{step}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-3xl bg-[#0b4938] p-8 text-white md:p-10">
            <CircleHelp size={36} className="text-[#e2c98a]" />

            <h2 className="mt-5 text-3xl font-bold">
              What can we help you order?
            </h2>

            <div className="mt-7 space-y-4">
              {[
                {
                  label: "Daily pooja and festival care boxes",
                  icon: PackageCheck,
                },
                {
                  label: "Medicines and regular health needs",
                  icon: PackageCheck,
                },
                {
                  label: "Medical equipment and patient-care products",
                  icon: Stethoscope,
                },
                {
                  label: "Orders for parents and loved ones",
                  icon: Users,
                },
              ].map((item) => {
                const Icon = item.icon;

                return (
                  <div
                    key={item.label}
                    className="flex items-center gap-3 rounded-xl bg-white/10 px-4 py-4"
                  >
                    <Icon size={20} className="text-[#e2c98a]" />
                    <span className="font-medium">{item.label}</span>
                  </div>
                );
              })}
            </div>

            <a
              href="https://wa.me/918904328298"
              target="_blank"
              rel="noreferrer"
              className="mt-8 inline-flex items-center gap-2 rounded-xl bg-[#e2c98a] px-6 py-3 font-semibold text-[#173f35]"
            >
              Start on WhatsApp
              <ArrowRight size={18} />
            </a>
          </div>
        </div>
      </section>

      <section className="bg-[#f4ebdd] py-16">
        <div className="mx-auto max-w-4xl px-5 text-center md:px-8">
          <CheckCircle2 size={40} className="mx-auto text-[#173f35]" />

          <h2 className="mt-5 text-3xl font-bold text-[#173f35] md:text-4xl">
            CareBridge is here to help
          </h2>

          <p className="mx-auto mt-4 max-w-2xl text-lg leading-8 text-gray-600">
            Speak with our team and receive personal support for your family’s
            everyday care requirements.
          </p>

          <div className="mt-8 flex flex-wrap justify-center gap-4">
            <a
              href="tel:+918904328298"
              className="inline-flex items-center gap-2 rounded-xl bg-[#173f35] px-6 py-3 font-semibold text-white"
            >
              <Phone size={18} />
              Call Now
            </a>

            <Link
              href="/categories"
              className="inline-flex items-center gap-2 rounded-xl border border-[#173f35] px-6 py-3 font-semibold text-[#173f35]"
            >
              Browse Categories
              <ArrowRight size={18} />
            </Link>
          </div>
        </div>
      </section>
    </PageShell>
  );
}
