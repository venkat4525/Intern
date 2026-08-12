import SectionPage from "@/components/SectionPage";
import { poojaGroups } from "@/components/marketplace-data";

export default function PoojaPage() {
  return (
    <SectionPage
      eyebrow="Spiritual Purity & Tradition"
      title="Daily Pooja Essentials"
      intro="Pure Bhimseni camphor, organic cotton wicks, natural kumkum, agarbatti, brass diyas, and authentic pooja supplies."
      categorySlug="pooja"
      subGroups={poojaGroups}
    />
  );
}
