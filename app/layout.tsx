import type { Metadata } from "next";
import "./globals.css";
import ClientProviders from "../components/ClientProviders";

export const metadata: Metadata = {
  title: "CareBridge | Family Care Marketplace & Equipment",
  description: "Quality medicines, medical equipment, rentals, pooja essentials and festival care boxes delivered with personal assistance."
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <script src="https://checkout.razorpay.com/v1/checkout.js" async></script>
      </head>
      <body>
        <ClientProviders>{children}</ClientProviders>
      </body>
    </html>
  );
}
