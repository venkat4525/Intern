import SectionPage from "@/components/SectionPage";

export default function WellnessPage() {
  return (
    <SectionPage
      eyebrow="Everyday Health & Wellbeing"
      title="Health & Wellness"
      intro="Nutrition, joint pain relief oils, personal care, monitoring devices, and recovery-support products for your family."
      categorySlug="wellness"
      subGroups={["Pain Relief", "Nutritional Drinks", "Senior Wellness", "Personal Hygiene"]}
    />
  );
}
