import SectionPage from "@/components/SectionPage";
import { rentalEquipment } from "@/components/marketplace-data";

export default function RentalsPage() {
  return (
    <SectionPage
      eyebrow="Flexible Home Recovery Care"
      title="Equipment Rentals"
      intro="Motorized ICU hospital beds, 10L oxygen concentrators, anti-bedsore air mattresses, wheelchairs, and patient lifts available on monthly rental terms."
      categorySlug="rentals"
      subGroups={rentalEquipment}
    />
  );
}
