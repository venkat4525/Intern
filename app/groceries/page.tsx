import SectionPage from "@/components/SectionPage";
import { groceryGroups } from "@/components/marketplace-data";

export default function GroceriesPage() {
  return (
    <SectionPage
      eyebrow="Daily Essentials & Pantry"
      title="Groceries"
      intro="Browse essential grocery categories, rice, dals, oils, dry fruits, and pantry provisions sourced at competitive wholesale prices."
      categorySlug="groceries"
      subGroups={groceryGroups}
    />
  );
}
