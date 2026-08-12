import SectionPage from "@/components/SectionPage";
import { medicineGroups } from "@/components/marketplace-data";

export default function MedicinesPage() {
  return (
    <SectionPage
      eyebrow="Healthcare & OTC"
      title="Medicines & Supplements"
      intro="Prescription support, OTC products, daily multivitamin supplements, Ayurvedic care, and regular medicine requirements."
      categorySlug="medicines"
      subGroups={medicineGroups}
    />
  );
}
